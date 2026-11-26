import { atracoes } from '../dados/atracoes.mjs';
const painel = document.querySelector('#grade-atracoes');
const ano = document.querySelector('#ano');
const menuBotao = document.querySelector('.menu-botao');
const menu = document.querySelector('#menu');
ano.textContent = new Date().getFullYear();
menuBotao.addEventListener('click', () => {
  const aberto = menu.classList.toggle('aberta');
  menuBotao.setAttribute('aria-expanded', String(aberto));
  menuBotao.setAttribute('aria-label', aberto ? 'Fechar menu' : 'Abrir menu');
});
function mostrarVisita() {
  const area = document.querySelector('#ultima-visita');
  const chave = 'camara-curitiba-ultima-visita';
  try {
    const agora = Date.now();
    const antes = localStorage.getItem(chave);
    let mensagem;
    if (antes === null) {
      mensagem = 'Boas-vindas! Entre em contato conosco caso tenha alguma dúvida.';
    } else {
      const diferenca = Math.max(0, agora - Number(antes));
      const dias = Math.floor(diferenca / 86400000);
      if (dias < 1) mensagem = 'Já voltou? Que legal!';
      else mensagem = `Seu último acesso foi há ${dias} ${dias === 1 ? 'dia' : 'dias'}.`;
    }
    area.textContent = mensagem;
    localStorage.setItem(chave, String(agora));
  } catch {
    area.textContent = 'Boas-vindas à Câmara de Comércio de Curitiba.';
  }
}
function criarCartao(local) {
  const article = document.createElement('article');
  article.className = 'cartao';
  const figure = document.createElement('figure');
  const img = document.createElement('img');
  img.src = local.imagem;
  img.alt = `Imagem ilustrativa provisória de ${local.nome}; substituir por fotografia autoral ou licenciada.`;
  img.width = 300;
  img.height = 200;
  img.loading = 'lazy';
  figure.append(img);
  const corpo = document.createElement('div');
  corpo.className = 'corpo';
  const titulo = document.createElement('h2');
  titulo.textContent = local.nome;
  const address = document.createElement('address');
  address.textContent = local.endereco;
  const descricao = document.createElement('p');
  descricao.textContent = local.descricao;
  const botao = document.createElement('button');
  botao.type = 'button';
  botao.textContent = 'Saiba mais';
  botao.addEventListener('click', () => window.open(local.link, '_blank', 'noopener,noreferrer'));
  corpo.append(titulo,address,descricao,botao);
  article.append(figure,corpo);
  return article;
}
mostrarVisita();
painel.replaceChildren(...atracoes.map(criarCartao));
