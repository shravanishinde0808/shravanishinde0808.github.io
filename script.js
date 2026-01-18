// Projects Data
const projects = [
    {
        id: 1,
        title: "Bhavya Foundation Website & CMS",
        shortDesc: "A full-featured NGO website with donation and content management.",
        description: "A secure and scalable web platform built to support NGO operations and online donations.",
        image: "images/bhavyafoundation.jpg",
        tech: ["PHP", "HTML5", "CSS3", "MySQL"],
        github: "#",
        live: "https://bhavyafoundation.com",
        teamMembers: "Chetna Padhi, Atharva Gitaye",
        keyFeatures: [
            "Secure online donation system with multiple payment gateway support",
            "Custom admin dashboard for managing campaigns, donations, and website content",
            "Real-time tracking of donations and transaction history",
            "Automated email acknowledgements and donation receipts",
            "Role-based access control for administrators",
            "Fully responsive and user-friendly interface for donors and admins"
        ]
    },
    {
        id: 2,
        title: "DepressSense",
        shortDesc: "Machine learning–based emotion detection using facial expressions.",
        description: "An ML-powered system that identifies human emotions through facial analysis.",
        image: "images/depressSense.jpg",
        tech: ["Python", "TensorFlow", "OpenCV"],
        github: "https://github.com/shravanishinde0808",
        live: "#",
        teamMembers: "Komal Ranjane, Pooja Babar, Snehal Bandal",
        keyFeatures: [
            "Real-time facial emotion detection using webcam input",
            "Image preprocessing and facial feature extraction for improved accuracy",
            "Training and evaluation of machine learning model",
            "Classification of multiple emotional states such as happiness, sadness, and stress",
            "Non-invasive approach to support early mental health awareness"
        ]
    },
    {
        id: 3,
        title: "Online Bookstore Management System",
        shortDesc: "A database-driven web application for managing online book sales.",
        description: "A full-stack web system designed to manage books, users, and online access.",
        image: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?q=80&w=1000&auto=format&fit=crop",
        tech: ["HTML5", "CSS3", "JavaScript", "PHP"],
        github: "https://github.com/shravanishinde0808",
        live: "#",
        teamMembers: "Tanisha Kothari",
        keyFeatures: [
            "User authentication system with secure login and registration",
            "Category-wise browsing and detailed book listings",
            "Admin panel for managing books, categories, and users",
            "Complete CRUD operations for inventory and product management",
            "Backend developed using PHP with MySQL database integration",
            "Responsive UI for seamless experience across all devices"
        ]
    }
];

// Theme Management
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;
const moonIcon = document.querySelector('.moon-icon');
const sunIcon = document.querySelector('.sun-icon');
const logoImage = document.querySelector('.logo-icon');

// Initialize theme from localStorage
function initializeTheme() {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        html.classList.add('dark');
        moonIcon.classList.add('hidden');
        sunIcon.classList.remove('hidden');
        if (logoImage) logoImage.src = 'images/logo-dark.png';
    } else {
        if (logoImage) logoImage.src = 'images/logo-light.png';
    }
}

// Toggle theme
function toggleTheme() {
    const isDark = html.classList.toggle('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    
    moonIcon.classList.toggle('hidden');
    sunIcon.classList.toggle('hidden');
    
    // Dynamic logo switching
    if (logoImage) {
        logoImage.src = isDark ? 'images/logo-dark.png' : 'images/logo-light.png';
    }
}

themeToggle.addEventListener('click', toggleTheme);

// Mobile Menu
const menuToggle = document.getElementById('menuToggle');
const mobileMenu = document.getElementById('mobileMenu');
const menuIcon = document.querySelector('.menu-icon');
const closeIcon = document.querySelector('.close-icon');
const mobileLinks = document.querySelectorAll('.mobile-link');

function toggleMenu() {
    mobileMenu.classList.toggle('active');
    menuIcon.classList.toggle('hidden');
    closeIcon.classList.toggle('hidden');
}

menuToggle.addEventListener('click', toggleMenu);

// Close mobile menu when clicking on a link
mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        menuIcon.classList.remove('hidden');
        closeIcon.classList.add('hidden');
    });
});

// Navbar scroll effect
const navbar = document.getElementById('navbar');
let lastScrollY = window.scrollY;

function handleNavbarScroll() {
    if (window.scrollY > 20) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    lastScrollY = window.scrollY;
}

window.addEventListener('scroll', handleNavbarScroll);

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const offsetTop = targetElement.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Render Projects
function renderProjects() {
    const projectsGrid = document.getElementById('projectsGrid');
    
    projects.forEach(project => {
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card';
        projectCard.onclick = () => openProjectModal(project);
        
        projectCard.innerHTML = `
            <div class="project-image">
                <img src="${project.image}" alt="${project.title}">
            </div>
            <div class="project-info">
                <h3 class="project-title">${project.title}</h3>
                <p class="project-desc">${project.shortDesc}</p>
                <div class="project-tech">
                    ${project.tech.map(tech => `<span class="project-tech-tag">${tech}</span>`).join('')}
                </div>
                <button class="project-view-btn" onclick="event.stopPropagation(); openProjectModal(${JSON.stringify(project).replace(/"/g, '&quot;')})">
                    View Project Details
                </button>
            </div>
        `;
        
        projectsGrid.appendChild(projectCard);
    });
}

// Project Modal
const projectModal = document.getElementById('projectModal');
const modalClose = document.getElementById('modalClose');
const modalOverlay = document.querySelector('.modal-overlay');
const modalImage = document.getElementById('modalImage');
const modalContent = document.getElementById('modalContent');

function openProjectModal(project) {
    // Populate modal image
    modalImage.innerHTML = `<img src="${project.image}" alt="${project.title}">`;
    
    // Populate modal content
    modalContent.innerHTML = `
        <div class="modal-header">
            <h3 class="modal-title">${project.title}</h3>
            <div class="modal-tech">
                ${project.tech.map(tech => `<span class="modal-tech-tag">${tech}</span>`).join('')}
            </div>
        </div>
        
        <div class="modal-sections">
            <div class="modal-section">
                <h4>Brief</h4>
                <p>${project.description}</p>
            </div>
            <div class="modal-section">
                <h4>Team Members</h4>
                <p>${project.teamMembers}</p>
            </div>
        </div>
        
        <div class="modal-section">
            <h4>Key Features</h4>
            <ul class="modal-features">
                ${project.keyFeatures.map(feature => `<li>${feature}</li>`).join('')}
            </ul>
        </div>
        
        <div class="modal-actions">
            ${project.live !== '#' ? `
                <a href="${project.live}" target="_blank" class="modal-action-btn modal-action-primary">
                    Launch Project
                    <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>
                </a>
            ` : ''}
            ${project.github !== '#' ? `
                <a href="${project.github}" target="_blank" class="modal-action-btn modal-action-secondary">
                    Codebase
                    <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
                </a>
            ` : ''}
        </div>
    `;
    
    projectModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeProjectModal() {
    projectModal.classList.remove('active');
    document.body.style.overflow = '';
}

modalClose.addEventListener('click', closeProjectModal);
modalOverlay.addEventListener('click', closeProjectModal);

// Close modal on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && projectModal.classList.contains('active')) {
        closeProjectModal();
    }
});

// Contact Form
const contactForm = document.getElementById('contactForm');
const formAlert = document.getElementById('formAlert');
const submitBtn = document.getElementById('submitBtn');

// Validation helper functions
function validateEmail(email) {
    const re = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i;
    return re.test(String(email).toLowerCase());
}

function validateName(name) {
    return name.trim().length >= 2 && /^[A-Za-z\s]+$/.test(name);
}

function showError(message) {
    formAlert.classList.remove('hidden');
    formAlert.style.backgroundColor = 'var(--error-color, #ef4444)';
    formAlert.style.color = 'white';
    formAlert.innerHTML = `
        <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
        ${message}
    `;
    formAlert.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const data = {
        name: formData.get('name').trim(),
        email: formData.get('email').trim(),
        subject: formData.get('subject').trim(),
        message: formData.get('message').trim()
    };
    
    // Validate form data
    if (!validateName(data.name)) {
        showError('Please enter a valid name (letters and spaces only, minimum 2 characters)');
        return;
    }
    
    if (!validateEmail(data.email)) {
        showError('Please enter a valid email address');
        return;
    }
    
    if (data.subject.length < 3 || data.subject.length > 100) {
        showError('Subject must be between 3 and 100 characters');
        return;
    }
    
    if (data.message.length < 10 || data.message.length > 1000) {
        showError('Message must be between 10 and 1000 characters');
        return;
    }
    
    // Show loading state
    submitBtn.disabled = true;
    submitBtn.innerHTML = 'Sending...';
    formAlert.classList.add('hidden');
    
    try {
        // Send email using EmailJS
        const response = await emailjs.send(
            'service_5cxqjvi',  // Service ID
            'template_f9l1z0m', // Template ID
            {
                from_name: data.name,
                from_email: data.email,
                subject: data.subject,
                message: data.message,
                to_email: 'shravu0808@gmail.com'
            }
        );
        
        console.log('Email sent successfully:', response);
        
        // Show success message
        formAlert.classList.remove('hidden');
        formAlert.style.backgroundColor = 'var(--success-color, #10b981)';
        formAlert.style.color = 'white';
        formAlert.innerHTML = `
            <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
            Message sent successfully! Thank you for reaching out. I'll get back to you shortly.
        `;
        
        // Reset form
        contactForm.reset();
        
        // Scroll to show the success message
        formAlert.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        
    } catch (error) {
        console.error('Email send failed:', error);
        // Show error
        formAlert.classList.remove('hidden');
        formAlert.style.backgroundColor = 'var(--error-color, #ef4444)';
        formAlert.style.color = 'white';
        formAlert.innerHTML = `
            <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
            Failed to send message. Please try again or email directly at shravu0808@gmail.com
        `;
        
        // Scroll to show the error message
        formAlert.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    } finally {
        // Reset button
        submitBtn.disabled = false;
        submitBtn.innerHTML = `
            Send Message
            <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
        `;
    }
});

// Set current year in footer
document.getElementById('currentYear').textContent = new Date().getFullYear();

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            // Add stagger delay for multiple elements
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                entry.target.classList.add('animated');
            }, index * 50);
        }
    });
}, observerOptions);

// Observe cards for animations
document.querySelectorAll('.skill-card, .experience-card, .project-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.4s cubic-bezier(0.22, 1, 0.36, 1), transform 0.4s cubic-bezier(0.22, 1, 0.36, 1)';
    observer.observe(el);
});

// Observe section headers for animations
const headerObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.2, rootMargin: '0px 0px -30px 0px' });

document.querySelectorAll('.section-header, .about-content, .contact-info').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.4s cubic-bezier(0.22, 1, 0.36, 1), transform 0.4s cubic-bezier(0.22, 1, 0.36, 1)';
    headerObserver.observe(el);
});

// Initialize everything on page load
document.addEventListener('DOMContentLoaded', () => {
    initializeTheme();
    renderProjects();
});

// Make openProjectModal available globally for inline onclick
window.openProjectModal = openProjectModal;
