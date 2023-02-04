import { defineStore } from "pinia";
import api from "@/utils/api_method";
export const useSongLists = defineStore("songlists", {
  state: () => ({
    Itemlists: {},
    singleListDetail:{},
    playlistHistory:[],
    currentPlaylist:{},
    // 当前歌曲的url
    currentSong:{},
    // 当前歌曲的其他信息
    currentSongPic:{},
    historySongs:[],
    // 歌词
    currentLyric:{},
    // 当前歌曲事件
    currentTime:0,
    // 每次用户手动改变歌曲进度时更改标志位
    flag:false
  }),
  getters: {
    getterItemlists(state){
      return state.Itemlists
    }
  },
  actions: {
    // 获取精品歌单
    async getItemlists_async(payload = {}) {
      let response;
      response = await api.get("/top/playlist/highquality", payload);
      this.Itemlists = response.data;
      // console.log(this.Itemlists)
    },
    // 获取歌单详细歌曲
    async getDetail_async(payload = {}){
      let response;
      response = await api.get("/playlist/track/all", payload);
      this.singleListDetail = response.data;
      console.log(response.data)
    },
    // 添加被选中的历史歌单
    addPlaylistHistory(payload = {}){
      this.playlistHistory.push(payload)
      this.currentPlaylist = payload
    },
    // 获取当前音乐url
    async getSongUrl(payload = {}){
      let response = await api.get("/song/url", payload)
      this.currentSong = response.data
      // this.historySongs.push({
      //   Song:this.currentSong,
      //   SongPic:payload
      // })
      console.log(this.currentSong)
      return response.data
    },
    async checkMusic(payload = {}){
      let response = await api.get("/check/music", payload).catch(() => alert("111"))
      return response.data
    },
    async getLyric(payload = {}){
      let response
      response = await api.get("/lyric", payload)
      this.currentLyric = response.data
      return response.data
    }
    
  }
});
