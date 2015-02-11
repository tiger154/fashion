$(document).ready( function() {

/*	
	cateSelectChange :function(cate_code1){
		var _cate1 = $("#"+cate_code1+" option:selected").val();
		
		category.search2(_cate1, cate2, cate3, cate4);
	},
*/
	//Event bind to the crawlButton form		
	$('.register-site .buttonBox').bind('click', function(){item_.crawlItem();});
	$('.register-site').submit(function(){item_.crawlItem(); return false;});


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
	addItemByURL : function(){
		//By the URL		
		
	    
		var origin = $('#popInner #origin').val();		
		var selectedSrc = $('#popInner dl dt img').attr('src');
		var selectedColNo = $('#popInner #selectedColNo').val();		
		var selectedCate1 = $('#cate_code1 option:selected').val();
		var selectedCate2 = $('#cate_code2 option:selected').val();
		var itemName = $('#itemName').val();
		
		//Check Routin to vars
		
		
		
		var url = "/item/item.add.byurl.proc";
		var data = "&itemImgUrl=" + selectedSrc + "&selectedColNo=" + selectedColNo;
		      data = data +  "&selectedCate1=" + selectedCate1 + "&selectedCate2=" + selectedCate2;
			  data = data +  "&itemName=" + itemName + "&origin=" + origin;	
			  
		$.ajax({ type: "POST", url: url, data: data, success: this.addItemByURLReuest });
	},
	addItemByURLReuest : function(data){
		//By the URL 
		//alert(data);
		common.closeSimpleLayer("make-sitePop");
		alert('아이템 등록이 정상적으로 완료 되었습니다.');
		
	},
    addItemByBookmarklet : function(){
		//By the Bookmarklet
	},
    addItemByLocal : function(){
		//By the LocalFile
	}
};
