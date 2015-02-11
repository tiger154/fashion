<?php /* Template_ 2.2.4 2012/12/18 09:15:50 /www/fassion10/engine/view/V3.9/index_bak/index.htm 000025543 */ 
$TPL_frontierList_1=empty($TPL_VAR["frontierList"])||!is_array($TPL_VAR["frontierList"])?0:count($TPL_VAR["frontierList"]);
$TPL_frontierfourlist_1=empty($TPL_VAR["frontierfourlist"])||!is_array($TPL_VAR["frontierfourlist"])?0:count($TPL_VAR["frontierfourlist"]);
$TPL_keyword_1=empty($TPL_VAR["keyword"])||!is_array($TPL_VAR["keyword"])?0:count($TPL_VAR["keyword"]);
$TPL_keywordReview_1=empty($TPL_VAR["keywordReview"])||!is_array($TPL_VAR["keywordReview"])?0:count($TPL_VAR["keywordReview"]);
$TPL_noticeReview_1=empty($TPL_VAR["noticeReview"])||!is_array($TPL_VAR["noticeReview"])?0:count($TPL_VAR["noticeReview"]);
$TPL_bestReview_1=empty($TPL_VAR["bestReview"])||!is_array($TPL_VAR["bestReview"])?0:count($TPL_VAR["bestReview"]);
$TPL_realtimeReview_1=empty($TPL_VAR["realtimeReview"])||!is_array($TPL_VAR["realtimeReview"])?0:count($TPL_VAR["realtimeReview"]);
$TPL_realtimeTalk_1=empty($TPL_VAR["realtimeTalk"])||!is_array($TPL_VAR["realtimeTalk"])?0:count($TPL_VAR["realtimeTalk"]);?>
<script>
$(document).ready( function() {
	common.setLayer("addItem");
	common.setLayer("addItemDirected");
});

function additem() {
		var url = "/common/context.item.add.proc";
		var targetURL = encodeURIComponent($('#crawll_url').val());
		var data = "&url="+targetURL;		
		$.ajax({ type: "POST", url: url, data: data, success: additemRequest });
		$('#dialog-modal').dialog({ autoOpen: true });
	}

function additemRequest(data){
alert(data);
		//document.write(data);
		$('#dialog-modal').dialog("close");	
		var result = $.parseJSON(data);
		var html = "";
	    var src = "";
		var divimgTxt=''; // 반복 이미지 html문 저장용 변수
		var swidth = 0; // 이미지 임시 넓이
        var sheight = 0; // 이미지 임시 높이
		var thumbsize = 200; // 썸네일 제한 사이즈 
		var crallingsize = 89; // (크롤링)검색 제한 사이즈
//		alert(result.imgList.length);
//		alert(result.price.length);

		if(result.result != "success") {
			$('#dialog').html("Occured error");
			$('#dialog').dialog({ autoOpen: true, width: "300", height:"150", title: "Parsing of dom Failed" });
		} else {
			//@-->** Image resizing Start *//
			for(var i=0; i<result.imgList.length; i++) {
				src = result.imgList[i][0]; 
				swidth = result.imgList[i][1]; 
				sheight = result.imgList[i][2];

					if(swidth > crallingsize && sheight > crallingsize  && src.indexOf("gnb") < 0 ){			
								if(swidth >= sheight) {
										if(swidth > thumbsize) {
											sratio = Math.round((thumbsize / swidth) * 100);
											nwidth = Math.round(swidth * sratio / 100);
											nheight = Math.round(sheight * sratio / 100);										
											divimgTxt = divimgTxt+"<img src='"+src+"' width='"+nwidth+"' height='"+nheight+"'/>";
									   } else {
											divimgTxt = divimgTxt+"<img src='"+src+"' />";
									   }
								 } else {
									 if(sheight > thumbsize) {
										sratio = Math.round((thumbsize / sheight) * 100);
										nwidth = Math.round(swidth * sratio / 100);
										nheight = Math.round(sheight * sratio / 100); 									
										divimgTxt = divimgTxt+"<img src='"+src+"' width='"+nwidth+"' height='"+nheight+"'/>";
									   } else {
										divimgTxt = divimgTxt+"<img src='"+src+"' />";	
									   }
								}								
					}
					
			 }
			//@-->** Image resizing End *//
							
			$('#parsedImgList').html(divimgTxt);
		}
}

</script>

* 아이템 등록 테스트(URL기반 업로드)
   -> <a href="javascript:common.openLayer('addItem')" >아이템 등록</a> <br/> <br/> <br/>

* 아이템 등록 테스트(직접 업로드)
   -> <a href="javascript:common.openLayer('addItemDirected')" >아이템 등록</a>




<div id="addItem" style="border: solid">
	<ul>
		<li class="title">
			웹사이트 URL로 아이템 등록하기 <br> 자주가는 쇼핑몰이나 웹사이트가 있으세여? <br>
			웹사이트 제품 페이지 링크를 아래에 입력해 주세요. 			
		</li>
		<br>
		<li class="input_area">			
				<li>
					- URL :  <input type="text" name="crawll_url" id="crawll_url" value="http://www.revu.co.kr" class="crawll_url" />
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
<div id="parsedImgList">
	
</div>	

<iframe name="frmFile" id="frmFile" width="0" height="0" frameborder="0"></iframe>
<div id="addItemDirected" style="border: solid">
<form name="form_add_item" id="form_add_item" enctype="multipart/form-data">
	<ul>
		<li class="title">
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
		<center>	
			<img src="/images/common/but/but_gb_save.gif" id="item_saveBtn" alt="저장하기" title="저장하기" class="btn" />
		</center>
		<li class="bottom">
			<img src="/images/common/but/but_w_xclose.gif" align="right" alt="닫기" title="닫기" onClick="common.closeLayer('addItemDirected');" />
		</li>
  </ul>
 </form>
</div>




<script type="text/javascript" src="<?php echo $TPL_VAR["EXTENDS"]?>/js.slider/jquery.easing.1.3.min.js"></script>		
<script type="text/javascript" src="<?php echo $TPL_VAR["EXTENDS"]?>/js.slider/jquery.mousewheel.min.js"></script>		
<script type="text/javascript" src="<?php echo $TPL_VAR["EXTENDS"]?>/js.slider/jquery.sliderkit.1.8.min.js"></script>		
<!-- Slider Kit launch -->
<script type="text/javascript">
$(document).ready(function(){ //$(window).load() must be used instead of $(document).ready() because of Webkit compatibility				
	// Carousel > Demo #2
	$(".carousel-demo2").sliderkit({
		shownavitems:2,
		scroll:1,
		mousewheel:true,
		circular:true,
		start:2
	});
});	
</script>

<!-- Slider Kit styles -->
<!-- 주석-->
<link rel="stylesheet" type="text/css" href="<?php echo $TPL_VAR["EXTENDS"]?>/js.slider/sliderkit-core.css" media="screen, projection" />
<link rel="stylesheet" type="text/css" href="<?php echo $TPL_VAR["EXTENDS"]?>/js.slider/sliderkit-demos.css" media="screen, projection" />
<!-- Slider Kit styles/ -->

<!-- 메인 중앙 랜덤 배너 -->
<div class="top_banner"><?php echo $TPL_VAR["banner_main_link"]?></div>
<!-- 프론티어 타이틀 -->
<div class="m_today_title">
	<ul>
		<li style=" width:142px; height:30px;" class="fl"><img src="/images/main/title_today_frontier.gif" /></li>
		<li style=" width:408px; height:30px; padding-left:10px;" class="fl"><span class="ln23"><strong><?php echo $TPL_VAR["day_nowmonth"]?></strong>월 <strong><?php echo $TPL_VAR["day_nowday"]?></strong>일 현재, 총 <strong><?php echo $TPL_VAR["frontierCnt"]?></strong>개 체험 신청 가능</span></li>
	</ul>
</div>

<!-- <div class="clear" style="height:8px;"></div> -->

<!-- 프론티어 전체 박스 시작-->
<table width="714" height="353" border="0" cellspacing="0" cellpadding="0">
	<tr>
		<td width="488"><!--프론티어 빅슬라이트 박스 시작 -->
			<table width="488" border="0" cellspacing="0" cellpadding="0">
				<tr>
				<td>
				<!-- #### 오늘의 프론티어 롤링 START#### -->
				<!-- Start carousel-demo2 -->
				<div class="sliderkit carousel-demo2">
					<div class="sliderkit-nav">
						<div class="sliderkit-nav-clip">
						<ul>
<?php if($TPL_frontierList_1){foreach($TPL_VAR["frontierList"] as $TPL_V1){?>		
						<li>
							<div class="m_bigbox">
								<!-- 프로모션 썸네일은 비지 처리 각 해당 카데고리는 이미지 처리 / m_cate.text 참고 -->
								<div class="thum_m_big"><a href="/frontier/detailview/1/<?php echo $TPL_V1["frno"]?>/A/"><img src="<?php echo $TPL_V1["toplistimg"]?>"></a></div>
								<div style="width:224px; height:16px; padding:2px 0 5px 0;" class="gray_title text_overlay17">
								<a href="/frontier/detailview/1/<?php echo $TPL_V1["frno"]?>/A/"><?php echo $TPL_V1["subject"]?></a></div>
								<p>
								<div style=" width:224px; height:12px; padding:0 0 3px 0; text-align:left;" class="text_overlay14 gray11_l_text">&nbsp;&nbsp;모집기간 : <span class="common11_text"><?php echo $TPL_V1["start_date"]?> ~ <?php echo $TPL_V1["end_date"]?></span>
								</div>
								<div style=" width:224px; height:12px; padding:0 0 3px 0; text-align:left;" class="text_overlay14 gray11_l_text">&nbsp;&nbsp;모집인원 : <span class="common11_text"><?php echo $TPL_V1["peoplelimit"]?>명</span>/ 발표 :<span class="gray11_d_text"><?php echo $TPL_V1["notice_date"]?></span></div>
								<div style=" width:224px; height:12px; padding:0 0 3px 0; text-align:left;" class="text_overlay14 gray11_l_text">&nbsp;&nbsp;리뷰작성기간 : <span class="gray11_d_text"> <?php echo $TPL_V1["due_edate"]?> 까지</span></div>
								<!-- 스타일 문제로 버튼 벌어짐 -->
								<div class="but_m_big2 fl">
								<div style="padding:7px 0 0 30px;" ><span class="gray11_db_text"><?php echo $TPL_V1["remaincount"]?></span></div></div>
								<div style="width:70px; height:28px; margin:10px 0 0 -60px;" class="fl"><a href="/frontier/detailview/1/<?php echo $TPL_V1["frno"]?>/A/"><img src="/images/common/but/but_m_entry.gif" alt="상세보기 응모페이지로 이동" title="상세보기 응모페이지로 이동" /></a></div>
							</div>
						</li>
<?php }}?>
						</ul>
						</div>
					</div>
				</div>
				</td>
				</tr>
			</table>
			</td>
			<td width="226">
			<!--프론티어 4개 리스트 시작 -->
			<table width="226" border="0" cellspacing="0" cellpadding="0" align="right">
				<tr>
					<td>
						<div class="m_smallbox">
							<!--  응모중 또는 리뷰중 프론티어 리스트-->
<?php if($TPL_frontierfourlist_1){foreach($TPL_VAR["frontierfourlist"] as $TPL_V1){?>
							<div class="m_frontier2_textbox">
								<ul>
									<!-- 프론티어 110110 이미지 비례축소  / 종료된 프론티어는 066066 원사이즈 사용-->
									<li class="m_frontier_thum fl"><?php echo $TPL_V1["fourlink"]?><img src="<?php echo $TPL_V1["listimg"]?>"  alt="프론티어 상세보기로 이동" title="프론티어 상세보기로 이동"  width="66px;" height="66px;"/></a></li>
									<li class="m_frontier_text1 fl"><?php echo $TPL_V1["fourlink"]?><span class="gray_stitle"><?php echo $TPL_V1["subject"]?></span></a></li>
									<li class="m_frontier_text2 fr"><span class="gray11_l_text">모집인원 :</span><span class="gray11_d_text"> <?php echo $TPL_V1["peoplelimit"]?>명</span></li>
									<li class="m_frontier_text2 fr"><span class="gray11_l_text">체험단발표 :</span><span class="gray11_d_text"><?php echo $TPL_V1["notice_date"]?></span></li>
								</ul>
							</div>
<?php }}?>
							<div class="m_frontier_numbox" style="text-align:right;">
							<a href="/frontier"><img src="/images/common/ico/ico_more.gif"  alt="more" title="more"  style="padding-bottom:3px;"/></a>
							</div>
						</div>
					</td>
				</tr>
			</table>
			<!--프론티어 4개 리스트  끝 -->
			</td>
	</tr>
</table>
<!-- 프론티어 전체 박스 끝 -->

<div class="clear"></div>
<div style="height:40px";></div>


<!-- 키워드리뷰 시작 -->
<div id="m_keyword">
	<div class="m_keyword_title" style="text-align:left;"><img src="<?php echo $TPL_VAR["IMAGES"]?>/main/title_keyword.gif" /></div>
<?php if($TPL_keyword_1){$TPL_I1=-1;foreach($TPL_VAR["keyword"] as $TPL_V1){$TPL_I1++;?>
	<div id="keywordBox<?php echo $TPL_I1+ 1?>"><span id="keywordText<?php echo $TPL_I1+ 1?>"><?php echo $TPL_V1["keyword"]?></span></div>
<?php }}?>
	<div class="clear"></div>
<?php if($TPL_keywordReview_1){$TPL_I1=-1;foreach($TPL_VAR["keywordReview"] as $TPL_V1){$TPL_I1++;?>
	<div id="keywordReview<?php echo $TPL_I1+ 1?>">
		<!-- 리뷰 빅썸네일 -->
		<div class="m_big300box">
			<img src="<?php echo $TPL_V1["list"][ 0]["thumbimage_url"]?>" width="300" height="300" />
			<!-- <img src="*/ReviewImage/174DDB39-FA19-4385-B2CD-D9B3D33EDC5E/174DDB39-FA19-4385-B2CD-D9B3D33EDC5E[0000].jpg" width="300" height="300" /> -->
		</div>
		<div class="m_small394box">
			<!-- 스펙트럼 박스 -->
			<div class="m_keyword_textbox">
				<ul>
					<li style="height:18px; margin-bottom:15px;" class="text_overlay17">
						<a href="javascript:common.socialbar(<?php echo $TPL_V1["list"][ 0]["rno"]?>)"><span class="gray_title"><?php echo $TPL_V1["list"][ 0]["title"]?></span></a>
						&nbsp;
						<span class="red_text">(<?php echo $TPL_V1["list"][ 0]["talk_cnt"]?>)</span>
					</li>
					<li class="m_chart_text1l">
						<!-- 추천 스펙트럼 조절 -->
						<div><img src="<?php echo $TPL_VAR["IMAGES"]?>/common/bg/bg_chart.gif" width="<?php echo $TPL_V1["list"][ 0]["size"]?>%" height="20px"/></div>
					</li>
					<li class="m_chart_text1r">
						<!-- 추천 카운터 표시 -->
						<div class="red_text"><span class="m_chart_text1r_red"><?php echo $TPL_V1["list"][ 0]["recom_cnt"]?></span></div>
					</li>
					<li class="clear"><img src="<?php echo $TPL_VAR["IMAGES"]?>/common/space.gif" height="12px;" /></li>
					<li style="height:32px; margin-bottom:12px;" class="text_overlay32">
						<span class="gray_d_text"><?php echo $TPL_V1["list"][ 0]["content"]?></span>
					</li>
					<li style="height:15px; margin-bottom:8px;" class="text_overlay17"><span class="common11_text"><a href="javascript:context.load(<?php echo $TPL_V1["list"][ 0]["userno"]?>)"><?php echo $TPL_V1["list"][ 0]["nickname"]?></a> 님 | <?php echo $TPL_V1["list"][ 0]["regdate"]?></span></li>
				</ul>
			</div>
			<!-- 관련리뷰리스트 시작 -->
			<div class="m_keyword_stitle">
			</div>
			<!--  한 묶음 시작-->
			<div class="m_keyword2_textbox">
				<ul>
					<!-- 리뷰이미지 비례축소 -->
					<li class="m_keyword_thum fl">
						<img src="<?php echo $TPL_V1["list"][ 1]["thumbimage_url"]?>" width="45px;" height="45px;"/>
					</li>
					<li class="m_keyword_text1 fl">
						<div class="gray_d_text fl" style="width:240px; overflow:hidden;">
							<a href="javascript:common.socialbar(<?php echo $TPL_V1["list"][ 1]["rno"]?>)"><?php echo $TPL_V1["list"][ 1]["title"]?></a>
						</div>
						<div class="red11_text fl" style="width:80px; text-decoration:none;">(<?php echo $TPL_V1["list"][ 1]["talk_cnt"]?>)</div>
					</li>
					<li class="m_keyword_text2 fl"><span class="common11_text"><?php echo $TPL_V1["list"][ 1]["content"]?></span></li>
				</ul>
			</div>
			<!--  한 묶음 시작-->
			<div class="m_keyword2_textbox">
				<ul>
					<!-- 리뷰이미지 비례축소 -->
					<li class="m_keyword_thum fl">
						<img src="<?php echo $TPL_V1["list"][ 2]["thumbimage_url"]?>"  alt="#" title="#"  width="45px;" height="45px;"/>
					</li>
					<li class="m_keyword_text1 fl">
						<div class="gray_d_text fl" style="width:240px; overflow:hidden;">
							<a href="javascript:common.socialbar(<?php echo $TPL_V1["list"][ 2]["rno"]?>)"><?php echo $TPL_V1["list"][ 2]["title"]?></a>
						</div>
						<div class="red11_text fl" style="width:80px; text-decoration:none;">(<?php echo $TPL_V1["list"][ 2]["talk_cnt"]?>)</div>
					</li>
					<li class="m_keyword_text2 fl"><span class="common11_text"><?php echo $TPL_V1["list"][ 2]["content"]?></span></li>
				</ul>
			</div>
			<!-- 관련리뷰리스트 끝 -->
		</div>
	</div>
<?php }}?>
	<div class="clear"></div>
</div>
<!-- 키워드리뷰 끝 -->

<!-- 주목이리뷰 시작 -->
<div id="m_focus">
	<div class="m_focus_title"><img src="<?php echo $TPL_VAR["IMAGES"]?>/main/title_focus.gif" /></div>
	<!-- 각 카데고리명 표시 -->
	<div class="review_tab_title_line fl">
		<ul>
			<!-- 카테고리별 텝 시작 / 전체가 디폴트 / 선택시 파일명 on으로 변경 -->
			<li class="review_tab_line" style="width:59px;"><img src="<?php echo $TPL_VAR["IMAGES"]?>/review/tab_review_on1.gif" id="noticeCate1" class="btn" alt="전체" title="전체" /></li>
			<li class="review_tab_line" style="width:59px;"><img src="<?php echo $TPL_VAR["IMAGES"]?>/review/tab_review_off2.gif" id="noticeCate2" class="btn" alt="맛집" title="맛집" /></li>
			<li class="review_tab_line" style="width:59px;"><img src="<?php echo $TPL_VAR["IMAGES"]?>/review/tab_review_off3.gif" id="noticeCate3" class="btn" alt="여행" title="여행" /></li>
			<li class="review_tab_line" style="width:59px;"><img src="<?php echo $TPL_VAR["IMAGES"]?>/review/tab_review_off4.gif" id="noticeCate4" class="btn" alt="패션" title="패션" /></li>
			<li class="review_tab_line" style="width:59px;"><img src="<?php echo $TPL_VAR["IMAGES"]?>/review/tab_review_off5.gif" id="noticeCate5" class="btn" alt="요리" title="요리" /></li>
			<li class="review_tab_line" style="width:67px;"><img src="<?php echo $TPL_VAR["IMAGES"]?>/review/tab_review_off6.gif" id="noticeCate6" class="btn" alt="화장품" title="화장품" /></li>
			<li class="review_tab_line" style="width:59px;"><img src="<?php echo $TPL_VAR["IMAGES"]?>/review/tab_review_off7.gif" id="noticeCate7" class="btn" alt="IT" title="IT" /></li>
			<li class="review_tab_line" style="width:59px;"><img src="<?php echo $TPL_VAR["IMAGES"]?>/review/tab_review_off8.gif" id="noticeCate8" class="btn" alt="영화" title="영화" /></li>
			<li class="review_tab_line" style="width:68px;"><img src="<?php echo $TPL_VAR["IMAGES"]?>/review/tab_review_off9.gif" id="noticeCate9" class="btn" alt="프론티어" title="프론티어" /></li>
			<li class="review_tab_line" style="text-align:right; padding:0 0 10px 105px;"><img src="<?php echo $TPL_VAR["IMAGES"]?>/common/ico/ico_more.gif" id="noticeReviewMoreBtn" class="btn" /></li>			
		</ul>
	</div>
	<div class="clear pt25"></div>

<?php if($TPL_noticeReview_1){$TPL_I1=-1;foreach($TPL_VAR["noticeReview"] as $TPL_V1){$TPL_I1++;
$TPL_list_2=empty($TPL_V1["list"])||!is_array($TPL_V1["list"])?0:count($TPL_V1["list"]);?>
	<div id="noticeReview<?php echo $TPL_I1+ 1?>">
<?php if($TPL_list_2){$TPL_I2=-1;foreach($TPL_V1["list"] as $TPL_V2){$TPL_I2++;?>
		<div class="m_focus_textbox">
			<ul>
				<!-- 리뷰이미지 080080 이미지 비례축소 / 첫머리 카테고리표시 -->
				<li class="m_focus_thum fl">
					<img src="<?php echo $TPL_V2["thumbimage_url"]?>" width="80px;" height="80px;"/>
				</li>
				<li class="m_focus_text1 fl">					<a href="javascript:common.socialbar(<?php echo $TPL_V2["rno"]?>)"><span class="gray_du_text"><?php echo $TPL_V2["title"]?></span></a>
					&nbsp;
					<span class="red_text"></span>
				</li>
				<li class="m_focus_text2 fr"><?php echo $TPL_V2["content"]?></li>
				<li class="m_focus_text3 fr">
					<img src="<?php echo $TPL_VAR["IMAGES"]?>/common/ico/ico_revuhit.gif" /><span class="red_b_text"><?php echo $TPL_V2["recom_cnt"]?></span>
					&nbsp;|&nbsp;
					<span class="gray11_l_text"><a href="javascript:context.load(<?php echo $TPL_V2["userno"]?>)"><?php echo $TPL_V2["nickname"]?></a></span>
				</li>
			</ul>
		</div>
<?php if($TPL_I2% 2== 1){?><div class="clear"></div><?php }?>
<?php }}?>
	</div>
	<div class="clear"></div>
<?php }}?>
</div>
<!-- 주목이리뷰 끝 -->

<!-- 주간베스트 시작 -->
<div id="m_weekbest">
	<div class="m_weekbest_title">
		<strong><?php echo $TPL_VAR["bestDate"]["sdate"]?> ~ <?php echo $TPL_VAR["bestDate"]["edate"]?></strong>
		&nbsp;<img src="<?php echo $TPL_VAR["IMAGES"]?>/common/ico/ico_more.gif" id="bestReviewMoreBtn" class="btn" />
	</div>
	<div class="m_weekbest_line">
		<!-- 베스트 한묶음 시작 /1위 -->
<?php if($TPL_bestReview_1){$TPL_I1=-1;foreach($TPL_VAR["bestReview"] as $TPL_V1){$TPL_I1++;?>
		<div class="m_weekbest_textbox">
			<div class="m_weekbest_thum">
				<img src="<?php echo $TPL_VAR["IMAGES"]?>/main/thum_best<?php echo $TPL_I1+ 1?>.png" style="position:absolute;"/>
				<img src="<?php echo $TPL_V1["thumbimage110_url"]?>" width="105" height="105" />
			</div>
			<div class="m_weekbest_text1">
				<span class="gray11_db_text"><a href="javascript:common.socialbar(<?php echo $TPL_V1["rno"]?>)"><?php echo $TPL_V1["title"]?></a></span>
			</div>
			<div class="m_weekbest_text2">
				<div style="width:60px; overflow:hidden;" class="gray11_l_text fl">
					<a href="javascript:context.load(<?php echo $TPL_V1["userno"]?>)"><?php echo $TPL_V1["nickname"]?></a>
					&nbsp;|&nbsp;
				</div>
				<div style="width:45px; overflow:hidden;"class="red11_text fl">
					<img src="<?php echo $TPL_VAR["IMAGES"]?>/common/ico/ico_revuhit.gif" /><?php echo $TPL_V1["best_recom_cnt"]?>

				</div>
			</div>
		</div>
<?php }}?>
		<!-- 베스트 한묶음 끝 -->
	</div>
	<div class="clear"></div>
</div>
<!-- 주간베스트 끝 -->

<div class="m_talktime_title">
	<img src="<?php echo $TPL_VAR["IMAGES"]?>/main/title_reviewtime_on.gif" id="realtimeReviewBtn" alt="실시간리뷰" title="실시간리뷰" class="btn" />
	<img src="<?php echo $TPL_VAR["IMAGES"]?>/main/title_talktime_off.gif" id="realtimeTalkBtn" alt="실시간토크" title="실시간토크" class="btn" />
</div>

<!-- 실시간리뷰 시작 -->
<div id="realtimeReview">
	<div style="height:10px;"></div>
	<!-- 각 카데고리명 표시 -->
	<div class="review_tab_title_line fl">
		<ul>
			<!-- 카테고리별 텝 시작 / 전체가 디폴트 / 선택시 파일명 on으로 변경 -->
			<li class="review_tab_line" style="width:59px;"><img src="<?php echo $TPL_VAR["IMAGES"]?>/review/tab_review_on1.gif" id="realtimeCate1" class="btn" alt="전체" title="전체" /></li>
			<li class="review_tab_line" style="width:59px;"><img src="<?php echo $TPL_VAR["IMAGES"]?>/review/tab_review_off2.gif" id="realtimeCate2" class="btn" alt="맛집" title="맛집" /></li>
			<li class="review_tab_line" style="width:59px;"><img src="<?php echo $TPL_VAR["IMAGES"]?>/review/tab_review_off3.gif" id="realtimeCate3" class="btn" alt="여행" title="여행" /></li>
			<li class="review_tab_line" style="width:59px;"><img src="<?php echo $TPL_VAR["IMAGES"]?>/review/tab_review_off4.gif" id="realtimeCate4" class="btn" alt="패션" title="패션" /></li>
			<li class="review_tab_line" style="width:59px;"><img src="<?php echo $TPL_VAR["IMAGES"]?>/review/tab_review_off5.gif" id="realtimeCate5" class="btn" alt="요리" title="요리" /></li>
			<li class="review_tab_line" style="width:67px;"><img src="<?php echo $TPL_VAR["IMAGES"]?>/review/tab_review_off6.gif" id="realtimeCate6" class="btn" alt="화장품" title="화장품" /></li>
			<li class="review_tab_line" style="width:59px;"><img src="<?php echo $TPL_VAR["IMAGES"]?>/review/tab_review_off7.gif" id="realtimeCate7" class="btn" alt="IT" title="IT" /></li>
			<li class="review_tab_line" style="width:59px;"><img src="<?php echo $TPL_VAR["IMAGES"]?>/review/tab_review_off8.gif" id="realtimeCate8" class="btn" alt="영화" title="영화" /></li>
			<li class="review_tab_line" style="width:68px;"><img src="<?php echo $TPL_VAR["IMAGES"]?>/review/tab_review_off9.gif" id="realtimeCate9" class="btn" alt="프론티어" title="프론티어" /></li>
		</ul>
	</div>
	<div class="clear pt20"></div>

<?php if($TPL_realtimeReview_1){$TPL_I1=-1;foreach($TPL_VAR["realtimeReview"] as $TPL_V1){$TPL_I1++;
$TPL_list_2=empty($TPL_V1["list"])||!is_array($TPL_V1["list"])?0:count($TPL_V1["list"]);?>
	<div id="realtimeReview<?php echo $TPL_I1+ 1?>">
<?php if($TPL_list_2){foreach($TPL_V1["list"] as $TPL_V2){?>
		<div class="m_talktime_line">
			<!-- 리뷰 이미지비례축소 066066 -->
			<div class="m_talktime_thum">
				<img src="<?php echo $TPL_V2["thumbimage110_url"]?>"  width="66" height="66"/>
			</div>
			<div class="m_talktime_text1">
				<span class="gray_stitle"><a href="javascript:common.socialbar(<?php echo $TPL_V2["rno"]?>)"><?php echo $TPL_V2["title"]?></a></span>
				<span class="red_text">(<?php echo $TPL_V2["talk_cnt"]?>)</span>
			</div>
			<div class="m_talktime_text3"><?php echo $TPL_V2["content"]?></div>
			<div class="m_talktime_text4"><span class="gray11_l_text"><a href="javascript:context.load(<?php echo $TPL_V2["userno"]?>)"><?php echo $TPL_V2["nickname"]?></a></span></div>
		</div>
		<div class="m_talktime_sbox">
			<div style="padding:30px 0 0 34px;"><span class="orange_text"><?php echo $TPL_V2["pasttime"]?></span></div>
		</div>
		<div class="m_talktime_dotline"></div>
<?php }}?>
	</div>
<?php }}?>
</div>
<!-- 실시간리뷰 끝 -->

<!-- 실시간토크 끝 -->
<div id="realtimeTalk">	
	<div style="height:1px;"></div>
	<div class="m_talktime_title3"></div>
<?php if($TPL_realtimeTalk_1){foreach($TPL_VAR["realtimeTalk"] as $TPL_V1){?>
	<div class="m_talktime_line">
		<!-- 회원 프로필 비례축소 066066 -->
		<div class="m_talktime_thum">
			<img src="<?php echo $TPL_V1["userimage"]?>" width="66" height="66"/></a>
		</div>
		<div class="m_talktime_text1">
			<a href="javascript:context.load(<?php echo $TPL_V1["userno"]?>)"><?php echo $TPL_V1["nickname"]?></a>
		</div>
		<div class="m_talktime_text2"><?php echo $TPL_V1["content"]?></div>
	</div>
	<div class="m_talktime_sbox">
		<div style="padding:30px 0 0 34px;"><span class="orange_text"><?php echo $TPL_V1["pasttime"]?></span></div>
	</div>
	<div class="m_talktime_dotline"></div>								
<?php }}?>
</div>

<!-- 실시간토크 끝 -->