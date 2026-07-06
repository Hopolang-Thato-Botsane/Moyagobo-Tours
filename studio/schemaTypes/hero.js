export default {
  name: 'hero',
  title: 'Hero Section',
  type: 'document',
  fields: [
    { name: 'heading', type: 'string', title: 'Main Heading' },
    { name: 'subheading', type: 'text', title: 'Subheading Body' },
    { name: 'backgroundImage', type: 'image', title: 'Hero Background' },
    {
      name: 'ctaButtons',
      type: 'array',
      title: 'Action Buttons',
      of: [{
        type: 'object',
        fields: [
          { name: 'label', type: 'string', title: 'Button Label' },
          { name: 'type', type: 'string', title: 'Button Type', options: { list: ['primary', 'secondary'] } },
          { name: 'action', type: 'string', title: 'Action (e.g., booking-modal, contact-modal, url)' }
        ]
      }]
    },
    {
      name: 'navLinks',
      type: 'array',
      title: 'Navigation Links',
      of: [{ 
        type: 'object', 
        fields: [
          { name: 'label', type: 'string', title: 'Link Label' },
          { name: 'url', type: 'string', title: 'URL' }
        ] 
      }]
    }
  ]
}