export {
  leftNav,
  ProjectsHandler,
  projectsList,
  selectProject,
  selectedProject,
  projectsContainer,
};
import { Project } from "./project-class";
import { addTaskBtn, changeBtnTxt } from "./index";

const projectsList = [];
function setFocus(element) {
  element.focus();
}
let selectedProject = "";

function selectProject(name) {
  selectedProject = name;
}

const leftNav = document.querySelector("#left-nav");
const projectsContainer = document.createElement("div");
projectsContainer.classList.add("proj-container");
leftNav.appendChild(projectsContainer);
const addProjectBtn = document.createElement("button");

const ProjectsHandler = (function () {
  // button displays the add project mini-form
  const addProjectWrapper = document.createElement("div");
  addProjectWrapper.classList.add("add-project-wrapper");

  addProjectBtn.innerText = "Add project";
  addProjectBtn.classList.add("add-project");

  addProjectBtn.addEventListener("click", () => {
    const projectName = document.createElement("input");
    const addBtn = document.createElement("button");

    projectName.placeholder = "Project's name...";
    addProjectWrapper.append(projectName, addBtn);
    addProjectBtn.disabled = true;

    addBtn.innerText = "ADD";
    projectName.focus();
    // button to create and push the actual project

    addBtn.addEventListener("click", () => {
      const project = new Project(projectName.value);
      project.startProject();
      project.selectThisProject();
      changeBtnTxt();

      addProjectBtn.disabled = false;
      projectName.classList.add("hidden");
      addBtn.classList.add("hidden");
      console.log(projectsList);
      //console.log(selectedProject);
    });
  });

  addProjectWrapper.appendChild(addProjectBtn);
  leftNav.appendChild(addProjectWrapper);
  const home = new Project("Home");
  home.startProject();
  home.selectThisProject();
})();
