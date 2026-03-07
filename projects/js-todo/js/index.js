//referencing the elements by their id that i had set up in the html and store variables here
const taskInput = document.getElementById("task-input");
const addTaskBtn = document.getElementById("add-task-btn");
const taskList = document.getElementById("task-list");


//Making the add task button WORK with event listener triggered by clicked the button AND pressing enter on ur keyboard(user experience ++)
 addTaskBtn.addEventListener("click", addTask);
 taskInput.addEventListener("keypress",(e)=> {
    if (e.key === "Enter") addTask();
 });
  
//CORE FEATURE STARTS HERE ADDING TASKS BABEY()
//flow here.Get text,create list/task,listen for completion,delete button with a delete function,append button to li  
function addTask(){

   const taskText = taskInput.value.trim();// trim is to remove extra space in text +read text
   if (taskText === "") return;//prevent empty tasks

   const li= document.createElement("li")//creating the task list
   li.className = "task";//for css styling
   li.textContent = taskText; //

//calling an event listener here for that whe you click task its complete and click again will undo the completed state
li.addEventListener("click",()=>{
li.classList.toggle("completed");//toggle > switch to the completed style automaticlly on n off  (if you forget) 
});
 //creating a delete button for the task
 const deleteBtn = document.createElement("button");
 deleteBtn.textContent = "Delete"
   
//button click for deleting task
 deleteBtn.addEventListener("click",(e) =>  {
    e.stopPropagation(); //so that the click here only apply to delete and not task complete 
    taskList.removeChild(li);//will remove task from list
});
li.appendChild(deleteBtn); //thats the delete button
taskList.appendChild(li);//show the tasks in the ui
taskInput.value = ""; //clears the input for a new task
}