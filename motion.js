(() => {
  const links = Array.from(document.querySelectorAll('.links a[href^="#"]'));
  const sections = links.map(link => document.querySelector(link.getAttribute('href'))).filter(Boolean);
  const scrollCue = document.querySelector('.scroll-cue');
  let ticking = false;
  function updateNavigation() {
    if (scrollCue) scrollCue.classList.toggle('is-hidden', window.scrollY > 20);
    const offset = (document.querySelector('header')?.offsetHeight || 0) + 70;
    let active = sections[0]?.id;
    for (const section of sections) if (section.getBoundingClientRect().top <= offset) active = section.id;
    if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 4) active = sections.at(-1)?.id;
    links.forEach(link => {
      const selected = link.getAttribute('href') === '#' + active;
      if (selected) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
    ticking = false;
  }
  window.addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(updateNavigation); } }, { passive: true });
  window.addEventListener('resize', updateNavigation);
  updateNavigation();
  const highlights = document.getElementById('destaques');
  const opening = document.querySelector('.opening');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let transitionInProgress = false;
  let touchStart = null;

  function boundaryTarget(direction, startY) {
    if (!opening || !highlights || reducedMotion.matches) return null;
    const headerHeight = document.querySelector('header')?.offsetHeight || 0;
    const destination = Math.max(0, highlights.getBoundingClientRect().top + window.scrollY - headerHeight);
    const openingFits = opening.offsetHeight <= window.innerHeight - headerHeight + 40;
    if (direction > 0 && startY <= 24 && openingFits) return destination;
    if (direction < 0 && Math.abs(startY - destination) <= 40 && openingFits) return 0;
    return null;
  }

  function goToBoundary(target) {
    transitionInProgress = true;
    window.scrollTo({ top: target, behavior: 'smooth' });
    window.setTimeout(() => { transitionInProgress = false; }, 900);
  }

  window.addEventListener('wheel', event => {
    if (document.querySelector('dialog[open]')) return;
    if (event.ctrlKey || event.shiftKey || Math.abs(event.deltaX) > Math.abs(event.deltaY)) return;
    if (transitionInProgress) {
      event.preventDefault();
      return;
    }
    const target = boundaryTarget(Math.sign(event.deltaY), window.scrollY);
    if (target === null || event.deltaY === 0) return;
    event.preventDefault();
    goToBoundary(target);
  }, { passive: false });

  window.addEventListener('touchstart', event => {
    if (document.querySelector('dialog[open]')) return;
    if (event.touches.length !== 1 || event.target.closest('a, button, summary, input, textarea, select')) return;
    touchStart = { y: event.touches[0].clientY, scrollY: window.scrollY };
  }, { passive: true });

  window.addEventListener('touchend', event => {
    if (!touchStart || transitionInProgress || event.changedTouches.length !== 1) {
      touchStart = null;
      return;
    }
    const distance = touchStart.y - event.changedTouches[0].clientY;
    const target = Math.abs(distance) > 45 ? boundaryTarget(Math.sign(distance), touchStart.scrollY) : null;
    touchStart = null;
    if (target !== null) goToBoundary(target);
  }, { passive: true });

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return;
  const targets = document.querySelectorAll('.section-head, .featured, .triagem, .highlight, .timeline article, .competency-grid article, .closing-inner');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -24px 0px' });
  targets.forEach(element => { element.classList.add('reveal'); observer.observe(element); });
})();
