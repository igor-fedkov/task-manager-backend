const Model = require('../model/comments')
const { HttpCodes } = require('../helpers/constants')

const create = async (req, res, next) => {
  const userId = req.user?.id
  const comment = req.body
  try {
    const result = await Model.create({ ...comment, owner: userId })
    return res.status(HttpCodes.CREATED).json({
      status: 'success',
      code: HttpCodes.CREATED,
      comment: result,
    })
  } catch (err) {
    console.error(err)
    next(err)
  }
}

module.exports = {
  create,
}
