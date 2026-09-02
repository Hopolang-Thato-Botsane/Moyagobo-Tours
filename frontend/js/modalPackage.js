import { packagesData } from './packages.js';
import { fleetData } from './fleet.js';

export function initPackageModal() {
    const modalOverlay = document.getElementById('reserve-package-modal');
    const packageTrack = document.getElementById('packageResortTrack');
    const fleetTrack = document.getElementById('packageFleetTrack');
    const form = document.querySelector('.package-form');
    const formView = document.querySelector('#reserve-package-modal .transfer-form-view');
    const successView = document.getElementById('packageSuccessView');
    const closeSuccessBtn = successView?.querySelector('.close-success-btn');
    const closeBtn = modalOverlay?.querySelector('.modal-close');
    const backBtn = modalOverlay?.querySelector('.modal-back-btn');
    const returnToggle = document.getElementById('returnTripToggle');
    const returnFields = document.getElementById('returnTripFields');

    if (!modalOverlay || !packageTrack || !fleetTrack) return;

    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';

    if (returnToggle && returnFields) {
        returnToggle.onchange = () => {
            returnFields.classList.toggle('active', returnToggle.checked);
        };
    }

    packageTrack.innerHTML = packagesData.map((pkg, index) => `
        <div class="package-card-option" data-package-index="${index}">
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
            </div>
        </div>
    `).join('');

    fleetTrack.innerHTML = fleetData.map(vehicle => `
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
            </div>
        </div>
    `).join('');

    let selectedPackage = null;
    let selectedVehicle = null;

    packageTrack.addEventListener('click', (e) => {
        const card = e.target.closest('.package-card-option');
        if (!card) return;
        packageTrack.querySelectorAll('.package-card-option').forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
        selectedPackage = packagesData[card.getAttribute('data-package-index')].title;
    });

    fleetTrack.addEventListener('click', (e) => {
        const card = e.target.closest('.fleet-card');
        if (!card) return;
        fleetTrack.querySelectorAll('.fleet-card').forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
        selectedVehicle = card.getAttribute('data-model');
    });

    const closeAndReset = () => {
        modalOverlay.classList.remove('active');
        document.body.style.overflow = '';
        setTimeout(() => {
            if (formView) formView.classList.remove('hidden');
            if (successView) successView.classList.remove('active');
            if (form) form.reset();
            if (returnToggle) returnToggle.checked = false;
            if (returnFields) returnFields.classList.remove('active');
            packageTrack.querySelectorAll('.package-card-option').forEach(c => c.classList.remove('selected'));
            fleetTrack.querySelectorAll('.fleet-card').forEach(c => c.classList.remove('selected'));
            selectedPackage = null;
            selectedVehicle = null;
        }, 300);
    };

    if (closeBtn) closeBtn.onclick = closeAndReset;
    if (backBtn) backBtn.onclick = closeAndReset;
    if (closeSuccessBtn) closeSuccessBtn.onclick = closeAndReset;

if (form) {
    form.onsubmit = (e) => {
        e.preventDefault();
        if (!selectedPackage || !selectedVehicle) {
            alert('Please select both a resort package and an executive vehicle configuration.');
            return;
        }

        // Gather all form inputs and selections into a final payload object
        const formData = {
            contactName: form.querySelector('input[placeholder="Full Name"]').value,
            email: form.querySelector('input[type="email"]').value,
            cellphone: form.querySelector('input[type="tel"]').value,
            pickup: form.querySelector('input[placeholder="Pickup Location"]').value,
            dropoff: form.querySelector('input[placeholder="Destination"]').value,
            passengers: form.querySelector('input[type="number"]').value,
            flightNumber: form.querySelector('input[placeholder*="BA"]').value,
            arrivalDate: form.querySelectorAll('input[type="date"]')[0].value,
            departureDate: form.querySelectorAll('input[type="date"]')[1].value,
            departureTime: form.querySelector('input[type="time"]').value,
            returnTripActive: returnToggle ? returnToggle.checked : false,
            returnDate: returnToggle?.checked ? returnFields.querySelector('input[type="date"]').value : null,
            returnTime: returnToggle?.checked ? returnFields.querySelector('input[type="time"]').value : null,
            finalDropoff: returnToggle?.checked ? returnFields.querySelector('input[placeholder="Return destination"]').value : null,
            selectedResort: selectedPackage,
            selectedVehicle: selectedVehicle
        };

        console.log("Submitting Package Quotation:", formData);

        if (formView) formView.classList.add('hidden');
        if (successView) successView.classList.add('active');
    };
}
}