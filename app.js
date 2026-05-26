document.addEventListener('DOMContentLoaded', () => {
  // --- Mobile Navigation Toggle ---
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('nav');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      const icon = navToggle.querySelector('i');
      if (icon) {
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
      }
    });

    // Close menu when link is clicked
    navMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        const icon = navToggle.querySelector('i');
        if (icon) {
          icon.classList.add('fa-bars');
          icon.classList.remove('fa-times');
        }
      });
    });
  }

  // --- Header Scroll Effect ---
  const header = document.querySelector('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // --- Tabs Navigation (Business Divisions) ---
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const tabId = btn.getAttribute('data-tab');

      tabBtns.forEach(b => b.classList.remove('active'));
      tabContents.forEach(c => c.classList.remove('active'));

      btn.classList.add('active');
      const activeContent = document.getElementById(tabId);
      if (activeContent) {
        activeContent.classList.add('active');
      }
    });
  });

  // --- Interactive Map State Selection ---
  const statesData = {
    TN: {
      name: 'Tamil Nadu (Chennai HQ)',
      details: {
        'Established Presence': '2001',
        'Key Projects': 'SPR City Sky Towers, Market of India',
        'Operations': 'Headquarters, Sales & Distribution Hub',
        'Industry Focus': 'Real Estate, Distribution, Precious Metals'
      }
    },
    KA: {
      name: 'Karnataka (Bengaluru)',
      details: {
        'Established Presence': '2008',
        'Key Projects': 'Commercial Space Partnerships',
        'Operations': 'Regional Sales Office, Precious Metals Trade',
        'Industry Focus': 'Distribution, Precious Metals Import'
      }
    },
    GJ: {
      name: 'Gujarat (Ahmedabad)',
      details: {
        'Established Presence': '2012',
        'Key Projects': 'Logistics & Supply Chain Hub',
        'Operations': 'Consumer Electronics Distribution, Precious Metals',
        'Industry Focus': 'Precious Metals Trading, Clocks & Watches'
      }
    },
    RJ: {
      name: 'Rajasthan (Jaipur)',
      details: {
        'Established Presence': '2005',
        'Key Projects': 'Investment Portfolios',
        'Operations': 'Venture Funding & Asset Allocations',
        'Industry Focus': 'Investments, Real Estate Partnerships'
      }
    }
  };

  const mapStates = document.querySelectorAll('.map-state');
  const stateTitle = document.getElementById('selected-state-title');
  const stateDetailsList = document.getElementById('state-details-list');

  function updateStateCard(stateCode) {
    const data = statesData[stateCode];
    if (data) {
      // Remove active from all states
      mapStates.forEach(s => s.classList.remove('active'));
      // Add active to selected state
      const targetState = document.querySelector(`.map-state[data-state="${stateCode}"]`);
      if (targetState) targetState.classList.add('active');

      stateTitle.textContent = data.name;
      stateDetailsList.innerHTML = '';
      
      for (const [key, value] of Object.entries(data.details)) {
        const li = document.createElement('li');
        li.innerHTML = `<span>${key}</span><span>${value}</span>`;
        stateDetailsList.appendChild(li);
      }
    }
  }

  mapStates.forEach(state => {
    state.addEventListener('click', () => {
      const stateCode = state.getAttribute('data-state');
      updateStateCard(stateCode);
    });
  });

  // Initialize with Tamil Nadu
  updateStateCard('TN');

  // --- Statistics Counters ---
  const stats = document.querySelectorAll('.stat-number');
  const speed = 200; // The lower the slower

  const animateStats = () => {
    stats.forEach(counter => {
      const updateCount = () => {
        const target = +counter.getAttribute('data-target');
        const count = +counter.innerText.replace(/[+,%]/g, '');
        const inc = target / speed;

        if (count < target) {
          counter.innerText = Math.ceil(count + inc) + (counter.getAttribute('data-suffix') || '');
          setTimeout(updateCount, 1);
        } else {
          counter.innerText = target + (counter.getAttribute('data-suffix') || '');
        }
      };
      updateCount();
    });
  };

  // Run counters animation when visible
  const observerOptions = {
    threshold: 0.5
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateStats();
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const statsSection = document.querySelector('.investor-graphics');
  if (statsSection) {
    observer.observe(statsSection);
  }

  // --- Gallery Filters ---
  const filterBtns = document.querySelectorAll('.gallery-filters .tab-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Toggle button active state
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      galleryItems.forEach(item => {
        if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
          item.style.display = 'block';
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'scale(1)';
          }, 50);
        } else {
          item.style.opacity = '0';
          item.style.transform = 'scale(0.8)';
          setTimeout(() => {
            item.style.display = 'none';
          }, 400);
        }
      });
    });
  });

  // --- Investor Form Handling ---
  const investorForm = document.getElementById('investor-form');
  if (investorForm) {
    investorForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('inv-name').value;
      const email = document.getElementById('inv-email').value;
      const phone = document.getElementById('inv-phone').value;
      const budget = document.getElementById('inv-budget').value;

      // Show beautiful feedback
      alert(`Thank you, ${name}! Your investor inquiry for M R Agencies has been received. Our investments team will contact you at ${email} or ${phone} shortly regarding opportunities with a target of ${budget}.`);
      investorForm.reset();
    });
  }

  // --- Brochure Download Form ---
  window.downloadBrochure = function() {
    const email = prompt("Enter your business email to download the M R Agencies Investor & Project Brochure:");
    if (email) {
      alert(`The download link for the M R Agencies Portfolio Brochure has been sent to: ${email}`);
    }
  };

  // --- Lightbox Modal Functionality ---
  const lightboxModal = document.getElementById('lightbox-modal');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxVideo = document.getElementById('lightbox-video');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const lightboxClose = document.querySelector('.lightbox-close');

  function openLightbox(src, altText = '') {
    if (!lightboxModal) return;

    const isVideo = src.toLowerCase().endsWith('.mp4') || src.toLowerCase().endsWith('.webm');

    if (isVideo) {
      if (lightboxImg) lightboxImg.style.display = 'none';
      if (lightboxVideo) {
        lightboxVideo.src = src;
        lightboxVideo.style.display = 'block';
        lightboxVideo.load();
        lightboxVideo.play().catch(err => console.log("Video auto-play prevented:", err));
      }
    } else {
      if (lightboxVideo) {
        lightboxVideo.style.display = 'none';
        lightboxVideo.pause();
        lightboxVideo.src = '';
      }
      if (lightboxImg) {
        lightboxImg.src = src;
        lightboxImg.alt = altText;
        lightboxImg.style.display = 'block';
      }
    }

    if (lightboxCaption) {
      lightboxCaption.textContent = altText;
    }

    lightboxModal.classList.add('show');
    lightboxModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden'; // prevent page scroll
  }

  function closeLightbox() {
    if (lightboxModal) {
      lightboxModal.classList.remove('show');
      lightboxModal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = ''; // restore scroll

      // Stop and clear video if it was playing
      if (lightboxVideo) {
        lightboxVideo.pause();
        lightboxVideo.src = '';
        lightboxVideo.style.display = 'none';
      }
      if (lightboxImg) {
        lightboxImg.src = '';
        lightboxImg.style.display = 'none';
      }
    }
  }

  // Bind trigger click events
  document.querySelectorAll('.lightbox-trigger').forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      // Prevent double trigger if clicking button inside trigger wrapper
      if (e.target.tagName === 'BUTTON' || e.target.closest('button')) {
        return;
      }
      const src = trigger.getAttribute('data-src') || trigger.querySelector('img')?.src;
      const altText = trigger.getAttribute('title') || trigger.querySelector('img')?.alt || trigger.querySelector('h5')?.textContent || 'Visual Portfolio';
      if (src) {
        openLightbox(src, altText);
      }
    });
  });

  if (lightboxClose) {
    lightboxClose.addEventListener('click', closeLightbox);
  }

  if (lightboxModal) {
    // Close modal when clicking outside the media container
    lightboxModal.addEventListener('click', (e) => {
      if (e.target === lightboxModal) {
        closeLightbox();
      }
    });
  }

  // Keyboard support (Escape key to close)
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeLightbox();
    }
  });

  // Global helper to view brochure/video easily
  window.viewBrochure = function(src, title) {
    openLightbox(src, title);
  };
});

