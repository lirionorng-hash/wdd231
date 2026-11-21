document.querySelector('#ano').textContent = new Date().getFullYear();
const menu = document.querySelector('#menu');
const nav = document.querySelector('#navegacao');
menu?.addEventListener('click', () => {
 const aberto = nav.classList.toggle('aberto');
 menu.setAttribute('aria-expanded', String(aberto));
});
const parametros = new URLSearchParams(window.location.search);
const campos = [
 ['Nome', 'nome'], ['Sobrenome', 'sobrenome'], ['E-mail', 'email'],
 ['Celular', 'celular'], ['Organização', 'organizacao'], ['Data e hora do formulário', 'datahora']
];
const destino = document.querySelector('#dados-enviados');
for (const [rotulo, chave] of campos) {
 let valor = parametros.get(chave) || 'Não informado';
 if (chave === 'datahora' && parametros.get(chave)) {
   const data = new Date(valor);
   if (!Number.isNaN(data.getTime())) valor = data.toLocaleString('pt-BR');
 }
 const dt = document.createElement('dt'); dt.textContent = rotulo;
 const dd = document.createElement('dd'); dd.textContent = valor;
 destino.append(dt, dd);
}
