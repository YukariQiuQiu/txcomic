const pool=require('../pool.js');
const express=require('express');
var router=express.Router();

router.get("/",(req,res)=>{
  var uid=req.session.uid;
  if(!uid){
    res.send({code:-2,msg:"请先登录"})
    return
  }
  var sql="select a.pid,a.pname,a.pic,a.summary from comics as a,cart as b where a.pid=b.pid and b.uid=?"
  pool.query(sql,[uid],(err,result)=>{
    if(err) throw err;
    res.send({code:1,data:result})
  })
})

module.exports=router;