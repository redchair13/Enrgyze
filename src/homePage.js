import React, { useEffect, useState } from "react";
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar';
import Background from './Background.webp';

const HomePage = () => {
    const [drinks, setDrinks] = useState([]);
    const [userCount, setUserCount] = useState(0);
    const [drinkCount, setDrinkCount] = useState(0);

    useEffect(() => {
        // Fetch energy drinks data from your server
        axios.get('http://localhost:9000/getAlldrinks')
            .then(response => {
                setDrinks(response.data);
            })
            .catch(error => {
                console.error('Error fetching drinks:', error);
            });

        // Fetch user count
        axios.get('http://localhost:9000/userCount')
            .then(response => {
                setUserCount(response.data.count);
            })
            .catch(error => console.error('Error fetching user count:', error));

        // Fetch drink count
        axios.get('http://localhost:9000/drinkCount')
            .then(response => {
                setDrinkCount(response.data.count);
            })
            .catch(error => console.error('Error fetching drink count:', error));
    }, []);

    const containerStyle = {
        backgroundImage: `url(${Background})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        color: 'Purple',
        padding: '50px',
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        height: "100vh"
    };

    const drinkDisplay = {
        backgroundColor: "#fafafa",
        padding: "20px",
        borderRadius: "8px",
        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
        width: "300px",
        margin: "10px",
        textAlign: "center"
    };

    const section = {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        width: "100%"
    }

    const boardDisplay = {
        backgroundColor: "white",
        padding: "20px",
        borderRadius: "8px",
        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
        width: "250px",
        margin: "10px",
        textAlign: "center",
        position: "absolute",
        top: "100px",
        right: "20px", 
    };


    return (
        <div style={containerStyle}>
            <Navbar /> <br></br>
            <h1 style={{ textAlign: "center", marginBottom: "20px" }}>Energy Drinks</h1>
            <div style={section}>
            <div>
                {drinks.map(drink => (
                    <div key={drink._id} style={drinkDisplay}>
                        <h2>{drink.companyName}</h2>
                        <img src={`http://localhost:9000/getEnergyDrinkImage/${drink._id}`} alt={drink.name} style={{ maxWidth: "100%", height: "auto" }} />
                        <h5>{drink.name}</h5>
                        <p>{drink.description}</p>
                        <Link to={`/DrinkPage/${drink._id}`} style={{ color: "blue", textDecoration: "none" }}>View Details</Link>
                    </div>
                ))}
            </div>
        </div>
            <div style={boardDisplay}>
                    <p style={{textAlign: "center", fontSize: "18px", lineHeight: "1.0"}}>Encyclopedia</p>
                    <p style={{textAlign: "center", fontSize: "15px", lineHeight: "1.0"}}>Total Users: {userCount}</p>
                    <p style={{textAlign: "center", fontSize: "15px", lineHeight: "1.0"}}>Total Drinks: {drinkCount}</p>
                    <nav style={{ marginTop: "20px", textAlign: "center" }}>
                        <Link to="/login" style={{ color: "blue", textDecoration: "none" }}>Log in?</Link>
                    </nav>
                </div>
        </div>
    );
};

export default HomePage;