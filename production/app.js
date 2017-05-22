require('dotenv').load()

var express = require('express')

var path = require('path')
var logger = require('morgan')
var bodyParser = require('body-parser')

// Routes
var enrolment = require('./routes/enrolment')

var app = express()
var sassMiddleware = require('node-sass-middleware')


var moment = require('moment')
var marked = require('marked')
var _ = require('lodash')

app.locals.moment = moment
app.locals.marked = marked
app.locals._ = _

app.enable('trust proxy')

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

app.use(sassMiddleware({
    /* Options */
    src: __dirname + '/src/public/api-enrolment/styles',
    dest: path.join(__dirname, 'public/api-enrolment'),
    debug: false,
    outputStyle: 'compressed',
    prefix: '/static'
}))

app.use(express.static(path.join(__dirname, 'public')))
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))

var cors = function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
}
if (process.env.NODE_ENV === 'development') {
  app.locals.pretty = true
  app.use(cors)
}

function logErrors (err, req, res, next) {
  console.error(err.stack)
  next(err)
}

function clientErrorHandler (err, req, res, next) {
  if (req.xhr) {
    res.status(500).send({ error: 'Something blew up!' })
  } else {
    next(err)
  }
}

function errorHandler (err, req, res, next) {
  res.status(500)
  res.render('error', { error: err })
}
app.use(logErrors)
app.use(clientErrorHandler)
app.use(errorHandler)

app.use('/api-enrolment', enrolment)
app.use('/', enrolment)

module.exports = app
