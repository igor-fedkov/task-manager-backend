const ObjectSchema = require('./schemas/user')

const create = async (userFields) => {
  const user = new ObjectSchema(userFields)
  return await ObjectSchema.create(user)
}

const findById = async (id) => {
  return await ObjectSchema.findOne({ _id: id })
}

const findByEmail = async (email) => {
  return await ObjectSchema.findOne({ email })
}

const updateToken = async (id, token) => {
  return await ObjectSchema.updateOne({ _id: id }, { token })
}

module.exports = {
  create,
  findById,
  findByEmail,
  updateToken,
}
