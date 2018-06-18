var http = require("http"),
	url = require("url"),
	fs = require("fs");
var server1 = http.createServer(function (req,res) {
	var urlObj = url.parse(req.url,true),
		pathname = urlObj.pathname,
		query = urlObj.query;
	//静态资源文件的处理
	var reg = /\.(HTML|JS|CSS|CIO)/i;
	if (reg.test(pathname)) {
		var suffix = reg.exec(pathname)[1].toUpperCase();
		var suffixMIME = "text/html";
		switch (suffix) {
			case "CSS" :
				suffixMIME = "text/css";
				break;
			case "JS" :
				suffixMIME = "text/javascript";
				break;
		}
		try {
			var conFile = fs.readFileSync("." + pathname,"utf-8");
			res.writeHead(200,{"content-type":suffixMIME + ';charset=utf-8;'});
			res.end(conFile);
		} catch (e) {
			res.writeHead(404,{'content-type':'text/plain;charset=utf-8;'});
			res.end("file is not found");
		}
		return ;
	}
	//API数据借口处理
	var con = null,
		result = null;
		customPath = "./json/custom.json";
	if (pathname === "/getList") {
		con = fs.readFileSync(customPath,"utf-8");
		con.length === 0 ? con = '[]' : null;
		con = JSON.parse(con);//将json格式的字符串转换成json对象，json不能转换空字符串，会报错。
		//开始按照API文档中的规范准备给客户端返回的数据
		result = {
			code : 1,
			msg : "没有任何的客户信息",
			data : null
		};
		if (con.length > 0) {
			result = {
				code : 0,
				msg : "成功",
				data : con
			};
		}
		res.writeHead(200,{'content-type':'application/json;charset=utf-8;'});
		res.end(JSON.stringify(result));//将JSON格式的对象转换成json格式的字符串
		return ;
	}
});
server1.listen(80,function () {
	console.log("server is success,listening on 80 port!");
})