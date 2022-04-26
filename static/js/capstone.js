var talkingHeadDiv,
    highlightDiv;
var startSynthesisAsyncButton, pauseButton, resumeButton, downloadButton;
var updateVoiceListButton;

// subscription key and region for speech services.
var subscriptionKey, regionOptions;
var authorizationToken;
var voiceOptions, isSsml;
var SpeechSDK;
var synthesisText;
var synthesizer;
var player;
var wordBoundaryList = [];

function getExtensionFromFormat(format) {
    format = format.toLowerCase();
    if (format.includes('mp3')) {
        return 'mp3';
    } else if (format.includes('ogg')) {
        return 'ogg';
    } else if (format.includes('webm')) {
        return 'webm';
    } else if (format.includes('ogg')) {
        return 'ogg';
    } else if (format.includes('silk')) {
        return 'silk';
    } else if (format.includes('riff')) {
        return 'wav';
    } else {
        return 'pcm';
    }
}

// alert("zz");


function Initialize(onComplete) {
    if (!!window.SpeechSDK) {
        onComplete(window.SpeechSDK);
    }
}

document.addEventListener("DOMContentLoaded", function () {
    // startSynthesisAsyncButton = document.getElementById("fangz");
    // startSynthesisAsyncButton = document.getElementById("fang");
    updateVoiceListButton = document.getElementById("fangz");
    // updateVoiceListButton = document.getElementById("fang");
    pauseButton = document.getElementById("pauseButton");
    resumeButton = document.getElementById("resumeButton");
    downloadButton = document.getElementById("downloadButton");
    subscriptionKey = document.getElementById("subscriptionKey");
    regionOptions = document.getElementById("regionOptions");
    voiceOptions = document.getElementById("voiceOptions");
    isSsml = document.getElementById("isSSML");
    talkingHeadDiv = document.getElementById("talkingHeadDiv");
    highlightDiv = document.getElementById("highlightDiv");

    setInterval(function () {
        if (player !== undefined) {
            const currentTime = player.currentTime;
            var wordBoundary;
            for (const e of wordBoundaryList) {
                if (currentTime * 1000 > e.audioOffset / 10000) {
                    wordBoundary = e;
                } else {
                    break;
                }
            }
        }
    }, 50);


    // startSynthesisAsyncButton.addEventListener("click", function () {
    //
    //     wordBoundaryList = [];
    //     fetchText();
    //
    // });

    Initialize(async function (speechSdk) {
        SpeechSDK = speechSdk;
        // startSynthesisAsyncButton.disabled = false;
        Object.keys(SpeechSDK.SpeechSynthesisOutputFormat).forEach(format => {
                if (isNaN(format) && !format.includes('Siren')) {
                    // formatOptions.innerHTML += "<option value=\"" + SpeechSDK.SpeechSynthesisOutputFormat[format] + "\">" + format + "</option>"
                }
            }
        );

        // in case we have a function for getting an authorization token, call it.
        if (typeof RequestAuthorizationToken === "function") {
            await RequestAuthorizationToken();
        }

    });

    const complete_cb = function (result) {

        window.console.log(result);
        synthesizer.close();
        synthesizer = undefined;
    };
    const err_cb = function (err) {
        // startSynthesisAsyncButton.disabled = false;
        downloadButton.disabled = false;
        phraseDiv.innerHTML += err;
        window.console.log(err);
        synthesizer.close();
        synthesizer = undefined;
    };

    var speechConfig;
    //懒狗北欧服务器
    // speechConfig = SpeechSDK.SpeechConfig.fromSubscription("d854eafd081d4f80断82cda731dd03dacc", "northeurope");
    // 大中华区服务器
    speechConfig = SpeechSDK.SpeechConfig.fromSubscription("66e477bdd562461d81b2308d43603c8c", "eastasia");
    //美帝区域服务器
    // speechConfig = SpeechSDK.SpeechConfig.fromSubscription("4ab06069885845d395d69e85ddd51cba", "eastus");

    // amber  声线  声音在这改
    speechConfig.speechSynthesisVoiceName = "Microsoft Server Speech Text to Speech Voice (zh-CN, XiaoXiaoNeural)";
    speechConfig.speechSynthesisOutputFormat = "8";

    function fetchText() {
        var xhr = new XMLHttpRequest();
        xhr.open("get", "/mp3", true);
        xhr.send();
        xhr.onload = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                // 4 = "loaded" && 200 =  ok
                console.log(xhr)
                console.log(xhr.response)
                speakText(xhr.response)
            }
        }

    }

    function pause() {
        var xhr = new XMLHttpRequest();
        xhr.open("get", "/mp3", true);
        xhr.send();
        xhr.onload = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                // 4 = "loaded" && 200 =  ok
                console.log(xhr)
                console.log(xhr.response)
                speakText(xhr.response)
            }
        }

    }


    function speakText(text) {
        player = new SpeechSDK.SpeakerAudioDestination();
        player.onAudioStart = function (_) {
            window.console.log("playback started");
            myUnityInstance.SendMessage("EventSystem", "WebTest", transferToUnity);
            setTimeout(function () {
                $("svg path :first-child").each(function (i) {
                    this.beginElement();
                });
            }, 0.5);
        }
        player.onAudioEnd = function (_) {
            window.console.log("playback finished");
            // startSynthesisAsyncButton.disabled = false;
            wordBoundaryList = [];

            fetchText();
        };

        var audioConfig = SpeechSDK.AudioConfig.fromSpeakerOutput(player);

        synthesizer = new SpeechSDK.SpeechSynthesizer(speechConfig, audioConfig);

        // The event synthesizing signals that a synthesized audio chunk is received.
        // You will receive one or more synthesizing events as a speech phrase is synthesized.
        // You can use this callback to streaming receive the synthesized audio.
        synthesizer.synthesizing = function (s, e) {

            window.console.log(e);
        };

        // The synthesis started event signals that the synthesis is started.
        synthesizer.synthesisStarted = function (s, e) {
            console.log("syn start")
            window.console.log(e);
        };

        // The event synthesis completed signals that the synthesis is completed.
        synthesizer.synthesisCompleted = function (s, e) {
            console.log(e);
            " Audio length: " + e.result.audioData.byteLength + "\r\n";
        };

        // The event signals that the service has stopped processing speech.
        // This can happen when an error is encountered.
        synthesizer.SynthesisCanceled = function (s, e) {
            const cancellationDetails = SpeechSDK.CancellationDetails.fromResult(e.result);
            let str = "(cancel) Reason: " + SpeechSDK.CancellationReason[cancellationDetails.reason];
            if (cancellationDetails.reason === SpeechSDK.CancellationReason.Error) {
                str += ": " + e.result.errorDetails;
            }
            window.console.log(e);
            //eventsDiv.innerHTML += str + "\r\n";
            // startSynthesisAsyncButton.disabled = false;
            downloadButton.disabled = false;
            pauseButton.disabled = true;
            resumeButton.disabled = true;
        };

        // This event signals that word boundary is received. This indicates the audio boundary of each word.
        // The unit of e.audioOffset is tick (1 tick = 100 nanoseconds), divide by 10,000 to convert to milliseconds.
        synthesizer.wordBoundary = function (s, e) {

            window.console.log(e);
            wordBoundaryList.push(e);
        };

        synthesizer.visemeReceived = function (s, e) {
            window.console.log(e);
            // console.log(e.privAudioOffset);
            // myUnityInstance.SendMessage("", "", e.privAudioOffset);
            transferToUnity = String(e.privAudioOffset) + " " + String(e.privVisemeId)
            console.log(transferToUnity);
            //eventsDiv.innerHTML += "(Viseme), Audio offset: " + e.audioOffset / 10000 + "ms. Viseme ID: " + e.visemeId + '\n';
            talkingHeadDiv.innerHTML = e.animation.replaceAll("begin=\"0.5s\"", "begin=\"indefinite\"");
            $("svg").width('500px').height('500px');
        }

        synthesizer.bookmarkReached = function (s, e) {
            window.console.log(e);
        }

        // startSynthesisAsyncButton.disabled = true;

        synthesizer.speakTextAsync(text,
            complete_cb,
            err_cb);
    }

});
