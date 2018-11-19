const express = require('express')

const router = express.Router()

const userController = require('../controllers/user')

router.post('/new_user', userController.new_user)

module.exports = router