const express = require('express')
const logger = require('morgan')
const cors = require('cors')

require('dotenv').config()

const usersRouter = require('./routes/users')
const boardsRouter = require('./routes/boards')
const listsRouter = require('./routes/lists')
const cardsRouter = require('./routes/cards')
const commentsRouter = require('./routes/comments')
const actionsRouter = require('./routes/actions')

const app = express()

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())

app.use('/api/users', usersRouter)
app.use('/api/boards', boardsRouter)
app.use('/api/lists', listsRouter)
app.use('/api/cards', cardsRouter)
app.use('/api/comments', commentsRouter)
app.use('/api/actions', actionsRouter)

app.use((_req, res) => {
  res.status(404).json({ message: 'Not found' })
})

app.use((err, req, res, next) => {
  const status = err.status || 500
  res.status(status).json({
    status: status === 500 ? 'fail' : 'error',
    code: status,
    message: err.message
  })
})

module.exports = app
