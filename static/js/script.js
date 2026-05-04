// Ligando BackEnd com FrontEnd

// Quando o conteúdo da página for carregado, executa a função abaixo
// TODO: Futuramente, linkar essa ação para um evento de drop de imagem.
document.addEventListener('DOMContentLoaded', async () => {
    const resposta = await fetch("/", { method: "POST" }) // Envia um POST para o endpoint "/"
    const dados = await resposta.json() // a variável "dados" é uma variável auxiliar, que armazena a resposta do backend, convertida para JSON
    console.log(dados.resposta)
})