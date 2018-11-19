const mongoose = require('mongoose')
const _ = require('lodash')
const User = require('../model/user-schema')

module.exports = {
  new_user (req, res) {
    const body = _.pick(req.body, ['email', 'username', 'password'])

    let user = new User(body)

    user.save()
      .then(userDoc => {
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
  }
}