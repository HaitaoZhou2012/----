window.onload = function(){
	var aLi = document.getElementsByTagName('li');
	var timer = null;

	for(var i=0; i<aLi.length; i++){
		aLi[i].timer = null;
		aLi[i].onmouseover = function(){
			startMove(this, 400);
		}
		aLi[i].onmouseout = function(){
			startMove(this, 200);
		}
	}
}


function startMove(obj,iTarget){
	clearInterval(obj.timer);
	var speed = 10;
	obj.timer = setInterval(function(){
		//先定义变量存放当前对象的“宽度”属性
		oWidth = parseInt(getStyle(obj,"width"));
		//设置缓存动作效果的速度
		speed = speed>0?Math.ceil((iTarget - oWidth)/10):Math.floor((iTarget - oWidth)/10);
		if( oWidth== iTarget){
			clearInterval(obj.timer);
		}else{
			//alert(obj.style.width);
			obj.style.width = oWidth+speed+"px";
		}
	},20);
}

/*
获取容器某个具体的样式：
	obj.currentStyle[type]; 针对IE浏览器
	getComputedStyle(obj, false)[type]; 针对FireFox浏览器
*/
function getStyle(obj,type){
	if(obj.currentStyle){
		return obj.currentStyle[type];
	}else{
		return getComputedStyle(obj,false)[type];
	}
	//注意，返回值包含“px”单位，要取得数值则需要用parseInt()处理
}