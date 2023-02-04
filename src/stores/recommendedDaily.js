import { defineStore } from "pinia";
import api from "../utils/api_method"
export const useRecommendedDaily = defineStore("recommendedDaily",{
    // 每日推荐歌曲
    state:()=>({
        recommendedDaily:{}
    }),
    actions:{
        async getRecommendedDaily_async(payload = {}){
            let response
            response = await api.get("/recommend/songs", payload)
            this.recommendedDaily = response.data.data
        }
    }
})