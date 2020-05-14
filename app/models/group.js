const mongoose = require('mongoose')

const Schema = new mongoose.Schema({
  administrator: {
    type: mongoose.ObjectId,
    ref: 'Person'
  },
  name: String,
  description: String,
  icon: {
    type: String,
    default: null
  },
  img_banner: {
    type: String,
    default: null
  },
  typeGroup: {
    type: String,
    default: 'public'
  },
  staff: [{
    type: mongoose.ObjectId,
    ref: 'Person'
  }],
  members: [{
    type: mongoose.ObjectId,
    ref: 'Person'
  }],
  permissions: {
    publishing: {
      type: Boolean,
      default: true
    },
    created_event: {
      type: Boolean,
      default: false
    }
  },
  start_date: {
    type: Date,
    default: Date.now
  },
  actif: {
    type: Boolean,
    default: true
  }
}, {
  collection: 'groups',
  minimize: false,
  versionKey: false
}).set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id

    delete ret._id
  }
})

module.exports = Schema
