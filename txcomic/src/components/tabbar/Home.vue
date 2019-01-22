<template>
  <div class="home-app">
    <!--轮播-->
    <mt-swipe :auto="3000" show-indicators>
      <mt-swipe-item v-for="item in swiper" :key="item.indexpid">
        <router-link :to="'/comicsInfo?pid='+item.indexpid">
          <img :src="item.href">
        </router-link>
      </mt-swipe-item>
    </mt-swipe>
    <!--首页主要推荐-->
    <div class="main">
      <!--首页推荐头部-->
      <div class="home-title">
        <div class="title-icon"></div>
        <div class="title-padding"></div>
        <a class="more-icon"></a>
      </div>
    <!--首页推荐内容-->
      <div class="recommand">
        <div class="recommand-item" v-for="item in data" :key="item.pid">
          <router-link :to="'/comicsInfo?pid='+item.pid" class="comic-link">
            <div class="comic-cover">
              <img :src="item.pic">
            </div>
            <div class="comic-content">
              <div class="comic-title">{{item.pname}}</div>
              <div class="comic-desc">{{item.title}}</div>
            </div>
          </router-link>
        </div>             
      </div>
    </div>
    <!--每日一推-->
    <div class="day-recommand">
      <!--每日一推头部-->
      <div class="home-title">
        <div class="title-icon"></div>
        <div class="title-padding"></div>
        <a class="more-icon"></a>
      </div>
      <!--每日一推板块内容-->
      <div class="day-comic">
        <div class="day-comic-cover">
          <img :src="recomand.pic">
        </div>
        <div class="day-comic-detail">
          <span class="day-comic-name">{{recomand.pname}}</span>
          <span class="day-comic-author">作者：{{recomand.author}}</span>
        </div>
      </div>
    </div>
    <!--底部banner-->
    <div class="footer-banner"></div>
  </div>
</template>
<script>
export default {
  created() {
    this.getIndex()
  },
  methods: {
    getIndex(){
      var url=this.urlSet+"/index";
      this.axios.get(url).then(res=>{
        this.swiper=res.data.swiper;
        this.recomand=res.data.recomand[0];
        this.data=res.data.data;
      })
    }
  },
  data(){
    return {
      swiper:[],
      recomand:{},
      data:[]
    }
  }
}
</script>
<style>
.footer-banner{
  width: 100%;
  height: 3.5rem;
  background: url(../../../static/img/bottomBg.png);
  background-size: 100% 100%
}  
.day-comic-detail{
  display: flex;
}  
.day-comic-author{
  margin-right: 0.75rem;
  font-size: 0.6rem;
  color: #C5C5C5;
}  
.day-comic-name{
  margin-left: 0.75rem;
  font-size: 1rem;
  color: #535252;
  flex: 1;
  text-align: left
}  
.day-comic-cover img{
  width: 100%;
}  
.day-recommand{
  width: 100%;
}
.day-recommand .title-icon{
  background: url(../../../static/img/indexicon.png) no-repeat -13rem 0rem;
  background-size: 20.5rem 17.5rem;
  width: 7.5rem;
  height: 2rem;
}
.recommand{
  width: 100%;
  display: flex;
  flex-wrap:wrap;
  justify-content: space-between;
  padding: 0 0.7rem;
} 
.home-app .comic-desc{
  margin-bottom: 0.375rem;
  font-size: 0.6rem;
  color: #969696;
  height: 1.0rem;
  overflow: hidden;
  vertical-align: baseline;
}  
.comic-title{
  font-size: 0.9rem;
  color: #535252;
  font-weight: 700;
}
.comic-content{
  font-size: 100%;
}  
.comic-cover img{
  width: 100%;
  height: 100%;
}  
.comic-link{
  text-decoration: none;
  font-size: 100%;
  background: transparent;
  margin: 0;
  padding: 0;
  display: block;
}  
.recommand-item{
  width: 28%;
  overflow: hidden;
}
.recommand{
  width: 100%;
}  
.title-padding{
  flex:1
}  
.more-icon{
  background: url(../../../static/img/indexicon.png) no-repeat -17rem -2.25rem;
  text-decoration: none;
  display: block;
  width: 3rem;
  height: 1.25rem;
  background-size: 20.5rem 17.5rem;
}
.home-title{
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  box-sizing: border-box;
  width: 100%;
  height: 2.3rem;
  display: flex;
  align-items: center;
}
.main .title-icon{
  background: url(../../../static/img/indexicon.png) no-repeat -5.25rem 0rem;
  background-size: 20.5rem 17.5rem;
  width: 7.5rem;
  height: 2rem;
}
.home-app .mint-swipe{
  height:14rem;
}
.home-app .mint-swipe-item img{
    width: 100%;
}
.mint-swipe-indicator{
  width:0.8rem;
  height:0.8rem;
  opacity: 0.5;
  background: #fff;
}
.mint-swipe-indicator.is-active{
  background: #ff9f6d;
}
</style>