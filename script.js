document.addEventListener('DOMContentLoaded', () => {
  // Mobile Menu Toggle
  const mobileBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');

  if (mobileBtn && navLinks) {
    mobileBtn.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      const icon = mobileBtn.querySelector('i');
      if (navLinks.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
      } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
      }
    });

    // Close menu when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        const icon = mobileBtn.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
      });
    });
  }

  // Inject Google Translate Widget dynamically into all navbars
  const navLinksList = document.querySelector('.nav-links');
  if (navLinksList && !document.getElementById('google_translate_element')) {
    const translateLi = document.createElement('li');
    translateLi.id = 'google_translate_element';
    navLinksList.appendChild(translateLi);

    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    document.body.appendChild(script);

    window.googleTranslateElementInit = function () {
      new google.translate.TranslateElement({
        pageLanguage: 'en',
        includedLanguages: 'en,tr,hi',
        layout: google.translate.TranslateElement.InlineLayout.SIMPLE
      }, 'google_translate_element');
    };
  }

  // Navbar scroll effect
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
  }

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  });

  // Highlight active link based on current page URL
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(link => {
    if (link.getAttribute('href') === currentPath) {
      link.style.color = 'var(--primary)';
    }
  });

  // Stagger animation for cards
  const cards = document.querySelectorAll('.card');
  if (cards.length > 0) {
    cards.forEach((card, index) => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(20px)';
      card.style.animation = `fadeUp 0.5s ease forwards ${index * 0.1 + 0.3}s`;
    });
  }

  // Dynamic Announcements Rendering
  const announcementsContainer = document.getElementById('announcements-container');
  if (announcementsContainer && typeof announcements !== 'undefined') {
    announcementsContainer.innerHTML = ''; // Clear fallback text

    announcements.forEach((item, index) => {
      const card = document.createElement('div');
      card.className = 'card glass announcement-card';

      // Inline styles for cards handled by JS to maintain animation staggering
      card.style.opacity = '0';
      card.style.transform = 'translateY(20px)';
      card.style.animation = `fadeUp 0.5s ease forwards ${index * 0.1 + 0.3}s`;

      card.innerHTML = `
        <span class="date-badge">${item.date}</span>
        <h3>${item.title}</h3>
        <p>${item.content}</p>
      `;

      announcementsContainer.appendChild(card);
    });
  }
});
