import { initTransferModal } from './modalTransfer.js';
import { initChauffeurModal } from './modalChauffeur.js';
import { initPackageModal } from './modalStays.js';
import { initTourModal } from './modalTours.js';

export function initModal() {
  const triggerBtns = document.querySelectorAll('.reserve-btn, .ask-btn, .footer-reserve-btn');
  const modalOverlay = document.getElementById('reservation-modal');
  const closeBtn = document.querySelector('.modal-close');
  const optionCards = document.querySelectorAll('.modal-option-card');

  if (!modalOverlay) return;

  triggerBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      modalOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  const closeModal = () => {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
  };

  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  }

  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
      closeModal();
    }
  });

  optionCards.forEach(card => {
    card.addEventListener('click', () => {
      const service = card.getAttribute('data-service');
      console.log(`Selected service: ${service}`);
      
      if (service === 'airport-transfer') {
        modalOverlay.classList.remove('active');
        initTransferModal();
      }

      if (service === 'book-chauffeur' || service === 'chauffeur') {
        modalOverlay.classList.remove('active');
        initChauffeurModal();
      }

      if (service === 'stay-transfer' || service === 'packages') {
        modalOverlay.classList.remove('active');
        initPackageModal();
      }

      if (service === 'regional-tours') {
        modalOverlay.classList.remove('active');
        initTourModal();
      }
    });
  });
}