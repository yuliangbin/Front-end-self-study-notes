let cookieRender = (function () {
	function setValue(options) {//当传入的参数过多时，可以用一个对象的方式传入
		let _default = {
			name: null,
			value: null,
			expires = new Date().getTime() + (1000*60*60*24),
			path: '/',
			domain: ''
		};
		for (let key in options) {
			if (options.hasOwnProperty(key)){
				_default[key] = options[key];
			}
		}
		document.cookie = _default.name + "=" + escape(_default.value) + ";expires=" + _default.expires.toGMTString() + ";path=" + _default.path +  ";domain=" + _default.domain;
		//获取
		function getValue(name) {
			let arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
			if (arr != null) {
				return unescape(arr[2]);
			}
			return null;
		}
		//删除
		/*
		 * 没有删除已有cookie的直接方法。
		 * 所以，需要使用相同的路径、域和安全选项再次设置 cookie，并将失效时间设置为过去的时间。 
		*/
		function removeValue(options) {
			let _default = {
				name: null,
				path: '/',
				domain: ''
			};
			for (key in options) {
				if (options.hasOwnProperty(key)) {
					_default[key] = options[key];
				}
				if (getValue(_default)) {
					document.cokie = _default.name + "= " + ";path=" + _default.path + ";domain=" + _default.domain + ";expires=" + new Date(0);
				}
			}
		}
		return {
			set: setValue,
			get: getValue,
			remove: removeValue
		}
	}
})();