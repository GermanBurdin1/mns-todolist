//code optionel 

document.addEventListener('DOMContentLoaded', () => {
    const inputField = document.querySelector('.input-section .task-input');
    const addTaskButton = document.getElementById('addTaskButton');
    const todoLists = document.querySelectorAll('.droppable');

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
            dropzone.appendChild(draggableElement);
            saveTasks(); // Save tasks to localStorage after dropping
        }
    }

    todoLists.forEach((list) => {
        list.addEventListener('dragover', handleDragOver);
        list.addEventListener('drop', handleDrop);
    });

    function createTaskElement(id, content) {
        const newTask = document.createElement('div');
        newTask.id = id;
        newTask.draggable = true;
        newTask.addEventListener('dragstart', handleDragStart);

        const deleteIcon = document.createElement('i');
        const moveUpIcon = document.createElement('i');
        const moveDownIcon = document.createElement('i');

        deleteIcon.classList.add('fas', 'fa-trash');
        deleteIcon.addEventListener('click', () => {
            newTask.remove();
            saveTasks(); // Update localStorage after a task is removed
        });

        moveUpIcon.classList.add('fas', 'fa-arrow-up');
        moveUpIcon.addEventListener('click', () => {
            const prevTask = newTask.previousElementSibling;
            if (prevTask) {
                prevTask.parentNode.insertBefore(newTask, prevTask);
                saveTasks(); // Save tasks to localStorage after moving
            }
        });

        moveDownIcon.classList.add('fas', 'fa-arrow-down');
        moveDownIcon.addEventListener('click', () => {
            const nextTask = newTask.nextElementSibling;
            if (nextTask) {
                nextTask.parentNode.insertBefore(nextTask, newTask);
                saveTasks(); // Save tasks to localStorage after moving
            }
        });

        const taskContent = document.createElement('span');
        taskContent.textContent = content;

        newTask.appendChild(taskContent);
        newTask.appendChild(deleteIcon);
        newTask.appendChild(moveUpIcon);
        newTask.appendChild(moveDownIcon);

        return newTask;
    }

    function addTask() {
        if (inputField.value.trim() !== '') {
            const id = 'task-' + Date.now();
            const content = inputField.value.trim();
            const newTaskElement = createTaskElement(id, content);

            document.querySelector('.todo.todo3 .droppable').appendChild(newTaskElement);
            saveTasks(); // Save tasks to localStorage after adding a new one
            inputField.value = '';
        }
    }

    function saveTasks() {
        const tasks = [];
        document.querySelectorAll('.droppable div').forEach(taskElement => {
            const id = taskElement.id;
            const content = taskElement.querySelector('span').textContent;
            tasks.push({ id, content });
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(task => {
            const newTaskElement = createTaskElement(task.id, task.content);
            document.querySelector('.todo.todo3 .droppable').appendChild(newTaskElement);
        });
    }

    inputField.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTask();
        }
    });

    addTaskButton.addEventListener('click', addTask);

    loadTasks(); // Load tasks from localStorage on page load
});

  