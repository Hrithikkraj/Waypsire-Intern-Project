document.addEventListener('DOMContentLoaded', () => {
  const taskInput = document.getElementById('new-task');
  const addTaskBtn = document.getElementById('add-task-btn');
  const taskList = document.getElementById('task-list');

  // Load tasks from localStorage
  const loadTasks = () => {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => addTask(task.text, task.completed));
  };

  // Save tasks to localStorage
  const saveTasks = () => {
    const tasks = [];
    taskList.querySelectorAll('li').forEach(li => {
      tasks.push({
        text: li.querySelector('span').textContent,
        completed: li.classList.contains('completed')
      });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
  };

  // Add new task
  const addTask = (text, completed = false) => {
    const li = document.createElement('li');
    const span = document.createElement('span');
    span.textContent = text;
    li.appendChild(span);

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.onclick = () => {
      li.remove();
      saveTasks();
    };
    li.appendChild(deleteBtn);

    li.onclick = () => {
      li.classList.toggle('completed');
      saveTasks();
    };

    if (completed) {
      li.classList.add('completed');
    }

    taskList.appendChild(li);
    saveTasks();
  };

  addTaskBtn.onclick = () => {
    const text = taskInput.value.trim();
    if (text) {
      addTask(text);
      taskInput.value = '';
    }
  };

  // Load tasks initially
  loadTasks();
});
