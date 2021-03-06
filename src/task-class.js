import { indexOf } from "lodash";
import { mainDisplay, taskDisplayer } from ".";
import { projectsContainer, selectedProject } from "./task-projects";
export { Task };

class Task {
  constructor(title, description, priority, date) {
    this.title = title;
    this.description = description;
    this.date = date;
    this.priority = priority;
  }
  // taskValidate() {
  //   let respuesta = [];
  //   if (this.description.value.length <= 0) {
  //     respuesta.push("false");
  //   }
  //   return respuesta;
  // }

  clearTaskDisplayer() {
    if (taskDisplayer.lastChild != null) {
      taskDisplayer.removeChild(taskDisplayer.lastChild);
    }
  }

  printTask() {
    this.clearTaskDisplayer();
    let taskCard = document.createElement("div");
    taskCard.classList.add("task-cards");

    let taskTitle = document.createElement("h3");
    taskTitle.classList.add("task-titles");

    let taskDescription = document.createElement("p");
    taskDescription.classList.add("task-descriptions");

    const closeTask = document.createElement("button");
    closeTask.textContent = "X";
    closeTask.addEventListener("click", this.clearTaskDisplayer);

    // Enable editing the task and making it findable to display.

    let editTask = document.createElement("button");
    editTask.innerText = "Edit";
    editTask.addEventListener("click", () => {
      let taskElement = document.getElementById(taskTitle.innerText);
      console.log(taskElement);
      taskTitle.contentEditable = true;
      taskDescription.contentEditable = true;
      taskDuration.contentEditable = true;
      // time edition
      const taskTime = document.createElement("input");
      const taskTimeError = document.createElement("span");
      taskTimeError.classList.add("form-error");

      taskTime.type = "number";
      taskTime.required = true;
      taskTime.maxLength = 3;
      taskTime.placeholder = "Hours until task completion";
      taskTime.addEventListener("input", () => {
        console.log(taskTime.validity.typeMismatch);
        console.log(taskTime.value);
        if (
          taskTime.validity.valueMissing ||
          taskTime.validity.typeMismatch ||
          taskTime.validity.tooShort ||
          taskTime.value == ""
        ) {
          taskTimeError.innerText = "Ingresa la duraci??n, en horas.";
        } else {
          taskTimeError.innerText = "";
        }
      });
      taskCard.append(taskTime, taskTimeError);

      editTask.innerText = "Done editing";

      editTask.addEventListener("click", () => {
        if (
          taskTime.validity.valueMissing ||
          taskTime.validity.typeMismatch ||
          taskTime.value == ""
        ) {
          taskTime.setCustomValidity("Ingresa una duraci??n, en horas");
          return;
        }
        this.title = taskTitle.innerText;
        taskElement.id = this.title;
        taskElement.innerText = this.title;
        console.log(taskElement);
        this.description = taskDescription.innerText;
        const currentTime = new Date().getTime();
        this.date = taskTime.value * 3600000 + currentTime;
        taskTitle.contentEditable = false;
        taskDescription.contentEditable = false;
        taskDuration.contentEditable = false;
        editTask.innerText = "Edit";
        taskDisplayer.removeChild(taskCard);
      });
    });

    let completeTask = document.createElement("button");
    completeTask.innerText = "Complete task";

    const taskDuration = document.createElement("p");
    // Countdown to show on task card

    completeTask.addEventListener("click", () => {
      taskDisplayer.removeChild(taskCard);
      this.taskDone();
    });

    taskCard.append(
      taskTitle,
      taskDescription,
      editTask,
      taskDuration,
      completeTask,
      closeTask
    );

    taskDisplayer.appendChild(taskCard);

    //selectedProject.showTasks();

    taskTitle.innerText = this.title;
    taskDescription.innerText = this.description;
  }
  taskDone() {
    //remove task object
    const taskIndex = selectedProject.tasks.indexOf(this);
    selectedProject.tasks.splice(taskIndex, 1);
    // remove task li element +  timer
    const correctTask = document.getElementById(this.title);
    const parent = correctTask.parentNode;

    for (let i = 0; i <= parent.childNodes.length; i++) {
      parent.removeChild(parent.lastChild);
    }
    console.log(selectedProject);
  }
  taskCounter(taskDate) {
    const now = new Date().getTime();
    console.log(now);
    console.log(this.title);
    const counter = setInterval(function () {
      const distance = taskDate - now;
      const days = Math.floor(distance / 86400000);
      const hours = Math.floor((distance % 86400000) / 3600000);
      const minutes = Math.floor((distance % 3600000) / 60000);

      const seconds = Math.floor((distance % 60000) / 1000);
    }, 2000);
  }
}
