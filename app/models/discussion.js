const mongoose = require('mongoose')

const Schema = new mongoose.Schema({
  type: String,
  created_date: {
    type: Date,
    default: Date.now
  },
  actif: {
    type: Boolean,
    default: 1
  }
}, {
  collection: 'discussion',
  minimize: false,
  versionKey: false
}).set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id
    delete ret._id
  }
})

module.exports = Schema
