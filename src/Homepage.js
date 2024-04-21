import React, { useState } from "react";
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const HomePage = () => {
    const navigate = useNavigate();
    const loggedInUser = localStorage.getItem('loggedInUser');
    const [login, setLogin] = useState({
        username: "",
        password: ""
    });

    
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
                    alert('Login Successful');
                } else {
                    alert('Wrong Credentials');
                }
            })
            .catch((err) => alert('Error in Login'));
    };

    const containerStyle = {
        backgroundImage: 'url("https://cdnsm5-hosted.civiclive.com/UserFiles/Servers/Server_15209001/Image/Work/Economic_Development/Resources/redBull%20Stock.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: 'Blue',
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
            <div style={formStyle}>
                <h1 style={{ textAlign: "center" }}>Welcome to EnergizeMe!</h1>
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
                <Link to="/MainPage">
                    <button style={{ ...buttonStyle, backgroundColor: "#ccc", color: "black" }}>Or Continue as Guest</button>
                </Link>
            </div>
        </div>
    );
};

export default HomePage;
