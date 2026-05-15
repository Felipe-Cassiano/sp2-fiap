//? Ligando BackEnd com FrontEnd

// * Essa função é acionada quando a imagem é dropada no container, e onde as alterações que IA propôs são armazenadas
// * nessa variável, sendo o valor 50 o valor padrão, ou seja, sem alterações.
const filtrosImagem = {
    brilho:      50,
    contraste:   50,
    saturacao:   50,
    temperatura: 50,
    matiz:       50,
    desfoque:     0,
}

const container = document.querySelector("#drop-zone")

// ! FUNÇÃO PRINCIPAL: processarImagem
// ! Essa função é responsável por processar a imagem que foi dropada ou selecionada, 
// ! enviando-a para o backend e recebendo as alterações sugeridas pela IA, 
// ! que são então aplicadas na variável "filtrosImagem" e destacadas no slider e nos ícones
async function processarImagem(arquivoImagem) {
    document.querySelector(`.phoneContainer`).style.backgroundColor = "transparent" // Deixa o fundo do container transparente

    const formData = new FormData() // A variável "formData" é uma variável auxiliar, que armazena os dados que serão enviados para o backend
    formData.append("arquivo", arquivoImagem) // Adiciona a imagem ao formData, com o nome "arquivo"

    const url = URL.createObjectURL(arquivoImagem) // A variável "url" é a URL da imagem que foi dropada, criada a partir do arquivo
    document.querySelector(".phoneBg").style.backgroundImage = `url(${url})`

    //* fetch na API que envia a imagem e recebe a resposta do backend, que é a leitura da IA da imagem
    const resposta = await fetch("/", { 
        method: "POST", 
        body: formData
    }) // Envia um POST para o endpoint "/"
    const retornoIA = await resposta.json() // a variável "dados" é uma variável auxiliar, que armazena a resposta do backend, convertida para JSON
    const alteracoes = retornoIA.alteracoes // A variável "alteracoes" é a parte da resposta do backend que contém as alterações sugeridas pela IA

    // * O loop abaixo percorre cada uma das alterações sugeridas pela IA
    // * e atualiza a variável "filtrosImagem" com os valores sugeridos pela IA 
    // * caso a alteração seja necessária (ou seja, caso "precisa" seja true)
    Object.entries(alteracoes).forEach(([chave, valor]) => {
        if (valor.precisa) { // Se a alteração for necessária, ou seja, se "precisa" for true
            filtrosImagem[chave] = valor.valor 
            // Atualiza o valor do filtro correspondente na variável "filtrosImagem" com o valor sugerido pela IA
            // Por exemplo, se a IA sugeriu que o brilho precisa ser 60, então filtrosImagem["brilho"] será atualizado para 60
            document.querySelector(`[data-filtro="${chave}"]`).classList.add("iconeDestaque")
        
            const linhaDestaque = document.querySelector(`.editionSliderLinha[data-valor="${valor.valor}"]`)
            linhaDestaque.classList.add("linhaDestaque")
        }
    })
}

// ? Chamada da função "processarImagem" quando a imagem é dropada no container
// * As duas funções foram separadas pois uma será acionada ao passar a imagem por cima do container, 
// * mas a outra apenas quando a imagem é dropada
container.addEventListener("dragover", async (e) => {
    e.preventDefault() // Previne o comportamento padrão do navegador, que é abrir a imagem em uma nova aba
})
container.addEventListener("drop", async (e) => {
    e.preventDefault() // Previne o comportamento padrão do navegador, que é abrir a imagem em uma nova aba
    processarImagem(e.dataTransfer.files[0]) // Chama a função "processarImagem" passando o arquivo da imagem que foi dropada, que é o primeiro arquivo da lista de arquivos dropados (e.dataTransfer.files[0])
})

// ? Chamada da função "processarImagem" quando a imagem é selecionada através do input de arquivo
document.querySelector('#btnImagem').addEventListener("click", () => {
        document.querySelector("#inputImagem").click()
})

document.querySelector("#inputImagem").addEventListener("change", (e) => {
    if (!e.target.files[0]) return
    processarImagem(e.target.files[0]) // Chama a função "processarImagem" passando o arquivo da imagem que foi selecionada, que é o primeiro arquivo da lista de arquivos selecionados (e.target.files[0])
})





//? Ao fim deste arquivo, a variável "filtrosImagem" estará atualizada com os valores sugeridos pela IA, 
//? e poderá ser utilizada para sugerir as alterações no slider
