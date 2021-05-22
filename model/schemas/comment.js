const mongoose = require('mongoose')
const { Schema, SchemaTypes } = mongoose

const commentSchema = new Schema(
  {
    text: {
      type: String,
      required: [true, 'Set comment for card'],
    },
    owner: {
      type: SchemaTypes.ObjectId,
      ref: 'user',
    },
    cardId: {
      type: String,
      required: [true, 'Comment must be into the card'],
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

const Comment = mongoose.model('comment', commentSchema)

module.exports = Comment
