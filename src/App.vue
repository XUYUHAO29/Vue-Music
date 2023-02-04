<template>
  <router-view></router-view>
</template>

<script>
import { defineComponent, onMounted, watch} from 'vue';
// import { from } from 'webpack-sources/lib/CompatSource';
import { useLogIn } from "./stores/LogIn"
import { useRouter } from 'vue-router';
import bus from "./utils/evenBus"
export default defineComponent({
    name:"App",
    setup(){
      const api = useLogIn()
      const router = useRouter()
      let { LogStatus_async, LogInAnonimous_async } = api
      onMounted(() => {
        if(localStorage.getItem("Cookie") !== ""){
          LogInAnonimous_async().then(()=>{
            LogStatus_async()
          })
        }
      })
      watch(
        ()=>api.Cookie,
        (val)=>{
          localStorage.setItem("Cookie",val.cookie)
        }
      )
      watch(
        ()=>api.status,
        (val)=>{
          // 如果是匿名用户则先跳转登录
          if(val.data.account.anonimousUser){
            router.push({
              name:"LogRegister"
            })
          } else {
            bus.$emit("showHeader", api.status.data.profile.avatarUrl)
          }
          console.log(val)
        }
      )
    }
})
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
</style>
