const icons = document.querySelectorAll(`.editionIcons`)

icons.forEach(icon => {
    icon.addEventListener("click", (e) => {
        icons.forEach(b => b.classList.remove('iconAtivo'));
        
        e.currentTarget.classList.add('iconAtivo');
    })
})