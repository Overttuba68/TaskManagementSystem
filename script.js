// Get elements from the DOM
const addTaskBtn = document.getElementById('add-task-btn');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');

// Load tasks from localStorage when the page loads
window.onload = () => {
  loadTasks();
};

// Function to load tasks from localStorage
function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.forEach(task => {
    createTaskElement(task.text, task.id);
  });
}

// Function to add a new task
function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText) {
    const task = {
      id: Date.now(),
      text: taskText
    };
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    createTaskElement(task.text, task.id);
    taskInput.value = '';
  }
}

// Function to create a task element and append it to the list
function createTaskElement(taskText, taskId) {
  const li = document.createElement('li');
  li.classList.add('task-item');
  li.setAttribute('data-id', taskId);
  li.innerHTML = `
    <span>${taskText}</span>
    <button onclick="editTask(${taskId})">Edit</button>
    <button onclick="deleteTask(${taskId})">Delete</button>
  `;
  taskList.appendChild(li);
}

// Function to edit a task
function editTask(taskId) {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  const task = tasks.find(task => task.id === taskId);
  const newText = prompt("Edit your task:", task.text);

  if (newText && newText !== task.text) {
    task.text = newText;
    localStorage.setItem('tasks', JSON.stringify(tasks));

    // Update the UI
    const taskElement = document.querySelector(`[data-id='${taskId}']`);
    taskElement.querySelector('span').textContent = newText;
  }
}

// Function to delete a task
function deleteTask(taskId) {
  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks = tasks.filter(task => task.id !== taskId);
  localStorage.setItem('tasks', JSON.stringify(tasks));

  const taskElement = document.querySelector(`[data-id='${taskId}']`);
  taskElement.remove();
}

// Event listener for the "Add Task" button
addTaskBtn.addEventListener('click', addTask);

// Optional: Allow hitting "Enter" key to add task
taskInput.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    addTask();
  }
});
