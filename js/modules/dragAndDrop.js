import { saveTasks, loadTasks } from './storage.js';
import { updateTaskIndexes } from './tasks.js';

export function setupDragAndDrop() {
    function handleDragStart(e) {
        e.dataTransfer.setData('text/plain', e.target.id);
        e.dataTransfer.effectAllowed = 'move';
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
        if (dropzone && draggableElement) {
            const oldCategory = draggableElement.getAttribute('data-category');
            const newCategory = dropzone.getAttribute('data-category');
            
            dropzone.appendChild(draggableElement);
            draggableElement.setAttribute('data-category', newCategory);
            
            let oldTasks = loadTasks(oldCategory);
            oldTasks = oldTasks.filter(task => task.id !== id);
            saveTasks(oldTasks, oldCategory);
            
            const newTasks = loadTasks(newCategory);
            const taskContentElement = draggableElement.querySelector('.task-content');
            const taskContent = taskContentElement ? taskContentElement.textContent.trim() : '';
            // Получаем индекс из текста элемента, но не изменяем его
            const oldIndex = draggableElement.querySelector('.task-index').textContent.split('.')[0];
            const taskData = { 
                id, 
                content: taskContent,
                category: newCategory,
                index: parseInt(oldIndex) // Используем сохраненный индекс
            };

            newTasks.push(taskData);
            // Сортировать задачи в newTasks по индексу, если это необходимо
            saveTasks(newTasks, newCategory);
        }
    }


    const tasks = document.querySelectorAll('.task');
    tasks.forEach(task => {
        task.addEventListener('dragstart', handleDragStart);
    });

    const todoLists = document.querySelectorAll('.droppable');
    todoLists.forEach((list) => {
        list.addEventListener('dragover', handleDragOver);
        list.addEventListener('drop', handleDrop);
    });
}

