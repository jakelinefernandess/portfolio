import { useEffect, useRef, useState } from 'react';

const label = 'Aquisição de leads';
const stages = [
  'Identificando vulnerabilidades…',
  'Calculando prioridades…',
  'Identificando a correção recomendada…',
];
const format = new Intl.NumberFormat('pt-BR');

export function AgentDemo() {
  const [text, setText] = useState('');
  const [stage, setStage] = useState('');
  const [running, setRunning] = useState(false);
  const [done, setDone] = useState(false);
  const [progress, setProgress] = useState(1);
  const timer = useRef();
  const frame = useRef();
  const replayRef = useRef();
  const focusReplay = useRef(false);

  useEffect(() => () => {
    clearTimeout(timer.current);
    cancelAnimationFrame(frame.current);
  }, []);
  useEffect(() => {
    if (done && focusReplay.current) {
      focusReplay.current = false;
      replayRef.current.focus();
    }
  }, [done]);

  function finish(animate) {
    clearTimeout(timer.current);
    cancelAnimationFrame(frame.current);
    setText(label);
    setStage('');
    setRunning(false);
    setDone(true);
    setProgress(animate ? 0 : 1);
    if (animate) {
      const start = performance.now();
      function tick(now) {
        const elapsed = Math.min(1, (now - start) / 850);
        setProgress(1 - (1 - elapsed) ** 3);
        if (elapsed < 1) frame.current = requestAnimationFrame(tick);
      }
      frame.current = requestAnimationFrame(tick);
    }
  }

  function skip() {
    focusReplay.current = true;
    finish(false);
  }

  function play() {
    clearTimeout(timer.current);
    cancelAnimationFrame(frame.current);
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
      finish(false);
      return;
    }
    setRunning(true);
    setDone(false);
    setText('');
    setStage('');
    function showStage(index) {
      if (index === stages.length) {
        finish(true);
        return;
      }
      setStage(stages[index]);
      timer.current = setTimeout(() => showStage(index + 1), 1250);
    }
    function type(length) {
      setText(label.slice(0, length));
      if (length === label.length) showStage(0);
      else timer.current = setTimeout(() => type(length + 1), 65);
    }
    timer.current = setTimeout(() => type(1), 65);
  }

  return (
<section id="demo" className="triagem" aria-labelledby="demo-title">
        <h3 id="demo-title">Veja o agente em ação</h3>
        <p>Acompanhe a análise da equipe de aquisição de leads.</p>
        <div className="agent-window" id="agent-window">
          <div className="agent-toolbar"><span>Dados simulados</span><button hidden={!running} id="skip-demo" onClick={skip} type="button">Ver resultado</button><button id="replay-demo" ref={replayRef} hidden={running} onClick={play} type="button">{done ? "Reproduzir novamente" : "Iniciar demonstração"}</button></div>
          <div className="agent-query"><span>Qual sua equipe?</span><strong id="agent-typing">{text}</strong></div>
          <div className="agent-loading" id="agent-loading" hidden={!stage}><span className="spinner" aria-hidden="true"></span> <span id="agent-loading-stage" role="status">{stage}</span></div>
          <div id="agent-results" hidden={!done}><div className="agent-numbers"><div><strong data-count="5300">{format.format(Math.round(5300 * progress))}</strong><span>Vulnerabilidades encontradas</span></div><div><strong data-count="320">{format.format(Math.round(320 * progress))}</strong><span>Vulnerabilidades críticas</span></div><div><strong data-count="42">{format.format(Math.round(42 * progress))}</strong><span>Em exploração ativa</span></div></div>
          <article className="first-fix"><h4>Corrigir primeiro: biblioteca do formulário de contato</h4><p><strong>Por quê?</strong> O formulário é público e a vulnerabilidade já está sendo explorada.</p><p><strong>Como corrigir?</strong> Atualizar a biblioteca <code>forms-exemplo</code> da versão 1.2.0 para a 1.3.0 e testar o envio do formulário.</p></article>
          <details className="other-fixes"><summary>Ver outras recomendações</summary><ol start="2"><li><strong>Validação de dados.</strong> Aplicar o guia interno de validação aos campos do formulário.</li><li><strong>Relatórios.</strong> Atualizar a biblioteca fictícia relatorios-exemplo de 2.1.0 para 2.2.0 e testar a geração do relatório.</li></ol></details></div>
        </div>
        <small>Demonstração com dados fictícios.</small>
      </section>
  );
}
