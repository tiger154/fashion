<?php /* Template_ 2.2.4 2012/12/06 10:07:18 /www/fassion10/engine/view/V3.9/review/index.htm 000008741 */ 
$TPL_best_1=empty($TPL_VAR["best"])||!is_array($TPL_VAR["best"])?0:count($TPL_VAR["best"]);
$TPL_list_1=empty($TPL_VAR["list"])||!is_array($TPL_VAR["list"])?0:count($TPL_VAR["list"]);?>
<script>var code = "";</script>
<script type="text/javascript" src="<?php echo $TPL_VAR["JS"]?>/_global/input.js"></script>
<script type="text/javascript" src="<?php echo $TPL_VAR["JS"]?>/_global/category.js"></script>

<!-- 리뷰 베스트박스 시작 -->
<div class="review_best_box">
	<div class="review_best_title">
		<div class="review_best_week">
			<img src="<?php echo $TPL_VAR["IMAGES"]?>/common/ico/text_gl_pre.gif" alt="이전" title="이전" class="btn" onClick="review.goReview(<?php echo $TPL_VAR["page"]?>,<?php echo $TPL_VAR["prev_wno"]?>);" />
			<a href="javascript:review.goBest(<?php echo $TPL_VAR["wno"]?>);"><span class="gray_lb_text"><?php echo $TPL_VAR["bestdate"]["sdate"]?> ~ <?php echo $TPL_VAR["bestdate"]["edate"]?></span></a>
			<img src="<?php echo $TPL_VAR["IMAGES"]?>/common/ico/text_gl_next.gif" alt="다음" title="다음" class="btn" onClick="review.goReview(<?php echo $TPL_VAR["page"]?>,<?php echo $TPL_VAR["next_wno"]?>);" />
		</div>
	</div>
	<div class="clear"></div>
	<div class="review_best_list">
		<ul>
<?php if($TPL_best_1){$TPL_I1=-1;foreach($TPL_VAR["best"] as $TPL_V1){$TPL_I1++;?>
			<li class="review_best_line<?php echo $TPL_I1+ 1?>">
				<a href="javascript:common.socialbar(<?php echo $TPL_V1["rno"]?>);" class="socialbar"><span class="review_best_text1 btn <?php if($TPL_I1== 0){?>red_text<?php }else{?>common_text<?php }?>"><?php echo $TPL_V1["title"]?></span></a>
				<a href="javascript:context.load(<?php echo $TPL_V1["userno"]?>);" class="context-user"><span class="review_best_text2 btn <?php if($TPL_I1== 0){?>red_text<?php }else{?>common_text<?php }?>"><?php echo $TPL_V1["user"]["nickname"]?></span></a>
				<span class="review_best_text3 common_text"><?php echo $TPL_V1["best_recom_cnt"]?></span>
			</li>
<?php }}?>
		</ul>
	</div>
	<div class="review_best_thum">
		<img src="<?php echo $TPL_VAR["IMAGES"]?>/review/icon_bbest.png" class="review_best_layer"/>
<?php if($TPL_VAR["best"][ 0]["thumbimage_url"]==""){?>
		<img src="<?php echo $TPL_VAR["IMAGES"]?>/common/thum/thum_222_dummy.gif" />
<?php }else{?>
		<img src="<?php echo $TPL_VAR["best"][ 0]["thumbimage_url"]?>" width="222" height="222" />
<?php }?>
	</div>
</div>
<!-- 리뷰 베스트박스 끝-->
<div class="clear"></div>
<div class="pt40"></div>

<!-- 각 카데고리명 표시 -->
<div class="review_category">
	<img src="<?php echo $TPL_VAR["IMAGES"]?>/review/title_review.gif" align="left"/>
	<ul>
		<li class="pl25">&nbsp;</li>
		<!-- 카테고리별 텝 시작 / 전체가 디폴트 / 선택시 파일명 on으로 변경 -->
		<li><img src="<?php echo $TPL_VAR["IMAGES"]?>/review/tab_review_off1.gif" id="rcate1" class="btn" alt="전체" title="전체" /></li>
		<li><img src="<?php echo $TPL_VAR["IMAGES"]?>/review/tab_review_off2.gif" id="rcate2" class="btn" alt="맛집" title="맛집" /></li>
		<li><img src="<?php echo $TPL_VAR["IMAGES"]?>/review/tab_review_off3.gif" id="rcate3" class="btn" alt="여행" title="여행" /></li>
		<li><img src="<?php echo $TPL_VAR["IMAGES"]?>/review/tab_review_off4.gif" id="rcate4" class="btn" alt="패션" title="패션" /></li>
		<li><img src="<?php echo $TPL_VAR["IMAGES"]?>/review/tab_review_off5.gif" id="rcate5" class="btn" alt="요리" title="요리" /></li>
		<li><img src="<?php echo $TPL_VAR["IMAGES"]?>/review/tab_review_off6.gif" id="rcate6" class="btn" alt="화장품" title="화장품" /></li>
		<li><img src="<?php echo $TPL_VAR["IMAGES"]?>/review/tab_review_off7.gif" id="rcate7" class="btn" alt="IT" title="IT" /></li>
		<li><img src="<?php echo $TPL_VAR["IMAGES"]?>/review/tab_review_off8.gif" id="rcate8" class="btn" alt="영화" title="영화" /></li>
		<li><img src="<?php echo $TPL_VAR["IMAGES"]?>/review/tab_review_off9.gif" id="rcate9" class="btn" alt="프론티어" title="프론티어" /></li>
	</ul>
</div>

<div class="clear"></div>

<div class="category_select_box">
	<ul>
		<li>
			<img src="<?php echo $TPL_VAR["IMAGES"]?>/common/ico/ico_hitlist_off.gif" id="pointSearchBtn" class="btn" alt="인기순" title="인기순" />
			<img src="<?php echo $TPL_VAR["IMAGES"]?>/common/ico/ico_newlist_on.gif" id="recentSearchBtn" class="btn" alt="최신순" title="최신순" />
		</li>		
		<li>
			&nbsp;
			<select name="cate1" id="cate1"><option value="">1차분류선택</option></select>
			<select name="cate2" id="cate2"><option value="">2차분류선택</option></select>
			<select name="cate3" id="cate3"><option value="">3차분류선택</option></select>
			<select name="cate4" id="cate4"><option value="">4차분류선택</option></select>
			<img src="<?php echo $TPL_VAR["IMAGES"]?>/common/but/but_g_go.gif" id="searchBtn" class="btn" align="absbottom" />
		</li>
	</ul>
</div>

<!-- 리스트 묶음 박스 시작  / 한페이지에 10개 나열-->
<div class="review_list">
<?php if($TPL_list_1){foreach($TPL_VAR["list"] as $TPL_V1){?>
	<ul>
<?php if($TPL_V1["is_thumb"]=="1"){?>
		<li class="thumb110_box">
			<img src="<?php echo $TPL_V1["thumbimage110_url"]?>" alt="<?php echo $TPL_V1["title"]?>" width="110" height="110" />			
		</li>
<?php }?>
		
<?php if($TPL_V1["is_thumb"]=="1"){?>
		<li class="review_text_box">
			<!-- 리뷰 내용 박스 -->
			<div class="list_title_line gray_title">
				<a href="javascript:common.socialbar(<?php echo $TPL_V1["rno"]?>);" name="<?php echo $TPL_V1["rno"]?>" class="socialbar"><?php echo $TPL_V1["title"]?></a>
			</div>
			<!-- 소셜토크 없으면 히든처리 -->
			<div class="review_title_talk red11_text">(<?php echo $TPL_V1["talk_cnt"]?>)</div>
			<div class="clear"></div>
			<div class="review_text_line"><?php echo $TPL_V1["content"]?></div>
			<!-- 블로그 타입이미지 삽입  / daum, egloos, naver,tistory / 그 이외의것 etc -->
			<div class="review_text_line2 gray11_l_text">
				<a href="javascript:context.load(<?php echo $TPL_V1["userno"]?>);" class="context-user"><?php echo $TPL_V1["nickname"]?></a>
				&nbsp;&nbsp;|&nbsp;&nbsp;
				<?php echo $TPL_V1["regdate"]?>

				&nbsp;&nbsp;|&nbsp;&nbsp;
				<?php echo $TPL_V1["cate_desc"]?>

				<img src="<?php echo $TPL_V1["blog_icon"]?>" class="imgb_space" />
			</div>
		</li>
<?php }elseif($TPL_V1["is_thumb"]=="0"){?>
		<li class="review_text_box2">
			<!-- 리뷰 내용 박스 -->
			<div class="list_title_bline gray_title">
				<a href="javascript:common.socialbar(<?php echo $TPL_V1["rno"]?>);" name="<?php echo $TPL_V1["rno"]?>" class="socialbar"><?php echo $TPL_V1["title"]?></a>
			</div>
			<!-- 소셜토크 없으면 히든처리 -->
			<div class="review_title_talk red11_text">(<?php echo $TPL_V1["talk_cnt"]?>)</div>
			<div class="clear"></div>
			<div class="review_text_bline"><?php echo $TPL_V1["content"]?></div>
			<!-- 블로그 타입이미지 삽입  / daum, egloos, naver,tistory / 그 이외의것 etc -->
			<div class="review_text_bline2 gray11_l_text">
				<a href="javascript:context.load(<?php echo $TPL_V1["userno"]?>);" class="context-user"><?php echo $TPL_V1["nickname"]?></a>
				&nbsp;&nbsp;|&nbsp;&nbsp;
				<?php echo $TPL_V1["regdate"]?>

				&nbsp;&nbsp;|&nbsp;&nbsp;
				<?php echo $TPL_V1["cate_desc"]?>

				<img src="<?php echo $TPL_V1["blog_icon"]?>" class="imgb_space" />
			</div>
		</li>
<?php }?>
		<li class="review_sns_box">
			<!--  sns 박스 -->
			<!-- 레뷰추천 버튼 삽입 / 최대999  -->
			<div class="pt40"></div>
			<div class="revu_hit_box">
				<div class="revu_hit_boxl">
					<img src="<?php echo $TPL_VAR["IMAGES"]?>/common/but/but_revuhit.gif" onClick="common.socialbarRecom(<?php echo $TPL_V1["rno"]?>)" alt="추천" title="추천" class="btn" />
				</div>
				<div class="revu_hit_boxr">
					<div class="revu_hit_text" style="display:block;"><span class="red11t_text"><?php echo $TPL_V1["recom_cnt"]?></span></div>
				</div>
			</div>
			<div class="pt10"></div>
			<img src="<?php echo $TPL_VAR["IMAGES"]?>/common/but/but_b_tweet.gif" onClick="twitter.todo('tweet', <?php echo $TPL_V1["rno"]?>);" class="btn" />
			<img src="<?php echo $TPL_VAR["IMAGES"]?>/common/but/but_b_facebook.gif" onClick="facebook.todo('wall', <?php echo $TPL_V1["rno"]?>);" class="btn" />
			<!-- sns 박스 끝-->
		</li>
	</ul>
	<div class="clear"></div>
	<div class="cbox_line"></div>
<?php }}?>
</div>
<!-- 리스트 묶음 박스 끝 -->

<div class="clear"></div>

<?php if($TPL_VAR["size"]> 0){?> 
<div class="pageno"><?php echo $TPL_VAR["link"]?></div>
<?php }else{?>
<div class="nolist">등록된 리뷰가 없습니다.</div>
<?php }?>