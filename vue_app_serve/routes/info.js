const express=require("express");
const router=express.Router();
const pool=require("../pool");

//获取漫画详情
router.get("/",(req,res)=>{
  var pid=req.query.pid
  var sql="select * from comics where pid=?"
  pool.query(sql,[pid],(err,result)=>{
    if(err) throw err;
    res.send({code:1,data:result})
  })
})

//获取评论
router.get("/comment",(req,res)=>{
  var pid=req.query.pid;
  var sql="select a.ctime,a.comment,b.uname from comment as a,user as b where pid=? and a.uid=b.uid order by mid desc"
  pool.query(sql,[pid],(err,result)=>{
    if(err) throw err;
    res.send({code:1,data:result})
  })
})

//添加评论
router.get("/addcomment",(req,res)=>{
  var uid=req.session.uid;
  var pid=req.query.pid;
  var comment=req.query.comment;
  if(!comment){
    res.send({code:-1,msg:"评论不能为空"})
    return
  }
  if(!uid){
    res.send({code:-2,msg:"请先登录"})
    return
  }
  var sql="insert into comment values(null,now(),?,?,?)";
  pool.query(sql,[uid,pid,comment],(err,result)=>{
    if(err) throw err;
    if(result.affectedRows>0){
      res.send({code:1,msg:"评论成功"})
    }else{
      res.send({code:-3,msg:"评论失败"})
    }
  })
})

module.exports=router;