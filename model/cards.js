const ObjectSchema = require('./schemas/card')

const create = async (card) => {
  return await ObjectSchema.create(card)
}

const getById = async (id) => {
  return await ObjectSchema.findOne({ _id: id, active: true })
}

const getBoardCards = async (listsIds) => {
  return await ObjectSchema.find({ listId: { $in: [...listsIds] } })
}

const updateDescription = async (id, description) => {
  return await ObjectSchema.findByIdAndUpdate({ _id: id, active: true }, { description }, { new: true })
}

const move = async (id, listId) => {
  return await ObjectSchema.findByIdAndUpdate({ _id: id, active: true }, { listId }, { new: true })
}

const remove = async (id) => {
  return await ObjectSchema.findByIdAndUpdate({ _id: id }, { active: false }, { new: true })
}

module.exports = {
  create,
  getById,
  getBoardCards,
  updateDescription,
  move,
  remove
}
