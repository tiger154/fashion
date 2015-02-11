$(document).ready( function() {

	//Event bind to the crawlButton form		
	$('.register-site .buttonBox').bind('click', function(){item_.crawlItem();});
	$('.register-site').submit(function(){item_.crawlItem(); return false;});

});
//Global var,module definition
var checkSum = 0; 
var active = {
	addWish : function(itemNo){
		// 1. AuthCheck
		// 2. AjaxCall 
		// 3. /item/add.wish.proc
		//     - itemNo,cuserno,
//		var url = "/item/add.wish.proc";			
//		$.ajax({ type: "POST", url: url,  success: this.returnAddWish });
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
	}
};
