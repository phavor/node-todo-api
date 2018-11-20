const express = require('express')

const router = express.Router()

const todoController = require('../controllers/todo')
const auth = require('../middleware/auth')

router.post('/new_todo', auth, todoController.new_todo)
router.get('/', auth, todoController.get_all_todos)
router.get('/:id', auth, todoController.get_todo)
router.patch('/:id', auth, todoController.update_todo)
router.delete('/:id', auth, todoController.delete_todo)

module.exports = router