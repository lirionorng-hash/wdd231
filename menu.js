const menuButton = document.querySelector('#menu-button');
const primaryNav = document.querySelector('#primary-nav');
if (menuButton && primaryNav) {
  menuButton.addEventListener('click', () => {
    const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!isOpen));
    menuButton.setAttribute('aria-label', isOpen ? 'Abrir menu' : 'Fechar menu');
    primaryNav.classList.toggle('open', !isOpen);
  });
}
