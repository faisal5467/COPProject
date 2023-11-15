import React, { useState, useEffect } from "react";
import "../style.css";
import logoimage from "../assets/Earthlink_logo.png";
import { useLocation } from "react-router-dom";
import Logout from "../commen/logout";
import ProjectDashboard from "./ProjectDashboard";
import { useNavigate } from "react-router-dom";

import { BASE_URL } from "../commen/base_url";
import axios from "axios";

const SaleRecord = () => {
  const navigate = useNavigate();
  const [submitMessage, setSubmitMessage] = useState("");
  const [currentDateTime, setCurrentDateTime] = useState("");
  const emailRecipients = ["businesswork5467@gmail.com", "it@earthlink.com.pk"];

  const [formData, setFormData] = useState({
    saleDateTime: "",
    customername: "",
    contactnumber: "",
    cnic: "",
    customerEmail: "",
    agentEmpid: "",
    managerEmpid: "",
    slotNumber: "",
    unitNumber: "",
    floorNumber: "",
    projectName: "",
    projectDownPayment: "",
    fullPayment: "",
    token: "",
    tokenInWords: "",
    downpaymentInWords: "",
    fullPaymentInWords: "",
    copType: "",
  });

  const clearForm = () => {
    setFormData({
      saleDateTime: "",
      customername: "",
      contactnumber: "",
      cnic: "",
      customerEmail: "",
      agentEmpid: "",
      managerEmpid: "",
      slotNumber: "",
      unitNumber: "",
      floorNumber: "",
      projectName: "",
      projectDownPayment: "",
      fullPayment: "",
      token: "",
      tokenInWords: "",
      downpaymentInWords: "",
      fullPaymentInWords: "",
      copType: "",
    });
  };

  const getCurrentDateTime = () => {
    const current = new Date();
    const formattedDateTime = current.toLocaleString();
    return formattedDateTime;
  };

  useEffect(() => {
    // Update the date and time every second
    const intervalId = setInterval(() => {
      setFormData((prevData) => ({
        ...prevData,
        saleDateTime: getCurrentDateTime(),
      }));
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here

    const currentDate = new Date();
    const formattedDate = currentDate
      .toISOString()
      .replace("T", " ")
      .replace(/\.\d{3}Z/, "");

    const subject = `New Sale Record - ${getCurrentDateTime()}`;

    axios
      .post(`${BASE_URL}/saveSaleRecord`, formData)
      .then((response) => {
        console.log(
          "Sale record submitted successfully from saleRord file in database"
        );
        // Handle any additional logic after a successful submission
      })
      .catch((error) => {
        console.error("Error submitting sale record in database:", error);
        // Handle any errors or display error messages to the user
      });

    setFormData({ ...formData, saleDateTime: currentDateTime });
    console.log("Form Data:", formData);
    setSubmitMessage(alert("Record submitted successfully in database"));

    // /////////////////// email call kr raha
    axios
      .post(`${BASE_URL}/send-email`, {
        to: emailRecipients, // Update with recipient email
        subject: subject, // Your subject line
        formData: formData, // Send your form data to the server
      })
      .then((response) => {
        // Handle the success response
        console.log("email chali gai", response.data);

        // Show a success alert
      });
    // //////////

    // axios
    //   .post(`${BASE_URL}/send-email`, formData)
    //   // axios.post('https://check.earthlink.com.pk/submit', formData)
    //   .then((response) => {
    //     // Handle the success response
    //     console.log('email chali gai',response.data);

    //     // Show a success alert
    //   })
    //   .catch((error) => {
    //     // Handle any API request error here
    //     console.error("API request error:", error);
    //   });
  };

  return (
    <div className="home-container">
      <header>
        <img
          src={logoimage}
          alt="Your Logo"
          className="dashboard-logo"
          onClick={() => navigate(-1)}
        />

        <div class="Empl0yee-data">
          <Logout />
        </div>
      </header>
      <main>
        <div className="description">
          <h1>SALE RECORD</h1>
          {/* <p> {currentDateTime.toLocaleTimeString()}</p> */}
          <p> {currentDateTime}</p>
        </div>
      </main>
      <div className="your-form-container">
        <h2>Please Enter The Sale Record</h2>

        <form onSubmit={handleSubmit}>
          <div className="datetime">
            <label>Date/Time</label>
            <input
              type="text"
              name="saleDateTime"
              value={formData.saleDateTime}
              readOnly
            />
          </div>
          <div className="form-row">
            <label>Customer Name</label>
            <input
              type="text"
              name="customername"
              value={formData.customername}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-row">
            <label>Contact Number</label>
            <input
              type="text"
              name="contactnumber"
              value={formData.contactnumber}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-row">
            <label>CNIC / Passport *</label>
            <input
              type="text"
              name="cnic"
              value={formData.cnic}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-row">
            <label>Contact Email</label>
            <input
              type="text"
              name="customerEmail"
              value={formData.customerEmail}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-row">
            <label>Agent Employee ID *</label>
            <input
              type="text"
              name="agentEmpid"
              value={formData.agentEmpid}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-row">
            <label>Manager Employee ID * </label>
            <input
              type="text"
              name="managerEmpid"
              value={formData.managerEmpid}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-row">
            <label>COP Type *</label>
            <div>
              <select
                name="copType"
                value={formData.copType}
                onChange={handleInputChange}
              >
                <option value="">Select COP Type</option>
                <option value="Special">Special</option>
                <option value="Classic">Classic</option>
              </select>
            </div>
          </div>

          {/* Conditionally render fields based on COP Type */}
          {formData.copType === "Special" && (
            <div>
              <div className="form-row">
                <label>Slot Number</label>
                <input
                  type="text"
                  name="slotNumber"
                  value={formData.slotNumber}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-row">
                <label>Unit Number</label>
                <input
                  type="text"
                  name="unitNumber"
                  value={formData.unitNumber}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-row">
                <label>Floor Number</label>
                <input
                  type="text"
                  name="floorNumber"
                  value={formData.floorNumber}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          )}

          {formData.copType === "Classic" && <div></div>}

          {/* //////////////////////////////////////////// */}

          {/* 
          <div className="form-row">
          
              <label>Slot Number</label>
              <input
                type="text"
                name="slotNumber"
                value={formData.slotNumber}
                onChange={handleInputChange}
              />
          
          </div>

          <div className="form-row">
         
              <label>Unit Number</label>
              <input
                type="text"
                name="unitNumber"
                value={formData.unitNumber}
                onChange={handleInputChange}
              />
      
          </div>

          <div className="form-row">
         
              <label>Floor Number</label>
              <input
                type="text"
                name="floorNumber"
                value={formData.floorNumber}
                onChange={handleInputChange}
              />
            </div> */}

 <div className="form-row">
            <label>Project Name *</label>
            <div>
              <select
                name="projectName"
                value={formData.projectName}
                onChange={handleInputChange}
              >
                <option value="">Select Project</option>
                <option value="PIANO BY THE GRANDE">PIANO BY THE GRANDE</option>
                <option value="THE GRANDE PRIVE">THE GRANDE PRIVE</option>
              </select>
            </div>
          </div>
          {/* <div className="form-row">
            <label>Project Name</label>
            <input
              type="text"
              name="projectName"
              value={formData.projectName}
              onChange={handleInputChange}
            />
          </div> */}

          <div className="form-row">
            <label>Token</label>
            <input
              type="text"
              name="token"
              value={formData.token}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-row">
            <label>Token in Words</label>
            <input
              type="text"
              name="tokenInWords"
              value={formData.tokenInWords}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-row">
            <label>Down Payment</label>
            <input
              type="text"
              name="projectDownPayment"
              value={formData.projectDownPayment}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-row">
            <label>Down Payment in Words</label>
            <input
              type="text"
              name="downpaymentInWords"
              value={formData.downpaymentInWords}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-row">
            <label>Full Payment</label>
            <input
              type="text"
              name="fullPayment"
              value={formData.fullPayment}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-row">
            <label>Full Payment in Words</label>
            <input
              type="text"
              name="fullPaymentInWords"
              value={formData.fullPaymentInWords}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-buttons">
            <button type="button" onClick={clearForm}>
              Clear Form
            </button>
            <button type="button" onClick={() => navigate(-1)}>
              Cancel Form
            </button>
            <button type="submit">Submit Form</button>
          </div>
        </form>
        {submitMessage && <p>{submitMessage}</p>}
      </div>
    </div>
  );
};

export default SaleRecord;
