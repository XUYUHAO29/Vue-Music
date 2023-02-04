function evenBus(){
    this.list = {}
}
evenBus.prototype.$on = function(name, fn){
    this.list[name] = this.list[name] || []
    this.list[name].fn = fn
}
evenBus.prototype.$emit = function(name, data){
    if(this.list[name]){
       this.list[name].fn(data)
    }
}
evenBus.prototype.$off = function(name){
    delete this.list[name]
}
const bus = new evenBus()
export default bus