window.onload = function(){
			//先获取相应对象
			var container = document.getElementById("container");
			var list = document.getElementById("list");
			var buttons = document.getElementById("buttons").getElementsByTagName("span");
			var prev = document.getElementById("prev");
			var next = document.getElementById("next");
			var index=1;
			var animated = true;//记录切换动画的运行状态\
			var timer = null;//存放定时器

			//添加各个事件
			 //点击箭头切换图片
			prev.onclick = function(){/*左箭头*/
				//切换图片
				if(animated){
					animate(600);
				}
				//即时高亮小圆点
				index--;
				if(index<1){ index=5;}
				showButton();
			}

			next.onclick = function(){/*右箭头*/
				//切换图片
				if(animated){
					animate(-600);
				}
				//即时高亮小圆点
				index++;
				if(index>5){ index=1;}
				showButton();
			}	
			
			//添加按钮点击切图事件
			for(var i=0; i<buttons.length; i++){
				buttons[i].onclick = function(){
					//每次点击后优化，如果点击为当前已选中位置则不执行下面的代码
					if(this.className=="on"){
						return;
					}

					//改变当前位置按钮的样式
					for(var i=0; i<buttons.length; i++){
						buttons[i].className="";
					}
					this.className="on";

					//获取当前list的left值
					nowLeft = list.offsetLeft;
					//获取每个按钮对应的index属性值（即图片位置）
					var myIndex = parseInt(this.getAttribute("index"));
					//获取切换位置与当前位置的差距
					var offset = -600*(myIndex-index);
					if(animated){
						animate(offset);//图片切换
					}
					index = myIndex;//切换图片后要把记录位置的index改为当前的位置
					//debugger;
				}
			}

			//在鼠标移到轮播图区域时停止自动切换
			container.onmouseover = function(){
				stop();
			}

			//在鼠标移开时自动开始轮播图切换
			container.onmouseout = function(){
				play();
			}

			//在页面加载最开始就自动播放
			play();

			/*--------------------------------------------*/
			//图片切换方法
			function animate(offset){
				animated = false;
				var time = 300;//位移总时间
				var interval = 10;//位移间隔时间
				var speed = offset/(time/interval);//每次位移量
				var nowLeft = list.offsetLeft + offset;

				go();

				//开始切换图片方法
				function go(){
					if((speed<0 && list.offsetLeft>nowLeft) || (speed>0 && list.offsetLeft<nowLeft)){
						list.style.left = list.offsetLeft + speed +"px";
						setTimeout(go, interval);
					}else{
						animated = true;
						//当list到最左边时，强制切换为图5的位置
						if(list.offsetLeft > -600){/*list向右*/
							list.style.left = -3000 +"px";
						}
						//当list到最右边时，强制切换为图1的位置
						if(list.offsetLeft < -3000){
							list.style.left = -600 +"px";
						}	
					}

				}
				
			}

			//自动切换
			function play(){
				timer = setInterval(function(){
					next.onclick();
				},2000);//每隔2秒开始运动
			}

			//停止切换
			function stop(){
				clearInterval(timer);
			}

			//亮小圆点方法
			function showButton(){
				for(var i=0; i<buttons.length; i++){
					buttons[i].className="";
				}
				buttons[index - 1].className = "on";
			}
			/************************************************/
		}