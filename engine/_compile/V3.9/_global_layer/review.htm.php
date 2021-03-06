<?php /* Template_ 2.2.4 2011/10/31 18:31:49 /www/revu39/engine/view/V3.9/_global_layer/review.htm 000004877 */ ?>
<iframe name="frm" id="frm" width="0" height="0" frameborder="0"></iframe>

<form name="reviewForm" id="reviewForm" enctype="multipart/form-data">
<input type="hidden" name="blogURL" id="blogURL" value="" />
<input type="hidden" name="feedURL" id="feedURL" value="" />
<input type="hidden" name="type" id="type" value="" />
<input type="hidden" name="status" id="status" value="" />
<input type="hidden" name="author" id="author" value="" />
<input type="hidden" name="category" id="category" value="" />
<input type="hidden" name="title" id="title" value="" />
<input type="hidden" name="link" id="link" value="" />
<input type="hidden" name="guid" id="guid" value="" />
<input type="hidden" name="comments" id="comments" value="" />
<input type="hidden" name="description" id="description" value="" />
<input type="hidden" name="pubdate" id="pubdate" value="" />
<input type="hidden" name="blogimage" id="blogimage" value="" />
<input type="hidden" name="frno" id="frno" value="" />
<input type="hidden" name="rno" id="rno" value="" />
<input type="hidden" name="btnnum" id="btnnum" value="" />

<div class="box">
	<div class="title1">
		<!-- <div class="but_open" id="review"></div> -->
	</div>
	<div class="in">
		<input type="text" id="reviewTitle" value="" size="30" maxlength="100" class="input_common" style="width:417px;" />
	</div>
</div>

<div class="box">
	<div class="title2"></div>
	<div class="in" id="reviewCateForm">
		<div style="height:14px; padding:8px 0;">
			<span class="common11_text">* 작성하신 리뷰를 등록할 레뷰의 카테고리를 선택해주세요.</span>
		</div>
		<div style="height:22px; padding:8px 0;">
			<select name="cate1" id="cate1" onChange="reviewManager.changeCate1('cate1','cate2','cate3','cate4');">
				<option value="">1차분류선택</option>
			</select>
			<select name="cate2" id="cate2" onChange="reviewManager.changeCate2('cate1','cate2','cate3','cate4');">
				<option value="">2차분류선택</option>
			</select>
			<select name="cate3" id="cate3" onChange="reviewManager.changeCate3('cate1','cate2','cate3','cate4');">
				<option value="">3차분류선택</option>
			</select>
			<select name="cate4" id="cate4">
				<option value="">4차분류선택</option>
			</select>
		</div>
	</div>
</div>
		
<div class="box">
	<div class="title3"></div>
	<div class="in">
		<ul>
			<li style="width:80px; height:80px; overflow:hidden;">
				<img src="<?php echo $TPL_VAR["IMAGES"]?>/common/thum/thum_profile_dummy4.gif" id="thumb_image" width="110" height="110" alt="썸네일이미지" />
			</li>
			<li style="width:320px; height:18px; padding:4px 0 0 15px;">
				<span class="common11_text">* 등록하신 이미지는 리뷰 목록에서 썸네일로 보여지게 됩니다.</span>			
			</li>
			<li style="width:320px; height:24px; padding:4px 0 0 15px;">
				<span class="common11_text">* 1MB이하의 jpg,gif,bmp,png 파일만 등록 가능합니다.<br />
				&nbsp;&nbsp;&nbsp;(가로 300px 세로 300px 최적화)</span>
			</li>
			<li style="width:320px; height:18px; padding:8px 0 0 15px;">
				<div id="fileform">
					<input type="file" name="file1" id="file1" onChange="reviewManager.changeImage();" />
				</div>
				<input type="hidden" name="thumbmime" id="thumbmime" value="" />
				<input type="hidden" name="thumbname" id="thumbname" value="" />
				<input type="hidden" name="thumbsize" id="thumbsize" value="" />
			</li>
		</ul>
		<div class="clear"></div>
	</div>
</div>

<div class="box">
	<div class="title4"></div>
	<div class="in">
		<div style="height:14px; padding:8px 0;">
			<span class="common11_text">* 주소정보를 입력하면 구글맵과 자동으로 연동됩니다.</span>	
		</div>
		<div style="height:22px; padding:8px 0;">		
			<select name="bcode" id="bcode" onChange="reviewManager.changeArea1('bcode','mcode','scode')" style="width:120px;">
				<option value="">지역선택</option>
			</select>
			<select name="mcode" id="mcode" onChange="reviewManager.changeArea2('bcode','mcode','scode')" style="width:120px;">
				<option value="">지역선택</option>
			</select>
			<select name="scode" id="scode" style="width:120px;">
				<option value="">지역선택</option>
			</select>
		</div>
		<div style="height:22px; padding:8px 0;">		
			<input type="text" name="addr" id="addr" size="30" maxlength="100" class="input_common" />
		</div>
	</div>
</div>
<div class="clear"></div>
<div class="reg">
	<img src="/images/common/but/but_gs_in.gif" id="registBtn" alt="등록" title="등록" class="btn" />
	<img src="/images/common/but/but_ws_esc.gif" id="cancelBtn" alt="취소" title="취소" class="img_space btn" />
</div>

</form>