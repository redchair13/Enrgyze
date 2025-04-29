import React, { useEffect, useState } from "react";
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar';
import Background from './Background.webp';

const HomePage = () => {
    const [drinks, setDrinks] = useState([]);
    const [userCount, setUserCount] = useState(0);
    const [drinkCount, setDrinkCount] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:9000/getAlldrinks')
            .then(response => {
                const shuffled = [...response.data].sort(() => 0.5 - Math.random());
                setDrinks(shuffled.slice(0, 3));
            })
            .catch(error => console.error('Error fetching drinks:', error));

        axios.get('http://localhost:9000/userCount')
            .then(response => setUserCount(response.data.count))
            .catch(error => console.error('Error fetching user count:', error));

        axios.get('http://localhost:9000/drinkCount')
            .then(response => setDrinkCount(response.data.count))
            .catch(error => console.error('Error fetching drink count:', error));
    }, []);

    const containerStyle = {
        backgroundImage: `url(${Background})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        color: '#2E1A47',
        padding: '80px 50px 50px 50px',
        minHeight: '100vh',
        boxSizing: 'border-box'
    };

    const gridContainer = {
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
        gap: "40px",
        marginTop: "30px",
    };

    const drinkCard = {
        backgroundColor: "#f5f0fa",
        padding: "20px",
        borderRadius: "16px",
        boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.2)",
        width: "300px",
        textAlign: "center",
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
        cursor: "pointer",
    };

    const statsBar = {
        display: "flex",
        justifyContent: "center",
        marginTop: "40px",
        gap: "30px",
        backgroundColor: "#e4d6f1",
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.15)",
        width: "fit-content",
        marginLeft: "auto",
        marginRight: "auto"
    };

    return (
        <div style={containerStyle}>
            <Navbar />
            <h1 style={{ textAlign: "center", marginTop: "20px", color: "#FFFFFF" }}>Featured Energy Drinks</h1>

            <div style={gridContainer}>
                {drinks.map(drink => (
                    <div 
                        key={drink._id} 
                        style={drinkCard}
                        onClick={() => navigate(`/DrinkPage/${drink._id}`)}
                        onMouseEnter={e => {
                            e.currentTarget.style.transform = "scale(1.05)";
                            e.currentTarget.style.boxShadow = "0px 6px 25px rgba(0, 0, 0, 0.3)";
                        }}
                        onMouseLeave={e => {
                            e.currentTarget.style.transform = "scale(1)";
                            e.currentTarget.style.boxShadow = "0px 4px 20px rgba(0, 0, 0, 0.2)";
                        }}
                    >
                        <h2>{drink.companyName}</h2>
                        <img src={`http://localhost:9000/getEnergyDrinkImage/${drink._id}`} alt={drink.name} style={{ maxWidth: "100%", height: "auto", borderRadius: "8px" }} />
                        <h5>{drink.name}</h5>
                        <p>{drink.description}</p>
                    </div>
                ))}
            </div>

            <div style={statsBar}>
                <p><strong>Total Users:</strong> {userCount}</p>
                <p><strong>Total Drinks:</strong> {drinkCount}</p>
            </div>
        </div>
    );
};

export default HomePage;
