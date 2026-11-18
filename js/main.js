/**
 * MG MOTORS SERVICES — Main JavaScript
 * Handles: mobile navigation, smooth scroll, scroll animations, WhatsApp prefill, year update
 */

(function() {
  'use strict';

  // ==========================================================================
  // DOM Elements
  // ==========================================================================
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  const navOverlay = document.querySelector('.nav-overlay');
  const mobileCta = document.querySelector('.mobile-cta');
  const yearEl = document.getElementById('year');
  const whatsappLinks = document.querySelectorAll('a[href*="wa.me"]');

  // ==========================================================================
  // Current Year
  // ==========================================================================
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // ==========================================================================
  // Mobile Navigation Toggle
  // ==========================================================================
  function initMobileNav() {
    if (!navToggle || !navLinks || !navOverlay) return;

    function openMenu() {
      navToggle.setAttribute('aria-expanded', 'true');
      navLinks.classList.add('is-open');
      navOverlay.classList.add('is-visible');
      document.body.classList.add('nav-open');
      // Trap focus
      const focusable = navLinks.querySelectorAll('a, button');
      if (focusable.length) focusable[0].focus();
      // Prevent body scroll
      document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
      navToggle.setAttribute('aria-expanded', 'false');
      navLinks.classList.remove('is-open');
      navOverlay.classList.remove('is-visible');
      document.body.classList.remove('nav-open');
      document.body.style.overflow = '';
      navToggle.focus();
    }

    function toggleMenu() {
      const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
      if (isExpanded) closeMenu();
      else openMenu();
    }

    navToggle.addEventListener('click', toggleMenu);
    navOverlay.addEventListener('click', closeMenu);

    // Close on link click
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', closeMenu);
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navLinks.classList.contains('is-open')) {
        closeMenu();
      }
    });

    // Handle resize
    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        if (window.innerWidth > 850 && navLinks.classList.contains('is-open')) {
          closeMenu();
        }
      }, 250);
    });
  }

  // ==========================================================================
  // Smooth Scroll Enhancement
  // ==========================================================================
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const target = document.querySelector(targetId);
        if (!target) return;

        e.preventDefault();

        const headerHeight = document.querySelector('.header')?.offsetHeight || 0;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });

        // Update focus for accessibility
        target.setAttribute('tabindex', '-1');
        target.focus({ preventScroll: true });
        target.removeAttribute('tabindex');
      });
    });
  }

  // ==========================================================================
  // Intersection Observer for Scroll Animations
  // ==========================================================================
  function initScrollAnimations() {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      // Show all immediately if reduced motion
      document.querySelectorAll('.reveal').forEach(el => el.classList.add('is-visible'));
      return;
    }

    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -10% 0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach(el => {
      observer.observe(el);
    });
  }

  // ==========================================================================
  // WhatsApp Link Prefill Enhancement
  // ==========================================================================
  function initWhatsAppPrefill() {
    whatsappLinks.forEach(link => {
      link.addEventListener('click', function() {
        // Track which section/context the click came from
        const section = this.closest('section')?.id || 'unknown';
        const currentHref = this.getAttribute('href');

        // The href already has prefilled text, but we could enhance it here
        // if needed based on context. For now, links are pre-configured in HTML.
        console.debug('WhatsApp click from:', section);
      });
    });
  }

  // ==========================================================================
  // Active Nav Link on Scroll
  // ==========================================================================
  function initActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinksList = document.querySelectorAll('.nav-links a[href^="#"]');

    if (!sections.length || !navLinksList.length) return;

    const observerOptions = {
      root: null,
      rootMargin: '-50% 0px -50% 0px',
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinksList.forEach(link => {
            const href = link.getAttribute('href');
            if (href === `#${id}`) {
              link.setAttribute('aria-current', 'page');
            } else {
              link.removeAttribute('aria-current');
            }
          });
        }
      });
    }, observerOptions);

    sections.forEach(section => observer.observe(section));
  }

  // ==========================================================================
  // Header Shadow on Scroll
  // ==========================================================================
  function initHeaderScroll() {
    const header = document.querySelector('.header');
    if (!header) return;

    let lastScroll = 0;
    const threshold = 10;

    function onScroll() {
      const currentScroll = window.pageYOffset;

      if (currentScroll > threshold) {
        header.style.boxShadow = 'var(--shadow-md)';
      } else {
        header.style.boxShadow = 'var(--shadow-sm)';
      }

      lastScroll = currentScroll;
    }

    window.addEventListener('scroll', onScroll, { passive: true });
  }

  // ==========================================================================
  // Lazy Load Images (for future gallery images)
  // ==========================================================================
  function initLazyLoad() {
    if (!('loading' in HTMLImageElement.prototype)) {
      // Native lazy loading not supported, use IntersectionObserver fallback
      const lazyImages = document.querySelectorAll('img[loading="lazy"]');

      const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            if (img.dataset.src) {
              img.src = img.dataset.src;
            }
            img.removeAttribute('loading');
            obs.unobserve(img);
          }
        });
      }, {
        rootMargin: '50px 0px',
        threshold: 0.01
      });

      lazyImages.forEach(img => observer.observe(img));
    }
  }

  // ==========================================================================
  // Init All
  // ==========================================================================
  function init() {
    initMobileNav();
    initSmoothScroll();
    initScrollAnimations();
    initWhatsAppPrefill();
    initActiveNavLink();
    initHeaderScroll();
    initLazyLoad();
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();