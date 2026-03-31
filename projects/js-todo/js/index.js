
//select DOM elements
const input = document.getElementById("task-input");
const addTaskBtn = document.getElementById("add-task-btn");
const todoList = document.getElementById("task-list");
const showAll = document.getElementById("show-all");
const showActive = document.getElementById("show-active");
const showCompleted = document.getElementById("show-completed");
const startGameBtn = document.getElementById("start-game");
//const showDeleted = document.getElementById("show-deleted");

//var
let currentFilter = "all";
////////////////////TASK MANAGEMENT TASK MANAGEMENT TASK MANAGEMENT START//////////////////////////////////////

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
////////////////////TASK MANAGEMENT TASK MANAGEMENT TASK MANAGEMENT END //////////////////////////////////////


//////////////////////FILTERS FILTERS FILTERS START////////////////////////////////////////////////////
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
//////////////////////FILTERS FILTERS FILTERS END////////////////////////////////////////////////////
loadTasks();
updateFiltersBtn();


//PHASER TIME DATA
function getTasksArray() {
    const tasks = []; //store tasks as objects 4 phaser lib
    document.querySelectorAll("#task-list .task").forEach(taskEl => {
        tasks.push({
            text: taskEl.firstChild.textContent,//grab text task
            completed: taskEl.classList.contains("completed")//check complete status
        });
    });
    return tasks;
}

//console.log(getTasksArray());

///////////////////////////////////////////////PHASER / GAME LOGIC START //////////////////////////////////////////
//https://pippinbarr.com/cart263-2021/topics/game-engine/phaser-3-setup.html for references
function startGame(tasks) {
    const gameContainer = document.getElementById('game-container');//canvas created in game container

    //remove previous canvas that appears when double click start game
    if (gameContainer.firstChild) {
        gameContainer.firstChild.remove();
    }
    console.log("Starting Phaser game with tasks:", tasks);

    class ToDoScene extends Phaser.Scene {
        constructor() {
            super({
                key: 'ToDoScene'

            });
        }

        preload() {//future images maybe
        }

        create() {

            this.score = 0;//score
            this.scoreText = this.add.text(20, 10, "Score: 0", { font: "20px Arial", fill: "#000" });
            this.cameras.main.setBackgroundColor('#f5f5f5');//bground colour
            this.tasksGroup = this.add.group(); //group 4 keeping task

            //add falling task
            tasks.forEach(task => {
                const mark = task.completed ? " ✅" : " ⬜";
                const taskText = this.add.text(
                    Phaser.Math.Between(50, 500), //random X posit
                    -50,//start above screen y posit
                    mark + task.text,//text +emoji showned here
                    { font: "20px Arial", fill: "#000" }
                );


                this.physics.world.enable(taskText);//make text interactive
                taskText.body.setVelocityY(Phaser.Math.Between(50, 150)); //falling speed
                taskText.body.setVelocityX(Phaser.Math.Between(-50, 50));//tokyodrift these tasks
                taskText.body.setAllowGravity(false);
                taskText.body.setCollideWorldBounds(false);//falls through bottom floor
                taskText.body.setSize(taskText.width, taskText.height);
                taskText.setInteractive(); //clickable text ACTIVATED
                taskText.on('pointerdown', () => {
                    this.score += 1;
                    this.scoreText.setText("Score: " + this.score);
                    taskText.destroy();//remove task once clicked
                });
                this.tasksGroup.add(taskText);
            });
        }

        update() {
            //loop task then remove tasks if fall off bottom 
            this.tasksGroup.getChildren().forEach(task => {
                if (task.y > 450) {
                    task.destroy();
                }
            });
        }
    }


    const config = {
        type: Phaser.AUTO,
        width: 550,
        height: 400,
        parent: "game-container",
        physics: {
            default: 'arcade',
            arcade: {
                gravity: { y: 0 },
                debug: false
            }
        },
        scene: ToDoScene
    };
    new Phaser.Game(config); //start game
}


///////////////////////////////////////////////PHASER / GAME LOGIC END//////////////////////////////////////////






///////////////////////////////////////////////event listener///////////////////////////////

//Add task when button clicked n enter is pressed(user experience ++)
addTaskBtn.addEventListener("click", addTask);
input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") addTask();
});

showAll.addEventListener("click", filterAll);
showActive.addEventListener("click", filterActive);
showCompleted.addEventListener("click", filterCompleted);
//showDeleted.addEventListener("click", filterDeleted);


startGameBtn.addEventListener("click", () => {
    const tasks = getTasksArray(); //get current tasks
    startGame(tasks);
});

///////////////////////////////////////event listener/////////////////////////////////////////////////







////////////////////////////////////////////////////



