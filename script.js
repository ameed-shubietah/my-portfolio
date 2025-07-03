document.addEventListener('DOMContentLoaded', () => {
  // ── MOBILE MENU TOGGLE ──
  const menuBtn  = document.getElementById('mobile-menu');
  const navList  = document.querySelector('.nav-list');
  const navLinks = document.querySelectorAll('.nav-link');

  menuBtn.addEventListener('click', () => {
    navList.classList.toggle('active');
    menuBtn.classList.toggle('open');
  });

  // ── SMOOTH SCROLL & CLOSE MOBILE MENU ON LINK CLICK ──
  navLinks.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      document
        .querySelector(link.getAttribute('href'))
        .scrollIntoView({ behavior: 'smooth' });
      navList.classList.remove('active');
    });
  });

  // ── “VIEW MY WORK” BUTTON SLOW SCROLL ──
  const viewWorkBtn = document.querySelector('.hero .btn');
  viewWorkBtn.addEventListener('click', e => {
    e.preventDefault();
    const targetEl = document.querySelector(viewWorkBtn.getAttribute('href'));
    const targetY  = targetEl.getBoundingClientRect().top + window.scrollY;
    smoothScrollTo(targetY, 1000);
  });

  function smoothScrollTo(endY, duration) {
    const startY    = window.scrollY;
    const distanceY = endY - startY;
    const startTime = performance.now();
    function ease(t) { return t < 0.5 ? 2*t*t : -1 + (4 - 2*t)*t; }
    function frame(now) {
      const t = Math.min((now - startTime) / duration, 1);
      window.scrollTo(0, startY + distanceY * ease(t));
      if (t < 1) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }

  // ── SCROLL-SPY ──
  document.querySelectorAll('section').forEach(sec => {
    new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        document.querySelector('.nav-link.active')?.classList.remove('active');
        document
          .querySelector(`.nav-link[href="#${sec.id}"]`)
          .classList.add('active');
      }
    }, { threshold: 0.6 }).observe(sec);
  });

  // ── HERO “Coder / Youtuber / Designer” EFFECT ──
  (function heroLoop() {
    const words        = ['Coder','Youtuber','Designer'];
    const el           = document.querySelector('.hero-sub .typed');
    const outlineDelay = 500,
          fillSpeed    = 200,
          holdTime     = 1500,
          eraseSpeed   = 100,
          nextDelay    = 500;
    let idx = 0;

    function showOutline(word) {
      el.innerHTML = '';
      word.split('').forEach(ch => {
        const span = document.createElement('span');
        span.textContent = ch;
        span.classList.add('char');
        el.appendChild(span);
      });
      setTimeout(fillLetters, outlineDelay);
    }

    function fillLetters() {
      const chars = el.querySelectorAll('.char');
      chars.forEach((span, i) => {
        setTimeout(() => span.classList.add('fill'), i * fillSpeed);
      });
      setTimeout(eraseLetters, chars.length * fillSpeed + holdTime);
    }

    function eraseLetters() {
      const chars = Array.from(el.querySelectorAll('.char')).reverse();
      chars.forEach((span, i) => {
        setTimeout(() => {
          span.remove();
          if (i === chars.length - 1) {
            idx = (idx + 1) % words.length;
            setTimeout(() => showOutline(words[idx]), nextDelay);
          }
        }, i * eraseSpeed);
      });
    }

    showOutline(words[idx]);
  })();

  // ── SKILL BAR ANIMATION ──
  const bars = document.querySelectorAll('.progress-bar');
  new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
      bars.forEach(b => b.style.width = b.dataset.width);
      this.disconnect();
    }
  }, { threshold: 0.5 }).observe(document.getElementById('skills'));

  // ── ABOUT-ME TYPING ──
  const aboutContainer = document.querySelector('#about .about-container');
  function startAboutTyping() {
    new Typed('.about-typed', {
      strings: [
        "I’m <strong>Ameed Shubietah</strong>, Odoo Developer with 2 years of experience in building web apps & open-source modules, bilingual in Arabic & English; open to both remote and on-premise jobs."
      ],
      typeSpeed: 15,
      showCursor: true,
      cursorChar: '|',
      loop: false,
      backSpeed: 0,
      smartBackspace: false,
      contentType: 'html'
    });
  }
  new IntersectionObserver((entries, obs) => {
    if (entries[0].isIntersecting) {
      entries[0].target.classList.add('in-view');
      startAboutTyping();
      obs.unobserve(entries[0].target);
    }
  }, { threshold: 0.2 }).observe(aboutContainer);

  // ── SERVICE CARD ARROW TOGGLE ──
  document.querySelectorAll('.service .arrow').forEach(arrow => {
    arrow.addEventListener('click', e => {
      e.stopPropagation();
      const card = arrow.closest('.service');
      card.classList.toggle('active');
    });
  });

});
