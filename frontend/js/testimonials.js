// js/testimonials.js
export const testimonialData = [
  {
    quote: "The airport transfer was completely seamless. Even with our flight delay, our driver was right there waiting for us. Absolute lifesaver.",
    name: "Sarah L",
    role: "Leisure Traveler"
  },
  {
    quote: "As a concierge, I need transport partners I can blindly trust with VIP clients. Voyant has never missed a beat.",
    name: "James R",
    role: "Concierge Manager"
  },
  {
    quote: "Clean executive vehicles, pristine interiors, and a driver who actually knew the best regional routes. Worth every single rand.",
    name: "Michael K",
    role: "Business Traveler"
  },
  {
    quote: "Working with the team has been a game-changer for our resort guests. Reliable, professional, and always on time.",
    name: "Hotel Partner",
    role: "Sun Valley Lodge"
  },
  {
    quote: "Safe, comfortable, and incredibly punctual. It made our family holiday stress-free right from the moment we touched down.",
    name: "The van Der Merwe Family",
    role: "Vacationers"
  },
  {
    quote: "Booking our stay package and private transfer together saved us so much coordination hassle. Flawless execution from start to finish.",
    name: "David & Emma T",
    role: "Vacationers"
  }
];

export function initTestimonials(trackSelector) {
  const track = document.querySelector(trackSelector);
  if (!track) return;

  const wrapper = track.closest('.testimonials-sticky-wrapper');
  if (!wrapper) return;

  track.innerHTML = testimonialData.map(item => `
    <div class="review-card">
      <p>"${item.quote}"</p>
      <div class="reviewer-info">
        <div class="avatar"></div>
        <div>
          <strong>${item.name}</strong>
          <span>${item.role}</span>
        </div>
      </div>
    </div>
  `).join('');

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
    // Disable desktop scroll-jacking behavior on mobile screens (width <= 1024px)
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
    if (scrolled >= 0 && scrolled <= scrollableDistance) {
      progress = scrolled / scrollableDistance;
    } else if (scrolled > scrollableDistance) {
      progress = 1;
    }

    const maxTranslate = track.scrollWidth - (track.parentElement.clientWidth - 350);
    targetTranslate = -progress * Math.max(0, maxTranslate);

    if (!isTicking) {
      isTicking = true;
      requestAnimationFrame(render);
    }
  }

  window.addEventListener('scroll', updateScroll, { passive: true });
  window.addEventListener('resize', updateScroll, { passive: true });
  updateScroll();
}