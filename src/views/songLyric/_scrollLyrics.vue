<template>
  <div ref="lyrics" class="lyrics">
      <div v-for="(item, index) in state.lyricList" :key="index">
          {{ item }}
      </div>
  </div>
</template>

<script>
import { defineComponent, watch, getCurrentInstance, reactive} from "vue"
import { useSongLists } from "../../stores/songlists"
export default defineComponent({
    name:"scrollLyrics",
    setup(){
        const api  = useSongLists()
        const instance = getCurrentInstance()
        let lyric = api.currentLyric.lrc.lyric
        let deviation = 0
        const state = reactive({
            timeList:[],
            lyricList:[]
        })
        let curIndex = 0,preIndex
        watch(
            ()=>api.currentTime,
            (val)=>{
                handlerScroll(val)
            }
        )
        // 监听到当前歌曲改变，更新歌词
        watch(
            ()=>api.currentSong,
            ()=>{
                reset()
                // return
                handlerlyric(api.currentLyric.lrc.lyric)
            }
        )
        function handlerlyric(lyric){
            let lyricArray = lyric.split("\n")
            for(let index in lyricArray){
                let leftIndex, rightIndex, time, lyric
                leftIndex = lyricArray[index].indexOf("[")
                rightIndex = lyricArray[index].indexOf("]")

                time = lyricArray[index].substring(leftIndex+1, rightIndex)
                lyric = lyricArray[index].substring(lyricArray[index].lastIndexOf("]")+1, lyricArray[index].length)

                if(time.length > 0) {
                    let arr = time.split(":"),
                        second
                    arr[0] = parseInt(arr[0]) * 60
                    arr[1] = parseFloat(arr[1])
                    second = parseFloat((arr[0] + arr[1]).toFixed(3))

                    state.timeList.push(second)
                    
                    lyric == "" ? state.lyricList.push("--") : state.lyricList.push(lyric)
                    // console.log(timeList[index]+"-----"+lyricList[index])
                }
            }
        }
        watch(
            ()=>api.flag,
            ()=>progressChangeScroll(api.currentTime)
        )
        function handlerScroll(currentTime){
            let cur
            let sum
            cur = parseFloat(currentTime.toFixed(3))
            if(cur > state.timeList[curIndex]){
                // 计算偏差值
                deviation += instance.refs.lyrics.children[curIndex].offsetHeight - 60
                sum = (curIndex - 4)*60 + deviation
                instance.refs.lyrics.scrollTo({
                    top: curIndex > 4 ? sum : 0,
                    behavior: 'smooth'
                })
                curIndex > 0 && curIndex < state.timeList.length-1 ? instance.refs.lyrics.children[curIndex-1].classList.remove("highlight") : 0
                instance.refs.lyrics.children[curIndex].classList.add("highlight")
                curIndex++
            }
        }
        function progressChangeScroll(currentTime){
            for(let index in state.timeList){
                if(state.timeList[index]< currentTime && currentTime < state.timeList[index + 1]){
                    preIndex = curIndex-1
                    curIndex = index
                    instance.refs.lyrics.children[preIndex].classList.remove("highlight")
                }
            }
        }
        function reset(){
            state.timeList = [] 
            state.lyricList = []
            api.currentTime = 0
            preIndex = curIndex-1
            curIndex = 0
            instance.refs.lyrics.children[preIndex].classList.remove("highlight")
        }
        handlerlyric(lyric)
        return{
            state
        }
    }
})
</script>

<style scoped>
.lyrics{
    z-index: 4;
    /* margin-top:-120px; */
}
.lyrics > div{
    line-height: 60px;
    border:inset 1px solid aqua;
    /* margin-top:-20px; */
}
.highlight{
    color: aqua;
}
</style>