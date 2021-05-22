const Model = require('../model/actions')
const { HttpCodes } = require('../helpers/constants')

const create = async (req, res, next) => {
  const userId = req.user?.id
  const action = req.body
  try {
    const result = await Model.create({ ...action, owner: userId })
    return res.status(HttpCodes.CREATED).json({
      status: 'success',
      code: HttpCodes.CREATED,
      action: result,
    })
  } catch (err) {
    console.error(err)
    next(err)
  }
}

module.exports = {
  create,
}
