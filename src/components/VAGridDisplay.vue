<template>
  <div class="gridDisplay" ref="gridDisplay">
      <slot></slot>
  </div>
</template>

<script>
import {  onMounted, getCurrentInstance } from "vue"
export default {
    name: "va-grid-display",
    props:{
        // 当前行有多少元素
        currentRowNumber:{
            type:Number,
            default: undefined
        },
        // 当前列有多少元素
        currentColumnNumber:{
            required:true
        },
        rowHeight:{
            type:String
        },
        columnWidth:{
            type:String,
        },
        // 行间距
        rowGap:{
            type:String,
            default:""
        },
        // 列间距
        columnGap:{
            type:String,
            default:""
        },
        isRowCenter: {
            type:Boolean,
            default: false
        },
        isColumnCenter:{
            type:Boolean,
            default: false
        },
        isSpaceAround:{
            type:Boolean,
            default: false
        }
    },
    setup(props){
        const instance = getCurrentInstance();

        const setClass = () =>{
            instance.refs.gridDisplay.style.gridTemplateColumns
                ="repeat("+props.currentColumnNumber+"," +props.columnWidth+")"
            
            instance.refs.gridDisplay.style.gridTemplateRows
                ="repeat("+props.currentRowNumber+"," +props.rowHeight+")"
            if(props.isRowCenter){
                instance.refs.gridDisplay.style.alignItems
                    ="center"
            }
            if(props.isColumnCenter){
                instance.refs.gridDisplay.style.justifyItems
                    ="center"
            }
            if(props.isSpaceAround){
                instance.refs.gridDisplay.style.justifyContent
                    ="space-around"
                instance.refs.gridDisplay.style.alignContent
                    ="space-around"
            }
            if(props.rowGap !== ""){
                instance.refs.gridDisplay.style.gridRowGap
                    = props.rowGap
            }
            if(props.columnGap !== ""){
                instance.refs.gridDisplay.style.gridColumnGap
                    = props.columnGap
            }

        }
        onMounted(() => {
            setClass()
        })
    }
}
</script>

<style scoped>
.gridDisplay{
    display: grid;
}
</style>