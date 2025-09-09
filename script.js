// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    console.log('CIS525 Project 1 - HTML Project loaded successfully!');
    
    // Initialize all functionality
    initializeNavigation();
    initializeButtons();
    initializeContactForm();
    initializeScrollAnimations();
});

// Navigation functionality
function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                // Smooth scroll to section
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Update active navigation state
                updateActiveNavLink(this);
            }
        });
    });
}

// Update active navigation link
function updateActiveNavLink(activeLink) {
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => link.classList.remove('active'));
    activeLink.classList.add('active');
}

// Button functionality
function initializeButtons() {
    const ctaButton = document.getElementById('cta-button');
    
    if (ctaButton) {
        ctaButton.addEventListener('click', function() {
            // Animate button click
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
            
            // Show welcome message
            showNotification('Welcome! Exploring the project features...', 'success');
            
            // Scroll to about section
            const aboutSection = document.getElementById('about');
            if (aboutSection) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = aboutSection.offsetTop - headerHeight;
                
                setTimeout(() => {
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }, 500);
            }
        });
    }
}

// Contact form functionality
function initializeContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = formData.get('name').trim();
            const email = formData.get('email').trim();
            const message = formData.get('message').trim();
            
            // Validate form
            if (validateContactForm(name, email, message)) {
                // Simulate form submission
                simulateFormSubmission(name, email, message);
                
                // Reset form
                this.reset();
            }
        });
        
        // Add input validation feedback
        const inputs = contactForm.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateInput(this);
            });
            
            input.addEventListener('input', function() {
                clearValidationError(this);
            });
        });
    }
}

// Form validation
function validateContactForm(name, email, message) {
    let isValid = true;
    
    // Validate name
    if (name.length < 2) {
        showInputError('name', 'Name must be at least 2 characters long');
        isValid = false;
    }
    
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showInputError('email', 'Please enter a valid email address');
        isValid = false;
    }
    
    // Validate message
    if (message.length < 10) {
        showInputError('message', 'Message must be at least 10 characters long');
        isValid = false;
    }
    
    return isValid;
}

// Individual input validation
function validateInput(input) {
    const value = input.value.trim();
    
    switch(input.type) {
        case 'text':
            if (value.length < 2) {
                showInputError(input.id, 'This field must be at least 2 characters long');
            }
            break;
        case 'email':
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (value && !emailRegex.test(value)) {
                showInputError(input.id, 'Please enter a valid email address');
            }
            break;
        default:
            if (input.tagName === 'TEXTAREA' && value.length < 10) {
                showInputError(input.id, 'Message must be at least 10 characters long');
            }
    }
}

// Show input error
function showInputError(inputId, message) {
    const input = document.getElementById(inputId);
    const formGroup = input.parentElement;
    
    // Remove existing error
    const existingError = formGroup.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    // Add error styling
    input.style.borderColor = '#e74c3c';
    
    // Add error message
    const errorElement = document.createElement('span');
    errorElement.className = 'error-message';
    errorElement.textContent = message;
    errorElement.style.color = '#e74c3c';
    errorElement.style.fontSize = '0.9rem';
    errorElement.style.marginTop = '0.25rem';
    errorElement.style.display = 'block';
    
    formGroup.appendChild(errorElement);
}

// Clear validation error
function clearValidationError(input) {
    const formGroup = input.parentElement;
    const errorMessage = formGroup.querySelector('.error-message');
    
    if (errorMessage) {
        errorMessage.remove();
        input.style.borderColor = '#ecf0f1';
    }
}

// Simulate form submission
function simulateFormSubmission(name, email, message) {
    // Show loading state
    const submitButton = document.querySelector('#contact-form button[type="submit"]');
    const originalText = submitButton.textContent;
    
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;
    
    // Simulate API call delay
    setTimeout(() => {
        submitButton.textContent = originalText;
        submitButton.disabled = false;
        
        // Show success message
        showNotification(`Thank you, ${name}! Your message has been received.`, 'success');
        
        // Log to console (simulating server processing)
        console.log('Form submission:', { name, email, message });
    }, 2000);
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Style notification
    Object.assign(notification.style, {
        position: 'fixed',
        top: '100px',
        right: '20px',
        padding: '15px 20px',
        borderRadius: '5px',
        color: 'white',
        fontSize: '1rem',
        zIndex: '9999',
        maxWidth: '300px',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        transform: 'translateX(100%)',
        transition: 'transform 0.3s ease'
    });
    
    // Set background color based on type
    switch(type) {
        case 'success':
            notification.style.backgroundColor = '#27ae60';
            break;
        case 'error':
            notification.style.backgroundColor = '#e74c3c';
            break;
        default:
            notification.style.backgroundColor = '#3498db';
    }
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove after 4 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentElement) {
                notification.remove();
            }
        }, 300);
    }, 4000);
}

// Scroll animations
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.2}s, transform 0.6s ease ${index * 0.2}s`;
        observer.observe(card);
    });
}

// Utility function for smooth scrolling fallback
function smoothScrollTo(targetPosition, duration = 800) {
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;
    
    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = ease(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
    }
    
    function ease(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }
    
    requestAnimationFrame(animation);
}

// Keyboard navigation support
document.addEventListener('keydown', function(e) {
    // Escape key to close notifications
    if (e.key === 'Escape') {
        const notification = document.querySelector('.notification');
        if (notification) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentElement) {
                    notification.remove();
                }
            }, 300);
        }
    }
});

// Console welcome message
console.log('%c🚀 CIS525 Project 1 - HTML Project', 'color: #3498db; font-size: 16px; font-weight: bold;');
console.log('%cProject features:', 'color: #2c3e50; font-weight: bold;');
console.log('• Responsive design');
console.log('• Interactive navigation');
console.log('• Form validation');
console.log('• Smooth animations');
console.log('• Accessibility features');