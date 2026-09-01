export const faqData = [
  {
    number: "1.",
    question: "How do airport pickups work if my flight is delayed?",
    answer: "We monitor flight arrival times in real-time, so your driver adjusts automatically to meet you whenever you land, at no extra waiting fee."
  },
  {
    number: "2.",
    question: "What vehicles are available in your executive fleet?",
    answer: "Our fleet features late-model Mercedes-Benz vehicles, including the C-Class executive sedan, the spacious GLE luxury SUV, and the versatile B-Class MPV—all equipped with complimentary high-speed Wi-Fi and climate control."
  },
  {
    number: "3.",
    question: "Are your tours and excursions fully guided?",
    answer: "Yes. All regional excursions, from Kruger safaris to Panorama Route tours, are led by certified, professional local guides to ensure an immersive and secure experience."
  },
  {
    number: "4.",
    question: "Can I request custom itineraries or multi-stop travel?",
    answer: "Absolutely. You can add specific requirements or flight details directly into the booking notes, and our team will tailor the logistics to your exact schedule."
  },
  {
    number: "5.",
    question: "What is the cancellation policy for bookings?",
    answer: "We offer flexible rescheduling and cancellation options up to 48 hours before your scheduled arrival or transfer time."
  },
  {
    number: "6.",
    question: "Do you provide child seats for family vehicle transfers?",
    answer: "Yes, premium child safety seats are available upon request for any of our executive vehicles at no additional charge. Please specify your requirements in the booking notes."
  },
  {
    number: "7.",
    question: "What payment methods are accepted for reservations?",
    answer: "We accept all major credit cards, secure online EFT payments, and direct corporate invoicing for approved business accounts."
  },
  {
    number: "8.",
    question: "How do I track my assigned driver upon arrival?",
    answer: "Once your transfer is confirmed, you will receive real-time driver tracking details and direct contact information via SMS and email prior to your flight landing."
  }
];

export function initFAQs(containerSelector) {
  const container = document.querySelector(containerSelector);
  if (!container) return;

  container.innerHTML = faqData.map((item, index) => `
    <div class="faq-item" data-index="${index}">
      <div class="faq-question-row">
        <span class="faq-text"><strong>${item.number}</strong> ${item.question}</span>
        <button class="faq-toggle-btn" aria-label="Toggle answer">+</button>
      </div>
      <div class="faq-answer-container" style="display: none;">
        <p class="faq-answer">${item.answer}</p>
      </div>
      <hr class="faq-divider">
    </div>
  `).join('');

  container.querySelectorAll('.faq-item').forEach(item => {
    const btn = item.querySelector('.faq-toggle-btn');
    const answerContainer = item.querySelector('.faq-answer-container');

    item.addEventListener('click', () => {
      const isOpen = answerContainer.style.display === 'block';

      answerContainer.style.display = isOpen ? 'none' : 'block';
      btn.textContent = isOpen ? '+' : '–';
      item.classList.toggle('active', !isOpen);
    });
  });
}