const openButton = document.getElementById('hambuMenu')
const navbar = document.getElementById('navcont')
const menuItems = document.querySelector('.menuItems')
const bckgMenuList = document.querySelector('.bckgNavList')
const mainContent = document.getElementById('main-content');

const media = window.matchMedia("(width < 768px)")

media.addEventListener('change', (e) => updateNavbar(e))

function updateNavbar(e) {
    const isMobile = e.matches
    console.log(isMobile)
    if (isMobile) {
        navbar.setAttribute('inert', '')
    }
    else {
        navbar.removeAttribute('inert')
        navbar.classList.remove('showMenu')
        navbar.classList.remove('menuAnimation')
        menuItems.classList.remove('active')
        bckgMenuList.classList.remove('active')
        document.body.classList.remove('no-scroll')
    }
}

function openRespMenu() {
    navbar.classList.add('menuAnimation')
    mainContent.setAttribute('inert', '')
    navbar.removeAttribute('inert')

    document.body.classList.add('no-scroll')

    void navbar.offsetWidth;


    navbar.classList.add('showMenu')
    menuItems.classList.add('active')
    bckgMenuList.classList.add('active')
    openButton.setAttribute('aria-expanded', 'true')

    cambiarFrase();
}

function closeRespMenu() {
    navbar.classList.remove('showMenu')
    menuItems.classList.remove('active')
    bckgMenuList.classList.remove('active')
    openButton.setAttribute('aria-expanded', 'false')
    mainContent.removeAttribute('inert');
    document.body.classList.remove('no-scroll')
    setTimeout(() => {
        navbar.classList.remove('menuAnimation')
        navbar.setAttribute('inert', '')
    }, 250)
}

updateNavbar(media)

const frases = [
  "¡Qué bueno verte de nuevo!",
  "Ser malo en algo es el primer paso para ser extrañamente bueno en algo",
  "Hoy es un gran día para explorar.",
  "Hecho con ❤️ para ti.",
  "¡No te olvides de sonreír!"
];

const contenedorFrase = document.getElementById('quoteDinamic');

function cambiarFrase() {
  // Elige un índice aleatorio del array
  const indice = Math.floor(Math.random() * frases.length);
  // Cambia el texto del contenedor
  contenedorFrase.textContent = frases[indice];
}

// 1. Cambiar al refrescar la página
window.addEventListener('DOMContentLoaded', cambiarFrase);
