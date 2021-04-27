//https://www.youtube.com/watch?v=Ttf3CEsEwMQ

//Selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");
const setDate = document.querySelector(".todayDate");
const setTime = document.querySelector(".currentTime");

//Let's generate Date and Time!
var today = new Date();

var days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
var months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

var date =
  today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();

var year = today.getFullYear();
var month = today.getMonth() + 1;
var dateToday = today.getDate();
console.log(date);
console.log("Name," + month + " " + dateToday);
var monthName = months[today.getMonth()];

var day = days[today.getDay()];
//todo write an algorithm that formats date number to 1st,2nd,3rd, 4th 5th etc...
console.log(day);
console.log(day + ", " + monthName + " " + dateToday);

formatDate = day + ", " + monthName + " " + dateToday;

setDate.innerHTML = formatDate;

//get the current time in hours:minutes
var hours = today.getHours();
var minutes = today.getMinutes();

function currentTime() {
  time = new Date();
  var hours = time.getHours();
  var minutes = time.getMinutes();
  var seconds = time.getSeconds();
  //document.getElementsByClassName("currentTime").innerHTML = hours;
  //console.log(hours + ":" + minutes + " " + seconds);
  formatTime = hours + ":" + minutes + ":" + seconds;

  setTime.innerHTML = formatTime;
}
currentTime();
window.setInterval(currentTime, 100);

console.log("The time you opened this page is: " + hours + ":" + minutes);
//event listeners

todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterTodo);

//functions

//todo - create an exception that prevents users from adding in new tasks if it is empty

function addTodo(event) {
  //prevent form from submiting
  event.preventDefault();

  if (todoInput.value == null || todoInput.value == "") {
    nameError = "Please enter a todo task! Let's get cracking!";
    alert(nameError);
    return false;
  }

  //todo div
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");
  //Create LI
  const newTodo = document.createElement("li");
  newTodo.innerText = todoInput.value;
  newTodo.classList.add("todo-item");
  todoDiv.appendChild(newTodo);

  //add todo to localStorag
  saveLocalTodos(todoInput.value);

  //so we appended 2 buttons to todoDiv
  //Completed Mark button, you can add html into the button
  const completedButton = document.createElement("button");
  completedButton.innerHTML = '<i class="fas fa-check"> </i>';
  completedButton.classList.add("complete-btn");
  todoDiv.appendChild(completedButton);
  //check trash button
  const trashButton = document.createElement("button");
  trashButton.innerHTML = '<i class="fas fa-trash"> </i>';
  trashButton.classList.add("trash-btn");
  todoDiv.appendChild(trashButton);

  //append to the toDolist

  todoList.appendChild(todoDiv);
  //clear todo input value
  todoInput.value = "";
}

function deleteCheck(e) {
  //console.log(e.target);
  const item = e.target;
  //Delete // TODO:
  if (item.classList[0] === "trash-btn") {
    //e.target.remove(); //maybe delete th todoDiv
    const todo = item.parentElement;
    //animate
    todo.classList.add("fall");
    //todo.remove();
    //then remove after animation completes
    todo.addEventListener("transitionend", function () {
      todo.remove();
    });
  }

  //check Mark
  if (item.classList[0] === "complete-btn") {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
  }
}

function filterTodo(e) {
  const todos = todoList.childNodes;
  console.log(todos);
  todos.forEach(function (todo) {
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "uncompleted":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
    }
  });
}

//save the todo to local storage

function saveLocalTodos(todo) {
  //check if you already have a todo file first
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}
