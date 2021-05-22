const mongoose = require('mongoose')
const { Schema, SchemaTypes } = mongoose

const cardSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Set name for contact'],
    },
    owner: {
      type: SchemaTypes.ObjectId,
      ref: 'user',
    },
    listId: {
      type: String,
      required: [true, 'Card must be into the list'],
    },
    description: {
      type: String,
      default: '',
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

const Card = mongoose.model('card', cardSchema)

module.exports = Card
