// import React, { useState } from "react";
// import Home from "./Home";
// import "./style.css";
// import Header from "./Header";
// import { Link } from "react-router-dom";
// import logoimage from "./assets/Earthlink_logo.png";
// import { useNavigate } from "react-router-dom";

// function Login() {
//   const navigate = useNavigate();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [validationError, setValidationError] = useState("");
// const handleLogin = () => {
//     const checkrole = JSON.parse(localStorage.getItem("userData"));
//     console.log("user data is ", checkrole);
//     if (checkrole) {
//       const {
//         role,
//         email: storedEmail,
//         password: storedPassword,
//         name,
//       } = checkrole;

//       if (email.trim() === "" || password.trim() === "") {
//         alert("Please fill in both email and password fields.");
//         return;
//       }
//       if (email === storedEmail && password === storedPassword) {

//         navigate(`/salesmandashboard`, {
//               state: { name, email },
//             });
//       } else {
//         // Email doesn't match the one stored in localStorage
//         alert("Invalid email and password");
//       }
//     } else {
//       // User not found in localStorage
//       alert("User not found. Please register.");
//     }
//   };

//   return (
//     <div className="App">
//       <div>
//         <div className="logoimage">
//           <img src={logoimage} alt="Your Logo" className="logo" />
//         </div>

//         <div className="loginContainer">
//           <h1>Login </h1>
//           <form onSubmit={handleLogin}>
//             <div className="input-container">
//               <label>Email</label>
//               <input
//                 type="email"
//                 placeholder="Email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//               />
//             </div>
//             <div className="input-container">
//               <label>Password</label>
//               <input
//                 type="password"
//                 placeholder="Password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//               />
//             </div>
//             <button className="loginBut" type="submit">
//               <p>Login</p>
//             </button>
//           </form>
//           {validationError && <p>{validationError}</p>}
//           <a href="/signup" style={{ alignSelf: "center" }}>
//             Create a new account
//           </a>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Login;

// ///////////////////////////////////////////////////////////////////////////////////////////////////

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logoimage from "./assets/Earthlink_logo.png";
import axios from "axios";

function Login() {
  const navigate = useNavigate();
  const [employeeid, setEmployeeID] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validationError, setValidationError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    // You should replace this URL with your server's login endpoint
    const requestData = {
      email,
      password,
      employeeid
    };
    axios.post('http://localhost:5000/login', requestData)
    .then((response) => {
      console.log("Login response:", response.data.user);
      const userData = response.data.user; 
      navigate("/salesmandashboard",  { state: userData });
    })
    .catch((error) => {
      console.error("Login error:", error);
      setValidationError("Invalid email or password");
    });

    ////////////////////////////
    // const loginURL = "http://localhost:5000/login"; // Replace with your actual URL

   

    // axios
    //   .post(loginURL, requestData)
    //   .then((response) => {
    //     console.log('acha ', response)
    //     // Handle a successful login response here
    //     // You can redirect the user to a dashboard or perform other actions
    //     // navigate("/salesmandashboard");
    //     // const userData = response.data.user;
    //     // navigate("/salesmandashboard", { state: userData });
    //   })
    //   .catch((error) => {
    //     console.error("Login error:", error);
    //     setValidationError("Invalid email or password");
    //   });
  };

  return (
    <div className="App">
      <div>
        {/* ... (your existing code) ... */}
        <div className="logoimage">
          <img src={logoimage} alt="Your Logo" className="logo" />
        </div>
        <div className="loginContainer">
          <h1>Login </h1>
          <form onSubmit={handleLogin}>
            <div className="input-container">
              <label>Employee ID</label>
              <input
                type="employeeid"
                placeholder="Employee ID"
                value={employeeid}
                onChange={(e) => setEmployeeID(e.target.value)}
              />
            </div>
            <div className="input-container">
              <label>Email</label>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="input-container">
              <label>Password</label>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button className="loginBut" type="submit">
              <p>Login</p>
            </button>
          </form>
          {validationError && <p>{validationError}</p>}
          <a href="/signup" style={{ alignSelf: "center", color:'black' }}>
            Create a new account
          </a>
        </div>
      </div>
    </div>
  );
}

export default Login;
