const joi = require('joi')
joi.objectId = require('joi-objectid')(joi)

const { HttpCodes } = require('../../helpers/constants')

const schemaCreateCard = joi.object({
  title: joi.string()
    .min(1)
    .max(255)
    .required(),
  listId: joi.objectId().required(),
  description: joi.string().min(1),
  owner: joi.string(),
  active: joi.bool().default(true)
})

const schemaUpdateDescription = joi.object({
  description: joi.string()
    .min(1)
    .required(),
})

const schemaMoveCard = joi.object({
  listId: joi.objectId().required(),
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
    return await validate(schemaCreateCard, req.body, next)
  },
  updateDescription: async (req, res, next) => {
    return await validate(schemaUpdateDescription, req.body, next)
  },
  move: async (req, res, next) => {
    return await validate(schemaMoveCard, req.body, next)
  },
}
