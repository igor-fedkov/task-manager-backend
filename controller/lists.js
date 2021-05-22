const Model = require('../model/lists')
const { HttpCodes } = require('../helpers/constants')

const create = async (req, res, next) => {
  const userId = req.user?.id
  const list = req.body
  try {
    const result = await Model.create({ ...list, owner: userId })
    return res.status(HttpCodes.CREATED).json({
      status: 'success',
      code: HttpCodes.CREATED,
      list: result,
    })
  } catch (err) {
    console.error(err)
    next(err)
  }
}

// ---------------------------------------------

const rename = async (req, res, next) => {
  // const userId = req.user.id
  const { listId } = req.params
  const { title } = req.body

  try {
    const list = await Model.getById(listId)

    if (!list) {
      return res.status(HttpCodes.NOT_FOUND).json({
        status: 'error',
        code: HttpCodes.NOT_FOUND,
        message: `Not found list id: ${listId}`,
        data: 'Not Found',
      })
    }

    const result = await Model.rename(listId, title)
    if (result) {
      return res.status(HttpCodes.OK).json({
        status: 'success',
        code: HttpCodes.OK,
        list: result,
      })
    }

    return res.status(HttpCodes.NOT_FOUND).json({
      status: 'error',
      code: HttpCodes.NOT_FOUND,
      message: `Not found list id: ${listId}`,
      data: 'Not Found',
    })
  } catch (err) {
    console.error(err)
    next(err)
  }
}

// ---------------------------------------------

const remove = async (req, res, next) => {
  // const userId = req.user?.id
  const { listId } = req.params

  try {
    const list = await Model.getById(listId)

    if (!list) {
      return res.status(HttpCodes.NOT_FOUND).json({
        status: 'error',
        code: HttpCodes.NOT_FOUND,
        message: `Not found list id: ${listId}`,
        data: 'Not Found',
      })
    }

    await Model.remove(listId)

    return res.status(HttpCodes.NO_CONTENT).json({
      status: 'success',
      code: HttpCodes.NO_CONTENT,
      message: `List id: ${listId} removed`,
      data: 'List removed',
    })
  } catch (err) {
    console.error(err)
    next(err)
  }
}

module.exports = {
  create,
  rename,
  remove,
}
