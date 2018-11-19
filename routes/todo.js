const express = require('express')

const router = express.Router()

const todoController = require('../controllers/todo')

router.post('/new_todo', todoController.new_todo)

module.exports = router