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

  // ── SKILL CHART ANIMATION ──
  const skillsSection = document.getElementById('skills');
  const skillRows = document.querySelectorAll('.skill-row');
  if (skillsSection && skillRows.length) {
    const skillObserver = new IntersectionObserver((entries, observer) => {
      if (entries[0].isIntersecting) {
        skillRows.forEach(row => {
          const percent = +row.dataset.percent;
          const bar = row.querySelector('.skill-bar');
          const pct = row.querySelector('.skill-percent');
          bar.style.width = percent + '%';

          // count up number
          const start = performance.now();
          const duration = 1500;
          function tick(now) {
            const t = Math.min((now - start) / duration, 1);
            pct.textContent = Math.floor(t * percent) + '%';
            if (t < 1) requestAnimationFrame(tick);
            else pct.textContent = percent + '%';
          }
          requestAnimationFrame(tick);
        });
        observer.disconnect();
      }
    }, { threshold: 0.5 });
    skillObserver.observe(skillsSection);
  }

  // ── HERO TYPING EFFECT ──
  const words = ['Coder','Youtuber','Designer'];
  const el = document.querySelector('.typed');
  if (el) {
    let idx = 0;
    const outlineDelay = 500, fillSpeed = 200, filledDelay = 1500, eraseSpeed = 100, nextDelay = 500;
    function showWord(w) {
      el.innerHTML = '';
      for (const ch of w) {
        const s = document.createElement('span');
        s.textContent = ch;
        s.classList.add('char');
        el.append(s);
      }
      setTimeout(() => fillLetters(w), outlineDelay);
    }
    function fillLetters(w) {
      el.querySelectorAll('.char').forEach((c,i) =>
        setTimeout(() => c.classList.add('fill'), i * fillSpeed)
      );
      setTimeout(eraseLetters, w.length * fillSpeed + filledDelay);
    }
    function eraseLetters() {
      const chars = Array.from(el.querySelectorAll('.char')).reverse();
      chars.forEach((c,i) =>
        setTimeout(() => {
          c.remove();
          if (i === chars.length - 1) setTimeout(nextWord, nextDelay);
        }, i * eraseSpeed)
      );
    }
    function nextWord() {
      idx = (idx + 1) % words.length;
      showWord(words[idx]);
    }
    showWord(words[0]);
  }

  // ── ABOUT‐ME TYPING ──
  const aboutEl = document.querySelector('#about .about-container');
  if (aboutEl && window.Typed) {
    const obs = new IntersectionObserver((entries,ob)=> {
      if (entries[0].isIntersecting) {
        new Typed('.about-typed', {
          strings: ["I’m <strong>Ameed Shubietah</strong>, Odoo Developer…"],
          typeSpeed: 15, showCursor: true, cursorChar: '|',
          loop: false, smartBackspace: false, contentType: 'html'
        });
        ob.unobserve(entries[0].target);
      }
    }, { threshold: 0.2 });
    obs.observe(aboutEl);
  }

  // ── SERVICE CARD ARROW TOGGLE ──
  document.querySelectorAll('.service .arrow').forEach(arrow => {
    arrow.addEventListener('click', e => {
      e.stopPropagation();
      arrow.closest('.service').classList.toggle('active');
    });
  });
});
