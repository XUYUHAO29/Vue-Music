import { debounce } from "./commom"
let req
function animation(){

}
const an = new animation()
window.onload = function(){
    const canvas = document.querySelector("#canvas")
    const ctx = canvas.getContext("2d")
    let round = []
    // let req
    const pointNumber = 300
    const configure = (options) =>{
      const { width, height } = options || { width: window.innerWidth, height: window.innerHeight}
      canvas.width = width
      canvas.height = height
      return{
        width,
        height
      }
    }
    const {width, height} = configure()
    const cancalDebounce = debounce(configure,300)
    window.addEventListener("resize",cancalDebounce)
    function Round_point(index, X, Y){
      this.index = index
      this.X = X
      this.Y = Y
      this.r = Math.random()*6 + 1;
      this.speedX = Math.random()
      this.speedY = Math.random()
      const alpha = (Math.floor(Math.random()*20) + 1) / 10 / 2
      const red =  (Math.floor(Math.random()*255) + 1)
      const green =  (Math.floor(Math.random()*255) + 1)
      const blue =  (Math.floor(Math.random()*255) + 1)
      this.color = "rgba("+red+","+green+","+blue+","+alpha+")"
    }
    Round_point.prototype.draw = function(){
      // 画圆饼
      ctx.beginPath()
      ctx.fillStyle = this.color
      ctx.shadowBlur = this.r * 2
      ctx.arc(this.X, this.Y, this.r, 0, 2*Math.PI, false)
      ctx.fill()
      ctx.closePath()
      // 画圆环
      // ctx.beginPath()
      // ctx.arc(this.X, this.Y, this.r+5, 0, 2*Math.PI, false)
      // ctx.lineWidth = 2
      // ctx.strokeStyle = this.color
      // ctx.stroke()
      // ctx.closePath()

      // ctx.beginPath()
      // ctx.arc(this.X, this.Y, this.r+10, 0, 2*Math.PI, false)
      // ctx.lineWidth = 2
      // ctx.strokeStyle = this.color
      // ctx.stroke()
      // ctx.closePath()

      // ctx.beginPath()
      // ctx.arc(this.X, this.Y, this.r+15, 0, 2*Math.PI, false)
      // ctx.lineWidth = 2
      // ctx.strokeStyle = this.color
      // ctx.stroke()
      // ctx.closePath()

    }
    Round_point.prototype.move = function(){
      this.X += this.speedX
      this.Y += this.speedY
      if(this.X > (width + 10)){
        this.X = -10
      }
      if(this.Y > (height + 10)){
        this.Y = -10
      }
      round[this.index].draw()
    }
    animation.prototype.animations = function(){
      ctx.clearRect(0, 0, width, height)
      for(let index = 0; index < pointNumber; index++){
        round[index].move()
      }
     req = requestAnimationFrame(an.animations)
    }
    function init(){
      for(let index = 0;index < pointNumber;index++){
        round[index] = new Round_point(index, Math.random()*width, Math.random()*height)
        round[index].draw()
      }
     
     an.animations()
    }
    init()
  }
  export const stopAnimation=()=>{
    cancelAnimationFrame(req)
    console.log(11111)
  }
  export const continuAnimation=()=>{
    an.animations()
    console.log(22222)
  }
