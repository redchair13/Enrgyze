import React from "react";
import { Link } from 'react-router-dom';

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
            <div style={contentStyle}>
                <h1 style={{ textAlign: "center" }}>Code the mainpage here</h1>
                <nav style={{ marginTop: "20px", textAlign: "center" }}>
                    <Link to="/" style={{ color: "blue", textDecoration: "none" }}>Back to Homepage</Link>
                </nav>
            </div>
        </div>
    );
};

export default MainPage;
