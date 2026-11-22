(() => {
  const win = document.getElementById('agent-window');
  const typing = document.getElementById('agent-typing');
  const loading = document.getElementById('agent-loading');
  const loadingStage = document.getElementById('agent-loading-stage');
  const results = document.getElementById('agent-results');
  const replay = document.getElementById('replay-demo');
  if (!win || !typing || !loading || !loadingStage || !results || !replay) return;
  const skip = document.getElementById('skip-demo');
  function finish() {
    ++run;
    typing.textContent = label;
    loading.hidden = true;
    results.hidden = false;
    skip.hidden = true;
    replay.hidden = false;
    replay.textContent = 'Reproduzir novamente';
    counters.forEach(el => el.textContent = format.format(Number(el.dataset.count)));
  }
  skip.addEventListener('click', () => {
    finish();
    replay.focus();
  });
  const label = 'Aquisição de leads';
  let run = 0;
  const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
  const counters = results.querySelectorAll('[data-count]');
  const format = new Intl.NumberFormat('pt-BR');
  function animateNumbers(id) {
    const start = performance.now();
    function frame(now) {
      if (id !== run) return;
      const progress = Math.min(1, (now - start) / 850);
      const eased = 1 - Math.pow(1 - progress, 3);
      counters.forEach(el => el.textContent = format.format(Math.round(Number(el.dataset.count) * eased)));
      if (progress < 1) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }
  async function play() {
    const id = ++run;
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
      finish();
      return;
    }
    skip.hidden = false;
    replay.hidden = true;
    typing.textContent = '';
    results.hidden = true;
    loading.hidden = true;
    for (let i = 1; i <= label.length; i++) {
      await delay(65);
      if (id !== run) return;
      typing.textContent = label.slice(0, i);
    }
    const stages = [
      'Identificando vulnerabilidades…',
      'Calculando prioridades…',
      'Identificando a correção recomendada…'
    ];
    loadingStage.textContent = '';
    loading.hidden = false;
    for (const stage of stages) {
      loadingStage.textContent = stage;
      await delay(1250);
      if (id !== run) return;
    }
    loading.hidden = true;
    results.hidden = false;
    skip.hidden = true;
    replay.hidden = false;
    replay.textContent = 'Reproduzir novamente';
    animateNumbers(id);
  }
  replay.addEventListener('click', play);
})();
