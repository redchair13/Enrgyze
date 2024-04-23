import { useParams, Link} from 'react-router-dom';
import Navbar from './Navbar';
import Background from './Background.webp';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const SearchResults = () => {

  const { search } = useParams();
  const [drinks, setDrinks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
        const encodedSearch = encodeURIComponent(search);
        const response = await axios.get(`http://localhost:9000/searchDrinks?search=${encodedSearch}`);
        setDrinks(response.data);
    };

    fetchData();
}, [search]);

  const displayDrinks = drinks.map((drink, index) => (
    <div key={index}>
      <h3>{drink.companyName}</h3>
      <h5>{drink.name}</h5>
      <p>{drink.description}</p>
      <Link to={`/drinkPage/${drink._id}`}><p>Go to drink</p></Link>
    </div>
  ));

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
            <h2>Search Results</h2>
          <p>Showing results for: {decodeURIComponent(search)}</p>
          {drinks.length ? displayDrinks : <p>No results found.</p>}
          </div>
        </div>
    );
};

export default SearchResults;