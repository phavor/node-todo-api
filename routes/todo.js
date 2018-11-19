const express = require('express')

const router = express.Router()

const todoController = require('../controllers/todo')

router.post('/new_todo', todoController.new_todo)
router.get('/', todoController.get_all_todos)
router.get('/:id', todoController.get_todo)
router.patch('/:id', todoController.update_todo)
router.delete('/:id', todoController.delete_todo)

module.exports = router