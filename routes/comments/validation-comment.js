const joi = require('joi')

const { HttpCodes } = require('../../helpers/constants')

const schemaCreateComment = joi.object({
  text: joi.string()
    .min(1)
    .required(),
  owner: joi.string(),
  cardId: joi.objectId().required(),
  actions: joi.array(),
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
    return await validate(schemaCreateComment, req.body, next)
  },
}
