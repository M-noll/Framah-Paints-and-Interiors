// 1. List of your project photos
const workImages = [
    { src: 'images/work1.jpg', alt: 'Exterior Painting', category: 'Painting' },
    { src: 'images/work2.jpg', alt: 'Interior Painting', category: 'Painting' },
    { src: 'images/work3.jpg', alt: 'Gypsum Design', category: 'Gypsum' },
    { src: 'images/work4.jpg', alt: 'Tile Installation', category: 'Tiles' },
    { src: 'images/work5.jpg', alt: 'Cabinetry', category: 'Fittings' },
    { src: 'images/work6.jpg', alt: 'Exterior Paint', category: 'Painting' },
];
// 2. Element Selectors
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');
const galleryWrapper = document.getElementById('gallery-wrapper');
const seeMoreBtn = document.getElementById('see-more-btn');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxCaption = document.getElementById('lightbox-caption');
const closeBtn = document.getElementById('lightbox-close');
// 3. Mobile Toggle
if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('is-active');
    });
}

// 4. Build Gallery
function initGallery() {
    if (!galleryWrapper) return;
    galleryWrapper.innerHTML = "";
    workImages.forEach((img, index) => {
        const div = document.createElement('div');
        div.className = index >= 3 ? 'gallery-item extra-photos' : 'gallery-item';
        div.innerHTML = `
            <img src="${img.src}" alt="${img.alt}" class="gallery-image" data-full="${img.src}">
            <p style="padding:10px; font-size:0.8rem; text-transform:uppercase;
            margin-top: 5px; font-weight: bold;">${img.category}</p>
        `;
        galleryWrapper.appendChild(div);
    });
    setupLightbox();
}
 
 // 5. Lightbox logic
function setupLightbox() {
    const images = document.querySelectorAll('.gallery-image');
    images.forEach(img => {
        img.onclick = () => {
            lightbox.style.display = 'flex';
            lightboxImg.src = img.getAttribute('data-full');
            lightboxCaption.innerText = img.alt;
            document.body.style.overflow = 'hidden';
        };
    });
}
function closeBox() {
    if (lightbox) {
        lightbox.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Close listeners
if (closeBtn) closeBtn.onclick = closeBox;
if (lightbox) {
    lightbox.onclick = (e) => { if (e.target !== lightboxImg) closeBox(); };
}
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeBox();
});

// 6. See More Logic
if (seeMoreBtn) {
    seeMoreBtn.onclick = () => {
        const extras = document.querySelectorAll('.extra-photos');
        const isShowing = seeMoreBtn.innerText === "Show Less";
        
        extras.forEach(el => el.classList.toggle('show'));
        seeMoreBtn.innerText = isShowing ? "See More" : "Show Less";
    };
}
// 7. Initialize everything on Page Load
document.addEventListener('DOMContentLoaded', () => {
    initGallery();
});