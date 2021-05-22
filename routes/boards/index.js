const express = require('express')
const router = express.Router()

const validate = require('./validation-board')
const ctrlBoards = require('../../controller/boards')

const guard = require('../../helpers/guard')

router.post('/', guard, validate.create, (req, res, next) => ctrlBoards.create(req, res, next))

router.get('/', guard, ctrlBoards.getAll)

router.get('/:boardId', guard, ctrlBoards.getById)

router.delete('/:boardId', guard, ctrlBoards.remove)

module.exports = router
