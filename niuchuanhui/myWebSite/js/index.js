//nav效果
/*var oNav=document.getElementById('nav');
	var aLi=oNav.getElementsByTagName('li');
	var aDl=oNav.getElementsByTagName('dl');
	for(var i=0;i<aLi.length;i++){
		aLi[i].index=i;
		aLi[i].children[0].onmouseover=function(){
			move(this,{top:0},{easing:Tween.easeInOut,duration:150});
		};	
		aLi[i].children[0].onmouseout=function(){
			move(this,{top:-30},{easing:Tween.easeInOut,duration:150});
		};
		aLi[i].onclick=function(){
			for(var i=0;i<aLi.length;i++){
				aLi[i].className='';	
			}	
			this.className='active';
		}
	}*/	
//获取屏幕宽高
;(function(){
	function client(id){
	var oBox=document.getElementById(id);
	var clientX=document.documentElement.clientWidth;
	var clientY=document.documentElement.clientHeight;
	oBox.style.width=clientX+'px';
	oBox.style.height=clientY+'px';
}
//第一屏宽高
client('banner');
//第二屏的宽高
client('skill');
//第三屏的宽高
//client('showPro');	
})()
//banner上动画效果
;(function(){
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
})();
//banner效果
;(function(){
	var oIntro=document.getElementById('intro');
	var str="我的家乡河南辉县，是一个山清水秀的地方，2010年毕业于XXXX大学XX系，同年8月份就职于XXXX科技股份有限公司，担任“网页前端设计师”至今，我热爱这份工作，也希望结识有共同兴趣的朋友相互学习，共同发展。2010年毕业于XXXX大学XX系，同年8月份就职于XXXX科技股份有限公司，担任“网页前端设计师”至今，我热爱这份工作，也希望结识有共同兴趣的朋友相互学习，共同发展。担任“网页前端设计师”至今，我热爱这份工作，也希望结识有共同兴趣的朋友相互学习。";
	var aSpan=[];
	for(var i=0;i<str.length;i++){
		var oSpan=document.createElement('span');
		oSpan.innerHTML=str.charAt(i);
		aSpan.push(oSpan);
		oIntro.appendChild(oSpan);	
	}
	var n=0;
	var timer=setInterval(function(){
		move(aSpan[n],{opacity:1});
		n++;
		if(n==aSpan.length){
			clearInterval(timer);	
		}	
	},10);		
})()
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

//点击切换下一屏
;(function(){
	var oDrop=document.getElementById('dropDown');
	var oSkill=document.getElementById('skill');	
	var oneH=document.getElementById('banner').offsetHeight;
	oDrop.onclick=function(){
		moveScroll(oneH,400);	
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
		clearInterval(timer2);
		timer2=setInterval(function(){
			n++;
			/*var cur=start+dis*n/count;*/
			var cur=easing(time*n/count,start,dis,time);
			document.body.scrollTop=cur;
			document.documentElement.scrollTop=cur;
			if(n==count){
				clearInterval(timer2);	
			} 
		},30);
	}
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

