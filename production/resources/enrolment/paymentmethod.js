// A note to anyone editing custom data:
// ----------------------------------------------------------------------------
// In aXcelerate, if custom RADIO fields contain a space after a comma (to separate entries), you must account for this in the value. Select boxes do not seem to be succeptible to this oversight.
// This would not affect the first entry in an radio list as there is no space for it.
// You should absolutely check the custom field in aXcelerate to see if there are spaces between comma dilenations.
// ----------------------------------------------------------------------------
// This field is a radio select, so n+2 fields should be prefixed with a space
module.exports = [
  { value: 'Fee for Service', label: 'Fee for Service' },
  { value: ' Certificate III Guarantee QLD', label: 'Certificate III Guarantee QLD' },
  { value: ' Higher Level Skills QLD', label: 'Higher Level Skills QLD' },
  { value: ' Smart & Skilled NSW', label: 'Smart & Skilled NSW' }
]
