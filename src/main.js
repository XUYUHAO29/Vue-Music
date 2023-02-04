import "./static/css/common.css";
import "./static/js/commom"
import 'animate.css';
import globalComponent from "./lib/globleComponent";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
// import { bus } from "./utils/evenBus"
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
const app = createApp(App);
// app.config.globalProperties.$bus = bus
app.use(router);
app.use(createPinia());
app.use(globalComponent);
app.use(ElementPlus)
app.mount("#app");
