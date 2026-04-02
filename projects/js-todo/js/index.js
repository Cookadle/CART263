
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







///////////////////////////////////////////////PHASER GAME LOGIC START //////////////////////////////////////////
//https://pippinbarr.com/cart263-2021/topics/game-engine/phaser-3-setup.html for references
function startGame(tasks) {
    const gameContainer = document.getElementById('game-container');

    //remove previous canvas instead of stacking
    if (gameContainer.firstChild) {
        gameContainer.firstChild.remove();
    }

    class ToDoScene extends Phaser.Scene {
        constructor() {
            super({ key: 'ToDoScene' });
        }

        preload() {}

        create() {
            this.score = 0;
            this.lives = 3;
            this.scoreText = this.add.text(20, 10, "Score: 0", { font: "20px Arial", fill: "#000" });
            this.livesText = this.add.text(400, 10, "Lives: 3", { font: "20px Arial", fill: "#f00" });

            this.cameras.main.setBackgroundColor('#b6adad');
            this.tasksGroup = this.add.group();

            //spawn over time instead all at once +continous loop
            this.time.addEvent({
                delay: 1000, //1 second 
                loop: true,
                callback: () => {
                    if (tasks.length === 0) return;

                    const task = Phaser.Utils.Array.GetRandom(tasks);
                    this.spawnTask(task);
                }
            });
        }

        spawnTask(task) {
            const mark = task.completed ? " ✅" : " ⬜";
            const taskText = this.add.text(
                Phaser.Math.Between(50, 500),
                -50,
                mark + task.text,
                { font: "20px Arial", fill: "#000" }
            );

            this.physics.world.enable(taskText);

            //velocity influenced b completion + length
            const baseVelocity = task.completed ? 200 : 80;
            const lengthVelocity = task.text.length * 3;
            taskText.body.setVelocityY(baseVelocity + lengthVelocity);

            //tokyo drift tasks
            taskText.body.setVelocityX(Phaser.Math.Between(-50, 50));
            taskText.body.setAllowGravity(false);
            taskText.body.setCollideWorldBounds(false);

            taskText.setInteractive();
            taskText.on('pointerdown', () => {
                this.score++;
                this.scoreText.setText("Score: " + this.score);
                taskText.destroy();
            });

            this.tasksGroup.add(taskText);
        }

        update() {
            // check missed tasks then -1life
            this.tasksGroup.getChildren().forEach(task => {
                const taskBottomY = task.y + task.height / 2;
                if (taskBottomY > 400 && !task.missed) {
                    task.missed = true;

                    this.lives--;
                    this.livesText.setText("Lives: " + this.lives);

                    if (this.lives <= 0) {
                        this.scene.start('GameOverScene');
                    }
                }
            });
        }
    }

    //game over screen
    class GameOverScene extends Phaser.Scene {
        constructor() {
            super({ key: 'GameOverScene' });
        }
        create() {
            this.add.text(150, 200, "GAME OVER", { font: "40px Arial", fill: "#f00" });
            this.input.once('pointerdown', () => {
                this.scene.start('ToDoScene');
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
        scene: [ToDoScene, GameOverScene]
    };

    new Phaser.Game(config);
}


///////////////////////////////////////////////PHASER / GAME LOGIC END//////////////////////////////////////////









///////////////////////////////////////////////EVENT LISTENER START///////////////////////////////

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

///////////////////////////////////////EVENT LISTENER END/////////////////////////////////////////////////







////////////////////////////////////////////////////



