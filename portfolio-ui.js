(() => {
  const menu = document.querySelector('.menu-toggle');
  const links = document.getElementById('nav-links');
  const mobile = matchMedia('(max-width: 620px)');
  function closeMenu() {
    menu.setAttribute('aria-expanded', 'false');
    links.classList.remove('is-open');
  }
  menu.hidden = false;
  menu.addEventListener('click', () => {
    const open = menu.getAttribute('aria-expanded') !== 'true';
    menu.setAttribute('aria-expanded', String(open));
    links.classList.toggle('is-open', open);
  });
  links.addEventListener('click', event => {
    const link = event.target.closest('a');
    if (!link || !link.getAttribute('href').startsWith('#')) return;
    closeMenu();
    if (!mobile.matches || !link.hash) return;
    const target = document.getElementById(link.hash.slice(1));
    if (target) {
      target.setAttribute('tabindex', '-1');
      target.focus({ preventScroll: true });
    }
  });
  mobile.addEventListener('change', closeMenu);
  document.addEventListener('keydown', event => { if (event.key === 'Escape' && menu.getAttribute('aria-expanded') === 'true') { closeMenu(); menu.focus(); } });

  const progress = document.querySelector('.reading-progress');
  let framePending = false;
  function updateProgress() {
    const total = document.documentElement.scrollHeight - innerHeight;
    progress.style.transform = `scaleX(${total > 0 ? Math.min(1, Math.max(0, scrollY / total)) : 0})`;
    framePending = false;
  }
  addEventListener('scroll', () => { if (!framePending) { framePending = true; requestAnimationFrame(updateProgress); } }, { passive: true });
  addEventListener('resize', updateProgress);
  updateProgress();

  const viewer = document.getElementById('photo-viewer');
  const image = document.getElementById('viewer-image');
  const caption = document.getElementById('viewer-caption');
  const count = document.getElementById('viewer-count');
  const previous = document.getElementById('viewer-prev');
  const next = document.getElementById('viewer-next');
  let photos = [], index = 0, trigger;
  function showPhoto() {
    const photo = photos[index];
    image.src = photo.href;
    image.alt = photo.querySelector('img').alt;
    caption.textContent = photo.closest('figure')?.querySelector('figcaption')?.textContent || image.alt;
    count.textContent = `${index + 1} / ${photos.length}`;
    previous.disabled = index === 0;
    next.disabled = index === photos.length - 1;
  }
  document.querySelectorAll('.case-gallery, .award-records').forEach(gallery => {
    gallery.addEventListener('click', event => {
      const link = event.target.closest('a');
      if (!link || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey || !viewer.showModal) return;
      event.preventDefault();
      photos = Array.from(gallery.querySelectorAll('a'));
      index = photos.indexOf(link);
      trigger = link;
      showPhoto();
      viewer.showModal();
    });
  });
  function move(delta) { const position = index + delta; if (position >= 0 && position < photos.length) { index = position; showPhoto(); } }
  previous.addEventListener('click', () => move(-1));
  next.addEventListener('click', () => move(1));
  document.getElementById('viewer-close').addEventListener('click', () => viewer.close());
  viewer.addEventListener('click', event => { if (event.target === viewer) viewer.close(); });
  viewer.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') { event.preventDefault(); move(event.key === 'ArrowLeft' ? -1 : 1); }
  });
  viewer.addEventListener('close', () => trigger?.focus());
  if (!matchMedia('(prefers-reduced-motion: reduce)').matches && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      observer.unobserve(entry.target);
      entry.target.animate([{ opacity: .65, transform: 'translateY(6px)' }, { opacity: 1, transform: 'translateY(0)' }], { duration: 420, easing: 'ease-out' });
    }), { threshold: .5 });
    document.querySelectorAll('.stat strong').forEach(stat => observer.observe(stat));
  }
})();
