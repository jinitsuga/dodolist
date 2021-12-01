export { tasksList, TaskHandler };
import { leftNav, projectsContainer, selectedProject } from "./task-projects";

const tasksList = [];
//let trueProj = "";

const tasksWrapper = document.createElement("ul");
// create projects array and find selected project
// function findSelectedProject() {
//   let projects = Array.from(projectsContainer.childNodes);
//   function checkProject(project) {
//     return project.innerText == selectedProject;
//   }
//   trueProj = projects.find(checkProject);
//   console.log(trueProj);
//   return trueProj;
// }

const TaskHandler = (function () {
  const taskMethods = {};

  // Add and show task titles on the left

  taskMethods.showTask = function () {
    // create task li element and append to selected project
    const toDo = document.createElement("li");
    toDo.innerText = tasksList[tasksList.length - 1].title;
    //findSelectedProject();
    trueProj.appendChild(toDo);

    // tasksWrapper.appendChild(toDo);
    // leftNav.appendChild(tasksWrapper);
  };

  return taskMethods;
})();
