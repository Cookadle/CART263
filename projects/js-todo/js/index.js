//Grab key elements by IDs so we can use
const taskInput = document.getElementById("task-input");//for adding task box
const addTaskBtn = document.getElementById("add-task-btn");//for adding the task into the html
const taskList = document.getElementById("task-list"); //will create a task list that I can fetch
//adding the task to the list
function addTask() {
    const taskText= taskInput.value.trim();//if nothing was typed dont add
    if (taskText==="")return;
    //create a list <li> and text
    const li = document.createElement("li")
    li.className = "task";
    li.textContent= taskText;
    li.addEventListener("click")
}