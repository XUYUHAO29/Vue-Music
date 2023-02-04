<template>
    <div class="flip">
        <div 
            ref="contentImg"
            class="content-img"
            @mouseover="trans"
            @mouseout="removeTrans"
        >
            <div ref="Front" class="Front"></div>
            <div ref="Behind" class="Behind"></div>
        </div>
    </div>
</template>

<script>
import { defineComponent, getCurrentInstance, onMounted, watch } from "vue"
// import { debounce } from  "../../static/js/commom"
export default defineComponent({
    props:{
        frontImg:{
            type: String,
            default:"https://photo.16pic.com/00/53/26/16pic_5326745_b.jpg"
        },
        behindImg:{
            type: String,
            default:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-xFulkfbTwoQrYR8QcYal2UILdfr5C--enA&usqp=CAU"
        }
    },
    setup(props){
        const instance = getCurrentInstance()
        let time = new Date().getTime()
        const trans = () => {
            if(new Date().getTime() - time > 400) {
                instance.refs.Front.classList.remove("backFront")
                instance.refs.Behind.classList.remove("backBehind")
                
                instance.refs.Front.classList.add("backBehind")
                instance.refs.Behind.classList.add("backFront")
                time = new Date().getTime()
            }
        }   

        const removeTrans = () => {
            if(new Date().getTime() - time > 400) {
                instance.refs.Front.classList.remove("backBehind")
                instance.refs.Behind.classList.remove("backFront")

                instance.refs.Front.classList.add("backFront")
                instance.refs.Behind.classList.add("backBehind")
                time = new Date().getTime()
            }
        }
        watch(
            ()=>props.frontImg,
            ()=>loadDoubleImg()
        )
        function loadDoubleImg() {
            instance.refs.Front.style.setProperty("background-image","url("+props.behindImg+")")
            instance.refs.Behind.style.setProperty("background-image","url("+props.frontImg+")")
        }
        onMounted(()=>{
            loadDoubleImg()
        })
        return{
            trans,
            removeTrans
        }
    }
})
</script>

<style scoped>
    /* .flip{
        width: 400px;
        height: 400px;
        position: relative;
        cursor: pointer;
        border-radius: 20%;
        left: 5%;
        top: 10%;
        animation: constant-speed 40s linear 0s infinite;
    } */
    .contentImg{
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        /* transform-style: preserve-3d; */
        border-radius: 50%;
        cursor: pointer;
        box-shadow: 1px 1px 20px 0px #000;
    }
    .Front{
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        background-image: url();
        background-repeat: no-repeat;
        background-size: contain;
        border-radius: 50%;
        z-index: 3;
    }
    .Behind{
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        background-image: url();
        background-repeat: no-repeat;
        background-size: contain;
        backface-visibility: hidden;
        border-radius: 50%;
        z-index: 4;
    }
    .backFront{
        animation: backFront 0.4s ease 0s 1 forwards;
    }
    .backBehind{
        animation: backBehind 0.4s ease 0s 1 forwards;
    }
    @keyframes backFront{
        0%{
            transform: rotateY(0);
        }
        100%{
            transform: rotateY(180deg);
        }
    }
    @keyframes backBehind{
        0%{
            transform: rotateY(-180deg);
        }
        100%{
            transform: rotateY(0);
        }
    }

    /* @keyframes constant-speed{
        0%{
            transform: rotate(0);
        }
        100%{
            transform: rotate(1turn);
        }
    } */
</style>