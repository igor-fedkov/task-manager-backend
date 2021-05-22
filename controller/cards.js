const Model = require('../model/cards')
const { HttpCodes } = require('../helpers/constants')

const create = async (req, res, next) => {
  const userId = req.user?.id
  const card = req.body
  try {
    const result = await Model.create({ ...card, owner: userId })
    return res.status(HttpCodes.CREATED).json({
      status: 'success',
      code: HttpCodes.CREATED,
      card: result,
    })
  } catch (err) {
    console.error(err)
    next(err)
  }
}

// ---------------------------------------------

const updateDescription = async (req, res, next) => {
  const { cardId } = req.params
  const { description } = req.body

  try {
    const result = await Model.updateDescription(cardId, description)
    if (result) {
      return res.status(HttpCodes.OK).json({
        status: 'success',
        code: HttpCodes.OK,
        card: result,
      })
    }

    return res.status(HttpCodes.NOT_FOUND).json({
      status: 'error',
      code: HttpCodes.NOT_FOUND,
      message: `Not found card id: ${cardId}`,
      data: 'Not Found',
    })
  } catch (err) {
    console.error(err)
    next(err)
  }
}

// ---------------------------------------------

const move = async (req, res, next) => {
  const { cardId } = req.params
  const { listId } = req.body

  try {
    const result = await Model.move(cardId, listId)
    if (result) {
      return res.status(HttpCodes.OK).json({
        status: 'success',
        code: HttpCodes.OK,
        card: result,
      })
    }

    return res.status(HttpCodes.NOT_FOUND).json({
      status: 'error',
      code: HttpCodes.NOT_FOUND,
      message: `Not found card id: ${cardId}`,
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
  const { cardId } = req.params

  try {
    const card = await Model.getById(cardId)

    if (!card) {
      return res.status(HttpCodes.NOT_FOUND).json({
        status: 'error',
        code: HttpCodes.NOT_FOUND,
        message: `Not found card id: ${cardId}`,
        data: 'Not Found',
      })
    }

    await Model.remove(cardId)

    return res.status(HttpCodes.NO_CONTENT).json({
      status: 'success',
      code: HttpCodes.NO_CONTENT,
      message: `Card id: ${cardId} removed`,
      data: 'Card removed',
    })
  } catch (err) {
    console.error(err)
    next(err)
  }
}

module.exports = {
  create,
  updateDescription,
  move,
  remove,
}
