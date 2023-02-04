import { defineStore } from "pinia"
import api from "../utils/api_method"
export const useUser = defineStore("user",{
    state:()=>({
        // 用户轮廓
        userProfile:{},
        // 用户详情
        userDetail:"",
        // 账号信息
        userAccount:"",
        // 用户信息 , 歌单，收藏，mv, dj 数量
        userSubCount:"",
        // 用户等级
        userLevel:"",
        // 用户绑定信息
        userBind:"",
        // 获取用户歌单
        userPlaylist:""
    }),
    actions:{
        // 获取用户详情
        async getUserDetail_async(payload = {}){
            let response = await api.get("/user/detail", payload)
            this.userDetail = response.data
            return this.userDetail
        },
        // 获取用户账号信息
        async getUserAccount_async(payload = {}){
            let response = await api.get("/user/account", payload)
            this.userAccount = response.data
            return this.userAccount
        },
        // 用户信息 , 歌单，收藏，mv, dj 数量
        async getUserSubCount_async(payload = {}){
            let response = await api.get("/user/subcount", payload)
            this.userSubCount = response.data
            return this.userSubCount
        },
        // 获取用户等级信息
        async getUserLevel_async(payload = {}){
            let response = await api.get("/user/level", payload)
            this.userLevel = response.data
            return this.userLevel
        },
        // 获取用户绑定的信息
        async getUserBind_async(payload = {}){
            let response = await api.get("/user/binding", payload)
            this.userBind = response.data
            return this.userBind
        },
        // 获取用户歌单
        async getUserPlaylist_async(payload = {}){
            let response = await api.get("/user/playlist", payload)
            this.userPlaylist = response.data
            return this.userPlaylist
        }
    }
})