// Get elements
const taskForm = document.getElementById('taskForm');
const taskNameInput = document.getElementById('taskName');
const dueDateInput = document.getElementById('dueDate');
const taskList = document.getElementById('tasks');

// Task array
let tasks = [];

// Add task
taskForm.addEventListener('submit', function (e) {
    e.preventDefault();

    // Get task values
    const taskName = taskNameInput.value;
    const dueDate = dueDateInput.value;

    if (taskName && dueDate) {
        const task = {
            name: taskName,
            dueDate: dueDate,
            completed: false
        };

        // Add task to tasks array
        tasks.push(task);

        // Render tasks
        renderTasks();

        // Clear inputs
        taskNameInput.value = '';
        dueDateInput.value = '';
    }
});

// Render tasks
function renderTasks() {
    taskList.innerHTML = '';

    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.classList.add(task.completed ? 'completed' : '');

        li.innerHTML = `
            <p><strong>${task.name}</strong></p>
            <p>Due Date: ${task.dueDate}</p>
            <button onclick="toggleTask(${index})">Mark as ${task.completed ? 'Incomplete' : 'Complete'}</button>
            <button onclick="deleteTask(${index})">Delete</button>
        `;
        taskList.appendChild(li);
    });
}

// Toggle task completion
function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    renderTasks();
}

// Delete task
function deleteTask(index) {
    tasks.splice(index, 1);
    renderTasks();
}

// Initial render
renderTasks();
