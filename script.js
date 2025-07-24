let timerDisplay = document.getElementById("timer");
let startBtn = document.getElementById("start");
let stopBtn = document.getElementById("stop");
let resetBtn = document.getElementById("reset");

let timer; 
let timeLeft = 25 * 60;

function updateDisplay() {
  let minutes = Math.floor(timeLeft / 60);
  let seconds = timeLeft % 60;
  timerDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

startBtn.addEventListener("click", () => {
  if (!timer) {
    timer = setInterval(() => {
      if (timeLeft > 0) {
        timeLeft--;
        updateDisplay();
      } else {
        clearInterval(timer);
      }
    }, 1000);
  }
});

stopBtn.addEventListener("click", () => {
  clearInterval(timer);
  timer = null;
});

resetBtn.addEventListener("click", () => {
  clearInterval(timer);
  timer = null;
  timeLeft = 25 * 60;
  updateDisplay();
});

updateDisplay();

let taskInput = document.getElementById("task-input");
let addTaskBtn = document.getElementById("add-task");
let taskList = document.getElementById("task-list");

function loadTasks() {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  taskList.innerHTML = "";
  tasks.forEach((task, index) => {
    let li = document.createElement("li");
    li.textContent = task;
    let delBtn = document.createElement("button");
    delBtn.textContent = "❌";
    delBtn.onclick = () => {
      tasks.splice(index, 1);
      localStorage.setItem("tasks", JSON.stringify(tasks));
      loadTasks();
    };
    li.appendChild(delBtn);
    taskList.appendChild(li);
  });
}

addTaskBtn.addEventListener("click", () => {
  let task = taskInput.value.trim();
  if (task) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    taskInput.value = "";
    loadTasks();
  }
});

window.onload = loadTasks;

let themeToggle = document.getElementById("theme-toggle");
let isDark = localStorage.getItem("theme") === "dark";

function setTheme(dark) {
  document.body.classList.toggle("dark-mode", dark);
  localStorage.setItem("theme", dark ? "dark" : "light");
}

themeToggle.addEventListener("click", () => {
  isDark = !isDark;
  setTheme(isDark);
});

setTheme(isDark);
