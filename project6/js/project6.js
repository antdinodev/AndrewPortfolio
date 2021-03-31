//https://www.youtube.com/watch?v=Ttf3CEsEwMQ

//Selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector(".filter-todo");


//event listeners

todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);

//functions

function addTodo(event) {
  console.log('hello');
  //prevent form from submiting
  event.preventDefault();

  //todo div
  const todoDiv = document.createElement('div');
  todoDiv.classList.add('todo');
  //Create LI
  const newTodo = document.createElement('li');
  newTodo.innerText = todoInput.value;
  newTodo.classList.add('todo-item');
  todoDiv.appendChild(newTodo);

  //add todo to localStorag
  saveLocalTodos(todoInput.value);

  //so we appended 2 buttons to todoDiv
  //Completed Mark button, you can add html into the button
  const completedButton = document.createElement('button');
  completedButton.innerHTML = '<i class="fas fa-check"> </i>'
  completedButton.classList.add("complete-btn");
  todoDiv.appendChild(completedButton);
  //check trash button
  const trashButton = document.createElement('button');
  trashButton.innerHTML = '<i class="fas fa-trash"> </i>'
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
  if (item.classList[0] === 'trash-btn') {
    //e.target.remove(); //maybe delete th todoDiv
    const todo = item.parentElement;
    //animate
    todo.classList.add('fall');
    //todo.remove();
    //then remove after animation completes
    todo.addEventListener('transitionend', function() {
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
  todos.forEach(function(todo) {
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList.contains('completed')) {
          todo.style.display = 'flex';
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
  if (localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }
  todos.push(todo);
  localStorage.setItem('todos', JSON.stringify(todos));
}