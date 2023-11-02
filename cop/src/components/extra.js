//  {/* <div className="input-container">
//             <label>Username</label>
//             <input
//               type="text"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//             />
//           </div>
//           <div className="input-container">
//             <label>Password </label>
            
//             <input
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//             />          
//           </div>
//           <button className="SignupBut" onClick={handleSignup}>        
//             <Link to="/">
//               <p>Signup</p>
//             </Link>
//           </button>
//           <a href="/" style={{ alignSelf: "center" }}>
//             Have an account
//           </a> */}

//           {
//             /* <form>
//                   <div>
//                     <label>Username:</label>
//                     <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
//                   </div>
//                   <div>
//                     <label>Password:</label>
//                     <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
//                   </div>
//                   <button onClick={handleSignup}>Signup</button>
//                 </form> */
//           }






//           // ///////////////////////project dashboar

//           import React, { useState, useEffect } from 'react';
// import "../style.css"

// import grande from "../assets/grande.jpg"
// import leaf from "../assets/leaf.jpg"
// import walk from "../assets/piano.jpg"
// import ProjectTable from './ProjectTable';
// import axios from 'axios';


// function ProjectDashboard() {
    
//     const [projects, setProjects] = useState([]);
//     useEffect(() => {
//       // Make an API call to fetch projects data
//       axios.get('http://localhost:5000/projects')
//         .then((response) => {
//           setProjects(response.data);
//         })
//         .catch((error) => {
//           console.error('Error fetching projects:', error);
//         });
//     }, []);
  

















//   const [selectedProject, setSelectedProject] = useState('Project1'); // Initialize with a default project
//   const [tableData, setTableData] = useState([]);

//   useEffect(() => {
//     // Fetch project data based on the selected project
//     // Update the `tableData` state with the fetched data
//     // You will need to implement the data fetching logic here
//   }, [selectedProject]);

//   const projectData = {
//     Project1: {
//       imageUrl: grande,
//       details: [
//         { name: 'Detail 1', value: 'Value 1' },
//         { name: 'Detail 2', value: 'Value 2' },
//         // Add more details for Project1
//       ],
//     },
//     Project2: {
//       imageUrl: leaf,
//       details: [
//         { name: 'Detail A', value: 'Value A' },
//         { name: 'Detail B', value: 'Value B' },
//         // Add more details for Project2
//       ],
//     },
//     Project3: {
//       imageUrl: walk,
//       details: [
//         { name: 'Feature X', value: 'Value X' },
//         { name: 'Feature Y', value: 'Value Y' },
//         // Add more details for Project3
//       ],
//     },
//   };
// console.log('project data', projectData.Project1)
//   return (
//     <div className="dashboard-container">
//       <select
//       className="select-dropdown"
//         value={selectedProject}
//         onChange={(e) => setSelectedProject(e.target.value)}
//       >
//         <option value="Project1">The Grande</option>
//         <option value="Project2">Leaf</option>
//         <option value="Project3">The Walk</option>
//       </select>

//       <img
//       className="project-image"
//         src={projectData[selectedProject].imageUrl}
//         alt={selectedProject}
//       />
//        <h2>Project Data for {selectedProject}</h2>

//        <div>
//       <h2>Project Data for {selectedProject}</h2>

//       <h2>Projects</h2>
//       <ul>
//         {projects.map((project) => (
//           <li key={project.ProjectID}>{project.ProjectName}</li>
//         ))}
//       </ul>
//       {/* <table className="project-details" >
//         <thead>
//           <tr>
//             <th>SR#</th>
//             <th>Floor#</th>
//             <th>Units#</th>
//             <th>Slots#</th>
//             <th>Size</th>
//             <th>Status</th>
//             <th>Action</th>
//           </tr>
//         </thead>
//         <tbody>



//         {projectData && projectData.length > 0 ? (
//   projectData.projectData.map((item, index) => (
//     <tr key={index}>
//       <td>{item.sr}</td>
//       <td>{item.floor}</td>
//       <td>{item.units}</td>
//       <td>{item.slots}</td>
//       <td>{item.size}</td>
//     </tr>
//   ))
// ) : (
//   <tr>
//     <td colSpan="5">No data available</td>
//   </tr>
// )}




//           {tableData.map((item, index) => (
//             <tr key={index}>
//               <td>{item.srNumber}</td>
//               <td>{item.floorNumber}</td>
//               <td>{item.unitNumber}</td>
//               <td>{item.slotNumber}</td>
//               <td>{item.size}</td>
//               <td>
                
//                 <select>
//                   <option value="available">Available</option>
//                   <option value="hold">Hold</option>
//                   <option value="booked">Booked</option>
//                   <option value="sold">Sold</option>
//                 </select>
//               </td>
//               <td>
//                 <button>Submit</button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table> */}
//     </div>

// {/* <ProjectTable data={selectedProject}/> */}
//       {/* <table className="project-details">
//         <thead>
//           <tr>
//             <th>Detail Name</th>
//             <th>Value</th>
//           </tr>
//         </thead>
//         <tbody>
//           {projectData[selectedProject].details.map((detail, index) => (
//             <tr key={index}>
//               <td>{detail.name}</td>
//               <td>{detail.value}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table> */}

//       {/* ////////////////////////// */}
//       {/* <table className="project-details">
//       <thead>
//         <tr>
//           <th>sr#</th>
//           <th>floor#</th>
//           <th>units#</th>
//           <th>slots#</th>
//           <th>size</th>
//         </tr>
//       </thead>
//       <tbody>
//         {projectData.map((item, index) => (
//           <tr key={index}>
//             <td>{item.sr}</td>
//             <td>{item.floor}</td>
//             <td>{item.units}</td>
//             <td>{item.slots}</td>
//             <td>{item.size}</td>
//           </tr>
//         ))}
//       </tbody>
//     </table> */}
//     </div>
//   );
// }

// export default ProjectDashboard;
