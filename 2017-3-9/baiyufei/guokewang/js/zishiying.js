;(function(){
    let html=document.documentElement;
    html.style.fontSize=html.clientWidth*20/320+'px';

    window.onresize=function(){
        html.style.fontSize=html.clientWidth*20/320+'px';
    };
})()