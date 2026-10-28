How It Works
Authentication Flow
A user registers with a username, email, and password. The password is hashed with bcrypt before being stored — plain-text passwords are never saved.
On login, the submitted password is compared against the stored hash using bcrypt.compare().
On successful login, the server issues a signed JWT containing the user's ID, which the client stores and uses to identify itself for the session.
Real-Time Messaging Flow
When the client loads, it opens a persistent WebSocket connection to the backend via Socket.io.
Sending a message emits a chat message event containing the sender's username and message text.
The backend saves the message to the messages table, then broadcasts it to every connected client.
Each connected client listens for incoming chat message events and updates the UI in real time — no page refresh required.
On page load, the client also fetches full message history from a REST endpoint (GET /api/messages), so the conversation persists across sessions.
API Endpoints
Method	Endpoint	Description	Auth Required
POST	/auth/register	Register a new user	No
POST	/auth/login	Log in and receive a JWT	No
GET	/api/profile	Get the logged-in user's profile	Yes
GET	/api/messages	Retrieve full chat message history	No
Socket Events
Event	Direction	Payload	Description
connection	Client → Server	—	Fired when a client connects
chat message	Client → Server	{ user, text }	Sent when a user sends a message
chat message	Server → Client	{ user, text }	Broadcast to all clients when a new message arrives
disconnect	Client → Server	—	Fired when a client disconnects
Getting Started
Prerequisites
Node.js (v18 or higher recommended)
Backend Setup
bash
cd backend
npm install

Create a .env file in backend/:

PORT=5000
JWT_SECRET=your_secret_key_here

Start the server:

bash
node server.js
Frontend Setup
bash
cd frontend
npm install
npm run dev

The app will be available at http://localhost:5173, with the backend running on http://localhost:5000.

Future Improvements
Private (1-on-1) messaging between users
Online/offline user presence indicators
Typing indicators
Message timestamps displayed in the UI
Migration to PostgreSQL for production-scale concurrency
Socket.io rooms for scoped broadcasting instead of global emits
Deployment (Render/Railway) with a live demo link
Author

Built by Harrison Daniel Abolaji as a self-directed learning project to strengthen full-stack and real-time application skills.