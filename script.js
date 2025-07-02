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

  // Scroll-spy: highlight nav-link of section in view
  const sections = document.querySelectorAll('section');
  const spyObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        document.querySelector('.nav-link.active').classList.remove('active');
        document.querySelector(`.nav-link[href="#${id}"]`).classList.add('active');
      }
    });
  }, { threshold: 0.6 });
  sections.forEach(sec => spyObserver.observe(sec));

  // Hero typing effect
  new Typed('.typed', {
    strings: ['Full-Stack Developer.', 'Odoo Developer.', 'Problem Solver.'],
    typeSpeed: 80,
    backSpeed: 40,
    backDelay: 2000,
    loop: true
  });

  // Animate skill bars when skills section appears
  const skillSection = document.getElementById('skills');
  const skillBars    = document.querySelectorAll('.progress-bar');
  let skillsPlayed   = false;
  const skillObserver = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting && !skillsPlayed) {
      skillsPlayed = true;
      skillBars.forEach(bar => bar.style.width = bar.dataset.width);
      skillObserver.disconnect();
    }
  }, { threshold: 0.5 });
  skillObserver.observe(skillSection);

  // About section slide-up + typing animation
  const aboutContainer = document.querySelector('#about .about-container');
  const aboutLines = [
    "I’m <strong>Ameed Shubietah</strong>, an Odoo Developer with 2 years of hands-on experience building and customising modules in Odoo. I have a solid foundation in Python, PostgreSQL and REST API integrations.",
    "I’ve delivered freelance projects automating CRM, Sales and Inventory workflows for SMEs—cutting manual data entry by up to 25%. I’m a quick learner, detail-oriented, active on Odoo Community forums, and fluent in Arabic & English."
  ];

  function startAboutTyping() {
  new Typed('.about-typed', {
    strings: aboutLines,
    typeSpeed: 5,        // very fast
    backSpeed: 0,
    startDelay: 200,
    showCursor: true,
    cursorChar: '|',
    smartBackspace: false,
    loop: false,
    contentType: 'html'
  });
}

  const aboutObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        startAboutTyping();
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });
  aboutObserver.observe(aboutContainer);
});
