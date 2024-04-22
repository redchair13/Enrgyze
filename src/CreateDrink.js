import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const CreateDrink = () => {
    const [drinkName, setDrinkName] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [tags, setTags] = useState('');
    const [nutritionFacts, setNutritionFacts] = useState('');
    const [caffeineContent, setCaffeineContent] = useState('');
    const [description, setDescription] = useState('');

    const handleDrinkCreate = (event) => {
        event.preventDefault();

        // Split tags into an array
        const tagsArray = tags.split(" ").map(tag => tag.trim());

        // Create the drink object to send to the server
        const newDrink = {
            name: drinkName,
            companyName: companyName,
            description: description,
            tagIDs: tagsArray.join(), // Convert array to comma-separated string
            caffieneContent: parseInt(caffeineContent),
            nutritionFacts: nutritionFacts,
            // Add other properties according to your schema if needed
        };

        // Send the request to create the drink
        axios.post('http://localhost:9000/createEnergyDrink', newDrink)
            .then(response => {
                console.log('Drink created successfully:', response.data);
                // Optionally, redirect or show a success message

                // Reset form fields
                setDrinkName('');
                setCompanyName('');
                setTags('');
                setNutritionFacts('');
                setCaffeineContent('');
                setDescription('');
            })
            .catch(error => {
                console.error('Error creating drink:', error);
                // Handle error, show error message, etc.
            });
    };

    // Define your inline styles here
    const styles = {
        // Define your styles here as before
    };

    return (
        <div style={styles.container}>
            <h2>Create Energy Drink</h2>
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
                    <label style={styles.label}>Tags:</label>
                    <input style={styles.input} type="text" value={tags} onChange={(e) => setTags(e.target.value)} required />
                </div>
                <div style={styles.inputGroup}>
                    <label style={styles.label}>Nutrition Facts:</label>
                    <input style={styles.input} type="text" value={nutritionFacts} onChange={(e) => setNutritionFacts(e.target.value)} required />
                </div>
                <div style={styles.inputGroup}>
                    <label style={styles.label}>Caffeine Content (mg):</label>
                    <input style={styles.input} type="number" value={caffeineContent} onChange={(e) => setCaffeineContent(e.target.value)} required />
                </div>
                <div style={styles.inputGroup}>
                    <label style={styles.label}>Description:</label>
                    <textarea style={styles.input} value={description} onChange={(e) => setDescription(e.target.value)} required />
                </div>
                <button style={styles.button} type="submit">Create Drink</button>
            </form>
            <Link to="/" style={styles.label}>Back to Home</Link>
        </div>
    );
}

export default CreateDrink;