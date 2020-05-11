const bcrypt = require('bcryptjs')
const UserModel = require('../models/user.js')

/**
 * User
 * @class
 */
class User {
  constructor (app, connect) {
    this.app = app
    this.UserModel = connect.model('User', UserModel)

    this.createUser()
    this.showUsers()
    this.showUser()
    this.searchUser()
    this.updateUser()
    this.deleteUser()
    this.deleteUsers()
  }

  /**
   * Create one user
   */
  createUser () {
    this.app.post('/user/create', (req, res) => {
      try {
        // const userModel = this.UserModel(req.body)
        const {
          email,
          password
        } = req.body
        const saltRounds = 10
        const salt = bcrypt.genSaltSync(saltRounds)
        const hashPass = bcrypt.hashSync(password, salt)
        const userModel = new this.UserModel({ first_name: req.body.first_name, last_name: req.body.last_name, email: email, password: hashPass })
        userModel
          .save()
          .then((user) => {
            res.status(200).json(user || {})
          })
          .catch((err) => {
            res.status(500).json({
              code: 500,
              message: err
            })
          })
      } catch (err) {
        res.status(500).json({
          code: 500,
          message: err
        })
      }
    })
  }

  /**
   * Show All
   */
  showUsers () {
    this.app.get('/user/show', (req, res) => {
      try {
        this.UserModel.find({}).then((user) => {
          res.status(200).json(user)
        })
      } catch (err) {
        res.status(500).json({
          code: 500,
          message: err
        })
      }
    })
  }

  /**
   * Show one by id
   */
  showUser () {
    this.app.get('/user/show/:id', (req, res) => {
      try {
        this.UserModel.findById(req.params.id)
          .then((user) => {
            res.status(200).json(user || {})
          })
          .catch((err) => {
            res.status(500).json({
              code: 500,
              message: err
            })
          })
      } catch (err) {
        res.status(500).json({
          code: 500,
          message: err
        })
      }
    })
  }

  /**
   * List user limit 10
   */
  searchUser () {
    this.app.post('/user/search', (req, res) => {
      try {
        const pipe = [{ $limit: req.body.limit || 10 }]

        if (req.body.sort) {
          pipe.push({ $sort: req.body.sort })
        }

        this.UserModel.aggregate(pipe)
          .then((user) => {
            res.status(200).json(user || {})
          })
          .catch((err) => {
            res.status(500).json({
              code: 500,
              message: err
            })
          })
      } catch (err) {
        res.status(500).json({
          code: 500,
          message: err
        })
      }
    })
  }

  /**
   * Update one user
   */
  updateUser () {
    this.app.put('/user/update/:id', (req, res) => {
      try {
        this.UserModel.findByIdAndUpdate(req.params.id, req.body).then(user => {
          res.status(200).json(user || {})
        }).catch(err => {
          res.status(500).json({
            code: 500,
            message: err
          })
        })
      } catch (err) {
        res.status(500).json({
          code: 500,
          message: err
        })
      }
    })
  }

  /**
   * Delete one user
   */
  deleteUser () {
    this.app.delete('/user/delete/:id', (req, res) => {
      try {
        this.UserModel.findByIdAndDelete(req.params.id).then(user => {
          res.status(200).json(user || {})
        }).catch(err => {
          res.status(500).json({
            code: 500,
            message: err
          })
        })
      } catch (err) {
        res.status(500).json({
          code: 500,
          message: err
        })
      }
    })
  }
  
  /**
   * Delete all
   */
  deleteUsers () {
    this.app.delete('/user/delete', (req, res) => {
      try {
        this.UserModel.remove({}).then(user => {
          res.status(200).json(user)
        }).catch(err => {
          res.status(500).json({
            code: 500,
            message: err
          })
        })
      } catch (err) {
        res.status(500).json({
          code: 500,
          message: err
        })
      }
    })
  }
}

module.exports = User
