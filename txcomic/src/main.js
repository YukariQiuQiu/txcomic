// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import 'mint-ui/lib/style.css'

Vue.config.productionTip = false

import './lib/mui/css/mui.css'
import './lib/mui/css/icons-extra.css'

//配置vuex
import Vuex from "vuex";
Vue.use(Vuex);
 var store=new Vuex.Store({
   state:{cartCount:0},
   mutations:{
     update(state){
       var url=urlSet+"/cart/count"
       axios.get(url).then(res=>{
         state.cartCount=res.data.count
       })
     }
   },
   getters:{
     cartCount:function(state){
       return state.cartCount
     }
   }
 })


/* eslint-disable no-new */
import {Header,Swipe,SwipeItem,Button} from "mint-ui";
Vue.component(Header.name,Header);
Vue.component(Swipe.name,Swipe);
Vue.component(SwipeItem.name,SwipeItem);
Vue.component(Button.name,Button)

import axios from 'axios'; 
axios.defaults.withCredentials=true;
Vue.prototype.axios=axios;

//替换上线与开发url
var urlSet="http://127.0.0.1:3000";
Vue.prototype.urlSet=urlSet;


Vue.filter("datetimeFilter",function(val){
  //val 当前日期对象
  //1:新创建日期对象
  var data = new Date(val);
  //2:获取年月日时分秒
  var y = data.getFullYear();
  var m = data.getMonth()+1;
  var d = data.getDate();
  var h = data.getHours();
  var mi = data.getMinutes();
  var s = data.getSeconds();
  //3:拼接字符串
  m<10&&(m="0"+m);
  d<10&&(d="0"+d);
  return `${y}-${m}-${d} ${h}:${mi}:${s}`;
})

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

