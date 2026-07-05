const SANITY_CONFIG = {
    projectId: "426v8vnp",
    dataset: "production",
    apiVersion: "2026-06-01"
};

// Helper to build image URL from Sanity asset reference
function urlFor(assetRef) {
    const parts = assetRef.split('-');
    return `https://cdn.sanity.io/images/${SANITY_CONFIG.projectId}/${SANITY_CONFIG.dataset}/${parts[1]}-${parts[2]}.${parts[3]}`;
}

// About/Services
async function fetchAboutServices() {
    // Note: We are now explicitly querying for the logo asset reference
    const query = encodeURIComponent('*[_type == "aboutServices"][0]{heading, bodyText, servicesList, "logoRef": logo.asset._ref}');
    const url = `https://${SANITY_CONFIG.projectId}.api.sanity.io/v${SANITY_CONFIG.apiVersion}/data/query/${SANITY_CONFIG.dataset}?query=${query}`;
    
    try {
        const response = await fetch(url);
        const data = await response.json();
        const content = data.result;

        document.querySelector('.about-services-heading').textContent = content.heading;
        document.querySelector('.about-services-body').textContent = content.bodyText;
        
        // Populate Logo
        if (content.logoRef) {
            document.querySelector('.brand-side img').src = urlFor(content.logoRef);
        }
        
        const listEl = document.querySelector('.services-list');
        listEl.innerHTML = content.servicesList.map(item => `<li>${item}</li>`).join('');
    } catch (e) { console.error("Error in fetchAboutServices:", e); }
}

fetchAboutServices();

// Testimonial
let currentIndex = 0;
let testimonialsData = [];

async function fetchTestimonials() {
    const query = encodeURIComponent('*[_type == "testimonial"]');
    const url = `https://${SANITY_CONFIG.projectId}.api.sanity.io/v${SANITY_CONFIG.apiVersion}/data/query/${SANITY_CONFIG.dataset}?query=${query}`;
    
    try {
        const response = await fetch(url);
        const data = await response.json();
        testimonialsData = data.result;
        
        if (testimonialsData && testimonialsData.length > 0) {
            updateDisplay();
            createPagination();
        }
    } catch (error) {
        console.error("Fetch Error:", error);
    }
}

function updateDisplay() {
    const t = testimonialsData[currentIndex];
    document.querySelector('.quote').textContent = `"${t.text}"`;
    document.querySelector('.author-name').textContent = t.author;
    document.querySelector('.author-role').textContent = t.role;
    
    const starContainer = document.querySelector('.stars');
    starContainer.innerHTML = '★'.repeat(t.rating);
    
    document.querySelectorAll('.dot').forEach((dot, index) => {
        dot.classList.toggle('active', index === currentIndex);
    });
}

function createPagination() {
    const container = document.querySelector('.pagination-dots');
    container.innerHTML = '';
    testimonialsData.forEach((_, index) => {
        const dot = document.createElement('span');
        dot.classList.add('dot');
        dot.onclick = () => { currentIndex = index; updateDisplay(); };
        container.appendChild(dot);
    });
}

document.querySelector('.prev-btn').onclick = () => {
    currentIndex = (currentIndex > 0) ? currentIndex - 1 : testimonialsData.length - 1;
    updateDisplay();
};

document.querySelector('.next-btn').onclick = () => {
    currentIndex = (currentIndex < testimonialsData.length - 1) ? currentIndex + 1 : 0;
    updateDisplay();
};

fetchTestimonials();

async function fetchFooterData() {
    const query = encodeURIComponent('*[_type == "footer"][0]');
    const url = `https://${SANITY_CONFIG.projectId}.api.sanity.io/v${SANITY_CONFIG.apiVersion}/data/query/${SANITY_CONFIG.dataset}?query=${query}`;
    
    try {
        const response = await fetch(url);
        const data = await response.json();
        const footer = data.result;

        if (!footer) return;

        // FIX: Inject background image correctly
        if (footer.bgImage && footer.bgImage.asset) {
            const bgUrl = urlFor(footer.bgImage.asset._ref);
            document.getElementById('footer-section').style.backgroundImage = `url('${bgUrl}')`;
        }

        const update = (id, value) => {
            const el = document.getElementById(id);
            if (el && value) el.textContent = value;
        };

        update('cta-heading', footer.ctaHeading);
        update('cta-subheading', footer.ctaSubheading);
        update('brand-desc', footer.brandDescription);
        update('footer-phone', footer.phone);
        update('footer-email', footer.email);

        // Populate lists
        if (footer.legalLinks) document.getElementById('legal-list').innerHTML = footer.legalLinks.map(l => `<li>${l}</li>`).join('');
        if (footer.navLinks) document.getElementById('nav-list').innerHTML = footer.navLinks.map(l => `<li>${l}</li>`).join('');

        const btn = document.getElementById('cta-btn');
        if (btn && footer.ctaLink) btn.onclick = () => window.location.href = footer.ctaLink;

    } catch (e) { console.error("Footer fetch error:", e); }
}

fetchFooterData();