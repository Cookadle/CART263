
//select DOM elements
const input = document.getElementById("task-input");
const addTaskBtn = document.getElementById("add-task-btn");
const todoList = document.getElementById("task-list");
const showAll = document.getElementById("show-all");
const showActive = document.getElementById("show-active");
const showCompleted = document.getElementById("show-completed");
//const showDeleted = document.getElementById("show-deleted");

//var
let currentFilter = "all";


//ADDING TASKS BABEY ( code inspired by >https://amd.codes/posts/simple-java-script-to-do-app-with-local-storage
function addTask() {
    const taskText = input.value.trim();
    if (!taskText) return;//prevent empty tasks

    const li = document.createElement("li")//creating the task list
    li.className = "task";

    const textSpan = document.createElement("span");
    textSpan.textContent = taskText;
    li.appendChild(textSpan);

    //mark/unmark task as completed
    li.addEventListener("click", () => {
        li.classList.toggle("completed");
        saveTasks();
        taskFilter();
    });

    //delet task n button
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        li.remove();
        saveTasks();
        taskFilter();
        //deletedTasks.push({
        //text: taskText,
        //completed: li.classList.contains("completed")//instead delete permanant ,saved for undo function stage 2
    });
    //console.log(`Task removed: "${taskText}"`)
    li.appendChild(deleteBtn);

    //edit button----------------------------------helped by : https://github.com/LoafFiction
    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";

    editBtn.addEventListener("click", (e) => {
        e.stopPropagation();

        const originalText = textSpan.textContent;;//tasktext
        const editInput = document.createElement("input");
        editInput.type = "text";
        editInput.value = originalText;


        //clear text + show new input edits
        li.textContent = "";
        li.appendChild(editInput);
        li.appendChild(editBtn);
        li.appendChild(deleteBtn);
        editInput.focus();

        //enter key save, escape key cancel edits
        editInput.addEventListener("keydown", (e) => {
            if (e.key === "Enter") {
                li.textContent = editInput.value.trim() || originalText;
                li.appendChild(editBtn);
                li.appendChild(deleteBtn);
                
                saveTasks();
            } else if (e.key === "Escape") {
                textSpan.textContent = editInput.value.trim() || originalText;
                li.innerHTML = "";
                li.appendChild(textSpan);
                li.appendChild(editBtn);
                li.appendChild(deleteBtn);
                

            }
        });
    });
    li.appendChild(deleteBtn);
    li.appendChild(editBtn);
    todoList.appendChild(li);

    input.value = ""; //clears input for task

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
    //console.log(`Saved ${tasks.length} tasks!`);

}

function loadTasks() {//reload the saved task list when page load
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    //console.log(`Loaded ${savedTasks.length} tasks from storage`);
    savedTasks.forEach(task => {///create task item
        const li = document.createElement("li");
        li.className = "task";
        const textSpan = document.createElement("span");
        textSpan.textContent = task.text;
        li.appendChild(textSpan);

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
            taskFilter();
        });

        //edit button----------------------------------co-helped by : https://github.com/LoafFiction
        const editBtn = document.createElement("button");
        editBtn.textContent = "Edit";

        editBtn.addEventListener("click", (e) => {
            e.stopPropagation();

            const originalText = textSpan.textContent;//tasktext
            const editInput = document.createElement("input");
            editInput.type = "text";
            editInput.value = originalText;


            //clear text + show new input edits
            li.textContent = "";
            li.appendChild(editInput);
            li.appendChild(deleteBtn);
            li.appendChild(editBtn);
            editInput.focus();

            //enter key save escape key cancel edits
            editInput.addEventListener("keydown", (e) => {
                if (e.key === "Enter") {
                    textSpan.textContent = editInput.value.trim() || originalText;
                    li.innerHTML = "";
                    li.appendChild(textSpan);
                    li.appendChild(editBtn);
                    li.appendChild(deleteBtn);
                    
                    saveTasks();
                } else if (e.key === "Escape") {
                    li.textContent = originalText;
                    li.appendChild(editBtn);
                    li.appendChild(deleteBtn);

                }
            });
        });

        li.appendChild(editBtn);
        li.appendChild(deleteBtn);
        todoList.appendChild(li);

    });
}

function taskFilter() {

    if (currentFilter === "all") {
        filterAll();
    }

    if (currentFilter === "active") {
        filterActive();
    }

    if (currentFilter === "completed") {
        filterCompleted();
    }

}

function filterAll() {
    currentFilter = "all";//filter state rn

    document.querySelectorAll("#task-list .task").forEach(task => {
        task.style.display = "flex";
    });
    updateFiltersBtn();
}

function filterActive() {
    currentFilter = "active";//filter state rn

    document.querySelectorAll("#task-list .task").forEach(task => {

        if (task.classList.contains("completed")) {
            task.style.display = "none";//hide if complete
        } else {
            task.style.display = "flex";
        }

    });
    updateFiltersBtn();
}
function filterCompleted() {
    currentFilter = "completed";//filter state rn

    document.querySelectorAll("#task-list .task").forEach(task => {

        if (task.classList.contains("completed")) {
            task.style.display = "flex";//show  if completed
        } else {
            task.style.display = "none";
        }
    });
    updateFiltersBtn();
}
function updateFiltersBtn() {//show which filter is on
    const filters = [showAll, showActive, showCompleted];

    //remove active state for buttons
    filters.forEach(btn => {
        btn.classList.remove("active");
        btn.setAttribute("aria-pressed", "false");
    });

    //add active cls to current filter/btn +aria being used visual clue
    if (currentFilter === "all") {
        showAll.classList.add("active");
        showAll.setAttribute("aria-pressed", "true");

    }
    else if (currentFilter === "active") {
        showActive.classList.add("active");
        showActive.setAttribute("aria-pressed", "true");
    }
    else if (currentFilter === "completed") {
        showCompleted.classList.add("active");
        showCompleted.setAttribute("aria-pressed", "true");
    }
}

loadTasks();
updateFiltersBtn();

//Add task when button clicked n enter is pressed(user experience ++)
addTaskBtn.addEventListener("click", addTask);
input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") addTask();
});

showAll.addEventListener("click", filterAll);
showActive.addEventListener("click", filterActive);
showCompleted.addEventListener("click", filterCompleted);
//showDeleted.addEventListener("click", filterDeleted);
