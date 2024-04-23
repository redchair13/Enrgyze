import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./navStyles.css";

function Navbar() {
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    const handleInputChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter' && searchQuery) {
            navigate(`/SearchResults/${encodeURIComponent(searchQuery)}`);
        }
    };
    

    return (
        <nav className="navBar">
            <ul>
                <li><a href="/">Home</a></li>
                <li><a href="/login">Log in</a></li>
                <li><a href="/CreateDrink">Add a Drink</a></li>
                <li>
                    <input
                        type="text"
                        placeholder="Search a drink..."
                        className="searchBar"
                        value={searchQuery}
                        onChange={handleInputChange}
                        onKeyPress={handleKeyPress}
                    />
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;