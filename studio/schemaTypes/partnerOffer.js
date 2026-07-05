export const partnerOffer = {
  name: 'partnerOffer',
  title: 'Partner Offers',
  type: 'document',
  fields: [
    { name: 'title', title: 'Title', type: 'string' },
    { name: 'location', title: 'Location', type: 'string' },
    { name: 'description', title: 'Description', type: 'text' },
    { name: 'price', title: 'Price', type: 'string' },
    { name: 'rating', title: 'Rating', type: 'number' },
    { name: 'image', title: 'Image', type: 'image', options: { hotspot: true } },
    { name: 'partnerUrl', title: 'Booking URL', type: 'url' }
  ]
};