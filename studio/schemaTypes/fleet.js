export default {
  name: 'fleet',
  title: 'Fleet Showcase',
  type: 'document',
  fields: [
    {
      name: 'vehicles',
      title: 'Vehicle List',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'className', type: 'string', title: 'Class Name (e.g. A-Class)' },
          { name: 'vehicleImage', type: 'image', title: 'Vehicle Image' },
          { name: 'specs', type: 'string', title: 'Feature Summary' }
        ]
      }]
    }
  ]
}