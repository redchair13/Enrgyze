// Updated SearchResults.js: full-height container for longer appearance

import { useParams, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import Background from './Background.webp';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const SearchResults = () => {
  const { search } = useParams();
  const [drinks, setDrinks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const encodedSearch = encodeURIComponent(search);
      const response = await axios.get(`http://localhost:9000/searchDrinks?search=${encodedSearch}`);
      setDrinks(response.data);
    };
    fetchData();
  }, [search]);

  const containerStyle = {
    backgroundImage: `url(${Background})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    paddingTop: '80px',
    paddingBottom: '60px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    minHeight: '120vh' // Increased from 100vh to 120vh
  };

  const cardContainerStyle = {
    backgroundColor: '#fafafa',
    padding: '30px',
    borderRadius: '16px',
    boxShadow: '0px 0px 20px rgba(123, 44, 112, 0.3)',
    width: '800px',
    maxHeight: '85vh', // More vertical space
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column'
  };

  const cardStyle = {
    backgroundColor: '#fff',
    padding: '15px',
    borderRadius: '16px',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
    marginBottom: '15px',
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
    cursor: 'pointer',
    transition: 'transform 0.2s ease-in-out'
  };

  const imageStyle = {
    width: '100px',
    height: '100px',
    objectFit: 'cover',
    borderRadius: '12px'
  };

  const displayDrinks = drinks.map((drink, index) => (
    <motion.div
      key={index}
      style={cardStyle}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.03 }}
      transition={{ delay: index * 0.05 }}
      onClick={() => navigate(`/drinkPage/${drink._id}`)}
    >
      <img
        src={`http://localhost:9000/getEnergyDrinkImage/${drink._id}`}
        alt={drink.name}
        style={imageStyle}
      />
      <div>
        <h3>{drink.companyName}</h3>
        <h5>{drink.name}</h5>
        <p>{drink.description}</p>
        <p style={{ color: '#7B2C70', textDecoration: 'underline' }}>View Details</p>
      </div>
    </motion.div>
  ));

  return (
    <div style={containerStyle}>
      <Navbar />
      <motion.div
        style={cardContainerStyle}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'spring', stiffness: 90, damping: 10 }}
      >
        <h2>Search Results</h2>
        <p>Showing results for: <strong>{decodeURIComponent(search)}</strong></p>
        {drinks.length ? displayDrinks : <p>No results found.</p>}
      </motion.div>
    </div>
  );
};

export default SearchResults;