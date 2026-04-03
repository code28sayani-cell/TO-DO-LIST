const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const emptyState = document.getElementById("emptyState");

// Load tasks from localStorage
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Render tasks
function renderTasks() {
    taskList.innerHTML = "";

    if (tasks.length === 0) {
        emptyState.style.display = "block";
        return;
    }

    emptyState.style.display = "none";

    tasks.forEach((task, index) => {
        const li = document.createElement("li");

        if (task.completed) li.classList.add("completed");

        li.innerHTML = `
            <div class="task-left">
                <input type="checkbox" ${task.completed ? "checked" : ""}>
                <span>${task.text}</span>
            </div>
            <div class="delete">🗑</div>
        `;

        // Toggle complete
        li.querySelector("input").addEventListener("change", () => {
            tasks[index].completed = !tasks[index].completed;
            saveTasks();
        });

        // Delete task
        li.querySelector(".delete").addEventListener("click", () => {
            tasks.splice(index, 1);
            saveTasks();
        });

        taskList.appendChild(li);
    });
}

// Save to localStorage
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderTasks();
}

// Add task
addBtn.addEventListener("click", () => {
    if (taskInput.value.trim() === "") return;

    tasks.push({
        text: taskInput.value,
        completed: false
    });

    taskInput.value = "";
    saveTasks();
});

// Enter key support
taskInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") addBtn.click();
});

// Initial render
renderTasks();