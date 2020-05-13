const mongoose = require('mongoose')

const Schema = new mongoose.Schema({
  administrator: {
    type: mongoose.ObjectId
  },
  name: String,
  description: String,
  icon: {
    type: String,
    default: null
  },
  img_banner: {
    type: String,
    default: 'https://pbs.twimg.com/profile_images/1126137112825335808/L5WvNz8W_400x400.jpg'
  },
  typeGroup: {
    type: String,
    default: 'public'
  },
  staff: [{
    type: mongoose.ObjectId
  }],
  members: [{
    type: mongoose.ObjectId
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
