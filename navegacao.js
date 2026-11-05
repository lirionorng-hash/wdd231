const botaoMenu = document.querySelector('#menu-button');
const navPrincipal = document.querySelector('#primary-nav');

if (botaoMenu && navPrincipal) {
  botaoMenu.addEventListener('click', () => {
    const expandido = botaoMenu.getAttribute('aria-expanded') === 'true';
    botaoMenu.setAttribute('aria-expanded', String(!expandido));
    botaoMenu.setAttribute('aria-label', expandido ? 'Abrir menu de navegação' : 'Fechar menu de navegação');
    navPrincipal.classList.toggle('open', !expandido);
  });

  navPrincipal.addEventListener('click', (evento) => {
    if (evento.target.closest('a')) {
      navPrincipal.classList.remove('open');
      botaoMenu.setAttribute('aria-expanded', 'false');
      botaoMenu.setAttribute('aria-label', 'Abrir menu de navegação');
    }
  });
}
