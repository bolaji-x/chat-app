const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const http = require('http');
const { Server } = require('socket.io');
const db = require('./db');
const authMiddleware = require('./middleware/auth');

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: { origin: '*' }
});

// MIDDLEWARES
app.use(cors());
app.use(express.json()); // Parses incoming JSON payloads from Axios

// REMOVED: app.use('/auth', authRoutes); <--- This was causing a crash and route mismatch

// REGISTER
app.post('/auth/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        db.get(`SELECT * FROM users WHERE email = ?`, [email], async (err, row) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            if (row) {
                return res.status(400).json({ message: 'User already exists' });
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            db.run(`INSERT INTO users (username, email, password) VALUES (?, ?, ?)`,
                [username, email, hashedPassword],
                (err) => {
                    if (err) {
                        return res.status(500).json({ error: err.message });
                    }
                    console.log('New user saved:', { username, email });
                    res.status(201).json({ message: 'User registered successfully' });
                }
            );
        });           

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// LOGIN
app.post('/auth/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        db.get(`SELECT * FROM users WHERE email = ?`, [email], async (err, user) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            // If user isn't found, this block triggers the 400 bad request
            if (!user) {
                return res.status(400).json({ message: 'Invalid email or password' });
            }

            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                return res.status(400).json({ message: 'Invalid email or password' });
            }

            const token = jwt.sign(
                { userId: user.id },
                process.env.JWT_SECRET || 'fallback_secret', // Safeguard if .env isn't loaded
                { expiresIn: '1h' }
            );

            res.json({
                message: 'Login successful',
                token,
                user: { id: user.id, username: user.username, email: user.email }
            });
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/api/messages', (req, res) => {
    db.all(`SELECT * FROM messages ORDER BY created_at ASC`, [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
});

// PROTECTED TEST ROUTE
app.get('/api/profile', authMiddleware, (req, res) => {
    res.json({ message: `You are user ${req.userId}` });
});

// SOCKET.IO
io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    socket.on('chat message', (msg) => {
        db.run(`INSERT INTO messages (username, text) VALUES (?, ?)`,
            [msg.user, msg.text],
            (err) => {
                if (err) {
                    console.log(err);
                    return;
                }
                io.emit('chat message', msg);
            }
        );
    });

    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
