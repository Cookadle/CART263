//referencing the elements by their id that i had set up in the html and store variables here
const taskInput = document.getElementById("task-input");
const addTaskBtn = document.getElementById("add-task-btn");
const taskList = document.getElementById("task-list");


//Making the add task button WORK with event listener triggered by clicked the button AND pressing enter on ur keyboard(user experience ++)
//ISSUE NUMBER ONE CSS > MY DELETE BUTTON GET CROSSED OUT WHEN COMPLETED
addTaskBtn.addEventListener("click", addTask);
taskInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") addTask();
});

//CORE FEATURE STARTS HERE ADDING TASKS BABEY()
//flow Get text,create list/task,listen for completion,delete button with a delete function,append button to li ST
function addTask() {

    const taskText = taskInput.value.trim();// trim is to remove extra space in text +read text
    if (taskText === "") return;//prevent empty tasks

    const li = document.createElement("li")//creating the task list
    li.className = "task";//for css styling
    li.textContent = taskText; //

    //creating a delete button for the task
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete"

    //calling an event listener here for that whe you click task its complete and click again will undo the completed state
    li.addEventListener("click", () => {
        li.classList.toggle("completed");//toggle > switch to the completed style automaticlly on n off  (if you forget) 
        saveTasks();
    });

    //button click for deleting task
    deleteBtn.addEventListener("click", (e) => {
        e.stopPropagation(); //so that the click here only apply to delete and not task complete 
        taskList.removeChild(li);//will remove task from list
        li.remove();
        saveTasks();
    });
//just attaching delete button to task and list
    li.appendChild(deleteBtn); //thats the delete button
    taskList.appendChild(li);//show the tasks in the ui

    taskInput.value = ""; //clears the input for a new task

    saveTasks();
}

//we want the task TO STAYYYYY when we refresh HELLLLO LOCALSTORAGEEEEE
function saveTasks() {//store n save them

    const tasks = [];//array for tasks as objects  my storage container

    document.querySelectorAll("#task-list .task").forEach(taskEl => {//find every task elemnts inside li

        tasks.push({//convert DOM task into JS object

            text: taskEl.firstChild.textContent, //get text of the task

            completed: taskEl.classList.contains("completed")//check if the task has the completed class n returns true or false

        });

    });

    //localstorage only store strings so using JSON.stringify converts array as string
    localStorage.setItem("tasks", JSON.stringify(tasks));

}


function loadTasks() {//reload the task list when page load
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];//if nothing in storasge go to empty array so null

    savedTasks.forEach(task => {//loop every task object in the array

        const li = document.createElement("li");

        //task class for CSS style 
        li.className = "task";

        //put task text inside the <li>st element hihi
        li.textContent = task.text;

        //create delete butto for task =text inside like before
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";

        // restore task state / check if task was marked as completed if yes add completed class so UI reflects stored state
        if (task.completed) {
            li.classList.add("completed");
        }

        //clicking the task make it go completed state as before
        li.addEventListener("click", () => {

            li.classList.toggle("completed");

            //save updated state to local storage
            saveTasks();
        });

        deleteBtn.addEventListener("click", (e) => {

            //refer to previous stop propagation same concept
            e.stopPropagation();

            //remove task from DOM
            li.remove();

            //update local storage so deleted task disappears permanently
            saveTasks();
        });

        li.appendChild(deleteBtn);

        taskList.appendChild(li);

    });
}

loadTasks(); 