<template>
  <div class="app-person">
    <div class="sub">我的订阅列表</div>
    <ul class="list-box">
      <li class="list-items" v-for="item,i in collect" :key="i">
        <router-link :to="'/comicsInfo?pid='+item.pid">
          <div class="list-cover">
            <img :src="item.pic">
          </div>
          <div class="list-info">
              <span class="comic-title">{{item.pname}}</span>
              <span class="comic-desc">{{item.summary}}</span>
          </div>
        </router-link>
      </li>
    </ul>
  </div>
</template>
<script>
import {Toast} from  "mint-ui";  
export default {
  created() {
    this.getCol();
  },
  methods: {
    getCol(){
      var url=this.urlSet+"/col";
      this.axios.get(url).then(res=>{
        if(res.data.code==-2){
          Toast(res.data.msg)
          return
        }
        this.collect=res.data.data
      })
    }
  },
  data(){
    return {
      collect:[]
    }
  }
}
</script>
<style>
.sub{
  margin-bottom: 1.0rem;
}  
.app-person{
  padding:1.5rem 1.5rem;
}
.comic-desc{
font-size: 0.8rem;
color: #969696;
line-height: 1rem;
overflow: hidden;
display: block;
height:3rem;
margin-top: 0.4rem;
}  
.comic-title{
color: #535252;
font-size: 1.0rem;
line-height: 150%;
padding-top: 0.25rem;
font-weight: 600;
}  
.list-info{
text-align: left;
flex: 1;
padding: 0 0.3rem;
}  
.list-cover img{
display: block;
width: 100%;
height: 100%;
border-radius: 0.1rem;
}  
.list-cover{
height: 5.675rem;
width: 5.0rem;
margin-right: 0.5rem;
}
.list-items a{
text-decoration: none;
overflow: hidden;
display: flex;
align-items: center;
padding: 0.5rem 0.5rem;
}  
.list-box{
padding-left: 0.25rem;
padding-right: 0.25rem;
padding-bottom: 0.25rem;
list-style: none;
}
</style>