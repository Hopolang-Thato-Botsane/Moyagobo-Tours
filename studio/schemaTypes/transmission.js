export default {
  name: 'transmission',
  title: 'Transmission Page',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Partner Name',
      type: 'string'
    },
    {
      name: 'transportProvider',
      title: 'Transport Provider',
      type: 'string'
    },
    {
      name: 'bookingUrl',
      title: 'Booking URL',
      type: 'url'
    }
  ]
};