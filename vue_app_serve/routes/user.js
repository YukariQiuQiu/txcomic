const pool=require('../pool.js');
const express=require('express');
var router=express.Router();

//用户注册
router.post('/reg',(req,res)=>{
  var obj=req.body;
  //获取用户名，判断用户名是否为空
  var $uname=obj.uname;
  if(!$uname){//如果用户名为空
    res.send({code:401,msg:'uname required'});
	return;//阻止函数中程序继续往后执行
  }
  var $upwd=obj.upwd;
  if(!$upwd){
    res.send({code:402,msg:'upwd required'});
	return;
  }
  var $phone=obj.phone;
  if(!$phone){
    res.send({code:403,msg:'phone required'});
	return;
  }
  var $email=obj.email;
  if(!$email){
    res.send({code:404,msg:'email required'});
	return;
  }
  //验证通过，将用户的数据插入到数据表
  pool.query('INSERT INTO user VALUES(NULL,?,md5(?),?,?)',[$uname,$upwd,$phone,$email],(err,result)=>{
    if(err) throw err;
	//如果affectedRows属性大于0，数据插入成功
    if(result.affectedRows>0){
	  res.send({code:200,msg:'注册成功'});
	}
  });
});

//验证用户名重复
router.get('/checkUname',(req,res)=>{
  var uname=req.query.uname;
  var sql="select * from user where uname=?"
  pool.query(sql,[uname],(err,result)=>{
    if(result.length==1)
    res.send({code:-1,msg:"用户名已注册"})
    else res.send({code:1,msg:"用户名可用"})
  })
})

//登录
router.get("/login",(req,res)=>{
  var uname=req.query.uname;
  var upwd=req.query.upwd;
  var sql="select count(uid) as c,uid from user where uname=? and pwd=md5(?)";
  pool.query(sql,[uname,upwd],(err,result)=>{
    if(err) throw err;
    var c = result[0].c;
    if(c == 1){
    req.session.uid = result[0].uid
    res.send({code:1,msg:"登录成功"});
    }else{
      res.send({code:-1,msg:"用户名或密码有误"})
    }
  })
})

module.exports=router;