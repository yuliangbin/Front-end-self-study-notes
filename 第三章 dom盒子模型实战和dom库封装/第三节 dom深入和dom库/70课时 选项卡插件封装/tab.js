(function () {
	/*
	 * tabChange:封装一个选项卡的插件，只要大致结构一致，以后实现选项卡的功能，只需要调取这个方法执行即可
	 * container：当前要实现选项卡的这盒子
	 * defaultIndex:默认选中项索引
	*/
	function tabChange(container,defaultIndex) {
		var tabFirst = tools.firstChild(container),oList = tools.children(tabFirst);divList = tools.children(container,'div');
		//让defaultIndex对应的选项卡选中
		defaultIndex = defaultIndex || 0;
		tools.addClass(oList[defaultIndex],'select');
		tools.addClass(divList[defaultIndex],'select');
		for (var i = 0; i < oList.length; i++) {
			oList[i].onclick = function () {
				tools.addClass(this,'select');
				var siblings = tools.siblings(this);
				for (var i = 0; i < siblings.length; i++) {
					tools.removeClass(siblings[i],'select');
				}
				var index = tools.index(this);
				for (var i = 0; i < divList.length; i++) {
					i == index ? tools.addClass(divList[i],"select") : tools.removeClass(divList[i],"select");
				}
				
			}
		}
	}
	window.tabChange = tabChange;
})()