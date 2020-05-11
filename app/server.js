const express = require('express')
const bodyParser = require('body-parser')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const cors = require('cors')

const routes = require('./routes.js')

/**
 * Server
 * @Class
 */
class Server {
  constructor () {
    this.app = express()
  }

  /**
   * Data base connect
   * @return {Object} connect
   */
  dbConnect () {
    dotenv.config()
    const host = process.env.ATLAS_URI
    const connect = mongoose.createConnection(host, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true
    })

    connect.on('error', (err) => {
      setTimeout(() => {
        console.error(`[ERROR] api dbConnect() -> ${err}`)
        this.connect = this.dbConnect(host)
      }, 5000)
    })

    connect.on('disconnected', () => {
      setTimeout(() => {
        console.log('[DISCONNECTED] api dbConnect() -> mongodb disconnected')
        this.connect = this.dbConnect(host)
      }, 5000)
    })

    process.on('SIGINT', () => {
      connect.close(() => {
        console.log('[API END PROCESS] api dbConnect() -> close mongodb connection')
        process.exit(0)
      })
    })

    return connect
  }

  /**
   * Middleware
   */
  middleware () {
    this.app.use(cors())
    this.app.use(bodyParser.json())
    this.app.use(bodyParser.urlencoded({ extended: true }))
  }

  /**
   * Routes
   */
  routes () {
    this.app.use((req, res, next) => {
      if (req.headers['x-access-token']) {
        if (req.headers['x-access-token'] !== process.env.ACCESS_TOKEN) {
          res.status(401).json({
            code: 401,
            message: 'not authorized'
          })
        } else {
          next()
        }
      } else {
        res.status(404).json({
          code: 404,
          message: 'No token found'
        })
      }
    })
    
    new routes.User(this.app, this.connect)
    new routes.Event(this.app, this.connect)
    new routes.Group(this.app, this.connect)
  }

  /**
   * Run
   */
  run () {
    try {
      this.connect = this.dbConnect()
      this.dbConnect()
      this.middleware()
      this.routes()
      this.app.listen(3000)
    } catch (err) {
      console.log(`[ERROR] Server -> ${err}`)
    }
  }
}

module.exports = Server
