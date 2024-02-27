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
            
            // Сохраняем старый индекс задачи
            const oldIndexElement = draggableElement.querySelector('.task-index');
            const oldIndex = oldIndexElement ? oldIndexElement.textContent.replace('. ', '') : null;
            
            // Если не существует индекса, прерываем функцию
            if (!oldIndex) return;

            dropzone.appendChild(draggableElement);
            draggableElement.setAttribute('data-category', newCategory);
            
            let oldTasks = loadTasks(oldCategory);
            oldTasks = oldTasks.filter(task => task.id !== id);
            saveTasks(oldTasks, oldCategory);
            
            const newTasks = loadTasks(newCategory);
            const taskContentElement = draggableElement.querySelector('span:nth-child(2)');
            const taskContent = taskContentElement ? taskContentElement.textContent.trim() : '';
            const taskData = { 
                id, 
                content: taskContent,
                category: newCategory,
                index: parseInt(oldIndex, 10) // Используем старый индекс
            };

            // Убедимся, что index является числом
            if (!isNaN(taskData.index)) {
                newTasks.push(taskData);
                saveTasks(newTasks, newCategory);

                updateTaskIndexes(oldCategory);
                updateTaskIndexes(newCategory);
            }
        }
    }

    // Назначаем обработчики событий для задач
    const tasks = document.querySelectorAll('.task');
    tasks.forEach(task => {
        task.addEventListener('dragstart', handleDragStart);
    });

    // Назначаем обработчики событий для dropzones
    const todoLists = document.querySelectorAll('.droppable');
    todoLists.forEach((list) => {
        list.addEventListener('dragover', handleDragOver);
        list.addEventListener('drop', handleDrop);
    });
}

