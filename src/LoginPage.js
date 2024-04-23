import React, { useState } from "react";
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar';
import Background from './Background.webp';

const LoginPage = () => {
    const navigate = useNavigate();
    const loggedInUser = localStorage.getItem('loggedInUser');
    const [login, setLogin] = useState({
        username: "",
        password: ""
    });

    const handleSignOut = (event) => {
        event.preventDefault()
        localStorage.clear()
        navigate("/login");
    }

    
    const handleInput = (event) => {
        const { name, value } = event.target;
        setLogin(previousState => ({
            ...previousState,
            [name]: value
        }));
    };

    const handleLogin = (event) => {
        event.preventDefault();
        axios.get('http://localhost:9000/getUser', { params: { username: login.username, password: login.password } })
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
            .catch((err) => alert('Error in Login'));
    };

    const containerStyle = {
        backgroundImage: `url(${Background})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: 'Purple',
        padding: '50px',
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh"
    };

    const formStyle = {
        backgroundColor: "#fafafa",
        padding: "40px",
        borderRadius: "8px",
        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
        width: "300px"
    };

    const buttonStyle = {
        width: "100%",
        padding: "10px",
        borderRadius: "5px",
        border: "none",
        marginBottom: "10px"
    };

    return (
        <div style={containerStyle}>
            <Navbar> </Navbar>
            <div style={formStyle}>
                <h1 style={{ textAlign: "center" }}>Welcome to Enrgyze!</h1>
                {loggedInUser ? (
                    <p>Welcome, {loggedInUser}!</p>
                ) : (
                    <form onSubmit={handleLogin}>
                        <label style={{ color: "blue", display: "block", marginBottom: "5px" }}>User ID:</label>
                        <input name="username" value={login.username} onChange={handleInput} style={{ width: "100%", marginBottom: "10px", padding: "5px" }} placeholder="Username" />
                        <label style={{ color: "blue", display: "block", marginBottom: "5px" }}>Password:</label>
                        <input type="password" value={login.password} name="password" onChange={handleInput} style={{ width: "100%", marginBottom: "10px", padding: "5px" }} placeholder="Password" />
                        <button type="submit" style={{ ...buttonStyle, backgroundColor: "blue", color: "white" }}>Submit</button>
                    </form>
                )}
                <nav style={{ marginTop: "20px", textAlign: "center" }}>
                    <span style={{ color: "black" }}>Don't have an account? </span>
                    <Link to="/SignUp" style={{ color: "blue", textDecoration: "none" }}>Sign up</Link>
                </nav>
                { loggedInUser != null &&
                    <button type="button" onClick={(event) => {
                        handleSignOut(event)
                        }}>Sign Out</button>
                }
                <Link to="/">
                    <button style={{ ...buttonStyle, backgroundColor: "#ccc", color: "black" }}>Back To Home Page?</button>
                </Link>
            </div>
        </div>
    );
};

export default LoginPage;
