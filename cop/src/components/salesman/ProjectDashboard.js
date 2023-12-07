import React, { useState, useEffect } from "react";
import "../style.css";
import prive from "../assets/PRIVE.PNG";
import leaf from "../assets/leaf.jpg";
import walk from "../assets/grandewalk.PNG";
import ProjectTable from "./ProjectTable";

import { BASE_URL } from "../commen/base_url";
import axios from "axios";

function ProjectDashboard({ userRole }) {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState("");
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [selectedProjectImage, setSelectedProjectImage] = useState(null);
  const [selectedProjectPDFURL, setSelectedProjectPDFURL] = useState("");
  const [selectedGraphicProjectPDFURL, setSelectedGraphicProjectPDFURL] = useState("");
  const WALK_PDFURL =
    "https://drive.google.com/file/d/1x4Up5iA4pY3uuOJdLp_WGBB0umwtKet9/view?usp=drive_link";
  const PRIVE_PDFURL =
    "https://drive.google.com/file/d/1g6SYwU09IWB0eNEmDfoRknbO8V5UfgEH/view?usp=drive_link";

// //// brochure

const WALK_Brochure_PDFURL =
"https://drive.google.com/file/d/1auG6y821r4DTibFCubfcoE03Fm3asVQ5/view?usp=drive_link";
const PRIVE_Brochure_PDFURL =
"https://drive.google.com/file/d/1-SZpc2bcyokLenAtaGlYax-jRhAN6RCJ/view?usp=drive_link";



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
        case "THE GRANDE WALK":
          setSelectedProjectImage(walk);
          setSelectedProjectPDFURL(WALK_PDFURL);
          setSelectedGraphicProjectPDFURL(WALK_Brochure_PDFURL);
          break;
        case "THE GRANDE PRIVE":
          setSelectedProjectImage(prive);
          setSelectedProjectPDFURL(PRIVE_PDFURL);
          setSelectedGraphicProjectPDFURL(PRIVE_Brochure_PDFURL);
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
                <button>Graphical View</button>
              </a>
            )}
            {/*  */}
            {/*  */}
            {selectedGraphicProjectPDFURL && (
              <a
                href={selectedGraphicProjectPDFURL}
                download={`${selectedProject}.pdf`}
              >
                <button>Brochure Download</button>
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
