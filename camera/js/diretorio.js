// URLs dos dados JSON
const urlDados = 'dados/membros.json';

// Elementos do DOM
const container = document.getElementById('membros-container');
const btnGrade = document.getElementById('btn-grade');
const btnLista = document.getElementById('btn-lista');
const menuBtn = document.getElementById('menu-btn');
const navMenu = document.getElementById('nav-menu').querySelector('ul');

// Toggle do Menu Responsivo (Hambúrguer)
menuBtn.addEventListener('click', () => {
    navMenu.classList.toggle('show');
});

// Função Assíncrona para buscar os dados dos membros
async function obterMembros() {
    try {
        const resposta = await fetch(urlDados);
        if (!resposta.ok) {
            throw new Error('Falha ao carregar os dados dos membros.');
        }
        const dados = await resposta.json();
        exibirMembros(dados);
    } catch (erro) {
        console.error('Erro:', erro);
        container.innerHTML = `<p style="color: red;">Não foi possível carregar o diretório neste momento.</p>`;
    }
}

// Injeta os dados dinamicamente no HTML
function exibirMembros(membros) {
    container.innerHTML = ''; // Limpa o container

    membros.forEach(membro => {
        const card = document.createElement('section');
        card.className = 'card';

        // Mapeia os níveis de associação para texto amigável
        const niveis = { 1: 'Membro Comum', 2: 'Membro Prata', 3: 'Membro Ouro' };

        card.innerHTML = `
            <img src="images/${membro.imagem}" alt="Logo de ${membro.nome}" loading="lazy" width="150" height="150">
            <h3>${membro.nome}</h3>
            <p class="ramo"><strong>Ramo:</strong> ${membro.ramo}</p>
            <p><strong>Endereço:</strong> ${membro.endereco}</p>
            <p><strong>Telefone:</strong> ${membro.telefone}</p>
            <p><strong>Nível:</strong> ${niveis[membro.nivel] || 'Associado'}</p>
            <a href="${membro.url}" target="_blank" rel="noopener">Visitar Website</a>
        `;
        container.appendChild(card);
    });
}

// Alternância de Layouts (Grade vs Lista)
btnGrade.addEventListener('click', () => {
    container.classList.remove('lista');
    container.classList.add('grade');
    btnGrade.classList.add('active');
    btnLista.classList.remove('active');
});

btnLista.addEventListener('click', () => {
    container.classList.remove('grade');
    container.classList.add('lista');
    btnLista.classList.add('active');
    btnGrade.classList.remove('active');
});

// Gerenciamento do Rodapé (Datas e Direitos Autorais)
document.getElementById('ano-atual').textContent = new Date().getFullYear();
document.getElementById('ultima-modificacao').textContent = document.lastModified;

// Inicializa a chamada
obterMembros();
