import React, { useState, useEffect } from "react";
import "../style.css";
import grande from "../assets/grande.jpg";
import leaf from "../assets/leaf.jpg";
import piano from "../assets/piano.jpg";
import ProjectTable from "./ProjectTable";

import { BASE_URL } from "../commen/base_url";
import axios from "axios";

function ProjectDashboard({ userRole }) {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState("");
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [selectedProjectImage, setSelectedProjectImage] = useState(null);
  const [selectedProjectPDFURL, setSelectedProjectPDFURL] = useState("");
  const PIANO_PDFURL =
    "https://drive.google.com/file/d/1prtlzc0-0kZ4jaT0O70KVwcOmljBk2DM/view?usp=drive_link";
  const PRIVE_PDFURL =
    "https://drive.google.com/file/d/1-IAJ8s5w6GiyDGTWnZBjEKWbp-UJSVdd/view?usp=drive_link";

  console.log("projectdashboar mein role", userRole);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/projects`)
      //  .get("http://localhost:5000/projects")
      .then((response) => {
        setProjects(response.data);
      })
      .catch((error) => {
        console.error("Error fetching projects:", error);
      });
  }, []);

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
        case "PIANO BY THE GRANDE":
          setSelectedProjectImage(piano);
          setSelectedProjectPDFURL(PIANO_PDFURL);
          break;
        case "THE GRANDE PRIVE":
          setSelectedProjectImage(grande);
          setSelectedProjectPDFURL(PRIVE_PDFURL);
          break;
        // case "The Walk":
        //   setSelectedProjectImage(walk);
        //   break;
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
                <img
                  className="project-image"
                  src={selectedProjectImage}
                  alt={`Image for ${selectedProject}`}
                />
              )}
            </div>
            {/*  */}
            {selectedProjectPDFURL && (
              <a
                href={selectedProjectPDFURL}
                download={`${selectedProject}.pdf`}
              >
                <button>Download PDF</button>
              </a>
            )}
            {/*  */}
          </div>
        )}
      </div>
      <ProjectTable projectId={selectedProjectId} Role={userRole} />
    </div>
  );
}

export default ProjectDashboard;

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
