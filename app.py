import os
import sys

import openai
from flask import Flask, render_template, request, send_file, Response

import Azures

app = Flask(__name__)
openai.api_key = os.getenv("OPENAI_API_KEY")
@app.route("/", methods=("GET", "POST"))
def index():
    if request.method == "POST":
        animal = request.form["animal"]

        response = openai.Completion.create(
            engine="text-davinci-002",
            prompt=animal,
            temperature=0.5,
            max_tokens=60,
            top_p=1.0,
            frequency_penalty=0.5,
            presence_penalty=0.0,
            stop=["You:"]
        )
        # text = "To let our customers to more involved in the interaction, I want to let them hear my voice. Thus, " \
        #        "You can hear my response on our website freely. The function is based on the azure voice studio. " \
        #        "Thus, to obtain the voice data in real-time, we maintain an external thread from the main thread in " \
        #        "charge of sending and receiving voice packages. After the clients-side receive all packages, " \
        #        "they will be synthesized into the voice of whole sentences and played online."
        # return text

        return response.choices[0].text

    result = request.args.get("result")

    return render_template("index.html", result=result)


@app.route("/response", methods=("GET", "POST"))
def response():
    with open('./cache/outputaudio.wav', 'rb') as file:
        file = Azures.Amber_voice("we are getting further and further out of our way.")

        # file.read()
        return send_file(file, mimetype='audio/wav')


@app.route('/mp3', methods=("GET", "POST"))
def stream_mp3():
    print("Type some text that you want to speak...")
    text = input()
    if text != '':

        # fmp3 = Azures.Amber_voice("We are on our way somehow")
        return Response(text)
    else:
        return Response("Nothing has been input")


@app.route('/audio', methods=("GET", "POST"))
def audio():
    # return render_template('AudioPage.html')
    return render_template('Systhesis.html')


@app.route('/vr')
def hello_world():  # put application's code here
    return render_template("azure_js.html")


@app.route('/about-us')
def about_us():  # put application's code here
    return render_template("about_us.html")

#
if __name__ == '__main__':
    # print(ABSPATH)
    # app.run()

    ABSPATH = os.path.abspath(sys.argv[0])
    ABSPATH = os.path.dirname(ABSPATH)
    app.run('0.0.0.0', debug=True, port=80, a={1:"2"}, ssl_context=(
    ABSPATH + "\\cert\\7393365_www.gkyfuxczt.icu.pem", ABSPATH + "\\cert\\7393365_www.gkyfuxczt.icu.key"))

# @app.route("/response",methods=("GET", "POST"))
# def response(prompt):
#
