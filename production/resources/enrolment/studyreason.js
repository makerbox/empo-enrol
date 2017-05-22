// A note to anyone editing custom data:
// ----------------------------------------------------------------------------
// In aXcelerate, if custom RADIO fields contain a space after a comma (to separate entries), you must account for this in the value. Select boxes do not seem to be succeptible to this oversight.
// This would not affect the first entry in an radio list as there is no space for it.
// You should absolutely check the custom field in aXcelerate to see if there are spaces between comma dilenations.
// ----------------------------------------------------------------------------
// When this was implemented, the study reason field was a select box. So it should not need spaces.
module.exports = [
  { value: 'To get a job', label: 'To get a job' },
  { value: 'To develop my existing business', label: 'To develop my existing business' },
  { value: 'To start my own business', label: 'To start my own business' },
  { value: 'To try for a different career', label: 'To try for a different career' },
  { value: 'To get a better job or promotion', label: 'To get a better job or promotion' },
  { value: 'It was a requirement of my job', label: 'It was a requirement of my job' },
  { value: 'I wanted extra skills for my job', label: 'I wanted extra skills for my job' },
  { value: 'To get into another course of study', label: 'To get into another course of study' },
  { value: 'Other reasons', label: 'Other reasons' },
  { value: 'For personal interest or self-development', label: 'For personal interest or self-development' }
]
