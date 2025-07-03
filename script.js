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

  // SKILL CHART ANIMATION
  const skillsSection = document.getElementById('skills');
  const skillRows = document.querySelectorAll('.skill-row');

  if (skillsSection && skillRows.length) {
    const skillObserver = new IntersectionObserver((entries, observer) => {
      if (entries[0].isIntersecting) {
        skillRows.forEach(row => {
          const percent = parseInt(row.getAttribute('data-percent'));
          const bar = row.querySelector('.skill-bar');
          const percentDisplay = row.querySelector('.skill-percent');

          // Animate bar fill
          bar.style.width = percent + '%';

          // Animate percentage number
          let current = 0;
          const duration = 1500; // duration of count in ms
          const startTime = performance.now();

          function updateNumber(now) {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const value = Math.floor(progress * percent);
            percentDisplay.textContent = value + '%';

            if (progress < 1) {
              requestAnimationFrame(updateNumber);
            } else {
              percentDisplay.textContent = percent + '%'; // Ensure it ends exactly at target
            }
          }

          requestAnimationFrame(updateNumber);
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

  // ── SERVICE CARD ARROW TOGGLE ──
  document.querySelectorAll('.service .arrow').forEach(arrow => {
    arrow.addEventListener('click', e => {
      e.stopPropagation();
      arrow.closest('.service').classList.toggle('active');
    });
  });


  // ── LIGHTBOX CAROUSEL (new code) ──

  // we'll store the two URLs and which one is showing
  let lbImages = [];
  let lbIndex  = 0;

  // grab our new elements
  const lb       = document.getElementById('lightbox');
  const lbImg    = document.getElementById('lightbox-img');
  const btnPrev  = document.getElementById('lightbox-prev');
  const btnNext  = document.getElementById('lightbox-next');
  const btnClose = document.getElementById('lightbox-close');

  // wire up your Expand buttons
  document.querySelectorAll('.expand-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      const slideImg = e.currentTarget.closest('.slide-image').querySelector('img');
      const src1     = slideImg.src;
      const src2     = btn.dataset.second; // may be `undefined`

      // build our array of images
      lbImages = [ src1 ];
      if (src2) lbImages.push(src2);

      // start at first image
      lbIndex = 0;
      updateLightbox();

      lb.classList.remove('hidden');
    });
  });

  // show/hide arrows and set the <img> src
  function updateLightbox() {
    lbImg.src = lbImages[lbIndex];
    btnPrev.style.display = lbImages.length > 1 ? '' : 'none';
    btnNext.style.display = lbImages.length > 1 ? '' : 'none';
  }

  // Prev / Next handlers
  btnPrev.addEventListener('click', () => {
    lbIndex = (lbIndex - 1 + lbImages.length) % lbImages.length;
    updateLightbox();
  });
  btnNext.addEventListener('click', () => {
    lbIndex = (lbIndex + 1) % lbImages.length;
    updateLightbox();
  });

  // Close handler
  btnClose.addEventListener('click', () => {
    lb.classList.add('hidden');
  });

});
