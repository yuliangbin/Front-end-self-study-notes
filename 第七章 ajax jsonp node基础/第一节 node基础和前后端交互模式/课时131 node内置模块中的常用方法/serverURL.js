var url = require("url");
var str = "http://192.168.0.109:80/index.html?name=zhufeng&age=7";
querys = url.parse(str,true)
query = querys.query;
console.log(url.parse(str,true));
console.log(query.age);
/*返回一个对象
	Url {
	  protocol: 'http:', //传输协议
	  slashes: true, 
	  auth: null,
	  host: '192.168.0.109:80', //域名 + IP
	  port: '80',	//端口号
	  hostname: '192.168.0.109',	//域名(IP)
	  hash: null,	//哈希值
	  search: '?name=zhufeng&age=7',	//问号 + 传递进来的数据
	  query: 'name=zhufeng&age=7',	//传递进来的数据
	  pathname: '/index.html',	//请求文件的路径及名称
	  path: '/index.html?name=zhufeng&age=7',	路径名称 + 传递的数据
	  href: 'http://192.168.0.109:80/index.html?name=zhufeng&age=7' }	//原始的url地址
*/
//console.log(url.parse(str,true)); //增加true后，query中存储的是经过处理解析后的结果，把传递进来的对组数据以键值对的方式进行存储
/*
	Url {
	  ....
	  query: { name: 'zhufeng', age: '7' },
	  ....
	}
*/