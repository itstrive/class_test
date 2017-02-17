//控制鼠标移入显示/溢出隐藏
function ShowOrHide(Obj){

	var oBox = Obj.parentNode.children[2];
	
		Obj.onmouseover = function(){	
			oBox.style.display = 'block';
		};
		
		oBox.onmouseover = function(){
			clearTimeout(Obj.time)
		};
		
		oBox.onmouseout = Obj.onmouseout= function(){
			Obj.time=setTimeout(function(){
				oBox.style.display = 'none';
			},100)
		};
};


window.onload = function(){
	
	var doc = document;
	//Email 输入框的登录
	
	var oText = doc.getElementById("email_input_txt");
	var oEmailBox = doc.getElementById('email_list');
	
		oText.onclick = function(){
			
			oEmailBox.style.display ='block';
			
			document.onclick = function(ev){
			
			var oEvent = ev || event;
			var oTarget = oEvent.srcElement || oEvent.target;
			
			if(oTarget.className != "email_input_txt" && oTarget.className != "email_list" && oTarget.nodeName!='SELECT'){
				oEmailBox.style.display ='none';
			}
				oEvent.cancelBubble = true;
						
			};
			
		};
		
		
		
	// 头部搜索下拉列表
	var oSearchBtn = doc.getElementById('search_list_btn');
	var oBoxSearchList = doc.getElementById('search_list');
	var oArrow = oSearchBtn.parentNode.children[1];
	var isFlag = true;
	
		function SearchHide(){
		
		if(isFlag){
			oBoxSearchList.style.display='block';
			oArrow.className +=' selected' ;
			//isFlag = false;	
		}else{
			
			oBoxSearchList.style.display='none';
			oArrow.className='arrow';
			//isFlag = true;
		};
		isFlag= !isFlag;
	};
		oSearchBtn.onclick = oArrow.onclick = SearchHide;
	
		

			
	//正品商城限时显示隐藏代码
	var oToggle = doc.getElementById('goggle');
	
		ShowOrHide(oToggle);
		
	//360影视显示隐藏代码
	var oToggle360 = doc.getElementById('goggle_360');
	
		ShowOrHide(oToggle360);
		
	//淘宝特卖限时显示隐藏代码
	var oToggleTaobao = doc.getElementById('toggle_taobao');
	
		ShowOrHide(oToggleTaobao);
		
	//查询logo列表的显示
	var oToggleLogo = doc.getElementById('toggle_logo');
	
		ShowOrHide(oToggleLogo);
	
	
	//点击切换搜索按钮值////////////////////////////////
	var oLogoList = doc.getElementById('logo_list');
	var aBtn = oLogoList.getElementsByTagName('a');
	var oTitle = doc.getElementById('logo_link');
	var oSearchBtn = doc.getElementById('search_btn');
	
		for(var i=0;i<aBtn.length;i++){
			
			aBtn[i].onclick = function(){
				oTitle.className='logo_link '+this.className;
				oSearchBtn.innerHTML = this.innerHTML 
			}
		}
		
	//Tab选项卡////////////////////////////////////	
	var oNewsBox = doc.getElementById('new_tab');
	var oLiBtn = doc.getElementById('new_ul').getElementsByTagName('li');
	var oNewsDiv = oNewsBox.getElementsByTagName('div');
	
		for(var i=0;i<oLiBtn.length;i++){
			
			oLiBtn[i].index = i;
			oLiBtn[i].onclick = function(){
				
				for(var i=0;i<oLiBtn.length;i++){
					oLiBtn[i].className='';
					oNewsDiv[i].style.display = 'none';
				}
				
				this.className='selected';
				oNewsDiv[this.index].style.display = 'block';
			};
		}			
};