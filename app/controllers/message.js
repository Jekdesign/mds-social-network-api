const MessageModel = require('../models/message.js')
const GroupModel = require('../models/group.js')

/**
 * Message
 * @class
 */
class Message {
  constructor (app, connect) {
    this.app = app
    this.MessageModel = connect.model('Message', MessageModel)
    this.GroupModel = connect.model('Group', GroupModel)

    this.createMessage()
    this.showMessages()
    this.showMessage()
    this.updateMessage()
    this.deleteMessage()
    this.deleteMessages()
    this.showCommentsMessage()
  }

  /**
   * Create one message
   */
  createMessage () {
    this.app.post('/message/create', (req, res) => {
      try {
        const messageModel = new this.MessageModel(req.body)
        messageModel.save()
          .then(message => {
            res.status(201).json(message || {})
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
   * Show All messages
   */
  showMessages () {
    this.app.get('/message/show', (req, res) => {
      try {
        this.MessageModel.find({}).then((message) => {
          res.status(200).json(message)
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
   * Show one message by id
   */
  showMessage () {
    this.app.get('/message/show/:id', (req, res) => {
      try {
        this.MessageModel.findById(req.params.id)
          .then((message) => {
            res.status(200).json(message || {})
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
   * Update one message
   */
  updateMessage () {
    this.app.put('/message/update/:id', (req, res) => {
      try {
        this.MessageModel.findByIdAndUpdate(req.params.id, req.body).then(message => {
          res.status(200).json(message || {})
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
   * Delete one message
   */
  deleteMessage () {
    this.app.delete('/message/delete/:id', (req, res) => {
      try {
        this.MessageModel.findByIdAndDelete(req.params.id).then(message => {
          res.status(200).json(message || {})
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
   * Delete all messages
   */

  deleteMessages () {
    this.app.delete('/message/delete', (req, res) => {
      try {
        this.MessageModel.deleteMany({}).then(message => {
          res.status(200).json(message)
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
   * Show comments message
   */
  showCommentsMessage () {
    this.app.put('/message/comments/:id', (req, res) => {
      try {
        this.MessageModel.findById(req.params.id)
          .then(message => {
            const userIdStaff = req.body.staff ? req.body.staff : false
            const userIdMember = req.body.members ? req.body.members : false
            const staff = message.staff
            const members = message.members
            if (userIdStaff || userIdMember) {
              if (userIdStaff) {
                (staff).push(userIdStaff)
              }
              if (userIdMember) {
                (members).push(userIdMember)
              }
              this.MessageModel.findByIdAndUpdate({ _id: req.params.id }, { staff: staff, members: members })
                .then(e => {
                  res.status(200).json(e)
                }).catch(err => {
                  res.status(400).json({
                    code: 400,
                    message: err
                  })
                })
            }
          })
          .catch(err => {
            res.status(400).json({
              error: {
                status: 400,
                message: err
              }
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

module.exports = Message
