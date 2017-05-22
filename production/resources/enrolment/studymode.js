// A note to anyone editing custom data:
// ----------------------------------------------------------------------------
// In aXcelerate, if custom RADIO fields contain a space after a comma (to separate entries), you must account for this in the value. Select boxes do not seem to be succeptible to this oversight.
// This would not affect the first entry in an radio list as there is no space for it.
// You should absolutely check the custom field in aXcelerate to see if there are spaces between comma dilenations.
// ----------------------------------------------------------------------------
// This field is a radio select, so n+2 fields should be prefixed with a space
module.exports = [
  { value: 'Online', label: 'Online' },
  { value: ' 1:1', label: '1:1' },
  { value: ' On-Campus', label: 'On-Campus' }
]
