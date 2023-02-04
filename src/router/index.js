import { createRouter, createWebHashHistory } from "vue-router";
import songlists from "../views/songlists"
import songDetail from "../views/songDetail"
import songLyric from "../views/songLyric"
import userPage from "../views/userPage"
import recommendedDaily from "../views/recommendedDaily"
import topSingers from "../views/topSingers"
import LogRegister from "../views/LogRegister"
import Layout from "../layout";
import { stopAnimation, continuAnimation  } from "../static/js/canvasBackground"
const router = createRouter({
  routes: [
    {
      path: "/",
      component: Layout,
      children:[
        {
          path:"/songlists",
          name:"songlists",
          component: songlists,
          meta:{
            keepAlive:false
          }
        },
        {
          path:"/songDetail",
          name:"songDetail",
          component:songDetail,
          meta:{
            keepAlive:true
          }
        },
        {
          path:"/songLyric",
          name:"songLyric",
          component:songLyric,
          meta:{
            keepAlive:false
          }
        },
        {
          path:"/userPage",
          name:"userPage",
          component:userPage,
          meta:{
            keepAlive:!true
          }
        },
        {
          path:"/recommendedDaily",
          name:"recommendedDaily",
          component:recommendedDaily,
          meta:{
            keepAlive:true
          }
        },
        {
          path:"/topSingers",
          name:"topSingers",
          component:topSingers,
          meta:{
            keepAlive:false
          }
        },
        {
          path:"/LogRegister",
          name:"LogRegister",
          component:LogRegister,
          meta:{
            keepAlive:false
          }
        },
      ],
      redirect: { name: 'songlists' }
    }
  ],
  history: createWebHashHistory()
});
router.beforeEach((to,from)=>{
  if(to.path == "/songLyric"){
    stopAnimation()
    console.log("stopAnimation")
  } 
  if(from.path == "/songLyric"){
    continuAnimation()
    console.log("continuAnimation")
  }
})
export default router;
