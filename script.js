// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  
  mobileMenuToggle.addEventListener('click', function() {
    navLinks.classList.toggle('active');
    const isExpanded = mobileMenuToggle.getAttribute('aria-expanded') === 'true';
    mobileMenuToggle.setAttribute('aria-expanded', !isExpanded);
  });
  
  // Form submission handling
  const form = document.getElementById('contactForm');
  const formStatus = document.getElementById('form-status');
  
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      const formData = new FormData(form);
      
      formStatus.className = '';
      formStatus.style.display = 'block';
      formStatus.textContent = 'Sending your message...';
      
      fetch(form.action, {
        method: form.method,
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      }).then(response => {
        if (response.ok) {
          formStatus.textContent = "Thanks for your message! We'll get back to you soon.";
          formStatus.className = 'success';
          form.reset();
        } else {
          response.json().then(data => {
            formStatus.textContent = data.error || "Oops! There was a problem sending your message.";
            formStatus.className = 'error';
          });
        }
      }).catch(error => {
        formStatus.textContent = "Oops! There was a problem sending your message.";
        formStatus.className = 'error';
      });
    });
  }
  
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
        
        // Close mobile menu if open
        navLinks.classList.remove('active');
        mobileMenuToggle.setAttribute('aria-expanded', 'false');
      }
    });
  });
});