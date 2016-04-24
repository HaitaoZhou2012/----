//获取obj对象某属性当前具体值
function getStyle(obj, type){
	if(obj.currentStyle){//IE浏览器
		return obj.currentStyle[type];
	}else{//Firefox浏览器
		return getComputedStyle(obj,false)[type];
	}
}

//使用JSON实现多属性同时运动
//startMove(obj,{type1:iTarget1, type2:iTarget2, type3:iTarget3},fn)
function startAct(obj,json,fn){//obj指作用对象，type指被改变的属性，ITarget指改变的目标值
	//初始化清除定时器
	clearInterval(obj.timer);
	obj.timer = setInterval(function(){
		var flag = true; //假设属性都到达目标值
		for(var type in json){
			//1、获取对象当前属性的值
			var oStyleValue = 0; 
			//如果传入是透明度变化
			if(type == "opacity"){
				oStyleValue = Math.round(parseFloat(getStyle(obj,type))*100);
			}else{
				oStyleValue = parseInt(getStyle(obj,type));
			}

			//2、算速度   *用json[type]指代iTarget的值
			var speed = (json[type]-oStyleValue)/8;
			//判断速度正负情况下的取值
			speed = speed>0? Math.ceil(speed):Math.floor(speed);
			
			//3、检测运动停止
			if(oStyleValue != json[type]){//判断对象是否运行到目标值
				flag = false;
			}
			if(type == "opacity"){
				obj.style.filter = "alpha(opacity:"+(oStyleValue+speed)+")";
				obj.style.opacity = (oStyleValue+speed)/100;
			}else{
				obj.style[type] = oStyleValue + speed +"px";	
			}
		}
		if(flag){
			clearInterval(obj.timer);
			if(fn){
				fn();
			}
		}

		
	},30);
}

