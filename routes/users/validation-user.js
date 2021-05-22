const joi = require('joi')

const { HttpCodes } = require('../../helpers/constants')

const schemaSignup = joi.object({
  password: joi.string()
    .min(4)
    .max(20)
    .required(),
  email: joi.string()
    .email({ ignoreLength: true })
    .required(),
  token: joi.string()
    .default(null),
})

const schemaLogin = joi.object({
  password: joi.string()
    .required(),
  email: joi.string()
    .required(),
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
  signup: async (req, res, next) => {
    return await validate(schemaSignup, req.body, next)
  },
  login: async (req, res, next) => {
    return await validate(schemaLogin, req.body, next)
  },
}
