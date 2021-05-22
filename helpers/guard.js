const passport = require('passport')
const jwt = require('jsonwebtoken')
const { HttpCodes } = require('./constants')

require('dotenv').config()
require('../config/passport')

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY

const guard = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user) => {
    let token = null
    let verify = null
    if (req.get('Authorization')) {
      token = req.get('Authorization').split(' ')[1]
      verify = jwt.verify(token, JWT_SECRET_KEY)
    }

    if (!user || err || !verify || token !== user.token) {
      return res.status(HttpCodes.UNAUTORIZED).json({
        status: 'error',
        code: HttpCodes.UNAUTORIZED,
        message: 'Not authorized',
        data: 'Not authorized',
      })
    }
    req.user = user
    return next()
  })(req, res, next)
}

module.exports = guard
