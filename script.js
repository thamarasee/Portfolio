/* =========================================
   PORTFOLIO JAVASCRIPT
   Thamarasee Kularathne
   ========================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ========== NAVBAR SCROLL EFFECT ========== */
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    updateActiveNav();
  });

  /* ========== ACTIVE NAV LINK ON SCROLL ========== */
  function updateActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    let current = '';

    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      const sectionBottom = sectionTop + section.offsetHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionBottom) {
        current = section.id;
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('data-section') === current) {
        link.classList.add('active');
      }
    });
  }

  /* ========== HAMBURGER MENU ========== */
  const hamburger = document.getElementById('hamburger');
  const navLinksContainer = document.getElementById('nav-links');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinksContainer.classList.toggle('open');
  });

  // Close mobile menu on nav link click
  navLinksContainer.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      navLinksContainer.classList.remove('open');
    });
  });

  /* ========== HERO TYPEWRITER EFFECT ========== */
  const typedEl = document.getElementById('hero-typed');
  const phrases = [
    'Data Science Student',
    'Machine Learning Enthusiast',
    'Python Developer',
    'AI Explorer',
    'Data Visualizer',
    'Future Data Scientist'
  ];

  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingDelay = 100;

  function typeWriter() {
    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
      typedEl.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;
      typingDelay = 50;
    } else {
      typedEl.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;
      typingDelay = 100;
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
      isDeleting = true;
      typingDelay = 2000; // pause at end
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      typingDelay = 400;
    }

    setTimeout(typeWriter, typingDelay);
  }

  setTimeout(typeWriter, 1000);

  /* ========== PARTICLE BACKGROUND ========== */
  const particlesContainer = document.getElementById('hero-particles');

  function createParticles() {
    const count = 40;
    for (let i = 0; i < count; i++) {
      const particle = document.createElement('div');
      particle.classList.add('particle');

      const size = Math.random() * 4 + 1;
      const x = Math.random() * 100;
      const delay = Math.random() * 15;
      const duration = Math.random() * 20 + 10;
      const isNeonColor = Math.random() > 0.5;

      particle.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        left: ${x}%;
        bottom: -20px;
        background: ${isNeonColor ? '#a855f7' : '#06b6d4'};
        box-shadow: 0 0 ${size * 3}px ${isNeonColor ? '#a855f7' : '#06b6d4'};
        animation-delay: ${delay}s;
        animation-duration: ${duration}s;
      `;

      particlesContainer.appendChild(particle);
    }
  }

  createParticles();

  /* ========== INTERSECTION OBSERVER - SCROLL ANIMATIONS ========== */
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, idx) => {
      if (entry.isIntersecting) {
        // Stagger animation for multiple elements
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, idx * 80);

        // Animate skill bars when visible
        if (entry.target.classList.contains('skill-bar-item')) {
          const fill = entry.target.querySelector('.skill-bar-fill');
          if (fill) {
            const width = fill.getAttribute('data-width');
            setTimeout(() => {
              fill.style.width = width + '%';
            }, 200);
          }
        }

        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe all animated elements
  const animatedElements = document.querySelectorAll(
    '[data-animate], .skill-category, .skill-bar-item, .timeline-item, .cert-card, .exp-role-banner, .exp-award-section, .exp-gallery-card, .paramount-banner, .achievement-gallery, .vol-card'
  );
  animatedElements.forEach(el => observer.observe(el));

  /* ========== SMOOTH SCROLL FOR NAV LINKS ========== */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* ========== CONTACT FORM HANDLER ========== */
  const contactForm = document.getElementById('contact-form');
  const formSuccess = document.getElementById('form-success');
  const submitBtn = document.getElementById('contact-submit');

  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const name = document.getElementById('contact-name').value.trim();
      const email = document.getElementById('contact-email').value.trim();
      const message = document.getElementById('contact-message').value.trim();

      if (!name || !email || !message) {
        // Shake animation on empty fields
        [name, email, message].forEach((val, i) => {
          const input = contactForm.querySelectorAll('.form-input')[i];
          if (!val) {
            input.style.borderColor = '#ef4444';
            input.style.animation = 'shake 0.4s ease';
            setTimeout(() => {
              input.style.borderColor = '';
              input.style.animation = '';
            }, 1000);
          }
        });
        return;
      }

      // Simulate sending (mailto fallback)
      submitBtn.textContent = 'Sending...';
      submitBtn.disabled = true;

      setTimeout(() => {
        const mailtoLink = `mailto:thamaraseekularathne11@gmail.com?subject=${encodeURIComponent(
          document.getElementById('contact-subject').value || 'Portfolio Contact'
        )}&body=${encodeURIComponent(
          `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
        )}`;

        window.location.href = mailtoLink;

        formSuccess.classList.add('show');
        contactForm.reset();
        submitBtn.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
          Send Message
        `;
        submitBtn.disabled = false;

        setTimeout(() => {
          formSuccess.classList.remove('show');
        }, 5000);
      }, 1000);
    });
  }

  /* ========== PROFILE IMAGE FALLBACK ========== */
  const heroImg = document.getElementById('hero-profile-img');
  if (heroImg) {
    heroImg.addEventListener('error', () => {
      // If custom profile image not found, show a placeholder avatar
      heroImg.style.display = 'none';
      const wrapper = heroImg.parentElement;
      const placeholder = document.createElement('div');
      placeholder.style.cssText = `
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background: linear-gradient(135deg, #a855f7, #06b6d4);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 5rem;
        font-weight: 900;
        color: white;
        z-index: 1;
        position: relative;
        border: 3px solid rgba(168, 85, 247, 0.4);
        box-shadow: 0 0 0 6px rgba(168, 85, 247, 0.1), 0 20px 60px rgba(168, 85, 247, 0.3);
        letter-spacing: -4px;
      `;
      placeholder.textContent = 'thamarasee';
      wrapper.insertBefore(placeholder, heroImg);
    });
  }

  /* ========== CURSOR GLOW EFFECT ========== */
  const cursorGlow = document.createElement('div');
  cursorGlow.style.cssText = `
    position: fixed;
    width: 300px;
    height: 300px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(168, 85, 247, 0.06) 0%, transparent 70%);
    pointer-events: none;
    z-index: 9999;
    transform: translate(-50%, -50%);
    transition: opacity 0.3s ease;
    will-change: transform;
  `;
  document.body.appendChild(cursorGlow);

  let mouseX = 0, mouseY = 0;
  let glowX = 0, glowY = 0;
  let animFrame;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    if (!animFrame) {
      animFrame = requestAnimationFrame(animateGlow);
    }
  });

  function animateGlow() {
    glowX += (mouseX - glowX) * 0.08;
    glowY += (mouseY - glowY) * 0.08;
    cursorGlow.style.left = glowX + 'px';
    cursorGlow.style.top = glowY + 'px';
    animFrame = requestAnimationFrame(animateGlow);
  }

  /* ========== SKILL BARS - INITIAL TRIGGER ========== */
  // Pre-initialize skill bars to 0 width
  document.querySelectorAll('.skill-bar-fill').forEach(bar => {
    bar.style.width = '0%';
  });

  /* ========== ADD SHAKE KEYFRAME DYNAMICALLY ========== */
  const style = document.createElement('style');
  style.textContent = `
    @keyframes shake {
      0%, 100% { transform: translateX(0); }
      25% { transform: translateX(-8px); }
      75% { transform: translateX(8px); }
    }
  `;
  document.head.appendChild(style);

  /* ========== FLOATING CARDS HOVER TILT ========== */
  document.querySelectorAll('.floating-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / (rect.width / 2);
      const dy = (e.clientY - cy) / (rect.height / 2);
      card.style.transform = `perspective(400px) rotateY(${dx * 10}deg) rotateX(${-dy * 10}deg) translateZ(10px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

  /* ========== INIT ========== */
  updateActiveNav();
  console.log('%c✨ Portfolio by Thamarasee Kularathne', 'color: #a855f7; font-weight: bold; font-size: 16px;');
  console.log('%c📊 Data Science | ML | AI', 'color: #06b6d4; font-size: 13px;');

});
