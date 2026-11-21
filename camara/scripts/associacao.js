document.querySelector('#ano').textContent = new Date().getFullYear();
const menu = document.querySelector('#menu');
const nav = document.querySelector('#navegacao');
menu?.addEventListener('click', () => {
  const aberto = nav.classList.toggle('aberto');
  menu.setAttribute('aria-expanded', String(aberto));
});
const datahora = document.querySelector('#datahora');
if (datahora) datahora.value = new Date().toISOString();
document.querySelectorAll('[data-modal]').forEach(botao => {
  botao.addEventListener('click', () => document.getElementById(botao.dataset.modal)?.showModal());
});
document.querySelectorAll('dialog').forEach(dialogo => {
  dialogo.querySelector('.fechar')?.addEventListener('click', () => dialogo.close());
  dialogo.addEventListener('click', event => { if (event.target === dialogo) dialogo.close(); });
});
