
function startAct(obj,type,iTarget,fn){//obj指作用对象，type指被改变的属性，ITarget指改变的目标值
	//初始化清除定时器
	clearInterval(obj.timer);

	var speed = 0;//定义速度
	obj.timer = setInterval(function(){
		if(type == "alpha"){//如果是透明度变化
			if(obj.alpha > iTarget){
				speed = -10;
			}else{
				speed = 10;
			}
			if(obj.alpha == iTarget){
				clearInterval(obj.timer);
			}else{
				obj.alpha = obj.alpha+speed;
				obj.style.filter = "alpha(opacity:"+obj.alpha+")";
				obj.style.opacity = obj.alpha/100;	
			}
		}else{//如果不是透明度变化
			//获取对象容器当前属性的值
			var oStyleValue = parseInt(getStyle(obj,type));
			//判断速度正负情况下的取值
			speed = speed>0 ? Math.ceil((iTarget-oStyleValue)/5) : Math.floor((iTarget-oStyleValue)/5);
			//判断对象是否运行到目标值
			if(oStyleValue == iTarget){
				clearInterval(obj.timer);
				if(fn){
					fn();
				}
			}else{
				obj.style[type] = oStyleValue + speed +"px";				
			}
				
		}
	},30);
}

//获取obj对象某属性当前具体值
function getStyle(obj, type){
	if(obj.currentStyle){//IE浏览器
		return obj.currentStyle[type];
	}else{//Firefox浏览器
		return getComputedStyle(obj,false)[type];
	}
}