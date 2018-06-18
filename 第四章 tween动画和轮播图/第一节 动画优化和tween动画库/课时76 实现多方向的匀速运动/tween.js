var tween = (function () {
	
	//封装一个线性运动的函数，t表示time:已经运动的时间,b表示beginLocation:开始运动时的位置,c表示运动的总距离,d表示duration:总共运动多长时间
	//返回值为运动时间为time时所在的位置
	function Linear(b,c,t,d) {
		return c * t / d + b;
	}
	
	//实现多方向的匀速运动，curEle:当前要操作的元素，target：要运动到的目标位置，存储的是每一个方向的目标位置(left,top),duration:当前动画运动的总时间
	function move() {
		
	}
	
	
	return {
		Linear : Linear,
		
		
	}
	
})()