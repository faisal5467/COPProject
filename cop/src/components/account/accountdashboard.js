import React from "react";
import "../style.css"
import logoimage from "../assets/Earthlink_logo.png"
import { useLocation } from 'react-router-dom';
import Logout from "../commen/logout";

const Accountdashboard = () => {
    const location = useLocation();
    const { name, email } = location.state;
    console.log('yar ', name)

return(
    <div className="home-container">
    <header>
    
    <img src={logoimage} alt="Your Logo" className="logo" />
    <div>
      <div className="user">Accounts: {name}</div>
      <div className="useremail">Email: {email}</div>
      <Logout/>
      </div>
    </header>
    <main>
      <div className="description">
        <h1>Welcome to Earthlink</h1>
        <p>This is Acoount dashboard for your information</p>
      </div>
      <div className="buttons">
        <button>Submit</button>
        {/* <button>View Rebat</button> */}
      </div>
    </main>
  </div>


 );
}

export default Accountdashboard;




   