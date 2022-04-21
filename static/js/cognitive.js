var phraseDiv;
//var statusDiv;
var key, authorizationToken, appId, phrases;
var regionOptions;
var languageOptions, formatOption, filePicker, microphoneSources;
var useDetailedResults;
var recognizer;
var inputSourceMicrophoneRadio, inputSourceFileRadio;
var scenarioSelection, scenarioStartButton, scenarioStopButton;
var formatSimpleRadio, formatDetailedRadio;
var reco;
var languageTargetOptions, voiceOutput;
var audioFile;
var microphoneId;
var referenceText;
var pronunciationAssessmentResults;
var cogOnGoing = false;
var message = '';
var userPermission = document.getElementById('fang');
var userPermissionbool = false;

var thingsToDisableDuringSession;

var soundContext = undefined;
try {
    var AudioContext = window.AudioContext // our preferred impl
        || window.webkitAudioContext       // fallback, mostly when on Safari
        || false;                          // could not find.

    if (AudioContext) {
        soundContext = new AudioContext();
    } else {
        alert("Audio context not supported");
    }
} catch (e) {
    window.console.log("no sound context found, no audio output. " + e);
}
thingsToDisableDuringSession = [
    key,
    regionOptions,
    languageOptions,
    inputSourceMicrophoneRadio,
    inputSourceFileRadio,
    scenarioSelection,
    formatSimpleRadio,
    formatDetailedRadio,
    appId,
    phrases,
    languageTargetOptions
];


function StopPlayback() {
    $('#chatText').val('stopped');
    vm.newMessage = "stopped";
    player.pause();
    player = undefined

}

function zero() {
    // alert('zz');
    message = '';
    stopCogni();
}


function ChangeUseableCondition() {
    console.log("点了一下");
    // usespeechinput=!usespeechinput
    if (userPermissionbool) {
        toMutePng();
        if (cogOnGoing) {
            userPermissionbool = false;
            stopCogni();
        } else {
            userPermissionbool = false;
        }

    } else {
        userPermissionbool = true;
        userPermission.disabled = true;
        toSpeakPng();
        doContinuousRecognition();
    }
}

function toMutePng() {
    $("#fang").removeClass("fa-microphone-slash")
    $("#fang").addClass("fa-microphone")
}

function toSpeakPng() {
    $("#fang").addClass("fa-microphone")
    $("#fang").addClass("fa-microphone-slash")
}

function doContinuousRecognition() {
    if (cogOnGoing) {
        return;
        console.log("我不该出来");
    }
    cogOnGoing = true;
    $('#chatText').val("loading..")
    message = ''
    // enumerateMicrophones();
    phraseDiv = document.getElementById("chatText");

    //登高楼倚栏杆哇
    //登高楼倚栏杆哇
    //登高楼倚栏杆哇
    //登高楼倚栏杆哇
    //登高楼倚栏杆哇
    //登高楼倚栏杆哇
    //登高楼倚栏杆哇
    //登高楼倚栏杆哇
    // resetUiForScenarioStart();

    // var audioConfig = getAudioConfig();
    var audioConfig = SpeechSDK.AudioConfig.fromDefaultMicrophoneInput();
    var speechConfig = getSpeechConfig(SpeechSDK.SpeechConfig);
    // var speechConfig = SpeechSDK.SpeechConfig.fromSubscription("66e477bdd562461d81b2308d43603c8c", "eastasia");
    if (!speechConfig) return;

    // Create the SpeechRecognizer and set up common event handlers and PhraseList data
    reco = new SpeechSDK.SpeechRecognizer(speechConfig, audioConfig);
    applyCommonConfigurationTo(reco);

    // Start the continuous recognition. Note that, in this continuous scenario, activity is purely event-
    // driven, as use of continuation (as is in the single-shot sample) isn't applicable when there's not a
    // single result.
    // reco.recognized = undefined;
    //
    //         // Note: this scenario sample demonstrates result handling via continuation on the recognizeOnceAsync call.
    //         // The 'recognized' event handler can be used in a similar fashion.
    //         reco.recognizeOnceAsync(
    //             function (successfulResult) {
    //                 onRecognizedResult(successfulResult);
    //                 console.log(successfulResult);
    //             },
    //             function (err) {
    //                 window.console.log(err);
    //                 phrasediv.innerHTML += "ERROR: " + err;
    //             });


    reco.startContinuousRecognitionAsync();
    console.log('chulai');

}


function getSpeechConfig(sdkConfigType) {
    let speechConfig;
    // if (authorizationToken) {
    //     speechConfig = sdkConfigType.fromAuthorizationToken(authorizationToken, regionOptions.value);
    // } else if (!key.value) {
    //     alert("Please enter your Cognitive Services Speech subscription key!");
    //     return undefined;
    // } else {
    speechConfig = sdkConfigType.fromSubscription("66e477bdd562461d81b2308d43603c8c", "eastasia");
    // }

    // Setting the result output format to Detailed will request that the underlying
    // result JSON include alternates, confidence scores, lexical forms, and other
    // advanced information.
    if (useDetailedResults && sdkConfigType != SpeechSDK.SpeechConfig) {
        window.console.log('Detailed results are not supported for this scenario.\r\n');
        document.getElementById('formatSimpleRadio').click();
    } else if (false) {
        speechConfig.outputFormat = SpeechSDK.OutputFormat.Detailed;
    }

    // Defines the language(s) that speech should be translated to.
    // Multiple languages can be specified for text translation and will be returned in a map.
    if (sdkConfigType == SpeechSDK.SpeechTranslationConfig) {
        speechConfig.addTargetLanguage(languageTargetOptions.value.split("(")[1].substring(0, 5));
    }

    // speechConfig.speechRecognitionLanguage = "en-US";
    speechConfig.speechRecognitionLanguagegnitionLanguage = "zh-CN";
    return speechConfig;
}


function enumerateMicrophones() {
    if (!navigator || !navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
        console.log(`Unable to query for audio input devices. Default will be used.\r\n`);
        return;
    }

    navigator.mediaDevices.enumerateDevices().then((devices) => {
        //microphoneSources.innerHTML = '';

        // Not all environments will be able to enumerate mic labels and ids. All environments will be able
        // to select a default input, assuming appropriate permissions.
        var defaultOption = document.createElement('option');
        defaultOption.appendChild(document.createTextNode('Default Microphone'));
        //microphoneSources.appendChild(defaultOption);

        for (const device of devices) {
            if (device.kind === "audioinput") {
                if (!device.deviceId) {
                    window.console.log(
                        `Warning: unable to enumerate a microphone deviceId. This may be due to limitations`
                        + ` with availability in a non-HTTPS context per mediaDevices constraints.`);
                } else {
                    var opt = document.createElement('option');
                    opt.value = device.deviceId;
                    opt.appendChild(document.createTextNode(device.label));

                    //microphoneSources.appendChild(opt);
                }
            }
        }

        //microphoneSources.disabled = (//microphoneSources.options.length == 1);
    });
}


function applyCommonConfigurationTo(recognizer) {
    // The 'recognizing' event signals that an intermediate recognition result is received.
    // Intermediate results arrive while audio is being processed and represent the current "best guess" about
    // what's been spoken so far.
    recognizer.recognizing = onRecognizing;

    // The 'recognized' event signals that a finalized recognition result has been received. These results are
    // formed across complete utterance audio (with either silence or eof at the end) and will include
    // punctuation, capitalization, and potentially other extra details.
    //
    // * In the case of continuous scenarios, these final results will be generated after each segment of audio
    //   with sufficient silence at the end.
    // * In the case of intent scenarios, only these final results will contain intent JSON data.
    // * Single-shot scenarios can also use a continuation on recognizeOnceAsync calls to handle this without
    //   event registration.
    recognizer.recognized = onRecognized;

    // The 'canceled' event signals that the service has stopped processing speech.
    // https://docs.microsoft.com/javascript/api/microsoft-cognitiveservices-speech-sdk/speechrecognitioncanceledeventargs?view=azure-node-latest
    // This can happen for two broad classes of reasons:
    // 1. An error was encountered.
    //    In this case, the .errorDetails property will contain a textual representation of the error.
    // 2. No additional audio is available.
    //    This is caused by the input stream being closed or reaching the end of an audio file.
    recognizer.canceled = onCanceled;

    // The 'sessionStarted' event signals that audio has begun flowing and an interaction with the service has
    // started.
    recognizer.sessionStarted = onSessionStarted;

    // The 'sessionStopped' event signals that the current interaction with the speech service has ended and
    // audio has stopped flowing.
    recognizer.sessionStopped = onSessionStopped;

    // PhraseListGrammar allows for the customization of recognizer vocabulary.
    // The semicolon-delimited list of words or phrases will be treated as additional, more likely components
    // of recognition results when applied to the recognizer.
    //
    // See https://docs.microsoft.com/azure/cognitive-services/speech-service/get-started-speech-to-text#improve-recognition-accuracy
    // if (phrases.value) {
    //     var phraseListGrammar = SpeechSDK.PhraseListGrammar.fromRecognizer(recognizer);
    //     phraseListGrammar.addPhrases(phrases.value.split(";"));
    // }
}

function onRecognizing(sender, recognitionEventArgs) {
    var result = recognitionEventArgs.result;
    console.log(result.text);

    $('#chatText').val("").focus().val(message + result.text + '[...]');


    // document.dispatchEvent(keydown);
    // document.dispatchEvent(keydown);
    // $('#chatText').focus();


}

function onRecognized(sender, recognitionEventArgs) {
    var result = recognitionEventArgs.result;

    console.log(result);

    if (result.text != undefined) {
        message += result.text;
        vm.newMessage = message
        $('#chatText').val(message);
        $('#chatText').focus();
        var keydown = new KeyboardEvent('keydown', {'keyCode': 13, 'which': 13});
        document.body.dispatchEvent(keydown);
        console.log('有啊');

    }


    onRecognizedResult(recognitionEventArgs.result);

    //     try{
    //
    //         // $('#chatText').val(result.text+'\r\n');
    //
    //     }catch (e) {
    //     window.console.log("no sound context found, no audio output. " + e);
    // }

}

function onRecognizedResult(result) {
    // phrasediv.scrollTop = phraseDiv.scrollHeight;

    //statusDiv.innerHTML += `(recognized)  Reason: ${SpeechSDK.ResultReason[result.reason]}`;

    console.log(`(recognized)  Reason: ${SpeechSDK.ResultReason[result.reason]}`);

    // if (scenarioSelection.value === 'speechRecognizerRecognizeOnce'
    //     || scenarioSelection.value === 'intentRecognizerRecognizeOnce') {
    //     // Clear the final results view for single-shot scenarios
    //     phraseDiv.innerHTML = '';
    // } else {
    //     // Otherwise, just remove the ongoing hypothesis line
    //     phraseDiv.innerHTML = phraseDiv.innerHTML.replace(/(.*)(^|[\r\n]+).*\[\.\.\.\][\r\n]+/, '$1$2');
    // }

    switch (result.reason) {
        case SpeechSDK.ResultReason.NoMatch:
            var noMatchDetail = SpeechSDK.NoMatchDetails.fromResult(result);
            //statusDiv.innerHTML += ` NoMatchReason: ${SpeechSDK.NoMatchReason[noMatchDetail.reason]}\r\n`;
            break;
        case SpeechSDK.ResultReason.Canceled:
            var cancelDetails = SpeechSDK.CancellationDetails.fromResult(result);
            //statusDiv.innerHTML += ` CancellationReason: ${SpeechSDK.CancellationReason[cancelDetails.reason]}`;
            +(cancelDetails.reason === SpeechSDK.CancellationReason.Error
                ? `: ${cancelDetails.errorDetails}` : ``)
            + `\r\n`;
            break;
        case SpeechSDK.ResultReason.RecognizedSpeech:
        case SpeechSDK.ResultReason.TranslatedSpeech:
        case SpeechSDK.ResultReason.RecognizedIntent:
            //statusDiv.innerHTML += `\r\n`;

            // if (useDetailedResults) {
            //     var detailedResultJson = JSON.parse(result.json);

            // Detailed result JSON includes substantial extra information:
            //  detailedResultJson['NBest'] is an array of recognition alternates
            //  detailedResultJson['NBest'][0] is the highest-confidence alternate
            //  ...['Confidence'] is the raw confidence score of an alternate
            //  ...['Lexical'] and others provide different result forms
            // var displayText = detailedResultJson['DisplayText'];
            phrasediv.innerHTML += `Detailed result for "${displayText}":\r\n`
            // + `${JSON.stringify(detailedResultJson, null, 2)}\r\n`;
            // } else if (result.text) {
            //     phraseDiv.innerHTML += `${result.text}\r\n`;
            // }

            var intentJson = result.properties
                .getProperty(SpeechSDK.PropertyId.LanguageUnderstandingServiceResponse_JsonResult);
            if (intentJson) {
                phraseDiv.innerHTML += `${intentJson}\r\n`;
            }

            if (result.translations) {
                var resultJson = JSON.parse(result.json);
                resultJson['privTranslationPhrase']['Translation']['Translations'].forEach(
                    function (translation) {
                        phraseDiv.innerHTML += ` [${translation.Language}] ${translation.Text}\r\n`;
                    });
            }

            if (scenarioSelection.value.includes('pronunciation')) {
                var pronunciationAssessmentResult = SpeechSDK.PronunciationAssessmentResult.fromResult(result);
                phraseDiv.innerHTML +=
                    `[Pronunciation result] Accuracy: ${pronunciationAssessmentResult.accuracyScore}; 
                       Fluency: ${pronunciationAssessmentResult.fluencyScore};
                       Completeness: ${pronunciationAssessmentResult.completenessScore}.\n`;
                pronunciationAssessmentResults.push(pronunciationAssessmentResult);
            }
            break;
    }
}

function onSessionStarted(sender, sessionEventArgs) {
    //statusDiv.innerHTML += `(sessionStarted) SessionId: ${sessionEventArgs.sessionId}\r\n`;
    console.log(`(sessionStarted) SessionId: ${sessionEventArgs.sessionId}\r\n`);
    userPermission.disabled = false;


    // for (const thingToDisableDuringSession of thingsToDisableDuringSession) {
    //     thingToDisableDuringSession.disabled = true;
    // }
    //
    // scenarioStartButton.disabled = true;
    // scenarioStopButton.disabled = false;
    $('#chatText').val('recognizing...');

}

function onSessionStopped(sender, sessionEventArgs) {
    //statusDiv.innerHTML += `(sessionStopped) SessionId: ${sessionEventArgs.sessionId}\r\n`;
    console.log(`(sessionStopped) SessionId: ${sessionEventArgs.sessionId}\r\n`);
    cogOnGoing = false;

    // if (scenarioSelection.value == 'pronunciationAssessmentContinuous') {
    //     calculateOverallPronunciationScore();
    // }

    // for (const thingToDisableDuringSession of thingsToDisableDuringSession) {
    //     thingToDisableDuringSession.disabled = false;
    // }
    //
    // scenarioStartButton.disabled = false;
    // scenarioStopButton.disabled = true;
}

function onCanceled(sender, cancellationEventArgs) {
    window.console.log(e);

    //statusDiv.innerHTML += "(cancel) Reason: " + SpeechSDK.CancellationReason[e.reason];
    console.log("(cancel) Reason: " + SpeechSDK.CancellationReason[e.reason])

    if (e.reason === SpeechSDK.CancellationReason.Error) {
        //statusDiv.innerHTML += ": " + e.errorDetails;
        console.log(": " + e.errorDetails);
    }
    //statusDiv.innerHTML += "\r\n";
    console.log("\r\n");
}

function stopCogni() {
    // cogOnGoing=false;
    reco.stopContinuousRecognitionAsync(
        function () {
            reco.close();
            reco = undefined;

        },
        function (err) {
            reco.close();
            reco = undefined;
        }
    );

}


document.onkeydown = function (event) {
    var e = event || window.event || arguments.callee.caller.arguments[0];
    if (e && e.keyCode === 13) {
        // enter 键
        if ($('#chatText').val !== '') {
            // addToChat();
            zero();

        } else {
            alert("说话！");
        }
        //要做的事情

    }
};