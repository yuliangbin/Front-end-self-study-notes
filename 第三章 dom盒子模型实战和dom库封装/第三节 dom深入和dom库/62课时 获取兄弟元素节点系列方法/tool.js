//使用惰性思想(JS高级编程技巧之一)来封装我们的常用方法库：在第一次给utils赋值的时候，已经把兼容给处理好了，把最后的结果存放在flag变量中，以后在每一个方法中，只要是IE6-8不兼容的，我们不需要重复验证,只需要使用flag的值即可。
var tools = (function () {
	var flag = "getComputedStyle" in window;
	
	//将一个类数组或数组转换成数组的格式
	function listToArray(likeArr) {
			var arr = [];
			try {
				arr = Array.prototype.slice.call(likeArr,0);
				//IE9-8下不兼容dom元素的集合
			} catch (e) {
				for (var i = 0;i < likeArr.length; i ++) {
					arr[arr.length] = likeArr[i];
				}
			}
			return arr;
		}
	
	//获取curEle下所有的元素子节点(兼容所有浏览器)，如果传递了target,可以在获取集合中进行二次筛选，把指定的标签名target获取到
	function children(curEle,target) {
		var arr = [];
		//IE6-8不能使用内置的children属性，自己写代码实现
		if (/MISE (6|7|8)/i.test(navigator.userAgent)) {
			var nodeList = curEle.childNodes;
			var len = nodeList.length;
			for (var i = 0; i < len; i ++) {
				if (nodeList[i].nodeType === 1) {
					arr[arr.length] = nodeList[i];
				}
			}
		} else {
			//标准浏览器中，我们直接使用children即可，但是这样获取到的是一个元素集合(类数组)，为了与IE上的数组保持一致，实现把类数组转换成数组
			arr = Array.prototype.slice.call(curEle.children);//arr = this.listToArray(curEle.children)
		}
		//二次筛选
		if (typeof(target) === 'string') {
			for (var i = 0; k < arr.length; k ++) {
				var curEleNode = arr[k];
				if (curEleNode.nodeName.toLowerCase() !== target.nodeName.toLowerCase()) {
					//不是我想要的标签
					arr.splice(k,1);
					k--;//后面元素向前移，所以索引减1
				}
			}
		}
		return arr;
	 }
	
	//获取上一个哥哥元素节点
	function prev(curEle) {
		if (flag) {
			return curEle.previousElementSibling;
		}
		var pre = curEle.previousSibling;
		while(pre && pre.nodeType !== 1) {
			pre = pre.previousSibling;
		}
		return pre;
	}
	
	//next：获取下一个弟弟元素节点
	function next(curEle) {
		if (flag) {
			return curEle.nextElementSibling;
		}
		var next = curEle.nextSibling;
		while(next && next.nodeType !== 1) {
			next = next.nextSibling;
		}
		return next;
	}
	
	//获取所有的哥哥元素节点
	function prevAll(curEle) {
		var arr = [];
		var pre = this.prev(curEle);//prev(curEle)
		while(pre) {
			arr.unshift(pre);//将每一次加进来的元素节点放在数组的第一位
			pre = this.prev(prev);
		}
		return arr;
	}
	
	//nextAll:获取所有的弟弟节点
	function nextAll(curEle) {
		var next = this.next(curEle);
		var arr = [];
		while(next) {
			arr.push(next);
			next = this.next(next);
		}
		return arr;
	}
	
	//sibling:获取相邻的两个元素节点,返回一个数组，第一位表示前一个元素节点，第二位表示后一个元素节点。若不存在则显示null
	function sibling(curEle) {
		var prev = this.prev(curEle);
		var next = this.next(curEle);
		var arr = [];
		//prev ? arr.push(prev) : null;
		//next ? arr.push(next) : null;
		arr.push(prev);
		arr.push(next);
		return arr;
	}
	
	return {
		listToArray : listToArray,
		children : children,
		prev : prev,
		next : next,
		prevAll : prevAll,
		nextAll : nextAll,
		sibling : sibling,
		
	}
		
})()