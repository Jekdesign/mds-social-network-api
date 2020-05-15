const CommentModel = require('../models/comment.js')

/**
 * Comment
 * @class
 */
class Comment {
  constructor (app, connect) {
    this.app = app
    this.CommentModel = connect.model('Comment', CommentModel)

    this.createComment()
    this.showComments()
    this.showComment()
    this.updateComment()
    this.deleteComment()
    this.deleteComments()
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
          .catch(err => {
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
  showComments () {
    this.app.get('/comment/show', (req, res) => {
      try {
        this.CommentModel.find({}).then(comment => {
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
}

module.exports = Comment
