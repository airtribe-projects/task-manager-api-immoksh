const tasks = require('../models/tasksModels');

const getTasks = (req, res) => {
    res.json(tasks);
};

const getTaskById = (req, res) => {
    const task = tasks.find(task => task.id === parseInt(req.params.id));
    if (!task) {
        return res.status(404).json({ message: 'Task not found' });
    }
    res.json(task);
};

const createTask = (req, res) => {
    const { title, description, completed } = req.body;
    if (typeof title !== 'string' || typeof description !== 'string' || typeof completed !== 'boolean') {
        return res.status(400).json({ message: 'Invalid data types: title and description must be strings, completed must be a boolean' });
    }
    
    const newTask = {
        id: tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) + 1 : 1,
        title,
        description,
        completed
    };
    tasks.push(newTask);
    res.status(201).send(newTask);
};

const updateTask = (req, res) => {
    const task = tasks.find(task => task.id === parseInt(req.params.id));
    if (!task) {
        return res.status(404).json({ message: 'Task not found' });
    }

    const { title, description, completed } = req.body;    
    if (typeof title !== 'string' || typeof description !== 'string' || typeof completed !== 'boolean') {
        return res.status(400).json({ message: 'Invalid data types: title and description must be strings, completed must be a boolean' });
    }
    
    task.completed = completed;
    task.title = title;
    task.description = description;
    res.json(task);
};

const deleteTask = (req, res) => {
    const task = tasks.find(task => task.id === parseInt(req.params.id));
    if (!task) {
        return res.status(404).json({ message: 'Task not found' });
    }
    tasks.splice(tasks.indexOf(task), 1);
    res.json({ message: 'Task deleted' });
};

module.exports = {
    getTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTask,
};