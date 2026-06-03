/* ═══════════════════════════════════════════
   ThriveEnglish — main.js
   ═══════════════════════════════════════════ */

(function () {
  'use strict';

  /* ─── Navbar: scroll shadow ─── */
  const navbar = document.getElementById('navbar');
  if (navbar) {
    window.addEventListener('scroll', function () {
      navbar.classList.toggle('scrolled', window.scrollY > 10);
    }, { passive: true });
  }

  /* ─── Mobile hamburger menu ─── */
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('navLinks');

  function openMenu() {
    hamburger.classList.add('open');
    navLinks.classList.add('open');
    document.body.classList.add('no-scroll');
    hamburger.setAttribute('aria-expanded', 'true');
    hamburger.setAttribute('aria-label', 'Close menu');
  }

  function closeMenu() {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
    document.body.classList.remove('no-scroll');
    hamburger.setAttribute('aria-expanded', 'false');
    hamburger.setAttribute('aria-label', 'Open menu');
  }

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', function () {
      if (hamburger.classList.contains('open')) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    /* Close when a nav link is clicked */
    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeMenu);
    });

    /* Close on Escape key */
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && hamburger.classList.contains('open')) {
        closeMenu();
      }
    });
  }

  /* ─── Active nav link ─── */
  var currentFile = window.location.pathname.split('/').pop() || 'index.html';
  if (currentFile === '') currentFile = 'index.html';

  document.querySelectorAll('.nav-links a[href]').forEach(function (link) {
    var href = link.getAttribute('href');
    if (href === currentFile) {
      link.classList.add('active');
    }
  });

  /* ─── FAQ Accordion ─── */
  document.querySelectorAll('.faq-item').forEach(function (item) {
    var btn = item.querySelector('.faq-question');
    if (!btn) return;

    btn.addEventListener('click', function () {
      var isOpen = item.classList.contains('open');

      /* Close all items */
      document.querySelectorAll('.faq-item').forEach(function (i) {
        i.classList.remove('open');
        var b = i.querySelector('.faq-question');
        if (b) b.setAttribute('aria-expanded', 'false');
      });

      /* If it was closed, open it */
      if (!isOpen) {
        item.classList.add('open');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });

  /* ─── Scroll-triggered fade-in animations ─── */
  function initScrollAnimations() {
    var fadeEls = document.querySelectorAll('.fade-in');

    if (fadeEls.length > 0 && 'IntersectionObserver' in window) {
      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px'
      });

      fadeEls.forEach(function (el) { observer.observe(el); });
    } else {
      fadeEls.forEach(function (el) { el.classList.add('visible'); });
    }
  }

  // Defer non-critical animations so they don't block initial render
  setTimeout(initScrollAnimations, 100);

  /* ─── Contact form validation ─── */
  var contactForm = document.getElementById('contactForm');
  var formSuccess = document.getElementById('formSuccess');

  if (contactForm && formSuccess) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      var nameEl    = document.getElementById('name');
      var emailEl   = document.getElementById('email');
      var subjectEl = document.getElementById('subject');
      var msgEl     = document.getElementById('message');

      var valid = true;
      clearAllErrors();

      if (!nameEl.value.trim()) {
        showError(nameEl, 'Please enter your name.');
        valid = false;
      }

      var emailVal = emailEl.value.trim();
      if (!emailVal || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailVal)) {
        showError(emailEl, 'Please enter a valid email address.');
        valid = false;
      }

      if (!subjectEl.value) {
        showError(subjectEl, 'Please select a subject.');
        valid = false;
      }

      if (!msgEl.value.trim()) {
        showError(msgEl, 'Please enter your message.');
        valid = false;
      }

      if (valid) {
        contactForm.style.display = 'none';
        formSuccess.style.display = 'block';
        formSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    });

    /* Clear errors on input */
    contactForm.querySelectorAll('input, select, textarea').forEach(function (field) {
      field.addEventListener('input', function () { clearError(field); });
      field.addEventListener('change', function () { clearError(field); });
    });
  }

  function showError(field, message) {
    field.classList.add('error');
    var existing = field.parentNode.querySelector('.error-msg');
    if (!existing) {
      var msg = document.createElement('span');
      msg.className = 'error-msg';
      msg.textContent = message;
      field.parentNode.appendChild(msg);
    }
  }

  function clearError(field) {
    field.classList.remove('error');
    var msg = field.parentNode.querySelector('.error-msg');
    if (msg) msg.remove();
  }

  function clearAllErrors() {
    document.querySelectorAll('.error-msg').forEach(function (el) { el.remove(); });
    document.querySelectorAll('.error').forEach(function (el) { el.classList.remove('error'); });
  }

  /* ─── Smooth scroll for anchor links ─── */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

})();
