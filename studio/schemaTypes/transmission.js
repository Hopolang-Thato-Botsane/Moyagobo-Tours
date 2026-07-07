// This covers both your Transmission page AND your Success page
export default {
  name: 'partner',
  title: 'Partner',
  type: 'document',
  fields: [
    { name: 'name', title: 'Partner Name', type: 'string' },
    { name: 'transportProvider', title: 'Transport Provider', type: 'string' },
    { name: 'bookingUrl', title: 'Booking URL', type: 'url' }
  ]
};