const ObjectSchema = require('./schemas/action')

const create = async (action) => {
  const newAction = await ObjectSchema.create(action)
  return ObjectSchema
    .findOne({ _id: newAction.id })
    .populate({
      path: 'owner',
      select: 'email -_id'
    })
}

const getBoardActions = async (objectsIds) => {
  return await ObjectSchema
    .find({ objId: { $in: [...objectsIds] } })
    .populate({
      path: 'owner',
      select: 'email -_id'
    })
}

module.exports = {
  create,
  getBoardActions,
}
