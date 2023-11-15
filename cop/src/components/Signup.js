import React, { useState } from "react";
import "./style.css";
import { Link } from "react-router-dom";
import logoimage from "./assets/Earthlink_logo.png";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "./commen/base_url";
import axios from "axios";


function Signup() {
  const navigate = useNavigate();
  const initialFormData = {
    name: "",
    email: "",
    password: "",
    employeeid: "",
    role: "", // Initialize the role field
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
      !formData.employeeid || 
      !formData.role  // Initialize the role field
    ) {
      setError("Please fill in all the fields.");
      return;
    }

    // Check if the email already exists in the database
    axios
      .get(`${BASE_URL}/checkEmail/${formData.email}`)
      .then((res) => {
        if (res.data.exists) {
          setError("Email already exists.");
        } else {
          // If email doesn't exist, proceed with signup
          axios
            .post(`${BASE_URL}/signup`, formData)
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
        <div className="loginContainer">
          <h1 style={{textAlign:'center'}}>Sign Up</h1>
          <form onSubmit={handleSubmit}>
            <div className="input-container">
              <label>Employee ID</label>
              <input
                type="employeeid"
                name="employeeid"
                placeholder="Employee ID"
                value={formData.employeeid}
                onChange={handleInputChange}
              />
            </div>
            <div className="input-container">
              <label>Name</label>
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="input-container">
              <label>Email</label>
              <input
                type="email"
                placeholder="Email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>
            <div className="input-container">
              <label>Password</label>
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
              />
            </div>

            <div className="Sign-input-container">
              <label>Role</label>
              <select
                name="role"
                value={formData.role}
                onChange={handleInputChange}
              >
                <option value="">Select Role</option>
                <option value="Executive">Executive</option>
                <option value="Assistant-Manager">Assistant Manager</option>
                <option value="Employee">BDM</option>
                <option value="Manager">SBDM</option>
              </select>
            </div>

            {error && <p style={{textAlign: 'center'}}>{error}</p>}
            <button className="loginBut" type="submit">
              <p>Sign Up</p>
            </button>
            <a onClick={() => navigate(-1)} style={{ textAlign: "center", color: "black" }}>
              <p>Already have an account</p>
            </a>
          </form>
        </div>
      </div>
    </div>
  );
}
export default Signup;
