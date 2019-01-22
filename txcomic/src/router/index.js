import Vue from 'vue'
import Router from 'vue-router'
import Home from "@/components/tabbar/Home.vue"
import comicsList from "@/components/comics/comicsList.vue"
import login from "@/components/user/login.vue"
import reg from "@/components/user/reg.vue"
import person from "@/components/user/person.vue"
import cart from "@/components/user/cart.vue"
import comicsInfo from "@/components/comics/comicsInfo.vue"
Vue.use(Router)

export default new Router({
  routes: [
    {path:'/',redirect:"/Home"},
    {path:'/Home',component:Home},
    {path:'/comicsList',component:comicsList},
    {path:'/login',component:login},
    {path:'/reg',component:reg},
    {path:'/person',component:person},
    {path:'/cart',component:cart},
    {path:'/comicsInfo',component:comicsInfo},
  ]
})