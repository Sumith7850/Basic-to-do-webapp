let taskId = 0;
const pendingList = document.getElementById("pendingList");
const completedList = document.getElementById("completedList");

function formatDate(date) {
  return `${date.toLocaleDateString()} ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
}

function addTask() {
  const taskInput = document.getElementById("taskInput");
  const taskText = taskInput.value.trim();
  if (!taskText) return alert("Please enter a task.");

  const timestamp = formatDate(new Date());
  const task = createTaskElement(taskText, timestamp, false);
  pendingList.appendChild(task);

  taskInput.value = "";
}

function createTaskElement(text, time, isCompleted) {
  const li = document.createElement("li");
  li.setAttribute("data-id", taskId++);

  const infoDiv = document.createElement("div");
  infoDiv.className = "task-info";

  const span = document.createElement("span");
  span.textContent = text;

  const timeEl = document.createElement("div");
  timeEl.className = "task-time";
  timeEl.textContent = isCompleted ? `Completed at: ${time}` : `Added at: ${time}`;

  infoDiv.appendChild(span);
  infoDiv.appendChild(timeEl);

  const actionDiv = document.createElement("div");
  actionDiv.className = "actions";

  const editBtn = document.createElement("button");
  editBtn.textContent = "✏️";
  editBtn.className = "edit";
  editBtn.onclick = () => editTask(li, span);

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "🗑️";
  deleteBtn.className = "delete";
  deleteBtn.onclick = () => li.remove();

  actionDiv.appendChild(editBtn);
  actionDiv.appendChild(deleteBtn);

  if (!isCompleted) {
    const completeBtn = document.createElement("button");
    completeBtn.textContent = "✔️";
    completeBtn.className = "complete";
    completeBtn.onclick = () => completeTask(li, span.textContent);
    actionDiv.appendChild(completeBtn);
  }

  li.appendChild(infoDiv);
  li.appendChild(actionDiv);
  return li;
}

function completeTask(taskEl, text) {
  const time = formatDate(new Date());
  const newTask = createTaskElement(text, time, true);
  completedList.appendChild(newTask);
  taskEl.remove();
}

function editTask(taskEl, spanEl) {
  const newText = prompt("Edit your task:", spanEl.textContent);
  if (newText) {
    spanEl.textContent = newText;
  }
}
