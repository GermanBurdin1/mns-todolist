import { addTask, renderTasks } from './modules/tasks.js';
import { setupDragAndDrop } from './modules/dragAndDrop.js';

document.addEventListener('DOMContentLoaded', () => {
    renderTasks('.todo3 .droppable'); 
    
    const inputField = document.querySelector('.input-section .task-input');
    const addTaskButton = document.getElementById('addTaskButton');

    inputField.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTask(inputField.value, '.todo3 .droppable'); 
            inputField.value = '';
        }
    });

    addTaskButton.addEventListener('click', () => {
        addTask(inputField.value, '.todo3 .droppable'); 
        inputField.value = '';
    });

    setupDragAndDrop();
});