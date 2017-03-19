;(function(){
	let html=document.documentElement;
	html.style.fontSize=html.clientWidth*50/375+'px';

	window.onresize=function(){
		html.style.fontSize=html.clientWidth*50/375+'px';
	};
})();