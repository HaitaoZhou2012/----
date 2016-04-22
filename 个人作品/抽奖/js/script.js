var data = ["Phone5","Ipad","三星笔记本","佳能相机","惠普打印机","谢谢参与","50元充值卡","1000元超市购物卷"];//存放抽奖内容
var timer = null,//存放定时器
	flag = 0;//存放回车键状态

window.onload = function () {
	var play = document.getElementById("play"),
		stop = document.getElementById("stop");

	//开始抽奖
	play.onclick = playFun;
	//停止抽奖
	stop.onclick = stopFun;
	/**************************/
	//用键盘回车控制开始抽奖和停止抽奖
	//键盘事件“keyDown、keyPress、keyUp”
	document.onkeyup = function(event){
		event = event || window.event;
		//event对象的keyCode属性用于得到键盘对应键的键码值	
		if(event.keyCode == 13){//回车键码值为13
			if(flag==0){//flag用来记录回车键状态，值为0则表示第一次回车
				playFun();
				flag = 1;
			}else{
				stopFun();
				flag = 0;//恢复flag为0表示这是第一次敲回车
			}
		}

	}

}

//开始抽奖
function playFun(){
	var title = document.getElementById("title"),
		play = document.getElementById("play");
	//每次加载此方法时要清除定时器，避免二次点击导致定时器速度累加
	clearInterval(timer);
	//定时器
	timer = setInterval(function(){
		//每隔50毫秒生成随机数，随机数范围在0到data数组的长度内
		var random = Math.floor(Math.random()*data.length);//floor向下取整
		//console.log(random);
		//根据随机数找到对应的数组项
		title.innerHTML = data[random];
	},50);//每隔50毫秒调用函数
	//点击开始后改变按钮背景颜色
	play.style.background = "#999"; 

}
//停止抽奖
function stopFun(){
	//清除定时器便实现停止开始方法
	clearInterval(timer);
	var play = document.getElementById("play");
	play.style.background = "#036";
}