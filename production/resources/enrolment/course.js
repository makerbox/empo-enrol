// A note to anyone editing custom data:
// ----------------------------------------------------------------------------
// In aXcelerate, if custom RADIO fields contain a space after a comma (to separate entries), you must account for this in the value. Select boxes do not seem to be succeptible to this oversight.
// This would not affect the first entry in an radio list as there is no space for it.
// You should absolutely check the custom field in aXcelerate to see if there are spaces between comma dilenations.
// ----------------------------------------------------------------------------
// When this was implemented, the course field was a select box. So it should not need spaces.
module.exports = [
  { value: 'CHC33015 Certificate III in Individual Support (Ageing)', label: 'CHC33015 Certificate III in Individual Support (Ageing)'},
  { value: 'CHC33015 Certificate III in Individual Support (Disability)', label: 'CHC33015 Certificate III in Individual Support (Disability)'},
  { value: 'CHC43015 Certificate IV in Ageing Support', label: 'CHC43015 Certificate IV in Ageing Support'},
  { value: 'CHC43115 Certificate IV in Disability', label: 'CHC43115 Certificate IV in Disability'},
  { value: 'CHC30113 Certificate III in Early Childhood', label: 'CHC30113 Certificate III in Early Childhood'},
  { value: 'CHC50113 Diploma of Early Childhood', label: 'CHC50113 Diploma of Early Childhood'},
  { value: 'CHC42015 Certificate IV in Community Services', label: 'CHC42015 Certificate IV in Community Services'},
  { value: 'CHC52015 Diploma of Community Services', label: 'CHC52015 Diploma of Community Services'},
  { value: 'BSB51915 Diploma of Leadership and Management', label: 'BSB51915 Diploma of Leadership and Management'},
  { value: 'CHC40213 Certificate IV in Education Support', label: 'CHC40213 Certificate IV in Education Support'},
  { value: 'Double Diploma of Early Childhood Education and Care/Leadership and Management', label: 'Double Diploma of Early Childhood Education and Care/Leadership and Management'}
]
