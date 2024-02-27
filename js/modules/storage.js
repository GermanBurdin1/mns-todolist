export function saveTasks(tasks, category) {
    if (!Array.isArray(tasks)) {
        throw new Error('saveTasks: provided tasks is not an array');
    }

    localStorage.setItem('tasks_' + category, JSON.stringify(tasks));
}

export function loadTasks(category) {
    let tasksJson = localStorage.getItem('tasks_' + category); 
    if (!tasksJson || tasksJson === "undefined") {
        return [];
    }
    try {
        let tasks = JSON.parse(tasksJson);
        return Array.isArray(tasks) ? tasks : [];
    } catch (e) {
        console.error('Error parsing tasks from localStorage:', e);
        return [];
    }
}