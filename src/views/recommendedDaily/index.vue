<template>
    <div class="title margin-center mt-30">
        <span>每日推荐歌曲</span>
    </div>
    <div class="tableContent margin-center mt-30">
        <div class="table">
            <div ref="tbody" class="tbody">
                <div class="tr table-thead-fix">
                    <div class="th">歌曲名</div>
                    <div class="th">歌手</div>
                    <div class="th">出自专辑</div>
                </div>
                <div 
                    class="tr heightColor" 
                    v-for="(item,index) in state.singleListDetail" 
                    :key="item.id"
                    @click="playmusic(item, index+1)"
                >
                    <div class="td">{{ item.name }}</div>
                    <div class="td">{{ item.ar[0].name }}</div>
                    <div class="td">{{ item.al.name }}</div>
                </div>          
            </div>
        </div>
    </div>
    <!-- <div class="boxHeight"></div> -->
</template>
<script>
import { defineComponent, onMounted, watch, reactive, getCurrentInstance, onActivated } from 'vue';
import { useRecommendedDaily } from "../../stores/recommendedDaily"
import { useSongLists } from "../../stores/songlists"
import bus from "../../utils/evenBus"
export default defineComponent({
    name:"recommendedDaily",
    setup(){
        const api = useRecommendedDaily()
        const songlist = useSongLists()
        const instance = getCurrentInstance()
        let curIndex
        let { getRecommendedDaily_async }  = api
        let state = reactive({
            singleListDetail:api.dailySongs
            // playlistDetail:api.currentPlaylist
        })
        onMounted(()=>{
            getRecommendedDaily_async()
        })
        onActivated(()=>{
            getRecommendedDaily_async()
        })
        watch(
            ()=>api.recommendedDaily,
            (val)=>{
                state.singleListDetail = val.dailySongs
            }
        )
        bus.$on("nextSong",()=>{
            let item = state.singleListDetail[curIndex+1]
            playmusic(item, curIndex + 2)  
            console.log("nextSong---------------")
        })
        bus.$on("preSong",()=>{
            let item = state.singleListDetail[curIndex-1]
            playmusic(item, curIndex)  
            console.log("preSong---------------")
        })
        function playmusic(item, index){
            curIndex = index - 1
            songlist.checkMusic({id:item.id}).then(response => {
                if(response.success){
                    let songUrl = songlist.getSongUrl({id:item.id})
                    songlist.currentSongPic = JSON.parse(JSON.stringify(item))
                    let songLyric = songlist.getLyric({id:item.id})
                    songlist.historySongs.push({
                        songUrl:songUrl,
                        songPic:songlist.currentSongPic,
                        songLyric:songLyric
                    })
                    console.log(songlist.historySongs)
                }
                isSelected(index)
            })
        }
        let preNode = 0
        function isSelected(index){
            instance.refs.tbody.children[preNode].classList.remove("isSelected")
            instance.refs.tbody.children[index].classList.add("isSelected")
            preNode = index
        }
        return{
            playmusic,
            state
        }

    }
})
</script>
<style scoped>
    .title{
        font-size: 25px;
        color: wheat;
        text-align: center;
    }
    .tableContent{
        color: #fff;
        backdrop-filter: blur(10px);
        width: 80%;
        height: 500px;
        overflow-x:hidden;
        text-indent: 8px;
    }
    .heightColor:hover{
        color: aqua;
        cursor: pointer;
    }
    .table{
        width: 100%;
        height: 500px;
        margin: 0 auto;
        overflow-x: hidden;
        background-color:transparent;
        backdrop-filter: blur(10px);
        /* border: 1px solid white; */
    }
    .tbody{
        width: 100%;
        text-align: left;
        position: relative;
        z-index: 2;
    }
    .tr{
        display: flex;
        flex-direction: row;
        width: 100%;
        height: 50px;
        color: #fff;
    }
    .th{
        font-size: 24px;
        font-weight: 500;
        /* cursor:pointer; */
    }
    .tr > div{
        width: 33.3%;
        flex-shrink: 0;
        border-bottom:1px solid white ;
        display: flex;
        align-items: center;
    }
    .table-thead-fix{
        position: sticky;
        top: 0;
        z-index: 99;
        background-color: rgb(136 89 203);
    }
    .isSelected{
        color: aqua;
        background-color: rgb(132 43 226 / 30%);
    }
    .table::-webkit-scrollbar,.description::-webkit-scrollbar{
        /* display: none; */
        background-color: transparent;
        width: 10px;
    }
    .table::-webkit-scrollbar-thumb,.description::-webkit-scrollbar-thumb{
        background-color: rgb(203, 89, 176);
        border-radius: 25px;
    }
    .back{
        margin-top: 15px;
        margin-left: 15px;
    }
    /* .boxHeight{
        width: 100%;
        height: 200px;
    } */
</style>