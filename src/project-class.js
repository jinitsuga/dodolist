import {
  leftNav,
  projectsList,
  selectedProject,
  selectProject,
  projectsContainer,
} from "./task-projects";
import { changeBtnTxt, taskDisplayer } from "./index";
export { Project };

class Project {
  constructor(name) {
    this.name = name;
    this.tasks = [];
    this.element = "";
  }
  startProject() {
    const project = document.createElement("div");
    project.classList.add("project");
    this.element = project;
    console.log(this);
    project.addEventListener("click", () => {
      this.selectThisProject();
      changeBtnTxt();
    });
    project.innerText = this.name;
    projectsList.push(this);

    projectsContainer.appendChild(project);
    return project;
  }
  showTasks() {
    const taskWrap = document.createElement("div");
    const randyText = document.createElement("p");
    const task = document.createElement("li");
    task.id = this.tasks[this.tasks.length - 1].title;
    task.dataset["item"] = this.tasks[this.tasks.length - 1].title;
    task.innerText = this.tasks[this.tasks.length - 1].title;
    taskWrap.append(task, randyText);
    this.element.appendChild(taskWrap);
    task.addEventListener("click", () => {
      const taskToPrint = this.tasks.find(
        (element) => element.title == task.innerText
      );
      taskToPrint.printTask();

      // timer countdown calcs

      const counter = setInterval(function () {
        const now = new Date().getTime();
        const distance = taskToPrint.date - now;
        const days = Math.floor(distance / 86400000);
        const hours = Math.floor((distance % 86400000) / 3600000);
        const minutes = Math.floor((distance % 3600000) / 60000);
        const seconds = Math.floor((distance % 60000) / 1000);
        randyText.innerHTML =
          days + "d " + hours + "h " + minutes + "m " + seconds + "s";
      }, 1000);
    });
  }

  selectThisProject() {
    selectProject(this);
  }
}
