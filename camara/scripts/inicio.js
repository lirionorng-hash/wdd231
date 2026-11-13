"use strict";
// Curitiba — OpenWeatherMap Current Weather + 5 day / 3 hour forecast.
// Apenas dados reais são exibidos: sem chave ou sem resposta, mostra aviso.
const coordenadasCuritiba = { latitude: -25.4284, longitude: -49.2733 };
const statusTempo = document.querySelector("#clima-status");
const painelTempo = document.querySelector("#clima-atual");
const previsao = document.querySelector("#previsao-tres-dias");

function escreverErroTempo(mensagem) {
  statusTempo.textContent = mensagem;
  painelTempo.hidden = true;
  previsao.replaceChildren();
}

function urlClima(endpoint) {
  const params = new URLSearchParams({
    lat: coordenadasCuritiba.latitude,
    lon: coordenadasCuritiba.longitude,
    appid: CHAVE_OPENWEATHERMAP,
    units: "metric",
    lang: "pt_br"
  });
  return `https://api.openweathermap.org/data/2.5/${endpoint}?${params}`;
}

async function obterJson(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  return response.json();
}

function formatarDia(data) {
  return new Intl.DateTimeFormat("pt-BR", { weekday: "long", day: "numeric", month: "short", timeZone: "America/Sao_Paulo" }).format(data);
}

async function carregarClima() {
  if (CHAVE_OPENWEATHERMAP === "COLE_SUA_CHAVE_AQUI" || !CHAVE_OPENWEATHERMAP.trim()) {
    escreverErroTempo("Configure sua chave da OpenWeatherMap em scripts/clima-config.js para ver os dados reais.");
    return;
  }
  try {
    const [atual, dadosPrevisao] = await Promise.all([
      obterJson(urlClima("weather")),
      obterJson(urlClima("forecast"))
    ]);
    if (!Number.isFinite(atual.main?.temp) || !Array.isArray(dadosPrevisao.list)) {
      throw new Error("Dados meteorológicos incompletos");
    }
    const descricao = atual.weather?.[0]?.description ?? "Condição indisponível";
    document.querySelector("#clima-temperatura").textContent = `${Math.round(atual.main.temp)} °C`;
    document.querySelector("#clima-descricao").textContent = descricao;
    const codigo = atual.weather?.[0]?.icon;
    const icone = document.querySelector("#clima-icone");
    if (codigo && /^[0-9]{2}[dn]$/.test(codigo)) {
      icone.src = `https://openweathermap.org/img/wn/${codigo}@2x.png`;
      icone.alt = descricao;
      icone.hidden = false;
    } else { icone.hidden = true; }
    painelTempo.hidden = false;
    statusTempo.textContent = "Temperatura atual e previsão atualizadas pela OpenWeatherMap.";

    // Filtra por data local da cidade (timezone UTC−3), não pelo dia do computador.
    const offset = (dadosPrevisao.city?.timezone ?? -10800) * 1000;
    const dataChave = (segundos) => new Date(segundos * 1000 + offset).toISOString().slice(0, 10);
    const hojeLocal = dataChave(Math.floor(Date.now() / 1000));
    const grupos = new Map();
    for (const item of dadosPrevisao.list) {
      const dia = dataChave(item.dt);
      if (dia <= hojeLocal || !Number.isFinite(item.main?.temp)) continue;
      if (!grupos.has(dia)) grupos.set(dia, []);
      grupos.get(dia).push(item);
    }
    const dias = [...grupos.entries()].sort(([a], [b]) => a.localeCompare(b)).slice(0, 3);
    if (dias.length < 3) throw new Error("Previsão de três dias não disponível");
    const fragmento = document.createDocumentFragment();
    for (const [dia, entradas] of dias) {
      // Usa horário mais próximo de 12h local para uma previsão representativa.
      const amostra = entradas.reduce((melhor, atualItem) => {
        const distancia = item => Math.abs(new Date(item.dt * 1000 + offset).getUTCHours() - 12);
        return distancia(atualItem) < distancia(melhor) ? atualItem : melhor;
      });
      const linha = document.createElement("div");
      linha.className = "forecast-day";
      const rotulo = document.createElement("strong");
      rotulo.textContent = formatarDia(new Date(`${dia}T12:00:00-03:00`));
      const valor = document.createElement("span");
      valor.textContent = `${Math.round(amostra.main.temp)} °C · ${amostra.weather?.[0]?.description ?? "previsão"}`;
      linha.append(rotulo, valor);
      fragmento.append(linha);
    }
    previsao.replaceChildren(fragmento);
  } catch (erro) {
    escreverErroTempo("Não foi possível obter o clima em tempo real. Confira sua chave de API, ativação e conexão.");
  }
}

async function carregarDestaques() {
  const alvo = document.querySelector("#destaques");
  try {
    const response = await fetch("dados/membros.json");
    if (!response.ok) throw new Error("Falha ao carregar associados");
    const membros = await response.json();
    // Na base da S02: nível 3 = ouro, nível 2 = prata, nível 1 = básico.
    const elegiveis = membros.filter(m => Number(m.nivel) === 2 || Number(m.nivel) === 3);
    if (elegiveis.length < 2) throw new Error("Associados ouro/prata insuficientes");
    // Fisher–Yates: ordem aleatória a cada carregamento da página.
    for (let i = elegiveis.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [elegiveis[i], elegiveis[j]] = [elegiveis[j], elegiveis[i]];
    }
    const fragmento = document.createDocumentFragment();
    for (const membro of elegiveis.slice(0, 3)) {
      const card = document.createElement("article");
      card.className = "spotlight-card";
      const imagem = document.createElement("img");
      imagem.src = `imagens/${membro.imagem}`;
      imagem.alt = `Imagem demonstrativa de ${membro.nome}`;
      imagem.width = 360; imagem.height = 180;
      imagem.loading = "lazy";
      const corpo = document.createElement("div");
      corpo.className = "spotlight-content";
      const nivel = document.createElement("span");
      nivel.className = `spotlight-tier ${Number(membro.nivel) === 3 ? "gold" : "silver"}`;
      nivel.textContent = Number(membro.nivel) === 3 ? "Membro Ouro" : "Membro Prata";
      const nome = document.createElement("h3"); nome.textContent = membro.nome;
      const endereco = document.createElement("address"); endereco.textContent = membro.endereco;
      const telefone = document.createElement("p"); telefone.textContent = `Telefone: ${membro.telefone}`;
      const site = document.createElement("p");
      const link = document.createElement("a");
      link.href = membro.site; link.target = "_blank"; link.rel = "noopener noreferrer";
      link.textContent = "Visitar site (demonstrativo)";
      site.append(link);
      corpo.append(nivel, nome, endereco, telefone, site);
      card.append(imagem, corpo);
      fragmento.append(card);
    }
    alvo.replaceChildren(fragmento);
  } catch (erro) {
    const aviso = document.createElement("p");
    aviso.textContent = "Não foi possível carregar os associados. Verifique dados/membros.json e publique no GitHub Pages.";
    alvo.replaceChildren(aviso);
  }
}
carregarClima();
carregarDestaques();
