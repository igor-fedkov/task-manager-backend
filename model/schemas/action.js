const mongoose = require('mongoose')

const { actionsTypes } = require('../../helpers/constants')

const { Schema, SchemaTypes } = mongoose

const actionSchema = new Schema(
  {
    owner: {
      type: SchemaTypes.ObjectId,
      ref: 'user',
    },
    objId: {
      type: String,
      required: [true, 'Object is required']
    },
    actionType: {
      type: String,
      enum: [...Object.values(actionsTypes)],
      required: [true, 'Action type is required']
    },
    endPointId: {
      type: String,
      default: ''
    }
  },
  {
    versionKey: false,
    timestamps: true,
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

// actionSchema.virtual('date').get(function() {
//   return this.email.slice(this.email.indexOf('@') + 1);
// })

const Action = mongoose.model('action', actionSchema)

module.exports = Action
