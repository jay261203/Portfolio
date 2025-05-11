// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initNavigation();
    initAnimations();
    initThemeToggle();
    initProjectFilters();
    initContactForm();
    initTypingEffect();
    initSkillsInteraction();
});

// ===== NAVIGATION =====
function initNavigation() {
    // Mobile menu toggle
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            this.classList.toggle('active');
        });
    }
    
    // Smooth scrolling for navigation links
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            // Don't scroll for language switcher
            if (this.parentElement.classList.contains('lang-switch')) return;
            
            e.preventDefault();
            
            // Close mobile menu if open
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                if (menuToggle) menuToggle.classList.remove('active');
            }
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Active link highlighting on scroll
    updateActiveNavOnScroll();
    window.addEventListener('scroll', updateActiveNavOnScroll);
}

function updateActiveNavOnScroll() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const headerHeight = document.querySelector('header').offsetHeight;
        
        if (window.pageYOffset >= sectionTop - headerHeight - 100) {
            current = '#' + section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === current) {
            link.classList.add('active');
        }
    });
}

// ===== ANIMATIONS =====
function initAnimations() {
    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, { 
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    });
    
    // Observe elements that should animate on scroll
    document.querySelectorAll('.animate-on-scroll').forEach(element => {
        observer.observe(element);
    });
    
    // Add animation classes to elements
    document.querySelectorAll('.project-card').forEach((card, index) => {
        card.classList.add('animate-on-scroll');
        card.style.animationDelay = `${index * 0.2}s`;
    });
    
    document.querySelectorAll('.skill-category').forEach((skill, index) => {
        skill.classList.add('animate-on-scroll');
        skill.style.animationDelay = `${index * 0.1}s`;
    });
}

// ===== THEME TOGGLE =====
function initThemeToggle() {
    const themeToggle = document.querySelector('.theme-toggle');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Check for saved theme
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme) {
        document.body.classList.toggle('light-mode', savedTheme === 'light');
        if (themeToggle) {
            themeToggle.classList.toggle('active', savedTheme === 'light');
        }
    } else {
        // No saved preference, use system preference
        document.body.classList.toggle('light-mode', !prefersDarkScheme.matches);
        if (themeToggle) {
            themeToggle.classList.toggle('active', !prefersDarkScheme.matches);
        }
    }
    
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            document.body.classList.toggle('light-mode');
            this.classList.toggle('active');
            
            // Save preference
            const theme = document.body.classList.contains('light-mode') ? 'light' : 'dark';
            localStorage.setItem('theme', theme);
        });
    }
}

// ===== PROJECT FILTERS =====
function initProjectFilters() {
    const filterBtns = document.querySelectorAll('.project-filter');
    const projectCards = document.querySelectorAll('.project-card');
    
    if (filterBtns.length === 0) return;
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            
            projectCards.forEach(card => {
                if (filter === 'all') {
                    card.style.display = 'block';
                } else {
                    const tags = card.querySelector('.project-tags').textContent.toLowerCase();
                    card.style.display = tags.includes(filter.toLowerCase()) ? 'block' : 'none';
                }
            });
        });
    });
}

// ===== CONTACT FORM =====
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Form validation
        const name = this.querySelector('input[name="name"]').value.trim();
        const email = this.querySelector('input[name="email"]').value.trim();
        const message = this.querySelector('textarea[name="message"]').value.trim();
        let isValid = true;
        
        // Reset error messages
        this.querySelectorAll('.error-message').forEach(el => el.remove());
        
        // Validate name
        if (name === '') {
            showError(this.querySelector('input[name="name"]'), 'Name is required');
            isValid = false;
        }
        
        // Validate email
        if (email === '') {
            showError(this.querySelector('input[name="email"]'), 'Email is required');
            isValid = false;
        } else if (!isValidEmail(email)) {
            showError(this.querySelector('input[name="email"]'), 'Please enter a valid email');
            isValid = false;
        }
        
        // Validate message
        if (message === '') {
            showError(this.querySelector('textarea[name="message"]'), 'Message is required');
            isValid = false;
        }
        
        if (isValid) {
            // Show success message (in a real implementation, this would send data to a server)
            const formWrapper = document.querySelector('.contact-form-wrapper');
            formWrapper.innerHTML = `
                <div class="success-message">
                    <i class="fas fa-check-circle"></i>
                    <h3>Message Sent!</h3>
                    <p>Thanks for reaching out. I'll get back to you soon.</p>
                </div>
            `;
        }
    });
    
    function showError(inputElement, message) {
        const errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.textContent = message;
        inputElement.parentNode.appendChild(errorElement);
        inputElement.classList.add('error');
    }
    
    function isValidEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
}

// ===== TYPING EFFECT =====
function initTypingEffect() {
    const element = document.querySelector('.typing-effect');
    
    if (!element) return;
    
    const texts = element.getAttribute('data-texts').split(',');
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    
    function type() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            element.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            element.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }
        
        if (!isDeleting && charIndex === currentText.length) {
            isDeleting = true;
            typingSpeed = 1500; // Pause at the end
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typingSpeed = 500; // Pause before typing next text
        }
        
        setTimeout(type, typingSpeed);
    }
    
    type();
}

// ===== SKILLS INTERACTION =====
function initSkillsInteraction() {
    const skillCategories = document.querySelectorAll('.skill-category');
    
    skillCategories.forEach(category => {
        category.addEventListener('mouseover', function() {
            this.classList.add('active');
        });
        
        category.addEventListener('mouseleave', function() {
            this.classList.remove('active');
        });
    });
}

// ===== Language Switcher =====
document.querySelector('.lang-switch a')?.addEventListener('click', function(e) {
    e.preventDefault();
    // In a real implementation, this would change the language
    alert('Language switching would be implemented here!');
});