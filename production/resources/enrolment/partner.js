// A note to anyone editing custom data:
// ----------------------------------------------------------------------------
// In aXcelerate, if custom RADIO fields contain a space after a comma (to separate entries), you must account for this in the value. Select boxes do not seem to be succeptible to this oversight.
// This would not affect the first entry in an radio list as there is no space for it.
// You should absolutely check the custom field in aXcelerate to see if there are spaces between comma dilenations.
// ----------------------------------------------------------------------------
// When this was implemented, the course field was a select box. So it should not need spaces.
module.exports = [
  {
    query: 'study-solutions',
    value: 'Study Solutions'
  }, {
    query: 'aspire',
    value: 'Aspire'
  }, {
    query: 'placement-solutions',
    value: 'Placement Solutions'
  }, {
    query: 'aifs',
    value: 'AIFS'
  }, {
    query: 'sydney-training-academy',
    value: 'Sydney Training Academy'
  }, {
    query: 'charles-institute-of-technology',
    value: 'Charles Institute of Technology'
  }, {
    query: 'gardenia-family-daycare',
    value: 'Gardenia Family Daycare'
  }, {
    query: 'international-childcare-college',
    value: 'International Childcare College'
  }, {
    query: 'skilled-training-australia',
    value: 'Skilled Training Australia'
  }, {
    query: 'tdp-learning',
    value: 'TDP Learning'
  }, {
    query: 'open-school',
    value: 'Open School'
  }, {
    query: 'nsw-bdm',
    value: 'NSW-BDM'
  }, {
    query: 'qld-bdm',
    value: 'QLD-BDM'
  }
]
