import { AgentDemo } from './AgentDemo.jsx';
import { asset } from '../asset.js';

export function Projects({ onGalleryClick }) { return (
<section className="wrap projects" id="projetos" onClick={onGalleryClick}>
      <div className="section-head"><div><h2>Projeto em destaque</h2></div></div>
      <article className="featured">
        <div className="feature-visual" aria-hidden="true"><div className="diagram"><div><svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M15 7a3 3 0 1 1-6 0 3 3 0 0 1 6 0z M5 20a7 7 0 0 1 14 0"/></svg>Escolher a equipe</div><i></i><div><svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16v16H4z M8 9h8 M8 14h6"/></svg>Reunir as vulnerabilidades abertas</div><i></i><div><svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6l2 2 4-4 M12 7h9 M3 16l2 2 4-4 M12 17h9"/></svg>Priorizar e orientar a correção</div></div></div>
        <div className="feature-copy"><p className="category">IA e segurança</p><h3>Agente de IA para priorização de vulnerabilidades</h3>
          <dl className="case-facts">
            <div><dt>O desafio</dt><dd>Cada equipe acumulava cerca de 5 mil vulnerabilidades e precisava decidir por onde começar.</dd></div>
            <div><dt>A solução</dt><dd>Um agente de IA que organiza o estoque por prioridade e orienta as correções.</dd></div>
          </dl>
          <p className="agent-contribution">Idealizei e construí o agente com o Gemini CLI, conduzi pilotos e integrei a solução à rotina dos times de segurança e desenvolvimento.</p>
          <details><summary>Detalhes sobre a priorização</summary>
            <p>O agente consultava vulnerabilidades no código e em bibliotecas e as priorizava por criticidade, exploração, exposição e impacto para o negócio. Indicava versões para atualizar bibliotecas e guias internos para corrigir o código.</p>
          </details>

        </div>
      </article>
      <AgentDemo />
      <div className="section-head secondary-projects"><div><h2>Projetos e iniciativas</h2></div></div>
      <div className="highlight-grid">
        <article className="highlight photo-case">
          <p className="category"><svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2 20 5v6c0 5-4 9-8 11-4-2-8-6-8-11V5z M8 12l3 3 5-6"/></svg>Liderança · Cultura de segurança</p><h3>Security Champions</h3>
          <figure className="case-cover"><img className="contain-cover" src={asset("photos/champions-premio-atualizado.webp")} alt="Jakeline com o troféu Guardiões do Ano" loading="lazy" /><figcaption>Reconhecimento do programa Security Champions.</figcaption></figure>
          <p>Liderei por dois anos o programa de formação em segurança para desenvolvedores, capacitando mais de 600 profissionais.</p>
          <div className="proof"><strong><span aria-hidden="true" className="award-icon">✦</span> Projeto Destaque</strong><span>Guardiões do Ano 2024</span></div>
          <details><summary>Ver fotos e atividades</summary><p>Planejei capacitações, acompanhei indicadores e organizei o reconhecimento dos participantes.</p>
            <div className="case-gallery">
              <figure><a href={asset("photos/champions-encontro.webp")} target="_blank" rel="noopener"><img src={asset("photos/champions-encontro.webp")} alt="Jakeline apresentando a agenda aos participantes no Allianz Parque" loading="lazy" /></a><figcaption>Encontro com participantes</figcaption></figure>
              <figure><a href={asset("photos/champions-hero.jpeg")} target="_blank" rel="noopener"><img src={asset("photos/champions-hero.jpeg")} alt="Jakeline no palco com o letreiro Security Champions 2025" loading="lazy" /></a><figcaption>Security Champions 2025</figcaption></figure>
              <figure className="gallery-wide"><a href={asset("photos/champions-grupo.webp")} target="_blank" rel="noopener"><img src={asset("photos/champions-grupo.webp")} alt="Grupo Security Champions reunido no Allianz Parque" loading="lazy" /></a><figcaption>Evento Security Champions</figcaption></figure>
            </div>
          </details>
        </article>
        <article className="highlight photo-case" id="acessibilize">
          <p className="category"><svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s7-8 7-13a7 7 0 1 0-14 0c0 5 7 13 7 13z M15 9a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/></svg>Inovação · Acessibilidade e inclusão</p>
          <h3>Acessibilize</h3>
          <div className="case-gallery">
            <figure><a href={asset("photos/acessibilize-busca.png")}><img src={asset("photos/acessibilize-busca.png")} alt="Tela de busca de lugares acessíveis com filtros por categoria e recurso de acessibilidade" loading="lazy" /></a><figcaption>Busca de lugares</figcaption></figure>
            <figure><a href={asset("photos/acessibilize-detalhes.png")}><img src={asset("photos/acessibilize-detalhes.png")} alt="Página do Tatu Bola com recursos de acessibilidade, horários, localização e avaliações" loading="lazy" /></a><figcaption>Detalhes do local</figcaption></figure>
          </div>
          <p>Aplicativo para encontrar e avaliar locais de lazer acessíveis. Idealizei e liderei sua criação, com protótipo no Figma.</p>
          <div className="proof"><strong><span aria-hidden="true" className="award-icon">✦</span> Menção honrosa</strong><span>CEITEC · Engineering Innovation 2024, UFABC</span></div>
          <div className="acessibilize-actions">
            <a className="button" href="https://github.com/jakelinefernandess/acessibilize" target="_blank" rel="noopener noreferrer">Acessar GitHub</a>
          <details><summary>Certificado e fotos</summary>
            <p>Certificado e registros da feira</p>
            <div className="award-records">
              <a href={asset("photos/acessibilize-certificado.webp")}><img src={asset("photos/acessibilize-certificado.webp")} alt="Ampliar o certificado de menção honrosa do Acessibilize, de 9 de dezembro de 2024" loading="lazy" /></a>
              <a href={asset("photos/acessibilize-entrega-original.jpeg")}><img src={asset("photos/acessibilize-entrega-original.jpeg")} alt="Jakeline na entrega da menção honrosa" loading="lazy" /></a>
              <a href={asset("photos/acessibilize-feira.webp")}><img src={asset("photos/acessibilize-feira.webp")} alt="Foto coletiva da Engineering Innovation 2024" loading="lazy" /></a>
            </div>
          </details>
          </div>
        </article>
        <article className="highlight photo-case">
          <p className="category"><svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M15 7a3 3 0 1 1-6 0 3 3 0 0 1 6 0z M5 20v-2a7 7 0 0 1 14 0v2 M3 8a2 2 0 0 0 0 4 M21 8a2 2 0 0 1 0 4"/></svg>Liderança · Diversidade e inclusão</p><h3>Equidade de gênero</h3>
          <figure className="case-cover"><img src={asset("photos/elas-proposito.webp")} alt="Jakeline apresentando o propósito do grupo de equidade de gênero" loading="lazy" /><figcaption>Evento do Dia da Mulher</figcaption></figure>
          <p>Liderei ações de equidade de gênero, com encontros, rodas de conversa e acolhimento de novos integrantes.</p>
          <div className="proof"><strong>+2 anos</strong><span>de liderança em diversidade</span></div>
          <details><summary>Ver fotos e atividades</summary>
            <div className="case-gallery">
              <figure><a href={asset("photos/elas-acoes.webp")} target="_blank" rel="noopener"><img src={asset("photos/elas-acoes.webp")} alt="Jakeline apresentando as ações do grupo de equidade de gênero em 2024" loading="lazy" /></a><figcaption>Ações de 2024</figcaption></figure>
              <figure><a href={asset("photos/elas-tech.webp")} target="_blank" rel="noopener"><img src={asset("photos/elas-tech.webp")} alt="Participantes do Tech Talks Especial Elas" loading="lazy" /></a><figcaption>Comunidade e tecnologia</figcaption></figure>
            </div>
          </details>
        </article>
        <article className="highlight" id="podcast">
          <p className="category"><svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M9 5a3 3 0 0 1 6 0v6a3 3 0 0 1-6 0z M5 10v1a7 7 0 0 0 14 0v-1 M12 18v4 M8 22h8"/></svg>Comunicação · Diversidade</p>
          <h3>Podcast Assunto de Menina</h3>
          <figure className="case-cover podcast-cover"><img src={asset("photos/assunto-de-menina-ep4-recorte.webp")} width="2048" height="1222" loading="lazy" alt="Capa do episódio 4 com Jakeline Fernandes e a entrevistada" /><figcaption>Episódio 4 · Assunto de Menina</figcaption></figure>
          <p>Participei da produção e edição de entrevistas com mulheres em tecnologia. No episódio 4, conduzi a conversa.</p>
          <div className="proof"><strong>Projeto de extensão</strong><span>UFABC</span></div>
          <a className="podcast-link" href="https://open.spotify.com/show/2Y3pZsC36o7CdvtfDOGZlI" target="_blank" rel="noopener noreferrer"><svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="11" fill="#1ed760"/><path d="M6 9c4-1.2 8-.6 12 1.5M7 12.5c3.3-.9 6.6-.4 9.8 1.1M8 16c2.6-.7 5-.3 7.4.8" fill="none" stroke="#10243e" strokeWidth="1.8" strokeLinecap="round"/></svg> Ouvir no Spotify</a>
        </article>
      </div>
    </section>
    
); }
