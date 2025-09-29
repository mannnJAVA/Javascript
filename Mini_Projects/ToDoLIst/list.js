  const inp = document.getElementById('inp');
  const dateInp = document.getElementById('dateInp');
  const container = document.getElementById('taskContainer');

  function saveTasks(){
    localStorage.setItem('tasks', container.innerHTML);
  }

  function loadTasks(){
    container.innerHTML = localStorage.getItem('tasks') || '';
  }

  function addTask(){
    const text = inp.value.trim();
    const date = dateInp.value;
    if(!text) return;

    const row = document.createElement('div');
    row.className = 'task-row';
    row.innerHTML = `
      <div class="task-name">${text}</div>
      <div class="task-date">${date || ''}</div>
      <div class="task-actions">
        <button class="edit-btn" onclick="editTask(this)">Edit</button>
        <button class="delete-btn" onclick="deleteTask(this)">Delete</button>
      </div>`;
    container.appendChild(row);
    inp.value='';
    dateInp.value='';
    saveTasks();
  }

  function deleteTask(btn){
    btn.closest('.task-row').remove();
    saveTasks();
  }

  function editTask(btn){
    const row = btn.closest('.task-row');
    const nameDiv = row.querySelector('.task-name');
    const newText = prompt('Edit task:', nameDiv.textContent);
    if(newText !== null) {
      nameDiv.textContent = newText.trim() || nameDiv.textContent;
      saveTasks();
    }
  }

  loadTasks();