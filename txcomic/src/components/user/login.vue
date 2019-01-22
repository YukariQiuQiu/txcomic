<template>
  <div class="app-login">
    <div class="mui-card">
          <div class="mui-card-header"><span>用户登录</span></div>
          <div class="mui-card-content">
            <div class="mui-card-content-inner login-input">
              <span>用户名：</span><input type="text" v-model="uname">
            </div>
            <div class="mui-card-content-inner login-input">
              <span>密码：</span><input type="password" v-model="upwd">   
            </div>
          </div>
          <div class="mui-card-footer">
            <mt-button size="large" type="primary" @click="login">登录</mt-button>
          </div>
    </div>
  </div>
</template>
<script>
import {Toast} from  "mint-ui";  
export default {
  methods:{
    login(){
      var uname=this.uname;
      var upwd=this.upwd
      if(uname && upwd){
        var url=this.urlSet+"/user/login"
        this.axios.get(url,{params:{uname,upwd}}).then(res=>{
          this.$store.commit("update")
          Toast(res.data.msg);
          if(res.data.code==1){
            this.$router.push("/home")
          }
        })
      }else{
        Toast("请输入用户名或密码")
      }
    }
  },
  data(){
    return {
      uname:"",
      upwd:""
    }
  }
}
</script>
<style>
.login-input>span{
  flex: 1;
  padding-top: 0.6rem;
}  
.login-input{
  display: flex;
}  
.app-login .mui-card-content-inner input{
  width: 70%;
}
.app-login .mui-card-footer{
  padding: 0.5rem 2.0rem;
}  
.app-login .mui-card-header span{
  width: 100%;
  text-align: center;
  font-size: 1.5rem;
  font-weight: 700;
}  
.app-login{
  margin-top: 3.5rem;
}
</style>