import { addTask, renderTasks } from './modules/tasks.js';
import { setupDragAndDrop } from './modules/dragAndDrop.js';

document.addEventListener('DOMContentLoaded', () => {
    renderTasks(); 
    
    const inputField = document.querySelector('.input-section .task-input');
    const addTaskButton = document.getElementById('addTaskButton');

    inputField.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTask(inputField.value, '.todo3 .droppable', 'tache-a-faire'); 
            inputField.value = '';
        }
    });

    addTaskButton.addEventListener('click', () => {
        addTask(inputField.value, '.todo3 .droppable', 'tache-a-faire'); 
        inputField.value = '';
    });

    setupDragAndDrop();
});
