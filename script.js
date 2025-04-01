// Global variables
let currentImageIndex = 0;
let galleryImages = [];
let portfolioImages = [];

// GitHub repository configuration
const GITHUB_REPO = 'GB-Server/MyGhibliArtServer';
const GITHUB_BRANCH = 'main'; // or 'master' depending on your default branch

// Theme management
const themes = [
    { name: 'totoro', label: 'Totoro' },
    { name: 'spirited-away', label: 'Spirited Away' },
    { name: 'mononoke', label: 'Princess Mononoke' },
    { name: 'howl', label: "Howl's Moving Castle" },
    { name: 'dark-totoro', label: 'Dark Totoro' },
    { name: 'dark-spirited', label: 'Dark Spirited Away' }
];

let currentThemeIndex = 0;

function initTheme() {
    const savedTheme = localStorage.getItem('ghibli-theme');
    if (savedTheme) {
        currentThemeIndex = themes.findIndex(theme => theme.name === savedTheme);
        if (currentThemeIndex === -1) currentThemeIndex = 0;
    }
    applyTheme();
}

function applyTheme() {
    document.documentElement.setAttribute('data-theme', themes[currentThemeIndex].name);
    localStorage.setItem('ghibli-theme', themes[currentThemeIndex].name);
}

function cycleTheme() {
    currentThemeIndex = (currentThemeIndex + 1) % themes.length;
    applyTheme();
}

// Loading screen
window.addEventListener('load', () => {
    const loadingScreen = document.querySelector('.loading-screen');
    setTimeout(() => {
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }, 2000);
});

// Load character description
function loadCharacterDescription() {
    const description = `Welcome to my Ghibli-inspired world! I am a spirited character who loves exploring the magical realms of imagination. With a heart full of wonder and a spirit as free as the wind, I find joy in capturing the essence of Ghibli's enchanting universe through my lens.

My journey through this magical world has taught me to see beauty in the ordinary and magic in the everyday. Each photograph I take is a window into a world where dreams come alive and imagination knows no bounds.

As a Ghibli character, I believe in the power of friendship, the importance of protecting nature, and the magic that exists in every corner of our world. Through my photography, I aim to share these values and inspire others to see the world through the eyes of wonder and possibility.`;

    document.querySelector('.character-description').textContent = description;
}

// Load character image
function loadCharacterImage() {
    const characterImage = document.querySelector('.character-image');
    characterImage.style.backgroundImage = 'url("Home-Media/character-image.jpg")';
    characterImage.style.backgroundSize = 'cover';
    characterImage.style.backgroundPosition = 'center';
}

// Load portfolio images
function loadPortfolioImages() {
    const portfolioImages = [
        {
            src: "Home-Media/portfolio1.jpg",
            alt: "Ghibli-inspired portfolio image 1"
        },
        {
            src: "Home-Media/portfolio2.jpg",
            alt: "Ghibli-inspired portfolio image 2"
        },
        {
            src: "Home-Media/portfolio3.jpg",
            alt: "Ghibli-inspired portfolio image 3"
        }
    ];
    
    const portfolioGrid = document.querySelector('.portfolio-grid');
    portfolioImages.forEach(image => {
        const portfolioItem = document.createElement('div');
        portfolioItem.className = 'portfolio-item';
        
        const img = document.createElement('img');
        img.src = image.src;
        img.alt = image.alt;
        
        portfolioItem.appendChild(img);
        portfolioGrid.appendChild(portfolioItem);
    });
}

// Load gallery images from GitHub
async function loadGalleryImages() {
    try {
        // Fetch the contents of the root directory from GitHub
        const response = await fetch(`https://api.github.com/repos/${GITHUB_REPO}/contents?ref=${GITHUB_BRANCH}`);
        const files = await response.json();

        // Filter for image files and create gallery items
        galleryImages = files
            .filter(file => {
                const ext = file.name.toLowerCase().split('.').pop();
                return ['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(ext);
            })
            .map(file => ({
                src: file.download_url,
                alt: file.name.replace(/\.[^/.]+$/, "").replace(/-/g, ' '),
                name: file.name
            }));

        const galleryGrid = document.querySelector('.gallery-grid');
        if (galleryGrid) {
            galleryImages.forEach((image, index) => {
                const galleryItem = document.createElement('div');
                galleryItem.className = 'gallery-item';
                
                const img = document.createElement('img');
                img.src = image.src;
                img.alt = image.alt;
                
                // Add loading state
                img.style.opacity = '0';
                img.onload = () => {
                    img.style.transition = 'opacity 0.3s ease';
                    img.style.opacity = '1';
                };
                
                galleryItem.appendChild(img);
                galleryItem.addEventListener('click', () => openLightbox(index));
                galleryGrid.appendChild(galleryItem);
            });
        }
    } catch (error) {
        console.error('Error loading gallery images from GitHub:', error);
        // Fallback to local images if GitHub fetch fails
        fallbackToLocalImages();
    }
}

// Fallback function for local images
function fallbackToLocalImages() {
    galleryImages = [
        {
            src: "Media/gallery1.jpg",
            alt: "Ghibli-inspired gallery image 1"
        },
        {
            src: "Media/gallery2.jpg",
            alt: "Ghibli-inspired gallery image 2"
        },
        {
            src: "Media/gallery3.jpg",
            alt: "Ghibli-inspired gallery image 3"
        }
    ];
    
    const galleryGrid = document.querySelector('.gallery-grid');
    if (galleryGrid) {
        galleryImages.forEach((image, index) => {
            const galleryItem = document.createElement('div');
            galleryItem.className = 'gallery-item';
            
            const img = document.createElement('img');
            img.src = image.src;
            img.alt = image.alt;
            
            galleryItem.appendChild(img);
            galleryItem.addEventListener('click', () => openLightbox(index));
            galleryGrid.appendChild(galleryItem);
        });
    }
}

// Lightbox functionality
function openLightbox(index) {
    currentImageIndex = index;
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.querySelector('.lightbox-image');
    
    lightboxImage.src = galleryImages[index].src;
    lightbox.classList.add('active');
    
    // Add event listeners for navigation
    document.querySelector('.prev-button').addEventListener('click', showPreviousImage);
    document.querySelector('.next-button').addEventListener('click', showNextImage);
    document.querySelector('.close-lightbox').addEventListener('click', closeLightbox);
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.classList.remove('active');
    
    // Remove event listeners
    document.querySelector('.prev-button').removeEventListener('click', showPreviousImage);
    document.querySelector('.next-button').removeEventListener('click', showNextImage);
    document.querySelector('.close-lightbox').removeEventListener('click', closeLightbox);
}

function showPreviousImage() {
    currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
    updateLightboxImage();
}

function showNextImage() {
    currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
    updateLightboxImage();
}

function updateLightboxImage() {
    const lightboxImage = document.querySelector('.lightbox-image');
    lightboxImage.src = galleryImages[currentImageIndex].src;
}

// Keyboard navigation for lightbox
document.addEventListener('keydown', (e) => {
    const lightbox = document.getElementById('lightbox');
    if (lightbox.classList.contains('active')) {
        if (e.key === 'ArrowLeft') {
            showPreviousImage();
        } else if (e.key === 'ArrowRight') {
            showNextImage();
        } else if (e.key === 'Escape') {
            closeLightbox();
        }
    }
});

// Initialize based on current page
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    
    if (document.querySelector('.home-page')) {
        loadCharacterDescription();
        loadCharacterImage();
        loadPortfolioImages();
        
        // Add theme switcher event listener
        const themeSwitcher = document.getElementById('themeSwitcher');
        if (themeSwitcher) {
            themeSwitcher.addEventListener('click', cycleTheme);
        }
    } else if (document.querySelector('.gallery-page')) {
        loadGalleryImages();
    }
}); 
