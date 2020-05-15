const mongoose = require('mongoose')

const Schema = new mongoose.Schema({
  albumId: {
    type: mongoose.ObjectId,
    ref: 'Album'
  },
  path: {
    type: String
  },
  name: {
    type: String
  },
  authorId: {
    type: mongoose.ObjectId,
    ref: 'Person'
  },
  startDate: {
    type: Date,
    default: Date.now
  },
  actif: {
    type: Boolean,
    default: 1
  }
}, {
  collection: 'photos',
  minimize: false,
  versionKey: false
}).set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id
    delete ret._id
  }
})

module.exports = Schema
