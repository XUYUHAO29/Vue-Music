<template>
    <div 
    @click="back"
    class="back"
    />
</template>

<script>
import { defineComponent } from "vue"
import { useRouter } from "vue-router";
export default defineComponent({
    name:"back",
    setup(){
        const router = useRouter()
        const back = () => {
            router.go(-1)
        }
        return{
            back
        }
    }
})
</script>
<style scoped>
    .back{
        width: 35px;
        height: 35px;
        border-radius: 50%;
        /* border: 1px solid red; */
        background: url("../static/img/后退.svg");
        background-repeat: no-repeat;
        background-size: contain;
    }
</style>