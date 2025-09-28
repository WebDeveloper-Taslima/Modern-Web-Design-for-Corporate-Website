// DOM Elements
const header = document.getElementById('header');
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');
const contactForm = document.getElementById('contactForm');

// Header scroll effect
let isScrolled = false;

function handleScroll() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 50 && !isScrolled) {
        header.classList.add('scrolled');
        isScrolled = true;
    } else if (scrollTop <= 50 && isScrolled) {
        header.classList.remove('scrolled');
        isScrolled = false;
    }
}

// Mobile menu toggle
function toggleMobileMenu() {
    const isOpen = mobileMenu.classList.contains('active');
    
    if (isOpen) {
        mobileMenu.classList.remove('active');
        mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    } else {
        mobileMenu.classList.add('active');
        mobileMenuBtn.innerHTML = '<i class="fas fa-times"></i>';
    }
}

// Close mobile menu when clicking on a link
function closeMobileMenu() {
    mobileMenu.classList.remove('active');
    mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
}

// Smooth scrolling for anchor links
function smoothScroll(target) {
    const element = document.querySelector(target);
    if (element) {
        const headerHeight = header.offsetHeight;
        const elementPosition = element.offsetTop - headerHeight;
        
        window.scrollTo({
            top: elementPosition,
            behavior: 'smooth'
        });
    }
}

// Contact form submission
function handleFormSubmit(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);
    
    // Basic validation
    if (!data.firstName || !data.lastName || !data.email) {
        alert('Please fill in all required fields.');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        alert('Please enter a valid email address.');
        return;
    }
    
    // Simulate form submission
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        alert('Thank you for your message! We will get back to you soon.');
        contactForm.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }, 2000);
}

// Intersection Observer for animations
function createObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll(
        '.service-card, .usp-item, .cert-item, .industry-card, .news-card'
    );
    
    animatedElements.forEach(el => {
        observer.observe(el);
    });
}

// Service card hover effects
function initServiceCards() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-8px)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });
}

// News card hover effects
function initNewsCards() {
    const newsCards = document.querySelectorAll('.news-card');
    
    newsCards.forEach(card => {
        const newsLink = card.querySelector('.news-link');
        
        card.addEventListener('mouseenter', () => {
            if (newsLink) {
                newsLink.style.transform = 'translateX(0.5rem)';
            }
        });
        
        card.addEventListener('mouseleave', () => {
            if (newsLink) {
                newsLink.style.transform = 'translateX(0)';
            }
        });
    });
}

// Industry card hover effects
function initIndustryCards() {
    const industryCards = document.querySelectorAll('.industry-card');
    
    industryCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const overlay = card.querySelector('.industry-overlay');
            if (overlay) {
                overlay.style.background = 'rgba(30, 58, 138, 0.5)';
            }
        });
        
        card.addEventListener('mouseleave', () => {
            const overlay = card.querySelector('.industry-overlay');
            if (overlay) {
                overlay.style.background = 'rgba(30, 58, 138, 0.7)';
            }
        });
    });
}

// Initialize dropdown functionality
function initDropdowns() {
    const dropdowns = document.querySelectorAll('.dropdown');
    
    dropdowns.forEach(dropdown => {
        const toggle = dropdown.querySelector('.dropdown-toggle');
        const menu = dropdown.querySelector('.dropdown-menu');
        
        if (toggle && menu) {
            let timeoutId;
            
            dropdown.addEventListener('mouseenter', () => {
                clearTimeout(timeoutId);
                menu.style.opacity = '1';
                menu.style.visibility = 'visible';
                menu.style.transform = 'translateY(0)';
            });
            
            dropdown.addEventListener('mouseleave', () => {
                timeoutId = setTimeout(() => {
                    menu.style.opacity = '0';
                    menu.style.visibility = 'hidden';
                    menu.style.transform = 'translateY(-10px)';
                }, 150);
            });
        }
    });
}

// Handle anchor link clicks
function initAnchorLinks() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = link.getAttribute('href');
            
            if (target && target !== '#') {
                smoothScroll(target);
                closeMobileMenu();
            }
        });
    });
}

// Initialize parallax effect for hero cubes
function initParallax() {
    const cubes = document.querySelectorAll('.cube');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        cubes.forEach((cube, index) => {
            const speed = (index + 1) * 0.2;
            cube.style.transform = `translateY(${rate * speed}px) rotate(${45 + scrolled * 0.1}deg)`;
        });
    });
}

// Initialize button hover effects
function initButtonEffects() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            if (button.classList.contains('btn-primary')) {
                button.style.transform = 'translateY(-2px)';
                button.style.boxShadow = '0 4px 12px rgba(34, 57, 142, 0.3)';
            }
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translateY(0)';
            button.style.boxShadow = '';
        });
    });
}

// Initialize scroll indicator
function initScrollIndicator() {
    const scrollIndicator = document.querySelector('.scroll-indicator');
    
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', () => {
            smoothScroll('#services');
        });
        
        // Hide scroll indicator when scrolling down
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            if (scrolled > 100) {
                scrollIndicator.style.opacity = '0';
            } else {
                scrollIndicator.style.opacity = '1';
            }
        });
    }
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all functionality
    createObserver();
    initServiceCards();
    initNewsCards();
    initIndustryCards();
    initDropdowns();
    initAnchorLinks();
    initParallax();
    initButtonEffects();
    initScrollIndicator();
    
    // Add event listeners
    window.addEventListener('scroll', handleScroll);
    mobileMenuBtn.addEventListener('click', toggleMobileMenu);
    contactForm.addEventListener('submit', handleFormSubmit);
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
            closeMobileMenu();
        }
    });
    
    // Handle mobile menu links
    const mobileMenuItems = document.querySelectorAll('.mobile-menu-item');
    mobileMenuItems.forEach(item => {
        item.addEventListener('click', closeMobileMenu);
    });
    
    // Add loading animation to page
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// Handle window resize
window.addEventListener('resize', () => {
    // Close mobile menu on resize
    if (window.innerWidth >= 1024) {
        closeMobileMenu();
    }
});

// Utility functions
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

// Optimized scroll handler
const optimizedScrollHandler = debounce(handleScroll, 10);
window.addEventListener('scroll', optimizedScrollHandler);

// Add smooth scrolling behavior to the entire page
document.documentElement.style.scrollBehavior = 'smooth';

// Performance optimization: Preload critical images
function preloadImages() {
    const criticalImages = [
        'https://images.pexels.com/photos/1427541/pexels-photo-1427541.jpeg',
        'https://images.pexels.com/photos/190574/pexels-photo-190574.jpeg',
        'https://images.pexels.com/photos/264636/pexels-photo-264636.jpeg'
    ];
    
    criticalImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// Initialize image preloading
preloadImages();