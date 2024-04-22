import React from "react";
import { Link } from 'react-router-dom';
import Navbar from './Navbar'

const MainPage = () => {
    const containerStyle = {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#fafafa"
    };

    const contentStyle = {
        backgroundColor: "#fff",
        padding: "40px",
        borderRadius: "8px",
        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
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
            <div style={contentStyle}>
                <h1 style={{ textAlign: "center" }}>Code the mainpage here</h1>
                <nav style={{ marginTop: "20px", textAlign: "center" }}>
                    <Link to="/login" style={{ color: "blue", textDecoration: "none" }}>Log in?</Link>
                </nav>
            </div>
        </div>
    );
};

export default MainPage;