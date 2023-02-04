<template>
    <div class="content">
        <img class="content-qr" src="" alt="">
        <div>{{ state.text }}</div>
    </div>
</template>
<script>
import { defineComponent, onMounted, reactive, onUnmounted } from 'vue';
import { useLogIn } from "../../stores/LogIn"
export default defineComponent({
    name: "mysongs",
    setup(){
        let { LogQRCheckStatus, LogQRkey_async, LogQRCreate_async, LogStatus_async } = useLogIn()
        const state = reactive({
            text:""
        })
        let timer
        async function QRLogin(){
            let key = await LogQRkey_async({ timerstamp:new Date() })
            let QR_message = await LogQRCreate_async({
                timerstamp:new Date(),
                key:key.data.unikey,
                // 该参数会返回base64的二维码
                qrimg:true
            })
            document.querySelector(".content-qr").src = QR_message.data.qrimg
            timer = setInterval(async ()=>{
                const statusRes = await LogQRCheckStatus({
                    key:key.data.unikey,
                    timerstamp:new Date()
                })
                if(statusRes.code == 800){
                    alert("二维码过期")
                    clearInterval(timer)
                }
                if(statusRes.code == 803){
                    clearInterval(timer)
                    // alert("登陆成功")
                    state.text = "登陆成功"
                    await LogStatus_async({
                        cookie:statusRes.cookie
                    })
                    localStorage.setItem("Cookie", statusRes.cookie)
                }
            },5000)

        }
        onMounted(()=>QRLogin())
        onUnmounted(()=>clearInterval(timer))
        return{
            state
        }
    }
})
</script>
<style scoped>
.content{
    width: 180px;
    height: 180px;
    position: absolute;
    top: calc(50% - 90px);
    left: calc(50% - 90px);
}
.content::after{
    content: "由于云盾，目前只支持扫码登录";
    position: absolute;
    top: calc(0% - 50px);
    left: 0;
    color: white;
    text-align: center;
}
.content-qr{
    width: 100%;
    height: 100%;
    /* background: url(); */
    background-repeat: no-repeat;
    background-size: contain;
}
.content div{
    position: absolute;
    top: calc(100% + 5px);
    left: calc(50% - 30px);
    color: greenyellow;
}

</style>