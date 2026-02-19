// DOM Elements
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const hackerBtn = document.getElementById('hacker-toggle');
const textElement = document.getElementById('typewriter');

// --- Initialization ---
document.addEventListener('DOMContentLoaded', () => {
    document.body.classList.add('page-ready');
    initAOS();
    initTypewriter();
});

// --- AOS (Animate On Scroll) Replacement ---
function initAOS() {
    const revealElements = document.querySelectorAll('[data-aos]');
    revealElements.forEach((el) => {
        const delay = el.getAttribute('data-aos-delay');
        if (delay) {
            el.style.transitionDelay = `${delay}ms`;
        }
    });

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    // Optional: Stop observing once visible to mimic 'once' behavior
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.12 }
    );

    revealElements.forEach((el) => observer.observe(el));
}

// --- Mobile Menu ---
if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });
}

window.closeMobileMenu = function () {
    if (mobileMenu) mobileMenu.classList.add('hidden');
}

// Close menu when clicking links inside it
mobileMenu?.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMobileMenu);
});

// --- Typewriter Effect ---
const phrases = ["SDE", "Full Stack Developer", "MERN Stack Dev", "Java Backend Developer"];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typeSpeed = 100;

function initTypewriter() {
    if (!textElement) return;
    type();
}

function type() {
    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
        textElement.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
        typeSpeed = 50;
    } else {
        textElement.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
        typeSpeed = 100;
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
        isDeleting = true;
        typeSpeed = 2000;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typeSpeed = 500;
    }

    setTimeout(type, typeSpeed);
}

// --- Modals ---
window.openModal = function (modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }
}

window.closeModal = function (modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }
}

// --- Hacker Mode Toggle ---
if (hackerBtn) {
    // Initialize state logic for button text
    function updateHackerBtn() {
        if (document.documentElement.classList.contains('hacker-mode')) {
            hackerBtn.innerHTML = '<i class="fas fa-times"></i> _$ exit';
        } else {
            hackerBtn.innerHTML = '<i class="fas fa-terminal"></i> _$ init';
        }
    }

    // Run on load in case persistent
    updateHackerBtn();

    hackerBtn.addEventListener('click', () => {
        document.documentElement.classList.toggle('hacker-mode');

        const isHacker = document.documentElement.classList.contains('hacker-mode');
        localStorage.hackerMode = isHacker;

        if (isHacker) {
            // Force dark mode off to prevent conflicts if needed
            // document.documentElement.classList.remove('dark'); 
        } else {
            // Restore theme preference
        }
        updateHackerBtn();
    });
}
