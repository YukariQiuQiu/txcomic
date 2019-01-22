const express = require("express");
const bodyParser = require('body-parser');
var app = express();
app.listen(3000);
const pool = require("./pool");

app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static('public'));
//配置路由
const indexRouter=require("./routes/index")
const listRouter=require("./routes/list")
const userRouter=require("./routes/user")
const infoRouter=require("./routes/info")
const cartRouter=require("./routes/cart")
const collectRouter=require("./routes/collect")
//加载模块cors
const cors = require("cors");

app.use(cors({
	//  开发版
  /* origin:["http://127.0.0.1:3005",
				 "http://localhost:3005"],//允许列表 */
	// 上线版
	origin: true,
  credentials:true   //是否验证
}))

//配置session
const session=require("express-session")
app.use(session({
	secret:"128位随机字符串",  //安全令牌
	resave:false,    //请求保存
	saveUninitialized:true,  //初始化
	cookie:{
		maxAge:1000*60*60*24  //1天
	}
}))

app.use('/index',indexRouter);
app.use('/list',listRouter);
app.use('/user',userRouter);
app.use('/info',infoRouter);
app.use('/cart',cartRouter);
app.use('/col',collectRouter);