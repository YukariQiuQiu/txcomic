const pool=require('../pool.js');
const express=require('express');
var router=express.Router();

//添加购物车
router.get("/add",(req,res)=>{
  var uid=req.session.uid;
  var pid=req.query.pid;
  if(!uid){
    res.send({code:-2,msg:"请先登录"})
    return
  }
  var sql="insert into cart values(null,?,?,1)"
  pool.query(sql,[uid,pid],(err,result)=>{
    if(err) throw err
    if(result.affectedRows>0){
      res.send({code:1,msg:"添加成功"})
    }else{
      res.send({code:-3,msg:"添加失败"})
    }
  })
})

//获取
router.get("/get",(req,res)=>{
  var uid=req.session.uid;
  if(!uid){
    res.send({code:-1,msg:"请先登录"})
    return
  }
  var sql="select a.bid,a.bMonth,b.uname,c.pic,c.pname,c.price from cart as a,user as b,comics as c where a.uid=? and a.uid=b.uid and a.pid=c.pid";
  pool.query(sql,[uid],(err,result)=>{
    if(err) throw err;
    res.send({code:1,data:result})
  })
})
//删除
router.get("/del",(req,res)=>{
  var bid=req.query.bid;
  var sql="delete from cart where bid=?";
  pool.query(sql,[bid],(err,result)=>{
      if(err) throw err;
      if(result.affectedRows>0){
          res.send({code:1,msg:"删除成功"})
      }else{
          res.send({code:-1,msg:"删除失败"})
      }
  })
})
//更新
router.get("/update",(req,res)=>{
  var arr=req.query.arr
  arr=JSON.parse(arr)
  var sql="update cart set bMonth=? where bid=?"
  for(var key in arr){
      var bid=parseInt(arr[key].bid)
      var bMonth=parseInt(arr[key].bMonth)
      pool.query(sql,[bMonth,bid],(err,result)=>{
          if(err) throw(err)
      })
  }
  res.send({code:1,msg:"已保存修改"})
})

//获取购物车个数
router.get("/count",(req,res)=>{
  var uid=req.session.uid;
  if(!uid){
    res.send({code:1,count:0})
    return
  }
  var sql="select count(bid) as c from cart where uid=?"
  pool.query(sql,[uid],(err,result)=>{
    if(err) throw err;
    res.send({code:1,count:result[0].c})
  })
})

module.exports=router;