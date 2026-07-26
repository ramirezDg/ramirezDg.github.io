/* ============================================
   PORTFOLIO — Main JavaScript
   ============================================ */

/* -- 1. MOBILE MENU TOGGLE -- */
(() => {
  const toggle = document.querySelector('.nav-toggle');
  const menu = document.querySelector('.nav-links');
  const overlay = document.getElementById('nav-overlay');
  const links = menu ? menu.querySelectorAll('a') : [];

  if (!toggle || !menu) return;

  const closeMenu = () => {
    menu.classList.remove('is-open');
    toggle.classList.remove('is-active');
    toggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
    if (overlay) {
      overlay.classList.remove('is-visible');
      overlay.setAttribute('aria-hidden', 'true');
    }
  };

  const openMenu = () => {
    menu.classList.add('is-open');
    toggle.classList.add('is-active');
    toggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
    if (overlay) {
      overlay.classList.add('is-visible');
      overlay.setAttribute('aria-hidden', 'false');
    }
  };

  toggle.addEventListener('click', () => {
    const isOpen = menu.classList.contains('is-open');
    isOpen ? closeMenu() : openMenu();
  });

  if (overlay) {
    overlay.addEventListener('click', closeMenu);
  }

  links.forEach(link => link.addEventListener('click', closeMenu));

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menu.classList.contains('is-open')) {
      closeMenu();
      toggle.focus();
    }
  });
})();

/* -- 2. SCROLL REVEAL (IntersectionObserver) -- */
(() => {
  const reveals = document.querySelectorAll('.reveal');
  if (!reveals.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  reveals.forEach(el => observer.observe(el));
})();

/* -- 3. ACTIVE NAV LINK ON SCROLL -- */
(() => {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');
  if (!sections.length || !navLinks.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach(link => {
            link.setAttribute(
              'aria-current',
              link.getAttribute('href') === `#${id}` ? 'true' : 'false'
            );
          });
        }
      });
    },
    { threshold: 0.3, rootMargin: '-20% 0px -60% 0px' }
  );

  sections.forEach(section => observer.observe(section));
})();

/* -- 4. PROJECT CAROUSEL — True Infinite Scroll -- */
/*
 * Architecture:
 *   Track layout: [prepend clones] [real slides] [append clones]
 *   trackIdx starts at origCount (pointing at first real slide).
 *   After each animated move, if trackIdx left the real zone, we
 *   teleport (no transition) back into it — seamless loop.
 *
 *   Slide widths are set in JS so every card is pixel-perfect equal.
 *   SLIDE_GAP must match the CSS gap on .carousel-track (1.5rem = 24px).
 */
(() => {
  const track       = document.getElementById('carousel-track');
  const prevBtn     = document.querySelector('.carousel-btn--prev');
  const nextBtn     = document.querySelector('.carousel-btn--next');
  const dotsWrap    = document.getElementById('carousel-dots');
  const filterBtns  = document.querySelectorAll('.filter-btn');
  const carouselEl  = document.getElementById('projects-carousel');

  if (!track || !prevBtn || !nextBtn || !carouselEl) return;

  /* ---- constants ---- */
  const SLIDE_GAP  = 24;   // px — must equal CSS gap: 1.5rem
  const AUTO_DELAY = 4000; // ms
  const EASE       = 'cubic-bezier(0.22, 1, 0.36, 1)';

  /* ---- Save all original slides BEFORE any DOM changes ---- */
  const ALL_SLIDES = Array.from(track.querySelectorAll('.carousel-slide'));

  /* ---- mutable state ---- */
  let spv        = 3;    // slides per view
  let slideW     = 0;    // px width of each slide (set by JS)
  let trackIdx   = 0;    // absolute index in the cloned track
  let origCount  = 0;    // real slides currently in track
  let infinite   = false;
  let animating  = false;
  let autoTimer  = null;
  let paused     = false;

  /* ================================================================
     HELPERS
     ================================================================ */

  const calcSpv = () => {
    const w = window.innerWidth;
    if (w <= 768)  return 1;
    if (w <= 1024) return 2;
    return 3;
  };

  const computeSlideW = () => {
    const vw = track.parentElement.offsetWidth;
    if (!vw) return Math.floor((window.innerWidth - 200 - SLIDE_GAP * (spv - 1)) / spv);
    return Math.floor((vw - SLIDE_GAP * (spv - 1)) / spv);
  };

  const applyWidths = (w) => {
    track.querySelectorAll('.carousel-slide').forEach(s => {
      s.style.width      = w + 'px';
      s.style.flexBasis  = w + 'px';
      s.style.minWidth   = w + 'px';
    });
  };

  /* Track offset for a given absolute index */
  const offsetFor = (idx) => idx * (slideW + SLIDE_GAP);

  /* Move the track — animate=false means instant (no transition) */
  const moveTrack = (idx, animate = true) => {
    track.style.transition = animate
      ? `transform 500ms ${EASE}`
      : 'none';
    track.style.transform = `translateX(-${offsetFor(idx)}px)`;
  };

  /* ================================================================
     DOM: rebuild track with clones around real slides
     ================================================================ */
  const buildTrack = (slides) => {
    /* Remove everything */
    track.innerHTML = '';

    origCount = slides.length;
    if (origCount === 0) { infinite = false; return; }

    infinite = origCount > spv;

    if (infinite) {
      /* --- prepend clones (same order as originals) --- */
      const pre = document.createDocumentFragment();
      slides.forEach(s => {
        const c = s.cloneNode(true);
        c.classList.add('is-clone');
        pre.appendChild(c);
      });
      track.appendChild(pre);
    }

    /* --- real slides --- */
    slides.forEach(s => track.appendChild(s));

    if (infinite) {
      /* --- append clones (same order as originals) --- */
      const app = document.createDocumentFragment();
      slides.forEach(s => {
        const c = s.cloneNode(true);
        c.classList.add('is-clone');
        app.appendChild(c);
      });
      track.appendChild(app);
    }

    /* Start position: first real slide */
    trackIdx = infinite ? origCount : 0;
  };

  /* ================================================================
     DOTS
     ================================================================ */
  const syncDots = () => {
    /* Which real slide index is currently "first"? */
    const logical = infinite
      ? ((trackIdx - origCount) % origCount + origCount) % origCount
      : Math.min(trackIdx, Math.max(0, origCount - 1));

    dotsWrap.querySelectorAll('.carousel-dot').forEach((d, i) => {
      d.classList.toggle('is-active', i === logical);
    });
  };

  const buildDots = () => {
    dotsWrap.innerHTML = '';
    for (let i = 0; i < origCount; i++) {
      const btn = document.createElement('button');
      btn.className = 'carousel-dot';
      btn.setAttribute('role', 'tab');
      btn.setAttribute('aria-label', `Proyecto ${i + 1} de ${origCount}`);
      btn.addEventListener('click', () => {
        if (animating) return;
        /* Jump to corresponding real slide */
        const target = infinite ? origCount + i : i;
        trackIdx = target;
        moveTrack(trackIdx);
        syncDots();
        resetAuto();
      });
      dotsWrap.appendChild(btn);
    }
    syncDots();
  };

  /* ================================================================
     NORMALISE after transition (teleport if we left the real zone)
     ================================================================ */
  const normalize = () => {
    if (!infinite) return;
    let jumped = false;

    if (trackIdx >= origCount * 2) {
      trackIdx -= origCount;
      jumped = true;
    } else if (trackIdx < origCount) {
      trackIdx += origCount;
      jumped = true;
    }

    if (jumped) {
      moveTrack(trackIdx, false);
      track.getBoundingClientRect(); /* force reflow */
    }

    syncDots();
  };

  /* ================================================================
     NAVIGATION
     ================================================================ */
  const onTransitionEnd = () => {
    normalize();
    animating = false;
  };

  const goNext = () => {
    if (animating || origCount === 0) return;
    animating = true;
    trackIdx++;
    moveTrack(trackIdx);
    syncDots();
    track.addEventListener('transitionend', onTransitionEnd, { once: true });
  };

  const goPrev = () => {
    if (animating || origCount === 0) return;
    animating = true;
    trackIdx--;
    moveTrack(trackIdx);
    syncDots();
    track.addEventListener('transitionend', onTransitionEnd, { once: true });
  };

  /* ================================================================
     AUTO-SCROLL
     ================================================================ */
  const stopAuto  = () => { clearInterval(autoTimer); autoTimer = null; };
  const startAuto = () => {
    stopAuto();
    if (!paused && origCount > spv) {
      autoTimer = setInterval(goNext, AUTO_DELAY);
    }
  };
  const resetAuto = () => { stopAuto(); startAuto(); };

  /* ================================================================
     FILTER
     ================================================================ */
  const applyFilter = (cat) => {
    stopAuto();
    animating = false;
    spv     = calcSpv();
    slideW  = computeSlideW();

    const matching = ALL_SLIDES.filter(
      s => cat === 'all' || s.dataset.category === cat
    );

    buildTrack(matching);
    applyWidths(slideW);
    moveTrack(trackIdx, false);
    buildDots();
    prevBtn.disabled = false;
    nextBtn.disabled = false;
    startAuto();
  };

  /* ================================================================
     INIT
     ================================================================ */
  const init = () => {
    spv    = calcSpv();
    slideW = computeSlideW();
    buildTrack(ALL_SLIDES);
    applyWidths(slideW);
    moveTrack(trackIdx, false);
    buildDots();
    prevBtn.disabled = false;
    nextBtn.disabled = false;
    startAuto();
  };

  /* ================================================================
     EVENTS
     ================================================================ */

  /* Filter buttons */
  filterBtns.forEach(btn => btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('is-active'));
    btn.classList.add('is-active');
    applyFilter(btn.dataset.filter);
  }));

  /* Arrow buttons */
  prevBtn.addEventListener('click', () => { goPrev(); resetAuto(); });
  nextBtn.addEventListener('click', () => { goNext(); resetAuto(); });

  /* Hover pause */
  carouselEl.addEventListener('mouseenter', () => { paused = true;  stopAuto(); });
  carouselEl.addEventListener('mouseleave', () => { paused = false; startAuto(); });

  /* Touch swipe */
  let touchX = 0;
  track.addEventListener('touchstart', e => {
    touchX = e.changedTouches[0].screenX;
  }, { passive: true });
  track.addEventListener('touchend', e => {
    const diff = touchX - e.changedTouches[0].screenX;
    if (Math.abs(diff) > 50) { diff > 0 ? goNext() : goPrev(); resetAuto(); }
  }, { passive: true });

  /* Keyboard */
  carouselEl.setAttribute('tabindex', '0');
  carouselEl.addEventListener('keydown', e => {
    if (e.key === 'ArrowLeft')  { goPrev(); resetAuto(); }
    if (e.key === 'ArrowRight') { goNext(); resetAuto(); }
  });

  /* Resize */
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      const newSpv = calcSpv();
      const activeFilter = document.querySelector('.filter-btn.is-active')?.dataset.filter || 'all';
      if (newSpv !== spv) {
        /* Rebuild for new spv (infinite decision may change) */
        spv = newSpv;
        applyFilter(activeFilter);
      } else {
        /* Just recompute widths and reposition */
        slideW = computeSlideW();
        applyWidths(slideW);
        moveTrack(trackIdx, false);
      }
    }, 150);
  });

  /* Tab visibility */
  document.addEventListener('visibilitychange', () => {
    document.hidden ? stopAuto() : (paused ? null : startAuto());
  });

  /* Boot after layout is painted */
  requestAnimationFrame(init);
})();

/* -- 5. NAV BACKGROUND ON SCROLL -- */
(() => {
  const nav = document.querySelector('.nav');
  if (!nav) return;

  const onScroll = () => {
    nav.classList.toggle('is-scrolled', window.scrollY > 50);
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();

/* -- 6. CONTACT FORM SUBMISSION (Formspree) -- */
(() => {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const submitBtn = form.querySelector('.form-submit');
  const statusEl = document.getElementById('form-status');
  const endpoint = form.dataset.formEndpoint;

  const setStatus = (message, type = 'info') => {
    if (!statusEl) return;
    statusEl.textContent = message;
    statusEl.dataset.state = type;
  };

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    if (!endpoint || endpoint.includes('REEMPLAZA_CON_TU_FORM_ID')) {
      setStatus(
        'Configuracion pendiente: reemplaza REEMPLAZA_CON_TU_FORM_ID con tu ID de Formspree.',
        'error'
      );
      return;
    }

    const formData = new FormData(form);

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = 'Enviando...';
    }

    setStatus('Enviando mensaje...', 'info');

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          Accept: 'application/json'
        },
        body: formData
      });

      if (!response.ok) {
        throw new Error('No se pudo completar el envio');
      }

      form.reset();
      setStatus('Mensaje enviado. Te respondere pronto.', 'success');
    } catch (error) {
      setStatus(
        'No se pudo enviar ahora. Intenta de nuevo o escribeme directo al correo de contacto.',
        'error'
      );
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Enviar mensaje';
      }
    }
  });
})();
