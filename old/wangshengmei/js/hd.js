
(function(){
	window.onload=window.onresize=function(){
		//导航条的运动
		(function(){
			var oBtn=document.getElementById('btn');
			var oDiv=document.getElementById('hd_bg');
			var homepage=document.getElementById('homepage');
			var production=document.getElementById('production');
			var oC=document.getElementById('c1');
			var about=document.getElementById('about');
			var abbox=document.getElementById('abbox');
			var oNav=document.getElementById('nav');
			var contact=document.getElementById('contact');
			var ctbox=document.getElementById('ctbox');
			var bFlag=false;
			var timer=null;
			oBtn.onclick=function(){
				moveScroll(oDiv.offsetHeight,1000);
			};
			homepage.onclick=function(){
				moveScroll(0,1000);
			};
			production.onclick=function(){
				moveScroll(oC.offsetTop-oNav.offsetHeight,1000);
			};
			about.onclick=function(){
				moveScroll(abbox.offsetTop-oNav.offsetHeight,1000);
			};
			contact.onclick=function(){
				moveScroll(ctbox.offsetTop-oNav.offsetHeight,1000);
			};
			window.onscroll=function(){
				if(bFlag){
					clearInterval(timer);
				}
				bFlag=true;
			};
			oBtn.onmosedown=homepage.onmosedown=function(){
				return false;
			};
			function moveScroll(target,time){
				var start=document.documentElement.scrollTop || document.body.scrollTop;
				var count=Math.floor(time/30);
				var n=0;
				var dis=target-start;
				
				clearInterval(timer);
				timer=setInterval(function(){
					bFlag=false;
					n++;
					var cur=start+dis*n/count;
					document.body.scrollTop=cur;
					document.documentElement.scrollTop=cur;
					
					if(n == count){
						clearInterval(timer);
					}
				},10);
			}
		})();

		//吸顶条
		(function(){
			var oNav=document.getElementById('nav');
			var top=getPos(oNav).top;
			function getPos(obj){
				var left=0;
				var top=0;
				while(obj){
					left+=obj.offsetLeft;
					top+=obj.offsetTop;
					obj=obj.offsetParent;
				}
				return {left:left,top:top}
			}
			window.onscroll=function(){
				var scrollTop=document.documentElement.scrollTop || document.body.scrollTop;

				if(scrollTop >= top){
					
					oNav.style.position='fixed';
				}else{
					oNav.style.position='';
				}
			};
		})();


		//跟随鼠标移入移出的效果
		(function(){
			var oUl=document.getElementsByClassName('aboutme')[0];
			var aLi=oUl.getElementsByTagName('li');
			for(var i=0;i<aLi.length;i++){
				enter(aLi[i]);
				leave(aLi[i]);
			}

			function enter(obj){
				obj.onmouseenter=function(ev){
					var oEvent=ev || event;
					var n=getN(obj,oEvent);
					var oSpan=obj.getElementsByTagName('span')[0];
					switch(n){
						case 0:
							oSpan.style.left='200px';
							oSpan.style.top=0;
							break;
						case 1:
							oSpan.style.left=0;
							oSpan.style.top='200px';
							break;
						case 2:
							oSpan.style.left='-200px';
							oSpan.style.top=0;
							break;
						case 3:
							oSpan.style.left=0;
							oSpan.style.top='-200px';
					}
					move(oSpan,{top:0, left:0},{easing:Tween.Back.easeOut,duration:300});
				};
			};
			function leave(obj){
				obj.onmouseleave=function(ev){
					var oEvent=ev || event;
					var n=getN(obj,oEvent);
					var oSpan=obj.getElementsByTagName('span')[0];
					switch(n){
						case 0:
							move(oSpan,{left:200,top:0});
							break;
						case 1:
							move(oSpan,{left:0,top:200});
							break;
						case 2:
							move(oSpan,{left:-200,top:0});
							break;
						case 3:
							move(oSpan,{left:0,top:-200});
					}
				};
			}
			function getN(obj,ev){
				var scrollTop=document.documentElement.scrollTop || document.body.scrollTop;
				var x=obj.offsetLeft+obj.offsetWidth/2-ev.clientX;
				var y=obj.offsetTop+obj.offsetHeight/2-ev.clientY-scrollTop;
				var n=Math.round((d2a(Math.atan2(y, x))+180)/90)%4;
				return n;
			} 
			function d2a(d){
				return d*180/Math.PI;
			}
		})();
	};
})();

