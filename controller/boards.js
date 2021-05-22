const Model = require('../model/boards')
const ModelList = require('../model/lists')
const ModelCards = require('../model/cards')
const ModelComments = require('../model/comments')
const ModelActions = require('../model/actions')

const { HttpCodes } = require('../helpers/constants')

const create = async (req, res, next) => {
  const userId = req.user?.id
  const board = req.body
  console.log('board', board)
  try {
    console.log({ ...board, owner: userId })
    const result = await Model.create({ ...board, owner: userId })
    return res.status(HttpCodes.CREATED).json({
      status: 'success',
      code: HttpCodes.CREATED,
      board: result,
    })
  } catch (err) {
    console.error(err)
    next(err)
  }
}

// ---------------------------------------------

const getAll = async (req, res, next) => {
  try {
    const boards = await Model.getAll()

    return res.status(HttpCodes.OK).json({
      status: 'success',
      code: HttpCodes.OK,
      boards,
    })
  } catch (err) {
    console.error(err)
    next(err)
  }
}

// ---------------------------------------------

const getById = async (req, res, next) => {
  const { boardId } = req.params

  try {
    const board = await Model.getById(boardId)
    const objectsIds = []
    let lists = []
    let cards = []
    let comments = []
    let actions = []
    let Ids = []

    objectsIds.push(boardId)

    lists = await ModelList.getBoardLists(boardId)
    Ids = lists.reduce((acc, value) => {
      acc.push(value.id.toString())
      return acc
    }, [])
    objectsIds.push(...Ids)

    cards = await ModelCards.getBoardCards(Ids)
    Ids = cards.reduce((acc, value) => {
      acc.push(value.id.toString())
      return acc
    }, [])
    objectsIds.push(...Ids)

    comments = await ModelComments.getBoardComments(Ids)
    Ids = comments.reduce((acc, value) => {
      acc.push(value.id.toString())
      return acc
    }, [])
    objectsIds.push(...Ids)

    actions = await ModelActions.getBoardActions(objectsIds)

    if (board) {
      return res.status(HttpCodes.OK).json({
        status: 'success',
        code: HttpCodes.OK,
        board,
        lists,
        cards,
        comments,
        actions
      })
    }
  } catch (err) {
    console.error(err)
    next(err)
  }
}

// ---------------------------------------------

const remove = async (req, res, next) => {
  // const userId = req.user?.id
  const { boardId } = req.params

  try {
    const board = await Model.getById(boardId)

    if (!board) {
      return res.status(HttpCodes.NOT_FOUND).json({
        status: 'error',
        code: HttpCodes.NOT_FOUND,
        message: `Not found board id: ${boardId}`,
        data: 'Not Found',
      })
    }

    await Model.remove(boardId)

    return res.status(HttpCodes.NO_CONTENT).json({
      status: 'success',
      code: HttpCodes.NO_CONTENT,
      message: `Board id: ${boardId} removed`,
      data: 'Board removed',
    })
  } catch (err) {
    console.error(err)
    next(err)
  }
}

module.exports = {
  getAll,
  getById,
  create,
  remove,
}
