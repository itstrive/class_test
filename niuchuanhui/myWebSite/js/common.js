//banner上动画效果
var oName=document.getElementById('myname');
var oJob=document.getElementById('myJob');
var m=0;
var timerH=setTimeout(function(){
	move(oName,{left:365},{easing:Tween.Elastic.easeInOut,duration:1000,complete:function(){
		move(oJob,{left:365},{easing:Tween.Elastic.easeInOut,duration:500})	
	}});
	m++;
	if(m==1){
		clearTimeout(timerH);	
	}
},30);
//左侧导航
;(function(){
	var oBar=document.getElementById('leftNav');
	var oMenu=document.getElementById('leftCon');
	oBar.onmouseover=function(){
		move(this,{left:-44},{easing:Tween.Quad.easeIn,duration:200});
		move(oMenu,{left:0},{easing:Tween.Quad.easeIn,duration:200});
	}
	oBar.onmouseout=function(){
			
	};
	oMenu.onmouseover=function(){
		move(this,{left:0},{easing:Tween.Quad.easeIn,duration:200});
			
	};
	oMenu.onmouseout=function(){
		move(this,{left:-280},{easing:Tween.Quad.easeIn,duration:200})
		move(oBar,{left:0},{easing:Tween.Quad.easeIn,duration:200});	
	};	
})()
//针对滚屏的move框架
var timer2=null;
function moveScroll(target,time,options){
	options=options || {};
	var easing=options.easing || Tween.Linear;
	var start=document.documentElement.scrollTop || document.body.scrollTop;
	var dis=target-start;
	var count=Math.floor(time/30);
	var n=0;
	clearInterval(timer);
	timer2=setInterval(function(){
		n++;
		var cur=easing(time*n/count, start, dis, time);
		document.body.scrollTop=cur;
		document.documentElement.scrollTop=cur;
		if(n==count){
			clearInterval(timer2);	
		} 
	},30);
}
//点击切换下一屏
var oDrop=document.getElementById('dropDown');
var oSkill=document.getElementById('skill');	
var oneH=document.getElementById('banner').offsetHeight;
oDrop.onclick=function(){
	moveScroll(oneH,800,{easing:Tween.Quint.easeOut});	
};
//鼠标滚轮事件
function addWheel(obj, fn)
{
	// 加事件
	if (window.navigator.userAgent.toLowerCase().indexOf('firefox') != -1)
	{
		// FF
		obj.addEventListener('DOMMouseScroll', function (ev){
			if (ev.detail > 0)
			{
				// 下
				fn(true);
			}
			else
			{
				fn(false);
			}
			
		}, false);
	}
	else
	{
		obj.onmousewheel=function (){
			if (event.wheelDelta > 0)
			{
				// 上
				fn(false);
			}
			else
			{
				fn(true);
			}
		};
	}
}	
//鼠标滚轮事件，滚动切换页面
addWheel(document,function(down){
	if(down){
		moveScroll(oneH,800,{easing:Tween.Quint.easeOut});	
	}	
});



















