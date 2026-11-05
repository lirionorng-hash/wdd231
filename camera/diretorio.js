// Nível de associação: 1 = membro, 2 = prata, 3 = ouro
const NIVEIS = { 1: 'Membro', 2: 'Prata', 3: 'Ouro' };

const membrosContainer = document.querySelector('#membros');
const viewButtons = document.querySelectorAll('.view-button');

// Busca os dados do arquivo JSON usando fetch com async/await
async function obterMembros() {
  const resposta = await fetch('dados/membros.json');
  if (!resposta.ok) {
    throw new Error(`Falha ao carregar dados (status ${resposta.status})`);
  }
  const dados = await resposta.json();
  return dados;
}

// Cria o cartão de um único membro
function criarCartao(membro) {
  const article = document.createElement('article');
  article.className = 'membro';

  const img = document.createElement('img');
  img.src = `images/${membro.imagem}`;
  img.alt = `Fachada da empresa ${membro.nome}`;
  img.width = 420;
  img.height = 280;
  img.loading = 'lazy';
  img.decoding = 'async';

  const info = document.createElement('div');
  info.className = 'membro-info';

  const titulo = document.createElement('h2');
  titulo.textContent = membro.nome;

  const endereco = document.createElement('p');
  endereco.textContent = membro.endereco;

  const telefone = document.createElement('p');
  telefone.textContent = membro.telefone;

  const site = document.createElement('p');
  const link = document.createElement('a');
  link.href = membro.site;
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  link.textContent = membro.site.replace('https://', '');
  site.append(link);

  const nivel = document.createElement('span');
  nivel.className = `nivel nivel-${membro.nivel}`;
  nivel.textContent = NIVEIS[membro.nivel] || 'Membro';

  info.append(titulo, endereco, telefone, site, nivel);
  article.append(img, info);
  return article;
}

// Exibe todos os membros na página
function exibirMembros(membros) {
  membrosContainer.replaceChildren(...membros.map(criarCartao));
}

// Alterna entre visualização em grade e em lista
function configurarAlternancia() {
  viewButtons.forEach((botao) => {
    botao.addEventListener('click', () => {
      const modo = botao.dataset.view;
      membrosContainer.classList.toggle('lista', modo === 'lista');
      viewButtons.forEach((item) => {
        const ativo = item === botao;
        item.classList.toggle('active', ativo);
        item.setAttribute('aria-pressed', String(ativo));
      });
    });
  });
}

// Inicialização
async function iniciar() {
  try {
    const membros = await obterMembros();
    exibirMembros(membros);
    configurarAlternancia();
  } catch (erro) {
    membrosContainer.textContent = 'Não foi possível carregar o diretório de membros.';
    console.error(erro);
  }
}

iniciar();
