<!--
$(document).ready( function() {

	$('.bloger img').bind({
		mouseenter: function() { index.userLayerHover(this);},
		mouseout: function() {}
	});	
	$('.reviewCategory-product').bind({
		mouseenter: function() {  index.itemLayerHover(this);},
		mouseout: function() {}
	});
	

	
});	

var index = {
	arrow_points: function(){ 
		var s = $('.item');
		$.each(s,function(i,obj){
		
			var posLeft = $(obj).css("left");
			//alert(posLeft);
			$(obj).addClass('');
			if(posLeft == "0px")
			{
				html = "<span class='rightCorner'></span>";
				$(obj).prepend(html);
			}
			else
			{
				html = "<span class='leftCorner'></span>";
				if(i==1){
					
					html = "<span class='leftCorner' style='top:53px;'></span>";
				}
				$(obj).prepend(html);
			}
		});
	},
	more_results: function(){
		var ID = $('.item:last').attr("id");
		
		if(ID){
			IDarr = ID.split("item");		
			$.ajax({
			type: "POST",
			//url: "/facebook/main_test_ajax.html",
			url: "/item/item.get.list.proc",
			data: "lastid="+ IDarr[1],
			cache: false,
			beforeSend: function(){ $("#more"+ID).html('<img src="icons/ajaxloader.gif" />'); },
			success: function(data){
				
				
				var result = $.parseJSON(data);
				var html = "";

				if(result.result != "success" || result.itemlist.length ==0) {
					alert("InfinityScrollError:Fassion or Image is not avalible now");
				}else{
				
					for(var i=0; i<result.itemlist.length; i++) {
							oitemNo = result.itemlist[i]["itemNo"]; //
							oitemName = result.itemlist[i]["itemName"]; //
							ouserNo = result.itemlist[i]["userNo"]; //
							ouserNick = result.itemlist[i]["userInfo"]["nickname"]; //
							ocollectionNo = result.itemlist[i]["collectionNo"]; //
							ocateclass = result.itemlist[i]["cateclass"]; //
							ocolname = result.itemlist[i]["colname"]; //
							owishCnt = result.itemlist[i]["wishCnt"]; //
							ohaveCnt = result.itemlist[i]["haveCnt"]; //
							otalkCnt = result.itemlist[i]["talkCnt"]; //
							oviewCnt = result.itemlist[i]["viewCnt"]; //
							ourl = result.itemlist[i]["url"]; // origin url
							oitemurl = result.itemlist[i]["itemurl"]; //	img url					
							odateHM = result.itemlist[i]["dateHM"]; //	
							odateH = result.itemlist[i]["dateH"]; //
							if(odateH>11){
								timeType = "am";
							}else{
								timeType = "pm";
							}
							odateYMD = result.itemlist[i]["dateYMD"]; //
				
								
							html = html +"<div class='item' id='item"+oitemNo+"'>";
							html = html +"	<p class='dateTime'>";
							html = html +"		<span class='upload-time'><strong>"+odateHM+"</strong> "+timeType+"</span>";
							html = html +"		<span class='upload-date'>"+odateYMD+"</span>";
							html = html +"	</p>";
							html = html +"	<div class='reviewCategory-product'>";
							html = html +"		<a href='/item/view/"+oitemNo+"'><img src='"+oitemurl+"' alt='' /></a>";
							html = html +"		<span class='category-item "+ocateclass+"'>"+ocateclass+"</span>";
							html = html +"		<div id='reviewBtn' class='buttonBox' style='display:none'>";
							html = html +"			<a href='#none' class='button wish'><span>WISH</span></a>";
							html = html +"			<a href='#none' class='button have'><span>HAVE</span></a>";
							html = html +"			<a href='#none' class='button talk'><span>TALK</span></a>";
							html = html +"		</div>";
							html = html +"		<dl class='hits-num' style='display:none'>";
							html = html +"			<dt>WISH</dt>";
							html = html +"			<dd class='wish'>"+owishCnt+"</dd>";
							html = html +"			<dt>HAVE</dt>";
							html = html +"			<dd class='have'>"+ohaveCnt+"</dd>";
							html = html +"			<dt>TALK</dt>";
							html = html +"			<dd class='talk'>"+otalkCnt+"</dd>";
							html = html +"		</dl>";
							html = html +"	</div>";
							html = html +"	<p class='comment'>"+oitemName+"</p>";
							html = html +"	<div class='bloger'>";
							html = html +"		<img src='/images/common/top/@dummy/@dummy-blogerprofile.jpg' alt='' />";
							html = html +"		<p class=''>";
							html = html +"			<span>"+ouserNick+"</span>";
							html = html +"			<span class='blogTitle'>"+ocolname+"</span>";
							html = html +"			<a href='#none'>"+ourl+"</a>";
							html = html +"		</p>";
							html = html +"	</div>";
							html = html +"</div>";
					}
				}
				
				var $boxes = $(html);
				$boxes.css({ opacity: 0 });

				// Excute the script after images loaded
				$boxes.imagesLoaded(function(){
						$boxes.animate({ opacity: 1 })
						$("#contents").append($boxes).masonry('appended',$boxes); 
						item_.initArrow();
						index.arrow_points();
					
						$('.reviewCategory-product').bind({
							mouseenter: function() { index.itemLayerHover(this);},
							mouseout: function() {}
						});
						//Bind event of opinion 						
						$('#reviewBtn > a').bind('click',function(){		
							item_.opnionActionInit($(this));
						});
				 });			
				}
			});
		}else{
			alert("No more pages to load");
			//$("#more").html('The End');// no results
		}
		//return false;
	},
	userLayerHover: function(obj) {
		itemRoot = $(obj).parent().parent();		
		userLayer = $(obj).parent().next();
		userLayer.show();
		itemRoot.mouseleave(function() {userLayer.hide();} ); 
	},
	itemLayerHover: function(obj){
		Btn = $(obj).children("#reviewBtn");
		Hitsnum = $(obj).children(".hits-num");
		Btn.show();
		Hitsnum.show();
		$(obj).mouseleave(function() {
			Btn.hide();
			Hitsnum.hide();			
		}); 
	}
};
-->