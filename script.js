document.addEventListener('DOMContentLoaded', function() {
  var mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  var navLinks = document.querySelector('.nav-links');
  var header = document.getElementById('header');

  mobileMenuToggle.addEventListener('click', function() {
    navLinks.classList.toggle('active');
    var isExpanded = mobileMenuToggle.getAttribute('aria-expanded') === 'true';
    mobileMenuToggle.setAttribute('aria-expanded', !isExpanded);
  });

  var yearEl = document.getElementById('footer-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  var parallaxEls = document.querySelectorAll('[data-parallax]');
  var heroSection = document.querySelector('.hero');
  var ticking = false;

  function updateParallax() {
    if (!heroSection) return;
    var rect = heroSection.getBoundingClientRect();
    if (rect.bottom < 0) { ticking = false; return; }

    var scrolled = window.scrollY;
    parallaxEls.forEach(function(el) {
      var speed = parseFloat(el.getAttribute('data-parallax'));
      el.style.transform = 'translateY(' + (scrolled * speed) + 'px)';
    });

    if (scrolled > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    ticking = false;
  }

  window.addEventListener('scroll', function() {
    if (!ticking) {
      requestAnimationFrame(updateParallax);
      ticking = true;
    }
  }, { passive: true });

  var tabBtns = document.querySelectorAll('.tab-btn');
  var tabPanels = document.querySelectorAll('.tab-panel');

  tabBtns.forEach(function(btn) {
    btn.addEventListener('click', function() {
      var target = btn.getAttribute('data-tab');

      tabBtns.forEach(function(b) {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      tabPanels.forEach(function(panel) {
        panel.classList.remove('active');
      });
      var activePanel = document.getElementById('tab-' + target);
      if (activePanel) {
        activePanel.classList.add('active');
      }
    });
  });

  var tabList = document.querySelector('.services-tabs');
  if (tabList) {
    tabList.addEventListener('keydown', function(e) {
      var tabs = Array.from(tabBtns);
      var index = tabs.indexOf(document.activeElement);
      if (index < 0) return;

      var next = -1;
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        next = (index + 1) % tabs.length;
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        next = (index - 1 + tabs.length) % tabs.length;
      } else if (e.key === 'Home') {
        next = 0;
      } else if (e.key === 'End') {
        next = tabs.length - 1;
      }

      if (next >= 0) {
        e.preventDefault();
        tabs[next].focus();
        tabs[next].click();
      }
    });
  }

  document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      var targetId = this.getAttribute('href');
      if (targetId === '#') return;

      var targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
        navLinks.classList.remove('active');
        mobileMenuToggle.setAttribute('aria-expanded', 'false');
      }
    });
  });
});
