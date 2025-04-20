import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import NavBar from "./Navbar";
import Background from './Background.webp';

function DrinkPage() {
    const { id } = useParams();
    const [drink, setDrink] = useState([]);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [commentTitle, setCommentTitle] = useState('');
    const [upvoteCount, setUpvoteCount] = useState(0);
    const loggedIn = localStorage.getItem("loggedInUser") != null;

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
            .then(() => setUpvoteCount(prev => prev + 1))
            .catch(error => alert('Error upvoting:', error));
    };

    const handleDownvote = () => {
        axios.post('http://localhost:9000/downvote', { id })
            .then(() => setUpvoteCount(prev => prev - 1))
            .catch(error => alert('Error downvoting:', error));
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
            setNewComment('');
            setCommentTitle('');
            setComments([...comments, response.data]);
        } catch (error) {
            alert('Error posting comment:', error);
        }
    };

    return (
        <div style={{
            backgroundImage: `url(${Background})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            minHeight: '100vh',
            paddingTop: '60px',
            color: 'white',
        }}>
            <NavBar />
            <div style={{
                maxWidth: "1100px",
                margin: "auto",
                background: "rgba(20, 20, 60, 0.85)",
                padding: "50px",
                borderRadius: "16px",
                marginTop: "40px",
                boxShadow: "0 0 20px rgba(0,0,0,0.5)"
            }}>
                <h1 style={{ textAlign: "center", fontSize: "48px", marginBottom: "20px" }}>{drink.companyName}</h1>
                <div style={{ textAlign: "center" }}>
                    <img src={`http://localhost:9000/getEnergyDrinkImage/${drink._id}`} alt={drink.name} style={{ maxWidth: "300px", borderRadius: "10px", boxShadow: "0 0 12px black" }} />
                </div>
                <h2 style={{ textAlign: "center", marginTop: "20px", fontSize: "32px" }}>{drink.name}</h2>

                <div style={{ display: "flex", justifyContent: "space-between", gap: "30px", marginTop: "30px", flexWrap: "wrap" }}>
                    <Description desc={drink.description} upvoteCount={upvoteCount} onUpvote={handleUpvote} onDownvote={handleDownvote} />
                    <NutritionalFacts cal={drink.calories} sug={drink.sugar} caf={drink.caffeineContent} />
                </div>

                <Review comments={comments} />

                {loggedIn ? (
                    <div style={{ marginTop: "40px" }}>
                        <h3 style={{ fontSize: "24px", marginBottom: "15px" }}>Leave a Comment</h3>
                        <input placeholder="Title..." value={commentTitle} onChange={e => setCommentTitle(e.target.value)} style={glassInputStyle} />
                        <textarea placeholder="Type your Comment!" value={newComment} onChange={e => setNewComment(e.target.value)} style={{ ...glassInputStyle, height: "120px" }} />
                        <button onClick={submitComment} className="submit-comment-button">🚀 Submit Comment</button>
                    </div>
                ) : (
                    <p style={{ marginTop: "20px" }}>To comment, <a href="/login" style={{ color: "#9fd4ff" }}>log in here</a></p>
                )}
            </div>
        </div>
    );
}

export default DrinkPage;

function Description({ desc, upvoteCount, onUpvote, onDownvote }) {
    const loggedIn = localStorage.getItem("loggedInUser") != null;
    return (
        <div style={{ flex: 1 }}>
            <h4 style={{ fontSize: "22px" }}>Description</h4>
            <p style={{
                background: "linear-gradient(to right, #4e4376, #2b5876)",
                padding: "20px",
                borderRadius: "12px",
                fontSize: "18px",
                lineHeight: "1.6"
            }}>
                {desc}
            </p>
            <div style={{ marginTop: "15px", fontSize: "20px" }}>
                <strong>Votes: {upvoteCount}</strong><br />
                {loggedIn ? (
                    <>
                        <button onClick={onUpvote} className="bounce-button">👍</button>
                        <button onClick={onDownvote} className="bounce-button">👎</button>
                    </>
                ) : <p><a href="/login" style={{ color: "#9fd4ff" }}>Log in</a> to vote</p>}
            </div>
        </div>
    );
}

function NutritionalFacts({ cal, sug, caf }) {
    return (
        <div style={{ flex: 1 }}>
            <h4 style={{ fontSize: "22px" }}>Nutritional Facts</h4>
            <table style={{
                width: "100%",
                backgroundColor: "rgba(255,255,255,0.1)",
                color: "white",
                borderRadius: "10px",
                padding: "10px",
                fontSize: "18px"
            }}>
                <tbody>
                    <tr><td>Calories:</td><td>{cal}</td></tr>
                    <tr><td>Caffeine:</td><td>{caf}mg</td></tr>
                    <tr><td>Sugar:</td><td>{sug}mg</td></tr>
                </tbody>
            </table>
        </div>
    );
}

function Review({ comments }) {
    return (
        <div style={{ marginTop: "40px" }}>
            <h2 style={{ fontSize: "28px" }}>Comments</h2>
            {comments.map(comment => (
                <div key={comment._id} style={{
                    background: "rgba(255,255,255,0.12)",
                    padding: "15px",
                    marginTop: "15px",
                    borderRadius: "10px",
                    color: "white",
                    transition: "transform 0.3s",
                    cursor: "pointer"
                }}
                onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.02)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                >
                    <h5 style={{ fontSize: "20px" }}>{comment.posterUsername}: {comment.title}</h5>
                    <p style={{ fontSize: "16px" }}>{comment.text}</p>
                </div>
            ))}
        </div>
    );
}

const glassInputStyle = {
    width: "100%",
    padding: "12px",
    marginBottom: "12px",
    borderRadius: "8px",
    background: "rgba(255,255,255,0.08)",
    color: "white",
    border: "1px solid rgba(255,255,255,0.2)",
    fontSize: "16px",
    backdropFilter: "blur(6px)"
};

const buttonStyle = {
    padding: "14px 28px",
    backgroundColor: "#7B2C70",
    color: "#fff",
    border: "none",
    fontSize: "18px",
    borderRadius: "8px",
    cursor: "pointer"
};
