const mongoose = require('mongoose')

const Schema = new mongoose.Schema({
  authorId: {
    type: mongoose.ObjectId,
    ref: 'Person'
  },
  comment: String,
  messageId: {
    type: mongoose.ObjectId,
    ref: 'Message'
  },
  startDate: {
    type: Date,
    default: Date.now
  },
  updateDate: {
    type: Date,
    default: null
  },
  action: {
    type: Boolean,
    default: 1
  }
}, {
  collection: 'comments',
  minimize: false,
  versionKey: false
}).set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id
    delete ret._id
  }
})

module.exports = Schema
