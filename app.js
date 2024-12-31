// Get elements from the DOM
const taskNameInput = document.getElementById("task-name");
const taskDescInput = document.getElementById("task-desc");
const taskDueInput = document.getElementById("task-due");
const taskPriorityInput = document.getElementById("task-priority");
const addTaskButton = document.getElementById("add-task-btn");
const taskList = document.getElementById("task-list");

// Load tasks from localStorage
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Display tasks on the screen
function displayTasks() {
  taskList.innerHTML = "";
  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.classList.add(task.completed ? "completed" : "");
    
    li.innerHTML = `
      <div>
        <h3>${task.name}</h3>
        <p>${task.description}</p>
        <small>Due: ${task.dueDate} | Priority: ${task.priority}</small>
      </div>
      <div>
        <button onclick="toggleComplete(${index})">Mark as ${task.completed ? "Incomplete" : "Complete"}</button>
        <button onclick="deleteTask(${index})" class="delete-btn">Delete</button>
      </div>
    `;
    
    taskList.appendChild(li);
  });
}

// Add a new task
function addTask() {
  const taskName = taskNameInput.value.trim();
  const taskDesc = taskDescInput.value.trim();
  const taskDueDate = taskDueInput.value;
  const taskPriority = taskPriorityInput.value;

  if (taskName && taskDesc && taskDueDate && taskPriority) {
    const newTask = {
      name: taskName,
      description: taskDesc,
      dueDate: taskDueDate,
      priority: taskPriority,
      completed: false
    };
    
    tasks.push(newTask);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    displayTasks();
    
    // Clear the input fields
    taskNameInput.value = "";
    taskDescInput.value = "";
    taskDueInput.value = "";
    taskPriorityInput.value = "Low";
  } else {
    alert("Please fill out all fields.");
  }
}

// Toggle the completion status of a task
function toggleComplete(index) {
  tasks[index].completed = !tasks[index].completed;
  localStorage.setItem("tasks", JSON.stringify(tasks));
  displayTasks();
}

// Delete a task
function deleteTask(index) {
  tasks.splice(index, 1);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  displayTasks();
}

// Event listener for the add task button
addTaskButton.addEventListener("click", addTask);

// Initial call to display tasks
displayTasks();
