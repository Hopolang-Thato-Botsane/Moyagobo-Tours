export function initTransferModal() {
  const transferModal = document.getElementById('airport-transfer-modal');
  const selectionModal = document.getElementById('reservation-modal');
  
  if (!transferModal) return;

  transferModal.classList.add('active');
  document.body.style.overflow = 'hidden';

  const backBtn = transferModal.querySelector('.modal-back-btn');
  const closeBtn = transferModal.querySelector('.modal-close');
  const returnToggle = transferModal.querySelector('#return-trip-toggle');
  const returnContainer = transferModal.querySelector('#return-trip-container');

  const closeTransfer = () => {
    transferModal.classList.remove('active');
    document.body.style.overflow = '';
  };

  if (closeBtn) closeBtn.addEventListener('click', closeTransfer);
  
  transferModal.addEventListener('click', (e) => {
    if (e.target === transferModal) closeTransfer();
  });

  if (backBtn) {
    backBtn.addEventListener('click', () => {
      transferModal.classList.remove('active');
      if (selectionModal) selectionModal.classList.add('active');
    });
  }

  if (returnToggle && returnContainer) {
    // Sync state on open in case browser caches checkbox
    returnContainer.style.display = returnToggle.checked ? 'block' : 'none';

    returnToggle.addEventListener('change', () => {
      returnContainer.style.display = returnToggle.checked ? 'block' : 'none';
    });
  }
}

import { fleetData } from './fleet.js';

export function initModalFleet() {
    const track = document.getElementById('modalFleetTrack');
    const form = document.querySelector('.transfer-form');
    const formView = document.querySelector('.modal-content-step');
    const successView = document.getElementById('transferSuccessView');
    const closeSuccessBtn = document.querySelector('.close-success-btn');
    const modalOverlay = document.getElementById('airport-transfer-modal');

    if (!track) return;

    track.innerHTML = fleetData.map(vehicle => `
        <div class="fleet-card" data-model="${vehicle.model}" style="cursor: pointer;">
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

    let selectedVehicle = null;

    track.addEventListener('click', (e) => {
        const card = e.target.closest('.fleet-card');
        if (!card) return;

        track.querySelectorAll('.fleet-card').forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
        
        selectedVehicle = card.getAttribute('data-model');
        track.setAttribute('data-selected-vehicle', selectedVehicle);
    });

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            if (!selectedVehicle) {
                alert('Please select a vehicle from the fleet before submitting your quote request.');
                return;
            }

            if (formView) formView.classList.add('hidden');
            if (successView) successView.classList.add('active');
        });
    }

    if (closeSuccessBtn && modalOverlay) {
        closeSuccessBtn.addEventListener('click', () => {
            modalOverlay.classList.remove('active');
            setTimeout(() => {
                if (formView) formView.classList.remove('hidden');
                if (successView) successView.classList.remove('active');
                form.reset();
                track.querySelectorAll('.fleet-card').forEach(c => c.classList.remove('selected'));
                selectedVehicle = null;
            }, 300);
        });
    }
}