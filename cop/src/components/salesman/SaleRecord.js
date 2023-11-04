import React, { useState, useEffect } from "react";
import "../style.css";
import logoimage from "../assets/Earthlink_logo.png";
import { useLocation } from "react-router-dom";
import Logout from "../commen/logout";
import ProjectDashboard from "./ProjectDashboard";

const SaleRecord = () => {
  const [formData, setFormData] = useState({
    customername: "",
    contactnumber: "",
    cnic: "",
    customerEmail: "",
    agentEmp: "",
    slotNumber: "",
    unitNumber: "",
    floorNumber: "",
    projectName: "",
    projectDownPayment: "",
    fullPayment: "",
    token: "",
    downpaymentInWords: "",
    fullPaymentInWords: "",
  });
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log(formData);
  };

  const clearForm = () => {
    setFormData({
      customername: "",
      contactnumber: "",
      cnic: "",
      customerEmail: "",
      agentEmp: "",
      slotNumber: "",
      unitNumber: "",
      floorNumber: "",
      projectName: "",
      projectDownPayment: "",
      fullPayment: "",
      token: "",
      tokenInWords: "",
    });
  };

  // ////////////////////////////////////
  useEffect(() => {
    // Update the date and time every second
    const intervalId = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div className="home-container">
      <header>
        <img src={logoimage} alt="Your Logo" className="logo" />
        <div class="Empl0yee-data"></div>
      </header>
      <main>
        <div className="description">
          <h1>SALE RECORD</h1>
      <p> {currentDateTime.toLocaleTimeString()}</p>
         <p> {currentDateTime.toDateString()}</p>
        </div>
      </main>
      <div className="your-form-container">
        <h2>Please Enter The Sale Record</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div>
              <label>Customer Name</label>
              <input
                type="text"
                name="customername"
                value={formData.customername}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label>Contact Number</label>
              <input
                type="number"
                name="contactnumber"
                value={formData.contactnumber}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="form-row">
            <div>
              <label>CNIC</label>
              <input
                type="text"
                name="cnic"
                value={formData.cnic}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label>Contact Email</label>
              <input
                type="text"
                name="customerEmail"
                value={formData.customerEmail}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="form-row">
            <div>
              <label>Agent Employee</label>
              <input
                type="text"
                name="agentEmp"
                value={formData.agentEmp}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="form-row" style={{ marginRight: 30 }}>
            <select
              name="role"
              value={formData.role}
              onChange={handleInputChange}
            >
              <option value="">Select COP Type</option>
              <option value="Special">Special</option>
              <option value="Classic">Classic</option>
            </select>
          </div>

          <div className="form-row">
            <div>
              <label>Slot Number</label>
              <input
                type="number"
                name="slotNumber"
                value={formData.slotNumber}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="form-row">
            <div>
              <label>Unit Number</label>
              <input
                type="number"
                name="unitNumber"
                value={formData.unitNumber}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="form-row">
            <div>
              <label>Floor Number</label>
              <input
                type="number"
                name="floorNumber"
                value={formData.floorNumber}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="form-row">
            <div>
              <label>Project Name</label>
              <input
                type="text"
                name="projectName"
                value={formData.projectName}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="form-row">
            <div>
              <label>Token</label>
              <input
                type="text"
                name="token"
                value={formData.token}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label>Amount in Words</label>
              <input
                type="text"
                name="tokenInWords"
                value={formData.tokenInWords}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="form-row">
            <div>
              <label>Down Payment</label>
              <input
                type="text"
                name="projectDownPayment"
                value={formData.projectDownPayment}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label>Amount in Words</label>
              <input
                type="text"
                name="downpaymentInWords"
                value={formData.downpaymentInWords}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="form-row">
            <div>
              <label>Full Payment</label>
              <input
                type="text"
                name="fullPayment"
                value={formData.fullPayment}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label>Amount in Words</label>
              <input
                type="text"
                name="fullPaymentInWords"
                value={formData.fullPaymentInWords}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="form-buttons">
            <button type="button" onClick={clearForm}>
              Clear Form
            </button>
            <button type="button" onClick={() => setFormData({})}>
              Cancel Form
            </button>
            <button type="submit">Submit Form</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SaleRecord;
