const ObjectSchema = require('./schemas/list')

const create = async (list) => {
  return await ObjectSchema.create(list)
}

const getById = async (id) => {
  return await ObjectSchema.findOne({ _id: id, active: true })
}

const getBoardLists = async (boardId) => {
  return await ObjectSchema.find({ boardId })
}

const rename = async (id, title) => {
  return await ObjectSchema.findByIdAndUpdate({ _id: id, active: true }, { title }, { new: true })
}

const remove = async (id) => {
  return await ObjectSchema.findByIdAndUpdate({ _id: id }, { active: false }, { new: true })
}

module.exports = {
  create,
  getById,
  getBoardLists,
  rename,
  remove
}
