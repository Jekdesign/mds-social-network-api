const AlbumModel = require('../models/album.js')

/**
 * Album
 * @class
 */
class Album {
  constructor (app, connect) {
    this.app = app
    this.AlbumModel = connect.model('Album', AlbumModel)

    this.createAlbum()
    this.showAlbums()
    this.showAlbum()
    this.updateAlbum()
    this.deleteAlbum()
    this.deleteAlbums()
  }

  /**
   * Create one album
   */
  createAlbum () {
    this.app.post('/album/create', (req, res) => {
      try {
        const albumModel = new this.AlbumModel(req.body)
        albumModel.save()
          .then(album => {
            res.status(201).json(album || {})
          })
          .catch(err => {
            res.status(400).json({
              code: 400,
              album: err
            })
          })
      } catch (err) {
        res.status(500).json({
          code: 500,
          album: err
        })
      }
    })
  }

  /**
   * Show All albums
   */
  showAlbums () {
    this.app.get('/album/show', (req, res) => {
      try {
        this.AlbumModel.find({}).then(album => {
          res.status(200).json(album)
        })
      } catch (err) {
        res.status(500).json({
          code: 500,
          album: err
        })
      }
    })
  }

  /**
   * Show one album by id
   */
  showAlbum () {
    this.app.get('/album/show/:id', (req, res) => {
      try {
        this.AlbumModel.findById(req.params.id)
          .then((album) => {
            res.status(200).json(album || {})
          })
          .catch((err) => {
            res.status(500).json({
              code: 500,
              album: err
            })
          })
      } catch (err) {
        res.status(500).json({
          code: 500,
          album: err
        })
      }
    })
  }

  /**
   * Update one album
   */
  updateAlbum () {
    this.app.put('/album/update/:id', (req, res) => {
      try {
        this.AlbumModel.findByIdAndUpdate(req.params.id, req.body).then(album => {
          res.status(200).json(album || {})
        }).catch(err => {
          res.status(500).json({
            code: 500,
            album: err
          })
        })
      } catch (err) {
        res.status(500).json({
          code: 500,
          album: err
        })
      }
    })
  }

  /**
   * Delete one album
   */
  deleteAlbum () {
    this.app.delete('/album/delete/:id', (req, res) => {
      try {
        this.AlbumModel.findByIdAndDelete(req.params.id).then(album => {
          res.status(200).json(album || {})
        }).catch(err => {
          res.status(500).json({
            code: 500,
            album: err
          })
        })
      } catch (err) {
        res.status(500).json({
          code: 500,
          album: err
        })
      }
    })
  }

  /**
   * Delete all albums
   */

  deleteAlbums () {
    this.app.delete('/album/delete', (req, res) => {
      try {
        this.AlbumModel.deleteMany({}).then(album => {
          res.status(200).json(album)
        }).catch(err => {
          res.status(500).json({
            code: 500,
            album: err
          })
        })
      } catch (err) {
        res.status(500).json({
          code: 500,
          album: err
        })
      }
    })
  }
}

module.exports = Album
