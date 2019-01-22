<template>
  <div class="app-reg">
    <div class="mui-card">
      <div class="mui-card-header"><span>用户注册</span></div>
      <div class="mui-card-content">
          <div class="mui-card-content-inner reg-input">
              <span>用户名：</span><input type="text" placeholder="用户名格式6-10位" v-model="userInfo.uname" @blur="checkUname">
            </div>
            <div class="mui-card-content-inner reg-input">
              <span>密码：</span><input type="password" placeholder="密码格式8-16位" v-model="userInfo.upwd" @blur="checkUpwd">   
            </div>
            <div class="mui-card-content-inner reg-input">
              <span>确认密码：</span><input type="password" v-model="userInfo.reupwd" @blur="checkReupwd">   
            </div>
            <div class="mui-card-content-inner reg-input">
              <span>手机：</span><input type="text" v-model="userInfo.phone" @blur="checkPhone">   
            </div>
            <div class="mui-card-content-inner reg-input">
              <span>邮箱：</span><input type="text" v-model="userInfo.email" @blur="checkEmail">   
            </div>
          </div>
      <div class="mui-card-footer">
          <mt-button size="large" type="primary" @click="reg">注册</mt-button>
      </div>
    </div>  
  </div>
</template>
<script>
import {Toast} from  "mint-ui";  
export default{
  methods: {
    checkEmail(){   //验证邮箱
      this.regControl.email=false;
      var reg=/^([a-zA-Z0-9._-])+@([a-zA-Z0-9_-])+(\.com)$/;
      if(!reg.test(this.userInfo.email)){
        Toast("邮箱格式错误")
      }else{
        this.regControl.email=true;
      }
    },
    checkPhone(){  //验证手机
      this.regControl.phone=false;
      var reg=/^1[34578]\d{9}$/;
      if(!reg.test(this.userInfo.phone)){
        Toast("手机格式不正确")
      }else{
        this.regControl.phone=true;
      }
    },
    checkReupwd(){  //验证密码重复
      this.regControl.reupwd=false;
      if(!(this.userInfo.upwd==this.userInfo.reupwd)){
        Toast("两次密码不一致")
      }else{
        this.regControl.reupwd=true;
      }
    },
    checkUpwd(){  //验证密码格式
      this.regControl.upwd=false
      var reg=/^[a-zA-Z0-9]{8,16}$/
      if(!reg.test(this.userInfo.upwd)){
        Toast("密码格式不正确")
      }else{
        this.regControl.upwd=true
      }
    },
    checkUname(){  //验证用户格式以及用户名是否重用
      this.regControl.uname=false;
      var reg=/^[a-zA-Z0-9]{6,10}$/
      if(!reg.test(this.userInfo.uname)){
        Toast("用户名格式不正确")
      }else{
        var uname=this.userInfo.uname;
        var url=this.urlSet+"/user/checkuname";
        this.axios.get(url,{params:{uname}}).then(res=>{
          if(res.data.code==-1){
            Toast(res.data.msg)
          }else{
            this.regControl.uname=true;
          }
        })
      } 
    },
    reg(){  //注册
      var uname=this.userInfo.uname;
      var upwd=this.userInfo.upwd;
      var email=this.userInfo.email;
      var phone=this.userInfo.phone;
      if(this.regControl.uname && this.regControl.upwd && this.regControl.reupwd && this.regControl.phone && this.regControl.email){
        var url=this.urlSet+"/user/reg"
        this.axios.post(url,`uname=${uname}&upwd=${upwd}&phone=${phone}&email=${email}`).then(res=>{
          Toast(res.data.msg);
          this.$router.push("/login")
        })
      }
    }
  },
  data(){
    return {
      regControl:{  //注册ajax开关
        uname:false,
        upwd:false,
        reupwd:false,
        phone:false,
        email:false
      },
      userInfo:{ //个人注册信息存储
        uname:"",
        upwd:"",
        reupwd:"",
        phone:"",
        email:""
      }
    }
  }
}
</script>
<style>
.reg-input>span{
  flex: 1;
  padding-top: 0.6rem;
}  
.reg-input{
  display: flex;
}  
.app-reg .mui-card-content-inner input{
  width: 70%;
}
.app-reg .mui-card-footer{
  padding: 0.5rem 2.0rem;
}  
.app-reg .mui-card-header span{
  width: 100%;
  text-align: center;
  font-size: 1.5rem;
  font-weight: 700;
}  
.app-reg{
  margin-top: 3.5rem;
}
</style>