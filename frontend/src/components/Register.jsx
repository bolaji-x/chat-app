import { useState } from "react"
import axios from "axios"

export default function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const handleNameChange = (e) => setName(e.target.value);
    const handleEmailChange = (e) => setEmail(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!email.includes('@') || password.length < 6){
            alert('please fill all field')
            return;
        }

        axios.post('http://localhost:5000/auth/register', {
            username: name,
            email: email,
            password: password
        })
        .then((response) => {
            console.log(response.data);
            setName('');
            setEmail('');
            setPassword('');
         
        })
        .catch((error) => {
            console.log(error);
        });
    }

    return (
        <>
        <div className="auth-container">
            <form className="auth-form" onSubmit={handleSubmit}>
                <input className="auth-input" type="text" placeholder="name" onChange={handleNameChange} value={name} />
                <input className="auth-input" type="text" placeholder="Email" onChange={handleEmailChange} value={email} />
                <input  className="auth-input" type="password" placeholder="password" onChange={handlePasswordChange} value={password} />
                <button className="auth-input">Register</button>
            </form>
            </div>
        </>
    )
}