const express = require('express');
const app = express();
const path = require('path');
var cookieParser = require('cookie-parser');
const bodyparser = require('body-parser');
const multer = require('multer');
var session = require('express-session');

app.use(cookieParser())
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:false}));
app.use('/upload',express.static('upload'));
app.use('/public',express.static('public'));

// 使用 express-session  的配置
app.use(session({
	secret: '12345',
	cookie:{maxAge:30*60*1000},//配置过期时间
	resave:false,
	saveUninitialized:true
}))

// 设置跨域和相应数据格式
app.use( function(req, res, next) {
  // res.header('Access-Control-Allow-Origin', '*') //当前端配置withCredentials=true时, 后端配置Access-Control-Allow-Origin不能为*, 必须是相应地址
	res.header('Access-Control-Allow-Origin', 'http://localhost:8080')
	//后面设置了Access-Control-Allow-Headers请求头，所以这两条语句不起作用的，因为后面的请求头Access-Control-Allow-Headers设置覆盖了这两条语句
	// res.header('Access-Control-Allow-Headers', 'X-Requested-With, mytoken')
	// res.header('Access-Control-Allow-Headers', 'X-Requested-With, Authorization')  
	res.setHeader('Content-Type', 'application/json;charset=utf-8')
	//Access-Control-Allow-Headers要添加上token，这要和前端页面的axios请求拦截器设置的字段一直致
	res.header('Access-Control-Allow-Headers', 'Content-Type,X-Requested-With')//Content-Length, Authorization,token, Accept,X-Custom-Header, Request-Ajax,access-control-allow-origin, authority,version-info'
	res.header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, DELETE, HEAD,PUT')
	// res.header('Access-Control-Allow-Methods', '*')
	res.header("Access-Control-Max-Age", "3600")
	res.header('Access-Control-Allow-Credentials', 'true')//允许cookies
	res.header('X-Powered-By', ' 3.2.1')
	next();
})
// app.options('*', function (req,res,next) { res.sendStatus(200); next()});

const aa = require('./utils/dataFormat.js');
app.use(aa);

//路由
const mount = require('mount-routes');
mount(app,path.join(__dirname,'router'),true);

// app.get('/',function(req,res){
// 	console.log('/ 路径请求');
// 	res.end('hello');
// })

//初始花数据库连接
const db = require('./utils/database.js');
db.initdatabase();
// const Mdb = require('./utils/databaseMongoDB.js');
// Mdb.initDatabaseMongoDB();

//上传图片
const upload = multer({dest: __dirname + '/../upload'});
//post的FormData为file
app.post('/upload',upload.single('file'),function(req,res){
	const file = req.file;
	file.url = 'http://localhost:3000/upload/'+file.filename;
	res.send(file);
})

app.listen(3000);
console.log('后端项目启动成功，端口号：3000');
