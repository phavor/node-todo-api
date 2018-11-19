const express = require('express')

const router = express.Router()

const userController = require('../controllers/user')
const auth = require('../middleware/auth')

router.post('/new_user', userController.new_user)
router.get('/users/me', auth, userController.user_me)
router.post('/users/login', userController.user_login)

module.exports = router