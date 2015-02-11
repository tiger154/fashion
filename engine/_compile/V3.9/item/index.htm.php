<?php /* Template_ 2.2.4 2013/01/25 16:56:49 /www/fassion10/engine/view/V3.9/item/index.htm 000007168 */ ?>
<link rel="stylesheet" type="text/css" href="<?php echo $TPL_VAR["CSS"]?>/_global/contents.css" />
<script>
$(document).ready( function() {	
	common.setLayer("addItem_parent");
	common.setLayer("addItem");
	common.setLayer("addItemDirected");

	// Final fixed Dialog DIVs
	common.setLayer("sitePop");
	common.setLayer("urlsitePop");
	common.setLayer("make-sitePop");	
});

function addItemByItself(){   
	$("#addItem_parent").hide();	
	common.openCenterLayer('addItemDirected',-1,-1,100);	
}
function additemByUrl(){
    //common.closeLayer('addItem_parent');	
	alert('asdfasdf');
	$("#addItem_parent").hide();	
	common.openCenterLayer('addItem',-1,-1,100	);
}
</script>


<div id="comm-cont" class="itemContainer">
				<div id="itemBox-add" class="sectionBox">
					<img src="/images/common/_layout/thumFile_130111.gif" alt="" class="thumbFile" />
					<h3 class="section-title">새로운 아이템 추가</h3>
					<dl class="sectionCont" id="itemBox-cont">
						<dt class="section-title">FASHION is PASSION</dt>
						<dd>
							<p class="itemIntro">가지고 싶은 패션 아이템이 있나요? 자랑하고 싶은 패션 아이템이 있나요?</p>
							<div class="buttonBox">
								<a href="#none" class="button register"><span>직접 등록</span></a>
								<a href="javascript:common.openCenterLayer('sitePop',-1,-1,100)" class="button register-url"><span>URL 등록</span></a>
								<a href="#none" class="button register-facebook"><span>페이스북 사진 등록</span></a>
							</div>
							<p class="bookmark">북마클릿을 사용하시면 보다 쉽고 편하게 아이템을 등록할 수 있습니다.</p>
							<a href="#none" class="button btn-bookmark"><span>북마클릿 등록</span></a>
						</dd>
					</dl>
				</div>
				<div class="loginArea">
					<img src="/images/common/_thum/@dummy_profile02.jpg" alt="" />
					<a href="#none" class="nickName">로아공주</a>
					<div class="dialogBox" id="privateBox" style="display:none;">
						<span class="toparrow"></span>
						<div>
							<img src="/images/common/_thum/@dummy_profile.jpg" alt="" />
							<span>로아공주님</span>
							<dl class="hitsList">
								<dt class="first">Item</dt>
								<dd class="first">15,254</dd>
								<dt class="last">Collection</dt>
								<dd class="last">82</dd>
							</dl>
						</div>
						<ul class="sectionList">
							<li><a href="#none">아이템</a></li>
							<li><a href="#none">컬렉션</a></li>
							<li><a href="#none">Wish</a></li>
							<li><a href="#none">Have</a></li>
							<li><a href="#none">친구초대</a></li>
							<li><a href="#none">친구찾기</a></li>
							<li><a href="#none">회원정보관리</a></li>
							<li class="last"><a href="#none">로그아웃</a></li>
						</ul>
					</div>
				</div>
		</div>
<!-- Bind Layer : (s) -->
	<div id="sitePop" class="layerPop"><?php $this->print_("getItemByUrl",$TPL_SCP,1);?> </div> <!-- getItemByUrl POPUP DIV -->
	<div id="urlsitePop" class="layerPop" > <?php $this->print_("parsedImgList",$TPL_SCP,1);?></div> <!-- parsedImageList POPUP DIV -->
	<div id="make-sitePop" class="layerPop" > <?php $this->print_("makeSitePop",$TPL_SCP,1);?></div> <!-- makeDetailOfItem -->
<!-- Bind Layer : (e) -->

	
* 아이템 등록 테스트(URL기반 업로드)
   -> <a href="javascript:common.openLayer('addItem')" >아이템 등록</a> <br/> <br/> <br/>

* 아이템 등록 테스트(직접 업로드)
   -> <a href="javascript:common.openLayer('addItemDirected')" >아이템 등록</a>






<div id="addItem_parent" style="border: solid; background-color: #FFF; width:750px; height:500px;" >
	<ul>
		<li class="title">
			새로운 아이템 추가 <br>
			가지고 싶은 패션 아이템이 있나요?<br>

			FASHION IS PASSION!!<br>
			
		</li>
		<br> 
		<li class="input_area">			
				<li>
					&nbsp; 1)  <input type="button" value="직접 등록" onclick="addItemByItself();">
				</li>
				<li>
					<br> 
					&nbsp; 2) <input type="button" value="URL 등록" onclick="additemByUrl();">
				</li>	
				<li>
					<br> 
					&nbsp; 3) <input type="button" value=" 페이스북 사진 등록(2차개발)" onclick="">
				</li>			
		</li>
		<li class="bottom">
			<img src="/images/common/but/but_w_xclose.gif" align="right" alt="닫기" title="닫기" onClick="common.closeLayer('addItem_parent');" />
		</li>
  </ul>
</div> 


<div id="addItem" style="border: solid; background-color: #FFF; width:750px; height:500px;" >
	<ul>
		<li class="title">
			웹사이트 URL로 아이템 등록하기 <br> 자주가는 쇼핑몰이나 웹사이트가 있으세여? <br>
			웹사이트 제품 페이지 링크를 아래에 입력해 주세요. 			
		</li>
		<br>
		<li class="input_area">			
				<li>
					- URL :  <input type="text" name="crawll_url" id="crawll_url" value="http://www.wizwid.com/CSW/handler/wizwid/kr/MainView-MainView" class="crawll_url" />
				</li>
				<li>
					<br> 
					- <input type="button" value="아이템 가져오기" onclick="additem();">
				</li>			
		</li>
		<li class="bottom">
			<img src="/images/common/but/but_w_xclose.gif" align="right" alt="닫기" title="닫기" onClick="common.closeLayer('addItem');" />
		</li>
  </ul>
</div> 
<!-- 이미지 리스팅:s -->
<!--div id="parsedImgList" style="display:none; position:absolute;border: solid;width:1000px; " ></div-->	
<!-- 이미지 리스팅:e -->

<iframe name="frmFile" id="frmFile" width="0" height="0" frameborder="0"></iframe>
<div id="addItemDirected" style="border: solid;background-color: #FFF; width:750px; height:500px;">
<form name="form_add_item" id="form_add_item" enctype="multipart/form-data">
	<ul>
		<li class="title">
			아이템 직접 등록하기 <br><br>
			* 컴퓨터에 저장되어있는 사진을 등록해 주세요 	
		</li>
		<br>
		<li class="input_area">	
				<li class="fl">
						<img src="<?php echo $TPL_VAR["imgsrc"]?>" id="add_item_image" alt="프로필이미지" width="100" height="100" />
				</li>

				<li>
						<input type="file" name="file_item" id="file_item" value=""  class=""/><br />
						<input type="hidden" name="tmp_item_image" id="tmp_item_image" width="80" height="80" value="" />
				</li>			
		</li>
		* 아이템명 : <input type="text" value="아이템 이름을 입력해주세요"><br>
		* 컬렉션 선택 : <select name="collection" >
									   <option value="1">컬렉션 1</option>
									   <option value="2">컬렉션 2</option>
									   <option value="3">컬렉션 3</option>
								  </select><br>
		* 카테고리 선택 : <select name="category" >
									   <option value="1">의류</option>
									   <option value="2">신발</option>
									   <option value="3">가방</option>
								  </select><br>

		<center>	
			<img src="/images/common/but/but_gb_save.gif" id="item_saveBtn" alt="저장하기" title="저장하기" class="btn" />
		</center>
		<li class="bottom">
			<img src="/images/common/but/but_w_xclose.gif" align="right" alt="닫기" title="닫기" onClick="common.closeLayer('addItemDirected');" />
		</li>
  </ul>
 </form>
</div>