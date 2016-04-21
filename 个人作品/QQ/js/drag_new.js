//封装函数，通过className和父元素id获取该className的元素对象
function getByClass(claName, parentId){
	var parent = document.getElementById(parentId);
	//获取父元素下的所有标签
	var elements = parent.getElementsByTagName("*");
	var claNames = [];
	for(var i=0; i<elements.length; i++){
		if(elements[i].className == claName){
			claNames.push(elements[i]);
		}
	}
	//alert(claNames.length);
	return claNames;

}

//初始化加载页面调用拖曳函数
window.onload = drag;

//拖曳函数
function drag(){
	//获取点击拖曳部分
	var oTitle = getByClass('login_logo_webqq','loginPanel')[0];
	//点击移动事件
	oTitle.onmousedown = onDown;
	//点击关闭事件
	var closeId = document.getElementById("ui_boxyClose");
	closeId.onclick = close;

	//点击状态切换
	stateChange();


}

function onDown(event){
	event = event || window.event;
	//点击事件获取点击处的鼠标位置
	var oTab = document.getElementById("loginPanel");
	var disX = event.clientX-oTab.offsetLeft,//鼠标坐标距离容器边缘的长度
		disY = event.clientY-oTab.offsetTop;
	//点击后移动函数
	document.onmousemove = function(event){
		event = event || window.event;
		onMove(event,disX,disY);
	}
	//点击后松开函数
	document.onmouseup = function(){
		document.onmousemove = null;
	}
}
//移动函数
function onMove(event,mX,mY){
	var oTab = document.getElementById("loginPanel");
	//定义面板在包含光标位置的坐标
	var divX = event.clientX-mX,
		divY = event.clientY-mY;
	//定义窗口宽高
	var winW = document.documentElement.clientWidth,
		winH = document.documentElement.clientHeight;
	//定义面板在窗口中移动的最大范围
	var maxW = winW - oTab.offsetWidth,
		maxH = winH - oTab.offsetHeight;
	oTab.style.top = divY+"px";
	oTab.style.left = divX+"px";
	if(divX<0){
		oTab.style.left = 0;
	}else if(divX>maxW){
		oTab.style.left = maxW-10+"px";
	}
	if(divY<0){
		oTab.style.top = 10+"px";
	}else if(divY>maxH){
		oTab.style.top = maxH+"px";
	}
}

//关闭函数
function close(){
	var oTab = document.getElementById("loginPanel");
	oTab.style.display="none";
}

//状态切换函数
function stateChange(){
	var loginState = document.getElementById("loginState");
	var stateList = document.getElementById("loginStatePanel");
	var lis = stateList.getElementsByTagName("li");
	var loginStateShow = document.getElementById("loginStateShow");
	var stateTxt = document.getElementById("login2qq_state_txt");

	//点击状态区展示状态栏
	loginState.onclick = function(e){
		//阻止浏览器事件冒泡
		e = e || window.event;
		if(e.stopPropagation){
			e.stopPropagation();
		}else{
			e.cancelBubble = true;
		}
		stateList.style.display = "block";
	}
	//当鼠标在状态列表动作，先遍历列表
	for(var i=0; i<lis.length; i++){
		//鼠标经过改变列表背景颜色
		lis[i].onmousemove = function(){
			this.style.backgroundColor = "#567";
		}
		//鼠标移开列表改变背景颜色
		lis[i].onmouseout = function(){
			this.style.backgroundColor = "#fff";
		}
		//鼠标点击选项时
		lis[i].onclick = function(e){
			//1、将列表内容传入状态区
			var li_id = this.id; //获取被选中的li的id
			loginStateShow.className = "login-state-show "+li_id;
			stateTxt.innerHTML = getByClass("stateSelect_text",li_id)[0].innerHTML;

			//2、将状态列表隐藏
			//阻止浏览器事件冒泡
			e = e || window.event;
			if(e.stopPropagation){
				e.stopPropagation();
			}else{
				e.cancelBubble = true;
			}
			stateList.style.display = "none";
		}

	}
	//点击其他区域隐藏状态列表
	document.onclick = function(){
		stateList.style.display = "none";
	}


}