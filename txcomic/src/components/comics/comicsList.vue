<template>
  <div class="app-comicsList">
    <ul class="list-box">
      <li class="list-item" v-for="item,i in list" :key="item.pid">
        <router-link :to="'/comicsInfo?pid='+item.pid">
          <div class="list-cover">
            <img :src="item.pic">
          </div>
          <div class="list-info">
              <span class="comic-title">{{item.pname}}</span>
              <span class="comic-update">更新到{{item.lastCata}}话</span>
              <span class="comic-tag">{{tags[i].tag}}</span>
              <span class="comic-desc">{{item.summary}}</span>
          </div>
        </router-link>
      </li>
    </ul>
    <div class="more">{{tips}}</div>
  </div>
</template>
<script>
export default {
  beforeDestroy() {
    window.removeEventListener("scroll",this.getMores)
  },
  mounted() {
    window.addEventListener("scroll",this.getMores)
  },
  created() {
    this.getList()
  },
  methods: {
    getMores(){
      //console.log(this.$route.path,this.$route.params)

        var appComicsList = document.getElementsByClassName("app-comicsList")[0];
        if (appComicsList === null) {
          return;
        }
        var pageHeight=appComicsList.clientHeight;//div的宽度
        var scrollTop=document.documentElement.scrollTop;//滚动的距离
        var windowHeight=document.documentElement.clientHeight;//视口高度
        if(windowHeight+scrollTop>=pageHeight+95)
        this.getList()
        if(this.pno>this.pageCount){
          this.tips="目录已全部加载";
          return
        }

    },
    getList(){ //首次加载
      this.pno++;
      var pno=this.pno;
      var pageSize=this.pageSize;
      var kword=this.$route.query.kword;
      var url=this.urlSet+"/list"
      this.axios.get(url,{params:{pno,pageSize,kword}}).then(res=>{
        this.pageCount=res.data.pageCount;
        var rows=this.list.concat(res.data.data)
        this.list=rows
        var tags=[];
        this.list.forEach((elem)=>{
          var obj={};
          var tag=JSON.parse(elem.tag);
          tag=tag.join("、")
          obj.tag=tag;
          tags.push(obj)
        })
        this.tags=this.tags.concat(tags);
      })
    }
  },
  data(){
    return {
      tips:"正在加载更多",
      tags:[],
      pno:0,
      pageSize:7,
      list:[],
      pageCount:""
    }
  }
}
</script>
<style>
.more{
  font-size: 1rem;
  height: 4.5rem;
  text-align: center;
  line-height: 4.5rem
}  
.comic-update,.comic-tag,.comic-desc{
  font-size: 0.8rem;
  color: #969696;
  line-height: 1rem;
  overflow: hidden;
  display: block;
  height:1rem;
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
.list-item a{
  text-decoration: none;
  overflow: hidden;
  display: flex;
  align-items: center;
  padding: 0.5rem 0.5rem;
}  
.list-box{
  padding-left: 0.25rem;
  padding-right: 0.25rem;
  list-style: none;
}
.app-comicsList{
  padding-bottom: 0.25rem;
}
</style>