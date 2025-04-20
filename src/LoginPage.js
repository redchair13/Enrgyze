import React, { useState } from "react";
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar';
import Background from './Background.webp';

const LoginPage = () => {
    const navigate = useNavigate();
    const loggedInUser = localStorage.getItem('loggedInUser');
    const [login, setLogin] = useState({ username: "", password: "" });

    const handleInput = (event) => {
        const { name, value } = event.target;
        setLogin(prev => ({ ...prev, [name]: value }));
    };

    const handleLogin = (event) => {
        event.preventDefault();
        axios.get('http://localhost:9000/getUser', { params: login })
            .then((res) => {
                if (res.data) {
                    localStorage.setItem('loggedInUser', login.username);
                    localStorage.setItem('loggedInUserID', res.data._id);
                    alert('Login Successful');
                    navigate("/");
                } else {
                    alert('Wrong Credentials');
                }
            })
            .catch(() => alert('Error in Login'));
    };

    const handleSignOut = (event) => {
        event.preventDefault();
        localStorage.clear();
        navigate("/login");
    };

    const containerStyle = {
        backgroundImage: `url(${Background})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh"
    };

    return (
        <div style={containerStyle}>
            <Navbar />
            <div className="form-glass">
                <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Welcome to Enrgyze!</h2>
                {loggedInUser ? (
                    <>
                        <p style={{ textAlign: "center" }}>You're already logged in as {loggedInUser}</p>
                        <button onClick={handleSignOut} className="glass-button">Sign Out</button>
                    </>
                ) : (
                    <form onSubmit={handleLogin}>
                        <input name="username" className="glass-input" value={login.username} onChange={handleInput} placeholder="Username" />
                        <input type="password" name="password" className="glass-input" value={login.password} onChange={handleInput} placeholder="Password" />
                        <button type="submit" className="glass-button">Log In</button>
                    </form>
                )}
                <nav style={{ marginTop: "20px", textAlign: "center" }}>
                    <span>Don't have an account? </span>
                    <Link to="/SignUp" style={{ color: "#9fd4ff" }}>Sign up</Link>
                </nav>
                <Link to="/" style={{ display: "block", marginTop: "15px", textAlign: "center", color: "#ccc" }}>Back to Home</Link>
            </div>
        </div>
    );
};

export default LoginPage;
