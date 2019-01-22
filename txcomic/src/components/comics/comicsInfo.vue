<template>
  <div class="app-comicsInfo">
    <!--背景-->
    <div class="comic-banner" :style="{backgroundImage:'url('+info.pic+')'}"></div>
    <!--头部封面+信息-->
    <div class="comic-info">
      <div class="comic-cover">
        <img :src="info.pic">
      </div>
      <div class="comic-intro">
        <ul>
          <li class="comic-name">{{info.pname}}</li>
          <li class="comic-tag">
            <label>标签：</label>
            <span v-for="item in info.tag">{{item}}</span>
          </li>
          <li class="comic-author">作者：{{info.author}}</li>
          <li class="comic-price">价格：¥{{info.price}}/月</li>
          <li class="comic-buy">
            <span @click="addCart">点击订阅+</span>
          </li>
        </ul>
      </div>
    </div>
    <!--导航-->
    <div class="tab-list">
      <div class="tab-item" @click="changeIntroduction">详情</div>
      <div class="tab-item" @click="changeCata">目录</div>
      <div class="tab-item" @click="changeComment">评论</div>
      <div class="tab-sign" :style="move"></div>
    </div>
    <!--详情-->
    <div class="comic-introduction" :class="{show:introShow}">
      <p class="summary">{{info.summary}}</p>
    </div> 
    <!--目录-->
    <div class="cata" :class="{show:cataShow}">
      <ul class="comic-list">
        <li class="comic-item" :class="{'chose_item':itemSelect[i]}" :data-i="i" @click="isChosed" v-for="elem,i in info.cata">{{elem}}</li>
      </ul>
    </div>
    <!--评论-->
    <div class="comment" :class="{show:commentShow}">
      <textarea id="cmt" cols="30" rows="10" placeholder="我来说两句" v-model="mycomment"></textarea>
      <mt-button size="large" @click.prevent="addComent">发表评论</mt-button>
      <ul class="cmt-list">
        <li class="cmt-item" v-for="item in comment">
          <p class="uname">{{item.uname}}:</p>
          <p class="date">{{item.ctime | datetimeFilter}}</p>
          <p class="cmt-content">{{item.comment}}</p>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import {Toast} from  "mint-ui";    
export default{
  watch: {
    
  },
  created() {
    this.getInfo()
    this.getComment()
  },
  methods: {
    isChosed(e){
      var iClass=e.target.dataset.i
      this.itemSelect.forEach((elem,i)=>{
        if(i==iClass){
          console.log(this)
          this.$set(this.itemSelect,i,true);
        }else{
          this.$set(this.itemSelect,i,false);
        }
      })
    },
    addCart(){
      var pid=this.info.pid;
      var url=this.urlSet+"/cart/add"
      this.axios.get(url,{params:{pid}}).then(res=>{
        this.$store.commit("update")
        Toast(res.data.msg)
      })
    },
    addComent(){
      var comment=this.mycomment;
      if(!comment){
        Toast("评论不能为空")
        return
      }
      var pid=this.info.pid;
      var url=this.urlSet+"/info/addcomment"
      this.axios.get(url,{params:{pid,comment}}).then(res=>{
        var code=res.data.code
        if(code<0){
          Toast(res.data.msg)
        }else{
          Toast(res.data.msg)
          this.getComment()
        }
      })
    },
    getComment(){
      var pid=this.$route.query.pid
      var url=this.urlSet+"/info/comment"
      this.axios.get(url,{params:{pid}}).then(res=>{
        this.comment=res.data.data;
      })
    },
    getInfo(){
      var pid=this.$route.query.pid
      var url=this.urlSet+"/info"
      this.axios.get(url,{params:{pid}}).then(res=>{
        var data=res.data.data[0]
        this.info.pid=data.pid;
        this.info.author=data.author;
        this.info.title=data.title;
        this.info.pic=data.pic;
        this.info.summary=data.summary;
        this.info.pname=data.pname;
        this.info.price=data.price.toFixed(2);
        this.info.tag=JSON.parse(data.tag);
        this.info.cata=JSON.parse(data.cata);
        this.info.cata.forEach(()=>{
          this.itemSelect.push(false)
        })
      })
    },
    changeIntroduction(){
      this.move["left"]="4rem";
      this.introShow=true;
      this.cataShow=false;
      this.commentShow=false;
    },
    changeCata(){
      this.move["left"]="11rem"
      this.introShow=false;
      this.cataShow=true;
      this.commentShow=false;
    },
    changeComment(){
      this.move["left"]="18rem"
      this.introShow=false;
      this.cataShow=false;
      this.commentShow=true;
    }
  },
  data(){
    return {
      itemSelect:[],
      mycomment:"",
      comment:[],
      introShow:true,
      cataShow:false,
      commentShow:false,
      move:{"left":"4rem"},
      info:{
        pid:"",
        pname:"",
        title:"",
        pic:"",
        author:"",
        price:"",
        tag:[],
        summary:"",
        cata:[]
      }
    }
  }
}
</script>
<style>
.app-comicsInfo .chose_item{
  background-color:#ff9a6a;
  color:#fff;
}   
.comic-tag span{
  margin-right: 0.15rem;
}  
.show{
  display: block!important;
}  
.cmt-item{
  margin-bottom: 0.5rem;
  border-bottom: 1px solid #c9c9c9;
  padding-bottom:0.5rem;
}  
.cmt-item>p{
  margin: 0 0;
}  
.cmt-list{
  padding: 1rem 0;
  list-style: none;
  text-align: left;
  padding-bottom: 3rem; 
}  
#cmt{
  height:6rem;
}  
.comment{
  padding:0.5rem 1.5rem;
  width: 100%;
  display: none;  
}  
.more{
  padding: 0 1.5rem;;
}  
.comic-item{
  width:6.5rem;
  height:2.5rem;
  border: 1px solid #C5C5C5;
  line-height: 2.5rem;
  margin-bottom: 0.5rem;
  font-size: 1.0rem;
  text-align: center;
  color:#c5c5c5;
  background-color:#fff;
}  
.comic-list{
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  padding:0.5rem 1.5rem;
  justify-content: space-between;
  padding-bottom: 3rem; 
}  
.cata{
  width:100%;
  display: none;
}  
.comic-introduction{
  padding: 0.5rem 1.5rem;
  display: none; 
  padding-bottom: 3rem; 
} 
.summary{
  text-align: left
}  
.tab-sign{
  position: absolute;
  border-top:1.5px solid #ff9a6a;
  width:1.5rem;
  bottom: 0.5rem;
  transition: all 300ms linear;
}  
.tab-list .active{
  content: '';
  width: 0.5rem;
  height: 0.15rem;
  left: 2.625rem;
  bottom: 0;
  position: absolute;
  background-color: #ff9a6a;
  border-radius: 0.15rem;
  display: block
}  
.tab-item{
  height:3rem;
  width:7rem;
  line-height:3rem;
  font-size:1rem;
  color:#969696;
}  
.comic-buy span{
  background: #ff9f6d;
  display:block;
  width: 65%;
  text-align: center;
  border-radius: 0.8rem;
  margin-top: 0.5rem;
}  
.comic-name{
  font-size: 1.2rem;
  font-weight: 700;
  margin-bottom: 1rem;
}  
.comic-intro ul{
  list-style: none;
}  
.comic-intro{
  color:#fff;
  height:10rem;
  font-size: 0.8rem;
  flex: 1;
  text-align: left;
  padding: 0 0rem;
}  
.comic-cover{
  width: 8rem;
}  
.comic-cover img{
  width: 100%
}  
.comic-info{
  z-index: 5;
  width: 100%;
  height:10rem;
  display: flex;
  padding:0 2rem;
  position:absolute;
  top: 5.5rem;
  align-items: flex-end;
}  
.comic-banner{
  width: 100%;
  height:14rem;
  background-repeat: no-repeat;
  background-size: 120%;
  filter:blur(15px);
  overflow: hidden;
  z-index: 1;
}
.tab-list{
  width: 100%;
  height:50px;
  background-color:#fff;
  top:-1.4rem;
  position: relative;
  border-radius: 0.3rem 0.3rem 0 0;
  z-index:50;
  height:3rem;
  display: flex;
  justify-content: center;
}
</style>