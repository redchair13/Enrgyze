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
        // The implementation will be as before
    };

    // Define your inline styles here
    const styles = {
        container: {
            fontFamily: 'Arial, sans-serif',
            backgroundColor: '#F3F4F6',
            padding: '2rem',
            borderRadius: '0.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            width: '100%',
            maxWidth: '800px',
            margin: 'auto'
        },
        inputGroup: {
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem',
        },
        input: {
            padding: '1rem',
            border: '2px solid #D1D5DB',
            borderRadius: '0.375rem',
        },
        button: {
            padding: '1rem',
            backgroundColor: '#4F46E5',
            color: 'white',
            border: 'none',
            borderRadius: '0.375rem',
            cursor: 'pointer',
        },
        label: {
            fontWeight: 'bold',
            fontSize: '1rem',
            color: '#4B5563'
        }
    };

    return (
        <div style={styles.container}>
            <Navbar> </Navbar>
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
