import React, {useEfect, useEffect, useState} from "react";
import { useNavigate, Link } from 'react-router-dom';
import Navbar from './Navbar';
import Background from './Background.webp';
import axios from 'axios';

const HomePage = () => {

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

    const section = {
        display: "flex",
        justifyContent: "space-between",
        padding: "20px"
    }

    const boardDisplay = {
        display: "flex",
        justifyContent: "flex-end",
        paddingRight: "20px",
        flex: "1",
        paddingLeft: "20px"
    }

    const drinkDisplay = {
        display: "flex",
        justifyContent: "flex-start",
        paddingRight: "20px",
        flex: "1",
        paddingLeft: "20px",
        backgroundColor: "#fafafa",
        padding: "40px",
        borderRadius: "8px",
        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
        width: "300px"
    }

    const [drink, setDrink] = useState([]);

    useEffect(() => {
        axios.get('/getAlldrinks')
            .then(response => {
                setDrink(response.data);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    return (
        <div style={containerStyle}>
            <Navbar> </Navbar>

            <div style={section}>

                {drink.map(drink => (
                    <div style={drinkDisplay}>
                        {drink.pictureIDs}
                        {drink.name}
                        {drink.companyName}
                    </div>
                ))}


                <div style={boardDisplay}>

                </div>
            </div>
        </div>
    );
};

export default HomePage;

/*


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



            <div style={formStyle}>
                <h1 style={{ textAlign: "center" }}>Code the mainpage here</h1>
                <nav style={{ marginTop: "20px", textAlign: "center" }}>
                    <Link to="/login" style={{ color: "blue", textDecoration: "none" }}>Log in?</Link>
                </nav>
            </div>
 */