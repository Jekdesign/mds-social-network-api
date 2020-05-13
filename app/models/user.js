const mongoose = require('mongoose')

const Schema = new mongoose.Schema({
  first_name: {
    type: String,
    trim: true,
    required: true
  },
  last_name: {
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
  street_number: {
    type: String,
    trim: true
  },
  street_type: {
    type: String,
    trim: true
  },
  street_name: {
    type: String,
    trim: true
  },
  city: {
    type: String,
    trim: true
  },
  city_code: {
    type: String,
    trim: true
  },
  phone: {
    type: String
  },
  image_profil: {
    type: String,
    default: 'https://pbs.twimg.com/profile_images/1126137112825335808/L5WvNz8W_400x400.jpg'
  },
  creation_date: {
    type: Date,
    default: Date.now
  },
  updated_date: {
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
