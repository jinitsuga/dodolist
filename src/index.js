// 1) Armar la Task Class en un modulo, con titulo, descripción, fecha y prioridad
// 2) Crear boton y form (en nuevo modulo) para agregar una nueva task
// 3) Escribir función que cree una task específica como object usando el input del form

import { Task } from "./task-class";
import { CreateFormElements, formCounter, formWrapper } from "./task-form";
import { leftNav, selectedProject } from "./task-projects";

export { mainDisplay, changeBtnTxt, addTaskBtn, taskDisplayer };

const mainDisplay = document.querySelector("#content");
const taskDisplayer = document.createElement("div");
taskDisplayer.classList.add("task-display");
const addTaskBtn = document.createElement("button");

// Add task logic -- messy
const changeBtnTxt = function () {
  addTaskBtn.innerText = "Add a task to " + selectedProject.name;
};
//addTaskBtn.innerText = "Add a task to " + selectedProject.name;
changeBtnTxt();

addTaskBtn.addEventListener("click", () => {
  if (formCounter < 1) {
    CreateFormElements.showForm();

    addTaskBtn.classList.add("hidden");
  } else {
    CreateFormElements.setPlaceholders();
    CreateFormElements.resetForm();
  }
});

mainDisplay.append(addTaskBtn, taskDisplayer);
