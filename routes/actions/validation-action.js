const joi = require('joi')

const { actionsTypes } = require('../../helpers/constants')
const { HttpCodes } = require('../../helpers/constants')

const schemaCreateAction = joi.object({
  owner: joi.string(),
  actionType: joi.any()
    .valid(...Object.values(actionsTypes))
    .required(),
  objId: joi.objectId().required(),
  endPointId: joi.string().default(''),
})

const validate = async (schema, obj, next) => {
  try {
    await schema.validateAsync(obj)
    return next()
  } catch (err) {
    next({
      status: HttpCodes.BAD_REQUEST,
      message: err.message.replace(/"/g, "'"),
      data: err.message.replace(/"/g, "'")
    })
  }
}

module.exports = {
  create: async (req, res, next) => {
    return await validate(schemaCreateAction, req.body, next)
  },
}
