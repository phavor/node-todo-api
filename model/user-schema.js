const mongoose = require('mongoose')
const validator = require('validator')
const jwt = require('jsonwebtoken')
const _ = require('lodash')
const bcrypt = require('bcrypt')

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    minlength: 8,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: '{VALUE} is not a valid email'
    }
  },
  username: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  tokens: [{
    access: {
      type: String,
      required: true
    },
    token: {
      type: String,
      required: true
    }
  }]
})

UserSchema.methods.generateAuthToken = function () {
  let user = this
  let access = 'auth'
  let token = jwt.sign({ _id: user._id.toHexString(), access }, 'process.env.SECRET_KEY').toString()

  user.tokens.push({ access, token })
  return user.save().then(() => token)
}

UserSchema.methods.toJSON = function () {
  let user = this
  let userObject = user.toObject()

  return _.pick(userObject, ['_id', 'email', 'username'])
}

UserSchema.statics.findByToken = function (token) {
  let User = this 
  let decoded;

  try {
    decoded = jwt.verify(token, 'process.env.SECRET_KEY')
  } catch (error) {
    return Promise.reject(error)
  }

  return User.findOne({
    _id: decoded._id,
    'tokens.token': token,
    'tokens.access': 'auth'
  })
}

UserSchema.statics.findByCredentials = function (username, password) {
  let User = this 

  return User.findOne({ username })
    .then(user => {
      if (!user) {
        return Promise.reject()
      }

      return new Promise((resolve, reject) => {
        bcrypt.compare(password, user.password, (err, res) => {
          if (res) {
            resolve(user)
          } else {
            reject()
          }
        })
      })
    })
}

UserSchema.pre('save', function (next) {
  let user = this

  if (user.isModified('password')) {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, (err, hash) => {
        user.password = hash
        next()
      })
    })
  } else {
    next()
  }
})

const User = mongoose.model('Users', UserSchema)

module.exports = User