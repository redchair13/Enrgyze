// signup.js
import React from "react";
import { useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';

function Signup()  {

  const [signupValues, setSignupValues] = useState({
    firstName: "",
    lastName: "",
    username: "",
    password: ""
  });


  const handleInput = (event) => {
    const { name, value } = event.target;
    setSignupValues(previousState => ({
      // firstName: event.firstName,
      // lastName: event.lastName,
      // username: event.username,
      // password: event.password
        ...previousState,
        [name]: value
    })
    );
    
};

  const handleSignUp = (event) => {
    event.preventDefault()
    axios.post('http://localhost:9000/createUser', signupValues)
        // .then((res) => setActive('Login'))
        .then((res) => alert('sucessfully signed up!'))
        .catch((err) => alert('Error in Signing Up'))
  }

  return (
    <div id="/signup">
      <Navbar> </Navbar>
      <h1>Signup</h1>
      <form onSubmit={handleSignUp}>
        <label style={{color: "blue"}}>First Name: </label><br />
        <input name="firstName" value = {signupValues.firstName} onChange={handleInput}/><br />
        <label>Last Name: </label><br />
        <input name="lastName" value = {signupValues.lastName} onChange={handleInput}/><br />
        <label>Username </label> <br></br>
        <input name="username" value = {signupValues.username} onChange={handleInput}></input> <br></br>
        <label>Password</label> <br></br>
        <input type="password" value = {signupValues.password} name="password" onChange={handleInput}></input> <br></br>
        <button type="submit"> Submit</button> <br />
      </form>
    </div>
  );
}


export default Signup;
