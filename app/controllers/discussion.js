const DiscussionModel = require('../models/discussion.js')
const MessageModel = require('../models/message.js')

/**
 * Discussion
 * @class
 */
class Discussion {
  constructor (app, connect) {
    this.app = app
    this.DiscussionModel = connect.model('Discussion', DiscussionModel)
    this.MessageModel = connect.model('Message', MessageModel)

    this.createDiscussion()
    this.showDiscussions()
    this.showDiscussion()
    this.showMsgDiscussions()
    this.updateDiscussion()
    this.deleteDiscussion()
    this.deleteDiscussions()
    this.deleteEventsDiscussions()
    this.deleteGroupsDiscussions()
  }

  /**
   * Create one discussion

   */
  createDiscussion () {
    this.app.post('/discussion/create', (req, res) => {
      try {
        const discussionModel = new this.DiscussionModel(req.body)
        const group = (req.body.type === 'group')
        const event = (req.body.type === 'event')
        if (req.body.type && (group || event) && (group !== event)) {
          discussionModel.save()
            .then(discussion => {
              res.status(201).json(discussion || {})
            })
            .catch((err) => {
              res.status(500).json({
                code: 500,
                message: err
              })
            })
        } else {
          res.status(400).json({
            code: 400,
            message: 'No admin found'
          })
        }
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
  showDiscussions () {
    this.app.get('/discussion/show', (req, res) => {
      try {
        this.DiscussionModel.find({}).then((discussion) => {
          res.status(200).json(discussion)
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
  showDiscussion () {
    this.app.get('/discussion/show/:id', (req, res) => {
      try {
        this.DiscussionModel.findById(req.params.id)
          .then((discussion) => {
            res.status(200).json(discussion || {})
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
   * Update one discussion
   */
  updateDiscussion () {
    this.app.put('/discussion/update/:id', (req, res) => {
      try {
        this.DiscussionModel.findByIdAndUpdate(req.params.id, req.body).then(discussion => {
          res.status(200).json(discussion || {})
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
   * Delete one discussion
   */
  deleteDiscussion () {
    this.app.delete('/discussion/delete/:id', (req, res) => {
      try {
        this.DiscussionModel.findByIdAndDelete(req.params.id).then(discussion => {
          res.status(200).json(discussion || {})
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

  deleteDiscussions () {
    this.app.delete('/discussion/delete', (req, res) => {
      try {
        this.DiscussionModel.deleteMany({}).then(discussion => {
          res.status(200).json(discussion)
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
   * Delete all events
   */

  deleteEventsDiscussions () {
    this.app.delete('/discussion/events/delete', (req, res) => {
      try {
        this.DiscussionModel.deleteMany({ type: 'event' }).then(discussion => {
          res.status(200).json(discussion)
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
   * Delete all groups
   */

  deleteGroupsDiscussions () {
    this.app.delete('/discussion/groups/delete', (req, res) => {
      try {
        this.DiscussionModel.deleteMany({ type: 'group' }).then(discussion => {
          res.status(200).json(discussion)
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
  showMsgDiscussions () {
    this.app.get('/discussion/message/show/:id', (req, res) => {
      try {
        this.DiscussionModel.findById(req.params.id)
          .then((discut) => {
            if (discut) {
              this.MessageModel.find({ discussionId: req.params.id }).populate('authorId, discussionId')
                .then((msg) => {
                  res.status(200).json({
                    result: {
                      all: Object.keys(msg).length,
                      msg
                    }
                  }
                  )
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

module.exports = Discussion
