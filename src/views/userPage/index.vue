<template>
    <div class="content">
        <div class="headerPicture" ref="headerPicture">

        </div>
        <div class="userPlayLists">
            <!-- 用户创建的歌单 -->
            <div class="userPlayLists-title">我的创建歌单</div>
            <va-grid-display
            ref="grid"
            :currentColumnNumber="'auto-fill'"
            :columnWidth="'270px'"
            :rowHeight="'80px'"
            :isRowCenter="true"
            :isColumnCenter="true"
            :isSpaceAround="true"
            :rowGap="'80px'"
            class="grid-background"
            >
            <!-- 写入用户创建的歌单 -->
            <va-single-songList 
                v-for="item in state.Create_playlists"
                :key="item.userId"
                :imageUrl="item.coverImgUrl"
                :playlistDescription="item.name"
                :height="'150px'"
                :width="'150px'"
                @click="getDetail_toDetail(item)"
            />           
            </va-grid-display>

            <!-- 写入用户收藏的歌单 -->
            <div class="userPlayLists-title">收藏歌单</div>
            <va-grid-display
            ref="grid"
            :currentColumnNumber="'auto-fill'"
            :columnWidth="'270px'"
            :rowHeight="'80px'"
            :isRowCenter="true"
            :isColumnCenter="true"
            :isSpaceAround="true"
            :rowGap="'80px'"
            class="grid-background"
            >
            <!-- 写入用户收藏的歌单 -->
            <va-single-songList 
                v-for="item in state.Bookmark_playlists"
                :key="item.userId"
                :imageUrl="item.coverImgUrl"
                :playlistDescription="item.name"
                :height="'150px'"
                :width="'150px'"
                @click="getDetail_toDetail(item)"
            />  
            <div class="boxHeight"></div>    
            </va-grid-display>
        </div>
    </div>
</template>
<script>
import { defineComponent, getCurrentInstance, onMounted, watch, reactive} from 'vue';
import { useUser } from "../../stores/user"
import { useLogIn } from '../../stores/LogIn';
import { useRouter } from 'vue-router';
import { useSongLists } from '../../stores/songlists';
// import bus  from "../../utils/evenBus"
export default defineComponent({
    name:"userpage",
    setup(){
        const instance = getCurrentInstance()
        let user = useUser()
        const login = useLogIn()
        const router = useRouter()
        const songList = useSongLists()
        const state = reactive({
            avatarUrl:"",
            Create_playlists:[],
            Bookmark_playlists:[]
        })
        watch(
            ()=>login.status,
            (val)=>{
                user.userProfile = JSON.parse(JSON.stringify(val))
            }
        )
        async function initData(){
            const account = await user.getUserAccount_async()
            const bind = await user.getUserBind_async({
                uid: account.account.id
            })
            const level = await user.getUserLevel_async()
            const detail = await user.getUserDetail_async({
                uid: account.account.id
            })
            const playlist = await user.getUserPlaylist_async({
                uid: account.account.id
            })
            const subcount = await user.getUserSubCount_async()

            // 填充头像
            state.avatarUrl = account.profile.avatarUrl
            instance.refs["headerPicture"].style.backgroundImage = `url(${state.avatarUrl})`

            //划分歌单类型
            playlist.playlist.forEach(pl => {
                pl.userId == account.account.id ? state.Create_playlists.push(pl) : state.Bookmark_playlists.push(pl)
            });
            document.querySelectorAll(".userPlayLists-title").forEach(el => el.style.display = "block")
            document.querySelector(".boxHeight").style.display = "block"
           
            console.log({
                account,
                bind,
                level,
                detail,
                playlist,
                subcount
            })
        }

        // 点击歌单跳转至歌单详细
        const getDetail_toDetail = (item) =>{
            // 添加当前被选中的歌单
            songList.addPlaylistHistory(item)
            router.push({
                name:"songDetail"
            })
        }
        onMounted(()=>{
            console.log(instance)
            initData()
        })
        return{
            state,
            getDetail_toDetail
        }
    }
})
</script>
<style scoped>
.content{
    --nickname:"伞下云中";
    --level:"等级:8"
}
.headerPicture{
    position:absolute;
    background-image: url("../../static/img/默认头像.svg");
    background-repeat: no-repeat;
    background-size: cover;
    width: 210px;
    height: 210px;
    cursor: pointer;
    border-radius: 50%;
    border: 1px solid white;
    top: calc(50% - 105px);
    left: 20px;
}
.headerPicture::after{
    content: var(--nickname);
    position: absolute;
    top: calc(100% + 5px);
    width: 100%;
    color: beige;
    font-size: 25px;
    text-align: center;
}
.headerPicture::before{
    content: var(--level);
    position: absolute;
    width: 100%;
    top: calc(0% - 35px);
    color: beige;
    font-size: 25px;
    text-align: center;
}
.headerPicture:hover{
    box-shadow: inset 210px 210px rgba(0, 0, 0, 0.5);
}
.userPlayLists{
    position: absolute;
    width: 82%;
    height: 83%;
    /* background-color: red; */
    top: 75px;
    left: 240px;
    overflow-x: hidden;
    border-radius: 20px;
    text-align: center;
}
.userPlayLists-title{
    width: 100%;
    text-align: center;
    padding: 50px 0;
    background-color: beige;
    font-size: 30px;
    display: none;
}
.grid-background{
    background-color: beige;
}
.boxHeight{
    width: 100%;
    height: 250px;
    display: none;
}
.userPlayLists::-webkit-scrollbar,.description::-webkit-scrollbar{
        /* display: none; */
    background-color: transparent;
    width: 5px;
}
.userPlayLists::-webkit-scrollbar-thumb,.description::-webkit-scrollbar-thumb{
    background-color: rgb(148, 148, 110);
    border-radius: 25px;
}
</style>