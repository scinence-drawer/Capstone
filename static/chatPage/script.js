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
// var voiceDictionary=[[3,4,7,8,10],[15,17,18],[6,13,14,16,19,20],[1,2,9,11,21],[5,12],[0]];
//0:BiZui
//1:DuZui
//2:AlmostBiZui
//3:BanZhang
//4:QuanZhang
//5:ZhengChang_BanZhang
var voiceDictionary = {
    3: "1",
    4: "1",
    7: "1",
    8: "1",
    10: "1",
    15: "2",
    17: "2",
    18: "2",
    6: "3",
    13: "3",
    14: "3",
    16: "3",
    19: "3",
    20: "3",
    1: "4",
    2: "4",
    9: "4",
    11: "4",
    21: "4",
    5: "5",
    12: "5",
    0: "0"
};


// Initialize(async function (speechSdk) {
//         SpeechSDK = speechSdk;
//         // startSynthesisAsyncButton.disabled = false;
//         Object.keys(SpeechSDK.SpeechSynthesisOutputFormat).forEach(format => {
//                 if (isNaN(format) && !format.includes('Siren')) {
//                     // formatOptions.innerHTML += "<option value=\"" + SpeechSDK.SpeechSynthesisOutputFormat[format] + "\">" + format + "</option>"
//                 }
//             }
//         );
//
//         // in case we have a function for getting an authorization token, call it.
//         if (typeof RequestAuthorizationToken === "function") {
//             await RequestAuthorizationToken();
//         }
//
//     });


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

startSynthesisAsyncButton = document.getElementById("fang");
updateVoiceListButton = document.getElementById("fang");
pauseButton = document.getElementById("pauseButton");

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
    // alert('comple');
    SpeechSDK = speechSdk;
    // startSynthesisAsyncButton.disabled = false;

    // speakText("Hello,How's it going?");

    console.debug('醒目！');
    // alert('醒目');
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

speechConfig = SpeechSDK.SpeechConfig.fromSubscription("66e477bdd562461d81b2308d43603c8c", "eastasia");
//speechConfig = SpeechSDK.SpeechConfig.fromSubscription("66e477bdd562461d81b2308d43603c8c", "eastasia");

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
            // console.log(xhr)
            // console.log(xhr.response)
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
            // console.log(xhr)
            // console.log(xhr.response)
            speakText(xhr.response)
        }
    }

}


function speakText(text) {
    player = new SpeechSDK.SpeakerAudioDestination();
    player.onAudioStart = function (_) {
        start = new Date().getTime();
        window.console.log("playback started " + new Date().getTime());
        console.log(transferToUnity);
        // myUnityInstance.SendMessage("EventSystem", "WebTest", transferToUnity);
        transferToUnity = "";
        setTimeout(function () {
            $("svg path :first-child").each(function (i) {
                this.beginElement();
            });
        }, 0.5);
    }
    player.onAudioEnd = function (_) {
        window.console.log("playback finished " + new Date().getTime());
        console.log(new Date().getTime() - start)
        // startSynthesisAsyncButton.disabled = false;
        wordBoundaryList = [];

        // fetchText();
    };

    var audioConfig = SpeechSDK.AudioConfig.fromSpeakerOutput(player);

    synthesizer = new SpeechSDK.SpeechSynthesizer(speechConfig, audioConfig);

    // The event synthesizing signals that a synthesized audio chunk is received.
    // You will receive one or more synthesizing events as a speech phrase is synthesized.
    // You can use this callback to streaming receive the synthesized audio.
    synthesizer.synthesizing = function (s, e) {

        // window.console.log(e);
    };

    // The synthesis started event signals that the synthesis is started.
    synthesizer.synthesisStarted = function (s, e) {
        // console.log("syn start")
        // window.console.log(e);
    };

    // The event synthesis completed signals that the synthesis is completed.
    synthesizer.synthesisCompleted = function (s, e) {
        // console.log(e);
        // " Audio length: " + e.result.audioData.byteLength + "\r\n";
    };

    // The event signals that the service has stopped processing speech.
    // This can happen when an error is encountered.
    synthesizer.SynthesisCanceled = function (s, e) {
        const cancellationDetails = SpeechSDK.CancellationDetails.fromResult(e.result);
        let str = "(cancel) Reason: " + SpeechSDK.CancellationReason[cancellationDetails.reason];
        if (cancellationDetails.reason === SpeechSDK.CancellationReason.Error) {
            str += ": " + e.result.errorDetails;
        }
        // window.console.log(e);
        //eventsDiv.innerHTML += str + "\r\n";
        // startSynthesisAsyncButton.disabled = false;
        downloadButton.disabled = false;
        pauseButton.disabled = true;
        resumeButton.disabled = true;
    };

    // This event signals that word boundary is received. This indicates the audio boundary of each word.
    // The unit of e.audioOffset is tick (1 tick = 100 nanoseconds), divide by 10,000 to convert to milliseconds.
    synthesizer.wordBoundary = function (s, e) {

        // window.console.log(e);
        wordBoundaryList.push(e);
    };

    synthesizer.visemeReceived = function (s, e) {
        // window.console.log(e);
        // console.log(e.privAudioOffset);
        // var real_id = 0
        transferToUnity += voiceDictionary[e.privVisemeId] + " " + String(e.privAudioOffset) + " ";
        myUnityInstance.SendMessage("EventSystem", "WebTest", "" + voiceDictionary[e.privVisemeId] + " " + String(e.privAudioOffset));
        //eventsDiv.innerHTML += "(Viseme), Audio offset: " + e.audioOffset / 10000 + "ms. Viseme ID: " + e.visemeId + '\n';
        talkingHeadDiv.innerHTML = e.animation.replaceAll("begin=\"0.5s\"", "begin=\"indefinite\"");
        $("svg").width('500px').height('500px');
    }

    synthesizer.bookmarkReached = function (s, e) {
        // window.console.log(e);
    }

    // startSynthesisAsyncButton.disabled = true;

    synthesizer.speakTextAsync(text,
        complete_cb,
        err_cb);
}


const data = [
    {text: 'Hello! 😄'},
    {text: 'How\'s it going?'},
    {text: 'Cool.'},
    {text: 'Okay.'},
    {text: '👍'},
    {text: 'Kay, bye! 👋'}
];

// new_element=document.createElement("script");
// new_element.setAttribute("type","text/javascript");
// new_element.setAttribute("src","../");// 在这里引入了a.js
// document.body.appendChild(new_element);


Vue.component('bubble', {
    props: ['bubbtext'],
    template: `<div class="bubble">{{bubbtext}}</div>`
})

var res_message = "";
var vm = new Vue({
    el: '#app',
    data: {
        noResponses: false,
        isTyping: false,
        isThinking: false,
        newMessage: '',
        resMessage: "",
        contents: [],

    },
    watch: {
        isThinking: function () {
            if (this.isThinking) {
                setTimeout(moveChat, 100);
            }
        }
    },

    methods: {
        addToChat: function () {

            this.contents.push({text: this.newMessage, isUser: true});
            this.isThinking = true;
            // console.log(this.newMessage);
            var a = function (vm) {


                $.post("/",
                    {
                        animal: vm.newMessage,
                    },
                    function (data, status) {
                        if (data !== '') {
                            vm.resMessage = data;
                            // console.log(data);
                            speakText(data);
                            vm.addNewResponse();

                            vm.isThinking = false;
                            // setTimeout(vm.addNewResponse(), 100);
                        }
                    });
                vm.newMessage = "";
            }
            a(this);


        },
        addNewResponse: function () {
            // this.contents.push(this.resMessage);
            this.contents.push({text: this.resMessage});

        }
    }
})

vm.contents.push(data[0]);
vm.contents.push(data[1]);

function moveChat() {
    const wrap = document.getElementById('chat-wrapper');
    wrap.scrollTop = wrap.scrollHeight;
}


// setTimeout(function (){alert('一眼丁真')},5000);
setTimeout(function () {
    speakText("Hello,How's it going?")
}, 6000);

