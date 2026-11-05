// Ano dos direitos autorais e data da última modificação
const anoAtual = document.querySelector('#currentyear');
const ultimaMod = document.querySelector('#lastModified');

if (anoAtual) {
  anoAtual.textContent = new Date().getFullYear();
}
if (ultimaMod) {
  ultimaMod.textContent = `Última modificação: ${document.lastModified}`;
}
