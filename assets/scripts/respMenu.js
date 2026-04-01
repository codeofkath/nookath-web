const openButton = document.getElementById('hambuMenu')
const navbar = document.getElementById('navcont')
const menuItems = document.querySelector('.menuItems')
const bckgMenuList = document.querySelector('.bckgNavList')

function openRespMenu(){
    navbar.classList.add('showMenu')
    openButton.setAttribute('aria-expanded','true')
    navbar.removeAttribute('inert')
    menuItems.classList.add('active')
    bckgMenuList.classList.add('active')
}

function closeRespMenu(){
    navbar.classList.remove('showMenu')
    openButton.setAttribute('aria-expanded','false')
    navbar.setAttribute('inert','')

    menuItems.classList.remove('active')
    menuItems.classList.remove('active')
    bckgMenuList.classList.remove('active')
}   