<?php /* Template_ 2.2.4 2012/01/16 17:52:55 /www/revu39/engine/view/V3.9/manager/manager.detailview.adminpopup.editer.htm 000019201 */ 
$TPL_bcode_list_1=empty($TPL_VAR["bcode_list"])||!is_array($TPL_VAR["bcode_list"])?0:count($TPL_VAR["bcode_list"]);
$TPL_tel_number_1=empty($TPL_VAR["tel_number"])||!is_array($TPL_VAR["tel_number"])?0:count($TPL_VAR["tel_number"]);
$TPL_phone_number_1=empty($TPL_VAR["phone_number"])||!is_array($TPL_VAR["phone_number"])?0:count($TPL_VAR["phone_number"]);
$TPL_frontierOptionList_1=empty($TPL_VAR["frontierOptionList"])||!is_array($TPL_VAR["frontierOptionList"])?0:count($TPL_VAR["frontierOptionList"]);?>
<script type="text/javascript">
<!--

//-->
</script>

<script type="text/javascript" src="<?php echo $TPL_VAR["JS"]?>/_global/category.js"></script>
<script type="text/javascript" src="<?php echo $TPL_VAR["JS"]?>/_global/zipcode.js"></script>
<script type="text/javascript" src="<?php echo $TPL_VAR["JS"]?>/_global/input.js"></script>
<!-- <script type="text/javascript" src="<?php echo $TPL_VAR["EXTENDS"]?>/editor.htmlarea/config/htmlarea.js"></script> -->
<!-- <script type="text/javascript" src="<?php echo $TPL_VAR["EXTENDS"]?>/editor.htmlarea/config/htmlarea2.js"></script>-->
<!-- <script type="text/javascript" src="<?php echo $TPL_VAR["EXTENDS"]?>/editor.htmlarea/config/editor_init.js"></script> -->
<!-- <script type="text/javascript" src="<?php echo $TPL_VAR["EXTENDS"]?>/editor.htmlarea/config/editor_init2.js"></script> -->

<script type="text/javascript" src="<?php echo $TPL_VAR["EXTENDS"]?>/editor.htmlarea/config/button_action.js"></script>
<!-- <script type="text/javascript" src="<?php echo $TPL_VAR["EXTENDS"]?>/editor.htmlarea/config/button_action2.js"></script> -->

<input type="hidden" name="tmp_img" id="tmp_img" value="" />
<input type="hidden" name="frno" id="frno" value="<?php echo $TPL_VAR["frno"]?>" />
<input type="hidden" name="frid" id="frid" value="<?php echo $TPL_VAR["frid"]?>" />
<form name="RevUform" id="RevUform" method="post" enctype="multipart/form-data" action="">
	<!-- 상단 -->
	<table border="0" width="980" cellpadding="5" cellspacing="0" >
		<tr>
			<!--본문-->
			<td valign="top" bgcolor="#FFFFFF">
				<table border="0" width="100%">
					<tr>
						<td align="left" height="35" border="0" bgcolor="#FFCC66">
						
						<img src="<?php echo $TPL_VAR["IMAGES"]?>/admin/lyr_tit_bu.gif">&nbsp;&nbsp;<font size='3'><B><?php echo $TPL_VAR["subject"]?></B></font>
						<br>&nbsp;&nbsp;&nbsp;<font color=red>각항목별로 수정하기 바랍니다.</font>
						<br>&nbsp;&nbsp;&nbsp;<font color=red>팝업창에서 새로고침을 하지 마시오.</font>


						</td>
					</tr>
				</table>

				<table>
					<!-- 프론티어 타입 선택 -->
					<tr>
						<td align="left" width="120" border="0" bgcolor="#99CC66">
							&nbsp;타입&nbsp;<br>
						</td>
						<td width="830">
								<input type="radio" name="etype" value="A" border="0" <?php echo $TPL_VAR["etypecheck1"]?>> 일반프론티어
								<input type="radio" name="etype" value="B" border="0" <?php echo $TPL_VAR["etypecheck2"]?>> 콘텐츠형
							&nbsp;&nbsp;&nbsp;<input type="button" value="타입수정" id="modifyCheck_type">
						</td>
					</tr>
					<!-- 출처 -->
					<tr>
						<td align="left" width="120" border="0" bgcolor="#99CC66">
							&nbsp;출처&nbsp;<br>
						</td>
						<td>
							<div align="left">
								<input type="radio" name="ctype" value="A" border="0" <?php echo $TPL_VAR["ctypecheck1"]?>> RevU
								<input type="radio" name="ctype" value="B" border="0" <?php echo $TPL_VAR["ctypecheck2"]?>> 제휴사
								&nbsp;&nbsp;&nbsp;<input type="button" value="출처수정" id="modifyCheck_ctype">
							</div>
						</td>
					</tr>

					<!-- 출처 -->
					<tr>
						<td align="left" width="120" border="0" bgcolor="#99CC66">
							&nbsp;썸네일 프로모션&nbsp;<br>
						</td>
						<td>
							<div align="left">
								<input type="radio" name="thumbtype" value="A" border="0" <?php echo $TPL_VAR["thumbcheck1"]?>> 큰썸네일(상단진열)
								<input type="radio" name="thumbtype" value="B" border="0" <?php echo $TPL_VAR["thumbcheck2"]?>> 일반
								&nbsp;&nbsp;&nbsp;<input type="button" value="프로모션수정" id="modifyCheck_style">
						</td>
					</tr>
					<!-- 카테고리 선택 -->
					<tr>
						<td align="left" width="120" border="0" bgcolor="#99CC66">
							&nbsp;카테고리&nbsp;<br>
						</td>
						<td>
							<div align="left">
								<B>현재분류</B> : <?php echo $TPL_VAR["cate"]?>&nbsp;&nbsp;&nbsp;<input type="button" value="카테고리수정" id="catemodify">
							</div>
						</td>
					</tr>
					<!-- 프론티어 타이틀 제목 -->
					<tr>
						<td align="left" width="120" border="0" bgcolor="#99CC66">
							&nbsp;제목&nbsp;<br>
						</td>
						<td>
							<input type="text" name="subject" id="subject" value="<?php echo $TPL_VAR["subject"]?>" size="80">&nbsp;&nbsp;&nbsp;<input type="button" value="제목수정" id="modifyCheck_subject">
						</td>
					</tr>
					<!-- 모집기간 -->
					<tr>
						<td align="left" width="120" border="0" bgcolor="#99CC66">
							&nbsp;모집기간&nbsp;<br>
						</td>
						<td>
						 <table>
							<td>
							<?php echo $TPL_VAR["jstart_date"]?>~<?php echo $TPL_VAR["jend_date"]?>&nbsp;&nbsp;&nbsp;<input type="button" value="모집기간수정" id="jdatemodify">
						</table>
					    </td>
					</tr>


					<tr>
						<td align="left" width="120" border="0" bgcolor="#99CC66">
							&nbsp;모집인원&nbsp;<br>
						</td>
						<td>
							<input type="text" name="mcount" id="mcount" value="<?php echo $TPL_VAR["peoplelimit"]?>" size="5">&nbsp;명&nbsp;&nbsp;&nbsp;<input type="button" value="모집인원수정" id="modifyCheck_people">
						</td>
					</tr>
					<!-- 체험단 발표일 -->
					<tr>
						<td align="left" width="120" border="0" bgcolor="#99CC66">
							&nbsp;체험단 발표일&nbsp;<br>
						</td>
						<td>
						<table>
							<td>
								<?php echo $TPL_VAR["noticedate"]?>&nbsp;&nbsp;&nbsp;<input type="button" value="발표일수정" id="ndatemodify">
							</td>
						</table>
						</td>
					</tr>
					<!-- 리뷰작성기간 -->
					<tr>
						<td align="left" width="120" border="0" bgcolor="#99CC66">
							&nbsp;리뷰작성기간&nbsp;<br>
						</td>
						<td>
						<table>
							<td>
								<?php echo $TPL_VAR["due_sdate"]?>~<?php echo $TPL_VAR["due_edate"]?>&nbsp;&nbsp;&nbsp;<input type="button" value="리뷰기간수정" id="rdatemodify">
							</td>
						</table>
						</td>
					</tr>
					<!-- 체험상품 -->
					<tr>
						<td align="left" width="120" border="0" bgcolor="#99CC66">
							&nbsp;체험상품&nbsp;<br>
						</td>
						<td>
							<input type="text" name="rproduct" id="rproduct" value="<?php echo $TPL_VAR["frproduct"]?>" size="80">&nbsp;&nbsp;&nbsp;<input type="button" value="체험상품수정" id="modifyCheck_product">
						</td>
					</tr>
					<!-- 소비자가격 -->
					<tr>
						<td align="left" width="120" border="0" bgcolor="#AAAAAA">
							&nbsp;소비자가격&nbsp;<br>
						</td>
						<td>
							<input type="text" name="rprice" id="rprice" value="<?php echo $TPL_VAR["price"]?>" size="12">&nbsp;원&nbsp;&nbsp;&nbsp;<input type="button" value="가격수정" id="modifyCheck_price">
						</td>
					</tr>
					<!-- 주소 -->
					<tr>
						<td align="left" width="120" border="0" bgcolor="#99CC66">
							&nbsp;주소&nbsp;<br>
						</td>
						<td>
							<!-- <select name="area_bcode1" id="areaBcodeCBox1">		
								<option value="00">지역선택</option>
<?php if($TPL_bcode_list_1){foreach($TPL_VAR["bcode_list"] as $TPL_V1){?>
								<option value="<?php echo $TPL_V1["bcode"]?>"><?php echo $TPL_V1["ko_desc"]?></option>
<?php }}?>
							</select>
							<select name="area_mcode1" id="areaMcodeCBox1">		
								<option value="000">지역선택</option>
							</select>
							<select name="area_scode1" id="areaScodeCBox1">		
								<option value="00">지역선택</option>
							</select> <input type="text" name="addr2" id="addr2" size="40" maxlength="60" value="" /> -->
							<?php echo $TPL_VAR["address"]?>&nbsp;&nbsp;&nbsp;<input type="button" value="주소수정" id="addrmodify">
						</td>
					</tr>

					<!-- 약도링크 -->
					<tr>
						<td align="left" width="120" border="0" bgcolor="#AAAAAA">
							&nbsp;약도 링크주소&nbsp;<br>
						</td>
						<td>
							<input type="text" name="map" id="map" value="<?php echo $TPL_VAR["map"]?>" size="50">&nbsp;&nbsp;&nbsp;<input type="button" value="약도수정" id="modifyCheck_map">
						</td>
					</tr>

					<!-- 전화번호 -->
					<tr>
						<td align="left" width="120" border="0" bgcolor="#AAAAAA">
							&nbsp;전화번호&nbsp;<br>
						</td>
						<td width="300">
							<?php echo $TPL_VAR["tel"]?>&nbsp;&nbsp;<?php echo $TPL_VAR["mobile"]?>

								<!-- <td>
									<select name="tel1" id="tel_number">
<?php if($TPL_tel_number_1){foreach($TPL_VAR["tel_number"] as $TPL_V1){?><option value="<?php echo $TPL_V1?>"><?php echo $TPL_V1?></option><?php }}?>
									</select>
									<input type="text" name="tel2" value="" size="5" maxlength="4">
									<input type="text" name="tel3" value="" size="5" maxlength="4">,&nbsp;&nbsp;&nbsp;&nbsp;
								</td>
								<td>
									<select name="mobile1" id="phone_number">
<?php if($TPL_phone_number_1){foreach($TPL_VAR["phone_number"] as $TPL_V1){?><option value="<?php echo $TPL_V1?>"><?php echo $TPL_V1?></option><?php }}?>
									</select>
									<input type="text" name="mobile2" value="" size="5" maxlength="4">
									<input type="text" name="mobile3" value="" size="5" maxlength="4">
								</td> --><input type="button" value="전화번호수정" id="telrmodify">
						</td>
					</tr>

					<!-- 홈페이지링크 -->
					<tr>
						<td align="left" width="120" border="0" bgcolor="#AAAAAA">
							&nbsp;홈페이지&nbsp;<br>
						</td>
						<td>
							<input type="text" name="homepage" id="homepage" value="<?php echo $TPL_VAR["sitelink"]?>" size="50">&nbsp;&nbsp;&nbsp;<input type="button" value="홈페이지수정" id="modifyCheck_site">
						</td>
					</tr>

<script type="text/javascript">
<!--
	function add_item(){
		// pre_set 에 있는 내용을 읽어와서 처리..
		var div = document.createElement('div');
		div.innerHTML = document.getElementById('pre_set').innerHTML;
		document.getElementById('field').appendChild(div);
	}

	function remove_item(obj){
		// obj.parentNode 를 이용하여 삭제
		document.getElementById('field').removeChild(obj.parentNode);
	}
//-->
</script>
					<!-- 모집옵션 -->
					<tr>
						<td align="left" width="120" border="0" bgcolor="#AAAAAA">
							&nbsp;모집옵션&nbsp;<br>
						</td>
						<td>
<?php if($TPL_frontierOptionList_1){foreach($TPL_VAR["frontierOptionList"] as $TPL_V1){?>     

						   <?php echo $TPL_V1["froption"]?><br />
						   
<?php }}?>

						&nbsp;&nbsp;&nbsp;<input type="button" value="옵션수정" id="optionmodify">
							<!-- <div id="pre_set" style="display:none">
							 <input type="text" name="option[]" value="" style="width:200px"><input type="button" value="삭제" onclick="remove_item(this)"><br>
							</div>
							<input type="button" value="추가" onclick="add_item()"><div id="field"><input type="text" name="option[]" value="" style="width:200px"></div><br> -->
						</td>
					</tr>

					<!-- 캐시지급여부 -->
					<tr>
						<td align="left" width="120" border="0" bgcolor="#AAAAAA">
							&nbsp;캐시지급여부&nbsp;<br>
						</td>
						<td>
							<input type="text" id="cashcon"  name="cashcon" value="<?php echo $TPL_VAR["cashpolicy"]?>" size="60">&nbsp;&nbsp;&nbsp;<input type="button" value="캐시지급수정" id="modifyCheck_cash">
						</td>
					</tr>
					<!-- 비고 -->
					<tr>
						<td align="left" width="120" border="0" bgcolor="#AAAAAA">
							&nbsp;비고&nbsp;<br>
						</td>
						<td>
							<textarea id="bigo" name="bigo" rows="7" style=" width: 100%; overflow: visible;"><?php echo $TPL_VAR["message"]?></textarea>
							<br><br>&nbsp;<input type="button" value="비고 내용수정" id="modifyCheck_message">
						</td>
					</tr>
					<!-- 베스트 리뷰어 발표일 -->
					<tr>
						<td align="left" width="120" border="0" bgcolor="#99CC66">
							&nbsp;베스트 리뷰어 발표일&nbsp;<br>
						</td>
						<td>
						<table>
							<td>
								<?php echo $TPL_VAR["bestrview_notice_date"]?>&nbsp;&nbsp;&nbsp;<input type="button" value="수정" id="bestdatemodify">
							</td>
						</table>
						</td>
					</tr>


					<!-- 베스트리뷰어 명수 -->
					<tr>
						<td align="left" width="120" border="0" bgcolor="#AAAAAA">
							&nbsp;베스트 리뷰어 명수&nbsp;<br>
						</td>
						<td>
							<input type="text" name="bestrviewer_count" id="bestrviewer_count" value="<?php echo $TPL_VAR["bestrviewer_count"]?>" size="5">&nbsp;명&nbsp;&nbsp;&nbsp;<input type="button" value="베스트리뷰어수정" id="modifyCheck_bestreviewer">
						</td>
					</tr>
					<!-- 베스트리뷰어 혜택 -->
					<tr>
						<td align="left" width="120" border="0" bgcolor="#AAAAAA">
							&nbsp;베스트 리뷰어 혜택&nbsp;<br>
						</td>
						<td>
							<textarea id="bestrview_prise" name="bestrview_prise" rows="4"  style=" width: 100%; overflow: visible;"><?php echo $TPL_VAR["bestrview_prise"]?></textarea>
							<br><br>&nbsp;<input type="button" value="혜택 수정" id="modifyCheck_prise">
						</td>
					</tr>

					<!-- 리뷰미션 -->
					<tr>
						<td align="left" width="120" border="0" bgcolor="#99CC66">
							&nbsp;리뷰미션&nbsp;<br>
						</td>
						<!-- <td align="left">
							<textarea id="editorContent" name="editorContent" rows="10"></textarea>
						</td> -->
						<td align="left">
							<textarea id="mission" name="mission" rows="10"  style=" width: 100%; overflow: visible;"><?php echo $TPL_VAR["mission"]?></textarea>
							<br><br>&nbsp;<input type="button" value="리뷰미션 수정" id="modifyCheck_mission">						
						</td>
					</tr>

					<!-- 리뷰 미션 -->
					<!-- <tr>
						<td align="left" width="120" border="0" bgcolor="#99CC66">
							&nbsp;리뷰미션&nbsp;<br>
						</td>
						<td align="left">
							<textarea id="editorContent2" name="editorContent2" rows="7" style=" width: 100%; overflow: visible;"></textarea>
						</td>
					</tr> -->

					<!-- 제목 삽입 키워드 -->
					<tr>
						<td align="left" width="120" border="0" bgcolor="#AAAAAA">
							&nbsp;제목 삽입 키워드&nbsp;<br>
						</td>
						<td align="left">
							<textarea id="titlekeyword" name="titlekeyword" rows="1" style=" width: 100%; overflow: visible;"><?php echo $TPL_VAR["keyword"]?></textarea>
							<br><br>&nbsp;<input type="button" value="제목삽입 키워드 수정" id="modifyCheck_keyword">						
						</td>
					</tr>
					<!-- 본문 삽입 키워드 -->
					<tr>
						<td align="left" width="120" border="0" bgcolor="#AAAAAA">
							&nbsp;본문 삽입 키워드&nbsp;<br>
						</td>
						<td align="left">
							<textarea id="storykeyword" name="storykeyword" rows="1" style=" width: 100%; overflow: visible;"><?php echo $TPL_VAR["tagword"]?></textarea>
							<br><br>&nbsp;<input type="button" value="본문 삽입 키워드 수정" id="modifyCheck_tagword">						
						</td>
					</tr>

					<!-- 당첨팁 -->
					<tr>
						<td align="left" width="120" border="0" bgcolor="#AAAAAA">
							&nbsp;당첨TIP&nbsp;<br>
						</td>
						<td align="left">
							<textarea id="tip" name="tip" rows="7" style=" width: 100%; overflow: visible;"><?php echo $TPL_VAR["tip"]?></textarea>
							<br><br>&nbsp;<input type="button" value="당첨TIP 수정" id="modifyCheck_tip">						
						</td>
					</tr>
					<!-- 상단이미지 -->
					<tr>
						<td align="left" width="120" border="0" bgcolor="#99CC66">
							&nbsp;상단이미지<br><font color="#7D7D7D">(프론티어 이벤트 본문 상단 이미지)</font>&nbsp;<br>
						</td>
						<td>
							<input type="file" name="file1" id="file1" value=""><br>
							<input type="hidden" name="topimage" id="topimage" value="">
							<font color="#9933FF">▶JPG 712(W)x289(H) 이미지 등록(이미지는 GIF로 확장자가 치환됨)</font>
							<br><br>&nbsp;<input type="button" value="상단 이미지 수정" id="modifyCheck_topimage">						
						</td>
					</tr>
					<!-- 썸네일등록 -->
					<tr>
						<td align="left" width="120" border="0" bgcolor="#99CC66">
							&nbsp;리스트이미지<br><font color="#7D7D7D">(메인페이지, 프론티어 채널 리스트용)</font>&nbsp;<br>
						</td>
						<td>
							<input type="file" name="file2" id="file2" value=""><br>
							<input type="hidden" name="thumbimage" id="thumbimage" value="">
							<font color="#9933FF">▶JPG  110(W)x102(H) 이미지 등록(이미지는 GIF로 확장자가 치환됨)</font>
							<br><br>&nbsp;<input type="button" value="리스트 이미지 수정" id="modifyCheck_listimage">						
						</td>
					</tr>
					<!-- 배너이미지 -->
					<tr>
						<td align="left" width="120" border="0" bgcolor="#99CC66">
							&nbsp;배너이미지&nbsp;<br>
						</td>
						<td>
							<input type="file" name="file3" id="file3" value=""><br>
							<input type="hidden" name="bannerimage" id="bannerimage" value="">
							<font color="#9933FF">▶JPG  198(W)x60(H) 이미지 등록(이미지는 GIF로 확장자가 치환됨)</font>
							<br><br>&nbsp;<input type="button" value="배너 이미지 수정" id="modifyCheck_bannerimage">						
						</td>
					</tr>		
					
					<!--  자료다운로드 -->
					<tr>
						<td align="left" width="120" border="0" bgcolor="#AAAAAA">
							&nbsp;관련자료&nbsp;<br>
						</td>
						<td>
							<input type="file" name="file4" id="file4" value=""><br>
							<input type="hidden" name="relfile" id="relfile" value="">
							<font color="#9933FF">▶관련자료를 신규로 등록하면 기존 자료는 신규자료로 대체됩니다.</font>
							<br><br>&nbsp;<input type="button" value="관련자료 등록/수정" id="modifyCheck_relfile">						
						</td>
					</tr>	
					<!-- 배너코드 -->
					<tr>
						<td align="left" width="120" border="0" bgcolor="#AAAAAA">
							&nbsp;배너코드&nbsp;<br>
						</td>
						<td align="left">
							<textarea id="bannercode" name="bannercode" rows="10" style=" width: 100%; overflow: visible;"><?php echo $TPL_VAR["bannercode_clip"]?></textarea>
							<br><br>&nbsp;<input type="button" value="배너코드 수정" id="modifyCheck_bannercode">						
						</td>
					</tr>


				</table>			
			</td>
			<!-- 본문 끝 -->
		</tr>
	</table>
	<!-- 버튼 -->
	<table width="100%" border="0">
		<tr>
			<td width="100%">&nbsp;
				<center>
				<!-- <input type="button" id="registCheck" value="변경"/> -->
				<input type="button" id="cancelBtn" value="취소"/>
				</center>
			</td>
		</tr>
	</table>
	<!-- 버튼 끝 -->







<!-- <script type="text/javascript">HTMLArea.init();</script> -->
<!-- <script type="text/javascript">HTMLArea2.init();</script> -->

</form>