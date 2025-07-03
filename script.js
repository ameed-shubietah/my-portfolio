document.addEventListener('DOMContentLoaded', () => {
  // ── MOBILE MENU TOGGLE ──
  const menuBtn = document.getElementById('mobile-menu');
  const navList = document.querySelector('.nav-list');
  if (menuBtn && navList) {
    menuBtn.addEventListener('click', () => {
      navList.classList.toggle('active');
      menuBtn.classList.toggle('open');
    });
  }

  // ── SMOOTH SCROLL & CLOSE MOBILE MENU (ONLY HASH LINKS) ──
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href.startsWith('#')) {
      link.addEventListener('click', e => {
        e.preventDefault();
        const tgt = document.querySelector(href);
        if (tgt) tgt.scrollIntoView({ behavior: 'smooth' });
        navList?.classList.remove('active');
      });
    }
  });

  // ── “VIEW MY WORK” BUTTON ──
  const viewWorkBtn = document.querySelector('.hero .btn');
  if (viewWorkBtn) {
    const href = viewWorkBtn.getAttribute('href');
    if (href.startsWith('#')) {
      viewWorkBtn.addEventListener('click', e => {
        e.preventDefault();
        const tgt = document.querySelector(href);
        if (tgt) tgt.scrollIntoView({ behavior: 'smooth' });
      });
    }
  }

  // ── SCROLL‐SPY ──
  document.querySelectorAll('section[id]').forEach(sec => {
    const obs = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        document.querySelector('.nav-link.active')?.classList.remove('active');
        document.querySelector(`.nav-link[href="#${sec.id}"]`)?.classList.add('active');
      }
    }, { threshold: 0.6 });
    obs.observe(sec);
  });

  // ── SKILLS CHART ANIMATION ──
  const skillsSection = document.getElementById('skills');
  const skillRows     = document.querySelectorAll('.skill-row');
  if (skillsSection && skillRows.length) {
    const skillObserver = new IntersectionObserver((entries, observer) => {
      if (entries[0].isIntersecting) {
        skillRows.forEach(row => {
          const pct = parseInt(row.dataset.percent, 10);
          const bar = row.querySelector('.skill-bar');
          const disp = row.querySelector('.skill-percent');
          bar.style.width = pct + '%';

          let start = null;
          function animate(now) {
            if (!start) start = now;
            const progress = Math.min((now - start) / 1500, 1);
            disp.textContent = Math.floor(progress * pct) + '%';
            if (progress < 1) requestAnimationFrame(animate);
            else disp.textContent = pct + '%';
          }
          requestAnimationFrame(animate);
        });
        observer.disconnect();
      }
    }, { threshold: 0.5 });
    skillObserver.observe(skillsSection);
  }

  // ── HERO TYPING EFFECT ──
  const words       = ['Coder','Youtuber','Designer'];
  const el          = document.querySelector('.typed');
  let wordIndex     = 0;

  function showWord(word) {
    el.innerHTML = '';
    for (const ch of word) {
      const span = document.createElement('span');
      span.textContent = ch;
      span.classList.add('char');
      el.appendChild(span);
    }
    setTimeout(() => fillLetters(word), 500);
  }
  function fillLetters(word) {
    const chars = el.querySelectorAll('.char');
    chars.forEach((c,i) => setTimeout(() => c.classList.add('fill'), i * 200));
    setTimeout(eraseLetters, word.length * 200 + 1500);
  }
  function eraseLetters() {
    const chars = Array.from(el.querySelectorAll('.char')).reverse();
    chars.forEach((c,i) => setTimeout(() => {
      c.remove();
      if (i === chars.length - 1) setTimeout(nextWord, 500);
    }, i * 100));
  }
  function nextWord() {
    wordIndex = (wordIndex + 1) % words.length;
    showWord(words[wordIndex]);
  }
  showWord(words[wordIndex]);

  

  // ── SERVICE CARD ARROW TOGGLE ──
  document.querySelectorAll('.service .arrow').forEach(arrow => {
    arrow.addEventListener('click', e => {
      e.stopPropagation();
      arrow.closest('.service').classList.toggle('active');
    });
  });

  // ── PORTFOLIO CAROUSEL + LIGHTBOX ──
  const slides = document.querySelectorAll('.slide');
  let current   = 0;

  function showSlide(idx) {
    slides.forEach((s,i) => s.classList.toggle('active', i === idx));
  }

  // ** NEW: hook up our arrow-only controls **
  const prevBtn = document.querySelector('.carousel-controls .prev');
  const nextBtn = document.querySelector('.carousel-controls .next');
  if (prevBtn && nextBtn) {
    nextBtn.addEventListener('click', () => {
      current = (current + 1) % slides.length;
      showSlide(current);
    });
    prevBtn.addEventListener('click', () => {
      current = (current - 1 + slides.length) % slides.length;
      showSlide(current);
    });
  }

  // lightbox logic
  const lightbox    = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  document.querySelectorAll('.expand-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      const src = e.currentTarget.closest('.slide-image').querySelector('img').src;
      lightboxImg.src = src;
      lightbox.classList.remove('hidden');
    });
  });
  document.getElementById('lightbox-close').addEventListener('click', () => {
    lightbox.classList.add('hidden');
  });

  // show first
  showSlide(current);
});
