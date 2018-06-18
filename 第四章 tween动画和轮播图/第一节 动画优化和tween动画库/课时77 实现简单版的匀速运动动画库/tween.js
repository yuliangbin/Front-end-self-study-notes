var tween = (function () {
	
	//封装一个线性运动的函数，t表示time:已经运动的时间,b表示beginLocation:开始运动时的位置,c表示运动的总距离,d表示duration:总共运动多长时间
	//返回值为运动时间为time时所在的位置
	function Linear(b,c,t,d) {
		var val = (c * t / d + b);
		return val;
	}
	
	//实现多方向的匀速运动，curEle:当前要操作的元素，target：要运动到的目标位置，存储的是每一个方向的目标位置(left,top),duration:当前动画运动的总时间
	function move(curEle,target,duration) {
		//根据target获取每一个方向的起始值begin和总距离change
		var begin = {},change = {},Loc = {};
		for (var key in target) {
			if (target.hasOwnProperty(key)) {
				begin[key] = tools.css(curEle,key);
				change[key] = target[key] - begin[key];
			}
		}
		var time = 0
		curEle.timer = setInterval(function () {
			time += 10;
			if (time >= duration) {
				tools.css(curEle,target);
				clearInterval(curEle.timer);
				return;
			}
			for (var key in target) {
				if (target.hasOwnProperty(key)) {
					var curP = (change[key] * time / duration + begin[key]);
					//Loc[key] = curP;
					tools.css(curEle,key,curP);
				}
					
			}
			//tools.css(curEle,Loc);
			
		},100)
	}
	
	
	return {
		Linear : Linear,
		move : move,
		
	}
	
})()