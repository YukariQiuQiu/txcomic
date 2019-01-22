<template>
  <div class="app-cart">
      <div class="mui-card">
        <div class="mui-card-header"><span>{{uname}}购物车</span></div>
        <div class="mui-card-content">
          <div class="mui-card-content-inner">
            <!--删除目录-->
            <ul class="cart-list">
              <li class="cart-item" v-for="item in cartList" :key="item.bid">
                <div class="list-cover">
                  <img :src="item.pic">
                </div>
                <div class="list-info">
                    <span class="comic-title">{{item.pname}}</span>
                    <span class="comic-price">价格：¥{{item.price.toFixed(2)}} / 月</span>
                    <span class="comic-count">
                      <div class="mui-numbox">
                        <button class="mui-btn mui-btn-numbox-minus" type="button" @click.prevent="reduce" :data-bid="item.bid">-</button>
                        <input class="mui-input-numbox" type="number" v-model="item.bMonth" />
                        <button class="mui-btn mui-btn-numbox-plus" type="button" @click.prevent="add" :data-bid="item.bid">+</button>
                      </div>
                    </span>
                    <span class="smallTotal">小计：¥{{(item.price*item.bMonth).toFixed(2)}}</span>
                </div>
                <!--删除-->
                <span class="delete" :data-bid="item.bid" @click="del">删除</span>
              </li>
            </ul>
          </div>
        </div>
        <!--点击购买-->
        <div class="mui-card-footer">
          <span>总价：¥{{total}}</span>
          <mt-button type="primary" size="large" @click.prevent="save">保存修改</mt-button>
        </div>
      </div>   
  </div>
</template>
<script>
import {Toast} from  "mint-ui";  
export default{
  computed: {
    total(){
      var sum=0;
      for(var item of this.cartList){
        sum+=item.bMonth*item.price
      }
      return sum.toFixed(2)
    }
  },
  created() {
    this.getCart();
  },
  methods: {
    save(){  //购买保存
      var arr=[];
      for(var item of this.cartList){
        var obj={}
        var bid=item.bid;
        var bMonth=item.bMonth
        obj.bid=bid;
        obj.bMonth=bMonth
        arr.push(obj)
      }
      arr=JSON.stringify(arr)
      var url=this.urlSet+"/cart/update"
      this.axios.get(url,{params:{arr}}).then(res=>{
        Toast(res.data.msg)
        this.$store.commit("update")
      })
    },
    del(e){ //删除
      var bid=e.target.dataset.bid;
      var url=this.urlSet+"/cart/del";
      this.axios.get(url,{params:{bid}}).then(res=>{
        Toast(res.data.msg)
        this.getCart()
        this.$store.commit("update")
      })
    },
    reduce(e){  //减少
      var bid=e.target.dataset.bid
      for(var item of this.cartList){
        if(item.bid==bid && item.bMonth>1){
          item.bMonth--;
        }
      }
    },
    add(e){ //增加
      var bid=e.target.dataset.bid
      for(var item of this.cartList){
        if(item.bid==bid){
          item.bMonth++;
        }
      }
    },
    getCart(){
      var url=this.urlSet+"/cart/get"
      this.axios.get(url).then(res=>{
        if(res.data.code<0){
          Toast(res.data.msg)
        }else{
          this.cartList=res.data.data
          this.uname=res.data.data[0].uname
        }
      })
    }
  },
  data(){
    return {
      uname:"",
      cartList:[]
    }
  }
}
</script>
<style>
.app-cart{
  padding-bottom: 3rem;
}
.delete{
  position:absolute;
  top:5rem;
  right:1rem;
  border: 1px solid #c6c6c6;
  padding: 0.25rem 0.5rem;
  border-radius: 0.5rem;
}  
.app-cart .mui-card-footer span{
  width: 100%;
  text-align: middle;
  font-size:1.0rem;
} 
.list-info span{
  display: block;
  width: 100%;
  text-align: left;
  padding-left: 1rem;
  margin-bottom: 0.3rem;
}  
.list-cover img{
  width: 100%
}
.list-cover{
  width: 5rem;
}  
.list-info{
  flex:1;
} 
.cart-item{
  width: 100%;
  text-decoration:none;
  color:#000;
  display: flex;
  position: relative;
}
.cart-list{
  list-style: none;
  padding: 0 0;
  margin: 0 0;
}  
.app-cart .mui-card-footer{
  padding: 0.5rem 2.0rem;
}  
.app-cart .mui-card-header span{
  width: 100%;
  text-align: center;
  font-size: 1.5rem;
  font-weight: 700;
}  
.app-cart{
  margin-top: 3.5rem;
}
</style>
