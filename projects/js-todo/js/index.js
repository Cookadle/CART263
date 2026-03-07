//referencing the elements by their id that i had set up in the html and store variables here
const taskInput = document.getElementById("task-input");
const addTaskBtn = document.getElementById("add-task-btn");
const taskList = document.getElementById("task-list");


//CORE FEATURE STARTS HERE ADDING TASKS BABEY()
function addTask(){

   const taskText = taskInput.value.trim();//remove extra space in text +read text
   if (taskText === "") return;//prevent empty tasks

   const li= document.createElement("li")//creating the task list
   li.className = "task";//for css styling
   li.textContent = taskText; //

//calling an event listener here for that whe you click task its complete and click again will undo the completed state
li.addEventListener("click",()=>{
li.classList.toggle("completed");//toggle > remove or adds class automaticlly  (if you forget) 
});
 //creating a delete button for the task
 const deleteBtn = document.createElement("button");
 deleteBtn.textContent = "Delete"






}