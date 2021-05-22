const mongoose = require('mongoose')
const { Schema, SchemaTypes } = mongoose

const boardSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Set name for contact'],
    },
    owner: {
      type: SchemaTypes.ObjectId,
      ref: 'user',
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

const Board = mongoose.model('board', boardSchema)

module.exports = Board
