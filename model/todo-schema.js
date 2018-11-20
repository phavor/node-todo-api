const mongoose = require('mongoose')
const moment = require('moment')

const todoSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
    minlength: 3,
    trim: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  completedAt: {
    type: Number,
    default: null
  },
  _creator: {
    required: true,
    type: mongoose.Schema.Types.ObjectId
  }
})

const Todo = mongoose.model('Todo', todoSchema)

module.exports = Todo