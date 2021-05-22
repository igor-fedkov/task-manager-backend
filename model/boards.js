const ObjectSchema = require('./schemas/board')

const create = async (board) => {
  return await ObjectSchema.create(board)
}

const getAll = async () => {
  return await ObjectSchema.find({ active: true })
}

const getById = async (id) => {
  return await ObjectSchema.findOne({ _id: id, active: true })
}

const remove = async (id) => {
  return await ObjectSchema.findByIdAndUpdate({ _id: id }, { active: false }, { new: true })
}

module.exports = {
  create,
  getAll,
  getById,
  remove
}
