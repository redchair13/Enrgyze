import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import NavBar from "./Navbar"

function DrinkPage() {
    const { id } = useParams();
    const [drink, setDrink] = useState([]);

    useEffect(() => {
        axios.get(`/drinkPage/${id}`)
            .then(response => {
                setDrink(response.data);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, [id]);

    // Check if 'drink' is not null before rendering its details
    return (
        <div>
            <h1 style={{textAlign: "center"}}>Energy Drink Page</h1>
            <NavBar />
            {( // Only render the content if 'drink' is not null
                <>
                    <h3 style={{textAlign: "center"}}>{drink.name}</h3>
                    <h4 style={{textAlign: "center"}}>{drink.companyName}</h4>

                    <div style={{display: "flex", justifyContent: "space-between", padding: "20px"}}>
                        <Description desc={drink.description}/>
                        <NutritionalFacts caf={drink.caffeineContent} cal={drink.calories} sug={drink.sugar}/>
                    </div>
                    <Review/>
                </>
            )}
        </div>
    );
}

export default DrinkPage

function Description({desc}) {
    return (
        <div style={{
            display: "flex", justifyContent: "flex-start", paddingRight: "20px", flex: "1",
            paddingLeft: "20px"
        }}>
            <div style={{width: "500px", border: "5px solid"}}>
                <p style={{textAlign: "left", fontSize: "14px", lineHeight: "1.0"}}>
                    {desc}
                </p>
            </div>
        </div>
    );
}

function NutritionalFacts ({cal, sug, caf}) {
    return (
        <div style={{display: "flex", justifyContent: "flex-end", paddingRight: "20px", flex: "1",
                    paddingLeft: "20px"}}>
            <div style={{width: "300px", height: "300px", border: "5px solid"}}>
                <table>
                    <thead>
                        <tr><h2>Nutritional Facts</h2></tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Amount per serving</td>
                            <td><h2>Calories {cal}</h2></td>
                        </tr>
                        <tr><td><h3>Caffeine {caf}</h3></td></tr>
                        <tr><td>Total Sugars {sug}</td></tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}

function Review() {
    return (
        <div style={{height: "500px", border: "5px solid"}}>
            <p style={{textAlign: "left", fontSize: "16px", lineHeight: "1.5"}}>
                {/* Additional content or state handling for reviews could be here */}
            </p>
        </div>
    );
}
