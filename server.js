const express = require('express')
const mongoose = require('mongoose')

// mongoose.Promise = global.Promise

const app = express()
const todoRoutes = require('./routes/todo')

// connect to database
mongoose.connect('mongodb://localhost:27017/TodoApp', {
  useNewUrlParser: true,
  useCreateIndex: true
})
  .then(() => console.log('Connected to database...'))
  .catch(err => console.log('Opppsss... could not connect to database', err))

app.use('/todos', todoRoutes)

app.get('/', (req, res) => {
  res.send('hello world')
})

app.listen(3000, () => console.log('server running on port 3000'))