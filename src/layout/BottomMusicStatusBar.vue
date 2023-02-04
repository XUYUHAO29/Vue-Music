<template>
  <div id="bottom-bar">
    <audio
    ref="audio"
    src=""
    class="none-display"
    @canplay="loadingFn"
    @ended="playFn"
    />

    <div
      ref="progress"
      class="progress"
      @click="turnTo"

    >
      <div
        ref="currentTarget"
        class="currentTarget" 
      />
    </div>

    <div class="height-max width-max d-flex align-items-center justify-content-center imgBox">
      <img @click="looplay" ref="loop_play" src="../static/img/循环播放未开始.svg" alt="">
      <img @click="preSong" src="../static/img/上一首.svg" alt="">
      <img
        class="icon-play"
        ref="player"
        src="../static/img/播放.svg"
        alt=""
        @click="playIcon">
      <img @click="nextSong" src="../static/img/下一首.svg" alt="">
      <img
        ref="coverPreview" 
        src="../static/img/音乐.svg"
        class="cover-preview"
        @click="toLyric"
        alt="">
      <img src="../static/img/列表形式.svg" alt="">
    </div>
  </div>
</template>

<script>
import { defineComponent, getCurrentInstance, ref, watch } from "vue"
import { useSongLists } from "../stores/songlists"
import { useRouter } from "vue-router"
import bus from "../utils/evenBus"
// import { stom_time } from "../static/js/commom"
export default defineComponent({
  name: 'va-bottom-bar',
  setup() {
    const instance = getCurrentInstance()
    // const { proxy } = getCurrentInstance()
    const router = useRouter()
    const api = useSongLists()
    const flag = ref(true)
    let isReduce = false
    let duration
    const imgObj = {
      play: require("../static/img/播放.svg"),
      stop: require("../static/img/暂停.svg"),
      NoReduce: require("../static/img/循环播放未开始.svg"),
      Reduce: require("../static/img/循环播放.svg"),
    }
    // 音频操作
    const playIcon = () => {
      if(flag.value){
        instance.refs.player.setAttribute("src", imgObj["stop"])
        playRuning()
        progressPlay()
        flag.value = !flag.value
      } else {
        instance.refs.player.setAttribute("src", imgObj["play"])
        playPause()
        progressPause()
        flag.value = !flag.value
      }
    }

    const preSong = () =>{
      bus.$emit("preSong")
    }

    const nextSong = () =>{
      bus.$emit("nextSong")
    }
    const looplay = () =>{
      if(isReduce){
        instance.refs.loop_play.setAttribute("src", imgObj["NoReduce"])
        // instance.refs.audio.removeAttribute("loop","loop")
        isReduce = !isReduce
      } else {
        instance.refs.loop_play.setAttribute("src", imgObj["Reduce"])
        // instance.refs.audio.setAttribute("loop","loop")
        // instance.refs.currentTarget.style.setProperty("left", "calc("+0+"% - 5px)")
        // changeCurrent(0)
        isReduce = !isReduce
      }
    }
    const loadingFn = () => {
      flag.value ? playIcon() : playRuning()
      duration = instance.refs.audio.duration
      duration = Math.ceil(duration)
      showLength(duration)
      // duration = stom_time(duration)
      currentTargetAnimation()
    }
    const playFn = () => {
      if(isReduce){
        musicLoad(api.currentSong.data[0].url)
      } else {
        // playIcon()
        instance.refs.currentTarget.style.setProperty("left", "calc("+100+"% - 5px)")
        nextSong()
      }
    }
    function musicLoad(url){
      instance.refs.audio.setAttribute("src", url)
      currentLength = 0
    }
    watch(
      ()=>api.currentSongPic,
      (val)=>coverPreview(val.al.picUrl)
    )
    function coverPreview(picUrl){
      instance.refs.coverPreview.setAttribute("src", picUrl)
    }
    const toLyric = () => {
      router.push({
        path:"/songLyric"
      })
    }
    function playRuning(){
      instance.refs.audio.play()
    }
    function playPause(){
      instance.refs.audio.pause()
    }
    function changeCurrent(curtime){
      instance.refs.audio.currentTime = curtime
      console.log("changeCurrent")
    }
    watch(
      ()=>api.currentSong,
      (val)=>{
        musicLoad(val.data[0].url)
      }
    )

    // 进度条操作
    let stepWidth
    let currentLength = 0
    // let req
    let time = new Date().getTime()
    let changeTime = ref(0)
    let isProgressStop = ref(false)
    
    // 拖拽方法暂时有bug
    // window.addEventListener("mouseup", mouseUp)
    // function mouseDown(e) {
    //   window.addEventListener("mousemove",mouseMove)
    //   e.stopPropagation()
    // }

    // function mouseMove(e){
    //   e.stopPropagation()
    //   progressPause()
    //   let percentage = (e.clientX / window.innerWidth) * 100
    //   currentLength = percentage
    //   instance.refs.currentTarget.style.setProperty("left", "calc("+currentLength +"% - 5px)")
    // }

    // function mouseUp(e){
    //   window.removeEventListener("mousemove",mouseMove)
    //   e.stopPropagation()
    //   progressPlay()
    //   changeTime.value = confirmeTime()
    // }

    function turnTo(e){
      e.stopPropagation()
      let percentage = (e.clientX / window.innerWidth) * 100
      currentLength = percentage
      instance.refs.currentTarget.style.setProperty("left", "calc("+currentLength +"% - 5px)")
      changeTime.value =  confirmeTime()
      api.flag = !api.flag
    }

    function progressPause(){
      // if(req){
      //   cancelAnimationFrame(req)
      //   return
      // }
      isProgressStop.value =  true
    }

    function progressPlay(){
      isProgressStop.value =  false
      requestAnimationFrame(currentTargetAnimation)
    }

    function showLength(songtime){
      stepWidth = 100 / songtime
    }

    function confirmeTime(){
      let musicDate
      musicDate = Math.floor((currentLength / 100 ) * duration)
      return musicDate
    }

    function currentTargetAnimation(){
      if(currentLength >= 100){
        return
      }
      // let cur = 
      if(isProgressStop.value){
        return
      }
      if(new Date().getTime() - time >= 300){
        api.currentTime = instance.refs.audio.currentTime
      }
      if(new Date().getTime() - time >= 1000) {
        currentLength += stepWidth
        instance.refs.currentTarget.style.setProperty("left", "calc("+currentLength+"% - 5px)")
        time = new Date().getTime()
      }
      requestAnimationFrame(currentTargetAnimation)
    }
    watch(
      () => changeTime.value,
      (val)=>{
        changeCurrent(val)
      }
    )
    // function init(){

    // }
    // init()
    window.onkeydown = function(e){
      e.keyCode == 32 && playIcon()
    }
    return{
      playIcon,
      loadingFn,
      playFn,
      // mouseDown,
      turnTo,
      toLyric,
      preSong,
      nextSong,
      looplay,
    }
      
  }
})
</script>

<style scoped>
#bottom-bar{
  width: 100vw;
  height: 47.5px;
  background-color: #623162f5;
  z-index:10;
}
img{
  height: 70%;
  cursor: pointer;
}
.icon-play{
  margin-left: 40px;
  margin-right: 40px ;
}
.cover-preview{
  /* background-color: red; */
  height: 75%;
  width: 35.63px;
  position: absolute;
  left: 92.5%;
  border: 1px solid #d4237a;
  background-size: cover;
  background-repeat: no-repeat;
}
.imgBox{
  position: relative;
}
img:last-of-type{
  position: absolute;
  left: 97%;
}
.progress{
  position: absolute;
  height: 4px;
  top: -2px;
  width: 100%;
  background-color: rgb(64, 46, 104);
}
.progress:hover{
  height: 6px;
  top: -4px;
  cursor: pointer;
}
.currentTarget{
  position: absolute;
  cursor: pointer;
  height: 10px;
  width: 10px;
  top: calc(50% - 5px);
  left: calc(0% - 5px);
  border-radius:50% ;
  background-color: rgb(171, 36, 183);
  transition: left 0.2s linear;
}
</style>