const express = require('express')
const router = express.Router()

const validate = require('./validation-action')
const ctrlCards = require('../../controller/actions')

const guard = require('../../helpers/guard')

router.post('/', guard, validate.create, (req, res, next) => ctrlCards.create(req, res, next))

module.exports = router
