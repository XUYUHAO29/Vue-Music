<template>
  <div ref="lyric" class="lyric">
    <img ref="background" class="background" src="" alt="">
    <div class="blur-layers"></div>
    <filp-animation 
        :frontImg="picObj.frontImg"
        class="filp-animation"
    />
    <scroll-lyrics
        class="scroll-lyrics"
    />
  </div>
</template>

<script>
import { defineComponent, watch, onMounted, getCurrentInstance, reactive} from "vue"
import { useSongLists } from "../../stores/songlists"
import filpAnimation from "./_flipAnimation.vue"
import scrollLyrics from "./_scrollLyrics.vue"
export default defineComponent({
    name:"songlyric",
    components:{
        "filp-animation":filpAnimation,
        "scroll-lyrics":scrollLyrics
    },
    setup(){
        const api = useSongLists()
        const instance = getCurrentInstance()
        const picObj = reactive({
            frontImg: api.currentSongPic.al.picUrl
        })
        // let behindImg
        // 监听到当前歌曲改变，更新背景图片
        watch(
            ()=>api.currentSong,
            (news)=>{
                initData()
                picObj.frontImg = api.currentSongPic.al.picUrl
                console.log(news)
            }
        )
        onMounted(()=>{
            initData()
        })
        function initData(){
            setBackgroud()
        }
        function setBackgroud(){
            instance.refs.lyric.style.setProperty("--height", "calc("+window.innerHeight+"px - 110.5px)")
            instance.refs.background.setAttribute("src", api.currentSongPic.al.picUrl)
        }
        return{
            picObj
        }
    }
})
</script>

<style scoped>
    .lyric{
        --height:900px;
        position: relative;
        width: 100%;
        height: var(--height);
        z-index: 3;
    }
    .filp-animation{
        width: 400px;
        height: 400px;
        position: relative;
        cursor: pointer;
        /* transform-style: preserve-3d; */
        /* perspective: 1000px */
        border-radius: 20%;
        left: 5%;
        top: 10%;
        animation: constant-speed 40s linear 0s infinite;
    }
    .scroll-lyrics{
        position: absolute;
        left: 42%;
        top: 10%;
        font-size: 25px;
        width: 750px;
        height: 500px;
        color:#fff;
        overflow-x: hidden;
        text-align: center;
    }
    .scroll-lyrics::-webkit-scrollbar{
        /* display: none; */
        background-color: transparent;
        width: 5px;
    }
    .scroll-lyrics::-webkit-scrollbar-thumb{
        background-color: rgb(203, 89, 176);
        border-radius: 10px;
    }
    .content{
        width: 100%;
        height: 100%;
        position: relative;
        top: 0;
        left: 0%;
    }
    .background{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-repeat: no-repeat;
        background-size: cover;
    }
    .blur-layers{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        /* background-color: #fff; */
        backdrop-filter: blur(100px);
    }
    .back{
        position: absolute;
        top: 93%;
        left: 1.5%;
    }
    @keyframes constant-speed{
        0%{
            transform: rotate(0);
        }
        100%{
            transform: rotate(1turn);
        }
    }
</style>