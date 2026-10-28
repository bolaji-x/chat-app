import axios from "axios";
import { useState, useEffect } from "react";
import { io } from "socket.io-client";

const socket = io ('http://localhost:5000');

export default function Chat() {
    const [message, setMessage] = useState('');
    const [chatLog, setChatLog] = useState([]);
    const username = localStorage.getItem('username');

    useEffect(() => {
        axios.get('http://localhost:5000/api/messages')
            .then((response) => {
                const formattedMessages = response.data.map((row) => ({
                    user: row.username,
                    text: row.text
                }));
                setChatLog(formattedMessages);
            })
            .catch((error) => {
                console.log(error);
            });

        socket.on('chat message', (msg) => {
            setChatLog([...chatLog, msg]);
        });
    }, []);


    const sendMessage = (e) => {
        e.preventDefault();
        socket.emit('chat message', { user: username, text: message });
        setMessage('');
    };

    const handleLogout = () => {
         localStorage.removeItem('token');
        localStorage.removeItem('username');
        window.location.reload();
    };

    return (
        <div className="chat-container">
            <div className="chat-header">
                <span>Welcome, {username}</span>
                <button className="logout-button" onClick={handleLogout}>Logout</button>
            </div>
            <div className="chat-messages">
                {chatLog.map((msg, index) => (
                    <div key={index} className="chat-message">
                        <strong>{msg.user}:</strong> {msg.text}
                    </div>
                ))}
            </div>
            <form className="chat-input-form" onSubmit={sendMessage}>
                <input
                    className="chat-input"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type a message..."
                />
                <button className="chat-send-button">Send</button>
            </form>
        </div>
    );
}