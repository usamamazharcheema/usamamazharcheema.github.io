// DevCard Portfolio - JavaScript

document.addEventListener('DOMContentLoaded', function() {
    
    // Mobile Menu Toggle
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const sidebar = document.querySelector('.sidebar');
    
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            sidebar.classList.toggle('active');
        });
        
        // Close sidebar when clicking outside on mobile
        document.addEventListener('click', function(event) {
            if (window.innerWidth < 992) {
                if (!sidebar.contains(event.target) && !mobileMenuToggle.contains(event.target)) {
                    sidebar.classList.remove('active');
                }
            }
        });
    }
    
    // Smooth Scroll for Navigation Links with offset
    const navLinks = document.querySelectorAll('.sidebar-nav a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if it's an external link or opens in new window
            if (this.getAttribute('target') === '_blank' || !href.startsWith('#')) {
                return;
            }
            
            e.preventDefault();
            
            if (href === '#' || href === '') return;
            
            const targetSection = document.querySelector(href);
            
            if (targetSection) {
                // Remove active class from all links
                document.querySelectorAll('.sidebar-nav a[href^="#"]').forEach(navLink => {
                    navLink.classList.remove('active');
                });
                
                // Add active class to clicked link
                this.classList.add('active');
                
                // Calculate position with offset for better viewing
                const headerOffset = 20;
                const elementPosition = targetSection.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                // Smooth scroll to target
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (window.innerWidth < 992) {
                    setTimeout(() => {
                        sidebar.classList.remove('active');
                    }, 300);
                }
            }
        });
    });
    
    // Update Active Navigation on Scroll
    let isScrolling = false;
    
    window.addEventListener('scroll', function() {
        if (!isScrolling) {
            window.requestAnimationFrame(function() {
                updateActiveNav();
                isScrolling = false;
            });
            isScrolling = true;
        }
    });
    
    function updateActiveNav() {
        let current = '';
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 100;
        const internalNavLinks = document.querySelectorAll('.sidebar-nav a[href^="#"]');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                current = sectionId;
            }
        });
        
        internalNavLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (href === `#${current}`) {
                link.classList.add('active');
            }
        });
        
        // If at the top, activate first link
        if (window.scrollY < 100 && internalNavLinks[0]) {
            internalNavLinks.forEach(link => link.classList.remove('active'));
            internalNavLinks[0].classList.add('active');
        }
    }
    
    // Initial active state
    updateActiveNav();
    
    // Testimonial Carousel Auto-play
    const testimonialCarousel = document.getElementById('testimonialCarousel');
    if (testimonialCarousel && typeof bootstrap !== 'undefined') {
        new bootstrap.Carousel(testimonialCarousel, {
            interval: 5000,
            wrap: true,
            ride: 'carousel'
        });
    }
    
    // Add Animation on Scroll with Intersection Observer
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const fadeInObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-visible');
                fadeInObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.skill-card, .project-card, .education-card, .timeline-item, .testimonial-card');
    animateElements.forEach((element, index) => {
        element.classList.add('fade-in-element');
        element.style.transitionDelay = `${index * 0.05}s`;
        fadeInObserver.observe(element);
    });
    
    // Add scroll to top button
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollToTopBtn.className = 'scroll-to-top';
    scrollToTopBtn.setAttribute('aria-label', 'Scroll to top');
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
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 998;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
    `;
    
    document.body.appendChild(scrollToTopBtn);
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 400) {
            scrollToTopBtn.style.opacity = '1';
            scrollToTopBtn.style.visibility = 'visible';
        } else {
            scrollToTopBtn.style.opacity = '0';
            scrollToTopBtn.style.visibility = 'hidden';
        }
    });
    
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    scrollToTopBtn.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px)';
    });
    
    scrollToTopBtn.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
    
    // Page load animation
    document.body.style.opacity = '1';
    
    console.log('%c👋 Welcome to my portfolio!', 'color: #54ba4e; font-size: 20px; font-weight: bold;');
    
});
