import { addTask, renderTasks } from './modules/tasks.js';
import { setupDragAndDrop } from './modules/dragAndDrop.js';
import { saveTasks } from './modules/storage.js'; // добавлен импорт loadTasks и saveTasks

document.addEventListener('DOMContentLoaded', () => {
    renderTasks(); 
    
    const inputField = document.querySelector('.input-section .task-input');
    const addTaskButton = document.getElementById('addTaskButton');
    const deleteTaskButton = document.getElementById('deleteTaskButton'); // добавлена переменная для кнопки удаления задач

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

    deleteTaskButton.addEventListener('click', () => { // добавлен обработчик события для кнопки удаления задач
        const categories = ['tache-a-faire', 'tache-en-cours', 'tache-accomplie'];
        categories.forEach(category => {
            saveTasks([], category); // очищаем хранилище для каждой категории задач
            const container = document.querySelector(`.droppable[data-category="${category}"]`);
            container.innerHTML = ''; // очищаем контейнер в интерфейсе
        });
    });

    setupDragAndDrop();
});