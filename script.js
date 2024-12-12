document.querySelectorAll('.quadrant').forEach(quadrant => {
    const input = quadrant.querySelector('input');
    const button = quadrant.querySelector('button');
    const taskList = quadrant.querySelector('.task-list');
    const quadrantId = quadrant.id;

    // Load tasks from localStorage
    const loadTasks = () => {
        const tasks = JSON.parse(localStorage.getItem(quadrantId)) || [];
        tasks.forEach(taskData => {
            const task = document.createElement('div');
            task.className = 'task';
            if (taskData.done) task.classList.add('done'); // Add "done" class if needed
            task.innerHTML = `
                <span>${taskData.text}</span>
                <div>
                    <button class="done-button">✔</button>
                    <button>&times;</button>
                </div>
            `;

            // Event listeners for buttons
            task.querySelector('.done-button').addEventListener('click', () => {
                task.classList.toggle('done');
                saveTasks(); // Save updated state
            });

            task.querySelector('button:last-child').addEventListener('click', () => {
                task.remove();
                saveTasks(); // Save updated list
            });

            taskList.appendChild(task);
        });
    };

    // Save tasks to localStorage
    const saveTasks = () => {
        const tasks = [];
        taskList.querySelectorAll('.task').forEach(task => {
            tasks.push({
                text: task.querySelector('span').textContent,
                done: task.classList.contains('done'), // Save "done" status
            });
        });
        localStorage.setItem(quadrantId, JSON.stringify(tasks));
    };

    // Add new task
    button.addEventListener('click', () => {
        if (input.value.trim()) {
            const task = document.createElement('div');
            task.className = 'task';
            task.innerHTML = `
                <span>${input.value}</span>
                <div>
                    <button class="done-button">✔</button>
                    <button>&times;</button>
                </div>
            `;

            // Event listeners for buttons
            task.querySelector('.done-button').addEventListener('click', () => {
                task.classList.toggle('done');
                saveTasks(); // Save updated state
            });

            task.querySelector('button:last-child').addEventListener('click', () => {
                task.remove();
                saveTasks(); // Save updated list
            });

            taskList.appendChild(task);
            input.value = '';
            saveTasks(); // Save new task
        }
    });

    // Load tasks on page load
    loadTasks();
});
