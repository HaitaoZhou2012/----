/*document.getElementsByClassName()方法在IE10以前的浏览器都是不支持的*/
//先封装一个方法用来获取相关class属性元素对象
//思路：通过对应className和它的父元素ID定位这个className的元素
function getByClass(clasName, parent){
    //如果有传父元素过来，让它不要传父元素这个对象而是传父元素的ID，如果没有传父元素过来那么我们就传document
    var oParent = parent?document.getElementById(parent):document;
    var eles=[];
    //获取该父元素下的所有Tag元素elements
    var elements = oParent.getElementsByTagName('*');
    //把父元素数组中的所有Tag元素取出来挨个遍历一遍，看看各元素的className和传进来的clasName是不是一样的
    //如果一样则把找到的这个元素加进eles[]数组
    for(var i=0,l=elements.length; i<l; i++){    
        if(elements[i].className==clasName){
            eles.push(elements[i]);
        }
    }
    //alert(eles.length);
    return eles; //最后返回eles数组
}

//初始化页面加载
window.onload = drag;

//建立拖曳事件函数：
//思路：在标题区域按下 > 要在页面中移动 > 释放鼠标时停止移动
function drag(){
  //1、获取点击拖动的位置：标题区域
    //通过标题的className和标题的父元素id定位这个标题元素对象集，并取第一个作为作用对象
    var oTitle = getByClass('login_logo_webqq','loginPanel')[0];
  //2、拖曳功能
    //给oTitle绑定一个事件onmousedown：在鼠标按下任何按钮时触发
    oTitle.onmousedown = fnDown;//在鼠标按下时调用fnDown函数
    
  //3、关闭
    var oClose = document.getElementById("ui_boxyClose");
    oClose.onclick = close;
    /*---------------------------*/
    //切换状态
    var loginState = document.getElementById("loginState");
    var stateList = document.getElementById("loginStatePanel");
    var lis = stateList.getElementsByTagName("li");
    var stateTxt = document.getElementById("login2qq_state_txt");
    var loginStateShow = document.getElementById("loginStateShow");
    //鼠标点击状态时显示整个状态栏
    loginState.onclick = function(e){
        e = e || window.event;
        //做个浏览器兼容的判断
        if(e.stopPropagation){ //非IE浏览器
            e.stopPropagation();
        }else{ //IE8版本下
            e.cancelBubble = true; 
        }
        stateList.style.display = "block";
    }
    //鼠标滑过、离开、点击状态栏列表选项
    for(var i=0; i<lis.length; i++){
        lis[i].onmouseover = function(){
            this.style.backgroundColor = "#567";
        }
        lis[i].onmouseout = function(){
            this.style.backgroundColor = "#fff";
        }
        //点击列表选项
        lis[i].onclick = function(e){//针对事件捕获行为需要添加一个事件变量
            var lis_id = this.id;
            //1、把选项列表的id传入状态区的class中，把选项列表文字内容传入状态区
            stateTxt.innerHTML = getByClass("stateSelect_text",lis_id)[0].innerHTML;
            loginStateShow.className = "login-state-show "+lis_id;
            
            //2、点击列表选项时整个状态栏隐藏
              //注：因为代码45已经对loginState点击事件显示状态列表
              //    因为浏览器默认事件冒泡，点击stateList的同时也作用了loginState，两个函数之间冲突
                //将默认的事件冒泡改为事件捕获
                e = e || window.event;
                //做个浏览器兼容的判断
                if(e.stopPropagation){ //非IE浏览器
                    e.stopPropagation();
                }else{ //IE8版本下
                    e.cancelBubble = true; 
                }
                //改为事件捕获后，使得点击stateList时不冒泡作用loginState，实现statList隐身
            stateList.style.display = "none";
        }
    }
    //点击外面隐藏列表
    document.onclick = function(e){
               
        stateList.style.display = "none";   
        //注：document点击事件比前面stateList级别更高，不需要做事件冒泡处理
    }


}
/***********************************************************/
/*
//定义fnDown函数：鼠标按下时让对象跟随鼠标坐标(clientX, clientY)
function fnDown(){
  //在页面中移动
    var oDrag=document.getElementById("loginPanel");
    //鼠标按下后 > 在整个页面移动（整个页面用document表示）
      //onmousemove 当鼠标指针在元素内部移动时重复触发函数
    document.onmousemove = function(event){//因为鼠标位置信息都是保存在“事件”的clientX和clientY属性中，所以函数中需要传入一个代表事件的变量
      //event接收鼠标位置信息
        //非IE浏览器直接使用event，IE浏览器得用到window.event
        event = event || window.event;
        //测试：用title接收位置信息
        document.title = event.clientX+','+event.clientY;
        oDrag.style.left = event.clientX+"px";
        oDrag.style.top = event.clientY+"px";
    }
}
*/
/************************************************************/
//鼠标按下函数
function fnDown(event){
    event = event || window.event;
    var oDrag = document.getElementById("loginPanel");
    //定义光标按下时在面板区内部的左、上距离
    var disX = event.clientX-oDrag.offsetLeft,//光标的x坐标 - 面板在窗口左边的距离
        disY = event.clientY-oDrag.offsetTop;
    //移动事件
    document.onmousemove = function(event){
        event = event || window.event;
        fnMove(event,disX,disY); //在鼠标移动时调用移动函数fnMove()
    }
    //鼠标松开按键时释放移动函数
    document.onmouseup = function(event){
      //当鼠标释放就说明onmousemove什么都没有做
        document.onmousemove = null;
        //切忌不要改 fnMove = null;
    }
}
//鼠标移动函数
function fnMove(event,X,Y){
    var oDrag = document.getElementById("loginPanel");
    //定义面板在浏览器窗口的坐标
    var dleft = event.clientX-X, //主板左边距离=事件在窗口中坐标-光标在面板中占据的宽和高
        dtop = event.clientY-Y;
    //定义浏览器窗口的宽高（兼容不同版本浏览器）
    var winW = document.documentElement.clientWidth || document.body.clientWidth,//获取窗口宽
        winH = document.documentElement.clientHeight || document.body.clientHeight;//获取窗口高
    //定义面板在窗口中移动的最大范围
    var maxW = winW - oDrag.offsetWidth, //offsetWidth用来获取这个盒子的宽
        maxH = winH - oDrag.offsetHeight;
    //测试，发现当面板移动到边缘后还是会继续移动，这里就需要强制处理
    //document.title = dleft+","+dtop;
    if(dleft<0){
        oDrag.style.left = 0+"px";
    }else if(dleft>maxW){
        oDrag.style.left = maxW-10+"px";
    }else{
        oDrag.style.left = dleft+"px";  
    }
    if(dtop<0){
        oDrag.style.top = 10+"px";
    }else if(dtop>maxH){
        oDrag.style.top = maxH+"px";
    }else{
        oDrag.style.top = dtop+"px";
    }
}
//关闭函数
function close(){
    var oTab = document.getElementById("loginPanel");
    oTab.style.display = "none";
}