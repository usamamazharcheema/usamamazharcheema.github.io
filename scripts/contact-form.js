// Contact Form Handler

document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');
    
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerHTML;
            
            // Check if access key is set
            const accessKey = formData.get('access_key');
            if (!accessKey || accessKey === 'YOUR_ACCESS_KEY_HERE') {
                showMessage('danger', '✗ Form configuration error. Please contact the site administrator.');
                return;
            }
            
            // Show loading state
            submitBtn.classList.add('loading');
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Sending...';
            
            // Hide any previous messages
            formMessage.style.display = 'none';
            
            try {
                // Send form data
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: formData
                });
                
                const data = await response.json();
                
                submitBtn.classList.remove('loading');
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnText;
                
                if (response.ok && data.success) {
                    showMessage('success', '✓ Thank you for your message! I will get back to you soon.');
                    contactForm.reset();
                } else {
                    showMessage('danger', '✗ ' + (data.message || 'There was a problem submitting your form. Please try again.'));
                }
            } catch (error) {
                submitBtn.classList.remove('loading');
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnText;
                
                showMessage('danger', '✗ Network error. Please check your connection and try again.');
                console.error('Error:', error);
            }
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
