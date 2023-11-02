import React, { useState } from "react";
import "./style.css";
import { Link } from "react-router-dom";
import logoimage from "./assets/Earthlink_logo.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Signup() {
  const navigate = useNavigate();
  const initialFormData = {
    name: "",
    email: "",
    password: "",
    employeeid: "",
  };

  const [formData, setFormData] = useState({ ...initialFormData });
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log("Form data submitted:", formData);
    //     // localStorage.setItem('userData', JSON.stringify(formData));
    // Check if any field is empty
    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.employeeid
    ) {
      setError("Please fill in all the fields.");
      return;
    }

    // Check if the email already exists in the database
    axios
      .get(`http://localhost:5000/checkEmail/${formData.email}`)
      .then((res) => {
        if (res.data.exists) {
          setError("Email already exists.");
        } else {
          // If email doesn't exist, proceed with signup
          axios
            .post("http://localhost:5000/signup", formData)
            .then((res) => {
              navigate("/");
            })
            .catch((err) => console.log("Signup error:", err));
        }
      })
      .catch((err) => console.log("Email check error:", err));
  };

  return (
    <div className="App">
      <div>
        <div className="logoimage">
          <img src={logoimage} alt="Your Logo" className="logo" />
        </div>
        <div className="SignupContainer">
          <h1>Sign Up</h1>
          <form onSubmit={handleSubmit}>
            <div className="Sign-input-container">
              <label>Employee ID</label>
              <input
                type="employeeid"
                name="employeeid"
                placeholder="employeeid"
                value={formData.employeeid}
                onChange={handleInputChange}
              />
            </div>
            <div className="Sign-input-container">
              <label>Name</label>
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="Sign-input-container">
              <label>Email</label>
              <input
                type="email"
                placeholder="Email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>
            <div className="Sign-input-container">
              <label>Password</label>
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
              />
            </div>

            {error && <p className="error">{error}</p>}
            <button className="SignupBut" type="submit">
              <p>Sign Up</p>
            </button>
            <a href="/" style={{ textAlign: "center", color: "black" }}>
              <p>Already have an account</p>
            </a>
          </form>
        </div>
      </div>
    </div>
  );
}
export default Signup;
