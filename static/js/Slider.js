// * Arquivo para configurar o Slider no container do celular, para que o usuário possa ajustar os filtros da imagem manualmente,
// * caso queira, guiado pelos ajustes sugeridos pela IA

document.addEventListener("DOMContentLoaded", () => {
    const slider = document.querySelector(".editionSlider")

    //Loop que cria as linhas do slider, de 0 a 100, e adiciona uma classe diferente para as linhas que são múltiplos de 10 e 5,
    //para facilitar a visualização do usuário
    for (let i = 0; i <= 100; i++) {
        const linha = document.createElement("div")
        linha.classList.add("editionSliderLinha")
        linha.dataset.valor = i

        //Adiciona um estilo diferente para as linhas que são múltiplos de 10 e 5
        if (i % 10 === 0) { linha.classList.add("linhaGrande") }
        if (i % 5 === 0) { linha.classList.add("linhaMedia") }

        //Adiciona a linha ao slider
        slider.appendChild(linha)
        }
})