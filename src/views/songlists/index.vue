<template>
    <div class="margin-center">
        <va-grid-display
        ref="grid"
        :currentColumnNumber="'auto-fill'"
        :columnWidth="'270px'"
        :rowHeight="'80px'"
        :isRowCenter="true"
        :isColumnCenter="true"
        :isSpaceAround="true"
        :rowGap="'80px'"
        >
            <va-single-songList 
                :height="'198px'"
                :width="'198px'"
                v-for="item in arrlist.lists" 
                :key="item.id"
                :imageUrl="item.coverImgUrl"
                :playlistDescription="item.name"
                class="animate border"
                @click="getDetail_toDetail(item)"
            />           
        </va-grid-display>
        <div class="boxHeight"></div>
    </div>
</template>
<script>
import { useSongLists } from "../../stores/songlists"
import { onMounted, watch, reactive} from "vue"
import { useRouter} from "vue-router"
export default {
    name: "songlists",
    setup(){
        const songList =  useSongLists()
        onMounted(() => {
            songList.getItemlists_async()
        })
        let arrlist = reactive({lists:{}})
        watch(
            ()=>songList.Itemlists,
            (val)=> {
                arrlist.lists = JSON.parse(JSON.stringify(val.playlists))
                console.log(arrlist.lists)
            }
        )
        const router = useRouter()
        const getDetail_toDetail = (item) =>{
            // 添加当前被选中的歌单
            songList.addPlaylistHistory(item)
            router.push({
                name:"songDetail"
            })
        }
        return { 
            arrlist,
            getDetail_toDetail
        }
    }
}
</script>
<style scoped>
.margin-center{
    margin-top: 3vh;
}
.grid{
    display: grid;
    grid-template-columns: 25% 25% 25% 25%;
    grid-template-rows: 25vh 25vh 25vh;
    justify-items: center;
    align-items: center;
}
.animate{
    transform: translateY(0);
    transition: all 0.1s linear;
}
.animate:hover{
    transform: translateY(-20px);
}
.border{
    box-shadow: 1px 1px 8px white;
    color: white;
}
.boxHeight{
    width: 100%;
    height: 200px;
}
</style>