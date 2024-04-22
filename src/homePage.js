import React, { useState } from "react";
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar'

const HomePage = () => {

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
            <Navbar> </Navbar>
            <div style={formStyle}>
                <h1 style={{ textAlign: "center" }}>Code the mainpage here</h1>
                <nav style={{ marginTop: "20px", textAlign: "center" }}>
                    <Link to="/login" style={{ color: "blue", textDecoration: "none" }}>Log in?</Link>
                </nav>
            </div>
        </div>
    );
};

export default HomePage;
