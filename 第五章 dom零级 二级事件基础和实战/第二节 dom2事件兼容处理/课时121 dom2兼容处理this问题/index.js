(function () {
	

	//bind 给当前元素的某一个行为绑定方法
	function bind(curEle,eventType,eventFn) {
		if ('addEventLiatener' in document) {
			curEle.addEventListener(eventType,eventFn,false);
			return ;
		}
		var tempFn = function () {
			eventFn.call(curEle));
		}
		tempFn.photo = eventFn;
		if (!curEle['myBind' + eventType]) {
			curEle['myBind' + eventType] = [];
		}
		var arr = curEle['myBind' + eventType];
		for (var i = 0; i < arr.length; i ++) {
			if (arr[i].photo == 'eventFn') {
				return ;
			}
		}
		curEle['myBind' + eventType].push = tempFn;
		curEle.attachment('on' + eventType,tempFn);
	}
		//div.attachEvent('onclick',fn1.call(div));绑定的时候就把方法fn1给执行了，把其返回值undefined给我们的onclick行为
		//div.attachEvent('onclick',fn1.call(div));在Function类的原型链上除了call和apply可以改变this指向，bind方法也可以改变this指向，与前两者不同的是，使用bind方法只是改变this指向，而不执行fn1方法。但是bind方法在IE上不兼容，所以不考虑
	}

	//unbind 给当前元素的某一个行为移除某一个方法
	function unbind(curEle,eventType,eventFn) {
		if (document.removeEventListener) {
			curEle.removeEventListener(eventType,eventFn,false);
		}
		var arr = curEle['myBind' + eventType];
		if (arr  && arr instanceof Array) {
			for (var i = 0; i < arr.length; i ++) {
			if (arr[i].photo == eventFn) {
				arr.splice(i,1);
				curEle.detachEvent('on' + eventType,arr[i]);
				break ;//return;
				}
			}
		}
	}

	//考虑一下，若先不执行bind()就直接执行unbind(),会出现什么情况。很显然，若直接执行unbind(),代码var arr = curEle['myBind'];结果为arr = undefined;因为'myBind'属性是在bind()方法中定义的，若没有定义值就为undefined,而for循环中执行arr.length就会报错。

	/* 编写自己的事件池函数即绑定后只要点击相应事件，方法就会依次执行 */
	function on(curEle,eventType,eventFn) {
		if (!curEle['myEvent' + eventType]) {
			curEle['myEvent' + eventType] = [];
		}
		var arr = curEle['myEvent' + eventType];
		arr.push(eventFn);
		bind(curEle,eventType,run);
	}

	function run(e) {
		e = e || window.event;
		//为了后期方便每个绑定的方法使用事件对象方便，我们同意把事件对象兼容处理掉
		var flag = e.target ? true : false ;
		if (!flag) {
			e.target = e.srcElement;
			e.pageX = e.clientX + document.documentElement.scrollLeft;
			e.pageY = e.clentY +document.documentElement.scrollTop;
			e.preventDefault = function () {
				e.returnValue = false ;
			}
			e.stopPropagation = function () {
				e.cancleBubble = true ;
			}
		}
		var arr = this['myEvent' + e.type];
		
		for (var i = 0; i < arr.length; i ++) {
			if (typeof(arr[i]) === 'function') { //解决数组塌陷问题
				arr[i].call(this，e);
			} else {
				arr[i].splice(i,1);
				i-- ;
			}
			
			//因为在内置的事件池中绑定的方法执行的时候，this都是当前要操作的元素，并且浏览器还会给其传递一个事件对象：而我们自己创建的容器中存储的所有的方法其实都相当于给当前元素绑定的事件，为了和内置的统一，我们也让其执行的时候this指向的是当前元素，并且也给它传递一个事件对象
		}
	}

	//移除自定义事件池中的事件
	function off(curEle,eventType,eventFn) {
		var arr = curEle['myEvent' + eventType];
		if (arr && arr instanceof Array) {
			for (var i = 0; i < arr.length; i ++) {
				if (arr[i] == eventFn) {
					arr[i] = null;
					return ;
				}
			}
		}
	}
	return window.tool = {
		on:on,
		off:off,
	}
})();





























