let http = require("http");
let options = {
	hostname : "127.0.0.1",
	port : 1334,
	path : "/",
	method : "GET"
};
let req = http.request(options,function(){
	console.log('status:' + res.statusCode);
	console.log('headers:' + JSON.stringfy(res.headers));
	res.setEncoding('utf8');
	res.on('data',function(chunk){
		console.log(chunk);
	});
});

req.end();