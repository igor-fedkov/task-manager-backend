const express = require('express')
const router = express.Router()

const validate = require('./validation-card')
const ctrlCards = require('../../controller/cards')

const guard = require('../../helpers/guard')

router.post('/', guard, validate.create, (req, res, next) => ctrlCards.create(req, res, next))

// router.get('/:cardId', guard, ctrlCards.getById)

router.patch('/:cardId', guard, validate.move, (req, res, next) => ctrlCards.move(req, res, next))

router.patch('/:cardId/description', guard, validate.updateDescription, (req, res, next) => ctrlCards.updateDescription(req, res, next))

router.delete('/:cardId', guard, ctrlCards.remove)

module.exports = router
