window.onload=function(){
//感应按钮和换屏
	;(function(){
		var oBody=document.body;
		var oBox=document.getElementById('box');
		var aBox=document.getElementsByClassName('j-box');
		var oBlast=document.getElementById('box-last');
		var aImg=oBlast.getElementsByTagName('img');
		var oUl=document.getElementById('nav-ul');
		var aBng=oUl.getElementsByTagName('img');
		var aLi=oUl.getElementsByTagName('li');
		var maxWidth=128;
		var maxHeight=128;
		//感应按钮
		oBody.onmousemove=function (ev){
			var oEvent=ev || event;
			for (var i=0; i<aImg.length; i++)
			{
				var left=aImg[i].offsetLeft;
				var top=aImg[i].offsetTop+oBlast.offsetTop; 
				var x=left+aImg[i].offsetWidth/2;
				var y=top+aImg[i].offsetHeight/2;
				var a=oEvent.clientX-x;
				var b=y-oEvent.clientY;
				var c=Math.sqrt(a*a+b*b);
				// 感应距离
				var scale=1-c/500; 
				(scale<0.5) && (scale=0.5)
				aImg[i].style.width=scale*maxWidth+'px';
				aImg[i].style.height=scale*maxHeight+'px';
			}
		};
		//换屏
		for(var i=0; i<aImg.length; i++)
		{	//按钮
			;(function(index){
				aImg[i].onclick=function(ev){
					var oEvent=ev || event;
					for(var i=0; i<aImg.length; i++)
					{
						move(aBng[i], {top:32}, {easing:Tween.Linear,duration:200});
					}
					move(oBox, {left:-aBox[0].offsetWidth*index}, {easing:Tween.Linear,duration:1000});
					move(aBng[index], {top:0}, {easing:Tween.Linear,duration:200});
				};
			})(i);
			;(function(index){ //导航
				aLi[i].onclick=function(){
					for(var i=0; i<aImg.length; i++)
					{
						move(aBng[i], {top:32}, {easing:Tween.Linear,duration:200});
					}
					move(aBng[index], {top:0}, {easing:Tween.Linear,duration:200});
					move(oBox, {left:-aBox[0].offsetWidth*index}, {easing:Tween.Linear,duration:1000});
				};	
			})(i);
		}
	})();
//桌面图标拖拽
	//第一屏
	;(function(){
		var aBoxOul=document.getElementById('boxO-ul');
		var aLi=aBoxOul.getElementsByClassName('j-li');	
		var aA=aBoxOul.getElementsByTagName('a');
		var arr=[
				'马.html',
				'魔方.html',
				'看小说/看小说.html',
				'无翼鸟.html',
				'换图.html'
		];
		var zIndex=1;
		var oNear=null;
		// 布局转换
		var aPos=[];
		for (var i=0; i<aLi.length; i++)
		{
			aPos.push({
				left:aLi[i].offsetLeft,
				top:aLi[i].offsetTop
			});
		}
		for (var i=0; i<aLi.length; i++)
		{
			aLi[i].style.position='absolute';
			aLi[i].style.left=aPos[i].left+'px';
			aLi[i].style.top=aPos[i].top+'px';
			aLi[i].style.margin=0;
		}
		// 拖拽
		for (var i=0; i<aLi.length; i++)
		{
			aLi[i].index=i;
			drag(aLi[i]);
		}
		function drag(obj)
		{
			obj.onmousedown=function (ev){
				obj.style.zIndex=zIndex++;
				var oEvent=ev || event;
				var disX=oEvent.clientX-obj.offsetLeft;
				var disY=oEvent.clientY-obj.offsetTop;
				document.onmousemove=function (ev){
					for(var i=0; i<aA.length; i++)
					{
						aA[i].href='javascript:;';
						aA[i].target='';
					}
					var oEvent=ev || event;
					var left=oEvent.clientX-disX;
					var top=oEvent.clientY-disY;
					obj.style.left=left+'px';
					obj.style.top=top+'px';
					// 找最近元素
					oNear=findNear(obj);
					if (oNear)
					{
						for (var i=0; i<aLi.length; i++)
						{
							aLi[i].className='j-li';
						}
						
						oNear.className='j-li active';
					}
					else
					{
						for (var i=0; i<aLi.length; i++)
						{
							aLi[i].className='j-li';
						}
					}
				};
				document.onmouseup=function (){
					setTimeout(function(){
						for(var i=0; i<aA.length; i++)
						{
							aA[i].href=arr[i];
							aA[i].target='_blank';
						}
					},30);
					document.onmousemove=null;
					document.onmouseup=null;
					// 换位置
					if (oNear)
					{
						move(obj, aPos[oNear.index], {
							duration:300,
							easing:Tween.Elastic.easeOut
						});
						move(oNear, aPos[obj.index], {
							duration:300,
							easing:Tween.Elastic.easeOut
						});
						// 换下标
						var tmp=obj.index;
						obj.index=oNear.index;
						oNear.index=tmp;
						for (var i=0; i<aLi.length; i++)
						{
							aLi[i].className='j-li';
						}
					}
					else
					{
						// 没有
						move(obj, aPos[obj.index], {
							duration:300,
							easing:Tween.Elastic.easeOut
						});
					}
				};
				return false;
			};
		}
		function findNear(obj)
		{
			var nMin=999999;
			var nMinIndex=-1;
			
			for (var i=0; i<aLi.length; i++)
			{
				if (aLi[i] != obj)
				{
					if (collTest(obj, aLi[i]))
					{
						var dis=getDis(obj, aLi[i]);
						
						if (dis < nMin)
						{
							nMin=dis;
							nMinIndex=i;
						}
					}
				}
			}
			if (nMinIndex == -1)
			{
				return null;
			}
			else
			{
				return aLi[nMinIndex];
			}
		}
		function getDis(obj1, obj2)
		{
			var a=obj1.offsetLeft+obj1.offsetWidth/2-(obj2.offsetLeft+obj2.offsetWidth/2);
			var b=obj1.offsetTop+obj1.offsetHeight/2-(obj2.offsetTop+obj2.offsetHeight/2);
			return Math.sqrt(a*a+b*b);
		}
		function collTest(obj1, obj2)
		{
			var l1=obj1.offsetLeft;
			var r1=l1+obj1.offsetWidth;
			var t1=obj1.offsetTop;
			var b1=t1+obj1.offsetHeight;
			var t2=obj2.offsetTop;
			var b2=t2+obj2.offsetHeight;
			var l2=obj2.offsetLeft;
			var r2=l2+obj2.offsetWidth;
			if (l2>r1 || l1>r2 || t2>b1 || t1>b2)
			{
				return false;
			}
			else
			{
				return true;
			}
		}
	})();
	//第二屏
	;(function(){
		var aBoxOul=document.getElementById('boxT-ul');
		var aLi=aBoxOul.getElementsByClassName('j-li');	
		var aA=aBoxOul.getElementsByTagName('a');
		var arr=[
				'https://www.baidu.com',
				'https://www.baidu.com',
				'https://www.baidu.com',
				'https://www.baidu.com',
				'https://www.baidu.com'
		];
		var zIndex=1;
		var oNear=null;
		// 布局转换
		var aPos=[];
		for (var i=0; i<aLi.length; i++)
		{
			aPos.push({
				left:aLi[i].offsetLeft,
				top:aLi[i].offsetTop
			});
		}
		for (var i=0; i<aLi.length; i++)
		{
			aLi[i].style.position='absolute';
			aLi[i].style.left=aPos[i].left+'px';
			aLi[i].style.top=aPos[i].top+'px';
			aLi[i].style.margin=0;
		}
		// 拖拽
		for (var i=0; i<aLi.length; i++)
		{
			aLi[i].index=i;
			drag(aLi[i]);
		}
		function drag(obj)
		{
			obj.onmousedown=function (ev){
				obj.style.zIndex=zIndex++;
				var oEvent=ev || event;
				var disX=oEvent.clientX-obj.offsetLeft;
				var disY=oEvent.clientY-obj.offsetTop;
				document.onmousemove=function (ev){
					for(var i=0; i<aA.length; i++)
					{
						aA[i].href='javascript:;';
						aA[i].target='';
					}
					var oEvent=ev || event;
					var left=oEvent.clientX-disX;
					var top=oEvent.clientY-disY;
					obj.style.left=left+'px';
					obj.style.top=top+'px';
					// 找最近元素
					oNear=findNear(obj);
					if (oNear)
					{
						for (var i=0; i<aLi.length; i++)
						{
							aLi[i].className='j-li';
						}
						
						oNear.className='j-li active';
					}
					else
					{
						for (var i=0; i<aLi.length; i++)
						{
							aLi[i].className='j-li';
						}
					}
				};
				document.onmouseup=function (){
					setTimeout(function(){
						for(var i=0; i<aA.length; i++)
						{
							aA[i].href=arr[i];
							aA[i].target='_blank';
						}
					},30);
					document.onmousemove=null;
					document.onmouseup=null;
					// 换位置
					if (oNear)
					{
						move(obj, aPos[oNear.index], {
							duration:300,
							easing:Tween.Elastic.easeOut
						});
						move(oNear, aPos[obj.index], {
							duration:300,
							easing:Tween.Elastic.easeOut
						});
						// 换下标
						var tmp=obj.index;
						obj.index=oNear.index;
						oNear.index=tmp;
						for (var i=0; i<aLi.length; i++)
						{
							aLi[i].className='j-li';
						}
					}
					else
					{
						// 没有
						move(obj, aPos[obj.index], {
							duration:300,
							easing:Tween.Elastic.easeOut
						});
					}
				};
				return false;
			};
		}
		function findNear(obj)
		{
			var nMin=999999;
			var nMinIndex=-1;
			
			for (var i=0; i<aLi.length; i++)
			{
				if (aLi[i] != obj)
				{
					if (collTest(obj, aLi[i]))
					{
						var dis=getDis(obj, aLi[i]);
						
						if (dis < nMin)
						{
							nMin=dis;
							nMinIndex=i;
						}
					}
				}
			}
			if (nMinIndex == -1)
			{
				return null;
			}
			else
			{
				return aLi[nMinIndex];
			}
		}
		function getDis(obj1, obj2)
		{
			var a=obj1.offsetLeft+obj1.offsetWidth/2-(obj2.offsetLeft+obj2.offsetWidth/2);
			var b=obj1.offsetTop+obj1.offsetHeight/2-(obj2.offsetTop+obj2.offsetHeight/2);
			return Math.sqrt(a*a+b*b);
		}
		function collTest(obj1, obj2)
		{
			var l1=obj1.offsetLeft;
			var r1=l1+obj1.offsetWidth;
			var t1=obj1.offsetTop;
			var b1=t1+obj1.offsetHeight;
			var t2=obj2.offsetTop;
			var b2=t2+obj2.offsetHeight;
			var l2=obj2.offsetLeft;
			var r2=l2+obj2.offsetWidth;
			if (l2>r1 || l1>r2 || t2>b1 || t1>b2)
			{
				return false;
			}
			else
			{
				return true;
			}
		}
	})();
	//第三屏
	;(function(){
		var aBoxOul=document.getElementById('boxS-ul');
		var aLi=aBoxOul.getElementsByClassName('j-li');	
		var aA=aBoxOul.getElementsByTagName('a');
		var arr=[
				'https://www.baidu.com',
				'https://www.baidu.com',
				'https://www.baidu.com',
				'https://www.baidu.com',
				'https://www.baidu.com'
		];
		var zIndex=1;
		var oNear=null;
		// 布局转换
		var aPos=[];
		for (var i=0; i<aLi.length; i++)
		{
			aPos.push({
				left:aLi[i].offsetLeft,
				top:aLi[i].offsetTop
			});
		}
		for (var i=0; i<aLi.length; i++)
		{
			aLi[i].style.position='absolute';
			aLi[i].style.left=aPos[i].left+'px';
			aLi[i].style.top=aPos[i].top+'px';
			aLi[i].style.margin=0;
		}
		// 拖拽
		for (var i=0; i<aLi.length; i++)
		{
			aLi[i].index=i;
			drag(aLi[i]);
		}
		function drag(obj)
		{
			obj.onmousedown=function (ev){
				obj.style.zIndex=zIndex++;
				var oEvent=ev || event;
				var disX=oEvent.clientX-obj.offsetLeft;
				var disY=oEvent.clientY-obj.offsetTop;
				document.onmousemove=function (ev){
					for(var i=0; i<aA.length; i++)
					{
						aA[i].href='javascript:;';
						aA[i].target='';
					}
					var oEvent=ev || event;
					var left=oEvent.clientX-disX;
					var top=oEvent.clientY-disY;
					obj.style.left=left+'px';
					obj.style.top=top+'px';
					// 找最近元素
					oNear=findNear(obj);
					if (oNear)
					{
						for (var i=0; i<aLi.length; i++)
						{
							aLi[i].className='j-li';
						}
						
						oNear.className='j-li active';
					}
					else
					{
						for (var i=0; i<aLi.length; i++)
						{
							aLi[i].className='j-li';
						}
					}
				};
				document.onmouseup=function (){
					setTimeout(function(){
						for(var i=0; i<aA.length; i++)
						{
							aA[i].href=arr[i];
							aA[i].target='_blank';
						}
					},30);
					document.onmousemove=null;
					document.onmouseup=null;
					// 换位置
					if (oNear)
					{
						move(obj, aPos[oNear.index], {
							duration:300,
							easing:Tween.Elastic.easeOut
						});
						move(oNear, aPos[obj.index], {
							duration:300,
							easing:Tween.Elastic.easeOut
						});
						// 换下标
						var tmp=obj.index;
						obj.index=oNear.index;
						oNear.index=tmp;
						for (var i=0; i<aLi.length; i++)
						{
							aLi[i].className='j-li';
						}
					}
					else
					{
						// 没有
						move(obj, aPos[obj.index], {
							duration:300,
							easing:Tween.Elastic.easeOut
						});
					}
				};
				return false;
			};
		}
		function findNear(obj)
		{
			var nMin=999999;
			var nMinIndex=-1;
			
			for (var i=0; i<aLi.length; i++)
			{
				if (aLi[i] != obj)
				{
					if (collTest(obj, aLi[i]))
					{
						var dis=getDis(obj, aLi[i]);
						
						if (dis < nMin)
						{
							nMin=dis;
							nMinIndex=i;
						}
					}
				}
			}
			if (nMinIndex == -1)
			{
				return null;
			}
			else
			{
				return aLi[nMinIndex];
			}
		}
		function getDis(obj1, obj2)
		{
			var a=obj1.offsetLeft+obj1.offsetWidth/2-(obj2.offsetLeft+obj2.offsetWidth/2);
			var b=obj1.offsetTop+obj1.offsetHeight/2-(obj2.offsetTop+obj2.offsetHeight/2);
			return Math.sqrt(a*a+b*b);
		}
		function collTest(obj1, obj2)
		{
			var l1=obj1.offsetLeft;
			var r1=l1+obj1.offsetWidth;
			var t1=obj1.offsetTop;
			var b1=t1+obj1.offsetHeight;
			var t2=obj2.offsetTop;
			var b2=t2+obj2.offsetHeight;
			var l2=obj2.offsetLeft;
			var r2=l2+obj2.offsetWidth;
			if (l2>r1 || l1>r2 || t2>b1 || t1>b2)
			{
				return false;
			}
			else
			{
				return true;
			}
		}
	})();
	//第四屏
	;(function(){
		var aBoxOul=document.getElementById('boxF-ul');
		var aLi=aBoxOul.getElementsByClassName('j-li');	
		var aA=aBoxOul.getElementsByTagName('a');
		var arr=[
				'https://www.baidu.com',
				'https://www.baidu.com',
				'https://www.baidu.com',
				'https://www.baidu.com',
				'https://www.baidu.com'
		];
		var zIndex=1;
		var oNear=null;
		// 布局转换
		var aPos=[];
		for (var i=0; i<aLi.length; i++)
		{
			aPos.push({
				left:aLi[i].offsetLeft,
				top:aLi[i].offsetTop
			});
		}
		for (var i=0; i<aLi.length; i++)
		{
			aLi[i].style.position='absolute';
			aLi[i].style.left=aPos[i].left+'px';
			aLi[i].style.top=aPos[i].top+'px';
			aLi[i].style.margin=0;
		}
		// 拖拽
		for (var i=0; i<aLi.length; i++)
		{
			aLi[i].index=i;
			drag(aLi[i]);
		}
		function drag(obj)
		{
			obj.onmousedown=function (ev){
				obj.style.zIndex=zIndex++;
				var oEvent=ev || event;
				var disX=oEvent.clientX-obj.offsetLeft;
				var disY=oEvent.clientY-obj.offsetTop;
				document.onmousemove=function (ev){
					for(var i=0; i<aA.length; i++)
					{
						aA[i].href='javascript:;';
						aA[i].target='';
					}
					var oEvent=ev || event;
					var left=oEvent.clientX-disX;
					var top=oEvent.clientY-disY;
					obj.style.left=left+'px';
					obj.style.top=top+'px';
					// 找最近元素
					oNear=findNear(obj);
					if (oNear)
					{
						for (var i=0; i<aLi.length; i++)
						{
							aLi[i].className='j-li';
						}
						
						oNear.className='j-li active';
					}
					else
					{
						for (var i=0; i<aLi.length; i++)
						{
							aLi[i].className='j-li';
						}
					}
				};
				document.onmouseup=function (){
					setTimeout(function(){
						for(var i=0; i<aA.length; i++)
						{
							aA[i].href=arr[i];
							aA[i].target='_blank';
						}
					},30);
					document.onmousemove=null;
					document.onmouseup=null;
					// 换位置
					if (oNear)
					{
						move(obj, aPos[oNear.index], {
							duration:300,
							easing:Tween.Elastic.easeOut
						});
						move(oNear, aPos[obj.index], {
							duration:300,
							easing:Tween.Elastic.easeOut
						});
						// 换下标
						var tmp=obj.index;
						obj.index=oNear.index;
						oNear.index=tmp;
						for (var i=0; i<aLi.length; i++)
						{
							aLi[i].className='j-li';
						}
					}
					else
					{
						// 没有
						move(obj, aPos[obj.index], {
							duration:300,
							easing:Tween.Elastic.easeOut
						});
					}
				};
				return false;
			};
		}
		function findNear(obj)
		{
			var nMin=999999;
			var nMinIndex=-1;
			
			for (var i=0; i<aLi.length; i++)
			{
				if (aLi[i] != obj)
				{
					if (collTest(obj, aLi[i]))
					{
						var dis=getDis(obj, aLi[i]);
						
						if (dis < nMin)
						{
							nMin=dis;
							nMinIndex=i;
						}
					}
				}
			}
			if (nMinIndex == -1)
			{
				return null;
			}
			else
			{
				return aLi[nMinIndex];
			}
		}
		function getDis(obj1, obj2)
		{
			var a=obj1.offsetLeft+obj1.offsetWidth/2-(obj2.offsetLeft+obj2.offsetWidth/2);
			var b=obj1.offsetTop+obj1.offsetHeight/2-(obj2.offsetTop+obj2.offsetHeight/2);
			return Math.sqrt(a*a+b*b);
		}
		function collTest(obj1, obj2)
		{
			var l1=obj1.offsetLeft;
			var r1=l1+obj1.offsetWidth;
			var t1=obj1.offsetTop;
			var b1=t1+obj1.offsetHeight;
			var t2=obj2.offsetTop;
			var b2=t2+obj2.offsetHeight;
			var l2=obj2.offsetLeft;
			var r2=l2+obj2.offsetWidth;
			if (l2>r1 || l1>r2 || t2>b1 || t1>b2)
			{
				return false;
			}
			else
			{
				return true;
			}
		}
	})();
	//第五屏
	;(function(){
		var aBoxOul=document.getElementById('boxL-ul');
		var aLi=aBoxOul.getElementsByClassName('j-li');
		var aA=aBoxOul.getElementsByTagName('a');
		var arr=[
				'https://www.baidu.com',
				'https://www.baidu.com',
				'https://www.baidu.com',
				'https://www.baidu.com',
				'https://www.baidu.com'
		];	
		var zIndex=1;
		var oNear=null;
		// 布局转换
		var aPos=[];
		for (var i=0; i<aLi.length; i++)
		{
			aPos.push({
				left:aLi[i].offsetLeft,
				top:aLi[i].offsetTop
			});
		}
		for (var i=0; i<aLi.length; i++)
		{
			aLi[i].style.position='absolute';
			aLi[i].style.left=aPos[i].left+'px';
			aLi[i].style.top=aPos[i].top+'px';
			aLi[i].style.margin=0;
		}
		// 拖拽
		for (var i=0; i<aLi.length; i++)
		{
			aLi[i].index=i;
			drag(aLi[i]);
		}
		function drag(obj)
		{
			obj.onmousedown=function (ev){
				obj.style.zIndex=zIndex++;
				var oEvent=ev || event;
				var disX=oEvent.clientX-obj.offsetLeft;
				var disY=oEvent.clientY-obj.offsetTop;
				document.onmousemove=function (ev){
					for(var i=0; i<aA.length; i++)
					{
						aA[i].href='javascript:;';
						aA[i].target='';
					}
					var oEvent=ev || event;
					var left=oEvent.clientX-disX;
					var top=oEvent.clientY-disY;
					obj.style.left=left+'px';
					obj.style.top=top+'px';
					// 找最近元素
					oNear=findNear(obj);
					if (oNear)
					{
						for (var i=0; i<aLi.length; i++)
						{
							aLi[i].className='j-li';
						}
						
						oNear.className='j-li active';
					}
					else
					{
						for (var i=0; i<aLi.length; i++)
						{
							aLi[i].className='j-li';
						}
					}
				};
				document.onmouseup=function (){
					setTimeout(function(){
						for(var i=0; i<aA.length; i++)
						{
							aA[i].href=arr[i];
							aA[i].target='_blank';
						}
					},30);
					document.onmousemove=null;
					document.onmouseup=null;
					// 换位置
					if (oNear)
					{
						move(obj, aPos[oNear.index], {
							duration:300,
							easing:Tween.Elastic.easeOut
						});
						move(oNear, aPos[obj.index], {
							duration:300,
							easing:Tween.Elastic.easeOut
						});
						// 换下标
						var tmp=obj.index;
						obj.index=oNear.index;
						oNear.index=tmp;
						for (var i=0; i<aLi.length; i++)
						{
							aLi[i].className='j-li';
						}
					}
					else
					{
						// 没有
						move(obj, aPos[obj.index], {
							duration:300,
							easing:Tween.Elastic.easeOut
						});
					}
				};
				return false;
			};
		}
		function findNear(obj)
		{
			var nMin=999999;
			var nMinIndex=-1;
			
			for (var i=0; i<aLi.length; i++)
			{
				if (aLi[i] != obj)
				{
					if (collTest(obj, aLi[i]))
					{
						var dis=getDis(obj, aLi[i]);
						
						if (dis < nMin)
						{
							nMin=dis;
							nMinIndex=i;
						}
					}
				}
			}
			if (nMinIndex == -1)
			{
				return null;
			}
			else
			{
				return aLi[nMinIndex];
			}
		}
		function getDis(obj1, obj2)
		{
			var a=obj1.offsetLeft+obj1.offsetWidth/2-(obj2.offsetLeft+obj2.offsetWidth/2);
			var b=obj1.offsetTop+obj1.offsetHeight/2-(obj2.offsetTop+obj2.offsetHeight/2);
			return Math.sqrt(a*a+b*b);
		}
		function collTest(obj1, obj2)
		{
			var l1=obj1.offsetLeft;
			var r1=l1+obj1.offsetWidth;
			var t1=obj1.offsetTop;
			var b1=t1+obj1.offsetHeight;
			var t2=obj2.offsetTop;
			var b2=t2+obj2.offsetHeight;
			var l2=obj2.offsetLeft;
			var r2=l2+obj2.offsetWidth;
			if (l2>r1 || l1>r2 || t2>b1 || t1>b2)
			{
				return false;
			}
			else
			{
				return true;
			}
		}
	})();
//超酷时钟
	;(function(){
		tick();
		setInterval(tick, 1000);
		function tick()
		{
			var oDate=new Date();
			var year=oDate.getFullYear();
			var month=oDate.getMonth();
			var date=oDate.getDate();
			var h=oDate.getHours();
			var m=oDate.getMinutes();
			var s=oDate.getSeconds();
			var week=oDate.getDay();
			var str='-'+year+'-'+toDub(month+1)+'-'+toDub(date)+'-'+toDub(h)+'-'+toDub(m)+'-'+toDub(s)+'-'+week+'-';
			var oClock=document.getElementById('clock');
			var aImg=oClock.getElementsByTagName('img');
			var arr=['seven', 'one', 'two', 'three', 'four', 'five', 'six'];
			for (var i=0; i<str.length; i++)
			{
				if (str.charAt(i) == '-')
				{
					continue;
				}
				if (i == str.length-2)
				{
					var sName=arr[str.charAt(i)];
					aImg[i].src='img/'+sName+'.png';
				}
				else
				{
					aImg[i].src='img/'+str.charAt(i)+'.png';
				}
			}
		}
		function toDub(n)
		{
			return n<10 ? '0'+n : ''+n;
		}
	})();
//个人信息
	;(function(){
		var oPa=document.getElementById('opa');
		var oPor=document.getElementById('por');
		var oMeg=document.getElementById('meg');
		var oClo=document.getElementById('clo');
		var oF1=document.getElementById('f1');
		var oF2=document.getElementById('f2');
		var oF3=document.getElementById('f3');
		var oF4=document.getElementById('f4');
		//漂浮开始
		var iSpeedX=1;
		var iSpeedY=2;
		clearInterval(timer);
		var timer=setInterval(show,30);
		function show(){
			var l=oPor.offsetLeft+iSpeedX;
			var t=oPor.offsetTop+iSpeedY;
			if(t>=document.documentElement.clientHeight-oPor.offsetHeight){
				t=document.documentElement.clientHeight-oPor.offsetHeight;
				iSpeedY*=-1;
			}
			if(t<=0){
				t=0;
				iSpeedY*=-1;
			}
			if(l>=document.documentElement.clientWidth-oPor.offsetWidth){
				l=document.documentElement.clientWidth-oPor.offsetWidth;
				iSpeedX*=-1;
			}
			if(l<=0){
				l=0;
				iSpeedX*=-1;
			}
			oPor.style.left=l+'px';
			oPor.style.top=t+'px';
		}
		//出现信息
		oPor.onclick=function(){
			if(oPor.style.left == '50%')
			{
				return;
			}
			clearInterval(timer);
			oPa.style.display='block';
			oMeg.style.display='block';	
			oPor.style.left='50%';
			oPor.style.top='50%';
			oPor.style.marginTop='-35px';
			oPor.style.marginLeft='-38px';
			move(oMeg,{width:303,height:186},{
				complete:function(){
					move(oMeg,{width:606,height:186},{
						complete:function(){
							move(oMeg,{width:606,height:372},{
								complete:function(){
									oClo.style.display='block';
									oF1.style.display='block';
									oF2.style.display='block';
									oF3.style.display='block';
									oF4.style.display='block';
								}
							});	
						}
					});
				}
			});
		};
		//隐藏信息
		oClo.onclick=function(){
			oClo.style.display='none';
			oF1.style.display='none';
			oF2.style.display='none';
			oF3.style.display='none';
			oF4.style.display='none';
			move(oMeg,{width:0,height:0});
			setTimeout(function(){
				//oClo.style.display='block';
				oPa.style.display='none';
				oMeg.style.display='none';
				oPor.style.left='0';
				oPor.style.top='0';
				oPor.style.marginTop=null;
				oPor.style.marginLeft=null;
				clearInterval(timer);
				timer=setInterval(show,30);
			},1000);	
		};
	})();
//运动 move 框架 
	//运动形式
	//t  当前时间
	//b  初始值
	//c  总距离
	//d  总时间
	//var cur=fx(t,b,c,d)
	var Tween = {
		Linear: function(t,b,c,d){ return c*t/d + b; },
		Quad: {
			easeIn: function(t,b,c,d){
				return c*(t/=d)*t + b;
			},
			easeOut: function(t,b,c,d){
				return -c *(t/=d)*(t-2) + b;
			},
			easeInOut: function(t,b,c,d){
				if ((t/=d/2) < 1) return c/2*t*t + b;
				return -c/2 * ((--t)*(t-2) - 1) + b;
			}
		},
		Cubic: {
			easeIn: function(t,b,c,d){
				return c*(t/=d)*t*t + b;
			},
			easeOut: function(t,b,c,d){
				return c*((t=t/d-1)*t*t + 1) + b;
			},
			easeInOut: function(t,b,c,d){
				if ((t/=d/2) < 1) return c/2*t*t*t + b;
				return c/2*((t-=2)*t*t + 2) + b;
			}
		},
		Quart: {
			easeIn: function(t,b,c,d){
				return c*(t/=d)*t*t*t + b;
			},
			easeOut: function(t,b,c,d){
				return -c * ((t=t/d-1)*t*t*t - 1) + b;
			},
			easeInOut: function(t,b,c,d){
				if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
				return -c/2 * ((t-=2)*t*t*t - 2) + b;
			}
		},
		Quint: {
			easeIn: function(t,b,c,d){
				return c*(t/=d)*t*t*t*t + b;
			},
			easeOut: function(t,b,c,d){
				return c*((t=t/d-1)*t*t*t*t + 1) + b;
			},
			easeInOut: function(t,b,c,d){
				if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
				return c/2*((t-=2)*t*t*t*t + 2) + b;
			}
		},
		Sine: {
			easeIn: function(t,b,c,d){
				return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
			},
			easeOut: function(t,b,c,d){
				return c * Math.sin(t/d * (Math.PI/2)) + b;
			},
			easeInOut: function(t,b,c,d){
				return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
			}
		},
		Expo: {
			easeIn: function(t,b,c,d){
				return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
			},
			easeOut: function(t,b,c,d){
				return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
			},
			easeInOut: function(t,b,c,d){
				if (t==0) return b;
				if (t==d) return b+c;
				if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
				return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
			}
		},
		Circ: {
			easeIn: function(t,b,c,d){
				return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;
			},
			easeOut: function(t,b,c,d){
				return c * Math.sqrt(1 - (t=t/d-1)*t) + b;
			},
			easeInOut: function(t,b,c,d){
				if ((t/=d/2) < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
				return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
			}
		},
		Elastic: {
			easeIn: function(t,b,c,d,a,p){
				if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
				if (!a || a < Math.abs(c)) { a=c; var s=p/4; }
				else var s = p/(2*Math.PI) * Math.asin (c/a);
				return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
			},
			easeOut: function(t,b,c,d,a,p){
				if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
				if (!a || a < Math.abs(c)) { a=c; var s=p/4; }
				else var s = p/(2*Math.PI) * Math.asin (c/a);
				return (a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b);
			},
			easeInOut: function(t,b,c,d,a,p){
				if (t==0) return b;  if ((t/=d/2)==2) return b+c;  if (!p) p=d*(.3*1.5);
				if (!a || a < Math.abs(c)) { a=c; var s=p/4; }
				else var s = p/(2*Math.PI) * Math.asin (c/a);
				if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
				return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*.5 + c + b;
			}
		},
		Back: {
			easeIn: function(t,b,c,d,s){
				if (s == undefined) s = 1.70158;
				return c*(t/=d)*t*((s+1)*t - s) + b;
			},
			easeOut: function(t,b,c,d,s){
				if (s == undefined) s = 1.70158;
				return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
			},
			easeInOut: function(t,b,c,d,s){
				if (s == undefined) s = 1.70158; 
				if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
				return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
			}
		},
		Bounce: {
			easeIn: function(t,b,c,d){
				return c - Tween.Bounce.easeOut(d-t, 0, c, d) + b;
			},
			easeOut: function(t,b,c,d){
				if ((t/=d) < (1/2.75)) {
					return c*(7.5625*t*t) + b;
				} else if (t < (2/2.75)) {
					return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
				} else if (t < (2.5/2.75)) {
					return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
				} else {
					return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
				}
			},
			easeInOut: function(t,b,c,d){
				if (t < d/2) return Tween.Bounce.easeIn(t*2, 0, c, d) * .5 + b;
				else return Tween.Bounce.easeOut(t*2-d, 0, c, d) * .5 + c*.5 + b;
			}
		}
	}
	//move 框架
	//move
	function move(obj, json, options)
	{
		options=options || {};
		var easing=options.easing || Tween.Linear;
		var duration=options.duration || 1000;
		
		var start={};
		var dis={};
		for(var name in json)
		{
			start[name]=parseFloat(getStyle(obj, name));
			dis[name]=json[name]-start[name];
		}
		var count=Math.floor(duration/30);
		var n=0;
		clearInterval(obj.timer);
		obj.timer=setInterval(function(){
			n++;
			
			for(var name in json)
			{
				var cur=easing(duration*n/count, start[name], dis[name], duration);
				if(name == 'opacity')
				{
					obj.style[name]=cur;
				}
				else
				{
					obj.style[name]=cur+'px';
				}
			}
			if(n == count)
			{
				clearInterval(obj.timer);
				options.complete && options.complete();
			}
		},30);
	}	
	function getStyle(obj, sName)
	{
		return (obj.currentStyle || getComputedStyle(obj, false))[sName];
	}	
};