import { loadTasks as loadTasksFromStorage, saveTasks } from './storage.js';

export function createTaskElement(id, content, category) {
    const newTask = document.createElement('div');
    newTask.id = id;
    newTask.draggable = true;
    newTask.classList.add('task');
    newTask.setAttribute('data-category', category); 

    const deleteIcon = document.createElement('i');
    const moveUpIcon = document.createElement('i');
    const moveDownIcon = document.createElement('i');

    deleteIcon.classList.add('fas', 'fa-trash');
    deleteIcon.addEventListener('click', () => {
        newTask.remove();
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

    const taskContent = document.createElement('span');
    taskContent.textContent = content;

    function handleDragStart(e) {
        e.dataTransfer.setData('text/plain', e.target.id);
        e.dataTransfer.effectAllowed = 'move';
    }

    newTask.addEventListener('dragstart', handleDragStart);

    newTask.appendChild(taskContent);
    newTask.appendChild(deleteIcon);
    newTask.appendChild(moveUpIcon);
    newTask.appendChild(moveDownIcon);

    return newTask;
}

export function addTask(content, containerSelector, category) {
    if (content.trim() !== '') {
        const id = 'task-' + Date.now();
        const newTaskElement = createTaskElement(id, content.trim());
        document.querySelector(containerSelector).appendChild(newTaskElement);
        
        const tasks = loadTasksFromStorage(category);
        tasks.push({ id: id, content: content.trim(), category: category });
        saveTasks(tasks, category);
    }
}

export function renderTasks() {
    const categories = ['tache-a-faire', 'tache-en-cours', 'tache-accomplie'];
    categories.forEach(category => {
        const containerSelector = `.droppable[data-category="${category}"]`;
        const tasks = loadTasksFromStorage(category);
        tasks.forEach(task => {
            const newTaskElement = createTaskElement(task.id, task.content, category);
            document.querySelector(containerSelector).appendChild(newTaskElement);
        });
    });
}