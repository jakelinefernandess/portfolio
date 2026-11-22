import { asset } from '../asset.js';

export function Opening() { return (
<section className="opening wrap" aria-label="Apresentação">


      <div className="hero-copy">
        <h1><span>IA aplicada a</span><em>desafios reais.</em></h1>
        <p className="hero-intro">Criei um agente de IA que mostra aos times de tecnologia quais vulnerabilidades corrigir primeiro e como corrigir cada uma.</p>
        <a className="button" href="#demo">Ver demonstração do agente</a>
      </div>
      <div className="about-intro" id="sobre">
        <img src={asset("photos/jakeline-portrait-clara.webp")} alt="Retrato de Jakeline Fernandes" width="1575" height="1575" fetchPriority="high" />
        <div className="about-copy">
          
          <h2>Sou Jakeline Fernandes.</h2>
          <p>Estudo Ciência e Tecnologia na Universidade Federal do ABC, com experiência em IA aplicada, tecnologia, segurança e produtos digitais.</p>
          
          
        </div>
      </div>
      <a className="scroll-cue" href="#destaques">Role para conhecer mais <span aria-hidden="true">↓</span></a>
    </section>
); }
