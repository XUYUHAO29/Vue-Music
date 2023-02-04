import { defineStore } from "pinia";
import api from "@/utils/api_method";
// import { pa } from "element-plus/es/locale";
export const useLogIn = defineStore("login", {
    state: () => ({
        Cookie:"",
        // 登陆状态
        status:{},
        QRKEY:"",
        QRMESSAGE:{},
        QRSTATUSRES:{}
    }),
    getters: {
    },
    actions: {
      // 匿名登录
      async LogInAnonimous_async(payload = {}) {
        let response;
        response = await api.get("/register/anonimous", payload);
        this.Cookie = response.data
      },
      // 获取登陆状态
      async LogStatus_async(payload = {}){
        let response
        response = await api.get("/login/status", payload)
        this.status = response.data
      },
      // 退出登录
      // async LogOut_async(payload = {}){
      //   let response
      //   response = await api.get("/logout", payload)
      //   return response
      // }

      // 获取二维码key
      async LogQRkey_async(payload = {}){
        let response
        response = await api.get("/login/qr/key", payload)
        this.QRKEY = response.data
        return this.QRKEY
      },
      // 创建二维码生成接口
      async LogQRCreate_async(payload = {}){
        let response
        response = await api.get("/login/qr/create", payload)
        this.QRMESSAGE = response.data
        return this.QRMESSAGE
      },
      // 检查二维码状态
      async LogQRCheckStatus(payload = {}){
        let response
        response = await api.get("/login/qr/check", payload)
        this.QRSTATUSRES = response.data
        return this.QRSTATUSRES
      }
    }
  });