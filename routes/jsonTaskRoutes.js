const express = require('express');
const router = express.Router();

const {
    createTask,
    getTasks,
    updateTask,
    deleteTask
} = require('../Controllers/jsonTaskController');


// CREATE
router.post('/', createTask);

// READ
router.get('/', getTasks);

// UPDATE
router.put('/:id', updateTask);

// DELETE
router.delete('/:id', deleteTask);

module.exports = router;
