import { useEffect } from 'react';

export function usePageMotion() {
  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    const highlights = document.getElementById('destaques');
    const opening = document.querySelector('.opening');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let transitionInProgress = false;
    let touchStart = null;
    let transitionTimer;

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
      transitionTimer = setTimeout(() => { transitionInProgress = false; }, 900);
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
    }, { passive: false, signal });

    window.addEventListener('touchstart', event => {
      if (document.querySelector('dialog[open]')) return;
      if (event.touches.length !== 1 || event.target.closest('a, button, summary, input, textarea, select')) return;
      touchStart = { y: event.touches[0].clientY, scrollY: window.scrollY };
    }, { passive: true, signal });

    window.addEventListener('touchend', event => {
      if (!touchStart || transitionInProgress || event.changedTouches.length !== 1) {
        touchStart = null;
        return;
      }
      const distance = touchStart.y - event.changedTouches[0].clientY;
      const target = Math.abs(distance) > 45 ? boundaryTarget(Math.sign(distance), touchStart.scrollY) : null;
      touchStart = null;
      if (target !== null) goToBoundary(target);
    }, { passive: true, signal });

    let revealObserver;
    let metricsObserver;
    const animations = [];
    const targets = document.querySelectorAll('.section-head, .featured, .triagem, .highlight, .timeline article, .competency-grid article');
    if (!reducedMotion.matches && 'IntersectionObserver' in window) {
      revealObserver = new IntersectionObserver(entries => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add('in-view');
          revealObserver.unobserve(entry.target);
        }
      }, { threshold: 0.08, rootMargin: '0px 0px -24px 0px' });
      for (const element of targets) {
        element.classList.add('reveal');
        revealObserver.observe(element);
      }
      metricsObserver = new IntersectionObserver(entries => {
        for (const { target, isIntersecting } of entries) {
          if (!isIntersecting) continue;
          metricsObserver.unobserve(target);
          animations.push(target.animate([
            { opacity: .65, transform: 'translateY(6px)' },
            { opacity: 1, transform: 'translateY(0)' },
          ], { duration: 420, easing: 'ease-out' }));
        }
      }, { threshold: .5 });
      document.querySelectorAll('.stat strong').forEach(stat => metricsObserver.observe(stat));
    }
    return () => {
      controller.abort();
      clearTimeout(transitionTimer);
      revealObserver?.disconnect();
      metricsObserver?.disconnect();
      targets.forEach(target => target.classList.remove('reveal', 'in-view'));
      animations.forEach(animation => animation.cancel());
    };
  }, []);
}
