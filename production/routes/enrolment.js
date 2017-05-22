var express = require('express')
var router = express.Router()

var _ = require('lodash')
var request = require('request')
var isJSON = require('is-json')
var validator = require('validator')
var fs = require('fs')
var marked = require('marked')
var moment = require('moment')

var axcelerate = {
  headers: {
    apitoken: process.env.AXCELERATE_APITOKEN,
    wstoken: process.env.AXCELERATE_WSTOKEN
  },
  url_base: 'https://' + (process.env.AXCELERATE_INSTANCE || 'stg') + '.axcelerate.com.au/api'
}

router.get('/toc', function (req, res, next) {
  res.render('enrolment/terms', {
    md: marked
  })
})

router.get('/', function (req, res, next) {
  if (process.env.NODE_ENV) {
    res.render('enrolment', {
      title: 'Linx Institute',
      lang: require('../resources/enrolment/langCodes'),
      sacc: require('../resources/enrolment/saccCodes'),
      partner: require('../resources/enrolment/partner'),
      course: require('../resources/enrolment/course'),
      studymode: require('../resources/enrolment/studymode'),
      fulltime: require('../resources/enrolment/fulltime'),
      studyreason: require('../resources/enrolment/studyreason'),
      ctandrpl: require('../resources/enrolment/ctandrpl'),
      paymentmethod: require('../resources/enrolment/paymentmethod'),
      query: req.query,
      host: req.get('host')
    }, function (err, enrol) {
      if (err) {
        console.log(err)
      }
      res.send(enrol)
    })
  } else {
    res.send('Please visit https://linx.edu.au/ to get started')
  }
})

router.get('/success', function (req, res, next) {
  if (req.query.type) {
    res.render('success', {
      title: 'Linx Institute',
      query: req.query,
      host: req.get('host')
    }, function (err, enrol) {
      if (err) {
        console.log(err)
      }
      res.send(enrol)
    })
  } else {
    res.send('Please visit http://linx.edu.au/ to get started')
  }
})

router.post('/:id?', function (req, res, next) {
  var formData = req.body || {}
  var contactId = req.body.id || req.params.id || false
  var allowedFields = require('../resources/enrolment/allowedContact')
  var empower = (req.get('host') === 'empowercollege.edu.au' || false)

  var peID = [] // Prior Education
  if (formData.peID1.length) {
    peID.push(formData.peID1)
  }
  if (formData.peID2.length) {
    peID.push(formData.peID2)
  }
  if (formData.peID3.length) {
    peID.push(formData.peID3)
  }
  if (formData.peID4.length) {
    peID.push(formData.peID4)
  }
  if (formData.peID5.length) {
    peID.push(formData.peID5)
  }
  if (formData.peID6.length) {
    peID.push(formData.peID6)
  }
  if (formData.peID7.length) {
    peID.push(formData.peID7)
  }
  if (formData.peID8.length) {
    peID.push(formData.peID8)
  }
  formData.PriorEducationIDs = peID.toString()

  if (formData.dob.length > 0) {
    formData.dob = moment(formData.dob, 'DD-MM-YYYY').format('YYYY-MM-DD')
  }

  // Loop through our form data and remove anything which is not in our whitelist
  formData = _.pick(formData, allowedFields)

  // Validation
  var errors = []
  if (formData.dob.length > 0 && !validator.isDate(formData.dob)) {
    errors.push('Your date of birth is not correct')
  }
  if (!validator.isEmail(formData.emailAddress) || formData.emailAddress.length <= 0) {
    errors.push('You must provide a valid email address')
  }
  if (!formData.customField_TOC) {
    errors.push('You must accept the Terms and Conditions')
  }

  // Type Conversion
  formData.DisabilityTypeIDs = typeof formData.DisabilityTypeIDs === 'object' ? formData.DisabilityTypeIDs.toString() : ''

  // Request Body
  var requestContact = {
    method: contactId ? 'PUT' : 'POST',
    url: axcelerate.url_base + '/contact' + (contactId ? '/' + contactId : ''),
    headers: axcelerate.headers,
    form: formData
  }
  // Send the request to aXcelerate
  request(requestContact, function (error, response, body) {
    if (error) throw new Error(error) // aXcelerate parses api errors in the body response
    var json = false
    if (!isJSON(body)) {
      errors.push('Invalid Contact ID')
    } else {
      json = JSON.parse(response.body)
    }
    // console.log(json)
    var result = {
      axcelerate: json,
      errors: errors,
      url: 'https://stg.axcelerate.com.au/management/management2/Contact_Add.cfm',
      success: false
    }
    if (result.axcelerate.ERROR === true || result.errors.length > 0) {
      result.errors.push(json.MESSAGES)
      console.error('result', result)
      res.json(result)
    } else {
      result.success = true // yay
      result.url += '?ContactID=' + result.axcelerate.CONTACTID
      result.redirect = '/success?type=enrolment&ContactID=' + result.axcelerate.CONTACTID
      var requestUSI = {
        method: 'POST',
        url: axcelerate.url_base + '/contact/note/',
        qs: { contactId: result.axcelerate.CONTACTID, contactNote: 'Create a USI on behalf of this user' },
        headers: axcelerate.headers
      }
      if (formData.USIVerify === 'CreateOnBehalf') {
        request(requestUSI, function (error, response, body) {
          if (error) throw new Error(error) // aXcelerate parses api errors in the body response
          if (result.axcelerate.ERROR === true || result.errors.length > 0) {
            console.error('result', result)
          } else {
            console.log('result', result) // TODO: Remove log when satisfied
            result.note = result
          }
        })
      }
      console.log('result', result) // TODO: Remove log when satisfied
      res.json(result)
    }
  })
})

module.exports = router
