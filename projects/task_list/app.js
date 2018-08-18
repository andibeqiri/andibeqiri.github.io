// Define Ui Vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-tasks");
const filter = document.querySelector("#filter");
const taskInput = document.querySelector("#task");


// Load all event Listeners
loadEventListeners();

function loadEventListeners(){
	// Dom load event
	document.addEventListener('DOMContentLoaded', getTasks);

	// Add task event
	form.addEventListener('submit', addTask);
	// remove task evenr
	taskList.addEventListener('click', removeTask);
	// Clear task event
	clearBtn.addEventListener('click', clearTasks);

	// Filter Tasks event
	filter.addEventListener('keyup', filterTasks);

}

// Get Tasks from LocalStorage

function getTasks(){
	let tasks;
	if(localStorage.getItem('tasks') === null){
		tasks = [];
	}else{
		tasks = JSON.parse(localStorage.getItem('tasks'));
	}
	tasks.forEach(function(task){
		// Create li element
	    const li = document.createElement('li');
	    // Add class
	    li.className = 'collection-item';
	    // Create text node and append to li
	    li.appendChild(document.createTextNode(task));
	    // Create new link element
	    const link = document.createElement('a');
	    // Add class
	    link.className = 'delete-item secondary-content';
	    // Add icon html
	    link.innerHTML = '<i class="fa fa-remove"></i>';
	    // Append the link to li
	    li.appendChild(link);

	    // Append li to ul
	    taskList.appendChild(li);
	});
}
// Add Task
function addTask(e){
	if(taskInput.value === ''){
        // TODO add better alert;
		alert("Add a task");
	}else{
		// Create li element
		const li = document.createElement('li');
		li.className = 'collection-item';

		// Create text Node and Append to li
		li.appendChild(document.createTextNode(taskInput.value));
		// Create new link element
		const link = document.createElement('a');
		link.className = 'delete-item secondary-content';

		// Add icon html

		link.innerHTML = '<i class="fa fa-remove"></i>'
		li.appendChild(link);
		// append li to ul
		taskList.appendChild(li);
		// Store in local storage
		storeTaskInLocalStorage(taskInput.value);
		// clear input
		taskInput.value = '';
	}
	e.preventDefault();
}


// Remove task
function removeTask(e) {
  	if(e.target.parentElement.classList.contains('delete-item')) {
		e.target.parentElement.parentElement.remove();  
		// Remove from LocalStorage
		removeTaskFromLocalStorage(e.target.parentElement.parentElement);  	
  	}
}


// Clear Tasks

function clearTasks(){
	while(taskList.firstChild){
		taskList.removeChild(taskList.firstChild);
	}
	// Clear from Local Storage
	clearTasksFromLocalStorage();
}

function clearTasksFromLocalStorage(){
	localStorage.clear();
}

function filterTasks(e){
	const text = e.target.value.toLowerCase();
	document.querySelectorAll('.collection-item').forEach(
		function(task){
			const item = task.firstChild.textContent;
			if(item.toLowerCase().indexOf(text) != -1){
				task.style.display = 'block';
			}else{
				task.style.display = 'none';
			}
		}
	);
}


function storeTaskInLocalStorage(task){
	let tasks;
	if(localStorage.getItem('tasks') === null){
		tasks = [];
	}else{
		tasks = JSON.parse(localStorage.getItem('tasks'));
	}
	tasks.push(task);
	localStorage.setItem('tasks', JSON.stringify(tasks));
}


function createNewItem(){
	const li = document.createElement('li');
	// Add class
	li.className = 'collection-item';
	// Create text node and append to li
	li.appendChild(document.createTextNode(task));
	// Create new link element
	const link = document.createElement('a');
	// Add class
	link.className = 'delete-item secondary-content';
	// Add icon html
	link.innerHTML = '<i class="fa fa-remove"></i>';
	// Append the link to li
	li.appendChild(link);

	// Append li to ul
	taskList.appendChild(li);
}

function removeTaskFromLocalStorage(taskItem){
	let tasks;
	if(localStorage.getItem('tasks') === null){
		tasks = [];
	}else{
		tasks = JSON.parse(localStorage.getItem('tasks'));
	}
	tasks.forEach(function(task, index){
		if(taskItem.textContent === task){
			tasks.splice(index, 1);
		}
	});
	localStorage.setItem('tasks', JSON.stringify(tasks));
}
