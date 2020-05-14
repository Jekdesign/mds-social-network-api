const mongoose = require('mongoose')

const Schema = new mongoose.Schema({
  firstname: {
    type: String,
    trim: true,
    required: true
  },
  lastName: {
    type: String,
    trim: true,
    required: true
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    trim: true
  },
  streetNumber: {
    type: String,
    trim: true
  },
  streetType: {
    type: String,
    trim: true
  },
  streetName: {
    type: String,
    trim: true
  },
  city: {
    type: String,
    trim: true
  },
  cityCode: {
    type: String,
    trim: true
  },
  phone: {
    type: String
  },
  imgProfil: {
    type: String,
    default: null
  },
  startdate: {
    type: Date,
    default: Date.now
  },
  updateDate: {
    type: Date,
    default: Date.now
  },
  actif: {
    type: Boolean,
    default: true
  }
}, {
  collection: 'users',
  minimize: false,
  versionKey: false
}).set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id

    delete ret._id
  }
})

module.exports = Schema
