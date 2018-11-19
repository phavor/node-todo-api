const mongoose = require('mongoose')
const User = require('../model/user-schema')

module.exports = {
  new_user (req, res) {
    let user = new User({
      email: req.body.email,
      username: req.body.username
    })

    user.save()
      .then(doc => {
        res.send(doc)
      })
      .catch(err => {
        res.status(500)
        .json({
          message: 'Could not save user',
          error: err.message
        })
      })
  }
}