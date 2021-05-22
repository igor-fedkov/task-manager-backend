const mongoose = require('mongoose')
const { Schema, SchemaTypes } = mongoose

const listSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Set name for contact'],
    },
    owner: {
      type: SchemaTypes.ObjectId,
      ref: 'user',
    },
    boardId: {
      type: String,
      required: [true, 'List must be into the board'],
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    versionKey: false,
    timestamps: false,
    toObjects: {
      virtuals: true,
      transform: (doc, ret) => {
        delete ret._id
        return ret
      }
    },
    toJSON: {
      virtuals: true,
      transform: (doc, ret) => {
        delete ret._id
        return ret
      }
    }
  }
)

const List = mongoose.model('list', listSchema)

module.exports = List
