import React, { useState } from "react";
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios'; // Import axios here
import Navbar from './Navbar';
import Background from './Background.webp';

const CreateDrink = () => {

    const [drinkName, setDrinkName] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [caffeineContent, setCaffeineContent] = useState('');
    const [sugar, setSugar] = useState('');
    const [calories, setCalories] = useState('');
    const [description, setDescription] = useState('');

    const handleDrinkCreate = (event) => {
        event.preventDefault();

        const newDrink = {
            name: drinkName,
            companyName: companyName,
            description: description,
            caffeineContent: parseInt(caffeineContent),
            sugar: parseInt(sugar),
            calories: parseInt(calories),
        };

        axios.post('http://localhost:9000/createEnergyDrink', newDrink)
            .then(response => {
                console.log('Drink created successfully:', response.data);
                setDrinkName('');
                setCompanyName('');
                setCaffeineContent('');
                setSugar('');
                setCalories('');
                setDescription('');
            })
            .catch(error => {
                console.error('Error creating drink:', error);
            });
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

    const formContainerStyle = {
        backgroundColor: "#fafafa",
        padding: "20px",
        borderRadius: "8px",
        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
        width: "300px"
    };

    const inputGroupStyle = {
        marginBottom: "10px",
    };

    const inputStyle = {
        width: "100%", // Ensures input fields fit within the form
        padding: "8px",
        border: "1px solid #ccc",
        borderRadius: "4px",
        boxSizing: "border-box", // Makes padding included in width
        display: "block"
    };

    const buttonStyle = {
        width: "100%",
        padding: "10px",
        borderRadius: "5px",
        border: "none",
        marginBottom: "10px",
        backgroundColor: "#7B2C70",
        color: "white",
        cursor: "pointer"
    };

    const labelStyle = {
        display: "block",
        marginBottom: "5px",
        fontWeight: "bold"
    };

    const styles = { // Adjusted styles
        inputGroup: inputGroupStyle,
        label: labelStyle,
        input: inputStyle,
        button: buttonStyle,
    };

    if (localStorage.getItem("loggedInUser") == null) {
        return (
            <div style={containerStyle}>
                <Navbar />
                <Link to="/login" style={formContainerStyle} >Please log in to create an energy drink</Link>
            </div>
        );
    }


    return (
        <div style={containerStyle}>    
        <Navbar> </Navbar>
            <div style={formContainerStyle}>
                <h3>Create Energy Drink</h3>
                <form onSubmit={handleDrinkCreate}>
                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Drink Name:</label>
                        <input style={styles.input} type="text" value={drinkName} onChange={(e) => setDrinkName(e.target.value)} required />
                    </div>
                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Company Name:</label>
                        <input style={styles.input} type="text" value={companyName} onChange={(e) => setCompanyName(e.target.value)} required />
                    </div>
                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Caffeine Content (mg):</label>
                        <input style={styles.input} type="number" value={caffeineContent} onChange={(e) => setCaffeineContent(e.target.value)} required />
                    </div>
                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Sugar (mg):</label>
                        <input style={styles.input} type="number" value={sugar} onChange={(e) => setSugar(e.target.value)} required />
                    </div>
                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Calories (cal):</label>
                        <input style={styles.input} type="number" value={calories} onChange={(e) => setCalories(e.target.value)} required />
                    </div>
                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Description:</label>
                        <textarea style={styles.input} value={description} onChange={(e) => setDescription(e.target.value)} required />
                    </div>
                    <button style={styles.button} type="submit">Create Drink</button>
                </form>
                <Link to="/" style={styles.label}>Back to Home</Link>
            </div>
        </div>
    );
};

export default CreateDrink;
