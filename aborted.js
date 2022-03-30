var audio=document.getElementById('fang')
    var yin=document.getElementById('music')




    function interact(object) {
        console.log("dian dao le");
        yin.play()

        {#var blobUrl = URL.createObjectURL(new Blob(['Test'], {type: 'text/plain'}));#}
        {#var xhr = new XMLHttpRequest();#}
        {
            #//如果是指xhr.responseType = 'blob',将返回一个Blob对象，而不是文本；#}
            {
                #//xhr.responseType = 'blob';#}
                {
                    #xhr.onload = function () {
                        #
                    }
                    {
                        #    alert(xhr.responseText);
                        #
                    }
                    {
                        #
                    }
                    #
                }
                {
                    #xhr.open('get', blobUrl);
                    #
                }
                {
                    #xhr.send();
                    #
                }

                let contain = {
                    id: this.rseid,
                }

                let result = $.ajax({
                        method: 'GET',
                        url: "/mp3",
                        contentType: 'audio/wav',
                        success: function (res) {
                            console.log(res);
                            yin.src = URL.createObjectURL(new Blob([res]), this.contentType = 'audio/wav');
                            {
                                #yin.src = res
                                #
                            }
                            yin.load()
                            yin.play()


                        }
                    }
                )


                if (result.status == 200) {
                    console.log('jin lai le')
                    var audio = document.getElementById('music')
                    audio.src = URL.createObjectURL(result.data)
                    audio.load()
                    audio.play()

                }


            }
        }


