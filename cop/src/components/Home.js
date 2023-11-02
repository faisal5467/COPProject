import React from "react";
import "./style.css"
import logoimage from "./assets/Earthlink_logo.png"


function Home() {
  return (
    <div className="home-container">
      <header>
      
      <img src={logoimage} alt="Your Logo" className="logo" />
        <div className="user">User's Name</div>
      </header>
      <main>
        <div className="description">
          <h1>Welcome to Earthlink</h1>
          <p>This is your dashboard for your information</p>
        </div>
        <div className="buttons">
          <button>View Installment</button>
          <button>View Rebat</button>
        </div>
      </main>
    </div>
  );
}

export default Home;
