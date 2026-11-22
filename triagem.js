const componentes = [
  { sigla: "FOT", tribo: "Classificados", squad: "Anúncios", tipo: "API", externo: true, critico: true },
  { sigla: "BUS", tribo: "Classificados", squad: "Anúncios", tipo: "Processamento em lote", externo: false, critico: false },
  { sigla: "CHT", tribo: "Classificados", squad: "Conversas", tipo: "API", externo: false, critico: true },
  { sigla: "MSG", tribo: "Relacionamento", squad: "Atendimento", tipo: "Portal", externo: true, critico: false }
];
const achados = [
  { sigla: "FOT", classe: "SCA", titulo: "O envio de fotos do anúncio precisa de atualização", gravidade: 9, ativa: true, epss: 72, correcao: "Atualize foto-kit de 2.3.0 para 2.3.4. Valide a compatibilidade nos testes da API." },
  { sigla: "FOT", classe: "SAST", titulo: "Dados de contato de quem anuncia aparecem nos registros de envio", gravidade: 6, correcao: "Guia de registro seguro · Remova campos pessoais antes de gravar o evento. Verifique nos testes que os logs contêm apenas os campos permitidos." },
  { sigla: "BUS", classe: "SCA", titulo: "A busca de anúncios usa uma biblioteca desatualizada", gravidade: 8, ativa: false, epss: 7, correcao: "Atualize busca-kit de 1.2.1 para 1.2.5. Execute os testes do processamento em lote." },
  { sigla: "CHT", classe: "SAST", titulo: "O chat precisa verificar quem pode ler a conversa", gravidade: 9, correcao: "Guia de autorização · Verifique a permissão do usuário antes de exibir as mensagens da negociação. Cubra a negativa de acesso com um teste." },
  { sigla: "MSG", classe: "SCA", titulo: "O painel de mensagens precisa de atualização", gravidade: 7, ativa: false, epss: 21, correcao: "Atualize mensagem-format de 3.0.0 para 3.0.2 e valide os fluxos de atendimento." }
];
function normalizar(valor) {
  return valor.trim().toLocaleLowerCase("pt-BR").normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}
function consultar(escopo) {
  const chave = normalizar(escopo);
  return componentes.filter(c => [c.sigla, c.tribo, c.squad].some(v => normalizar(v) === chave))
    .flatMap(c => achados.filter(a => a.sigla === c.sigla).map(a => ({
      componente: c, achado: a,
      pontos: Math.round(a.gravidade * 3 + (a.ativa ? 25 : 0) + (a.epss || 0) / 5 +
        (c.externo ? 10 : 0) + (c.critico ? 10 : 0) + (c.tipo === "API" ? 5 : 0))
    }))).sort((a, b) => b.pontos - a.pontos);
}
const entrada = document.querySelector("#escopo");
const opcoes = document.querySelector("#exemplos");
for (const nome of new Set(componentes.flatMap(c => [c.tribo, c.squad, c.sigla]))) {
  opcoes.append(new Option(nome, nome));
}
function elemento(tag, texto) {
  const no = document.createElement(tag);
  no.textContent = texto;
  return no;
}
function mostrar() {
  const resultados = consultar(entrada.value);
  document.querySelector("#resumo").textContent = resultados.length
    ? entrada.value.trim() + " · " + resultados.length + (resultados.length === 1 ? " problema em aberto" : " problemas em aberto") + " por prioridade"
    : "Nenhum resultado para esta consulta. Escolha uma das sugestões da demonstração.";
  document.querySelector("#fila").replaceChildren(...resultados.map(({componente: c, achado: a, pontos}) => {
    const item = document.createElement("li");
    const sinais = ["Gravidade " + a.gravidade + "/10", c.tipo, c.externo ? "exposição externa" : "uso interno", c.critico ? "componente crítico" : "criticidade moderada"];
    if (a.epss !== undefined) sinais.push("EPSS " + a.epss + "%", a.ativa ? "exploração ativa" : "sem exploração ativa conhecida");
    const guia = document.createElement("details");
    guia.append(elemento("summary", a.classe === "SCA" ? "Ver biblioteca e versão de correção" : "Abrir guia de correção simulado"), elemento("p", a.correcao));
    const motivo = a.ativa
      ? "Neste exemplo, há sinais de uso da falha em ataques. Corrigir o envio de fotos protege quem publica anúncios."
      : c.critico ? "Uma falha aqui pode afetar um serviço importante para o negócio."
      : c.externo ? "O sistema está acessível pela internet." : "O sistema é de uso interno.";
    const criterios = document.createElement("details");
    criterios.append(elemento("summary", "Ver critérios da prioridade"), elemento("p", c.sigla + " · " + a.classe + " · Pontuação ilustrativa: " + pontos + "/100"), elemento("small", sinais.join(" · ")));
    item.append(elemento("strong", a.titulo), elemento("p", motivo), guia, criterios);
    return item;
  }));
}
document.querySelector("#consulta").addEventListener("submit", evento => {
  evento.preventDefault();
  mostrar();
});
mostrar();
