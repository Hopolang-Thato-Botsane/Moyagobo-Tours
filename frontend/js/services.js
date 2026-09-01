export const servicesData = [
  {
    number: "01.",
    title: "Airport & Regional Transfers",
    description: "Avoid the hassle of parking, delays, or last-minute bookings. Our Airport Transfer service ensures you arrive at your flight on time and return home comfortably. We monitor flight times, adjust for delays, and provide real-time updates so you're never left waiting.",
    tags: "On-time pickups | Flight monitoring | luggage assistance | 24/7 availability.",
    image: "./assets/images/service-1.jpg",
    buttonText: "Reserve Trip"
  },
  {
    number: "02.",
    title: "Curated Stay & Transfer Packages",
    description: "Experience the ultimate Lowveld getaway with our integrated travel bundles. We've partnered with the region's top resorts to offer seamless, all-in-one packages that handle both your luxury accommodation and your private ground transportation, ensuring a stress-free transition from the terminal to your suite.",
    tags: "Exclusive partner rates | Door-to-door coordination | Flight monitoring | luggage assistance | Bespoke itinerary management.",
    image: "./assets/images/service-2.jpg",
    buttonText: "Reserve Trip"
  },
  {
    number: "03.",
    title: "Executive & Corporate Transit",
    description: "When time matters and impressions count, we provide discreet, professional service for business travelers, VIPs, and event coordination. Our executive shuttles are meticulously maintained to provide a quiet, comfortable mobile office environment, allowing you to focus on your work while we handle the route.",
    tags: "Discreet & professional drivers | Business-class comfort | Monthly corporate billing | Priority dispatch | 24/7 availability.",
    image: "./assets/images/service-3.jpg",
    buttonText: "Reserve Trip"
  }
];

export function initServices(containerSelector) {
  const container = document.querySelector(containerSelector);
  if (!container) return;

  container.innerHTML = servicesData.map((service, index) => `
    <div class="service-card" style="top: calc(140px + ${index * 30}px);">
      <div class="service-content">
        <span class="service-number">${service.number}</span>
        <h3>${service.title}</h3>
        <p>${service.description}</p>
        <span class="service-tags">${service.tags}</span>
        <button class="ask-btn">${service.buttonText}</button>
      </div>
      <div class="service-image-wrapper">
        <img src="${service.image}" alt="${service.title}" />
      </div>
    </div>
  `).join('');
}