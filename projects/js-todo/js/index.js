//select DOM elements
const taskInput = document.getElementById("task-input");
const addTaskBtn = document.getElementById("add-task-btn");
const taskList = document.getElementById("task-list");


//Add task when button clicked n enter is pressed(user experience ++)
addTaskBtn.addEventListener("click", addTask);
taskInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") addTask();
});

//ADDING TASKS BABEY
function addTask() {

    const taskText = taskInput.value.trim();
    if (!taskText) return;//prevent empty tasks

    const li = document.createElement("li")//creating the task list
    li.className = "task";
    li.textContent = taskText;

    //mark/unmark task as completed
    li.addEventListener("click", () => {
        li.classList.toggle("completed");
        saveTasks();
    });

    //delet task n button
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        li.remove();
        saveTasks();
    });

    li.appendChild(deleteBtn);
    taskList.appendChild(li);

    taskInput.value = ""; //clears the input for a new task

    saveTasks();
}

//HELLLLO LOCALSTORAGEEEEE
function saveTasks() {
    const tasks = [];
    // collect all tasks from the list
    document.querySelectorAll("#task-list .task").forEach(taskEl => {

        tasks.push({
            text: taskEl.firstChild.textContent,
            completed: taskEl.classList.contains("completed")

        });

    });

    //save tasks in local storage
    localStorage.setItem("tasks", JSON.stringify(tasks));

}


function loadTasks() {//reload the saved task list when page load
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];

    savedTasks.forEach(task => {///create task item
        const li = document.createElement("li");
        li.className = "task";
        li.textContent = task.text;

        //restore completed state
        if (task.completed) {
            li.classList.add("completed");
        }

        //complete toggle
        li.addEventListener("click", () => {
            li.classList.toggle("completed");
            saveTasks();
        });
        // delete button
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            li.remove();
            saveTasks();
        });

        li.appendChild(deleteBtn);
        taskList.appendChild(li);

    });
}

loadTasks(); 