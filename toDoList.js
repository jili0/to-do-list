//Initial references

const container = document.querySelector(".container");
const input = document.querySelector("#input");
const addButton = document.querySelector("#addTask");
const taskContainer = document.querySelector(".tasks");

let tasks = {};
let index;
let task;
let taskId;
let inputValue;
let storedTask;
let keys;
let keyInStorage;
let taskInStorage;
let newIndex;

// Functions of add button
const getInput = () => {
  task = input.value;
};

const generateId = () => {
  taskId = Math.floor(Math.random() * 1000000);
};

const setStorage = (taskId, task) => {
  localStorage.setItem(JSON.stringify(taskId), JSON.stringify(task));
};

const updateObject = () => {
  tasks = {};
  let objectKeys = Array.from(Object.keys(localStorage));
  objectKeys.forEach((key) => {
    let objectValue = localStorage.getItem(key).slice(1, -1);
    tasks[key] = objectValue;
  });
};

const renderTask = (tasks) => {
  taskContainer.innerHTML = "";
  Object.keys(tasks).forEach((key) => {
    taskItem = document.createElement("div");
    taskItem.classList.add("taskItem");
    taskItem.innerHTML = `
    <p class="taskText" id="${key}">${tasks[key]}</p>
    <button class="edit"></button>
    <button class="delete"></button>
  `;
    taskContainer.appendChild(taskItem);
  });
};

const handleAdd = () => {
  if (input.value) {
    getInput(); //return task
    generateId(); //return an taskId
    setStorage(taskId, task); //save task in localStorage
    updateObject(); //update task list (saved as an Object)
    renderTask(tasks);
    input.style.backgroundColor = "";
    input.style.border = "";
    input.style.boxShadow = "";
    input.value = "";
    input.setAttribute("placeholder", "Add your task here");
  } else {
    input.setAttribute("placeholder", "Write something..");
  }
};
// Function of edit button

const edit = (e) => {
  input.value = e.target.previousElementSibling.innerText;
  input.focus();
  localStorage.removeItem(e.target.previousElementSibling.id);
  e.target.parentElement.remove();
  delete tasks[e.target.previousElementSibling.id];
};

// Function of delete button
const remove = (e) => {
  localStorage.removeItem(
    e.target.previousElementSibling.previousElementSibling.id
  );
  e.target.parentElement.remove();
};

//window load
window.addEventListener("load", () => {
  updateObject();
  renderTask(tasks);
});
// Handle add button
addButton.addEventListener("click", handleAdd);
document.addEventListener("keydown", (e) => {
  let key = e.key;
  if (key === "Enter") {
    handleAdd();
  }
});
// Handle edit and delete button
taskContainer.addEventListener("click", (e) => {
  if (e.target.className === "delete") {
    remove(e);
    e.stopPropagation();
  } else if (e.target.className === "edit") {
    edit(e);
    e.stopPropagation();
  }
});
