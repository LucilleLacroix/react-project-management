import { useState } from "react";

import ProjectsSidebar from "./components/ProjectsSidebar";
import NewProject from "./components/NewProject";
import NoProjectSelected from "./components/NoProjectSelected";

function App() {
  const [projectsState, setProjectsState] = useState({
    selectedProjectID: undefined, // undefined = rien sélectionné
    projects: [],
  });

  function handleStartAddProject() {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        selectedProjectID: null, // null = mode "add project"
      };
    });
  }

  function handleAddProject(projectData) {
    setProjectsState((prevState) => {
      const newProject = {
        ...projectData,
        id: Math.random(),
      };

      return {
        ...prevState,
        selectedProjectID: undefined, // ✅ ferme NewProject après Save
        projects: [...prevState.projects, newProject],
      };
    });
  }
  console.log(projectsState);
  let content;
  if (projectsState.selectedProjectID === null) {
    content = <NewProject onAdd={handleAddProject} />;
  } else if (projectsState.selectedProjectID === undefined) {
    content = <NoProjectSelected onStartAddProject={handleStartAddProject} />;
  }

  return (
    <main className="h-screen my-8 flex gap-8">
      <ProjectsSidebar
        onStartAddProject={handleStartAddProject}
        projects={projectsState.projects} // ✅ pour afficher dans la sidebar
      />
      {content}
    </main>
  );
}

export default App;
