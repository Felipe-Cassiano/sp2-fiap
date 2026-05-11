// * Arquivo para configurar o Slider no container do celular, para que o usuário possa ajustar os filtros da imagem manualmente,
// * caso queira, guiado pelos ajustes sugeridos pela IA

document.addEventListener("DOMContentLoaded", () => {
    const slider = document.querySelector(".editionSlider")
    const marcador = document.querySelector(".editionMarcador")

    //Loop que cria as linhas do slider, de 0 a 100, e adiciona uma classe diferente para as linhas que são múltiplos de 10 e 5,
    //para facilitar a visualização do usuário
    for (let i = 0; i <= 100; i++) {
        const linha = document.createElement("div")
        linha.classList.add("editionSliderLinha")
        linha.dataset.valor = i

        //Adiciona um estilo diferente para as linhas que são múltiplos de 10 e 5
        if (i % 10 === 0) { linha.classList.add("linhaGrande") }
        else if (i % 5 === 0) { linha.classList.add("linhaMedia") }

        //Adiciona a linha ao slider
        slider.appendChild(linha)
    }

    function atualizarFiltro() {
    const valor = pegarValorAtual()
    document.querySelector(".phoneBg").style.filter = `brightness(${valor / 50})`
    }

    

    function pegarValorAtual() {
        const transform = slider.style.transform
        const posicaoAtual = parseFloat(transform.replace("translateX(", "").replace("px)", "") || 0)

        const larguraLinha = 8  
        const totalLargura = 101 * larguraLinha
        const centro = slider.offsetWidth / 2

        const valor = Math.round((centro - posicaoAtual) / larguraLinha)
        return Math.max(0, Math.min(100, valor))  // limita entre 0 e 100
    }
    
    slider.addEventListener("wheel", (e) => {
        e.preventDefault()
        
        // move o slider
        const posicaoAtual = parseFloat(slider.style.transform.replace("translateX(", "").replace("px)", "") || 0)
        const novaPosicao = posicaoAtual + e.deltaY * -0.03
        
        // pega o valor da linha sob o marcador
        const valor = pegarValorAtual()
        console.log(valor)
        
        slider.style.transform = `translateX(${novaPosicao}px)`
        atualizarFiltro(pegarValorAtual())
    })
})

//TODO Não permitir que o slider seja movido para além das linhas, ou seja, que o valor seja sempre entre 0 e 100
//TODO Adicionar a função de alterar o filtro que está selecionado