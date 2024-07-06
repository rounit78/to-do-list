// script.js
document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('task-form');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    const getTasks = () => JSON.parse(localStorage.getItem('tasks')) || [];
    const saveTasks = tasks => localStorage.setItem('tasks', JSON.stringify(tasks));

    const renderTasks = () => {
        taskList.innerHTML = '';
        const tasks = getTasks();
        tasks.forEach((task, index) => {
            const taskItem = document.createElement('li');
            taskItem.className = task-item ${task.completed ? 'completed' : ''};
            taskItem.innerHTML = `
                <span>${task.text}</span>
                <div>
                    <button class="edit" onclick="editTask(${index})">Edit</button>
                    <button class="delete" onclick="deleteTask(${index})">Delete</button>
                    <button class="toggle" onclick="toggleTask(${index})">${task.completed ? 'Uncomplete' : 'Complete'}</button>
                </div>
            `;
            taskList.appendChild(taskItem);
        });
    };

    window.editTask = index => {
        const tasks = getTasks();
        const newTaskText = prompt('Edit Task:', tasks[index].text);
        if (newTaskText !== null) {
            tasks[index].text = newTaskText;
            saveTasks(tasks);
            renderTasks();
        }
    };

    window.deleteTask = index => {
        const tasks = getTasks();
        tasks.splice(index, 1);
        saveTasks(tasks);
        renderTasks();
    };

    window.toggleTask = index => {
        const tasks = getTasks();
        tasks[index].completed = !tasks[index].completed;
        saveTasks(tasks);
        renderTasks();
    };

    taskForm.addEventListener('submit', event => {
        event.preventDefault();
        const taskText = taskInput.value.trim();
        if (taskText) {
            const tasks = getTasks();
            tasks.push({ text: taskText, completed: false });
            saveTasks(tasks);
            taskInput.value = '';
            renderTasks();
        }
    });

    renderTasks();
});