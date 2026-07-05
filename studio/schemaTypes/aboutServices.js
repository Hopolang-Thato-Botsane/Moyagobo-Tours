export const aboutServices = {
  name: 'aboutServices',
  title: 'About & Services',
  type: 'document',
  fields: [
    { name: 'heading', title: 'Heading', type: 'string' },
    { 
        name: 'logo', 
        title: 'Company Logo', 
        type: 'image',
        options: { hotspot: true } 
    },
    { name: 'bodyText', title: 'Mission Statement', type: 'text' },
    { name: 'servicesList', title: 'Services List', type: 'array', of: [{ type: 'string' }] }
  ]
};