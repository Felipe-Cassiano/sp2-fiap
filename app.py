#TODOS OS COMENTÁRIOS FORAM FEITOS USANDO A EXTENSÃO "Better Comments" DO VSCODE, 
#PARA EXPLICAR CADA PARTE DO CÓDIGO DE FORMA DETALHADA, É RECOMENDADO O USO DA EXTENSÃO PARA ENTENDIMENTO DO PROJETO.

#Importando as bibliotecas necessárias
from flask import Flask, request, jsonify, render_template
from google import genai
import json
import base64
import os
from dotenv import load_dotenv

load_dotenv()
app = Flask(__name__)
client = genai.Client(api_key=os.getenv("GEMINI_API_KEY")) #Substitui a real chave de API por uma variável de ambiente para segurança

#*Quando o usuário acessar "/", chama a função abaixo e renderiza index.html
@app.route("/", methods=["GET"])
def index():
    return render_template("index.html")

# @app.route("/", methods=["POST"])
# def iaRequest():
#     return jsonify({"resposta": "Conexao funcionando! (console.log)"})

#*Quando o usuário enviar um POST para "/", chama a função abaixo, 
#que gera uma resposta usando o modelo Gemini e retorna a resposta em formato JSON
@app.route("/", methods=["POST"])
def iaRequest():

    #? Processamento da imagem enviada pelo usuário
    # A variável "fotoDropada" é a imagem que foi enviada pelo usuário, acessada através do nome "arquivo"
    fotoDropada = request.files["arquivo"] 
     # A variável "fotoBase64" é a imagem convertida para Base64, para que possa ser enviada para o Gemini
    fotoBase64 = base64.b64encode(fotoDropada.read()).decode("utf-8")
    # A variável "fotoTipo" é o tipo da imagem (ex: "image/jpeg"), para que o Gemini saiba como interpretar a imagem
    fotoTipo = fotoDropada.content_type 

    #? Geração da resposta usando Gemini
    resposta = client.models.generate_content(
        model="gemini-2.5-flash-lite",
        
        #* O Gemini aceita uma array de objetos, sendo cada objeto uma array! 
        #neste caso, usaremos apenas uma mensagem, mas ela terá duas partes: a imagem e o texto com as instruções para o Gemini responder apenas com JSON
        contents=[ 
            {
                "parts": [
                    {
                        #Seção 1 do prompt, onde Gemini recebe a imagem, com o tipo e os dados em Base64
                        "inline_data": {
                            "mime_type": fotoTipo,
                            "data": fotoBase64
                        }
                    },
                    {
                        #Seção 2 do prompt, onde damos as instruções para o Gemini responder apenas com JSON, sem nenhum texto adicional
                        "text": 
                            """
                            Leia e entenda a imagem enviada. Na seção "valores do JSON, escreva, com poucas palavras, o que você entendeu da imagem.
                            Retorne APENAS um JSON válido, sem nenhum texto adicional, sem explicações, sem markdown, sem ```json. 
                            Neste formato exato (exceto na secão "valores", onde você deve escrever o que entendeu da imagem):
                            {
                                "teste": "Conexao funcionando! (Google Gemini, com JSON e reconhecimento de foto)",
                                "valores": ""
                            }
                            """
                    }
                ]
            }
            
        ]
    )

    #Alteração do retorno da IA para garantir que é retornado apenas como JSON.
    texto_resposta = resposta.text #* Python retorna apenas a parte "text", não importando a parte da imagem, que é a parte "inline_data"
    texto_resposta = texto_resposta.replace("```json", "").replace("```", "").strip() #* Remove as marcações de código e espaços extras

    print("Resposta do Gemini:", texto_resposta) # Imprime a resposta bruta do Gemini para depuração
    dados = json.loads(texto_resposta)
    return jsonify(dados)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=int(os.environ.get("PORT", 5000)))
        