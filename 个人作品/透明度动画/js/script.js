window.onload = function(){
	var timer = null;//记录定时器
	var alpha = 30;//因为无法直接通过对象获取到alpha属性值，所以在这里先定义并赋予默认值
	//多样例
	var oDiv = document.getElementsByTagName("div");
	for(var i=0; i<oDiv.length; i++){
		//对于多样例实现来说，公有属性alpha会导致冲突，所以给每个样例赋予默认值30
		oDiv[i].alpha = 30;
		//当鼠标移入时，目标透明度变为100
		oDiv[i].onmouseover = function(){
			startMove(this,100);
		}
		//当鼠标移出时，目标透明度变为30
		oDiv[i].onmouseout = function(){
			startMove(this,30);
		}	
	}	
}

function startMove(obj,iTarget){
	//初始化工作，先清除定时器
	clearInterval(obj.timer);
	obj.timer = setInterval(function(){
		if(obj.alpha > iTarget){
			var speed = -10;
		}else{
			var speed = 10;
		}
		if(obj.alpha == iTarget){
			clearInterval(obj.timer);
		}else{
			obj.alpha += speed;
			obj.style.filter = "alpha(opacity:"+obj.alpha+")";
			obj.style.opacity = obj.alpha/100;
		}

	},30);
}