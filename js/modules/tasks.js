import { loadTasks as loadTasksFromStorage, saveTasks } from './storage.js';

export function updateTaskIndexes(category) {
    const tasks = loadTasksFromStorage(category);
    tasks.forEach((task, index) => {
      task.index = index + 1; 
    });
    saveTasks(tasks, category); 
  }

export function createTaskElement(id, content, category, index) {
    const newTask = document.createElement('div');
    newTask.id = id;
    newTask.draggable = true;
    newTask.classList.add('task');
    newTask.setAttribute('data-category', category);

    const taskIndex = document.createElement('span');
    taskIndex.classList.add('task-index');
    taskIndex.textContent = `${index}. `;
    newTask.appendChild(taskIndex);

    const taskContent = document.createElement('span');
    taskContent.classList.add('task-content'); 
    taskContent.textContent = content;
    newTask.appendChild(taskContent);

    const deleteIcon = document.createElement('i');
    const moveUpIcon = document.createElement('i');
    const moveDownIcon = document.createElement('i');

    deleteIcon.classList.add('fas', 'fa-trash');
    deleteIcon.addEventListener('click', () => {
        const taskCategory = newTask.getAttribute('data-category');
        let tasks = loadTasksFromStorage(taskCategory);
        tasks = tasks.filter(task => task.id !== id);
        saveTasks(tasks, taskCategory);
        newTask.remove();
        updateTaskIndexes(taskCategory);
    });

    moveUpIcon.classList.add('fas', 'fa-arrow-up');
    moveUpIcon.addEventListener('click', () => {
        const prevTask = newTask.previousElementSibling;
        if (prevTask) {
            prevTask.parentNode.insertBefore(newTask, prevTask);
        }
    });

    moveDownIcon.classList.add('fas', 'fa-arrow-down');
    moveDownIcon.addEventListener('click', () => {
        const nextTask = newTask.nextElementSibling;
        if (nextTask) {
            nextTask.parentNode.insertBefore(nextTask, newTask);
        }
    });

    deleteIcon.classList.add('task-action-icon');
    moveUpIcon.classList.add('task-action-icon', 'fa-arrow-up');
    moveDownIcon.classList.add('task-action-icon', 'fa-arrow-down');

    const iconsContainer = document.createElement('div');
    iconsContainer.classList.add('task-icons');
    iconsContainer.appendChild(deleteIcon);
    iconsContainer.appendChild(moveUpIcon);
    iconsContainer.appendChild(moveDownIcon);

    newTask.appendChild(iconsContainer);

    function handleDragStart(e) {
        e.dataTransfer.setData('text/plain', e.target.id);
        e.dataTransfer.effectAllowed = 'move';
    }

    newTask.addEventListener('dragstart', handleDragStart);

    return newTask;
}


export function addTask(content, containerSelector, category) {
    if (content.trim() !== '') {
        const tasks = loadTasksFromStorage(category);
        const id = 'task-' + Date.now();
        
        const maxIndex = tasks.reduce((max, task) => Math.max(max, task.index || 0), 0);
        const index = maxIndex + 1;
        
        const newTaskElement = createTaskElement(id, content.trim(), category, index);
        document.querySelector(containerSelector).appendChild(newTaskElement);
        
        tasks.push({ id, content: content.trim(), category, index }); 
        saveTasks(tasks, category);
    }
}

export function renderTasks() {
    const categories = ['tache-a-faire', 'tache-en-cours', 'tache-accomplie'];
    categories.forEach(category => {
        const containerSelector = `.droppable[data-category="${category}"]`;
        const tasks = loadTasksFromStorage(category);
        const container = document.querySelector(containerSelector);
        container.innerHTML = ''; 
        tasks.forEach(task => {
            const newTaskElement = createTaskElement(task.id, task.content, task.category, task.index); 
            container.appendChild(newTaskElement);
        });
    });
}