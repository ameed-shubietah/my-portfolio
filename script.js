document.addEventListener('DOMContentLoaded', () => {
  // ── MOBILE MENU TOGGLE ──
  const menuBtn  = document.getElementById('mobile-menu');
  const navList  = document.querySelector('.nav-list');
  if (menuBtn && navList) {
    menuBtn.addEventListener('click', () => {
      navList.classList.toggle('active');
      menuBtn.classList.toggle('open');
    });
  }

  // ── SMOOTH SCROLL & CLOSE MOBILE MENU ──
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const tgt = document.querySelector(link.getAttribute('href'));
      if (tgt) tgt.scrollIntoView({ behavior: 'smooth' });
      navList?.classList.remove('active');
    });
  });

  // ── “VIEW MY WORK” BUTTON ──
  const viewWorkBtn = document.querySelector('.hero .btn');
  if (viewWorkBtn) {
    viewWorkBtn.addEventListener('click', e => {
      e.preventDefault();
      const tgt = document.querySelector(viewWorkBtn.getAttribute('href'));
      if (tgt) tgt.scrollIntoView({ behavior: 'smooth' });
    });
  }

  // ── SCROLL‐SPY ──
  document.querySelectorAll('section[id]').forEach(sec => {
    const obs = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        document.querySelector('.nav-link.active')?.classList.remove('active');
        document.querySelector(`.nav-link[href="#${sec.id}"]`)?.classList.add('active');
      }
    }, { threshold: 0.6 });
    obs.observe(sec);
  });

  
  // SKILL BOX ANIMATION
const skillsSection = document.getElementById('skills');
const skillBoxes = document.querySelectorAll('.skill-box');

if (skillsSection && skillBoxes.length) {
  const skillObserver = new IntersectionObserver((entries, observer) => {
    if (entries[0].isIntersecting) {
      skillBoxes.forEach(box => {
        const percent = box.getAttribute('data-percent');
        const bar = box.querySelector('.skill-bar');
        bar.style.width = percent + '%';
      });
      observer.disconnect();
    }
  }, { threshold: 0.5 });
  skillObserver.observe(skillsSection);
}



 // Hero typing effect with outline→fill per word
  const words       = ['Coder','Youtuber','Designer'];
  const el          = document.querySelector('.typed');
  const outlineDelay = 500;   // ms before starting to fill
  const fillSpeed    = 200;   // ms per letter fill
  const filledDelay  = 1500;  // ms to pause once fully filled
  const eraseSpeed   = 100;   // ms per letter erase
  const nextDelay    = 500;   // ms before next word appears
  let wordIndex = 0;

  function showWord(word) {
    el.innerHTML = '';
    for (const ch of word) {
      const span = document.createElement('span');
      span.textContent = ch;
      span.classList.add('char');
      el.appendChild(span);
    }
    setTimeout(() => fillLetters(word), outlineDelay);
  }

  function fillLetters(word) {
    const chars = el.querySelectorAll('.char');
    chars.forEach((char, i) => {
      setTimeout(() => char.classList.add('fill'), i * fillSpeed);
    });
    setTimeout(eraseLetters, word.length * fillSpeed + filledDelay);
  }

  function eraseLetters() {
    const chars = Array.from(el.querySelectorAll('.char'));
    chars.reverse().forEach((char, idx) => {
      setTimeout(() => {
        char.remove();
        if (idx === chars.length - 1) {
          setTimeout(nextWord, nextDelay);
        }
      }, idx * eraseSpeed);
    });
  }

  function nextWord() {
    wordIndex = (wordIndex + 1) % words.length;
    showWord(words[wordIndex]);
  }

  // start the loop
  showWord(words[wordIndex]);
  // ── ABOUT‐ME TYPING (guarded) ──
  const aboutContainer = document.querySelector('#about .about-container');
  if (aboutContainer && window.Typed) {
    function startAboutTyping() {
      new Typed('.about-typed', {
        strings: [
          "I’m <strong>Ameed Shubietah</strong>, Odoo Developer…"
        ],
        typeSpeed: 15, showCursor: true, cursorChar: '|',
        loop: false, smartBackspace: false, contentType: 'html'
      });
    }
    const aboutObs = new IntersectionObserver((entries, obs) => {
      if (entries[0].isIntersecting) {
        aboutContainer.classList.add('in-view');
        startAboutTyping();
        obs.unobserve(entries[0].target);
      }
    }, { threshold: 0.2 });
    aboutObs.observe(aboutContainer);
  }

  // ── SERVICE CARD ARROW TOGGLE ──
  document.querySelectorAll('.service .arrow').forEach(arrow => {
    arrow.addEventListener('click', e => {
      e.stopPropagation();
      const card = arrow.closest('.service');
      card.classList.toggle('active');
    });
  });
});
