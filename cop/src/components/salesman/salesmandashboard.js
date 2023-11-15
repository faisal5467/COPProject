import React,{useState} from "react";
import "../style.css"
import logoimage from "../assets/Earthlink_logo.png"
import { useLocation } from 'react-router-dom';
import Logout from "../commen/logout";
import ProjectDashboard from "./ProjectDashboard";
import { useNavigate } from "react-router-dom";

const Salesmandashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const userData = location.state;
  console.log('user he g', userData.role)

return(

    <div className="home-container">
    
    <header>
    <a href="/salesmandashboard">
    <img src={logoimage} alt="Your Logo" className="dashboard-logo"/>
</a>
   
    <div class="Empl0yee-data">
      
    <div className="emp-id">Emp ID:  {userData.EmployeeID}</div>
      <div className="user">Name:   {userData.name}</div>
      <div className="useremail">Email:  {userData.email}</div>
      
      <Logout/>
      </div>
    </header>
    <main>
      <div className="description">
        <h1>COP Inventory</h1>
        <p>Special COP</p>
      </div>
    </main>

    <ProjectDashboard userRole={userData.role}/>
{/* ////////////////////////////////// */}

  </div>


 );
}

export default Salesmandashboard;




   