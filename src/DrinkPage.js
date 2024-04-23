import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import NavBar from "./Navbar"

function DrinkPage() {
    const { id } = useParams();
    const [drink, setDrink] = useState(null);

    // useEffect(() => {
    //     axios.get(`/DrinkPage/${id}`)
    //         .then(response => {
    //             setDrink(response.data);
    //         })
    //         .catch(error => console.error('Error fetching data:', error));
    // }, [id]);


    return (
        // <div>
        //     <h1 style={{textAlign: "center"}}> Energy Drink Page </h1>
        //     <NavBar />

        //     <h3 style={{textAlign: "center"}}> {drink.name} </h3>
        //     <h4 style={{textAlign: "center"}}> {drink.companyName} </h4>

        //     <div style={{display: "flex", justifyContent: "space-between", padding: "20px"}}>
        //         <Description desc={drink.description}/>
        //         <NutritionalFacts caf={drink.caffeineContent} cal={drink.calories} sug={drink.sugar}/>
        //     </div>
        //     <Review/>
        // </div>
        <p>Showing results for: {decodeURIComponent(id)}</p>
    );
}

export default DrinkPage



/*
<div>
        <h1></h1>
        <p>{drink.description}</p>
        { display images, reviews, and comments here }
</div>
 */


function Picture ({pic, alt}) {
    return (
        <div style={{display: "flex", justifyContent: "flex-end", paddingRight: "20px", flex: "1",
            paddingLeft: "20px"}}>
            {pic}
            {alt}
        </div>
    );
}


function Description({desc}) {
    //Get the description from the database
    //Display it within the description box
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
                        Amount per serving
                        <h2>Calories {cal}</h2>
                    </tr>
                    <tr><h3>Caffeine {caf}</h3></tr>
                    <tr>Total Sugars {sug} </tr>
                    </tbody>

                </table>
            </div>
        </div>
    );
}



function Review () {

    return (

        <div >
            <div style={{height: "500px", border: "5px solid"}}>
                <p style={{textAlign: "left", fontSize: "16px", lineHeight: "1.5"}}>

                </p>


            </div>
        </div>


    );
}