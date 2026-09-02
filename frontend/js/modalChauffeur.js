import { fleetData } from './fleet.js';

export function initChauffeurModal() {
    const modalOverlay = document.getElementById('reserve-chauffeur-modal');
    const track = document.getElementById('chauffeurFleetTrack');
    const form = document.querySelector('.chauffeur-form');
    const formView = document.querySelector('#reserve-chauffeur-modal .transfer-form-view');
    const successView = document.getElementById('chauffeurSuccessView');
    const closeSuccessBtn = successView?.querySelector('.close-success-btn');
    const closeBtn = modalOverlay?.querySelector('.modal-close');
    const backBtn = modalOverlay?.querySelector('.modal-back-btn');

    if (!modalOverlay || !track) return;

    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';

    track.innerHTML = fleetData.map(vehicle => `
        <div class="fleet-card" data-model="${vehicle.model}">
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

    const closeAndResetModal = () => {
        modalOverlay.classList.remove('active');
        document.body.style.overflow = '';
        setTimeout(() => {
            if (formView) formView.classList.remove('hidden');
            if (successView) successView.classList.remove('active');
            if (form) form.reset();
            track.querySelectorAll('.fleet-card').forEach(c => c.classList.remove('selected'));
            selectedVehicle = null;
        }, 300);
    };

    if (closeBtn) closeBtn.onclick = closeAndResetModal;
    if (backBtn) backBtn.onclick = closeAndResetModal;

    if (form) {
        form.onsubmit = (e) => {
            e.preventDefault();

            if (!selectedVehicle) {
                alert('Please select a vehicle configuration for your chauffeur service.');
                return;
            }

            if (formView) formView.classList.add('hidden');
            if (successView) successView.classList.add('active');
        };
    }

    if (closeSuccessBtn) {
        closeSuccessBtn.onclick = closeAndResetModal;
    }
}