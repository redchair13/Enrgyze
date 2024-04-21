import React, { useState } from "react";
import axios from 'axios';

function LoginPage() {
  const [login, setLogin] = useState({
    username: "",
    password: ""
  }); 

  const handleInput = (event) => {
    const { name, value } = event.target;
    setLogin(previousState => ({
      ...previousState,
      [name]: value
    }));
  };

  const handleLogin = (event) => {
    event.preventDefault();
  
    axios.get('http://localhost:9000/getUser', { params: login })
      .then((res) => {
        if (res.data) {
          alert('Login Successful');
          localStorage.clear();
          localStorage.setItem('loggedInUser', res.data.firstName);
        } else {
          alert('Wrong Credentials');
          setLogin({
            username: '',
            password: ''
          });
        }
      })
      .catch((err) => {
        alert('Error in Login');
        setLogin({
          username: '',
          password: ''
        });
      });
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      <div style={{ backgroundColor: "#fafafa", padding: "40px", borderRadius: "8px", boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)" }}>
        <h1 style={{ textAlign: "center" }}>Login</h1>
        <form onSubmit={handleLogin}>
          <label style={{ color: "blue", display: "block", marginBottom: "5px" }}>User ID:</label>
          <input name="username" value={login.username} onChange={handleInput} style={{ width: "100%", marginBottom: "10px", padding: "5px" }} placeholder="Username" />
          <label style={{ color: "blue", display: "block", marginBottom: "5px" }}>Password:</label>
          <input type="password" value={login.password} name="password" onChange={handleInput} style={{ width: "100%", marginBottom: "10px", padding: "5px" }} placeholder="Password" />
          <button type="submit" style={{ width: "100%", backgroundColor: "blue", color: "white", padding: "10px", borderRadius: "5px", border: "none" }}>Submit</button>
        </form>
        <nav style={{ marginTop: "20px", textAlign: "center" }}>
          <span style={{ color: "black" }}>Don't have an account? </span>
          <a href="signup" style={{ color: "blue", textDecoration: "none" }}>Sign up</a>
        </nav>
        <button style={{ width: "100%", backgroundColor: "#ccc", color: "black", padding: "10px", borderRadius: "5px", border: "none", marginTop: "10px" }}>Or Continue as Guest</button>
      </div>
    </div>
  );
}

export default LoginPage;
