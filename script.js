document.addEventListener('DOMContentLoaded', () => {
  // Mobile menu toggle
  const menuBtn   = document.getElementById('mobile-menu'),
        navList   = document.querySelector('.nav-list'),
        navLinks  = document.querySelectorAll('.nav-link');

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
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      const id = entry.target.getAttribute('id');
      if (entry.isIntersecting) {
        document.querySelector('.nav-link.active').classList.remove('active');
        document.querySelector(`.nav-link[href="#${id}"]`).classList.add('active');
      }
    });
  }, { threshold: 0.6 });

  sections.forEach(sec => observer.observe(sec));

  // Typed.js effect
  new Typed('.typed', {
    strings: [ 'Full-Stack Developer.', 'Odoo Developer.', 'Problem Solver.' ],
    typeSpeed: 80,
    backSpeed: 40,
    backDelay: 2000,
    loop: true
  });

  // Animate skill bars when skills section appears
  const skillSection = document.getElementById('skills'),
        skillBars    = document.querySelectorAll('.progress-bar');

  let skillsPlayed = false;
  const skillObserver = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting && !skillsPlayed) {
      skillsPlayed = true;
      skillBars.forEach(bar => {
        bar.style.width = bar.dataset.width;
      });
      skillObserver.disconnect();
    }
  }, { threshold: 0.5 });

  skillObserver.observe(skillSection);
});
// Animate About section when scrolled into view
const aboutSection = document.querySelector('#about .about-container');
const aboutObserver = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      obs.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

aboutObserver.observe(aboutSection);

