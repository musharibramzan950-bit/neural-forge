// ===== MAIN.JS =====

// Navbar scroll effect
const navbar = document.getElementById('navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) navbar.classList.add('scrolled');
    else navbar.classList.remove('scrolled');
  });
}

// Hamburger menu
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');
if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });
}

// Animated stat counters
function animateCounters() {
  const counters = document.querySelectorAll('.stat-num');
  counters.forEach(counter => {
    const target = parseFloat(counter.dataset.target);
    const isFloat = target % 1 !== 0;
    const duration = 1500;
    const start = performance.now();
    function update(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      const current = target * ease;
      counter.textContent = isFloat ? current.toFixed(1) : Math.floor(current).toLocaleString();
      if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
  });
}

// Intersection observer for feature cards
const featureCards = document.querySelectorAll('.feature-card');
if (featureCards.length) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = entry.target.dataset.delay || 0;
        setTimeout(() => entry.target.classList.add('visible'), parseInt(delay));
      }
    });
  }, { threshold: 0.1 });
  featureCards.forEach(card => observer.observe(card));
}

// Algo bar animations
const algoPills = document.querySelectorAll('.algo-pill');
if (algoPills.length) {
  const barObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const fill = entry.target.querySelector('.ap-fill');
        if (fill) {
          setTimeout(() => { fill.style.width = fill.style.width; }, 100);
        }
      }
    });
  }, { threshold: 0.2 });
  algoPills.forEach(p => barObserver.observe(p));
  
  // Trigger fills after a short delay
  setTimeout(() => {
    document.querySelectorAll('.ap-fill').forEach(f => {
      const w = f.style.width;
      f.style.width = '0';
      requestAnimationFrame(() => {
        requestAnimationFrame(() => { f.style.width = w; });
      });
    });
  }, 300);
}

// Hero stat counter observer
const heroSection = document.querySelector('.hero');
if (heroSection) {
  const heroObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      animateCounters();
      heroObserver.disconnect();
    }
  }, { threshold: 0.3 });
  heroObserver.observe(heroSection);
}

// Mini accuracy chart on index page
const miniCtx = document.getElementById('mini-chart');
if (miniCtx) {
  new Chart(miniCtx, {
    type: 'bar',
    data: {
      labels: ['RF', 'GB', 'NN', 'SVM', 'KNN', 'LR', 'DT'],
      datasets: [{
        label: 'Accuracy %',
        data: [98.4, 96.1, 94.7, 92.3, 90.8, 88.5, 85.2],
        backgroundColor: [
          'rgba(0,229,255,0.85)',
          'rgba(0,229,255,0.75)',
          'rgba(0,229,255,0.65)',
          'rgba(124,58,237,0.75)',
          'rgba(124,58,237,0.65)',
          'rgba(124,58,237,0.55)',
          'rgba(124,58,237,0.45)',
        ],
        borderRadius: 6,
        borderSkipped: false,
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: '#141d2e',
          borderColor: 'rgba(0,229,255,0.3)',
          borderWidth: 1,
          titleColor: '#e2e8f0',
          bodyColor: '#94a3b8',
          callbacks: {
            label: ctx => `Accuracy: ${ctx.raw}%`
          }
        }
      },
      scales: {
        y: {
          min: 80,
          max: 100,
          grid: { color: 'rgba(255,255,255,0.04)' },
          ticks: { color: '#64748b', font: { family: 'Space Mono', size: 10 }, callback: v => v + '%' }
        },
        x: {
          grid: { display: false },
          ticks: { color: '#64748b', font: { family: 'Space Mono', size: 10 } }
        }
      }
    }
  });
}
