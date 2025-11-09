// DevCard Portfolio - JavaScript

document.addEventListener('DOMContentLoaded', function() {
    
    // Mobile Menu Toggle
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const sidebar = document.querySelector('.sidebar');
    
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            sidebar.classList.toggle('active');
        });
        
        // Close sidebar when clicking outside
        document.addEventListener('click', function(event) {
            if (!sidebar.contains(event.target) && !mobileMenuToggle.contains(event.target)) {
                sidebar.classList.remove('active');
            }
        });
    }
    
    // Smooth Scroll for Navigation Links
    const navLinks = document.querySelectorAll('.sidebar-nav a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links
            navLinks.forEach(navLink => navLink.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Get target section
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // Calculate offset for fixed sidebar
                const offset = 20;
                const targetPosition = targetSection.offsetTop - offset;
                
                // Smooth scroll to target
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (window.innerWidth < 992) {
                    sidebar.classList.remove('active');
                }
            }
        });
    });
    
    // Update Active Navigation on Scroll
    window.addEventListener('scroll', function() {
        let current = '';
        const sections = document.querySelectorAll('section[id]');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
    
    // Testimonial Carousel Auto-play
    const testimonialCarousel = document.getElementById('testimonialCarousel');
    if (testimonialCarousel) {
        const carousel = new bootstrap.Carousel(testimonialCarousel, {
            interval: 5000,
            wrap: true
        });
    }
    
    // Add Animation on Scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.skill-card, .project-card, .education-card, .timeline-item');
    animateElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
    
    // Add hover effect to project images
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.querySelector('.project-image img').style.transform = 'scale(1.1)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.querySelector('.project-image img').style.transform = 'scale(1)';
        });
    });
    
    // Typing effect for hero subtitle (optional)
    const heroSubtitle = document.querySelector('.hero-subtitle');
    if (heroSubtitle) {
        const text = heroSubtitle.textContent;
        heroSubtitle.textContent = '';
        let i = 0;
        
        function typeWriter() {
            if (i < text.length) {
                heroSubtitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        }
        
        // Start typing effect after a short delay
        setTimeout(typeWriter, 500);
    }
    
    // Add scroll to top button functionality (optional)
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollToTopBtn.className = 'scroll-to-top';
    scrollToTopBtn.style.cssText = `
        position: fixed;
        bottom: 90px;
        right: 20px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: var(--primary-color);
        border: none;
        color: white;
        font-size: 1.2rem;
        cursor: pointer;
        opacity: 0;
        transition: opacity 0.3s ease, transform 0.3s ease;
        z-index: 998;
        display: none;
    `;
    
    document.body.appendChild(scrollToTopBtn);
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            scrollToTopBtn.style.display = 'block';
            setTimeout(() => {
                scrollToTopBtn.style.opacity = '1';
            }, 10);
        } else {
            scrollToTopBtn.style.opacity = '0';
            setTimeout(() => {
                scrollToTopBtn.style.display = 'none';
            }, 300);
        }
    });
    
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    scrollToTopBtn.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1)';
    });
    
    scrollToTopBtn.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
    
    // Add loading animation
    window.addEventListener('load', function() {
        document.body.style.opacity = '0';
        setTimeout(() => {
            document.body.style.transition = 'opacity 0.5s ease';
            document.body.style.opacity = '1';
        }, 100);
    });
    
    // Console message (optional)
    console.log('%c👋 Welcome to my portfolio!', 'color: #54ba4e; font-size: 20px; font-weight: bold;');
    console.log('%cInterested in the code? Check out the repository on GitHub!', 'color: #6c757d; font-size: 14px;');
    
});
