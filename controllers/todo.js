const mongoose = require('mongoose')
const Todo = require('../model/todo-schema')

module.exports = {
  // create new todo
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

  // get all todos
  get_all_todos (req, res) {
    Todo.find()
      .select('-__v')
      .then(doc => {
        res.status(200).send(doc)
      })
      .catch(err => {
        res.status(400).send(err.message)
      })
  },

  // get todo by id
  get_todo (req, res) {
    const _id = req.params.id

    Todo.findById(_id)
      .select(' -__v')
      .then(doc => {
        res.status(200).send(doc)
      })
      .catch(err => {
        res.status(400).send(err.message)
      })
  },

  // update todo by id
  update_todo (req, res) {
    const id = req.params.id

    Todo.findByIdAndUpdate(id, {
      $set: {
        text: req.body.text,
        completed: req.body.completed
      }
    }, { new: true })
      .then(doc => {
        res.status(200).send(doc)
      })
      .catch(err => {
        res.status(400).send(err.message)
      })
  }
}