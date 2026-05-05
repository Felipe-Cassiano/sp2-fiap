#Importando as bibliotecas necessárias
from flask import Flask, request, jsonify, render_template
from google import genai
import json
import os
from dotenv import load_dotenv

load_dotenv()
app = Flask(__name__)
client = genai.Client(api_key=os.getenv("GEMINI_API_KEY")) #Substitui a real chave de API por uma variável de ambiente para segurança

#Quando o usuário acessar "/", chama a função abaixo e renderiza index.html
@app.route("/", methods=["GET"])
def index():
    return render_template("index.html")

# @app.route("/", methods=["POST"])
# def teste():
#     return jsonify({"resposta": "Conexao funcionando! (console.log)"})

#Quando o usuário enviar um POST para "/", chama a função abaixo, 
#que gera uma resposta usando o modelo Gemini e retorna a resposta em formato JSON
@app.route("/", methods=["POST"])
def teste():
    resposta = client.models.generate_content(
        model="gemini-2.5-flash-lite",
        contents="""Retorne APENAS um JSON válido, sem nenhum texto adicional, sem explicações, sem markdown, sem ```json. 
        Neste formato exato:
        {
            "teste": "Conexao funcionando! (Google Gemini, com JSON)"
        }
        """
    )

    #A resposta do Gemini vem em um formato de texto, então precisamos extrair o JSON dela.
    texto_resposta = resposta.text
    texto_resposta = texto_resposta.replace("```json", "").replace("```", "").strip() #* Remove as marcações de código e espaços extras

    print("Resposta do Gemini:", texto_resposta) # Imprime a resposta bruta do Gemini para depuração
    dados = json.loads(texto_resposta)
    return jsonify(dados)

if __name__ == "__main__":
    app.run(debug=True)