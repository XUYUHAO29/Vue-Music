<template>
  <div id="top-bar">
    <div class="top-bar-items d-flex justify-content-between">
      <div class="leftItem d-flex">
        <div
          v-for="item in state.itemLists.leftLists"
          :key="item.itemId"
          :ref="item.itemId"
          @click.stop="routerTo(item)"
        >
          <span> {{ item.itemName }}</span>
        </div>
      </div>
      <div class="rightItem d-flex">
        <div
          v-for="item in state.itemLists.rightLists"
          :key="item.itemId"
          :ref="item.itemId"
          @click.stop="routerTo(item)"
        >
          {{ item.itemName }}
        </div>
        <div>
          <div class="userHeader-imgs" ref="userHeader_imgs"  @click.stop="routerTo({router_name:'userPage'})" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, onMounted , watch, reactive, getCurrentInstance} from "vue";
import { useTopItemLists } from "../stores/topItems";
import { useRouter } from "vue-router";
import bus from "../utils/evenBus"
export default defineComponent({
  name: "va-top-bar",
  setup() {
    let state = reactive({
      itemLists:{}
    })
    const instance = getCurrentInstance()
    const TopItems = useTopItemLists()
    onMounted(() => {
      initData()
    })
    const initData=()=>{
      TopItems.getTopItemlists()
    }
    watch(()=>TopItems.getterTopItemlists,(val)=>{
      state.itemLists = Object.assign({},val)
    })
    const router = useRouter();
    // top栏上一个被点击的DOM节点
    let preNode
    const routerTo = (item) => {
      if(item.itemId){
        preNode ? instance.refs[preNode][0].style.backgroundColor = "#623162f5" : 0
        instance.refs[item.itemId][0].style.backgroundColor = "rgb(131, 57, 122)"
        preNode = item.itemId
      }
      router.push({
        name: item.router_name
      });
    };

    bus.$on("showHeader",(url)=>{
      instance.refs["userHeader_imgs"].style.backgroundImage = `url(${url})`
    })
    return {
      state,
      routerTo,
    };
  },
});
</script>

<style scoped>
#top-bar {
  width: 100vw;
  height: 63px;
  background-color: #623162f5;
  font-size: 1vw;
  /* position: absolute; */
}
.leftItem,
.rightItem {
  line-height: calc(63px - 0px);
  margin: 0 20px;
  /* border: 1px solid black; */
}
.leftItem > div,
.rightItem > div {
  cursor: pointer;
  /* border: 1px solid black; */
  color: wheat;
  padding: 0 20px;
}
.leftItem > div:hover,
.rightItem > div:hover {
  color:white;
  background-color: rgb(131, 57, 122);

}
.rightItem > div:last-of-type:hover{
  cursor: initial;
  background-color: transparent;
}
.userHeader-imgs{
  width: 30px;  
  height: 30px;
  position: absolute;
  border-radius: 50%;
  top: calc(50% - 15px);
  right: 14px;
  cursor: pointer;
  background-color: rgb(131, 57, 122);
  background: url("../static/img/默认头像.svg");
  background-repeat: no-repeat;
  background-size: contain;
  border: 1px solid white;
}
</style>

