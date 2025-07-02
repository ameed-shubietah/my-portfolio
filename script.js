// script.js
document.addEventListener('DOMContentLoaded', () => {
  // — Mobile menu toggle —
  const menuBtn  = document.getElementById('mobile-menu');
  const navList  = document.querySelector('.nav-list');
  const navLinks = document.querySelectorAll('.nav-link');
  menuBtn.addEventListener('click', () => {
    navList.classList.toggle('active');
    menuBtn.classList.toggle('open');
  });

  // — Smooth scroll & close mobile menu on link click —
  navLinks.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      document.querySelector(link.getAttribute('href'))
              .scrollIntoView({ behavior: 'smooth' });
      navList.classList.remove('active');
    });
  });

  // — “View My Work” button custom slow scroll —
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
    function easeInOutQuad(t) {
      return t < 0.5 ? 2*t*t : -1 + (4 - 2*t)*t;
    }
    function loop(now) {
      const time   = now - startTime;
      const t      = Math.min(time / duration, 1);
      const easedT = easeInOutQuad(t);
      window.scrollTo(0, startY + (distanceY * easedT));
      if (time < duration) requestAnimationFrame(loop);
    }
    requestAnimationFrame(loop);
  }

  // — Scroll-spy: highlight nav-link of section in view —
  const sections    = document.querySelectorAll('section');
  const spyObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        document.querySelector('.nav-link.active')
                .classList.remove('active');
        document.querySelector(`.nav-link[href="#${entry.target.id}"]`)
                .classList.add('active');
      }
    });
  }, { threshold: 0.6 });
  sections.forEach(sec => spyObserver.observe(sec));


  // — Custom outline→fill→erase typing animation on hero words —
  const words        = ['Coder', 'Youtuber', 'Designer'];
  const typedEl      = document.querySelector('.hero-sub .typed');
  let   wordIndex    = 0;
  const startDelay   = 500;   // ms before first letter fills
  const fillSpeed    = 150;   // ms between each letter fill
  const holdDuration = 1000;  // ms to hold fully filled word
  const eraseSpeed   = 100;   // ms between each letter erase

  function animateWord() {
    const word = words[wordIndex];
    typedEl.innerHTML = '';
    const letters = [...word].map(ch => {
      const span = document.createElement('span');
      span.textContent = ch;
      span.classList.add('letter');
      typedEl.appendChild(span);
      return span;
    });

    // Fill in each letter
    letters.forEach((span, i) => {
      setTimeout(() => span.classList.add('filled'),
                 startDelay + i * fillSpeed);
    });

    // After filling + hold, erase backwards
    const fillDuration = fillSpeed * letters.length;
    setTimeout(() => {
      letters.slice().reverse().forEach((span, i) => {
        setTimeout(() => span.remove(), i * eraseSpeed);
      });
    }, startDelay + fillDuration + holdDuration);

    // Next word
    const total = startDelay + fillDuration + holdDuration + eraseSpeed * letters.length;
    setTimeout(() => {
      wordIndex = (wordIndex + 1) % words.length;
      animateWord();
    }, total);
  }
  animateWord();


  // — Animate skill bars when in view —
  const skillSection = document.getElementById('skills');
  const skillBars    = document.querySelectorAll('.progress-bar');
  let   skillsDone   = false;
  const skillObs     = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting && !skillsDone) {
      skillsDone = true;
      skillBars.forEach(bar => bar.style.width = bar.dataset.width);
      skillObs.disconnect();
    }
  }, { threshold: 0.5 });
  skillObs.observe(skillSection);

  // — About section slide-up + bio typing —
  const aboutContainer = document.querySelector('#about .about-container');
  function startAboutTyping() {
    new Typed('.about-typed', {
      strings: [
        "I’m <strong>Ameed Shubietah</strong>, Odoo Developer wi... Fluent in Arabic and English; open to remote or on-site roles."
      ],
      typeSpeed: 15,
      backSpeed: 0,
      startDelay: 100,
      showCursor: true,
      cursorChar: '|',
      smartBackspace: false,
      loop: false,
      contentType: 'html'
    });
  }
  const aboutObs = new IntersectionObserver((entries, obs) => {
    if (entries[0].isIntersecting) {
      entries[0].target.classList.add('in-view');
      startAboutTyping();
      obs.unobserve(entries[0].target);
    }
  }, { threshold: 0.2 });
  aboutObs.observe(aboutContainer);

});
