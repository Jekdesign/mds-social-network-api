const CommentModel = require('../models/comment.js')

/**
 * Comment
 * @class
 */
class Comment {
  constructor(app, connect) {
    this.app = app
    this.CommentModel = connect.model('Comment', CommentModel)

    this.createComment()
    this.showComments()
    this.showComment()
    this.updateComment()
    this.deleteComment()
    this.deleteComments()
    this.showCommentsComment()
  }

  /**
   * Create one comment
   */
  createComment () {
    this.app.post('/comment/create', (req, res) => {
      try {
        const commentModel = new this.CommentModel(req.body)
        commentModel.save()
          .then(comment => {
            res.status(201).json(comment || {})
          })
          .catch((err) => {
            res.status(500).json({
              code: 500,
              comment: err
            })
          })
      } catch (err) {
        res.status(500).json({
          code: 500,
          comment: err
        })
      }
    })
  }

  /**
   * Show All comments
   */
  showComments() {
    this.app.get('/comment/show', (req, res) => {
      try {
        this.CommentModel.find({}).then((comment) => {
          res.status(200).json(comment)
        })
      } catch (err) {
        res.status(500).json({
          code: 500,
          comment: err
        })
      }
    })
  }

  /**
   * Show one comment by id
   */
  showComment () {
    this.app.get('/comment/show/:id', (req, res) => {
      try {
        this.CommentModel.findById(req.params.id)
          .then((comment) => {
            res.status(200).json(comment || {})
          })
          .catch((err) => {
            res.status(500).json({
              code: 500,
              comment: err
            })
          })
      } catch (err) {
        res.status(500).json({
          code: 500,
          comment: err
        })
      }
    })
  }

  /**
   * Update one comment
   */
  updateComment () {
    this.app.put('/comment/update/:id', (req, res) => {
      try {
        this.CommentModel.findByIdAndUpdate(req.params.id, req.body).then(comment => {
          res.status(200).json(comment || {})
        }).catch(err => {
          res.status(500).json({
            code: 500,
            comment: err
          })
        })
      } catch (err) {
        res.status(500).json({
          code: 500,
          comment: err
        })
      }
    })
  }

  /**
   * Delete one comment
   */
  deleteComment () {
    this.app.delete('/comment/delete/:id', (req, res) => {
      try {
        this.CommentModel.findByIdAndDelete(req.params.id).then(comment => {
          res.status(200).json(comment || {})
        }).catch(err => {
          res.status(500).json({
            code: 500,
            comment: err
          })
        })
      } catch (err) {
        res.status(500).json({
          code: 500,
          comment: err
        })
      }
    })
  }

  /**
   * Delete all comments
   */

  deleteComments () {
    this.app.delete('/comment/delete', (req, res) => {
      try {
        this.CommentModel.deleteMany({}).then(comment => {
          res.status(200).json(comment)
        }).catch(err => {
          res.status(500).json({
            code: 500,
            comment: err
          })
        })
      } catch (err) {
        res.status(500).json({
          code: 500,
          comment: err
        })
      }
    })
  }

  /**
   * Show comments comment
   */
  showCommentsComment () {
    this.app.put('/comment/comments/:id', (req, res) => {
      try {
        this.CommentModel.findById(req.params.id)
          .then(comment => {
            const userIdStaff = req.body.staff ? req.body.staff : false
            const userIdMember = req.body.members ? req.body.members : false
            const staff = comment.staff
            const members = comment.members
            if (userIdStaff || userIdMember) {
              if (userIdStaff) {
                (staff).push(userIdStaff)
              }
              if (userIdMember) {
                (members).push(userIdMember)
              }
              this.CommentModel.findByIdAndUpdate({
                  _id: req.params.id
                }, {
                  staff: staff,
                  members: members
                })
                .then(e => {
                  res.status(200).json(e)
                }).catch(err => {
                  res.status(400).json({
                    code: 400,
                    comment: err
                  })
                })
            }
          })
          .catch(err => {
            res.status(400).json({
              error: {
                status: 400,
                comment: err
              }
            })
          })
      } catch (err) {
        res.status(500).json({
          code: 500,
          comment: err
        })
      }
    })
  }
}

module.exports = Comment
