export default {
  name: 'hero',
  title: 'Hero Section',
  type: 'document',
  fields: [
    {
      name: 'slides',
      title: 'Hero Slides',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'heading', type: 'string', title: 'Heading' },
          { name: 'subheading', type: 'text', title: 'Subheading' },
          { name: 'image', type: 'image', title: 'Background Image' },
          { name: 'price', type: 'string', title: 'Price Tag' }
        ]
      }]
    }
  ]
}