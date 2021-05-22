const express = require('express')
const router = express.Router()

const validate = require('./validation-user')
const ctrlUsers = require('../../controller/users')
const guard = require('../../helpers/guard')

router.post('/signup', validate.signup, ctrlUsers.signup)

router.post('/login', validate.login, ctrlUsers.login)

router.post('/logout', guard, ctrlUsers.logout)

router.get('/current', guard, ctrlUsers.getCurrentUser)

module.exports = router
