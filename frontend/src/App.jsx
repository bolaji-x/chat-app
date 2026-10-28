import { useState } from "react";
import Login from "./components/Login";
import Register from "./components/Register";
import Chat from "./Chat";

export default function App() {
    const [isLogin, setIsLogin] = useState(true);
    const [token, setToken] = useState(localStorage.getItem('token'));

    const toggleForm = () => {
        setIsLogin(!isLogin);
    };

    if (token) {
        return <Chat />;
    }

    return (
        <div className="auth-page">
            {isLogin ? <Login /> : <Register />}
            <button className="toggle-button" onClick={toggleForm}>
                {isLogin ? 'Need an account? Register' : 'Already have an account? Login'}
            </button>
        </div>
    );
}