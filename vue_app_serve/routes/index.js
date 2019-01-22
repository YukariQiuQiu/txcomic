const express=require("express");
const router=express.Router();
const pool=require("../pool");

router.get("/",(req,res)=>{
    var output={code:1};
    var process=0;
    var sql1='select * from index_carousel'
    pool.query(sql1,[],(err,result)=>{
        if(err) throw err;
        output.swiper=result;
        process+=30
        if(process==100)
        res.send(output)
    })
    var sql2='select r.pic,c.pname,c.author,c.pid from recomand as r,comics as c where r.pid=c.pid and r.pid=4'
    pool.query(sql2,[],(err,result)=>{
        if(err) throw err;
        output.recomand=result;
        process+=30
        if(process==100)
        res.send(output)
    })
    var sql3='select pid,pname,title,pic from comics limit 0,6'
    pool.query(sql3,[],(err,result)=>{
        if(err) throw err;
        output.data=result;
        process+=40
        if(process==100)
        res.send(output)
    })
})

module.exports=router;