$(document).ready( function() {
	/*For Item Add Page	: http:www.fassion.co.kr/item/
		->Bind Event to the crawlButton form		
	*/
		$('.register-site .buttonBox').bind('click', function(){item_.crawlItem();});
		$('.register-site').submit(function(){item_.crawlItem(); return false;});

	/*For Item Main Page : http://www.fassion.co.kr	
		->Bind event of opinion
	*/   
		$('#reviewBtn > a').bind('click',function(){		
			item_.opnionActionInit($(this));
		});

	/*For Item Main Page : http://www.fassion.co.kr	
		->Bind event of opinion
	*/   
		//Bind the event of review(action) button
		$('.itemView .image-item > div > a').bind('click',function(){			
			item_.opnionViewPageActionInit($(this));
		});
		//Bind the event of hover action on the image
		$('.itemView .image-item').bind({
			mouseenter: function() {  item_.itemViewPageLayerHover($(this));},
			mouseout: function() {}
		});
		//Bind the event of talkbox
		item_.initViewPageTalkbox();
		//Bind the event of talk list
		$('.commentType > li > a').bind('click',function(){			
			item_.getTalk($(this));
		});



	/* 
	  @ FuncionName : 아이템 파일 업로드 버튼 클릭
	  @ HanddleAttribute : #form_add_item
	*/
	$('#file_item').bind('change', function () {
		if($(this).val() != "") {
			if(validation.isImageFile($(this).val()) == false) {
				$(this).val("");
				$('#dialog').html("이미지 파일 을 업로드 해주세요");
				$('#dialog').dialog({ autoOpen: true, width: "300", height:"150", title: "이미지 파일을 업로드 해주세요"});
			} else {
				$('#form_add_item').attr('target', 'frmFile');
				$('#form_add_item').attr('method', 'post');
				$('#form_add_item').attr('action', '/common/common.item.image.uploa.dproc');					
				$('#form_add_item').submit();
			}
		}
	});
	/* 
	  @ FuncionName : 아이템 파일 업로드 '최종 저장' 버튼 클릭
	  @ InterCallFunction : item.save
	*/
	$('#item_saveBtn').bind('click', function() { item.save(); });

});
//Global var,module definition
var checkSum = 0; 
var item_ = {
	//임시데이터 저장, 아이템번호, 액션타입
	invokedata : {
		rino : "",
		ratype : ""		
	},
	initArrow : function(){
		$('.rightCorner').remove();
		$('.leftCorner').remove();
	},
	getTalk : function(obj){		
		//Set vars
		var ino = REQUEST_URI.split("/item/view/"); // extract itemno[Array]		
		var talkStat = obj.attr("id").split("comment"); // 체크된 토크 유형[Array]
		if(isNaN(Number(ino[1]))) {			
			return false;
		}else{
            //Change the tab clicked
			
			obj.parent().attr("class","on").siblings().attr("class","")
			//Call the ajax
			var url = "/item/item.get.talk.proc";		
			var data = "&ino="+ino[1]+"&atype="+talkStat[1].toLowerCase();		
			$.ajax({ type: "POST", url: url, data: data, success: this.getTalkRequest });	
		}		
	},
	getTalkRequest : function(data){		
		var result = $.parseJSON(data);
		if(result.result == "success") {		
			//Set vars
			talkHtml ="";
			//Set html			
			for(var i=0; i<result.itemlist.length; i++) {
				if(result.itemlist[i].atype == "w"){
					result.itemlist[i].atype = "wish";
				}else if(result.itemlist[i].atype == "h"){
					result.itemlist[i].atype = "have";
				}else if(result.itemlist[i].atype == "t"){
					result.itemlist[i].atype = "talk"
				}
				talkHtml = talkHtml +"<li id='comment"+result.itemlist[i].tno+"'>";
				talkHtml = talkHtml +"<img src='/images/common/_thum/@dummy-bloger.jpg' alt='' />";
				talkHtml = talkHtml +"	<span>"+result.itemlist[i].talk+"</span>";
				talkHtml = talkHtml +"	<span class='icon "+result.itemlist[i].atype+"'>"+result.itemlist[i].atype+"</span>";
				talkHtml = talkHtml +"</li>";
			}		
			//Append html
			$(".commentCont > li").remove();
			$(".commentCont").append(talkHtml);
		}else{
			//Append html
			$(".commentCont > li").remove().append("등록된 댓글이 없습니다.");
		}		
	},
	itemViewPageLayerHover: function(obj){
		Btn = $(obj).children(".buttonBox");		
		Btn.show();		
		$(obj).mouseleave(function() {
			Btn.hide();			
		}); 
	},
	initViewPageTalkbox : function(){
		var ino = REQUEST_URI.split("/item/view/");
		if(isNaN(Number(ino[1]))) {
			//alert('its string or other'); 
			//alert("initViewPageTalkbox Failed, it's not a view page or other reasone");
			return false;
		}else{
			// Bind event to trigger the Keboard-user-action
			$('#textbox').keydown(function(event){
				var keycode = (event.keyCode ? event.keyCode : event.which);	
				if(keycode=="13" && event.shiftKey){
					alert('SHIFT+ENTER 키를 누르셨습니다.');
				}else if(keycode=="13" && !event.shiftKey){ // Run the ajax						
					//Ajax call
	//				alert($("#textbox").val());
					item_.addTalkViewPage(ino[1]);
					//alert(obj.children(".comment-write").children("#textbox").val());
				}
			});
		}
		
	},
	gtextVal : ""
	,
	addTalkViewPage : function(ino){	
		//Set vars
		atypeArr = $(".togetherTalk").attr("class").split(" ");
		textVal = $("#textbox").val();
		encodedText= encodeURIComponent($("<div />").text(textVal).html());	
		item_.gtextVal = $("<div />").text(textVal).html();
		item_.invokedata.rino = ino;
		item_.invokedata.ratype = atypeArr[1];		
		
		//Call the ajax
		var url = "/item/item.add.talk.proc";		
		var data = "&ino="+ino+"&atype="+atypeArr[1]+"&talk="+encodedText;		
		$.ajax({ type: "POST", url: url, data: data, success: this.addTalkViewPageItemRequest });
	},
	addTalkViewPageItemRequest : function(data){
		//댓글 노출 영역에 추가
		var result = $.parseJSON(data);
		if(result.result == "success") {
			// Init the textbox
			$("#textbox").val("");
			// Make talkContent
			talkHtml = "";
			talkHtml = talkHtml +"<li id='comment"+(Number(Number(item_.invokedata.rino)+Number(1)))+"'>";
			talkHtml = talkHtml +"<img src='/images/common/_thum/@dummy-bloger.jpg' alt='' />";
			talkHtml = talkHtml +"	<span>"+item_.gtextVal+"</span>";
			talkHtml = talkHtml +"	<span class='icon "+item_.invokedata.ratype+"'>"+item_.invokedata.ratype+"</span>";
			talkHtml = talkHtml +"</li>";
		
			// Add talk to talkArea
			if(typeof($(".commentCont > li:first").attr("id")) == "undefined"){
				$(".commentCont").append(talkHtml);
			}else{
				$(".commentCont > li:first").before(talkHtml);
			}
		
			
			

			
			alert('토크가 성공적으로 등록되었습니다.');
		}else{
			alert('addTalkViewPage Failed');
		}
		//init vars
		item_.gtextVal = "";
		item_.initInvoke();
	},
	addTalk : function(obj,ino){	
		//Set vars
		objArr = obj.attr("id").split("item");
		atypeArr = obj.children(".comment-write").attr("id").split("Comment");
		textVal = obj.children(".comment-write").children("#textbox").val();
		encodedText= encodeURIComponent($("<div />").text(textVal).html());			
		item_.invokedata.rino = objArr[1];
		item_.invokedata.ratype = atypeArr[0];
		//Call the ajax
		var url = "/item/item.add.talk.proc";		
		var data = "&ino="+objArr[1]+"&atype="+atypeArr[0]+"&talk="+encodedText;		
		$.ajax({ type: "POST", url: url, data: data, success: this.addTalkItemRequest });
	},
	addTalkItemRequest : function(data){

		var result = $.parseJSON(data);
		if(result.result == "success") {			
			ino = item_.invokedata.rino;
			atype =item_.invokedata.ratype;
			abutton =	$("#item"+ino+" > div > div ."+atype+""); // 버튼 Object
			hitsNum = abutton.parent().parent().children(".hits-num").children("."+atype+"");	// 액션 카운트
			textBox = $("#item"+ino).children(".comment-write"); // 텍스트 박스
			// change the count of action
			hitsNum.text(Number(hitsNum.text()) + 1);		
			// Remove talk
			textBox.remove();
			// Masonry 리셋
			var $contents = $('#contents');
			$contents.imagesLoaded(function(){				
						$contents.masonry({
							itemSelector: '.item'
						});
						item_.initArrow();
						index.arrow_points();
			});
			alert("토크가 성공적으로 등록되었습니다.");
		}else{
			alert("addTalk Failed");
		}
		item_.initInvoke();
	},	
	talkViewPageActive : function(obj,ino,atype){
		
		//Focus the state of the web page
		$('#textbox').focus();	
		//Change the button of talk CSS and rebind action		
		obj.attr("class","button talk disabled");
		obj.unbind("click");
		obj.bind("click",function(){			
			obj.attr("class","button talk");
			item_.talkViewPageInActive(obj);			
		});
		
	},
	talkViewPageInActive : function(obj){
		//Bind event talk button
		talkButton = obj.children(".reviewCategory-product").children("#reviewBtn").children(".talk");	
		obj.attr("class","button talk");
		obj.unbind("click");
		obj.bind("click",function(){			
			obj.attr("class","button talk disabled");
			item_.talkViewPageActive(obj);			
		});
	},
	// obj : ItemDivDOM	, itemNo, actionType
	talkActive : function(obj,ino,atype){
		
		//Set vars
		rbButtonBox = obj.children(".reviewCategory-product").children("#reviewBtn");	
		rbBoxArr= rbButtonBox.attr("class").split(" ");
		talkTypeCss = (typeof(rbBoxArr[1]) == "undefined") ? "talk" :  rbBoxArr[1];

		//Change the talk CSS and rebind action
		talkHtml ="";
		talkHtml = talkHtml+"<div class='comment-write' id='"+talkTypeCss+"Comment'>";
		talkHtml = talkHtml+"	<p>가지고 싶은 아이템 콕! 찍고 토크 남기고</p>";
		talkHtml = talkHtml+"	<img src='/images/common/_thum/@dummy-blogerprofile.jpg' alt='' />";
		talkHtml = talkHtml+"	<textarea id='textbox'>";
		talkHtml = talkHtml+"	</textarea>";
		talkHtml = talkHtml+"</div>";		
		//Insert the tag after bloger
		obj.children(".bloger").after(talkHtml);
		// Masonry 리셋
		var $contents = $('#contents');
		$contents.imagesLoaded(function(){				
					$contents.masonry({
						itemSelector: '.item'
					});
					item_.initArrow();
					index.arrow_points();
		});
		// Bind event to trigger the Keboard-user-action
		$('#textbox').keydown(function(event){
			var keycode = (event.keyCode ? event.keyCode : event.which);	
			if(keycode=="13" && event.shiftKey){
				//alert('SHIFT+ENTER 키를 누르셨습니다.');
			}else if(keycode=="13" && !event.shiftKey){ // Run the ajax						
				//Ajax call
				item_.addTalk(obj,ino);
				//alert(obj.children(".comment-write").children("#textbox").val());
			}
		});
		//Focus the state of the web page
		obj.children(".comment-write").children("#textbox").focus();
		
		//Change the button of talk CSS and rebind action
		talkButton = obj.children(".reviewCategory-product").children("#reviewBtn").children(".talk");	
		talkButton.attr("class","button talk disabled");
		talkButton.unbind("click");
		talkButton.bind("click",function(){			
			talkButton.attr("class","button talk");
			item_.talkInActive(obj);			
		});
		
	},
	talkInActive : function(obj){
		//Remove talk box
		obj.children(".comment-write").remove();
		
		// Masonry 리셋
		var $contents = $('#contents');
		$contents.imagesLoaded(function(){				
					$contents.masonry({
						itemSelector: '.item'
					});
					item_.initArrow();
					index.arrow_points();
		});

		//Bind event talk button
		talkButton = obj.children(".reviewCategory-product").children("#reviewBtn").children(".talk");	
		talkButton.attr("class","button talk");
		talkButton.unbind("click");
		talkButton.bind("click",function(){			
			talkButton.attr("class","button talk disabled");
			item_.talkActive(obj);			
		});
	},
	opnionViewPageActionInit : function(obj){	
		if(USER>0){//Auth		
				var typeArr = obj.attr("class").split(" ");
				var ino = REQUEST_URI.split("/item/view/");
				
				if(isNaN(Number(ino[1]))) {
					//alert('its string or other'); 
					alert("opnionViewPageActionInit Failed, it's not a view page or other reasone");
					return false;
				}else{

					if(typeArr[2] == "disabled"){						
						item_.delViewPageOpinion(ino[1],typeArr[1]);
					}else if(typeArr[1] == 'talk'){
							item_.talkViewPageActive(obj,ino[1],typeArr[1]);	
					}else if(typeArr[1] == 'wish' || typeArr[1] == 'have'){
						   item_.addViewPageOpinion(ino[1],typeArr[1]);			
					}else{
						alert("비정상 접근입니다.");
					}		
				}

						
		}else{
			alert("로그인 후 이용가능합니다.");
			common.redirect("/login/");
		}	
	},
	opnionActionInit : function(obj){	

		if(USER>0){//Auth		
				var itemDivElm = obj.parent().parent().parent();
				var itemDivArr = obj.parent().parent().parent().attr("id").split("item");			
				var typeArr = obj.attr("class").split(" ");

					if(typeArr[2] == "disabled"){						
						item_.delOpinion(itemDivArr[1],typeArr[1]);
					}else if(typeArr[1] == 'talk'){	
							//Run toggle Action 
							//obj.toggle(item_.talkActive(itemDivElm),item_.talkInActive(itemDivElm));
							item_.talkActive(itemDivElm,itemDivArr[1],typeArr[1]);

					}else if(typeArr[1] == 'wish' || typeArr[1] == 'have'){
						item_.addOpinion(itemDivArr[1],typeArr[1]);
						// 토크박스 DOM 추가[atype]
					}else{
						alert("비정상 접근입니다.");
					}			
		}else{
			alert("로그인 후 이용가능합니다.");
			common.redirect("/login/");
		}
	},
	initInvoke : function(){
		item_.invokedata.rino = "";
		item_.invokedata.ratype = "";
	},
	delViewPageOpinion : function(ino,atype){			
		item_.invokedata.rino = ino;
		item_.invokedata.ratype = atype;
		var url = "/item/item.del.opinion.proc";		
		var data = "&ino="+ino+"&atype="+atype;
		$.ajax({ type: "POST", url: url, data: data, success: this.delViewPageRequest });
	},
	delViewPageRequest : function(data){
		var result = $.parseJSON(data);
		if(result.result == "success") {
			//Set vars
			ino = item_.invokedata.rino;
			atype =item_.invokedata.ratype;
			abutton =	$(".buttonBox > ."+atype+""); // 버튼 Object
			hitsNum = abutton.children(".numHit");	// 액션 카운트
			buttonBox = abutton.parent();
			textBox = $("#textbox").parent().parent(); // TextBox

			//Change the Button's css, rebind event			
			abutton.unbind("click");
			abutton.bind("click",function(){			
				abutton.attr("class","button "+atype+"");
				item_.opnionViewPageActionInit($(this));			
			});	
			// Sum the count of the action					
			hitsNum.text(Number(hitsNum.text()) - 1);
			// Bind a value of talk type to the buttonBox's class	
			buttonBox.attr("class","buttonBox");
			 //Check to the talk box is open or not
			textBox.attr("class","togetherTalk talk");			
			alert("Success delete action");
		}else{
			alert("Del Failed : Error occured unknown action error");
		}
		item_.initInvoke();//초기화		
	},
	delOpinion : function(ino,atype){			
		item_.invokedata.rino = ino;
		item_.invokedata.ratype = atype;
		var url = "/item/item.del.opinion.proc";		
		var data = "&ino="+ino+"&atype="+atype;
		$.ajax({ type: "POST", url: url, data: data, success: this.delOpinionItemRequest });
	},
	delOpinionItemRequest : function(data){
		
		var result = $.parseJSON(data);
		if(result.result == "success") {	
			//Set vars
			ino = item_.invokedata.rino;
			atype =item_.invokedata.ratype;
			abutton =	$("#item"+ino+" > div > div ."+atype+""); // 버튼 Object
			hitsNum = abutton.parent().parent().children(".hits-num").children("."+atype+"");	// 액션 카운트
			buttonBox = $("#item"+ino+" > div > div");
			textBox = $("#item"+ino).children(".comment-write").children("#textbox"); // TextBox
			textBoxCnt = textBox.length; // TextBox Length

			//Change the Button's css, rebind event		
			abutton.unbind("click");
			abutton.bind("click",function(){	
				abutton.attr("class","button "+atype+"");
				item_.opnionActionInit($(this));					
			});			
			// change the count of action
			hitsNum.text(Number(hitsNum.text()) - 1);			
			// Bind a value of talk type to the buttonBox's class	
			 buttonBox.attr("class","buttonBox");
			 //Check to the talk box is open or not
			if(textBoxCnt){
				textBox.parent().attr("id","talkComment");
			}
			
			alert("Success delete action");
		}else{
			alert("Del Failed : Error occured unknown action error");
		}
		item_.initInvoke();//초기화
	},	
	addViewPageOpinion : function(ino,atype){			
		item_.invokedata.rino = ino;
		item_.invokedata.ratype = atype;
		var url = "/item/item.add.opinion.proc";		
		var data = "&ino="+ino+"&atype="+atype;		
		$.ajax({ type: "POST", url: url, data: data, success: this.addViewPageOpinionRequest });
	},
	addViewPageOpinionRequest : function(data){
		var result = $.parseJSON(data);
			if(result.result == "success") {		
			//Set vars
			ino = item_.invokedata.rino;
			atype =item_.invokedata.ratype;
			abutton =	$(".buttonBox > ."+atype+""); // 버튼 Object			
			hitsNum = abutton.children(".numHit");	// 액션 카운트
			buttonBox = abutton.parent();			
			textBox = $("#textbox").parent().parent(); // TextBox		
			

			//Change the Button's css, rebind event			
			abutton.attr("class","button "+atype+" disabled");
			abutton.unbind("click");
			abutton.bind("click",function(){			
				abutton.attr("class","button "+atype+"");
				item_.delViewPageOpinion(ino,atype);			
			});	
			// Sum the count of the action					
			hitsNum.text(Number(hitsNum.text()) + 1);
			// Bind a value of talk type to the buttonBox's class	
			buttonBox.attr("class","buttonBox "+atype+"");
			 //Check to the talk box is open or not
			textBox.attr("class","togetherTalk "+atype+"");
			
			alert("성공적으로 "+atype+" 되었습니다.");
		}else{
			alert("Error occured  : "+ result.faildes);
		}
		item_.initInvoke();//초기화
	},
	addOpinion : function(ino,atype){			
		item_.invokedata.rino = ino;
		item_.invokedata.ratype = atype;
		var url = "/item/item.add.opinion.proc";		
		var data = "&ino="+ino+"&atype="+atype;		
		$.ajax({ type: "POST", url: url, data: data, success: this.addOpinionItemRequest });
	},
	addOpinionItemRequest : function(data){		
		var result = $.parseJSON(data);
		if(result.result == "success") {			
			//Set vars
			ino = item_.invokedata.rino;
			atype =item_.invokedata.ratype;
			abutton =	$("#item"+ino+" > div > div ."+atype+""); // 버튼 Object
			hitsNum = abutton.parent().parent().children(".hits-num").children("."+atype+"");	// 액션 카운트
			buttonBox = $("#item"+ino+" > div > div");
			textBox = $("#item"+ino).children(".comment-write").children("#textbox"); // TextBox
			textBoxCnt = textBox.length; // TextBox Length

			//Change the Button's css, rebind event			
			abutton.attr("class","button "+atype+" disabled");
			abutton.unbind("click");
			abutton.bind("click",function(){			
				abutton.attr("class","button "+atype+"");
				item_.delOpinion(ino,atype);			
			});	
			// Sum the count of the action					
			hitsNum.text(Number(hitsNum.text()) + 1);
			// Bind a value of talk type to the buttonBox's class	
			buttonBox.attr("class","buttonBox "+atype+"");
			 //Check to the talk box is open or not
			if(textBoxCnt){
				textBox.parent().attr("id",""+atype+"Comment");
			}
			
			alert("성공적으로 "+atype+" 되었습니다.");
		}else{
			alert("Error occured  : "+ result.faildes);
		}
		// Iniat some global vars
		item_.initInvoke();//초기화 
	},
	crawlItem : function(){		
		var url = "/common/context.item.add.proc";
		var targetURL = encodeURIComponent($('#crawll_url').val());
		var data = "&url="+targetURL;		
		$.ajax({ type: "POST", url: url, data: data, success: this.crawlItemRequest });
		$('#dialog-modal').dialog({ autoOpen: true });
	},
    crawlItemRequest : function(data){
		//document.write(data);		
		$('#dialog-modal').dialog("close");	
		var result = $.parseJSON(data);
		var html = "";
	    var src = "";
		var divimgTxt=''; // 반복 이미지 html문 저장용 변수
		var swidth = 0; // 이미지 임시 넓이
        var sheight = 0; // 이미지 임시 높이
		var thumbsize = 120; // 썸네일 제한 사이즈 
		var crallingsize = 89; // (크롤링)검색 제한 사이즈
		var nheight = 0; // 최종 이미지 높이
		var nwidth = 0; // 최종 이미지 넓이
		var divpoint = ""; // DIV CSS 변수 
		var j = 1; // 실제 이미지 갯수 카운트용
		var targetUrl = $('#crawll_url').val();
		var pinURL = ''; // 최종선택 이미지 URL
//		alert(result.imgList.length);
//		alert(result.price.length);

		if(result.result != "success" || result.imgList.length ==0) {
			alert("죄송합니다. 이미지 로딩이 불가능한 페이지입니다.\n다른 페이지를 입력해주세요");
			$('#crawll_url').focus();
//			$('#dialog').html("Occured error");
//			$('#dialog').dialog({ autoOpen: true, width: "300", height:"150", title: "Parsing of dom Failed" });
		} else {			

			/*------IMAGES RESIZE,ALOW SECTIONS : [S]------*/	
			for(var i=0; i<result.imgList.length; i++) {
				src = result.imgList[i][0]; // image URL
				swidth = result.imgList[i][1]; // image width
				sheight = result.imgList[i][2]; // image height

				//Algroithm of image size for viewing
					if(swidth > crallingsize && sheight > crallingsize  &&  sheight > thumbsize &&  swidth > thumbsize){	
								//alert(j+"번째의 나머지값은 ="+(j%5)+"입니다.");
								if(j % 5 == 0 ) {
									divpoint = "<div class='right' id='"+j+"'>";
								}else{									
									divpoint = "<div  id='"+j+"'>";
								} 								
							
								if(swidth === sheight) nwidth = nheight = thumbsize; //with&Height가 동일하면 동일하게 비율 조정
								if(swidth < sheight) { // 높이가 넓이보다 큰 경우
										nwidth  = thumbsize; // 넓이 120으로 변경 
										nheight  = thumbsize * (sheight / swidth); // 120 * (높이/넓이)
										nmarginTop = 0 - (nheight - thumbsize) / 2 + "px"; //이미지기본높이 - 조절된높이 = 즉 나머지 높이/2
										
										divimgTxt = divimgTxt +divpoint;
										divimgTxt = divimgTxt +"<a href='#' onclick=\"item_.makeItemDetail('"+targetUrl+"','"+swidth+"','"+sheight+"')\">";
										divimgTxt = divimgTxt +"<img src='"+src+"' style='margin-top:"+nmarginTop+";' width='"+nwidth+"' height='"+nheight+"' alt=''/>";
										divimgTxt = divimgTxt +"</a>";
										divimgTxt = divimgTxt +"<span class='size'>"+swidth+"x"+sheight+"</span>";
										divimgTxt = divimgTxt +"</div>";										
										
								}else if(swidth > sheight) { // 넓이가 높이보다 큰경우
										nheight = thumbsize; // 높이 120으로 변경 
										nwidth  = thumbsize * (swidth/sheight); // 120 * (넓이/높이)
										nmarginLeft = 0 - (nwidth - thumbsize) / 2 + "px";

										divimgTxt = divimgTxt +divpoint;
										divimgTxt = divimgTxt +"<a href='#'>";
										divimgTxt = divimgTxt +"<img src='"+src+"'  style='margin-left:"+nmarginLeft+";' width='"+nwidth+"' height='"+nheight+"' alt=''/>";
										divimgTxt = divimgTxt +"</a>";
										divimgTxt = divimgTxt +"<span class='size' >"+swidth+"x"+sheight+"</span>";
										divimgTxt = divimgTxt +"</div>";
								 }else{
										divimgTxt = divimgTxt +divpoint;
										divimgTxt = divimgTxt +"<a href='#' onclick=\"item_.makeItemDetail('"+targetUrl+"','"+swidth+"','"+sheight+"')\">";
										divimgTxt = divimgTxt +"<img src='"+src+"' width='"+nwidth+"' height='"+nheight+"' alt=''/>";
										divimgTxt = divimgTxt +"</a>";
										divimgTxt = divimgTxt +"<span class='size'>"+swidth+"x"+sheight+"</span>";
										divimgTxt = divimgTxt +"</div>";
								 }
						j++; // it's for inner DIV no 
					}
					
			 }
			j=1; // init counter
			/*------IMAGES RESIZE,ALOW SECTIONS : [E]------*/	
			
			/*------DIV POSITION ADJUST SECTIONS : [S]------*/	
			common.closeSimpleLayer("sitePop");
			//common.openCenterLayer("urlsitePop",-1,"",100);	
			$('#webImgList').html(divimgTxt);			
			$('#popInner .txt-source').html("<span>출처</span>: "+$('#crawll_url').val());
			common.openTopLayer("urlsitePop",-1,"",100);
			/*------DIV POSITION ADJUST SECTIONS : [E]------*/	
			/*------EVENTS BIND SECTIONS : [S]------*/	
			$("#webImgList div img").bind({
			 mouseover:function(){	 item_.overItemListByUrl(this,targetUrl);	 },
			 click:function(){ }			
			});
			/*------EVENTS BIND SECTIONS : [E]------*/	
		}
	},
	makeItemDetail : function(comedurl,targetUrl,realSize){
		if(comedurl=="" || comedurl == 'undefined'){	
			alert("이미지를 선택해주세요");
			return false;
		}else{
			/*
				item_.initColSelect("colOnItemPop");
				item_.initcate("cate_code1","1차분류");
				item_.initcate("cate_code2","2차분류");
			*/
			/*Collection 정보 가져오기*/
			item_.getListCollection();			
			/*카테고리 초기 1Depth 로딩 및 Arrange*/
			//item_.setCategory(10); // need to set colNo by SESSION value

			realSize=realSize.split('x');	
			
			common.closeSimpleLayer("urlsitePop");
			common.openCenterLayer("make-sitePop",-1,-1,100);			
			$('#popInner dl dt img').attr("src",comedurl);			
			$('#origin').val(targetUrl);

			$('#popInner #selectedWidth').val(realSize[0]);
			$('#popInner #selectedHeight').val(realSize[1]);
			$('.cate-make .buttonBox').bind('click',function(){ item_.addItemByURL(); }); // EVENT BIND
			
		}
	},	
	overItemListByUrl : function(obj,targetUrl){
		var eq = $("#webImgList div img").index(obj);				
		 for (i=0;i<$("#webImgList div img").length;i++ )
		  {
			   if (i == eq) //클릭한 값 
			   {				
					pinURL = $("#webImgList div:eq("+eq+") a img").attr("src");
					realSize = $("#webImgList div:eq("+eq+") span").text();
					$("#webImgList div:eq("+eq+") span").hide();														
					$("#webImgList div:eq("+eq+")").append("<span class='btn-register' onclick=\"item_.makeItemDetail('"+pinURL+"','"+targetUrl +"','"+realSize+"')\">아이템 등록하기</span>");							
			   }else{ // 그 외 값 초기화.
					$("#webImgList div:eq("+i+") .btn-register").remove();
					$("#webImgList div:eq("+i+") .size").show();
			   }						  
		  }	
	},
	/*Set of category 1Depth using AJAX*/
	getListCollection : function(){		
		var url = "/common/get.list.collection";			
		$.ajax({ type: "POST", url: url,  success: this.returnListCollection });
	},
	returnListCollection : function(data){
		var result = $.parseJSON(data);		
		var tagMakeCol =""; //CollectionMakeTag
			  tagMakeCol = "<li class='category-make'>";
			  tagMakeCol = tagMakeCol+"<input type='text'>";
			  tagMakeCol = tagMakeCol+"<button type='submit'>만들기</button>";
			  tagMakeCol = tagMakeCol+"</li>";				
		if(result.result == "success") {		
			
			colLength = result.col_list.length;
			item_.initColSelect("colOnItemPop");
			
			for(i=0;i<colLength;i++){				
				colNo = result.col_list[i].colNo;
				colName = result.col_list[i].colName;				
				$('#colOnItemPop ul').append("<li><a href='#none' data-colno='"+colNo+"'>"+colName+"</a></li>");						
			}
			$('#colOnItemPop ul').append(tagMakeCol);
			// Category list Set depended on the colNo
			item_.setCategory(result.col_list[0].colNo); 
			/*------BINDING EVENTS SECTIONS : [S]------*/	
			if(checkSum == 0){				
				$('#colOnItemPop').bind('click',function(){item_.toggleCol();});				
				checkSum = 1; 
			}
			$('#colOnItemPop ul li').bind('click',function(){item_.changeCol(this);});
				$('.category-make :submit').bind('click',function(){					
					var colName = $('.category-make input').val();			
					(colName == '') ? "" : item_.makeCol(colName);				
					return false; 
			});
			/*-------BINDING EVENTS SECTIONS : [E]-----*/
		}else{
			alert('Failed to get collection list : error(Collection, Please Check a Coltroller or a JS function)');
		}
	},
	makeCol : function(colName,colDesc,cate1,cate1_2,cate2,cate2_2,cate3,cate3_2,cate4,cate4_2,cate5,cate5_2){			
		var url = "/common/set.one.collection";
		var data = "&colName="+colName+"&colDesc="+colDesc;
		var data = data+"&cate1="+cate1+"&cate1_2="+cate1_2;
		var data = data+"&cate2="+cate2+"&cate2_2="+cate2_2;
		var data = data+"&cate3="+cate3+"&cate3_2="+cate3_2;
		var data = data+"&cate4="+cate4+"&cate4_2="+cate4_2;
		var data = data+"&cate5="+cate5+"&cate5_2="+cate5_2;
		$.ajax({ type: "POST", url: url, data: data, success: this.returnMakeCol });
	},
	returnMakeCol : function(data){
		var result = $.parseJSON(data);
		if(result.result == "success") {		
			colNo = result.addedColNo
			colName = result.addedColName
			liLength	= $('#colOnItemPop ul li').length;

			$("#colOnItemPop ul li:eq("+(liLength-2)+")").after("<li><a href='#none' data-colno='"+colNo+"'>"+colName+"</a></li>");
			$('#colOnItemPop ul li').bind('click',function(){item_.changeCol(this);});
		}else{
			alert('Failed to make a collection : error(Collection, Please Check a Coltroller or a JS function)');
		}
	},
	toggleCol : function(){
		if($('#colOnItemPop ul').css('display')=='block' ){
			$('#colOnItemPop ul').hide();	
		}else{
			$('#colOnItemPop ul').show();	
		}	
	},
    changeCol : function(obj){			
		var eq = $("#colOnItemPop ul li").index(obj);
		var eq_length = $("#colOnItemPop ul li").length;
		if(eq==(eq_length-1)){ // Check if its last or not
			$('#colOnItemPop ul').hide();	
		}else{
			textValue = $("#colOnItemPop ul li a:eq("+eq+")").text();		
			 $("#colOnItemPop p").text(textValue);		
			 //****[Fassion][2013.01.18] Need to set values of category : OK					
			 backColNo= $("#colOnItemPop ul li a:eq("+eq+")").attr('data-colno');
			 item_.setCategory(backColNo);
		}
	},
	setCategory : function(colNo){	
		if(colNo!=''){
		}else{
			colNo = 10;
		}	
		//****[Fassion][2013.01.18] Need to set a value of collectionNo
		$('#selectedColNo').val(colNo);
		var url = "/common/get.category.init";
		var data = "&colNo="+colNo;
		$.ajax({ type: "POST", url: url, data: data, success: this.returnCategory });
	},
	returnCategory : function(data){			
				//alert(data);
				var result = $.parseJSON(data);
				item_.initcate("cate_code1","1차분류");
				item_.initcate("cate_code2","2차분류");
				if(result.result == "success") {					
					categoryLength = result.cate_init_list.length;
					for(i=0;i<categoryLength;i++){
						code = result.cate_init_list[i].cate1;
						desc = result.cate_init_list[i].cate_desc;
						$('#cate_code1').append("<option value='"+code+"'>"+desc+"</option>");						
					}					
				} else {
					alert('Failed to init : error(Category,Please Check a Coltroller or a JS function)');
				}
	},
	cateSelectChange2 :function(cate_code1){
		var _cate1 = $("#"+cate_code1+" option:selected").val();
		var _selectedColNo = $('#selectedColNo').val();
		var url = "/common/get.category2";
		var data = "&colNo="+_selectedColNo+"&cate_1="+_cate1;		
		$.ajax({ type: "POST", url: url, data: data, success: this.returnCategory2 });		
	},
	returnCategory2 : function(data){			
				var result = $.parseJSON(data);				
				if(result.result == "success") {					
					categoryLength = result.cate2_list.length;
					item_.initcate("cate_code2","2차분류");
					for(i=0;i<categoryLength;i++){
						code = result.cate2_list[i].cate1;
						code2 = result.cate2_list[i].cate2;
						desc = result.cate2_list[i].cate_desc;						
						$('#cate_code2').append("<option value='"+code2+"'>"+desc+"</option>");						
					}										
				} else {
					alert('Failed to get category2 : error(CategoryReturnFailed,Please Check a Coltroller or a JS function)');
				}
	},
	initcate: function(id, text) {		
		$("#"+id+" option").remove();
		$("#" + id).append("<option value=''>"+text+"</option>");
		
	},						
	initColSelect: function(id) {		
		$("#"+id+" ul li").remove();			
		$("#colOnItemPop p").text("어느 컬렉션에 넣을까요?");		
	},
	initItemImage : function() {
		$('#tmp_item_image').val("");
		$('#add_item_image').attr('width', '80');
		$('#add_item_image').attr('height', '80');
		$('#add_item_image').attr('src', IMAGES+'/common/profile_blank.gif');
		$('#dialog').html("이미지 초기화");
		$('#dialog').dialog({ autoOpen: true, width: "300", height:"150", title: "이미지가 초기화"});
	},
	previewItemImage : function(filename) {		
		$('#tmp_item_image').val(filename);
		$('#add_item_image').attr('width', '80');
		$('#add_item_image').attr('height', '80');		
		$('#add_item_image').attr('src', DOMAIN_FILE+'/tmp/' + filename);
	},
	save : function() {
		alert(1);
//		var actionurl = secureDomain+"/myrevu/info.modify.proc";
//		$('#form_add_item').attr('method', 'post');
//		$('#form_add_item').attr('action', actionurl);	
//		$('#form_add_item').attr('target', '');	
//		$('#form_add_item').submit();
	},	
	addItemByURLOffset : 0 // Check to the doubleclicked
	,	
	addItemByURL : function(){
	    //addItemByURLOffset
		if(item_.addItemByURLOffset == 0){
			item_.addItemByURLOffset = 1; // Change the status is running
			var origin = $('#popInner #origin').val();		
			var selectedSrc = $('#popInner dl dt img').attr('src');
			var selectedColNo = $('#popInner #selectedColNo').val();		
			var selectedCate1 = $('#cate_code1 option:selected').val();
			var selectedCate2 = $('#cate_code2 option:selected').val();
			var itemName = $('#itemName').val();
			
			var url = "/item/item.add.byurl.proc";
			var data = "&itemImgUrl=" + selectedSrc + "&selectedColNo=" + selectedColNo;
				  data = data +  "&selectedCate1=" + selectedCate1 + "&selectedCate2=" + selectedCate2;
				  data = data +  "&itemName=" + itemName + "&origin=" + origin;
				  $.ajax({ type: "POST", url: url, data: data, success: this.addItemByURLReuest });
		}else{
			//Double click
			alert("Dont alowed double click!");
		}
	},
	addItemByURLReuest : function(data){
		
		var result = $.parseJSON(data);
		if(result.result == "success") {
			alert("아이템 등록이 정상적으로 완료 되었습니다!");
		}else{
			alert("addItem Failed");
		}
		common.closeSimpleLayer("make-sitePop");
		
		item_.addItemByURLOffset = 0; // status is finished
	},
    addItemByBookmarklet : function(){
		//By the Bookmarklet
	},
    addItemByLocal : function(){
		//By the LocalFile
	}
};
