document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initMobileMenu();
    initSmoothScroll();
    initActiveNavHighlight();
    initButtonHandlers();
});

// 
// Mobile Menu Toggle
// 

function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navList = document.querySelector('.nav-list');
    
    if (hamburger && navList) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navList.classList.toggle('active');
        });
        
        // Close menu when clicking on a nav link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navList.classList.remove('active');
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!hamburger.contains(event.target) && !navList.contains(event.target)) {
                hamburger.classList.remove('active');
                navList.classList.remove('active');
            }
        });
    }
}

//          
// Smooth Scroll for Navigation Links
//          

function initSmoothScroll() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerOffset = 140; // Account for sticky header
                const elementPosition = targetSection.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

//          
// Active Navigation Highlighting
//          

function initActiveNavHighlight() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    function highlightNav() {
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 150;
            const sectionId = section.getAttribute('id');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', highlightNav);
    highlightNav(); // Initial call
}

//          
// Button Click Handlers
//          

function initButtonHandlers() {
        
    // CTA Button - Opens project request modal
    const ctaBtn = document.querySelector('.btn-cta');
    const closeBtn = document.querySelector('#close-form');
    const modalOverlay = document.querySelector('#modal-overlay');
    const requestForm = document.querySelector('#reques-form');
    const emailBtn = document.querySelector('#email');
    
    if (ctaBtn && requestForm && modalOverlay && closeBtn && emailBtn ) {
        // Open modal when CTA button is clicked
        ctaBtn.addEventListener('click', function() {
            requestForm.classList.add('active');
            modalOverlay.classList.add('active');
            document.body.classList.add('modal-open');
        });
        
         emailBtn.addEventListener('click', function() {
            requestForm.classList.add('active');
            modalOverlay.classList.add('active');
            document.body.classList.add('modal-open');
        });


        // Close modal when X button is clicked
        closeBtn.addEventListener('click', function() {
            closeModal();
        });
        
        // Close modal when overlay is clicked
        modalOverlay.addEventListener('click', function() {
            closeModal();
        });
        
        // Close modal when Escape key is pressed
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && requestForm.classList.contains('active')) {
                closeModal();
            }
        });
    }
    
    // Email Button - Scrolls to contact
    if (emailBtn) {
        emailBtn.addEventListener('click', function() {
            const contactSection = document.querySelector('#contact');
            if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
    
    // Helper function to close modal
    function closeModal() {
        requestForm.classList.remove('active');
        modalOverlay.classList.remove('active');
        document.body.classList.remove('modal-open');
    }
    
    // Project Links
    const projectLinks = document.querySelectorAll('.project-link');
    projectLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            // Handle project link click - can be expanded to show modal or navigate
            console.log('Project link clicked');
        });
    });
}

         
// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe elements for fade-in animation
document.querySelectorAll('.project-card, .stat-box').forEach(el => {
    observer.observe(el);
});

//          
// Header Scroll Effect
//          

let lastScroll = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        header.classList.remove('scroll-up');
        return;
    }
    
    if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
        header.classList.remove('scroll-up');
        header.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
        header.classList.remove('scroll-down');
        header.classList.add('scroll-up');
    }
    
    lastScroll = currentScroll;
});

//          
// Form Validation
//          

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

//          
// Utility Functions
//          

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

          
// Console Branding
  

console.log('%c TheGISguy Portfolio ', 'background: #0066ff; color: #ffd700; font-size: 20px; font-weight: bold; padding: 10px;');
console.log('%c GIS Solutions & Spatial Analysis ', 'background: #0f1419; color: #e0e0e0; font-size: 14px; padding: 5px;');
