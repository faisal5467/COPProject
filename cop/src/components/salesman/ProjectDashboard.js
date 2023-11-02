import React, { useState, useEffect } from "react";
import "../style.css";
import grande from "../assets/grande.jpg";
import leaf from "../assets/leaf.jpg";
import walk from "../assets/piano.jpg";
import ProjectTable from "./ProjectTable";
import axios from "axios";

function ProjectDashboard() {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState("");
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [selectedProjectImage, setSelectedProjectImage] = useState(null);
  useEffect(() => {
    axios
      .get("http://localhost:5000/projects")
      .then((response) => {
        setProjects(response.data);
      })
      .catch((error) => {
        console.error("Error fetching projects:", error);
      });
  }, []);

//   const handleProjectSelect = (event) => {
//     setSelectedProject(event.target.value);
//      console.log(' ye event hai ', event.target.value) 
//     // Find the selected project's ID based on its name
//     const selectedProjectObject = projects.find(
//       (project) => project.ProjectName === event.target.value
//     );

//     // If a project was found, set its ID
//     if (selectedProjectObject) {
//       setSelectedProjectId(selectedProjectObject.ProjectID);
//     } else {
//       // If no project is selected, set the ID to null
//       setSelectedProjectId(null);
//     }
//   };

//   //////////////////////////////////////////////////////////////for test the image to get
const handleProjectSelect = (event) => {
    setSelectedProject(event.target.value);

    // Find the selected project's ID based on its name
    const selectedProjectObject = projects.find(
      (project) => project.ProjectName === event.target.value
    );

    // If a project was found, set its ID and image
    if (selectedProjectObject) {
      setSelectedProjectId(selectedProjectObject.ProjectID);

      // Set the selected project's image based on its name
      switch (event.target.value) {
        case "The Grande":
          setSelectedProjectImage(grande);
          break;
        case "The Leaf":
          setSelectedProjectImage(leaf);
          break;
        case "The Walk":
          setSelectedProjectImage(walk);
          break;
        default:
          setSelectedProjectImage(null); // No image for unselected projects
          break;
      }
    } else {
      // If no project is selected, set the ID and image to null
      setSelectedProjectId(null);
      setSelectedProjectImage(null);
    }
  };

// //////////////////////////////////////////////////////////////////////////////////////
  console.log("project id G", selectedProjectId);
  return (
    <div className="dashboard-container">
        <div className="dashboard-mini">
      
          <h2>Please Select a Project</h2>
          <select onChange={handleProjectSelect} value={selectedProject}>
            <option value="">Select a project</option>
            {projects.map((project) => (
              <option key={project.ProjectID} value={project.ProjectName}>
                {project.ProjectName}
              </option>
            ))}
          </select>
          {/* <h2>Project Details</h2> */}
          {selectedProject && (
            <div>
              <h3>Project Name: {selectedProject}</h3>
              <div className="image-container">
              {selectedProjectImage && (
                <img  className="project-image"
                  src={selectedProjectImage}
                  alt={`Image for ${selectedProject}`}
                />
              )}
              </div>
            </div>
          )}
        </div>
          <ProjectTable projectId={selectedProjectId} />
      
    </div>
  );
}

export default ProjectDashboard;

// import React, { useState, useEffect } from "react";
// import "../style.css";
// import grande from "../assets/grande.jpg";
// import leaf from "../assets/leaf.jpg";
// import walk from "../assets/piano.jpg";
// import axios from "axios";

// function ProjectDashboard() {
//   const [projects, setProjects] = useState([]);
//   const [selectedProject, setSelectedProject] = useState(""); // State to store the selected project
//   const [selectedProjectImage, setSelectedProjectImage] = useState(null); // State to store the selected project's image URL

//   useEffect(() => {
//     axios
//       .get("http://localhost:5000/projects")
//       .then((response) => {
//         setProjects(response.data);
//       })
//       .catch((error) => {
//         console.error("Error fetching projects:", error);
//       });
//   }, []);

//   const handleProjectSelect = (event) => {
//     setSelectedProject(event.target.value);
//     // Set the selected project's image based on the selected project
//     switch (event.target.value) {
//       case "Grande":
//         setSelectedProjectImage(grande);
//         break;
//       case "Leaf":
//         setSelectedProjectImage(leaf);
//         break;
//       case "Walk":
//         setSelectedProjectImage(walk);
//         break;
//       default:
//         setSelectedProjectImage(null); // No image for unselected projects
//         break;
//     }
//   };

//   return (
//     <div className="dashboard-container">
//       <div>
//         <div>
//           <h2>Select a Project</h2>
//           <select onChange={handleProjectSelect} value={selectedProject}>
//             <option value="">Select a project</option>
//             {projects.map((project) => (
//               <option key={project.ProjectID} value={project.ProjectName}>
//                 {project.ProjectName}
//               </option>
//             ))}
//           </select>
//           <h2>Project Details</h2>
//           {selectedProject && (
//             <div>
//               <h3>Selected Project: {selectedProject}</h3>
//               {selectedProjectImage && (
//                 <img  className="project-image"
//                   src={selectedProjectImage}
//                   alt={`Image for ${selectedProject}`}
//                 />
//               )}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ProjectDashboard;
