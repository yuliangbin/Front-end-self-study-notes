//导入3个常用的内置模块
var http = require('http'),
	fs = require("fs"),
	url = require('url');
	//URL中提供了一个方法url.parse()用来解析URL地址
//http.createServer:创建一个服务，变量server就是我们创建出来的服务。
//server.listen:为这个服务监听一个端口
var server = http.createServer(function (request,response) {
	//当客户端向当前服务器(端口号为80的这个服务)发送了一个请求，并且当前服务器已经成功接受到这个请求后执行这个回调函数。还给这个函数传递了两个参数
	//request:存放的是所有客户端的请求信息，包含客户端通过问号传参的方式传递给服务器的数据内容
	//response:存放的是客户端返回的内容和数据的方法
	//console.log("有人访问服务的80号端口了！")
	var urlObj = url.parse(request.url,true),
		pathName = urlObj.pathname,
		query = urlObj.query;
	if (pathName === "/1.html") {
	//根据请求的URL地址(具体的是根据地址中的pathname获取到对应的资源文件的源代码)
		var con = fs.readFileSync("./1.html","utf-8");
		//fs.readFileSync([path+name],[encode]):同步读取指定文件中的内容
		//同步读取：文件中的内容读取完成后才执行下面的操作
		//response.writeHead(200,{"Content-Type":"text/html"});
		response.write(con);//向客户端返回内容
		response.end();//告诉服务器响应结束
	}
	//console.log(111);
	
});

server.listen(80,function () {
	//当端口号监听成功执行之后执行这个回调函数
	console.log('server is create success,listening on 80 port!');
});