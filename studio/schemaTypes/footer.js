export default {
  name: 'footer',
  title: 'Footer & CTA Section',
  type: 'document',
  fields: [
    { name: 'bgImage', title: 'Background Image', type: 'image', options: { hotspot: true } },
    { name: 'ctaHeading', title: 'CTA Heading', type: 'string' },
    { name: 'ctaSubheading', title: 'CTA Subheading', type: 'text' },
    { name: 'ctaButtonText', title: 'CTA Button Text', type: 'string' },
    { name: 'ctaLink', title: 'CTA Link', type: 'url' },
    { name: 'brandDescription', title: 'Brand Description', type: 'text' },
    { name: 'phone', title: 'Phone Number', type: 'string' },
    { name: 'email', title: 'Email Address', type: 'string' },
    // CHANGED: string type allows any text (no validation errors)
    { name: 'socialLinks', title: 'Social Links', type: 'array', of: [{ type: 'string' }] }, 
    { name: 'legalLinks', title: 'Legal Links', type: 'array', of: [{ type: 'string' }] },
    { name: 'navLinks', title: 'Navigation Links', type: 'array', of: [{ type: 'string' }] }
  ]
};