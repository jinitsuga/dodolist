import { create, omit } from "lodash";
import { addTaskBtn, mainDisplay } from "./index";
import { Task } from "./task-class";
import { tasksList, TaskHandler, trueProj } from "./task-handler";
import { projectsContainer, selectedProject } from "./task-projects";

export { CreateFormElements, formCounter, formWrapper };

let formCounter = 0;

const formWrapper = document.createElement("form");

const CreateFormElements = (function () {
  // function checkValidity() {
  //   console.log(formTitle.validity.valueMissing);
  //   if (formTitle.validity.valueMissing || formTitle.validity.tooShort) {
  //     formTitleError.innerText = "Por favor ingresa un título";
  //   } else {
  //     formTitleError.innerText = "";
  //   }
  // }
  // -- Form elements --
  formWrapper.classList.add("form-wrapper");
  const title = document.createElement("div");
  const formTitle = document.createElement("input");
  formTitle.minLength = 4;
  const formTitleError = document.createElement("span");
  formTitleError.classList.add("form-error");
  // formTitle.oninput = checkValidity;
  // title validation logic
  formTitle.addEventListener("input", () => {
    console.log(formTitleError.innerText);
    if (formTitle.validity.tooShort) {
      formTitleError.innerText = "Por favor ingresa un título";
    } else {
      formTitleError.innerText = "";
    }
  });

  formTitle.type = String;
  formTitle.classList.add("form-title");
  formTitle.placeholder = "Task title...";
  formTitle.required = true;
  formTitle.maxLength = 30;
  formTitle.addEventListener("focusout", () => {
    formTitle.innerText = formTitle.innerText;
  });
  title.append(formTitle, formTitleError);

  const description = document.createElement("div");
  const formDescription = document.createElement("input");
  const formDescriptionError = document.createElement("span");
  formDescriptionError.classList.add("form-error");

  formDescription.type = Text;
  formDescription.classList.add("form-description");
  formDescription.placeholder = "Describe your task";
  formDescription.maxLength = 200;
  formDescription.addEventListener("input", () => {
    if (formDescription.validity.tooLong) {
      formDescriptionError.innerText = "Tu descripción es muy larga";
    } else {
      formDescriptionError.innerText = "";
    }
  });

  description.append(formDescription, formDescriptionError);

  // -Task priority button-
  const prioBtn = document.createElement("select");

  const highPrio = document.createElement("option");
  const mediumPrio = document.createElement("option");
  const lowPrio = document.createElement("option");

  highPrio.innerText = "High";
  mediumPrio.innerText = "Medium";
  lowPrio.innerText = "Low";

  const priorityLevels = [highPrio, mediumPrio, lowPrio];
  priorityLevels.forEach((level) => {
    prioBtn.options.add(level);
  });
  // date / hours for task completion
  const duration = document.createElement("div");
  const taskTime = document.createElement("input");
  const taskTimeError = document.createElement("span");
  taskTimeError.classList.add("form-error");

  taskTime.type = "number";
  taskTime.placeholder = "Hours until task completion";
  taskTime.maxLength = 3;
  taskTime.required = true;
  taskTime.addEventListener("input", () => {
    console.log(taskTime.validity.typeMismatch);
    console.log(taskTime.value);
    if (
      taskTime.validity.valueMissing ||
      taskTime.validity.typeMismatch ||
      taskTime.validity.tooShort ||
      taskTime.value == ""
    ) {
      taskTimeError.innerText = "Ingresa la duración, en horas.";
    } else {
      taskTimeError.innerText = "";
    }
  });
  duration.append(taskTime, taskTimeError);

  // Crear el task como object y pushear el task al array usando el submit btn -->

  const submitTaskBtn = document.createElement("button");
  submitTaskBtn.type = "button";
  submitTaskBtn.innerText = "ADD";
  submitTaskBtn.addEventListener("click", function () {
    // FORM VALIDATION
    if (formTitle.validity.valueMissing || formTitle.validity.tooShort) {
      formTitle.setCustomValidity("El título es necesario.");
      formTitle.focus;
      return;
    } else {
      formTitle.setCustomValidity("");
    }
    if (formDescription.validity.tooLong) {
      formDescription.setCustomValidity("La descripción es muy larga.");
      return;
    } else {
      formDescription.setCustomValidity("");
    }
    if (
      taskTime.validity.typeMismatch ||
      taskTime.validity.valueMissing ||
      taskTime.value == ""
    ) {
      taskTime.setCustomValidity(
        "Por favor ingresa un número que indique la duración, en horas."
      );
      return;
    } else {
      taskTime.setCustomValidity("");
    }
    const currentTime = new Date().getTime();
    //console.log(currentTime);
    let task = new Task(
      formTitle.value,
      formDescription.value,
      prioBtn.value,
      taskTime.value * 3600000 + currentTime
    );
    selectedProject.tasks.push(task);

    formWrapper.classList.add("hidden");
    addTaskBtn.classList.remove("hidden");
    selectedProject.showTasks();
    return false;
  });

  // task methods to do things with -->

  const taskForm = {};

  taskForm.showForm = function () {
    formCounter++;
    formWrapper.append(title, description, prioBtn, duration, submitTaskBtn);
    mainDisplay.appendChild(formWrapper);
    formTitle.focus();
  };
  taskForm.resetForm = function () {
    formWrapper.classList.remove("hidden");
    formTitle.focus();
  };

  // set placeholder texts for the form

  taskForm.setPlaceholders = function () {
    formTitle.value = "";
    formTitle.focus();
    formDescription.value = "";
    prioBtn.selectedOptions[0];
    formTitle.placeholder = "Task title...";
    formDescription.placeholder = "Describe your task";
  };

  return taskForm;
})();
