const mongoose = require('mongoose')
const Todo = require('../model/todo-schema')

module.exports = {
  new_todo (req, res) {
    res.send('A post request to create a new Todo')
  }
}