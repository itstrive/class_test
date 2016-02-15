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
	},30);
}














