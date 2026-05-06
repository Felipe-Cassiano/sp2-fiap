// Ligando BackEnd com FrontEnd

// * As duas funções foram separadas pois uma será acionada ao passar a imagem por cima do container, 
// * mas a outra apenas quando a imagem é dropada

//Função acionada quando a imagem é passada por cima do container, para impedir o comportamento padrão do navegador, que é abrir a imagem em uma nova aba
document.querySelector("#drop-zone").addEventListener("dragover", async (e) => {
    e.preventDefault() // Previne o comportamento padrão do navegador, que é abrir a imagem em uma nova aba
})

document.querySelector("#drop-zone").addEventListener("drop", async (e) => {
    e.preventDefault() // Previne o comportamento padrão do navegador, que é abrir a imagem em uma nova aba

    const fotoDropada = e.dataTransfer.files[0] // A variável "arquivo" é a primeira imagem que foi dropada no container
    const formData = new FormData() // A variável "formData" é uma variável auxiliar, que armazena os dados que serão enviados para o backend
    formData.append("arquivo", fotoDropada) // Adiciona a imagem ao formData, com o nome "arquivo"

    //* fetch na API que envia a imagem e recebe a resposta do backend, que é a leitura da IA da imagem
    const resposta = await fetch("/", { 
        method: "POST", 
        body: formData
    }) // Envia um POST para o endpoint "/"
    const retornoIA = await resposta.json() // a variável "dados" é uma variável auxiliar, que armazena a resposta do backend, convertida para JSON

    console.log(retornoIA.teste) //Retorna "Conexao funcionando! (Google Gemini, com JSON e reconhecimento de foto)"
    console.log(retornoIA.valores) //Retorna a leitura da IA da Imagem
})

