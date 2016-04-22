
window.onload = function(){
	var div1 = document.getElementById("div1");
	var span = div1.getElementsByTagName("span")[0];
	var timer = null;
	//当鼠标移动到span上时
	div1.timer = null;
	div1.onmouseover = function(){
		//alert("ok");
		startMove(this,0);
	}
	div1.onmouseout = function(){
		startMove(this,-200);
	}
}
//封装运动函数
function startMove(obj,iTarget){ //速度和目标值
	clearInterval(obj.timer);
	//定义速度（缓存效果的速度）
	var speed = 0;
	//使用定时器连续移动
	obj.timer = setInterval(function(){
		//设置带缓存效果的速度，如果速度大于0向下取整，小于0向下取整
		speed = speed>0?Math.ceil((iTarget - obj.offsetLeft)/5):Math.floor((iTarget - obj.offsetLeft)/5);
		//做判断是否到达目标长度
		if(obj.offsetLeft == iTarget){
			clearInterval(obj.timer);
		}else{
			obj.style.left = obj.offsetLeft + speed + "px";	
		}
	},30);

}
