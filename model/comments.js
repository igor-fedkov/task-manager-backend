const ObjectSchema = require('./schemas/comment')

const create = async (comment) => {
  const newComment = await ObjectSchema.create(comment)
  return ObjectSchema
    .findOne({ _id: newComment.id })
    .populate({
      path: 'owner',
      select: 'email -_id'
    })
}

const getBoardComments = async (cardsIds) => {
  return await ObjectSchema
    .find({ cardId: { $in: [...cardsIds] } })
    .populate({
      path: 'owner',
      select: 'email -_id'
    })
}

module.exports = {
  create,
  getBoardComments,
}
