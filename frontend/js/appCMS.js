const SANITY_CONFIG = {
    projectId: "426v8vnp",
    dataset: "production",
    apiVersion: "2026-06-01"
};

function urlFor(assetRef) {
    const parts = assetRef.split('-');
    return `https://cdn.sanity.io/images/${SANITY_CONFIG.projectId}/${SANITY_CONFIG.dataset}/${parts[1]}-${parts[2]}.${parts[3]}`;
}

// 0. Hero Fetch Logic
async function fetchHero() {
    const query = encodeURIComponent('*[_type == "hero"][0]');
    const url = `https://${SANITY_CONFIG.projectId}.api.sanity.io/v${SANITY_CONFIG.apiVersion}/data/query/${SANITY_CONFIG.dataset}?query=${query}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        const hero = data.result;

        if (!hero) { console.warn("No Hero data found in CMS."); return; }
        
        console.log("Hero Data Received:", hero);

        // Text
        document.getElementById('hero-heading').textContent = hero.heading;
        document.getElementById('hero-subheading').textContent = hero.subheading;

        // Background
        const bgLayer = document.getElementById('hero-bg-layer');
        if (bgLayer && hero.backgroundImage?.asset?._ref) {
            const baseUrl = `https://cdn.sanity.io/images/${SANITY_CONFIG.projectId}/${SANITY_CONFIG.dataset}/`;
            const ref = hero.backgroundImage.asset._ref;
            const imgUrl = ref.replace('image-', '').replace('-jpg', '.jpg').replace('-png', '.png');
            bgLayer.style.backgroundImage = `url('${baseUrl}${imgUrl}')`;
        } else {
            console.warn("Background image reference missing.");
        }

        // CTAs
        const actionContainer = document.querySelector('.hero-actions');
        if (actionContainer && hero.ctaButtons) {
            actionContainer.innerHTML = hero.ctaButtons.map(btn => 
                `<button class="cta-${btn.type}" data-action="${btn.action}">${btn.label}</button>`
            ).join('');
        }
    } catch (e) { console.error("Hero render error:", e); }
}

// 1. About/Services
async function fetchAboutServices() {
    const query = encodeURIComponent('*[_type == "aboutServices"][0]{heading, bodyText, servicesList, "logoRef": logo.asset._ref}');
    const url = `https://${SANITY_CONFIG.projectId}.api.sanity.io/v${SANITY_CONFIG.apiVersion}/data/query/${SANITY_CONFIG.dataset}?query=${query}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        const content = data.result;
        document.querySelector('.about-services-heading').textContent = content.heading;
        document.querySelector('.about-services-body').textContent = content.bodyText;
        if (content.logoRef) document.querySelector('.brand-side img').src = urlFor(content.logoRef);
        document.querySelector('.services-list').innerHTML = content.servicesList.map(item => `<li>${item}</li>`).join('');
    } catch (e) { console.error("Error in fetchAboutServices:", e); }
}

// 2. Offers



// 3. Fleet Section
let currentFleetIndex = 0;
let fleetData = [];

async function fetchFleet() {
    const query = encodeURIComponent('*[_type == "fleet"][0].vehicles');
    const url = `https://${SANITY_CONFIG.projectId}.api.sanity.io/v${SANITY_CONFIG.apiVersion}/data/query/${SANITY_CONFIG.dataset}?query=${query}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        fleetData = data.result;

        const updateFleetUI = () => {
            const vehicle = fleetData[currentFleetIndex];
            document.getElementById('vehicle-class').textContent = vehicle.className;
            document.getElementById('vehicle-image').src = urlFor(vehicle.vehicleImage.asset._ref);
            document.getElementById('vehicle-specs').textContent = vehicle.specs;
            document.querySelectorAll('.pagination-dots .dot').forEach((dot, idx) => {
                dot.classList.toggle('active', idx === currentFleetIndex);
            });
        };

        // Create Pagination
        const container = document.querySelector('.pagination-dots');
        container.innerHTML = '';
        fleetData.forEach((_, index) => {
            const dot = document.createElement('span');
            dot.classList.add('dot');
            dot.onclick = () => { currentFleetIndex = index; updateFleetUI(); };
            container.appendChild(dot);
        });

        // Click Logic
        document.querySelector('.next-arrow').onclick = () => {
            currentFleetIndex = (currentFleetIndex + 1) % fleetData.length;
            updateFleetUI();
        };
        document.querySelector('.prev-arrow').onclick = () => {
            currentFleetIndex = (currentFleetIndex - 1 + fleetData.length) % fleetData.length;
            updateFleetUI();
        };

        // --- MOBILE SWIPE LOGIC ---
        let touchStartX = 0;
        const carousel = document.querySelector('.carousel-container');

        carousel.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, {passive: true});

        carousel.addEventListener('touchend', (e) => {
            const touchEndX = e.changedTouches[0].screenX;
            const diff = touchStartX - touchEndX;
            if (Math.abs(diff) > 50) { // Only trigger if swipe is significant
                if (diff > 0) { // Swiped Left
                    currentFleetIndex = (currentFleetIndex + 1) % fleetData.length;
                } else { // Swiped Right
                    currentFleetIndex = (currentFleetIndex - 1 + fleetData.length) % fleetData.length;
                }
                updateFleetUI();
            }
        }, {passive: true});

        updateFleetUI();
    } catch (e) { console.error("Fleet fetch error:", e); }
}

// 4. Testimonial Section
let currentTestimonialsIndex = 0;
let testimonialsData = [];

async function fetchTestimonials() {
    const query = encodeURIComponent('*[_type == "testimonial"]');
    const url = `https://${SANITY_CONFIG.projectId}.api.sanity.io/v${SANITY_CONFIG.apiVersion}/data/query/${SANITY_CONFIG.dataset}?query=${query}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        testimonialsData = data.result;
        if (testimonialsData && testimonialsData.length > 0) {
            updateTestimonialDisplay();
            createPagination();
        }
    } catch (error) { console.error("Testimonial Fetch Error:", error); }
}

function updateTestimonialDisplay() {
    const t = testimonialsData[currentTestimonialsIndex];
    document.querySelector('.quote').textContent = `"${t.text}"`;
    document.querySelector('.author-name').textContent = t.author;
    document.querySelector('.author-role').textContent = t.role;
    document.querySelector('.stars').innerHTML = '★'.repeat(t.rating);
    document.querySelectorAll('.testimonial-section .dot').forEach((dot, index) => {
        dot.classList.toggle('active', index === currentTestimonialsIndex);
    });
}

function createPagination() {
    const container = document.querySelector('.testimonial-section .pagination-dots');
    container.innerHTML = '';
    testimonialsData.forEach((_, index) => {
        const dot = document.createElement('span');
        dot.classList.add('dot');
        dot.onclick = () => { currentTestimonialsIndex = index; updateTestimonialDisplay(); };
        container.appendChild(dot);
    });
}

document.querySelector('.prev-btn').onclick = () => {
    currentTestimonialsIndex = (currentTestimonialsIndex > 0) ? currentTestimonialsIndex - 1 : testimonialsData.length - 1;
    updateTestimonialDisplay();
};

document.querySelector('.next-btn').onclick = () => {
    currentTestimonialsIndex = (currentTestimonialsIndex < testimonialsData.length - 1) ? currentTestimonialsIndex + 1 : 0;
    updateTestimonialDisplay();
};

// 5. Footer Section
async function fetchFooterData() {
    const query = encodeURIComponent('*[_type == "footer"][0]');
    const url = `https://${SANITY_CONFIG.projectId}.api.sanity.io/v${SANITY_CONFIG.apiVersion}/data/query/${SANITY_CONFIG.dataset}?query=${query}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        const footer = data.result;
        if (!footer) return;
        if (footer.bgImage && footer.bgImage.asset) {
            document.getElementById('footer-section').style.backgroundImage = `url('${urlFor(footer.bgImage.asset._ref)}')`;
        }
        const update = (id, value) => { const el = document.getElementById(id); if (el && value) el.textContent = value; };
        update('cta-heading', footer.ctaHeading);
        update('cta-subheading', footer.ctaSubheading);
        update('brand-desc', footer.brandDescription);
        update('footer-phone', footer.phone);
        update('footer-email', footer.email);
        if (footer.legalLinks) document.getElementById('legal-list').innerHTML = footer.legalLinks.map(l => `<li>${l}</li>`).join('');
        if (footer.navLinks) document.getElementById('nav-list').innerHTML = footer.navLinks.map(l => `<li>${l}</li>`).join('');
        if (footer.ctaLink) document.getElementById('cta-btn').onclick = () => window.location.href = footer.ctaLink;
    } catch (e) { console.error("Footer fetch error:", e); }
}

// Initialization
fetchHero();
fetchAboutServices();
fetchFleet();
fetchTestimonials();
fetchFooterData();

// Transmission

async function fetchTransmissionData() {
    const container = document.getElementById('transmission-page');
    if (!container) return;

    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    if (!id) return;

    const query = encodeURIComponent(`*[_type == "partner" && _id == "${id}"][0]`);
    const url = `https://${SANITY_CONFIG.projectId}.api.sanity.io/v${SANITY_CONFIG.apiVersion}/data/query/${SANITY_CONFIG.dataset}?query=${query}`;

    try {
        const response = await fetch(url);
        const { result } = await response.json();

        document.getElementById('partner-name').textContent = result.name;
        document.getElementById('transport-provider').textContent = result.transportProvider;

        document.getElementById('proceed-btn').onclick = () => {
            window.location.href = result.bookingUrl;
        };
    } catch (e) { console.error("Transmission fetch error:", e); }
}

fetchTransmissionData()