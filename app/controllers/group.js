const GroupModel = require('../models/group.js')
const UserModel = require('../models/user.js')

/**
 * Group
 * @class
 */
class Group {
  constructor (app, connect) {
    this.app = app
    this.GroupModel = connect.model('Group', GroupModel)
    this.UserModel = connect.model('User', UserModel)

    this.createGroup()
    this.showGroups()
    this.showGroup()
    this.updateGroup()
    this.deleteGroup()
    this.deleteGroups()
    this.joinGroup()
    this.leaveGroup()
  }

  /**
   * Create one group
   * only existing administrator on database can create an group
   */
  createGroup () {
    this.app.post('/group/create', (req, res) => {
      try {
        const groupModel = new this.GroupModel(req.body)
        if (req.body.administrator) {
          if (req.body.typeGroup && (req.body.typeGroup === 'public' || req.body.typeGroup === 'private' || req.body.typeGroup === 'secret')) {
            this.UserModel.findById(req.body.administrator).then((user) => {
              if (user) {
                groupModel
                  .save()
                  .then((group) => {
                    res.status(200).json(group || {})
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
            }).catch((err) => {
              res.status(500).json({
                code: 500,
                message: err
              })
            })
          }
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
  showGroups () {
    this.app.get('/group/show', (req, res) => {
      try {
        this.GroupModel.find({}).then((group) => {
          res.status(200).json(group)
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
  showGroup () {
    this.app.get('/group/show/:id', (req, res) => {
      try {
        this.GroupModel.findById(req.params.id)
          .then((group) => {
            res.status(200).json(group || {})
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
   * Update one group
   */
  updateGroup () {
    this.app.put('/group/update/:id', (req, res) => {
      try {
        this.GroupModel.findByIdAndUpdate(req.params.id, req.body).then(group => {
          res.status(200).json(group || {})
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
   * Delete one group
   */
  deleteGroup () {
    this.app.delete('/group/delete/:id', (req, res) => {
      try {
        this.GroupModel.findByIdAndDelete(req.params.id).then(group => {
          res.status(200).json(group || {})
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

  deleteGroups () {
    this.app.delete('/group/delete', (req, res) => {
      try {
        this.GroupModel.deleteMany({}).then(group => {
          res.status(200).json(group)
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
   * Update one group
   */
  joinGroup () {
    this.app.put('/group/join/:id', (req, res) => {
      try {
        this.GroupModel.findById(req.params.id)
          .then(group => {
            const userIdStaff = req.body.staff ? req.body.staff : false
            const userIdMember = req.body.members ? req.body.members : false
            const staff = group.staff
            const members = group.members
            if (userIdStaff || userIdMember) {
              if (userIdStaff) {
                (staff).push(userIdStaff)
              }
              if (userIdMember) {
                (members).push(userIdMember)
              }
              this.GroupModel.findByIdAndUpdate({ _id: req.params.id }, { staff: staff, members: members })
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

  leaveGroup () {
    this.app.put('/group/leave/:id', (req, res) => {
      try {
        this.GroupModel.findById(req.params.id)
          .then(group => {
            const userIdStaff = req.body.staff ? req.body.staff : false
            const userIdMember = req.body.members ? req.body.members : false
            const staff = group.staff
            const members = group.members
            if (userIdStaff || userIdMember) {
              if (staff.includes(userIdStaff) || members.includes(userIdMember)) {
                if (userIdStaff) {
                  const index = staff.indexOf(userIdStaff)
                  staff.splice(index, 1)
                }
                if (userIdMember) {
                  const index = members.indexOf(userIdMember)
                  members.splice(index, 1)
                }
                this.GroupModel.findByIdAndUpdate({ _id: req.params.id }, { staff: staff, members: members })
                  .then(e => {
                    res.status(200).json(e)
                  }).catch(err => {
                    res.status(400).json({
                      code: 400,
                      message: err
                    })
                  })
              }
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

module.exports = Group
