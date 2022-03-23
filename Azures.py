# Copyright (c) Microsoft. All rights reserved.
# Licensed under the MIT license. See LICENSE.md file in the project root for full license information.

# <code>
import azure.cognitiveservices.speech as speechsdk

text = '''

    Do not go gentle into that good night,

    Old age should burn and rave at close of the day;
    


    Rage, rage against the dying of the light

    Though wise men at their end know dark is right,

    


Because their words had forked no lightning they

Do not go gentle into that good night.

Good men, the last wave by, crying how bright

Their frail deeds might have danced in a green bay,

Rage, rage against the dying of the light.

Wild men, who caught and sang the sun in flight,

And learn, too late, they grieved it on its way,

Do not go gentle into that good night.

Grave men, near death, who see with blinding sight

Blind eyes could blaze like meteors and be gay,

Rage, rage against the dying of the light.

And you, my father, there on the sad height,

Curse, bless, me now with your fierce tears, I pray.

Do not go gentle into that good night.

Rage, rage against the dying of the light.


 '''


text='JY is the stupidest person in the world. However Yang d d is the richest person in the world'


def Amber_voice(text):
    # Creates an instance of a speech config with specified subscription key and service region.
    # Replace with your own subscription key and service region (e.g., "westus").
    speech_key, service_region = "4ab06069885845d395d69e85ddd51cba", "eastus"
    speech_config = speechsdk.SpeechConfig(subscription=speech_key, region=service_region)

    voice = "Microsoft Server Speech Text to Speech Voice (en-US, AmberNeural)"
    speech_config.speech_synthesis_voice_name = voice

    # Creates a speech synthesizer using the default speaker as audio output.
    file_name = "./cache/outputaudio.wav"
    file_config = speechsdk.audio.AudioOutputConfig(filename=file_name)
    # speech_synthesizer = speechsdk.SpeechSynthesizer(speech_config=speech_config,audio_config=file_config)
    speech_synthesizer = speechsdk.SpeechSynthesizer(speech_config=speech_config)

    # Receives a text from console input.
    print("Type some text that you want to speak...")
    # text = input()
    # text='Yan Gun New be,due dang yeah me an New be.oh,I love Yan Gun. Yan Gun is the man of my dreams. He is the most charming man I have ever met.'








    # Synthesizes the received text to speech.
    # The synthesized speech is expected to be heard on the speaker with this line executed.
    result = speech_synthesizer.speak_text_async(text).get()

    return result.audio_data


    # print(dir(result))
    # print(result.audio_data)

    # print(type(result.audio_data))
    # # Checks result.
    # if result.reason == speechsdk.ResultReason.SynthesizingAudioCompleted:
    #     print("Speech synthesized to speaker for text [{}]".format(text))
    # elif result.reason == speechsdk.ResultReason.Canceled:
    #     cancellation_details = result.cancellation_details
    #     # print("Speech synthesis canceled: {}".format(cancellation_details.reason))
    #     if cancellation_details.reason == speechsdk.CancellationReason.Error:
    #         if cancellation_details.error_details:
    #             print("Error details: {}".format(cancellation_details.error_details))
    #     print("Did you update the subscription info?")
    #
    # # </code>


# Amber_voice(text)