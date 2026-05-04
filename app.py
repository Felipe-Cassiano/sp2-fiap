#Importando as bibliotecas necessárias
from flask import Flask, render_template

app = Flask(__name__)

#Quando o usuário acessar "/", chama a função abaixo e renderiza index.html
@app.route("/")
def index():
    return render_template("index.html")

if __name__ == "__main__":
    app.run(debug=True)