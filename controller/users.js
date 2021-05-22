const jwt = require('jsonwebtoken')

const Users = require('../model/users')
const { HttpCodes } = require('../helpers/constants')

require('dotenv').config()

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY

const signup = async (req, res, next) => {
  const { email } = req.body
  const user = await Users.findByEmail(email)
  if (user) {
    return res.status(HttpCodes.CONFLICT).json({
      status: 'error',
      code: HttpCodes.CONFLICT,
      message: 'Email in use',
      data: 'Email in use'
    })
  }

  try {
    await Users.create(req.body)
    return res.status(HttpCodes.CREATED).json({
      status: 'success',
      code: HttpCodes.CREATED,
      data: {
        user: {
          email,
        }
      },
    })
  } catch (err) {
    console.error(err)
    next(err)
  }
}

const login = async (req, res, next) => {
  const { email, password } = req.body
  const user = await Users.findByEmail(email)

  let isPasswordValid = false
  if (user) {
    isPasswordValid = await user.validPassword(password)
  }
  console.log('validpassword', isPasswordValid)

  if (user && isPasswordValid) {
    const payload = {
      id: user.id
    }

    try {
      const token = jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: '1w' })

      await Users.updateToken(user.id, token)

      return res.status(HttpCodes.OK).json({
        status: 'success',
        code: HttpCodes.OK,
        token,
        user: {
          id: user.id,
          email: user.email,
        }
      })
    } catch (err) {
      console.error(err)
      next(err)
    }
  }

  return res.status(HttpCodes.UNAUTORIZED).json({
    status: 'error',
    code: HttpCodes.UNAUTORIZED,
    message: 'Email or password is wrong',
    data: 'Email or password is wrong',
  })
}

const logout = async (req, res, next) => {
  const id = req.user.id
  const user = await Users.findById(id)

  if (user) {
    try {
      await Users.updateToken(id, null)
      return res.status(HttpCodes.NO_CONTENT).json({
        status: 'success',
        code: HttpCodes.NO_CONTENT
      })
    } catch (err) {
      console.error(err)
      next(err)
    }
  }

  return res.status(HttpCodes.UNAUTORIZED).json({
    status: 'error',
    code: HttpCodes.UNAUTORIZED,
    message: 'Not authorized',
    data: 'Not authorized',
  })
}

const getCurrentUser = async (req, res, next) => {
  const user = req.user
  if (user) {
    return res.status(HttpCodes.OK).json({
      status: 'success',
      code: HttpCodes.OK,
      user: {
        email: user.email,
        id: user.id
      },
    })
  }

  return res.status(HttpCodes.UNAUTORIZED).json({
    status: 'error',
    code: HttpCodes.UNAUTORIZED,
    message: 'Not authorized',
    data: 'Not authorized',
  })
}

module.exports = {
  signup,
  login,
  logout,
  getCurrentUser,
}
