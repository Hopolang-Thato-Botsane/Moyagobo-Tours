// js/fleet.js
// js/fleet.js
export const fleetData = [
  {
    brand: "Mercedes-Benz",
    model: "C-CLASS",
    type: "Medium size sedan suitable for executive travel",
    image: "./public/assets/vehicles/c-class.png",
    specs: [
      { icon: "🧳", text: "2 Large Bags" },
      { icon: "👥", text: "3 Passengers" },
      { icon: "📶", text: "Free Wi-Fi" }
    ]
  },
  {
    brand: "Mercedes-Benz",
    model: "B-CLASS",
    type: "Four seater MPV suitable for small families or individual travel",
    image: "./public/assets/vehicles/b-class.png",
    specs: [
      { icon: "🧳", text: "3 Large Bags" },
      { icon: "👥", text: "4 Passengers" },
      { icon: "📶", text: "Free Wi-Fi" }
    ]
  },
  {
    brand: "Mercedes-Benz",
    model: "GLE",
    type: "Seven seater SUV suitable for medium sized families",
    image: "./public/assets/vehicles/gle.png",
    specs: [
      { icon: "🧳", text: "4 Large Bags" },
      { icon: "👥", text: "4 to 5 Passengers" },
      { icon: "📶", text: "Free Wi-Fi" },
      { icon: "🏔️", text: "All-Terrain Capable" }
    ]
  }
];

export function initFleet(trackSelector) {
  const track = document.querySelector(trackSelector);
  if (!track) return;

  track.innerHTML = fleetData.map(vehicle => `
    <div class="fleet-card">
      <div class="fleet-info-top">
        <span class="fleet-brand">${vehicle.brand}</span>
        <h2 class="fleet-model">${vehicle.model}</h2>
      </div>
      <div class="fleet-image-container">
        <img src="${vehicle.image}" alt="${vehicle.brand} ${vehicle.model}" />
      </div>
      <div class="fleet-details">
        <p class="fleet-type">${vehicle.type}</p>
        <div class="fleet-specs">
          ${vehicle.specs.map(spec => `
            <div class="spec-item">
              <span>${spec.icon}</span>
              <span>${spec.text}</span>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `).join('');

  const wrapper = track.closest('.fleet-sticky-wrapper');
  if (!wrapper) return;

  let currentTranslate = 0;
  let targetTranslate = 0;
  let isTicking = false;

  function render() {
    currentTranslate += (targetTranslate - currentTranslate) * 0.1;
    
    track.style.transform = `translateX(${currentTranslate}px)`;

    if (Math.abs(targetTranslate - currentTranslate) > 0.05) {
      requestAnimationFrame(render);
    } else {
      isTicking = false;
    }
  }

  function updateScroll() {
    if (window.innerWidth <= 1024) {
      track.style.transform = 'none';
      return;
    }

    const rect = wrapper.getBoundingClientRect();
    const wrapperHeight = wrapper.offsetHeight;
    const windowHeight = window.innerHeight;

    const scrollableDistance = wrapperHeight - windowHeight;
    const scrolled = -rect.top;

    let progress = 0;
    let progress = 0;
    if (scrolled >= 0 && scrolled <= scrollableDistance) {
      progress = scrolled / scrollableDistance;
    } else if (scrolled > scrollableDistance) {
      progress = 1;
    }

    const maxTranslate = track.scrollWidth - track.clientWidth;
    targetTranslate = -progress * maxTranslate;

    if (!isTicking) {
      isTicking = true;
      requestAnimationFrame(render);
    }
  }

  window.addEventListener('scroll', updateScroll, { passive: true });
  window.addEventListener('resize', updateScroll, { passive: true });
  
  updateScroll();
      progress = scrolled / scrollableDistance;
    } else if (scrolled > scrollableDistance) {
      progress = 1;
    }

    const maxTranslate = track.scrollWidth - track.clientWidth;
    targetTranslate = -progress * maxTranslate;

    if (!isTicking) {
      isTicking = true;
      requestAnimationFrame(render);
    }
  }

  window.addEventListener('scroll', updateScroll, { passive: true });
  window.addEventListener('resize', updateScroll, { passive: true });
  
  updateScroll();
}