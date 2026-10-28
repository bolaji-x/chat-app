import React, { useState } from "react";
import axios from "axios";

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState(''); 

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMsg(''); 

        if (!email || !password) {
            setErrorMsg('Please fill in all fields');
            return;
        }

        try {
            const response = await axios.post('http://localhost:5000/auth/login', {
                email: email,
                password: password
            });

            console.log("Login Success Data:", response.data);
            
            const token = response.data?.token;
            const username = response.data?.user?.username || response.data?.username;

            if (token) localStorage.setItem('token', token);
            if (username) localStorage.setItem('username', username);

            // Redirect user to dashboard on successful login
            window.location.href = '/dashboard'; 

        } catch (error) {
            console.error("Axios Login Error:", error);
            
            // This safely captures the precise error text sent from your Node.js backend
            const backendError = error.response?.data?.message || 'Invalid email or password';
            setErrorMsg(backendError);
        }
    }

    return (
        <div className="auth-container">
            <form className="auth-form" onSubmit={handleSubmit}>
                {/* Dynamically renders the error banner if errorMsg has text */}
                {errorMsg && <div className="auth-error-banner" style={{ color: 'red', marginBottom: '10px' }}>{errorMsg}</div>}
                
                <input 
                    className="auth-input" 
                    type="email" 
                    placeholder="Email" 
                    onChange={(e) => setEmail(e.target.value)} 
                    value={email} 
                />
                <input 
                    className="auth-input" 
                    type="password" 
                    placeholder="Password" 
                    onChange={(e) => setPassword(e.target.value)} 
                    value={password} 
                />
                <button className="auth-button" type="submit">Login</button>
            </form>
        </div>
    );
}
