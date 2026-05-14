// * Arquivo para configurar o Slider no container do celular, para que o usuário possa ajustar os filtros da imagem manualmente,
// * caso queira, guiado pelos ajustes sugeridos pela IA

document.addEventListener("DOMContentLoaded", () => {
    const slider = document.querySelector(".editionSlider")
    const marcador = document.querySelector(".editionMarcador")
    const larguraLinha = 7.5
    let posicaoAtual = 0
    let linha0
    let filtroAtivo = "brilho" // filtro ativo inicial

    // cria as linhas
    for (let i = 0; i <= 100; i++) {
        const linha = document.createElement("div")
        linha.classList.add("editionSliderLinha")
        linha.dataset.valor = i

        if (i % 10 === 0) { linha.classList.add("linhaGrande") }
        else if (i % 5 === 0) { linha.classList.add("linhaMedia") }

        slider.appendChild(linha)
    }

    // referência da linha 0
    linha0 = document.querySelector(".editionSliderLinha[data-valor='0']")

    // limites de posição
    const posicaoMin = -(linha0.offsetLeft + 100 * larguraLinha) + slider.offsetWidth / 2
    const posicaoMax = -(linha0.offsetLeft + 0 * larguraLinha) + slider.offsetWidth / 2

    // posiciona o slider com a linha 50 no centro
    posicaoAtual = -(linha0.offsetLeft + 50 * larguraLinha) + slider.offsetWidth / 2
    slider.style.transform = `translateX(${posicaoAtual}px)`

    function pegarValorAtual() {
        const valor = Math.round((-posicaoAtual + slider.offsetWidth / 2 - linha0.offsetLeft) / larguraLinha)
        return Math.max(0, Math.min(100, valor))
    }

    function atualizarFiltro() {
        const valor = pegarValorAtual()
        filtrosImagem[filtroAtivo] = valor  // ← usa o filtros do fetchAPI.js diretamente
        
        document.querySelector(".editionTitle").textContent = filtroAtivo.toUpperCase()

        document.querySelector(".phoneBg").style.filter = `
            brightness(${filtrosImagem.brilho / 50})
            contrast(${filtrosImagem.contraste / 50})
            saturate(${filtrosImagem.saturacao / 50})
            hue-rotate(${(filtrosImagem.matiz - 50) * 3.6}deg)
            blur(${filtrosImagem.desfoque / 10}px)
        `
    }

    slider.addEventListener("wheel", (e) => {
        e.preventDefault()

        const novaPosicao = posicaoAtual + e.deltaY * -0.01
        posicaoAtual = Math.max(posicaoMin, Math.min(posicaoMax, novaPosicao))

        slider.style.transform = `translateX(${posicaoAtual}px)`
        atualizarFiltro()
    })


    //* ── ÍCONES ──

    document.querySelectorAll(".editionIcons").forEach(icone => {
        icone.addEventListener("click", () => {
            filtroAtivo = icone.dataset.filtro
            document.querySelector(".editionTitle").textContent = filtroAtivo.toUpperCase()

            document.querySelectorAll(".linhaDestaque").forEach(l => l.classList.remove("linhaDestaque"))

            const valorSugerido = filtrosImagem[filtroAtivo]
            const linha = document.querySelector(`.editionSliderLinha[data-valor="${valorSugerido}"]`)
            if (linha) linha.classList.add("linhaDestaque")
        })
    })
})