
//   console.log('in table mein', projectId)
//   const [projectData, setProjectData] = useState(null);

//   useEffect(() => {
//     axios
//       .get(`http://localhost:5000/projecttable/${projectId}`)
//       .then((response) => {
//         const data = response.data;
//         setProjectData(data);
//         console.log('Fetched project details:', data); // Log the received data
//       })
//       .catch((error) => {
//         console.error('Error fetching project details:', error);
//       });
//   }, [projectId]);


import React, { useState, useEffect } from "react";
import axios from "axios";
import SaleRecord from "./SaleRecord";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../commen/base_url";


function ProjectTable({ projectId, Role }) {
  const navigate = useNavigate();
  const [projectData, setProjectData] = useState([]);
  const [updatedStatus, setUpdatedStatus] = useState({});

  console.log("project table mein role aa gya", Role);

  useEffect(() => {
    // //////////////////
    axios
      .get(`${BASE_URL}/projecttable/${projectId}`)
      .then((response) => {
        const data = response.data;
        setProjectData(data);
        console.log("Fetched project details:", data); // Log the received data
      })
      .catch((error) => {
        console.error("Error fetching project details:", error);
      });
  }, [projectId]);
  console.log("aa gya", projectData);

  // /////////////////////////////////update the status
  const handleStatusChange = (event, slotNumber) => {
    const newStatus = event.target.value;
    setUpdatedStatus((prevState) => ({
      ...prevState,
      [slotNumber]: newStatus,
    }));
  };

  // const handleStatusUpdate = (slotNumber, newStatus) => {
  //   const newStatus = updatedStatus[slotNumber];
  //   if (newStatus) {
  //     // Make an API call to update the status in the database
  //     axios
  //       .put(`http://localhost:5000/updateSlotStatus/${slotNumber}`, {
  //         status: newStatus,
  //       })
  //       .then((response) => {
  //         console.log("Slot status updated successfully");
  //         // Clear the updated status for the slot
  //         setUpdatedStatus((prevState) => ({
  //           ...prevState,
  //           [slotNumber]: null,
  //         }));
  //       })
  //       .catch((error) => {
  //         console.error("Error updating slot status:", error);
  //       });
  //   }
  // };

  // ////////////////////////////status update kr raha hon and check kr raha sale recor p jata hai ya nai

  const handleStatusUpdate = (slotNumber, newStatus) => {
    const updatedStatusValue = updatedStatus[slotNumber];
    if (updatedStatusValue) {
      axios
        .put(`${BASE_URL}/updateSlotStatus/${slotNumber}`, {
          status: updatedStatusValue,
        })
        .then((response) => {
          console.log("Slot status updated successfully");
       

          const updatedProjectData = projectData.map((item) => {
            if (item.SlotNumber === slotNumber) {
              return {
                ...item,
                Status: updatedStatusValue,
              };
            }
            return item;
          });
          setProjectData(updatedProjectData);

          setUpdatedStatus((prevState) => ({
            ...prevState,
            [slotNumber]: null,
          }));

          if (updatedStatusValue === "sold") {
            // Navigate to the sale record screen
            navigate("/salerecord"); // Update the route path accordingly
          }
        })
        .catch((error) => {
          console.error("Error updating slot status:", error);
        });
    }
  };

  return (
    <div className="project-table">
      {/* {projectData.length > 0 ? ( */}
      <table>
        <thead>
          <tr>
            {/* <th>SR#</th> */}
            <th>Floor#</th>
            <th>Units#</th>
            <th>Slots#</th>
            <th>Size in sq. ft</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {projectData.map((item, index) => (
            <tr key={index}>
              {/* <td>{item.ProjectID}</td> */}
              <td>{item.FloorNumber}</td>
              <td>{item.UnitNumber}</td>
              <td>{item.SlotNumber}</td>
              <td>{item.Size}</td>
              {Role === "Manager" ? (
                <td>
                  <select
                    value={updatedStatus[item.SlotNumber] || item.Status}
                    onChange={(event) =>
                      handleStatusChange(event, item.SlotNumber)
                    }
                  >
                    {/* <option value="available">Available</option> */}
                    <option value="hold">Hold</option>
                    {/* <option value="booked">Booked</option> */}
                    <option value="sold">Sold</option>
                  </select>
                </td>
               
              ) : (
                <h6 style={{color:'red', textAlign:'center'}}>Only Manager Changed</h6>
              )}
      
              <td>      
                <button onClick={() => handleStatusUpdate(item.SlotNumber , updatedStatus[item.SlotNumber])}>
                  Submit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* <button className="SignupBut" onClick={()=>navigate('/salerecord')}>Submit</button> */}
      {/* ) : (
        <p>Loading project details...</p>
      )} */}

      <footer>
        <h1>Classic COP (20%)</h1>
      </footer>
    </div>
  );
}

export default ProjectTable;
