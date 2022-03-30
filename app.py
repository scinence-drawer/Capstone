import os

import openai
from flask import Flask, render_template, request

app = Flask(__name__)
openai.api_key = os.getenv("OPENAI_API_KEY")


@app.route("/", methods=("GET", "POST"))
def index():
    if request.method == "POST":
        animal = request.form["animal"]
        response = openai.Completion.create(
            engine="text-davinci-001",
            prompt=animal,
            temperature=0.1,
            max_tokens=100,
        )
        # return redirect(url_for("index", result=response.choices[0].text))
        return response.choices[0].text

    result = request.args.get("result")

    return render_template("index.html", result=result)


if __name__ == '__main__':
    app.run()
# @app.route("/response",methods=("GET", "POST"))
# def response(prompt):
#
