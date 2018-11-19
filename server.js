const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

// mongoose.Promise = global.Promise

const app = express()
const todoRoutes = require('./routes/todo')
const userRoutes = require('./routes/user')
const port = process.env.PORT || 3000
const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/TodoApp' 

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// connect to database
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true
})
  .then(() => console.log('Connected to database...'))
  .catch(err => console.log('Opppsss... could not connect to database', err))

app.use('/todos', todoRoutes)
app.use('/', userRoutes)

app.listen(port, () => console.log(`server running on port ${port}`))

module.exports = app