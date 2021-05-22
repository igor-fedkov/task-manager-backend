const mongoose = require('mongoose')
const bCrypt = require('bcryptjs')

const Schema = mongoose.Schema

const userSchema = new Schema({
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
  },
  token: {
    type: String,
    default: null,
  },
})

userSchema.path('email').validate((value) => {
  const re = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
  return re.test(String(value))
})

userSchema.pre('save', async function (naxt) {
  if (this.isModified('password')) {
    this.password = await bCrypt.hashSync(this.password, bCrypt.genSaltSync(6))
  }
})

userSchema.methods.validPassword = async function (password) {
  return await bCrypt.compare(password, this.password)
}

const User = mongoose.model('user', userSchema)

module.exports = User
