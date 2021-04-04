//Application selectors

 const todoInput = document.querySelector('.todo-input');
 const todoButton = document.querySelector('.todo-button');
 const todoList = document.querySelector('.todo-list');
 const filterOption = document.querySelector('.filter-todo');

 //Application Event listeners
 document.addEventListener("DOMContentLoaded", getToDos);
todoButton.addEventListener("click", addToDo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterTodo);

 //Application functions

 function addToDo(event) {

 	
 	event.preventDefault();
 	
 	const toDoDiv = document.createElement("div");
 	toDoDiv.classList.add("todo");
 	
 	const newToDo = document.createElement("li");
 	newToDo.innerText = todoInput.value;
 	newToDo.classList.add("todo-item");
 	toDoDiv.appendChild(newToDo);
 
 	saveLocalTodo(todoInput.value);

 	//The check button
 	const completedButton = document.createElement("button");
 	completedButton.innerHTML = '<i class="fas fa-check"></i>';
 	completedButton.classList.add("complete-btn");
 	toDoDiv.appendChild(completedButton);
 	//The trash button
 	const trashButton = document.createElement("button");
 	trashButton.innerHTML = '<i class="fas fa-trash"></i>';
 	trashButton.classList.add("trash-btn");
 	toDoDiv.appendChild(trashButton);
 	
     todoList.appendChild(toDoDiv);
     
     todoInput.value = "";
 };

 function deleteCheck(e) {
    
    const item = e.target;
    //Delete an item off the todo list
    if (item.classList[0] === "trash-btn") {
    	const todo = item.parentElement;
    	//Add the animation
    	todo.classList.add("fall");
    	removeLocalTodos(todo);
    	todo.addEventListener("transitionend", function () {
             todo.remove();
    	});
    	
    }

    //Check an item on the list that has been completed
    if (item.classList[0] === "complete-btn") {
    	const todo = item.parentElement;
    	todo.classList.toggle("completed");
    }
 }
//function to filter the todo list
 function filterTodo(e) {
    const todoss = todoList.childNodes;
    todoss.forEach(function(todo) {
       switch(e.target.value) {
       	case "all":
       	todo.style.display = 'flex';
       	break;
       	case "completed":
       	if(todo.classList.contains('completed')) {
       		todo.style.display = 'flex';
       	} else {
       		todo.style.display = 'none';
       	}
       	break;
       	case "uncompleted":
       	if(!todo.classList.contains('completed')) {
       		todo.style.display = 'flex';
       	} else {
       		todo.style.display = 'none';
       	}
       	break;
       }
    });
 }

//This function saves todo items to an array in local storage
 function saveLocalTodo(todo) {
 	
 	let todos;
 	if (localStorage.getItem("todos") === null) {
 		todos = [];
 	} else {
 		todos = JSON.parse(localStorage.getItem("todos"));
 	}
 	todos.push(todo);
 	localStorage.setItem("todos", JSON.stringify(todos))
 }

//This function gets the todo items from local storage once the application is loaded
 function getToDos() {

 	let todos;
 	if (localStorage.getItem("todos") === null) {
 		todos = [];
 	} else {
 		todos = JSON.parse(localStorage.getItem("todos"));
 	}

 	todos.forEach(function(todo) {
         
 	const toDoDiv = document.createElement("div");
 	toDoDiv.classList.add("todo");
 	
 	const newToDo = document.createElement("li");
 	newToDo.innerText = todo;
 	newToDo.classList.add("todo-item");
 	toDoDiv.appendChild(newToDo);
 	
 	
 	const completedButton = document.createElement("button");
 	completedButton.innerHTML = '<i class="fas fa-check"></i>';
 	completedButton.classList.add("complete-btn");
 	toDoDiv.appendChild(completedButton);
 	
 	const trashButton = document.createElement("button");
 	trashButton.innerHTML = '<i class="fas fa-trash"></i>';
 	trashButton.classList.add("trash-btn");
 	toDoDiv.appendChild(trashButton);
 	
     todoList.appendChild(toDoDiv);
 	});
 }
   //This function delete todo items from local storage once the delete button is clicked
 function removeLocalTodos(todo) {

 	let todos;
 	if (localStorage.getItem("todos") === null) {
 		todos = [];
 	} else {
 		todos = JSON.parse(localStorage.getItem("todos"));
 	}

 	const toToIndex = todo.children[0].innerText;
 	todos.splice(todos.indexOf(toToIndex), 1);
 	localStorage.setItem("todos", JSON.stringify(todos));
 }
