/* ============================================
   PORTFOLIO — Main JavaScript
   ============================================ */

/* -- 1. i18n — TRANSLATIONS -- */
const TRANSLATIONS = {
  en: {
    skip_link: 'Skip to content',
    nav_about: 'About',
    nav_projects: 'Projects',
    nav_skills: 'Skills',
    nav_experience: 'Experience',
    nav_contact: 'Contact',

    hero_available: 'Available for new projects',
    hero_role: 'Full Stack Developer · Pereira, Colombia',
    hero_desc: 'Developer experienced in building scalable, high-performance web solutions. Specialized in React, Laravel and CodeIgniter, with a focus on clean architectures, maintainable code and exceptional user experiences.',
    hero_cta_contact: 'Contact me',
    hero_cta_projects: 'View projects',

    about_eyebrow: 'Who am I?',
    about_title: 'Building software\nwith purpose',
    about_p1: 'I am a Full Stack Developer based in Pereira, Colombia, with solid experience in designing, developing and optimizing web applications for real production environments. I specialize in writing clean, scalable and well-documented code, always prioritizing quality and business impact.',
    about_p2: 'I am currently studying Systems Engineering at Universidad Tecnológica de Pereira (UTP), combining my academic training with building modern solutions — from corporate CRMs to robust SaaS platforms.',
    about_p3: 'I stand out for my proactivity, collaborative mindset and a continuous improvement approach aimed at mastering new technologies that generate tangible value in every project.',
    stat_years: 'Years of professional web development experience',
    stat_tech: 'Technologies in my active development stack',
    stat_edu: 'Systems Engineering — in progress',
    stat_location: 'Available for remote and local projects',

    projects_eyebrow: 'Portfolio',
    projects_title: 'Featured projects',
    proj_agendapro_desc: 'Multi-tenant SaaS platform for comprehensive management of appointments, schedules and records. White-label architecture with dynamic forms and reminder automation, optimized for clinics, spas and offices.',
    proj_crm_desc: 'Modular base architecture for customer relationship management systems. Includes robust authentication, sales modules, contact management and report generation — scalable across multiple sectors.',
    proj_lampp_desc: 'Interactive terminal dashboard (TUI) for efficient management of XAMPP/LAMPP services. Service control, multi-version management, real-time log monitoring and keyboard shortcuts — built in Go with Bubble Tea.',
    proj_tara_desc: 'Enterprise system for traceability, risk analysis and document control, designed to optimize and secure institutional audit processes with high security standards.',
    proj_in_dev: 'In development',
    proj_private: 'Private project in development',
    proj_view_github: 'View on GitHub',

    skills_eyebrow: 'Technical skills',
    skills_title: 'My technology stack',
    ticker_db: 'Databases',
    ticker_ai: 'AI Dev',
    ticker_ai_1: 'AI-assisted development',
    ticker_ai_2: 'Prompt Engineering',
    ticker_ai_3: 'Rapid prototyping',

    exp_eyebrow: 'Career',
    exp_title: 'Professional experience',
    exp1_date: 'Mar 2024 — Present',
    exp1_role: 'Web Developer',
    exp1_desc: 'Development, implementation and maintenance of web applications in real production environments. Responsible for writing clean code, resolving incidents, unit testing and performance optimization. Active collaboration in agile methodologies, code reviews and continuous improvement of software architecture.',
    exp2_date: '2023 — 2024',
    exp2_role: 'Systems Assistant',
    exp2_desc: 'Comprehensive management and support of IT infrastructure. Configuration, preventive and corrective maintenance of hardware and software, user administration, critical information backups and technical training for operational staff.',

    contact_eyebrow: "Let's talk",
    contact_title: "Got a project in mind?\nLet's build it together",
    contact_desc: 'I am available for job opportunities, freelance projects and technology collaborations. Write to me and let\'s discuss how I can add value to your team or idea.',
    contact_email_label: 'Email',
    form_name: 'Name',
    form_name_ph: 'Your full name',
    form_email: 'Email',
    form_message: 'Message',
    form_message_ph: 'Tell me about your project or idea...',
    form_send: 'Send message',

    footer_home: 'Home',
  },

  es: {
    skip_link: 'Saltar al contenido',
    nav_about: 'Sobre mí',
    nav_projects: 'Proyectos',
    nav_skills: 'Habilidades',
    nav_experience: 'Experiencia',
    nav_contact: 'Contacto',

    hero_available: 'Disponible para nuevos proyectos',
    hero_role: 'Desarrollador Full Stack · Pereira, Colombia',
    hero_desc: 'Desarrollador con experiencia en la creación de soluciones web escalables y de alto rendimiento. Especializado en React, Laravel y CodeIgniter, con un enfoque en arquitecturas limpias, código mantenible y experiencias de usuario excepcionales.',
    hero_cta_contact: 'Contáctame',
    hero_cta_projects: 'Ver proyectos',

    about_eyebrow: '¿Quién soy?',
    about_title: 'Construyo software\ncon propósito',
    about_p1: 'Soy Desarrollador Full Stack radicado en Pereira, Colombia, con experiencia sólida en el diseño, desarrollo y optimización de aplicaciones web para entornos productivos reales. Me especializo en escribir código limpio, escalable y bien documentado, priorizando siempre la calidad y el impacto empresarial.',
    about_p2: 'Actualmente curso Ingeniería en Sistemas en la Universidad Tecnológica de Pereira (UTP), combinando mi formación académica con la construcción de soluciones modernas, desde CRMs corporativos hasta plataformas SaaS de arquitectura robusta.',
    about_p3: 'Me distinguen la proactividad, el trabajo colaborativo y una mejora continua orientada a dominar nuevas tecnologías que generen valor tangible en cada proyecto.',
    stat_years: 'Años de experiencia en desarrollo web profesional',
    stat_tech: 'Tecnologías en mi stack de desarrollo activo',
    stat_edu: 'Ingeniería en Sistemas — en formación',
    stat_location: 'Disponible para proyectos remotos y locales',

    projects_eyebrow: 'Portafolio',
    projects_title: 'Proyectos destacados',
    proj_agendapro_desc: 'Plataforma SaaS multi-tenant diseñada para la gestión integral de citas, agendas y expedientes. Arquitectura white-label con formularios dinámicos y automatización de recordatorios, optimizada para clínicas, spas y consultorios.',
    proj_crm_desc: 'Arquitectura base modular para sistemas de gestión de relaciones con clientes (CRM). Incluye autenticación robusta, módulos de ventas, administración de contactos y generación de reportes, escalable para múltiples sectores.',
    proj_lampp_desc: 'Dashboard de terminal interactivo (TUI) para la administración eficiente de servicios XAMPP/LAMPP. Permite control de servicios, gestión multi-versión, monitoreo de logs en tiempo real y atajos de teclado, desarrollado en Go con Bubble Tea.',
    proj_tara_desc: 'Sistema empresarial de trazabilidad, análisis de riesgos y control documental, diseñado para optimizar y asegurar los procesos de auditoría institucional con altos estándares de seguridad.',
    proj_in_dev: 'En desarrollo',
    proj_private: 'Proyecto privado en desarrollo',
    proj_view_github: 'Ver en GitHub',

    skills_eyebrow: 'Habilidades técnicas',
    skills_title: 'Mi stack tecnológico',
    ticker_db: 'Bases de Datos',
    ticker_ai: 'IA & Dev',
    ticker_ai_1: 'Desarrollo asistido por IA',
    ticker_ai_2: 'Ingeniería de Prompts',
    ticker_ai_3: 'Prototipado rápido',

    exp_eyebrow: 'Trayectoria',
    exp_title: 'Experiencia profesional',
    exp1_date: 'Mar 2024 — Actualidad',
    exp1_role: 'Desarrollador Web',
    exp1_desc: 'Desarrollo, implementación y mantenimiento de aplicaciones web en entornos de producción reales. Responsable de la escritura de código limpio, resolución de incidencias, pruebas unitarias y optimización de rendimiento. Colaboración activa en metodologías ágiles, revisiones de código y mejora continua de la arquitectura del software.',
    exp2_date: '2023 — 2024',
    exp2_role: 'Auxiliar de Sistemas',
    exp2_desc: 'Gestión integral y soporte de infraestructura informática. Configuración, mantenimiento preventivo y correctivo de hardware y software, administración de usuarios, ejecución de respaldos de información crítica y capacitación técnica al personal operativo.',

    contact_eyebrow: 'Hablemos',
    contact_title: '¿Tienes un proyecto en mente?\nConstruyámoslo juntos',
    contact_desc: 'Estoy disponible para oportunidades laborales, proyectos freelance y colaboraciones tecnológicas. Escríbeme y conversemos sobre cómo puedo aportar valor a tu equipo o idea.',
    contact_email_label: 'Correo electrónico',
    form_name: 'Nombre',
    form_name_ph: 'Tu nombre completo',
    form_email: 'Correo electrónico',
    form_message: 'Mensaje',
    form_message_ph: 'Cuéntame sobre tu proyecto o idea...',
    form_send: 'Enviar mensaje',

    footer_home: 'Inicio',
  },
};

/* -- i18n engine -- */
const I18N = (() => {
  const STORAGE_KEY = 'drg_lang';
  let current = localStorage.getItem(STORAGE_KEY) || 'en';

  const apply = (lang) => {
    current = lang;
    localStorage.setItem(STORAGE_KEY, lang);
    document.documentElement.lang = lang;

    const t = TRANSLATIONS[lang];

    /* Text nodes */
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.dataset.i18n;
      if (!t[key]) return;
      /* Preserve inner HTML for elements that have child nodes (e.g. SVG siblings) */
      if (el.children.length === 0) {
        el.textContent = t[key];
      } else {
        /* Only update text node, leave child elements untouched */
        const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, null);
        const textNode = walker.nextNode();
        if (textNode) textNode.textContent = t[key];
      }
    });

    /* Placeholders */
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.dataset.i18nPlaceholder;
      if (t[key]) el.placeholder = t[key];
    });

    /* Update lang button label */
    const label = document.getElementById('lang-label');
    if (label) label.textContent = lang.toUpperCase();

    /* Update page meta for the active lang */
    updateMeta(lang);
  };

  const updateMeta = (lang) => {
    const metas = {
      en: {
        title: 'Daniel Ramirez Gil — Full Stack Developer | React, Laravel, NestJS',
        desc: 'Full Stack Developer based in Pereira, Colombia. Specialized in React, Laravel and NestJS. Available for projects and collaborations.',
      },
      es: {
        title: 'Daniel Ramirez Gil — Desarrollador Full Stack | React, Laravel, NestJS',
        desc: 'Desarrollador Full Stack en Pereira, Colombia. Especializado en React, Laravel y NestJS. Disponible para proyectos y colaboraciones.',
      },
    };
    const m = metas[lang];
    if (!m) return;
    document.title = m.title;
    const descTag = document.querySelector('meta[name="description"]');
    if (descTag) descTag.setAttribute('content', m.desc);
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', m.title);
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', m.desc);
  };

  const toggle = () => apply(current === 'en' ? 'es' : 'en');
  const get    = () => current;

  return { apply, toggle, get };
})();

/* Boot i18n */
document.addEventListener('DOMContentLoaded', () => {
  I18N.apply(I18N.get());

  const btn = document.getElementById('lang-toggle');
  if (btn) btn.addEventListener('click', I18N.toggle);
});

/* -- 2. MOBILE MENU TOGGLE -- */
(() => {
  const toggle  = document.querySelector('.nav-toggle');
  const menu    = document.querySelector('.nav-links');
  const overlay = document.getElementById('nav-overlay');
  const links   = menu ? menu.querySelectorAll('a') : [];

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
    menu.classList.contains('is-open') ? closeMenu() : openMenu();
  });

  if (overlay) overlay.addEventListener('click', closeMenu);
  links.forEach(link => link.addEventListener('click', closeMenu));

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menu.classList.contains('is-open')) {
      closeMenu();
      toggle.focus();
    }
  });
})();

/* -- 3. SCROLL REVEAL (IntersectionObserver) -- */
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

/* -- 4. ACTIVE NAV LINK ON SCROLL -- */
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

/* -- 5. PROJECT CAROUSEL — True Infinite Scroll -- */
(() => {
  const track      = document.getElementById('carousel-track');
  const prevBtn    = document.querySelector('.carousel-btn--prev');
  const nextBtn    = document.querySelector('.carousel-btn--next');
  const dotsWrap   = document.getElementById('carousel-dots');
  const carouselEl = document.getElementById('projects-carousel');

  if (!track || !prevBtn || !nextBtn || !carouselEl) return;

  const SLIDE_GAP  = 24;
  const AUTO_DELAY = 4000;
  const EASE       = 'cubic-bezier(0.22, 1, 0.36, 1)';

  const ALL_SLIDES = Array.from(track.querySelectorAll('.carousel-slide'));

  let spv      = 3;
  let slideW   = 0;
  let trackIdx = 0;
  let origCount  = 0;
  let infinite   = false;
  let animating  = false;
  let autoTimer  = null;
  let paused     = false;

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
      s.style.width     = w + 'px';
      s.style.flexBasis = w + 'px';
      s.style.minWidth  = w + 'px';
    });
  };

  const offsetFor = (idx) => idx * (slideW + SLIDE_GAP);

  const moveTrack = (idx, animate = true) => {
    track.style.transition = animate ? `transform 500ms ${EASE}` : 'none';
    track.style.transform  = `translateX(-${offsetFor(idx)}px)`;
  };

  const buildTrack = (slides) => {
    track.innerHTML = '';
    origCount = slides.length;
    if (origCount === 0) { infinite = false; return; }
    infinite = origCount > spv;

    if (infinite) {
      const pre = document.createDocumentFragment();
      slides.forEach(s => { const c = s.cloneNode(true); c.classList.add('is-clone'); pre.appendChild(c); });
      track.appendChild(pre);
    }

    slides.forEach(s => track.appendChild(s));

    if (infinite) {
      const app = document.createDocumentFragment();
      slides.forEach(s => { const c = s.cloneNode(true); c.classList.add('is-clone'); app.appendChild(c); });
      track.appendChild(app);
    }

    trackIdx = infinite ? origCount : 0;
  };

  const syncDots = () => {
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
      btn.setAttribute('aria-label', `Project ${i + 1} of ${origCount}`);
      btn.addEventListener('click', () => {
        if (animating) return;
        trackIdx = infinite ? origCount + i : i;
        moveTrack(trackIdx);
        syncDots();
        resetAuto();
      });
      dotsWrap.appendChild(btn);
    }
    syncDots();
  };

  const normalize = () => {
    if (!infinite) return;
    let jumped = false;
    if (trackIdx >= origCount * 2) { trackIdx -= origCount; jumped = true; }
    else if (trackIdx < origCount) { trackIdx += origCount; jumped = true; }
    if (jumped) { moveTrack(trackIdx, false); track.getBoundingClientRect(); }
    syncDots();
  };

  const onTransitionEnd = () => { normalize(); animating = false; };

  const goNext = () => {
    if (animating || origCount === 0) return;
    animating = true; trackIdx++;
    moveTrack(trackIdx); syncDots();
    track.addEventListener('transitionend', onTransitionEnd, { once: true });
  };

  const goPrev = () => {
    if (animating || origCount === 0) return;
    animating = true; trackIdx--;
    moveTrack(trackIdx); syncDots();
    track.addEventListener('transitionend', onTransitionEnd, { once: true });
  };

  const stopAuto  = () => { clearInterval(autoTimer); autoTimer = null; };
  const startAuto = () => { stopAuto(); if (!paused && origCount > spv) autoTimer = setInterval(goNext, AUTO_DELAY); };
  const resetAuto = () => { stopAuto(); startAuto(); };

  const applyFilter = (cat) => {
    stopAuto(); animating = false;
    spv    = calcSpv();
    slideW = computeSlideW();
    const matching = ALL_SLIDES.filter(s => cat === 'all' || s.dataset.category === cat);
    buildTrack(matching);
    applyWidths(slideW);
    moveTrack(trackIdx, false);
    buildDots();
    prevBtn.disabled = false;
    nextBtn.disabled = false;
    startAuto();
  };

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

  prevBtn.addEventListener('click', () => { goPrev(); resetAuto(); });
  nextBtn.addEventListener('click', () => { goNext(); resetAuto(); });
  carouselEl.addEventListener('mouseenter', () => { paused = true;  stopAuto(); });
  carouselEl.addEventListener('mouseleave', () => { paused = false; startAuto(); });

  let touchX = 0;
  track.addEventListener('touchstart', e => { touchX = e.changedTouches[0].screenX; }, { passive: true });
  track.addEventListener('touchend',   e => {
    const diff = touchX - e.changedTouches[0].screenX;
    if (Math.abs(diff) > 50) { diff > 0 ? goNext() : goPrev(); resetAuto(); }
  }, { passive: true });

  carouselEl.setAttribute('tabindex', '0');
  carouselEl.addEventListener('keydown', e => {
    if (e.key === 'ArrowLeft')  { goPrev(); resetAuto(); }
    if (e.key === 'ArrowRight') { goNext(); resetAuto(); }
  });

  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      const newSpv = calcSpv();
      const activeFilter = document.querySelector('.filter-btn.is-active')?.dataset.filter || 'all';
      if (newSpv !== spv) { spv = newSpv; applyFilter(activeFilter); }
      else { slideW = computeSlideW(); applyWidths(slideW); moveTrack(trackIdx, false); }
    }, 150);
  });

  document.addEventListener('visibilitychange', () => {
    document.hidden ? stopAuto() : (paused ? null : startAuto());
  });

  requestAnimationFrame(init);
})();

/* -- 6. NAV BACKGROUND ON SCROLL -- */
(() => {
  const nav = document.querySelector('.nav');
  if (!nav) return;
  const onScroll = () => nav.classList.toggle('is-scrolled', window.scrollY > 50);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();

/* -- 7. CONTACT FORM SUBMISSION (Formspree) -- */
(() => {
  const form     = document.getElementById('contact-form');
  if (!form) return;

  const submitBtn = form.querySelector('.form-submit');
  const statusEl  = document.getElementById('form-status');
  const endpoint  = form.dataset.formEndpoint;

  const setStatus = (message, type = 'info') => {
    if (!statusEl) return;
    statusEl.textContent = message;
    statusEl.dataset.state = type;
  };

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    if (submitBtn) { submitBtn.disabled = true; submitBtn.textContent = '...'; }
    setStatus('Sending...', 'info');

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: formData,
      });
      if (!response.ok) throw new Error();
      form.reset();
      const lang = document.documentElement.lang;
      setStatus(
        lang === 'es' ? 'Mensaje enviado. Te responderé pronto.' : 'Message sent. I\'ll get back to you soon.',
        'success'
      );
    } catch {
      const lang = document.documentElement.lang;
      setStatus(
        lang === 'es'
          ? 'No se pudo enviar. Intenta de nuevo o escríbeme directo al correo.'
          : 'Could not send. Try again or reach me directly by email.',
        'error'
      );
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        const lang = document.documentElement.lang;
        submitBtn.textContent = lang === 'es' ? 'Enviar mensaje' : 'Send message';
      }
    }
  });
})();
