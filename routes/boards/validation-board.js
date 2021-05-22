const joi = require('joi')
joi.objectId = require('joi-objectid')(joi)

const { HttpCodes } = require('../../helpers/constants')

const schemaCreateBoard = joi.object({
  title: joi.string()
    .min(1)
    .max(255)
    .required(),
  owner: joi.string(),
  lists: joi.array(),
  actions: joi.array(),
  active: joi.bool().default(true)
})

const schemaAddAction = joi.object({
  actionId: joi.objectId().required()
})

const schemaAddList = joi.object({
  listId: joi.objectId().required()
})

const validate = async (schema, obj, next) => {
  try {
    await schema.validateAsync(obj)
    return next()
  } catch (err) {
    next({
      status: HttpCodes.BAD_REQUEST,
      message: err.message.replace(/"/g, "'")
    })
  }
}

module.exports = {
  create: async (req, res, next) => {
    return await validate(schemaCreateBoard, req.body, next)
  },
  addAction: async (req, res, next) => {
    return await validate(schemaAddAction, req.body, next)
  },
  addList: async (req, res, next) => {
    return await validate(schemaAddList, req.body, next)
  },
}
