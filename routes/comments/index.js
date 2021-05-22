const express = require('express')
const router = express.Router()

const validate = require('./validation-comment')
const ctrlComments = require('../../controller/comments')

const guard = require('../../helpers/guard')

router.post('/', guard, validate.create, (req, res, next) => ctrlComments.create(req, res, next))

module.exports = router
