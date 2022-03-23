const data = [
    {text: 'Hello! 😄'},
    {text: 'How\'s it going?'},
    {text: 'Cool.'},
    {text: 'Okay.'},
    {text: '👍'},
    {text: 'Kay, bye! 👋'}
];

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
            console.log(this.newMessage);
            var a = function (vm) {


                $.post("/",
                    {
                        animal: vm.newMessage,
                    },
                    function (data, status) {
                        if (data !== '') {
                            vm.resMessage = data;
                            vm.addNewResponse();

                            vm.isThinking = false;
                            // setTimeout(vm.addNewResponse(), 100);
                        }
                    });
                vm.newMessage="";
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
    const wrap = document.getElementById('wrapper');
    wrap.scrollTop = wrap.scrollHeight;
}


