const fs = require('fs').promises;
const path = require('path');

const filePath = path.join(__dirname, '../data/tasks.json');

// READ JSON FILE
const readTasks = async () => {
    const data = await fs.readFile(filePath, 'utf8');
    return JSON.parse(data);
};

// WRITE JSON FILE
const writeTasks = async (tasks) => {
    await fs.writeFile(filePath, JSON.stringify(tasks, null, 4));
};

// CREATE TASK
exports.createTask = async (req, res) => {
    try {
        const tasks = await readTasks();

        const newTask = {
            id: Date.now().toString(),
            title: req.body.title,
            description: req.body.description || '',
            completed: false
        };

        if (!newTask.title) {
            return res.status(400).json({
                message: 'Title is required'
            });
        }

        tasks.push(newTask);
        await writeTasks(tasks);

        res.status(201).json(newTask);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// GET ALL TASKS
exports.getTasks = async (req, res) => {
    try {
        const tasks = await readTasks();
        res.status(200).json(tasks);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// UPDATE TASK
exports.updateTask = async (req, res) => {
    try {
        const tasks = await readTasks();

        const index = tasks.findIndex(
            task => task.id === req.params.id
        );

        if (index === -1) {
            return res.status(404).json({
                message: 'Task not found'
            });
        }

        tasks[index] = {
            ...tasks[index],
            ...req.body,
            id: tasks[index].id
        };

        await writeTasks(tasks);

        res.status(200).json(tasks[index]);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// DELETE TASK
exports.deleteTask = async (req, res) => {
    try {
        const tasks = await readTasks();

        const updatedTasks = tasks.filter(
            task => task.id !== req.params.id
        );

        if (tasks.length === updatedTasks.length) {
            return res.status(404).json({
                message: 'Task not found'
            });
        }

        await writeTasks(updatedTasks);

        res.status(200).json({
            message: 'Task deleted successfully'
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};