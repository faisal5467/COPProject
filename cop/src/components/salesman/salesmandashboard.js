import React,{useState} from "react";
import "../style.css"
import logoimage from "../assets/Earthlink_logo.png"
import { useLocation } from 'react-router-dom';
import Logout from "../commen/logout";
import ProjectDashboard from "./ProjectDashboard";

const Salesmandashboard = () => {
  const location = useLocation();
  const userData = location.state;
  console.log('user he g', userData)


    // const [formData, setFormData] = useState({
    //     saleDetails: '',
    //     newCOP: '',
    //     COPNumber: '',
    //     customerID: '',
    //     customerDetails: '',
    //     projectDetails: '',
    //     projectUnits: '',
    //     projectTotalPayment: '',
    //     projectDownPayment: '',
    //     paymentPayDate: '',
    //     dueDate: '',
    //   });

    //   const handleFormChange = (e) => {
    //     const { name, value } = e.target;
    //     setFormData({
    //       ...formData,
    //       [name]: value,
    //     });
    //   };
    
    //   const handleSubmit = (e) => {
    //     e.preventDefault();
    //     // Here, you can handle the form submission, e.g., send the data to a server or perform any other necessary actions.
    //     console.log(formData);
    //   };


return(

    <div className="home-container">
    
    <header>
    
    <img src={logoimage} alt="Your Logo" className="logo" />
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
      {/* <div className="buttons">
        <button>Submit</button>
      </div> */}
    </main>

    <ProjectDashboard/>
{/* ////////////////////////////////// */}
    {/* <div className="form-container">
      <h2>Salesman Dashboard</h2>
      <form onSubmit={handleSubmit}>
      <div className="form-row">
        <div>
          <label>Sale Details</label>
          <input
            type="text"
            name="saleDetails"
            value={formData.saleDetails}
            onChange={handleFormChange}
          />
        </div>
       
        <div>
          <label>New COP</label>
          <input
            type="text"
            name="newCOP"
            value={formData.newCOP}
            onChange={handleFormChange}
          />
        </div>
        </div>
        <div className="form-row">
        <div>
          <label>COPNumber</label>
          <input
            type="text"
            name="COPNumber"
            value={formData.COPNumber}
            onChange={handleFormChange}
          />
        </div>
        <div>
          <label>customerID</label>
          <input
            type="text"
            name="customerID"
            value={formData.customerID}
            onChange={handleFormChange}
          />
        </div>
        </div>
        <div className="form-row">
        <div>
          <label>projectTotalPayment</label>
          <input
            type="text"
            name="customerDetails"
            value={formData.customerDetails}
            onChange={handleFormChange}
          />
        </div>
        <div>
          <label>customerDetails</label>
          <input
            type="text"
            name="projectDetails"
            value={formData.projectDetails}
            onChange={handleFormChange}
          />
        </div>
        </div>
        <div className="form-row">
        <div>
          <label>projectUnits</label>
          <input
            type="text"
            name="projectUnits"
            value={formData.projectUnits}
            onChange={handleFormChange}
          />
        </div>
        
        <div>
          <label>project Total Payment</label>
          <input
            type="text"
            name="projectTotalPayment"
            value={formData.projectTotalPayment}
            onChange={handleFormChange}
          />
        </div>
        </div>

        <div className="form-row">
        <div>
          <label>payment Pay Date</label>
          <input
            type="text"
            name="projectDownPayment"
            value={formData.projectDownPayment}
            onChange={handleFormChange}
          />
        </div>
        <div>
          <label>project Down Payment</label>
          <input
            type="text"
            name="paymentPayDate"
            value={formData.paymentPayDate}
            onChange={handleFormChange}
          />
        </div>
        </div>
        <div className="form-row">
        <div>
          <label>due Date</label>
          <input
            type="text"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleFormChange}
          />
        </div>
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div> */}

  </div>


 );
}

export default Salesmandashboard;




   