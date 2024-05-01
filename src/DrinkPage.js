import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import NavBar from "./Navbar"

function DrinkPage() {
    const { id } = useParams();
    const [drink, setDrink] = useState([]);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [commentTitle, setCommentTitle] = useState('');
    const [upvoteCount, setUpvoteCount] = useState(0); 
    const loggedIn = localStorage.getItem("loggedInUser") != null

    function Review() {
        return (
            <div style={{height: "500px", border: "5px solid"}}>
                <p style={{textAlign: "left", fontSize: "16px", lineHeight: "1.5"}}>
                <div style={{ padding: "20px" }}>
                    <h2>Comments</h2>
                    {comments?.map(comment => (
                        <div key={comment._id}>
                            <h3>{comment.posterUsername}: {comment.title}</h3> 
                            <p>{comment.text}</p>
                        </div>
                    ))}
                </div>
                </p>
            </div>
        );
    }


    useEffect(() => {
        const fetchDrinkData = async () => {
            try {
                const drinkResponse = await axios.get(`http://localhost:9000/drinkPage/${id}`);
                setDrink(drinkResponse.data);
                setUpvoteCount(drinkResponse.data.upvoteCount);
    
                const commentsResponse = await axios.get(`http://localhost:9000/getCommentsByDrink/${id}`);
                setComments(commentsResponse.data);
            } catch (error) {
                alert('Error fetching data:', error);
            }
        };
    
        fetchDrinkData();
    }, [id]);
    

    const handleUpvote = () => {
        axios.post('http://localhost:9000/upvote', { id })
            .then(response => {
                setUpvoteCount(prevCount => prevCount + 1);
            })
            .catch(error => alert('Error upvoting:', error));
    };

    const handleDownvote = () => {
        axios.post('http://localhost:9000/downvote', { id })
            .then(response => {
                setUpvoteCount(prevCount => prevCount - 1);
            })
            .catch(error => alert('Error downvoting:', error));
    };

    const handleCommentChange = (event) => {
        setNewComment(event.target.value);
    };

    const handleTitleChange = (event) => {
        setCommentTitle(event.target.value);
    };

    const submitComment = async () => {
        try {
            const response = await axios.post('http://localhost:9000/createComment', {
                posterUserID: localStorage.getItem('loggedInUserID'),
                posterUsername: localStorage.getItem('loggedInUser'),
                drinkID: id,
                text: newComment,
                title: commentTitle, 
                timePosted: Date.now()
            });
            console.log(comments)
            setNewComment('');  
            setCommentTitle('');
            setComments([...comments, response.data]);  
        } catch (error) {
            alert('Error posting comment:', error);
        }
    };

    
    return (
        <div>
            {/* {id} */}
            <NavBar /> <br></br> <br></br><br></br>
            <h1 style={{textAlign: "center"}}>{drink.companyName}</h1>
            <img src={`http://localhost:9000/getEnergyDrinkImage/${drink._id}`} alt={drink.name} style={{ maxWidth: "25%", height: "auto" }} />
            <h3 style={{textAlign: "center"}}>{drink.name}</h3>
        
            <div style={{display: "flex", justifyContent: "space-between", padding: "20px"}}>
                <Description desc={drink.description} upvoteCount={upvoteCount} onUpvote={handleUpvote} onDownvote={handleDownvote}/> 
                <NutritionalFacts caf={drink.caffeineContent} cal={drink.calories} sug={drink.sugar}/>
            </div>
            <Review/>
            {loggedIn ? (
                <div>
                    <textarea placeholder="Enter title here..." value={commentTitle} onChange={handleTitleChange} />
                    <textarea placeholder="Type your Comment!" value={newComment} onChange={handleCommentChange} />
                    <button onClick={submitComment}>Submit Comment</button>
                </div>
            ) : (
                <div>To comment, you must log in! <a href="/login">Log in</a></div>
            )}
        </div>
    );
}

export default DrinkPage;

function Description({ desc, upvoteCount, onUpvote, onDownvote }) {
    const loggedIn = localStorage.getItem("loggedInUser") != null;
    return (
        <div style={{
            display: "flex", flexDirection: "column", paddingRight: "20px", flex: "1",
            paddingLeft: "20px"
        }}>
            <div style={{ marginBottom: "20px" }}>
                <span style={{ fontWeight: "bold" }}>Votes: {upvoteCount} </span>
                {loggedIn ? (
                    <>
                        <button onClick={onUpvote}>Upvote</button>
                        <button onClick={onDownvote}>Downvote</button>
                    </>
                ) : (
                    <a href="/login">To upvote/downvote, log in!</a>
                )}
            </div>
            <div style={{ width: "100%", maxWidth: "800px", border: "5px solid" }}>
                <p style={{ textAlign: "left", fontSize: "14px", lineHeight: "1.0" }}>
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
                        <tr>Nutrition Facts:</tr>
                    </thead>

                    <tbody>
                        <tr>Calories: {cal}</tr>
                        <tr>Caffeine: {caf}</tr>
                        <tr>Total Sugars: {sug}</tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}
