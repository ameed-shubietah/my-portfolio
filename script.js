document.addEventListener('DOMContentLoaded', () => {
  // Mobile menu toggle
  const menuBtn  = document.getElementById('mobile-menu');
  const navList  = document.querySelector('.nav-list');
  const navLinks = document.querySelectorAll('.nav-link');

  menuBtn.addEventListener('click', () => {
    navList.classList.toggle('active');
    menuBtn.classList.toggle('open');
  });

  // Smooth scroll & close mobile menu on link click
  navLinks.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      document.querySelector(link.getAttribute('href'))
              .scrollIntoView({ behavior: 'smooth' });
      navList.classList.remove('active');
    });
  });

  // Custom slow scroll for “View My Work” button
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

  // Scroll-spy: highlight nav-link of section in view
  const sections    = document.querySelectorAll('section');
  const spyObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        document.querySelector('.nav-link.active').classList.remove('active');
        document.querySelector(`.nav-link[href="#${id}"]`).classList.add('active');
      }
    });
  }, { threshold: 0.6 });
  sections.forEach(sec => spyObserver.observe(sec));

  // Hero typing effect
  // Hero typing effect with outline→fill
new Typed('.typed', {
  strings: ['Coder', 'Youtuber', 'Designer'],
  typeSpeed: 80,
  backSpeed: 0,
  backDelay: 2000,
  loop: true,
  showCursor: false,
  onStringTyped: (arrayPos, self) => {
    const el = document.querySelector('.hero-sub .typed');
    el.classList.add('filled');
    // remove fill just before erasing so next word outlines too
    setTimeout(() => el.classList.remove('filled'), 1200);
  }
});


  // Animate skill bars
  const skillSection   = document.getElementById('skills');
  const skillBars      = document.querySelectorAll('.progress-bar');
  let skillsAnimated   = false;
  const skillObserver2 = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting && !skillsAnimated) {
      skillsAnimated = true;
      skillBars.forEach(bar => bar.style.width = bar.dataset.width);
      skillObserver2.disconnect();
    }
  }, { threshold: 0.5 });
  skillObserver2.observe(skillSection);

  // About section slide-up + fast typing of entire bio
  const aboutContainer = document.querySelector('#about .about-container');
  function startAboutTyping() {
    new Typed('.about-typed', {
      strings: [
        "I’m <strong>Ameed Shubietah</strong>, Odoo Developer with 2 years’ experience building and customizing Odoo modules. Skilled in Python, PostgreSQL, and REST APIs. Completed three freelance projects automating CRM, Sales, and Inventory, reducing manual data entry by 25%. Quick learner, detail-oriented, and active on Odoo Community forums. Fluent in Arabic and English; open to remote or on-site roles."
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

  const aboutObserver = new IntersectionObserver((entries, obs) => {
    if (entries[0].isIntersecting) {
      entries[0].target.classList.add('in-view');
      startAboutTyping();
      obs.unobserve(entries[0].target);
    }
  }, { threshold: 0.2 });
  aboutObserver.observe(aboutContainer);
});
