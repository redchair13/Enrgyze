// CreateDrink.js with playful & modern animations!

import React, { useState } from "react";
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar';
import Background from './Background.webp';
import { motion } from 'framer-motion';

const CreateDrink = () => {
    const [drinkName, setDrinkName] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [caffeineContent, setCaffeineContent] = useState('');
    const [sugar, setSugar] = useState('');
    const [calories, setCalories] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);

    const handleImageChange = (event) => {
        setImage(event.target.files[0]);
    };

    const handleDrinkCreate = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('name', drinkName);
        formData.append('companyName', companyName);
        formData.append('caffeineContent', parseInt(caffeineContent));
        formData.append('sugar', parseInt(sugar));
        formData.append('calories', parseInt(calories));
        formData.append('description', description);
        if (image) formData.append('image', image);

        try {
            const response = await axios.post('http://localhost:9000/createEnergyDrink', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            setDrinkName(''); setCompanyName(''); setCaffeineContent(''); setSugar(''); setCalories(''); setDescription(''); setImage(null);
            alert("🎉 Drink Created Successfully!");
        } catch (error) {
            console.error('Error creating drink:', error);
        }
    };

    const containerStyle = {
        backgroundImage: `url(${Background})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: 'Purple',
        paddingTop: '80px',
        paddingBottom: '40px',
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh"
    };

    const formContainerStyle = {
        backgroundColor: "#fafafa",
        padding: "30px",
        borderRadius: "16px",
        boxShadow: "0px 0px 20px rgba(123, 44, 112, 0.3)",
        width: "400px"
    };

    const styles = {
        inputGroup: { marginBottom: "12px" },
        label: { display: "block", marginBottom: "5px", fontWeight: "bold" },
        input: {
            width: "100%",
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "6px",
            boxSizing: "border-box",
            transition: "0.2s",
        },
        inputFocus: {
            outline: "none",
            borderColor: "#7B2C70"
        },
        button: {
            width: "100%",
            padding: "12px",
            borderRadius: "8px",
            border: "none",
            marginTop: "15px",
            backgroundColor: "#7B2C70",
            color: "white",
            cursor: "pointer",
            fontWeight: "bold",
            fontSize: "16px"
        }
    };

    if (localStorage.getItem("loggedInUser") == null) {
        return (
            <div style={containerStyle}>
                <Navbar />
                <Link to="/login" style={formContainerStyle}>
                    Please log in to create an energy drink
                </Link>
            </div>
        );
    }

    return (
        <div style={containerStyle}>
            <Navbar />
            <motion.div
                style={formContainerStyle}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 100, damping: 10 }}
            >
                <motion.h3
                    initial={{ x: -100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >Create Energy Drink</motion.h3>

                <form onSubmit={handleDrinkCreate}>
                    {[{ label: "Drink Name", value: drinkName, setter: setDrinkName },
                      { label: "Company Name", value: companyName, setter: setCompanyName },
                      { label: "Caffeine Content (mg)", value: caffeineContent, setter: setCaffeineContent, type: "number" },
                      { label: "Sugar (mg)", value: sugar, setter: setSugar, type: "number" },
                      { label: "Calories (cal)", value: calories, setter: setCalories, type: "number" }].map((field, i) => (
                        <div style={styles.inputGroup} key={i}>
                            <label style={styles.label}>{field.label}:</label>
                            <input
                                type={field.type || "text"}
                                style={styles.input}
                                value={field.value}
                                onChange={(e) => field.setter(e.target.value)}
                                required
                            />
                        </div>
                    ))}

                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Description:</label>
                        <textarea
                            style={styles.input}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />
                    </div>
                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Image:</label>
                        <input
                            style={styles.input}
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            required
                        />
                    </div>

                    <motion.button
                        style={styles.button}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        type="submit"
                    >Create Drink</motion.button>
                </form>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                >
                    <Link to="/" style={{ display: "block", marginTop: "20px", textAlign: "center", color: "blue" }}>
                        Back to Home
                    </Link>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default CreateDrink;
