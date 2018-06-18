(function () {
	//createXHR:创建AJAX对象，兼容所有的浏览器
	function createXHR() {
		var xhr = null,
			flag = false,
			arr = [
				function () {
					return new XMLHttpRequest;
				},
				function () {
					return new ActiveXObject("Microsoft.XMLHTTP");
				},
				function () {
					return new ActiveXObject("Msxm12.XMLHTTP");
				},
				function () {
					return new ActiveXObject("Msxm13.XMLHTTP");
				}
			];
		for (var i = 0; i < arr.length; i++) {
			var curFn = arr[i];
			try {
				xhr = curFn();
				//本次循环获取的方法没有出现错误：说明此方法是我想要的，我们下一次直接执行这个方法即可，，这就需要我把createXHR重写为本次循环得到的方法(完成后不需要再判断下面的，直接退出循环即可)
				createXHR = curFn;
				flag = true;
				break;
			} catch (e) {
				//本次循环获取的方法执行时出现错误：继续执行下一次循环
			}
			if (!flag) {
				throw new Error("your browser is not support ajax,please change your browser,try again!")
			}
			return xhr;
		}
	}

	//ajax:实现AJAX请求的公共方法：当一个方法传递的参数值过多，而且不固定，我们使用对象统一传值法(需把要传递的参数值都先放在一个对象中，一起传递进去即可)
	function ajax(options) {
		var _default = {
			url : "", //请求的地址
			type : "get",	//请求的方式
			dataType : "json",	//设置请求回来的内容格式"json"：就是json格式的对象。"txt"就是字符串或json格式的字符串
			async : true,	//请求是同步还是异步
			data : null,	//放在请求主体中的内容(POST)
			getHeaders : null,	//当READYSTATE===2时执行的回调函数;若写的是一个函数function () {"code goes there";};//this-> xhr当前Ajax对象
			success : null	//当readystate===4时执行的回调函数；若写的是一个函数function (data) {"code goes there";};//this-> xhr当前Ajax对象，参数data表示我们从服务器获取的主体内容
		}
		for (var key in options) {
			if (options.hasOwnProperty(key)) {
				_default[key] = options[key];
			}
		}
		//如果当前的请求方式是GET，我们需要在URL的末尾添加随机数清除缓存
		if (_default[type] === "get") {
			_deauult[url].indexOf("?") >= 0 ? _default[url] += "&" :_default[url] += "?";
			_default[url] += "_=" + Math.random(); 
		}
		var xhr = createXHR();
		xhr.open(_default[type],_default[url],_default[async]);
		xhr.onreadystatechange = function () {
			if (/^2\d{2}$/.test(xhr.status)) {
				//想要在readystate=2的时候做一些操作，需要保证ajax是异步请求
				if (xhr.readyState === 2) {
					if (typeof(_default[getHeaders]) === "function") {
						_default[getHeaders].call(xhr);
					}
					
				}
				if (xhr.readyState == 4) {
					var val = xhr.responseText;
					//如果传递进来的值是"json".说明获取的应该是json格式的对象
					if (_default.dataType === "json") {
						val = "JSON" in window ? JSON.parse(val) : eval("(" + val + ")");
					}
					if (typeof(_default[success]) === "function") {
						_default[success].call(xhr,val);
					};//_default[success] && _default[success].call(xhr,val);
					
				}
			}
		}
		xhr.send(_default[data]);//向请求主体传内容，但open方法中必须使用post请求方式
	}
	window.ajax = ajax;
})();

