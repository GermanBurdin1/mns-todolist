import { addTask, renderTasks } from './modules/tasks.js';
import { setupDragAndDrop } from './modules/dragAndDrop.js';
import { saveTasks } from './modules/storage.js'; 
document.addEventListener('DOMContentLoaded', () => {
    renderTasks(); 
    
    const inputField = document.querySelector('.input-section .task-input');
    const addTaskButton = document.getElementById('addTaskButton');
    const deleteTaskButton = document.getElementById('deleteTaskButton'); 

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

    deleteTaskButton.addEventListener('click', () => { 
        const categories = ['tache-a-faire', 'tache-en-cours', 'tache-accomplie'];
        categories.forEach(category => {
            saveTasks([], category); 
            const container = document.querySelector(`.droppable[data-category="${category}"]`);
            container.innerHTML = ''; 
        });
    });

    setupDragAndDrop();
});