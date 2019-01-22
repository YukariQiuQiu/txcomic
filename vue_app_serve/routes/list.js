const express=require("express");
const router=express.Router();
const pool=require("../pool");

router.get("/",(req,res)=>{
  var pno=req.query.pno;
  var pageSize=req.query.pageSize;
  var kword=req.query.kword;
  var obj={code:1}
  if(!pageSize) pageSize=7;
  if(!pno) pno=1;
  var progress=0;
  var offset = parseInt((pno-1)*pageSize);
  pageSize = parseInt(pageSize);
  //查询关键词不存在
  if(!kword){
    //查询总页数
    var sql1='select count(pid) as c from comics'
    pool.query(sql1,(err,result)=>{
          if(err)throw err;
          var pageCount = Math.ceil(result[0].c/pageSize);
          obj.pageCount = pageCount;
          progress += 50;
          if(progress == 100){
            res.send(obj);
          }
    });
    var sql2='select pid,pname,pic,tag,summary,lastCata from comics limit ?,?';
    pool.query(sql2,[offset,pageSize],(err,result)=>{
      if(err) throw err;
      obj.data=result;
      progress += 50;
      if(progress == 100){
        res.send(obj);
      }
    })
  }else{
    res.send("1")
  }
})

module.exports=router;