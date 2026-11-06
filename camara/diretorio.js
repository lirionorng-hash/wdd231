const memberContainer = document.querySelector('#membros');
const memberCount = document.querySelector('#total-membros');
const gridButton = document.querySelector('#visualizar-grade');
const listButton = document.querySelector('#visualizar-lista');

const levels = {1: 'Membro', 2: 'Prata', 3: 'Ouro'};

function makeElement(tag, className, text) {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (text !== undefined) element.textContent = text;
  return element;
}

function memberCard(member) {
  const card = makeElement('article', 'member');
  const picture = makeElement('img');
  picture.src = `imagens/${member.imagem}`;
  picture.alt = `Identidade visual de ${member.nome}`;
  picture.width = 320;
  picture.height = 210;
  picture.loading = 'lazy';
  card.append(picture);
  const body = makeElement('div', 'member-body');
  body.append(makeElement('h2', '', member.nome));
  body.append(makeElement('p', 'tagline', member.descricao));
  const tier = makeElement('span', `tier ${member.nivel === 3 ? 'gold' : member.nivel === 2 ? 'silver' : ''}`, levels[member.nivel] || 'Membro');
  body.append(tier);
  body.append(makeElement('address', '', member.endereco));
  const telephone = makeElement('p', 'contact');
  const phoneLink = makeElement('a', '', member.telefone);
  phoneLink.href = `tel:${member.telefone.replace(/[^0-9+]/g, '')}`;
  telephone.append(phoneLink);
  body.append(telephone);
  const site = makeElement('p', 'contact');
  const webLink = makeElement('a', '', 'Visitar site (exemplo)');
  webLink.href = member.site;
  webLink.target = '_blank';
  webLink.rel = 'noopener noreferrer';
  site.append(webLink);
  body.append(site);
  card.append(body);
  return card;
}

async function loadMembers() {
  try {
    const response = await fetch('dados/membros.json');
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const members = await response.json();
    if (!Array.isArray(members) || members.length < 7) throw new Error('Dados insuficientes');
    const fragment = document.createDocumentFragment();
    members.forEach(member => fragment.append(memberCard(member)));
    memberContainer.replaceChildren(fragment);
    memberCount.textContent = `${members.length} empresas no diretório`;
  } catch (error) {
    memberCount.textContent = 'Não foi possível carregar os membros';
    memberContainer.replaceChildren(makeElement('p', 'status', 'Não foi possível carregar o diretório. Acesse o projeto por um servidor local (Live Server) ou pelo GitHub Pages.'));
  }
}

function changeView(view) {
  const isList = view === 'lista';
  memberContainer.classList.toggle('list-view', isList);
  gridButton.setAttribute('aria-pressed', String(!isList));
  listButton.setAttribute('aria-pressed', String(isList));
}

gridButton.addEventListener('click', () => changeView('grade'));
listButton.addEventListener('click', () => changeView('lista'));
loadMembers();
