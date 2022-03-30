<script>
    function interact(object) {

        var audioEle = document.getElementById("music");
        var xhr = new XMLHttpRequest();
        xhr.open("get", "/mp3", true)
        // xhr.responseType="blob"
        xhr.responseType = "arraybuffer"
        xhr.send(null)
        var kfc;
        var arr = [];
        xhr.onload = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                // 4 = "loaded" && 200 =  ok
                console.log(xhr)
                // console.log(xhr.response)  //不加
                // responseType="arraybuffer"
                // 或者blob，会很卡，一大堆乱码
                arr.push(xhr.response)
                console.log(arr)
                // var blob=new Blob([xhr.response])
                var blob = new Blob(arr)
                console.log(blob)
                kfc = window.URL.createObjectURL(blob)
                console.log(kfc)
                audioEle.src = kfc
                {#audioEle.load()#}
                audioEle.play()
            }
        }
    }


</script>


// 368  subscriptionKey.value: "4ab06069885845d395d69e85ddd51cba"
// 368  regionOptions.value: "westus"
// 371  voiceOptions.value : "Microsoft Server Speech Text to Speech Voice (en-US, AmberNeural)"
// 372  formatOptions.value: "8"


