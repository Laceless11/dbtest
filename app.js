// Load existing tasks from localStorage
document.addEventListener('DOMContentLoaded', loadTasks);

document.getElementById('task-form').addEventListener('submit', addTask);

// Add a new task
function addTask(e) {
    e.preventDefault();

    const taskName = document.getElementById('task-name').value;
    const criticalNumber = document.getElementById('critical-number').value;

    if (taskName === '' || criticalNumber === '') {
        alert('Please fill in all fields');
        return;
    }

    const task = {
        id: Date.now(),
        name: taskName,
        number: parseInt(criticalNumber),
    };

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));

    document.getElementById('task-form').reset();
    loadTasks();
}

// Load tasks from localStorage and display them
function loadTasks() {
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = '';

    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    tasks.forEach((task) => {
        const taskDiv = document.createElement('div');
        taskDiv.classList.add('task-item');
        taskDiv.innerHTML = `
            <span>${task.name} - Critical Number: <strong>${task.number}</strong></span>
            <div>
                <button onclick="increaseNumber(${task.id})">Increase</button>
                <button onclick="deleteTask(${task.id})">Delete</button>
            </div>
        `;
        taskList.appendChild(taskDiv);
    });
}

// Delete a task
function deleteTask(id) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks = tasks.filter(task => task.id !== id);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    loadTasks();
}

// Increase the critical number
function increaseNumber(id) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks = tasks.map(task => {
        if (task.id === id) {
            task.number += 1;
        }
        return task;
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
    loadTasks();
}
