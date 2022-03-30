from pydub import AudioSegment
import matplotlib.pyplot as plt # plt 用于显示图片
import matplotlib.image as mpimg # mpimg 用于读取图片
import numpy as np
import librosa as lr
import librosa.display
import time
def list_split(items, n):
    return [items[i:i+n] for i in range(0, len(items), n)]

FILENAME = './static/sound-test/finally.wav'
# x, sr = lr.load(FILENAME)
# plt.figure(figsize = (14,5))
#
# librosa.display.waveshow(x, sr = sr)
# plt.show()




close = mpimg.imread('./static/pic/0.png')
half_open = mpimg.imread('./static/pic/1.png')
full_open = mpimg.imread('./static/pic/2.png')

shape_dict={
    0:close,
    1:half_open,
    2:full_open,
}
#
#
song = AudioSegment.from_wav("./static/sound-test/finally.wav")
sounds = list_split(song,100)

loudness = song.rms
divisions = {
    0:loudness*1/3,
    1:loudness*2/3,
}
print(loudness)
for i in range(len(sounds)):
    # print(sounds[i].dBFS)
    if sounds[i].rms >= divisions[1]:
        plt.imshow(shape_dict[2])
    elif sounds[i].rms <= divisions[0]:
        plt.imshow(shape_dict[0])
    else:
        plt.imshow(shape_dict[1])
    plt.axis('off')  # 不显示坐标轴
    plt.show()
    time.sleep(0.1)
