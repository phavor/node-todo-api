const express = require('express')

const router = express.Router()

const userController = require('../controllers/user')
const auth = require('../middleware/auth')

router.post('/new_user', userController.new_user)
router.post('/users/login', userController.user_login)
router.get('/users/me', auth, userController.user_me)
router.delete('/users/me/token', auth, userController.logout)

module.exports = router