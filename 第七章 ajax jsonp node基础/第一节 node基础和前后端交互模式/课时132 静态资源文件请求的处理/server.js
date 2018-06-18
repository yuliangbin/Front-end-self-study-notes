var http = require("http"),
	url = require("url"),
	fs = require("fs");
//创建一个服务
var server1 = http.createServer(function (req,res) {
	var urlObj = url.parse(req.url,true),
		pathname = urlObj["pathname"],
		query = urlObj["query"];
	//处理静态资源文件的请求(HTML/CSS/JS...) => 前端路由：请求什么，服务器就向客户端返回什么
	var reg = /\.(HTML|JS|CSS|JSON|TXT|ICO)/i;
	if (reg.test(pathname)) {
		//获取请求文件的后缀名
		var suffix = reg.exec(pathname)[1].toUpperCase();
		//根据请求文件的后缀名获取到当前文件的MIME类型
		var suffixMIME = "text/plain";
		switch(suffix) {
			case "HTML":
				suffixMIME = "text/html";
				break;
			case "CSS":
				suffixMIME = "text/css";
				break;
			case "JS":
				suffixMIME = "text/javascript";
				break;
			case "JSON":
				suffixMIME = "application/json";
				break;
			case "ICO":
				suffixMIME = "application/octet-stream";
				break;
		}
	}
	try {
		//按照指定目录读取文件中的内容或者代码(读取出来的内容都是字符串格式的)
		var conFile = fs.readFileSync("." + pathname,"utf-8");
		//重写响应头信息：告诉客户的浏览器我返回的内容是什么样的MIME类型，并且指定返回的内容格式是utf-8编码的，返回的中文汉字就不会出现乱码
		res.writeHead(200,{"content-type":suffixMIME + ';charset=utf-8;'});
		res.end(conFile);
	}
	catch (e) {
		res.writeHead(404,{"content-type":"text/plain;charset=utf-8;"});
		res.end("request file is not found!")
	}
		
	
	/*
	//如果客户端亲请求的资源文件不存在，我们不加try catch 的话服务器会终止，这样不好，所以我们加try catch 捕获异常信息，这样即使资源访问的资源不存在，服务器也不会报错，同样也不会终止
	try {
		var con = fs.readFilesync("." + pathname,"utf-8");
		res.end(con);
	} catch (e) {
		res.end("requested file is not find");
	}
	*/
	/*
	if (pathname === "/index.html") {
		var con = fs.readFilesync("./index.html","utf-8");//异步读取为fs.readFile()
		res.end(con);//向客户端返回内容并告诉服务器响应结束。等价于 res.write(con);res.end();
	}
	if (pathname === "/css/index.css") {
		var con = fs.readFilesync("./css/index.css","utf-8");
		res.end(con);
	}
	if (pathname === "/index.html") {
		var con = fs.readFilesync("./js/index.js","utf-8");
		res.end(con);
	}
	*/
});



//为当前的这个服务配置端口
server1.listen(80,function () {
	console.log('server is success,listening on 80 port!')
});






/*
	sync 同步
	async 异步
*/