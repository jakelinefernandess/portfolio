import { useLayoutEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Header } from './layout/Header.jsx';
import { Opening } from './intro/Opening.jsx';
import { Metrics } from './intro/Metrics.jsx';
import { Projects } from './projects/Projects.jsx';
import { Career } from './career/Career.jsx';
import { Skills } from './skills/Skills.jsx';
import { Footer } from './layout/Footer.jsx';
import { usePageMotion } from './motion/usePageMotion.js';
import './styles/style.css';

function App() {
  usePageMotion();
  const [gallery, setGallery] = useState(null);
  const viewer = useRef(null);
  const trigger = useRef(null);
  const photo = gallery?.photos[gallery.index];

  useLayoutEffect(() => {
    const id = window.location.hash.slice(1);
    if (id) document.getElementById(id)?.scrollIntoView({ behavior: 'instant' });
  }, []);

  useLayoutEffect(() => {
    if (gallery && !viewer.current.open) viewer.current.showModal();
  }, [gallery]);

  function openGallery(event) {
    const link = event.target.closest('a');
    const group = link?.closest('.case-gallery, .award-records');
    if (!group || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey || !viewer.current.showModal) return;
    event.preventDefault();
    const links = [...group.querySelectorAll('a')];
    const photos = links.map(item => {
      const alt = item.querySelector('img').alt;
      return { src: item.href, alt, caption: item.closest('figure')?.querySelector('figcaption')?.textContent || alt };
    });
    trigger.current = link;
    setGallery({ photos, index: links.indexOf(link) });
  }

  function move(delta) {
    setGallery(current => {
      if (!current) return current;
      const index = current.index + delta;
      return index >= 0 && index < current.photos.length ? { ...current, index } : current;
    });
  }

  function closeGallery() {
    if (viewer.current.open) viewer.current.close();
    setGallery(null);
    trigger.current?.focus();
  }

  function handleGalleryKey(event) {
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
    event.preventDefault();
    move(event.key === 'ArrowLeft' ? -1 : 1);
  }

  return (
    <>
      <Header />
      <main id="inicio">
        <Opening />
        <Metrics />
        <Projects onGalleryClick={openGallery} />
        <Career />
        <Skills />
      </main>
      <dialog id="photo-viewer" aria-label="Galeria de fotos" ref={viewer}
        onClose={closeGallery} onCancel={event => { event.preventDefault(); closeGallery(); }} onKeyDown={handleGalleryKey}
        onClick={event => { if (event.target === event.currentTarget) closeGallery(); }}>
        <div className="viewer-head">
          <span id="viewer-count">{gallery && (gallery.index + 1) + ' / ' + gallery.photos.length}</span>
          <button type="button" id="viewer-close" aria-label="Fechar galeria" onClick={closeGallery}>Fechar ×</button>
        </div>
        <img id="viewer-image" src={photo?.src} alt={photo?.alt ?? ''} />
        <p id="viewer-caption">{photo?.caption}</p>
        <div className="viewer-controls">
          <button type="button" id="viewer-prev" disabled={!gallery || gallery.index === 0} onClick={() => move(-1)}>Anterior</button>
          <button type="button" id="viewer-next" disabled={!gallery || gallery.index === gallery.photos.length - 1} onClick={() => move(1)}>Próxima</button>
        </div>
      </dialog>
      <Footer />
    </>
  );
}

createRoot(document.getElementById('root')).render(<App />);
