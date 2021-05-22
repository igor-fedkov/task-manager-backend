const express = require('express')
const router = express.Router()

const validate = require('./validation-list')
const ctrlLists = require('../../controller/lists')

const guard = require('../../helpers/guard')

// router.get('/', guard, ctrlLists.getAll)

router.post('/', guard, validate.create, (req, res, next) => ctrlLists.create(req, res, next))

// router.get('/:listId', guard, ctrlLists.getById)

router.patch('/:listId', guard, validate.rename, ctrlLists.rename)

router.delete('/:listId', guard, ctrlLists.remove)

module.exports = router
