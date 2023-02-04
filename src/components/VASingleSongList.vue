<template>
  <div ref="va_single_songlist" id="VASingleSongList" class="content">
    <div class="imageContent">
      <img ref="img" src=" " alt="" />
    </div>
    <div class="textConent">
      <span style="display: block">{{ playlistDescription }}</span>
    </div>
  </div>
</template>

<script>
import { getCurrentInstance, onMounted, watch } from "vue";
// import {  } from "vue-router"
export default {
  name: "va-single-songList",
  props: {
    imageUrl: {
      type: String,
      default: "Winner.jpg",
    },
    playlistDescription: {
      type: String,
      default: "该歌单还没有添加描述哦",
    },
    height: {
      type: String,
      default: "",
    },
    width: {
      type: String,
      default: "",
    },
    textColor:{
      type: String,
      default: "black"
    }
  },
  setup(props) {
    watch(
      ()=>props.imageUrl,
      ()=>instance.refs.img.setAttribute("src", props.imageUrl)
    )
    // 获取该组件实例
    const instance = getCurrentInstance();
    // 处理图片链接
    const ImageSize = (height, width) => {
      if (height !== "") {
        instance.refs.va_single_songlist.style.setProperty(
          "--defaultHeight",
          height
        );
      }
      if (width !== "") {
        instance.refs.va_single_songlist.style.setProperty(
          "--defaultWidth",
          width
        );
      }
    };

    onMounted(() => {
      ImageSize(props.height, props.width);
      instance.refs.img.setAttribute("src", props.imageUrl)
    });
    // return {
    //   toRouter
    // };
  },
};
</script>

<style scoped>
#VASingleSongList {
  --defaultHeight: 10vh;
  --defaultWidth: 10vh;
}
.content {
  height: var(--defaultHeight);
  width: var(--defaultWidth);
}
.imageContent {
  height: 100%;
  width: 100%;
  /* background-color: red; */
  overflow: hidden;
  cursor: pointer;
}
img{
  height: 100%;
  width: 100%;
  background-repeat: no-repeat;
  background-size: cover;
}
.textConent {
  width: 100%;
  font-size: 15px;
  margin-top: 5px;
  white-space: pre-wrap;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  overflow: hidden;
  -webkit-box-orient: vertical;
}
.textConent:hover {
  color: #409EFF;
  cursor: pointer;
}
</style>