window.onload = function(){
	var menu_btn = document.getElementById("menu");
	var menu = document.getElementById("menu-content");
	var remove = document.getElementById("remove");
	//获取浏览器窗口宽
	var winWidth = document.body.clientWidth;

	/*当点击侧边栏按钮时*/
	menu_btn.onclick = function(e){
		//清除事件冒泡
		e = e || window.event;
		if(e.stopPropagation){
			e.stopPropagation();
		}else{
			e.cancelBubble = true;
		}
		//触发menu的运动
		startMove(menu,winWidth-230);
	}
	remove.onclick = function(e){
		e = e || window.event;
		if(e.stopPropagation){
			e.stopPropagation();
		}else{
			e.cancelBubble = true;
		}
		startMove(menu,winWidth);
	}
	document.body.onclick = function(e){
		e = e || window.event;
		if(e.stopPropagation){
			e.stopPropagation();
		}else{
			e.cancelBubble = true;
		}
		startMove(menu,winWidth);
	}

}



function startMove(obj,iTarget){
	clearInterval(obj.timer);
	var speed = 0;
	obj.timer = setInterval(function(){
		speed = speed>0?Math.ceil((iTarget - obj.offsetLeft)/5):Math.floor((iTarget - obj.offsetLeft)/5);
		if(obj.offsetWidth == iTarget){
			clearInterval(obj.timer);
		}else{
			obj.style.left = obj.offsetLeft + speed +"px";
		}
	},30);
	//alert(menu.offsetLeft);
}