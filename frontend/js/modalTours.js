import { tourPackagesData } from './tourPackages.js';

export function initTourModal() {
    const modalOverlay = document.getElementById('reserve-tour-modal');
    const tourTrack = document.getElementById('tourPackageTrack');
    const form = document.querySelector('.tour-form');
    const formView = document.querySelector('#reserve-tour-modal .transfer-form-view');
    const successView = document.getElementById('tourSuccessView');
    const closeSuccessBtn = successView?.querySelector('.close-success-btn');
    const closeBtn = modalOverlay?.querySelector('.modal-close');
    const backBtn = modalOverlay?.querySelector('.modal-back-btn');

    if (!modalOverlay || !tourTrack) return;

    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';

    tourTrack.innerHTML = tourPackagesData.map((pkg, index) => `
        <div class="package-card-option" data-tour-index="${index}">
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
                    </div>
                </div>
            </div>
        </div>
    `).join('');

    let selectedTour = null;

    tourTrack.addEventListener('click', (e) => {
        const card = e.target.closest('.package-card-option');
        if (!card) return;
        tourTrack.querySelectorAll('.package-card-option').forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
        selectedTour = tourPackagesData[card.getAttribute('data-tour-index')].title;
    });

    const closeAndReset = () => {
        modalOverlay.classList.remove('active');
        document.body.style.overflow = '';
        setTimeout(() => {
            if (formView) formView.classList.remove('hidden');
            if (successView) successView.classList.remove('active');
            if (form) form.reset();
            tourTrack.querySelectorAll('.package-card-option').forEach(c => c.classList.remove('selected'));
            selectedTour = null;
        }, 300);
    };

    if (closeBtn) closeBtn.onclick = closeAndReset;
    if (backBtn) backBtn.onclick = closeAndReset;
    if (closeSuccessBtn) closeSuccessBtn.onclick = closeAndReset;

    if (form) {
        form.onsubmit = (e) => {
            e.preventDefault();
            if (!selectedTour) {
                alert('Please select a tour location/package option.');
                return;
            }

            const formData = {
                contactName: form.querySelector('input[placeholder="Full Name"]').value,
                email: form.querySelector('input[type="email"]').value,
                cellphone: form.querySelector('input[type="tel"]').value,
                pickup: form.querySelector('input[placeholder="Pickup Location"]').value,
                dropoff: form.querySelector('input[placeholder="Destination"]').value,
                passengers: form.querySelector('input[type="number"]').value,
                selectedTour: selectedTour
            };

            console.log("Submitting Tour Quotation:", formData);

            if (formView) formView.classList.add('hidden');
            if (successView) successView.classList.add('active');
        };
    }
}