const AlbumModel = require('../models/album.js')
const PhotoModel = require('../models/photo.js')
const CommentModel = require('../models/comment.js')

/**
 * Album
 * @class
 */
class Album {
  constructor (app, connect) {
    this.app = app
    this.AlbumModel = connect.model('Album', AlbumModel)
    this.PhotoModel = connect.model('Photo', PhotoModel)
    this.CommentModel = connect.model('Comment', CommentModel)

    this.createAlbum()
    this.showAlbums()
    this.showAlbum()
    this.updateAlbum()
    this.deleteAlbum()
    this.deleteAlbums()

    this.createPhotoAlbum()
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

  /**
   * Create photo in album
   */
  createPhotoAlbum () {
    this.app.post('/album/:id/photo/create', (req, res) => {
      try {
        req.body.albumId = req.param.id
        const PhotoModel = new this.PhotoModel(req.body)
        PhotoModel.save()
          .then(photo => {
            res.status(201).json(photo || {})
          })
          .catch(err => {
            res.status(400).json({
              code: 400,
              photo: err
            })
          })
      } catch (err) {
        res.status(500).json({
          code: 500,
          photo: err
        })
      }
    })
  }
}

module.exports = Album
