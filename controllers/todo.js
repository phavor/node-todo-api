const mongoose = require('mongoose')
const Todo = require('../model/todo-schema')

module.exports = {
  new_todo (req, res) {
    let todo = new Todo({
      text: req.body.text,
      completed: req.body.completed,
      completedAt: req.body.completedAt
    })

    todo.save()
      .then(doc => {
        res.status(201).send(doc)
      })
      .catch(err => {
        res.status(500)
        .json({
          message: 'Could not save todo',
          error: err.message
        })
      })
  },

  get_todo (req, res) {
    Todo.find()
      .select('-__v')
      .then(doc => {
        res.status(200).send(doc)
      })
      .catch(err => {
        res.status(400).send(err.message)
      })
  }
}