import { useEffect, useRef, useState } from 'react';

const sectionIds = ['sobre', 'projetos', 'trajetoria', 'competencias'];

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState(sectionIds[0]);
  const menuRef = useRef(null);
  const headerRef = useRef(null);
  const progressRef = useRef(null);

  useEffect(() => {
    const mobile = matchMedia('(max-width: 620px)');
    const close = () => setMenuOpen(false);
    function handleEscape(event) {
      if (event.key !== 'Escape' || !menuOpen) return;
      close();
      menuRef.current.focus();
    }
    mobile.addEventListener('change', close);
    document.addEventListener('keydown', handleEscape);
    return () => {
      mobile.removeEventListener('change', close);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [menuOpen]);

  useEffect(() => {
    const sections = sectionIds.map(id => document.getElementById(id));
    const cue = document.querySelector('.scroll-cue');
    let frame;
    function update() {
      frame = undefined;
      const total = document.documentElement.scrollHeight - innerHeight;
      const ratio = total > 0 ? Math.min(1, Math.max(0, scrollY / total)) : 0;
      progressRef.current.style.transform = `scaleX(${ratio})`;
      cue?.classList.toggle('is-hidden', scrollY > 20);
      let current = sectionIds[0];
      const offset = headerRef.current.offsetHeight + 70;
      for (const section of sections) {
        if (section?.getBoundingClientRect().top <= offset) current = section.id;
      }
      if (scrollY + innerHeight >= document.documentElement.scrollHeight - 4) current = sectionIds.at(-1);
      setActive(current);
    }
    function schedule() {
      if (frame === undefined) frame = requestAnimationFrame(update);
    }
    addEventListener('scroll', schedule, { passive: true });
    addEventListener('resize', schedule);
    update();
    return () => {
      removeEventListener('scroll', schedule);
      removeEventListener('resize', schedule);
      cancelAnimationFrame(frame);
    };
  }, []);

  function handleNavigation(event) {
    const link = event.target.closest('a[href^="#"]');
    if (!link) return;
    setMenuOpen(false);
    if (!matchMedia('(max-width: 620px)').matches) return;
    const target = document.getElementById(link.hash.slice(1));
    target?.setAttribute('tabindex', '-1');
    target?.focus({ preventScroll: true });
  }

  return (
<header ref={headerRef}><nav className="wrap" aria-label="Navegação principal">
    
    <button className="menu-toggle" type="button" aria-expanded={menuOpen} onClick={() => setMenuOpen(open => !open)} ref={menuRef} aria-controls="nav-links">Menu <span aria-hidden="true">☰</span></button>
<div className={menuOpen ? "links is-open" : "links"} id="nav-links" onClick={handleNavigation}><a href="#sobre" aria-current={active === "sobre" ? "location" : undefined}>Sobre mim</a><a href="#projetos" aria-current={active === "projetos" ? "location" : undefined}>Projetos</a><a href="#trajetoria" aria-current={active === "trajetoria" ? "location" : undefined}>Trajetória</a><a href="#competencias" aria-current={active === "competencias" ? "location" : undefined}>Competências</a>
      <div className="social-links">
        <a className="social-icon" href="https://br.linkedin.com/in/jakeline-fernandes" target="_top" aria-label="LinkedIn de Jakeline Fernandes" title="LinkedIn"><svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.5 2h-17A1.5 1.5 0 0 0 2 3.5v17A1.5 1.5 0 0 0 3.5 22h17a1.5 1.5 0 0 0 1.5-1.5v-17A1.5 1.5 0 0 0 20.5 2zM8 19H5V9h3zM6.5 7.6a1.75 1.75 0 1 1 0-3.5 1.75 1.75 0 0 1 0 3.5zM19 19h-3v-5.5c0-1.5-.6-2.2-1.7-2.2-1.3 0-2 1-2 2.3V19h-3V9h2.9v1.4A3.5 3.5 0 0 1 15.4 9c2.3 0 3.6 1.4 3.6 4.1z"/></svg></a>
        <a className="social-icon" href="https://github.com/jakelinefernandess" target="_top" aria-label="GitHub de Jakeline Fernandes" title="GitHub"><svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 .75a11.25 11.25 0 0 0-3.56 21.93c.56.1.77-.24.77-.54v-2.1c-3.13.68-3.79-1.33-3.79-1.33-.51-1.3-1.25-1.64-1.25-1.64-1.02-.7.08-.69.08-.69 1.13.08 1.73 1.16 1.73 1.16 1 1.72 2.64 1.22 3.28.94.1-.73.39-1.22.71-1.5-2.5-.29-5.13-1.25-5.13-5.56 0-1.23.44-2.23 1.16-3.02-.12-.28-.5-1.43.11-2.98 0 0 .95-.3 3.09 1.15a10.8 10.8 0 0 1 5.62 0c2.14-1.45 3.08-1.15 3.08-1.15.62 1.55.23 2.7.12 2.98.72.79 1.16 1.79 1.16 3.02 0 4.32-2.63 5.27-5.14 5.55.4.35.76 1.03.76 2.08v3.08c0 .3.2.65.77.54A11.25 11.25 0 0 0 12 .75Z"/></svg></a>
      </div>
    </div>
  </nav><div className="reading-progress" ref={progressRef} aria-hidden="true"></div></header>
  );
}
