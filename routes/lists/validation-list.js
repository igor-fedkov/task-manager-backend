const joi = require('joi')
joi.objectId = require('joi-objectid')(joi)

const { HttpCodes } = require('../../helpers/constants')

const schemaCreateList = joi.object({
  title: joi.string()
    .min(1)
    .max(255)
    .required(),
  owner: joi.string(),
  boardId: joi.objectId().required(),
  active: joi.bool().default(true)
})

const schemaRenameList = joi.object({
  title: joi.string()
    .min(1)
    .max(255)
    .required(),
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
    return await validate(schemaCreateList, req.body, next)
  },
  rename: async (req, res, next) => {
    return await validate(schemaRenameList, req.body, next)
  },
}
