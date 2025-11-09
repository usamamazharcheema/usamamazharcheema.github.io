// Contact Form Handler

document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerHTML;
            
            // Show loading state
            submitBtn.classList.add('loading');
            submitBtn.disabled = true;
            
            // Hide any previous messages
            formMessage.style.display = 'none';
            
            // Get form values
            const name = formData.get('name');
            const email = formData.get('email');
            const subject = formData.get('subject') || 'Contact Form Submission';
            const message = formData.get('message');
            
            // Create mailto link (alternative to form service)
            const mailtoLink = `mailto:usamamazharcheema@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
                `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
            )}`;
            
            // Option 1: Open email client (immediate feedback)
            window.location.href = mailtoLink;
            
            // Show success message
            setTimeout(() => {
                submitBtn.classList.remove('loading');
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnText;
                
                showMessage('success', 'Your email client has been opened. Thank you for reaching out!');
                contactForm.reset();
            }, 1000);
            
            // Option 2: If you want to use Formspree or another service, uncomment below:
            /*
            fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => {
                submitBtn.classList.remove('loading');
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnText;
                
                if (response.ok) {
                    showMessage('success', 'Thank you for your message! I will get back to you soon.');
                    contactForm.reset();
                } else {
                    return response.json().then(data => {
                        if (Object.hasOwn(data, 'errors')) {
                            showMessage('danger', data.errors.map(error => error.message).join(', '));
                        } else {
                            showMessage('danger', 'Oops! There was a problem submitting your form.');
                        }
                    });
                }
            })
            .catch(error => {
                submitBtn.classList.remove('loading');
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnText;
                
                showMessage('danger', 'Oops! There was a problem submitting your form.');
                console.error('Error:', error);
            });
            */
        });
    }
    
    function showMessage(type, text) {
        formMessage.className = `alert alert-${type}`;
        formMessage.textContent = text;
        formMessage.style.display = 'block';
        
        // Scroll to message
        formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        
        // Auto-hide success messages after 5 seconds
        if (type === 'success') {
            setTimeout(() => {
                formMessage.style.display = 'none';
            }, 5000);
        }
    }
    
    // Form validation feedback
    const formInputs = contactForm.querySelectorAll('.form-control');
    formInputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (this.hasAttribute('required') && !this.value.trim()) {
                this.classList.add('is-invalid');
            } else {
                this.classList.remove('is-invalid');
            }
        });
        
        input.addEventListener('input', function() {
            if (this.classList.contains('is-invalid') && this.value.trim()) {
                this.classList.remove('is-invalid');
            }
        });
    });
});
