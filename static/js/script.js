// Ligando BackEnd com FrontEnd

// * As duas funções foram separadas pois uma será acionada ao passar a imagem por cima do container, 
// * mas a outra apenas quando a imagem é dropada

//Função acionada quando a imagem é passada por cima do container, para impedir o comportamento padrão do navegador, que é abrir a imagem em uma nova aba
document.querySelector("#drop-zone").addEventListener("dragover", async (e) => {
    e.preventDefault() // Previne o comportamento padrão do navegador, que é abrir a imagem em uma nova aba
})

document.querySelector("#drop-zone").addEventListener("drop", async (e) => {
    e.preventDefault()
    const resposta = await fetch("/", { method: "POST" }) // Envia um POST para o endpoint "/"
    const dados = await resposta.json() // a variável "dados" é uma variável auxiliar, que armazena a resposta do backend, convertida para JSON
    console.log(dados.teste)
})

