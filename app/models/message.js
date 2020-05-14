const mongoose = require('mongoose')

const Schema = new mongoose.Schema({
  authorId: {
    type: mongoose.ObjectId,
    ref: 'Person'
  },
  message: String,
  discussionId: {
    type: mongoose.ObjectId, 
    ref: 'Discussion'
  },
  created_date: {
    type: Date,
    default: Date.now
  },
  updated_date: {
    type: Date,
    default: null
  },
  action: {
    type: Boolean,
    default: 1
  }
}, {
  collection: 'messages',
  minimize: false,
  versionKey: false
}).set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id
    delete ret._id
  }
})

module.exports = Schema
