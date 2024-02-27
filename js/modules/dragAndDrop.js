import { saveTasks,loadTasks } from './storage.js';

export function setupDragAndDrop() {
    function handleDragStart(e) {
        e.dataTransfer.setData('text/plain', e.target.id);
    }

    function handleDragOver(e) {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
    }

    function handleDrop(e) {
        e.preventDefault();
        const id = e.dataTransfer.getData('text');
        const draggableElement = document.getElementById(id);
        const dropzone = e.target.closest('.droppable');
        if (dropzone) {
            const oldCategory = draggableElement.getAttribute('data-category');
            const newCategory = dropzone.getAttribute('data-category');
            
            dropzone.appendChild(draggableElement);
    
            draggableElement.setAttribute('data-category', newCategory);
            
            let oldTasks = loadTasks(oldCategory);
            oldTasks = oldTasks.filter(task => task.id !== id);
            saveTasks(oldTasks, oldCategory);
            
            const newTasks = loadTasks(newCategory);
            const taskData = { id, content: draggableElement.textContent.trim(), category: newCategory };
            newTasks.push(taskData);
            saveTasks(newTasks, newCategory);
        }
    }

    const todoLists = document.querySelectorAll('.droppable');
    todoLists.forEach((list) => {
        list.addEventListener('dragover', handleDragOver);
        list.addEventListener('drop', handleDrop);
    });}
