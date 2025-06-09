document.addEventListener('DOMContentLoaded', function() {
  const taskInput = document.getElementById('taskInput');
  const addTaskBtn = document.getElementById('addTaskBtn');
  const taskList = document.getElementById('taskList');
  
  loadTasks();
  
  addTaskBtn.addEventListener('click', addTask);
  
  taskInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      addTask();
    }
  });
  
  function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText === '') return;
    
    const taskItem = document.createElement('li');
    taskItem.className = 'task-item';
    
    const taskSpan = document.createElement('span');
    taskSpan.className = 'task-text';
    taskSpan.textContent = taskText;
    
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.textContent = 'Удалить';
    
    taskSpan.addEventListener('click', function() {
      this.classList.toggle('выполнено');
      saveTasks();
    });
    
    deleteBtn.addEventListener('click', function() {
      taskItem.remove();
      saveTasks();
    });
    
    taskItem.appendChild(taskSpan);
    taskItem.appendChild(deleteBtn);
    taskList.appendChild(taskItem);
    
    taskInput.value = '';
    saveTasks();
  }
  
  function saveTasks() {
    const tasks = [];
    document.querySelectorAll('.task-item').forEach(item => {
      tasks.push({
        text: item.querySelector('.task-text').textContent,
        completed: item.querySelector('.task-text').classList.contains('completed')
      });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
  
  function loadTasks() {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      const tasks = JSON.parse(savedTasks);
      tasks.forEach(task => {
        const taskItem = document.createElement('li');
        taskItem.className = 'task-item';
        
        const taskSpan = document.createElement('span');
        taskSpan.className = 'task-text';
        taskSpan.textContent = task.text;
        if (task.completed) {
          taskSpan.classList.add('completed');
        }
        
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-btn';
        deleteBtn.textContent = 'Удалить';
        
        taskSpan.addEventListener('click', function() {
          this.classList.toggle('completed');
          saveTasks();
        });
        
        deleteBtn.addEventListener('click', function() {
          taskItem.remove();
          saveTasks();
        });
        
        taskItem.appendChild(taskSpan);
        taskItem.appendChild(deleteBtn);
        taskList.appendChild(taskItem);
      });
    }
  }
});