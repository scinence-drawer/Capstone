# Capstone
Virtual counselor by Fish Tank VR


[Full Documentation  ](https://drive.google.com/file/d/1zbfcnF1yjTRsftmnnxU8f_2a7GIN2U1A/view?usp=sharing)

![Day mode](https://github.com/scinence-drawer/Capstone/blob/a0b5012362184f3ce7a645c553ec6dd5d2a49d68/day.png)

![Night mode](https://github.com/scinence-drawer/Capstone/blob/a0b5012362184f3ce7a645c553ec6dd5d2a49d68/night.png)

# Motivation: the start point

Nowadays, the young generation often suffers a lot of mental pressure because of heavy and complicated work.
Excessive mental pressure may bring some psychological problems or trauma, which makes them unable to treat
life with a healthy and positive attitude. Some people may even act impulsively because of these bad emotions
or psychological problems, resulting in irreversible consequences.

Confiding in a close friend is one of the best ways to relieve stress. But in reality, a friend who is patient enough
and willing to listen to us when we talk about our unhappiness and who can always give us advice or solutions
to our problems is extremely difficult to find. So we designed our project: The chat bot named Apollo.
It can be like a friend, patient enough to listen to all the user’s words or questions and give suggestions or answers.


# Introduction and Innovation

With a more in-depth understanding of the cutting-edge curriculum, we finally combined VR models and scenes
development, intelligent chat system design, and language generation implementation together.

In the system, we provide the user with an animated VR model to interact with. We strongly recommend
directly talking with the model instead of typing text, which could bring users more involvement. For the content
of your talking, we have no suggestion because basically, the user could discuss anything they want with our
model. The VR effect could be opened by the button at the top of the background. Though the function we
provided seems easy to understand, it is implemented using many advanced techniques and algorithms.

Fish Tank VR is our first technical innovation. Our customers can see our VR models and scenes without
wearing any VR equipment. Therefore, it is much easier for them to immerse themselves in our world and build
a close relationship with our life-like character. Besides fulfilling basic functions, we also investigated several
challenging fields of VR, including spatial perception, 3D interaction, telepresence, and 3D collaboration, so the
model would be more natural and energetic.

GPT-3 is another powerful tool in our project. Users who tried our project reported that it is a convenient and
interesting platform that allows them to express themselves freely. To their surprise, the feedback from the chat
bot is really precise and fluent, and he can even answer questions based on concrete context. This is because

GPT-3’s ability to identify themes from users’ input and generate answers is very effective due to our constant
training, which helps us get a better understanding of our users’ wants and needs.

The last innovative function is to realize the voice generation and voice recognition based on Azure voice. With
the help of it, users could interact with our VR character seamlessly. Trial users feel like they are talking to
a real person. The key point of this is to convert text to a fluid, natural-sounding speech that matches the
patterns and intonation of human voices. To match mouth movements to synthetic speech, our group uses
six different mouth shapes based on vowels, viseme sequencing, and duration of synthesized speech for facial
expression synchronization.


# Advantages: Comparison with other similar products

Compared with the intelligent voice assistants on the market, such as Siri of Apple, Xiao Ai of Xiao Mi, and
Cortana of Microsoft. The advantage of these voice assistants is that they are easy to use for users, and users
can start a conversation just by calling their name . At the same time, they are more focused on functions in the
IoT field, and users can call ecologically adapted products, such as speakers, through voice. Some products have
certain AI learning abilities to realize situational dialogue.

For our products, visual 3D images, including actions and expressions, are one of our strengths. In addition, our
products are more focused on the dialogue function. The dialogue is more intelligent than the general voice
assistant and can realize simple situational dialogue.

Compared with avatars and 3D role-playing chat software, our products can ensure the safety of conversations,
and users can not worry about the content of conversations being known by others. At the same time, based
on the naked-eye 3D technology, the dialogue scene is more realistic and immersive. The advantage of 3D
role-playing and avatars is that the dialogue is more realistic because the dialogue party is played by a real
person. The difference is that 3D role-playing software allows users to create their own avatars, but the cost is
high. Although the cost of avatar software is lower than ours, the experience and immersion will be much worse.


# Technology Choices and Reasons

* **Fish Tank VR** : Fish Tank VR is our first technical innovation. Our customers can see our VR models
and scenes without wearing any VR equipment. Therefore, it is much easier for them to immerse themselves
in our world and build a close relationship with our life-like character. Besides fulfilling basic functions, we
also investigated several challenging fields of VR, including spatial perception, 3D interaction, telepresence,
and 3D collaboration, so the model would be more natural and energetic.

	We used Fish Tank VR in the following parts of the project:
	
	* 	Face detection module based on the off-axis camera.
	* 	Render graphics in real-time based on users’ location.

* **Azure Voice**:  Azure Voice can convert text to speech. We could differentiate our product with a
customized, realistic voice generator and access voices with varied speaking styles and emotional tones to meet our use case thanks to over 270 neural voices across 119 languages and variants. We use this to
develop our voice generation system so that users feel like they are talking with a real person.

* **GPT-3**: The GPT-3 is a neural network machine learning model that generates any type of text from
internet data. OpenAI developed it to generate enormous amounts of relevant and complex machine-
generated text with a modest quantity of input text. The chatting system is developed based on GPT-3,
and it can get a response to users’ questions accurate and effective. Moreover, our project allows users to
communicate with the VR character based on context, which will bring a better user experience.

* **Vue**: Vue is a JavaScript framework for building user interfaces. It builds on top of standard HTML,
CSS, and JavaScript and provides a declarative and component-based programming model that helps
you efficiently develop user interfaces, be it simple or complex. This framework offers high performance
and makes our web page rendering quick. Furthermore, Vue is progressive, so we could work on the app
component by the component, making the entire process more manageable.

* **WebGL**: WebGL is a 3D drawing standard that allows JavaScript to be combined with OpenGL ES 2.0.
By adding a JavaScript binding to OpenGL ES 2.0, WebGL can provide hardware 3D accelerated rendering
(partial computing GPU) for HTML5 Canvas so that Web developers can use the system graphics card to
more smoothly display 3D scenes and models in the browser, as well as create complex navigation and
data visualization.

* **Viseme**: Viseme is an audio-video model of mouth shape commonly used in speech-driven speaker head
animation. Viseme is the visual representation of a phoneme. It defines the position of the face and the
mouth when speaking a word. With the lip sync feature, our team can get the viseme sequence and its
duration from generated speech for facial expression synchronization. For this project, we build 6 kinds of
mouth shape according to vowels, perfectly matching mouth movements to synthetic speech.


