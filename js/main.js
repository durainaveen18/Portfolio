(() => {
  'use strict';
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const revealEls = document.querySelectorAll('.section, .card, .skill, .edubox, .contact');
  revealEls.forEach(el => el.classList.add('reveal'));
  if (!('IntersectionObserver' in window) || reduceMotion) revealEls.forEach(el => el.classList.add('reveal-visible'));
  else {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('reveal-visible'); obs.unobserve(entry.target); } });
    }, {threshold:.12, rootMargin:'0px 0px -45px 0px'});
    revealEls.forEach(el => observer.observe(el));
  }

  const hero = document.querySelector('.hero');
  if (hero && !reduceMotion) {
    let frame = null;
    window.addEventListener('mousemove', e => {
      if (window.innerWidth < 800 || frame) return;
      frame = requestAnimationFrame(() => {
        const x = (e.clientX / window.innerWidth - .5) * 6;
        const y = (e.clientY / window.innerHeight - .5) * 4;
        hero.style.transform = `translate3d(${x}px,${y}px,0)`;
        frame = null;
      });
    }, {passive:true});
  }

  if ('IntersectionObserver' in window) {
    const links = [...document.querySelectorAll('.site-nav a[href^="#"]')];
    const targets = new Map(links.map(a => [document.querySelector(a.getAttribute('href')), a]).filter(([el]) => el));
    const navObserver = new IntersectionObserver(entries => entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      links.forEach(a => a.removeAttribute('aria-current'));
      targets.get(entry.target)?.setAttribute('aria-current', 'true');
    }), {rootMargin:'-35% 0px -55% 0px'});
    targets.forEach((_, el) => navObserver.observe(el));
  }
})();
