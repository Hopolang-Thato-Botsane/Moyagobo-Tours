export const packagesData = [
  {
    title: "Singita Lebombo Lodge",
    description: "Perched dramatically into the cliffs above the N'wanetsi River, experience unmatched wildlife viewing paired with striking minimalist architecture.",
    price: "R 12,500",
    rating: "4.9",
    tags: ["Luxury Villa", "Wildlife", "All Inclusive"],
    image: "./assets/images/package-1.jpg"
  },
  {
    title: "White River Manor Sanctuary",
    description: "A tranquil five-star sanctuary set within a historic heritage garden, offering secluded luxury and holistic rejuvenation just outside Nelspruit.",
    price: "R 3,450",
    rating: "4.8",
    tags: ["Garden Estate", "Wellness", "Boutique Stay"],
    image: "./assets/images/package-2.jpg"
  },
  {
    title: "Camp Jabulani Wilderness Villa",
    description: "An exclusive-use style retreat blending supreme elegance with untamed nature, featuring bespoke dining under the Lowveld stars.",
    price: "R 8,900",
    rating: "4.9",
    tags: ["Private Villa", "Bush Retreat", "Exquisite Dining"],
    image: "./assets/images/package-3.jpg"
  },
  {
    title: "The Leonardo Sandton Suites",
    description: "Soaring above the financial capital, offering floor-to-ceiling glass windows, high-design interiors, and elite metropolitan convenience.",
    price: "R 2,850",
    rating: "4.7",
    tags: ["City Skyline", "Executive", "Penthouse Living"],
    image: "./assets/images/package-4.jpg"
  },
  {
    title: "Oliver's Restaurant & Lodge",
    description: "Old-world European charm meets subtle African warmth on the edge of the White River golf estate, featuring world-class culinary experiences.",
    price: "R 2,100",
    rating: "4.8",
    tags: ["Country House", "Wine & Dine", "Scenic Views"],
    image: "./assets/images/package-5.jpg"
  },
  {
    title: "Thulani Pods & Canyon Retreat",
    description: "Ultra-modern architectural glass pods nestled into the mountainside, offering sweeping panoramic vistas of the world's largest green canyon.",
    price: "R PRICE",
    rating: "4.9",
    tags: ["Eco-Luxury", "Mountain Views", "Stargazing"],
    image: "./assets/images/package-6.jpg"
  }
];

export function initPackages(containerSelector) {
  const container = document.querySelector(containerSelector);
  if (!container) return;

  container.innerHTML = packagesData.map(pkg => `
    <div class="package-card">
      <div class="package-bg" style="background-image: url('${pkg.image}');"></div>
      <div class="package-overlay"></div>
      <div class="package-top">
        <span class="package-rating">★ ${pkg.rating}</span>
        <div class="package-tags">
          ${pkg.tags.map(tag => `<span>${tag}</span>`).join('')}
        </div>
      </div>
      <div class="package-info">
        <div class="package-text">
          <h3>${pkg.title}</h3>
          <p>${pkg.description}</p>
          <div class="package-pricing">
            <span class="price">${pkg.price}</span>
            <span class="price-sub">P/P Per Night</span>
          </div>
        </div>
        <button class="book-exp-btn">Book Experience</button>
      </div>
    </div>
  `).join('');
}