export const debounce = (fn, delay) =>{
    let timer
    return function() {
        if (timer){
            clearTimeout(timer)
        }
        timer = setTimeout(()=>fn(),delay)
    }
}
export const stom_time = (s) => {
  if(s < 60){
      return s + "s"
  }
  if(s % 60 == 0 ) {
      return s / 60 + "m"
  }
  if(s > 60) {
      return Math.floor(s / 60) + "m" + s % 60 + "s"
  }
}