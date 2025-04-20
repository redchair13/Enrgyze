import React, { useState } from "react";
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar';
import Background from './Background.webp';

const Signup = () => {
    const navigate = useNavigate();
    const [signupValues, setSignupValues] = useState({
        firstName: '', lastName: '', username: '', password: ''
    });

    const handleInput = (event) => {
        const { name, value } = event.target;
        setSignupValues(prev => ({ ...prev, [name]: value }));
    };

    const handleSignUp = (event) => {
        event.preventDefault();
        axios.post('http://localhost:9000/createUser', signupValues)
            .then(() => {
                alert('Successfully signed up!');
                navigate("/login");
            })
            .catch(() => alert('Error in Signing Up'));
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
                <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Create Account</h2>
                <form onSubmit={handleSignUp}>
                    <input name="firstName" className="glass-input" value={signupValues.firstName} onChange={handleInput} placeholder="First Name" />
                    <input name="lastName" className="glass-input" value={signupValues.lastName} onChange={handleInput} placeholder="Last Name" />
                    <input name="username" className="glass-input" value={signupValues.username} onChange={handleInput} placeholder="Username" />
                    <input type="password" name="password" className="glass-input" value={signupValues.password} onChange={handleInput} placeholder="Password" />
                    <button type="submit" className="glass-button">Sign Up</button>
                </form>
                <nav style={{ marginTop: "20px", textAlign: "center" }}>
                    <span>Already have an account? </span>
                    <Link to="/login" style={{ color: "#9fd4ff" }}>Log in</Link>
                </nav>
            </div>
        </div>
    );
};

export default Signup;
