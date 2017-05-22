'use strict'

var $enrolForm = $('#enrolment-form')
var $alertContainer = $('#alert-container')

// ----------------------------------------------------------------------------
// Date Picker
var rome = require('rome')
rome(dob, {
  inputFormat: 'DD-MM-YYYY',
  time: false
})

// ----------------------------------------------------------------------------
// State Checker

var makeFieldOptional = function (fieldGroup) {
  var fieldInputs = $(fieldGroup).find('.input, input.radio')
  var groupLabel = $(fieldGroup).find('.groupLabel label')
  $(fieldInputs).attr('data-parsley-required', 'false')
  $(fieldInputs).removeAttr('required')
  $(groupLabel).removeClass('required')
}

var makeFieldRequired = function (fieldGroup) {
  var fieldInputs = $(fieldGroup).find('.input, input.radio')
  var groupLabel = $(fieldGroup).find('.groupLabel label')
  $(fieldInputs).attr('data-parsley-required', 'true')
  $(fieldInputs).attr('required')
  $(groupLabel).addClass('required')
}

var checkState = function () {
  // Checking for:
  // - English is Main Language
  // - Disability
  // - Prior Education
  $("input[name='customField_paymentmethod']:checked").val() == ' VET FEE-HELP' ? makeFieldRequired($('.vet-required')) : makeFieldOptional($('.vet-required'))
  var $USIVerify = $("input[name='USIVerify']:checked").val()
  var $USICreate = $("input[name='USIVerify']:checked").val() == 'Create' ? 'inline' : 'none'
  var $USICreateOnBehalf = $("input[name='USIVerify']:checked").val() !== 'CreateOnBehalf' ? 'block' : 'none'
  var $USIRequired = $("input[name='USIVerify']:checked").val() !== 'CreateOnBehalf'
  var $DisabilityFlag = $("[name='DisabilityFlag']:checked").val() == 'Yes' ? 'block' : 'none'
  var $MainLanguageID = $("[name='MainLanguageID']").val() != '1201' ? 'block' : 'none'
  var $PriorEducationStatus = $("[name='PriorEducationStatus']:checked").val() == 'Yes' ? 'block' : 'none'
  $("[data-show='DisabilityFlag']").css('display', $DisabilityFlag)
  $("[data-show='USICreate']").css('display', $USICreate)
  $('#USIGroup').css('display', $USICreateOnBehalf)
  $("[data-show='MainLanguageID']").css('display', $MainLanguageID)
  $("[data-show='PriorEducationStatus']").css('display', $PriorEducationStatus)
  // $('#USI').prop('required', $USIRequired)
  // console.log($VFH)
}

var $stateCheckers = $("[name='DisabilityFlag'], [name='MainLanguageID'], [name='PriorEducationStatus'], [name='USIVerify'], [name='customField_paymentmethod']")
checkState()
$stateCheckers.on('change', checkState)

$(document).ready(checkState)

// Remove space from the first radio
//
$('[data-stripfirst]').each(function (i, v) {
  var trim = $(this).find('label:first-child input').val().trim()
  $(this).find('label:first-child input').val(trim)
})

// ----------------------------------------------------------------------------
// Persist Data
function flashMessage (message, level) {
  if (message.length > 0) {
    $alertContainer.html('')
    var messageContent = '<div class="alert ' + level + '"><ul>'
    if (typeof message === 'string') {
      messageContent += '<li>' + message + '</li>'
    } else if ($.isArray(message)) {
      $.each(message, function (i, v) {
        errorString += '<li>' + v + '</li>'
      })
    }
    messageContent += '</ul></div>'
    $alertContainer.append(messageContent)
  }
}

setTimeout(function () {
  $('#saved.saved').removeClass('not-ready')
}, 4000)
$enrolForm.garlic({
  onPersist: function (e, val) {
    $('#saved').addClass('saved')
    setTimeout(function () {
      $('#saved.saved').removeClass('saved')
    }, 4000)
  },
  onRetrieve: function (e, val) {
    var button = '<button class="btn-unstyled" style="border-bottom: 1px solid #2c6d96;" type="reset">clear and start again?</button>'
    flashMessage('Resuming previous application, ' + button, 'info')
    checkState()
  }
})

// ----------------------------------------------------------------------------
// Form Validation
$enrolForm.parsley().subscribe('parsley:form:validate', function (formInstance) {
  // If any of these fields are valid
  if ($('input[name=phone]').parsley().isValid() ||
    $('input[name=mobilephone]').parsley().isValid() ||
    $('input[name=workphone]').parsley().isValid()) {
    // Remove the error message
    $('#phonewarning').removeClass('filled parsley-required sublabel').html('')

    // Remove the required validation from all of them, so the form gets submitted
    // We already validated each field, so one is filled.
    // Also, destroy parsley's object
    $('input[name=phone]').removeAttr('required').parsley().destroy()
    $('input[name=mobilephone]').removeAttr('required').parsley().destroy()
    $('input[name=workphone]').removeAttr('required').parsley().destroy()

    return
  }

  // If none is valid, add the validation to them all
  $('input[name=phone]').attr('required', 'required').parsley()
  $('input[name=mobilephone]').attr('required', 'required').parsley()
  $('input[name=workphone]').attr('required', 'required').parsley()

  // stop form submission
  formInstance.validationResult = false

  // and display a gentle message
  $('#phonewarning')
    .html('At least one phone number is required')
    .addClass('filled parsley-required sublabel')
  return
})

// ---------------------------------------------------------------------------
// AJAX data to server
$(document).ready(function () {
  $enrolForm.submit(function (event) {
    $alertContainer.html('')
    event.preventDefault()
    var formData = $(this).serializeArray()
    console.log($(this).serializeArray())

    // process the form
    $.ajax({
      type: 'POST', // define the type of HTTP verb we want to use (POST for our form)
      url: '/api-enrolment', // the url where we want to POST
      data: formData, // our data object
      dataType: 'json', // what type of data do we expect back from the server
      encode: true
    })
      .done(function (data) {
        if (data.errors.length > 0 || data.axcelerate.error) {
          var errorString = '<div class="alert danger"><ul>'
          $.each(data.errors, function (i, v) {
            errorString += '<li>' + v + '</li>'
          })
          if (data.axcelerate.ERROR) {
            errorString += '<li>Please double check that all fields are correct</li>'
          }
          errorString += '</ul></div>'
          $alertContainer.append(errorString)
        } else {
          window.location.replace(window.location.origin + data.redirect)
          console.dir(data)
        }
      })
      .fail(function (jqXHR, textStatus) {
        var $alert_top = $('#alert-container').offset()
        $('html, body').animate({ scrollTop: $alert_top }, '450')
        flashMessage('There was an issue submitting your enrolment, please try again shortly (' + jqXHR.status + ' ' + jqXHR.statusText + ')', 'danger')
      })
    // stop the form from submitting the normal way and refreshing the page
    event.preventDefault()
  })
})
