// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import "../style.css";

// function ProjectTable({ projectId }) {
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

//   return (
//     <div className="project-table"> {/* Apply the CSS class to the container */}
//       {/* Render project details in a table */}
//       {projectData ? (
//         <table>
//           <thead>
//             <tr>
//               <th>Column Name</th>
//               <th>Value</th>
//             </tr>
//           </thead>
//           <tbody>
//           {projectData.map((item, index) => (
//               <tr key={index}>
//                 <td>{item.ProjectID}</td>
//                 <td>{item.ProjectName}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       ) : (
//         <p>Loading project details...</p>
//       )}
//     </div>
//   );
// }

// export default ProjectTable;

// /////////////////////////////////////////////////////////////////////for all data
import React, { useState, useEffect } from "react";
import axios from "axios";

function ProjectTable({ projectId }) {
  const [projectData, setProjectData] = useState([]);
  const [updatedStatus, setUpdatedStatus] = useState({});

  useEffect(() => {
    axios
      .get(`http://localhost:5000/projecttable/${projectId}`)
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

  const handleStatusUpdate = (slotNumber) => {
    const newStatus = updatedStatus[slotNumber];
    if (newStatus) {
      // Make an API call to update the status in the database
      axios
        .put(`http://localhost:5000/updateSlotStatus/${slotNumber}`, {
          status: newStatus,
        })
        .then((response) => {
          console.log("Slot status updated successfully");
          // Clear the updated status for the slot
          setUpdatedStatus((prevState) => ({
            ...prevState,
            [slotNumber]: null,
          }));
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
              <th>Size</th>
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
                <td>
                  {/* <select>
                    <option value="available">Available</option>
                    <option value="hold">Hold</option>
                    <option value="booked">Booked</option>
                    <option value="sold">Sold</option>
                  </select> */}

                  <select
                    value={updatedStatus[item.SlotNumber] || item.Status}
                    onChange={(event) =>
                      handleStatusChange(event, item.SlotNumber)
                    }
                  >
                    <option value="available">Available</option>
                    <option value="hold">Hold</option>
                    <option value="booked">Booked</option>
                    <option value="sold">Sold</option>
                  </select>
                </td>
                <td>
                  {/* <button>Submit</button> */}
                  <button onClick={() => handleStatusUpdate(item.SlotNumber)}>
                    Submit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      {/* ) : (
        <p>Loading project details...</p>
      )} */}
      
      <footer>
        <h1>Classic COP (20% remaining)</h1>
      </footer>
    </div>
  );
}

export default ProjectTable;
