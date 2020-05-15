const MessageModel = require('../models/message.js')
const CommentModel = require('../models/comment.js')
/**
 * Message
 * @class
 */
class Message {
  constructor (app, connect) {
    this.app = app
    this.MessageModel = connect.model('Message', MessageModel)
    this.CommentModel = connect.model('Comment', CommentModel)
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
   * Show All Messages in thread
   */
  showCommentsMessage () {
    this.app.get('/message/comment/show/:id', (req, res) => {
      try {
        this.MessageModel.findById(req.params.id)
          .then((messaj) => {
            if (messaj) {
              this.CommentModel.find({ messageId: req.params.id }).populate('authorId, messageId')
                .then((cmt) => {
                  res.status(200).json({
                    result: {
                      all: Object.keys(cmt).length,
                      cmt
                    }
                  })
                })
            } else {
              res.status(400).json({
                code: 400,
                message: 'id message found'
              })
            }
          }).catch(err => {
            res.status(400).json({
              code: 400,
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

module.exports = Message
