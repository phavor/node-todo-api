const mongoose = require('mongoose')
const _ = require('lodash')
const User = require('../model/user-schema')

module.exports = {
  new_user (req, res) {
    const body = _.pick(req.body, ['email', 'username', 'password'])

    let user = new User(body)

    user.save()
      .then(user => {
        return user.generateAuthToken()
      })
      .then(token => {
        res.status(201)
          .header('x-auth', token)
          .send(user)
      })
      .catch(err => {
        res.status(400)
        .json({
          message: 'Could not save user',
          error: err.message
        })
      })
  },

  // login user
  user_login (req, res) {
    const body = _.pick(req.body, ['username', 'password'])

    User.findByCredentials(body.username, body.password)
      .then(user => {
        return user.generateAuthToken()
          .then(token => {
            res.status(200)
              .header('x-auth', token)
              .send(user)
          })
      })
      .catch(err => {
        res.status(400).send()
      })
  },

  // get a single person
  user_me (req, res) {
    res.send(req.user)
  },

  // logout a user
  logout (req, res) {
    req.user.removeToken(req.token)
      .then(() => {
        res.status(200).send('logged out')
      }, () => {
        res.status(400).send()
      })
  }
}