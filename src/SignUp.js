import React, { useState } from "react";
import axios from 'axios';

function Signup()  {
  const [signupValues, setSignupValues] = useState({
    firstName: '',
    lastName:  '',
    username:  '',
    password:  ''
  });

  const handleInput = (event) => {
    const { name, value } = event.target;
    setSignupValues(previousState => ({
      ...previousState,
      [name]: value
    }));
  };

  const handleSignUp = (event) => {
    event.preventDefault();
    axios.post('http://localhost:9000/createUser', signupValues)
      .then((res) => alert('successfully signed up!'))
      .catch((err) => alert('Error in Signing Up'));
  };

  const containerStyle = {
    backgroundImage: 'url("https://cdnsm5-hosted.civiclive.com/UserFiles/Servers/Server_15209001/Image/Work/Economic_Development/Resources/redBull%20Stock.jpg")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh"
  };

  const formStyle = {
    backgroundColor: "#fafafa",
    padding: "40px",
    borderRadius: "8px",
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)"
  };

  const buttonStyle = {
    width: "100%",
    backgroundColor: "blue",
    color: "white",
    padding: "10px",
    borderRadius: "5px",
    border: "none",
    marginBottom: "10px"
  };

  return (
    <div style={containerStyle}>
      <div style={formStyle}>
        <h1 style={{ textAlign: "center" }}>Sign Up</h1>
        <form onSubmit={handleSignUp}>
          <label style={{ color: "blue", display: "block", marginBottom: "5px" }}>First Name:</label>
          <input name="firstName" value={signupValues.firstName} onChange={handleInput} style={{ width: "100%", marginBottom: "10px", padding: "5px" }} /><br />
          <label style={{ color: "blue", display: "block", marginBottom: "5px" }}>Last Name:</label>
          <input name="lastName" value={signupValues.lastName} onChange={handleInput} style={{ width: "100%", marginBottom: "10px", padding: "5px" }} /><br />
          <label style={{ color: "blue", display: "block", marginBottom: "5px" }}>Username:</label>
          <input name="username" value={signupValues.username} onChange={handleInput} style={{ width: "100%", marginBottom: "10px", padding: "5px" }} /><br />
          <label style={{ color: "blue", display: "block", marginBottom: "5px" }}>Password:</label>
          <input type="password" value={signupValues.password} name="password" onChange={handleInput} style={{ width: "100%", marginBottom: "10px", padding: "5px" }} /><br />
          <button type="submit" style={buttonStyle}>Submit</button><br />
        </form>
        <nav style={{ marginTop: "20px", textAlign: "center" }}>
          <span style={{ color: "black" }}>Have an account? </span>
          <a href="/" style={{ color: "blue", textDecoration: "none" }}>Log in</a>
        </nav>
      </div>
    </div>
  );
}

export default Signup;
