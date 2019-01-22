<template>
  <div id="app">
    <!--顶部-->
    <div class="top-bar">
      <div class="top-logo"></div>
      <div class="padding"></div>
      <a href="javascript:;" class="top-search"><span class="mui-icon mui-icon-search"></span></a>
      <div class="top-menu" @click="drop"><span class="mui-icon mui-icon-bars"></span></div>
    </div>
    <!--下拉菜单内容-->
    <div class="header-menu" :class="{show:isActive}">
        <div class="mui-content menu-style">
          <ul class="mui-table-view mui-grid-view mui-grid-9">
              <li @click="chose" class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/home">
                      <span class="mui-icon mui-icon-home"></span>
                      <div class="mui-media-body">主页</div></router-link></li>
              <li @click="chose" class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/login">
                  <span class="mui-icon mui-icon-contact"></span>
                  <div class="mui-media-body">登录</div></router-link></li>
              <li @click="chose" class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/reg">
                  <span class="mui-icon mui-icon-extra mui-icon-extra-peoples"></span>
                  <div class="mui-media-body">注册</div></router-link></li>
          </ul> 
		    </div>
    </div>
    <router-view></router-view>
    <!--底部目录-->
    <nav class="mui-bar mui-bar-tab">
			<router-link to="/home" class="mui-tab-item" href="javascript:;">
				<span class="mui-icon mui-icon-home"></span>
				<span class="mui-tab-label">首页</span>
			</router-link>
			<router-link to="comicsList" class="mui-tab-item" href="javascript:;">
				<span class="mui-icon mui-icon-extra mui-icon-extra-xiaoshuo"></span>
				<span class="mui-tab-label">目录</span>
			</router-link>
			<router-link to="cart" class="mui-tab-item" href="javascript:;">
				<span class="mui-icon mui-icon-extra mui-icon-extra-cart">
          <span class="mui-badge">{{$store.getters.cartCount}}</span>
        </span>
				<span class="mui-tab-label">购物车</span>
			</router-link>
			<router-link to="/person" class="mui-tab-item" href="javascript:;">
				<span class="mui-icon mui-icon-contact"></span>
				<span class="mui-tab-label">个人中心</span>
			</router-link>
    </nav>
    <!--返回顶部-->
    <div class="topSign" :class="{signShow:isHide}">
      <span class="mui-icon mui-icon-arrowthinup" @click="goTop"></span>
    </div>
  </div>
</template>
<script>
export default {
  name: 'App',
   data(){
     return {
       isActive:false,
       isHide:true
     }
   },
  methods: {
   goTop(){
    //document.body.scrollTop = 0
    //document.documentElement.scrollTop = 0
    //定时器设定返回距离并逐渐减少，小于100时直接等于0，清除定时器实现渐变
    var sTop=document.documentElement.scrollTop;
    var setTop=setInterval(function(){
      sTop-=100;
      document.documentElement.scrollTop=sTop
      if(sTop<100){
        document.documentElement.scrollTop=0;
        clearTimeout(setTop)
      }
    },40)
   }, 
   chose(){
    this.isActive=false
   }, 
   drop(){
     if(this.isActive){
       this.isActive=false
      }else{
       this.isActive=true
      }
    },
    scroll(){//滚动条时间
      var _this = this;
      var scrollTop=document.documentElement.scrollTop;
      if(scrollTop<133){
        _this.isHide=true;
      }else{
        _this.isHide=false;
      }  
    } 
  },
  mounted() {
    window.addEventListener("scroll",this.scroll)
  }
  // ,
  // watch: {
  //   $route(to,from){
  //     console.log(to.path)
  //   }
  // }
}
</script>

<style>
.signShow{
  display: none;
}  
.topSign{
  width: 2.5rem;
  height: 2.5rem;
  text-align: center;
  line-height: 2.5rem;
  position:fixed;
  right:1rem;
  bottom:5rem;
  z-index: 100;
  background-color:#ff9f6d;
}  
.topSign a{
  color:rgb(29, 26, 235);
}  
.show{
  height:11rem !important
}  
.menu-style ul{
  height:11rem;
}  
.menu-style{
  margin-top:-1rem;
  height: 0rem;
}  
.header-menu{
  position: fixed;
  top:2.5rem;
  width: 100%;
  z-index: 10;
  height:0rem;
  overflow: hidden;
  transition: all 200ms linear;
}  
.padding{
  flex:1;
}
.mui-icon{
  font-size:30px;
}
.top-menu,.top-search{
  text-decoration:none;
  color:#ff9f6d;
  margin-right: 1.125rem;
}
.top-bar{
  background-color:#fff;
  width:100%;
  height:2.5rem;
  display:flex;
  position:fixed;
  top:0px;
  left:0px;
  align-items: center;
  z-index:10;
}
.top-logo{
  background:url('../static/img/logo.png') no-repeat 0rem -2.55rem;
  background-size: 14.8rem 7rem;
  width: 6rem;
  height:2.5rem;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top:2.5rem;
  padding-bottom: 55px;
}
</style>

