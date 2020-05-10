const EventModel = require('../models/event.js')
const UserModel = require('../models/user.js')

/**
 * Event
 * @class
 */
class Event {
  constructor (app, connect) {
    this.app = app
    this.EventModel = connect.model('Event', EventModel)
    this.UserModel = connect.model('User', UserModel)

    this.createEvent()
    this.showEvents()
    this.showEvent()
    this.updateEvent()
    this.deleteEvent()
    this.deleteEvents()
    this.joinEvent()
  }

  /**
   * Create one event
   * only existing administrator on database can create an event
   */
  createEvent () {
    this.app.post('/event/create', (req, res) => {
      try {
        const eventModel = this.EventModel(req.body)
        if (req.body.administrator) {
          this.UserModel.findById(req.body.administrator)
            .then((user) => {
              if (user) {
                eventModel
                  .save()
                  .then((event) => {
                    res.status(200).json(event || {})
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
            })
            .catch((err) => {
              res.status(500).json({
                code: 500,
                message: err
              })
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
  showEvents () {
    this.app.get('/event/show', (req, res) => {
      try {
        this.EventModel.find({}).then((event) => {
          res.status(200).json(event)
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
  showEvent () {
    this.app.get('/event/show/:id', (req, res) => {
      try {
        this.EventModel.findById(req.params.id)
          .then((event) => {
            res.status(200).json(event || {})
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
   * Update one event
   */
  updateEvent () {
    this.app.put('/event/update/:id', (req, res) => {
      try {
        this.EventModel.findByIdAndUpdate(req.params.id, req.body).then(event => {
          res.status(200).json(event || {})
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
   * Delete one event
   */
  deleteEvent () {
    this.app.delete('/event/delete/:id', (req, res) => {
      try {
        this.EventModel.findByIdAndDelete(req.params.id).then(event => {
          res.status(200).json(event || {})
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
  
  deleteEvents () {
    this.app.delete('/event/delete', (req, res) => {
      try {
        this.EventModel.remove({}).then(event => {
          res.status(200).json(event)
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
   * Update one event
   */
  joinEvent () {
    this.app.put('/event/join/:id', (req, res) => {
      try {
        this.EventModel.findById(req.params.id)
        const userId = (req.body.userId) ? req.body.userId : false
          .then(event => {
            const members = event.members
            members.push(userId)
          })

        this.EventModel.findByIdAndUpdate(req.params.id, req.body).then(event => {
          res.status(200).json(event || {})
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

module.exports = Event
