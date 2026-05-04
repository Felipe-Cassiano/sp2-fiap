#Importando as bibliotecas necessárias
from flask import Flask, request, jsonify, render_template
from google import genai
import json

app = Flask(__name__)
client = genai.Client(api_key="AIzaSyAz5TFA66IA5bcXmI1-rD5zX-1WLfRaR-w")

#Quando o usuário acessar "/", chama a função abaixo e renderiza index.html
@app.route("/", methods=["GET"])
def index():
    return render_template("index.html")

#Quando o usuário enviar um POST para "/", chama a função abaixo, 
#que gera uma resposta usando o modelo Gemini e retorna a resposta em formato JSON
@app.route("/", methods=["POST"])
def teste():
    resposta = client.models.generate_content(
        model="gemini-2.5-flash-lite",
        contents="Diga apenas: Conexao funcionando!"
    )

    textoTeste = resposta.text
    return jsonify({"resposta": textoTeste})

if __name__ == "__main__":
    app.run(debug=True)