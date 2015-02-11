<?php /* Template_ 2.2.4 2013/02/05 13:22:15 /www/fassion10/engine/view/V3.9/index/index.htm 000016904 */ 
$TPL_allItemList_1=empty($TPL_VAR["allItemList"])||!is_array($TPL_VAR["allItemList"])?0:count($TPL_VAR["allItemList"]);?>
<div id="comm-cont" class="main-container">
	<div class="categoryBox">
<?php $this->print_("headerCate",$TPL_SCP,1);?>

	</div><!--category//-->

	<div id="contents">
		<div class="timeline_container">
			<div class="timeline">
				<div class="plus"></div>
			</div>
		</div>
		<div id="itemBox">
<?php if($TPL_allItemList_1){foreach($TPL_VAR["allItemList"] as $TPL_V1){?>
			<div class="item" id="item<?php echo $TPL_V1["itemNo"]?>">
				<p class="dateTime">
					<span class="upload-time"><strong><?php echo $TPL_V1["dateHM"]?></strong><?php if($TPL_V1["dateH"]> 11){?>pm<?php }else{?>am<?php }?></span>
					<span class="upload-date"><?php echo $TPL_V1["dateYMD"]?></span>
				</p>
				<div class="reviewCategory-product" >
					<a href="/item/view/<?php echo $TPL_V1["itemNo"]?>"><img src="<?php echo $TPL_V1["itemurl"]?>"  alt="" /></a>
					<span class="category-item <?php echo $TPL_V1["cateclass"]?>"><?php echo $TPL_V1["cateclass"]?></span>
					<div id="reviewBtn" class="buttonBox" style="display:none">
						<a href="#none" class="button <?php echo $TPL_V1["wishYN"]?>"><span>WISH</span></a>
						<a href="#none" class="button <?php echo $TPL_V1["haveYN"]?>"><span>HAVE</span></a>
						<a href="#none" class="button talk"><span>TALK</span></a>
					</div>
					<dl class="hits-num" style="display:none">
						<dt>WISH</dt>
						<dd class="wish"><?php echo $TPL_V1["wishCnt"]?></dd>
						<dt>HAVE</dt>
						<dd class="have"><?php echo $TPL_V1["haveCnt"]?></dd>
						<dt>TALK</dt>
						<dd class="talk"><?php echo $TPL_V1["talkCnt"]?></dd>
					</dl>
				</div>
				<p class="comment"><?php echo $TPL_V1["itemName"]?></p>
				<div class="bloger">
					<img src="/images/common/_thum/@dummy-blogerprofile.jpg" alt="" />
					<p class="">
						<span><?php echo $TPL_V1["userInfo"]["nickname"]?></span>
						<span class="blogTitle"><?php echo $TPL_V1["colname"]?></span>
						<a href="#none"><?php echo $TPL_V1["url"]?></a>
					</p>
				</div>
				<div class="dialogBox" id="blogerHits" style="display:none">
					<span class="toparrow"></span>
					<div>
						<img src="/images/common/_thum/@dummy_profile.jpg" alt="" />
						<span><?php echo $TPL_V1["userInfo"]["nickname"]?>님</span>
					</div>
					<ul id="blogerHits-list">
						<li>
							<dl class="hitsList">
								<dt class="first">FAN</dt>
								<dd class="first"><?php echo number_format( 5500)?></dd>
								<dt class="last">MUSE</dt>
								<dd class="last"><?php echo number_format( 300)?></dd>
							</dl>
						</li>
						<li>
							<dl class="hitsList">
								<dt class="first">Item</dt>
								<dd class="first"><?php echo number_format($TPL_V1["userStatsInfo"]["item_cnt"])?></dd>
								<dt class="last">Collection</dt>
								<dd class="last"><?php echo number_format($TPL_V1["userStatsInfo"]["collection_cnt"])?></dd>
							</dl>
						</li>
						<li>
							<dl class="hitsList">
								<dt class="first">Wish</dt>
								<dd class="first"><?php echo number_format( 15254)?></dd>
								<dt class="last">Have</dt>
								<dd class="last"><?php echo number_format( 82)?></dd>
							</dl>
						</li>
						<li>
							<a href="#none" class="button"><span>나의 뮤즈로 추가</span></a>
						</li>
					</ul>
				</div>

			</div>
<?php }}?>	
<!--
			<div class="item" id="item499">
				<p class="dateTime">
					<span class="upload-time"><strong>11:40</strong> am</span>
					<span class="upload-date">2012.12.13</span>
				</p>
				<div class="reviewCategory-product">
					<img src="/images/common/_thum/@dummy-clothing.jpg"  alt="" />
					<span class="category-item clothing">clothing</span>
					<div id="reviewBtn" class="buttonBox">
						<a href="#none" class="button wish"><span>WISH</span></a>
						<a href="#none" class="button have"><span>HAVE</span></a>
						<a href="#none" class="button talk"><span>TALK</span></a>
					</div>
					<dl class="hits-num">
						<dt>WISH</dt>
						<dd class="wish">435</dd>
						<dt>HAVE</dt>
						<dd class="have">657</dd>
						<dt>TALK</dt>
						<dd class="talk">214</dd>
					</dl>
				</div>
				<p class="comment">눈꽃같은 신부에게 딱 어울리는 거짓말눈꽃같은 신부에게 딱 어울리는 거짓말눈꽃같은 신부에게 딱 어울리는 거짓말눈꽃같은 신부에게 딱 어울리는 거짓말</p>
				<div class="bloger">
					<img src="/images/common/_thum/@dummy-blogerprofile.jpg" alt="" />
					<p class="">
						<span>로아공주</span>
						<span class="blogTitle">패션의 포인트</span>
						<a href="#none">http://www.wizwid.com</a>
					</p>
				</div>
				<div class="comment-write" id="wishComment">
					<p>가지고 싶은 아이템 콕! 찍고 토크 남기고</p>
					<img src="/images/common/_thum/@dummy-blogerprofile.jpg" alt="" />
					<textarea>
					</textarea>
				</div>
				<div class="comment-write" id="haveComment">
					<p>이미 가지고 있는!나는야 패셔니스타</p>
					<img src="/images/common/_thum/@dummy-blogerprofile.jpg" alt="" />
					<textarea>
					</textarea>
				</div>
				<div class="comment-write" id="talkComment">
					<p>톡톡! 토크를 남겨주세요</p>
					<img src="/images/common/_thum/@dummy-blogerprofile.jpg" alt="" />
					<textarea>
					</textarea>
				</div>
			</div>
			<div class="item" id="item498">
				<p class="dateTime">
					<span class="upload-time"><strong>11:40</strong> am</span>
					<span class="upload-date">2012.12.13</span>
				</p>
				<div class="reviewCategory-product">
					<img src="/images/common/_thum/@dummy-beauty.jpg" alt="" />
					<span class="category-item beauty">beauty</span>
					<div id="reviewBtn" class="buttonBox">
						<a href="#none" class="button wish"><span>WISH</span></a>
						<a href="#none" class="button have"><span>HAVE</span></a>
						<a href="#none" class="button talk"><span>TALK</span></a>
					</div>
					<dl class="hits-num">
						<dt>WISH</dt>
						<dd class="wish">435</dd>
						<dt>HAVE</dt>
						<dd class="have">657</dd>
						<dt>TALK</dt>
						<dd class="talk">214</dd>
					</dl>
				</div>
				<p class="comment">눈꽃같은 신부에게 딱 어울리는 거짓말눈꽃같은 신부에게 딱 어울리는 거짓말눈꽃같은 신부에게 딱 어울리는 거짓말눈꽃같은 신부에게 딱 어울리는 거짓말</p>
				<div class="bloger">
					<img src="/images/common/_thum/@dummy-blogerprofile.jpg" alt="" />
					<p class="">
						<span>로아공주</span>
						<span class="blogTitle">패션의 포인트</span>
						<a href="#none">http://www.wizwid.com</a>
					</p>
				</div>
			</div>
			<div class="item" id="item497">
				<p class="dateTime">
					<span class="upload-time"><strong>11:40</strong> am</span>
					<span class="upload-date">2012.12.13</span>
				</p>
				<div class="reviewCategory-product">
					<img src="/images/common/_thum/@dummy-bag.jpg"  alt="" />
					<span class="category-item bag">bag</span>
					<div id="reviewBtn" class="buttonBox">
						<a href="#none" class="button wish"><span>WISH</span></a>
						<a href="#none" class="button have"><span>HAVE</span></a>
						<a href="#none" class="button talk"><span>TALK</span></a>
					</div>
					<dl class="hits-num">
						<dt>WISH</dt>
						<dd class="wish">435</dd>
						<dt>HAVE</dt>
						<dd class="have">657</dd>
						<dt>TALK</dt>
						<dd class="talk">214</dd>
					</dl>
				</div>
				<p class="comment">눈꽃같은 신부에게 딱 어울리는 거짓말눈꽃같은 신부에게 딱 어울리는 거짓말눈꽃같은 신부에게 딱 어울리는 거짓말눈꽃같은 신부에게 딱 어울리는 거짓말</p>
				<div class="bloger">
					<img src="/images/common/_thum/@dummy-blogerprofile.jpg" alt="" />
					<p class="">
						<span>로아공주</span>
						<span class="blogTitle">패션의 포인트</span>
						<a href="#none">http://www.wizwid.com</a>
					</p>
				</div>
			</div>
			<div class="item" id="item496">
				<p class="dateTime">
					<span class="upload-time"><strong>11:40</strong> am</span>
					<span class="upload-date">2012.12.13</span>
				</p>
				<div class="reviewCategory-product">
					<img src="/images/common/_thum/@dummy-jewerly02.jpg"  alt="" />
					<span class="category-item jewerly">jewerly</span>
					<div id="reviewBtn" class="buttonBox">
						<a href="#none" class="button wish"><span>WISH</span></a>
						<a href="#none" class="button have"><span>HAVE</span></a>
						<a href="#none" class="button talk"><span>TALK</span></a>
					</div>
					<dl class="hits-num">
						<dt>WISH</dt>
						<dd class="wish">435</dd>
						<dt>HAVE</dt>
						<dd class="have">657</dd>
						<dt>TALK</dt>
						<dd class="talk">214</dd>
					</dl>
				</div>
				<p class="comment">눈꽃같은 신부에게 딱 어울리는 거짓말눈꽃같은 신부에게 딱 어울리는 거짓말눈꽃같은 신부에게 딱 어울리는 거짓말눈꽃같은 신부에게 딱 어울리는 거짓말</p>
				<div class="bloger">
					<img src="/images/common/_thum/@dummy-blogerprofile.jpg" alt="" />
					<p class="">
						<span>로아공주</span>
						<span class="blogTitle">패션의 포인트</span>
						<a href="#none">http://www.wizwid.com</a>
					</p>
				</div>
			</div>
			<div class="item" id="item495">
				<p class="dateTime">
					<span class="upload-time"><strong>11:40</strong> am</span>
					<span class="upload-date">2012.12.13</span>
				</p>
				<div class="reviewCategory-product">
					<img src="/images/common/_thum/@dummy-jewerly.jpg"  alt="" />
					<span class="category-item jewerly">jewerly</span>
					<div id="reviewBtn" class="buttonBox">
						<a href="#none" class="button wish"><span>WISH</span></a>
						<a href="#none" class="button have"><span>HAVE</span></a>
						<a href="#none" class="button talk"><span>TALK</span></a>
					</div>
					<dl class="hits-num">
						<dt>WISH</dt>
						<dd class="wish">435</dd>
						<dt>HAVE</dt>
						<dd class="have">657</dd>
						<dt>TALK</dt>
						<dd class="talk">214</dd>
					</dl>
				</div>
				<p class="comment">눈꽃같은 신부에게 딱 어울리는 거짓말눈꽃같은 신부에게 딱 어울리는 거짓말눈꽃같은 신부에게 딱 어울리는 거짓말눈꽃같은 신부에게 딱 어울리는 거짓말</p>
				<div class="bloger">
					<img src="/images/common/_thum/@dummy-blogerprofile.jpg" alt="" />
					<p class="">
						<span>로아공주</span>
						<span class="blogTitle">패션의 포인트</span>
						<a href="#none">http://www.wizwid.com</a>
					</p>
				</div>
			</div>
			<div class="item" id="item494">
				<p class="dateTime">
					<span class="upload-time"><strong>11:40</strong> am</span>
					<span class="upload-date">2012.12.13</span>
				</p>
				<div class="reviewCategory-product">
					<img src="/images/common/_thum/@dummy-jewerly.jpg" alt="" />
					<span class="category-item jewerly">jewerly</span>
					<div id="reviewBtn" class="buttonBox">
						<a href="#none" class="button wish"><span>WISH</span></a>
						<a href="#none" class="button have"><span>HAVE</span></a>
						<a href="#none" class="button talk"><span>TALK</span></a>
					</div>
					<dl class="hits-num">
						<dt>WISH</dt>
						<dd class="wish">435</dd>
						<dt>HAVE</dt>
						<dd class="have">657</dd>
						<dt>TALK</dt>
						<dd class="talk">214</dd>
					</dl>
				</div>
				<p class="comment">눈꽃같은 신부에게 딱 어울리는 거짓말눈꽃같은 신부에게 딱 어울리는 거짓말눈꽃같은 신부에게 딱 어울리는 거짓말눈꽃같은 신부에게 딱 어울리는 거짓말</p>
				<div class="bloger">
					<img src="/images/common/_thum/@dummy-blogerprofile.jpg" alt="" />
					<p class="">
						<span>로아공주</span>
						<span class="blogTitle">패션의 포인트</span>
						<a href="#none">http://www.wizwid.com</a>
					</p>
				</div>
			</div>
			<div class="item" id="item493">
				<p class="dateTime">
					<span class="upload-time"><strong>11:40</strong> am</span>
					<span class="upload-date">2012.12.13</span>
				</p>
				<div class="reviewCategory-product">
					<img src="/images/common/_thum/@dummy-jewerly.jpg"  alt="" />
					<span class="category-item jewerly">jewerly</span>
					<div id="reviewBtn" class="buttonBox">
						<a href="#none" class="button wish"><span>WISH</span></a>
						<a href="#none" class="button have"><span>HAVE</span></a>
						<a href="#none" class="button talk"><span>TALK</span></a>
					</div>
					<dl class="hits-num">
						<dt>WISH</dt>
						<dd class="wish">435</dd>
						<dt>HAVE</dt>
						<dd class="have">657</dd>
						<dt>TALK</dt>
						<dd class="talk">214</dd>
					</dl>
				</div>
				<p class="comment">눈꽃같은 신부에게 딱 어울리는 거짓말눈꽃같은 신부에게 딱 어울리는 거짓말눈꽃같은 신부에게 딱 어울리는 거짓말눈꽃같은 신부에게 딱 어울리는 거짓말</p>
				<div class="bloger">
					<img src="/images/common/_thum/@dummy-blogerprofile.jpg" alt="" />
					<p class="">
						<span>로아공주</span>
						<span class="blogTitle">패션의 포인트</span>
						<a href="#none">http://www.wizwid.com</a>
					</p>
				</div>
			</div>-->
		</div>
		<div id="activitySide">
			<a href="#none"><img src="/images/common/_thum/@dummy-friendsActivity.gif" alt="" /></a>
			<a href="#none"><img src="/images/common/_thum/@dummy-ad.gif" alt="" /></a>
		</div>
	</div><!--contents//-->
	
	<div class="item-field">
		<div class="item-slide">
			<img src="/images/common/_thum/@dummy-item.jpg" alt="" />
			<div class="prd-hits">
				<div class="bloger">
					<img src="/images/common/_thum/@dummy-blogerprofile.jpg" alt="" />
					<p>
						<span>로아공주 | 패션의 포인트</span>
						<a href="#none">http://www.wizwid.com</a>
					</p>
				</div>
				<dl class="hits-num">
					<dt>WISH</dt>
					<dd class="wish">435</dd>
					<dt>HAVE</dt>
					<dd class="have">657</dd>
					<dt>TALK</dt>
					<dd class="talk">214</dd>
				</dl>
			</div>
		</div>
		<div class="navigator">
			<a href="#none" class="on">1</a>
			<a href="#none">2</a>
			<a href="#none">3</a>
			<a href="#none">4</a>
			<a href="#none">5</a>
			<a href="#none">6</a>
			<a href="#none">7</a>
		</div>
		<dl id="brandList" class="clear">
			<dt><img src="/images/common/_ad/brand_wizwid_130111.gif" alt="" /></dt>
			<dd>
				<ul id="brand-item" class="clear">
					<li><img src="/images/common/_thum/@brand_prd.jpg" alt="" /></li>
					<li><img src="/images/common/_thum/@brand_prd02.jpg" alt="" /></li>
					<li><img src="/images/common/_thum/@brand_prd03.jpg" alt="" /></li>
				</ul>
			</dd>
			<dt><img src="/images/common/_ad/brand_michaa_130111.gif" alt="" /></dt>
			<dd>
				<ul id="brand-item" class="clear">
					<li><img src="/images/common/_thum/@brand_prd02.jpg" alt="" /></li>
					<li><img src="/images/common/_thum/@brand_prd.jpg" alt="" /></li>
					<li><img src="/images/common/_thum/@brand_prd03.jpg" alt="" /></li>
				</ul>
			</dd>
			<dt><img src="/images/common/_ad/brand_im_130111.gif" alt="" /></dt>
			<dd>
				<ul id="brand-item" class="clear">
					<li><img src="/images/common/_thum/@brand_prd02.jpg" alt="" /></li>
					<li><img src="/images/common/_thum/@brand_prd03.jpg" alt="" /></li>
					<li><img src="/images/common/_thum/@brand_prd.jpg" alt="" /></li>
				</ul>
			</dd>
			<dt><img src="/images/common/_ad/brand_jigott_130111.gif" alt="" /></dt>
			<dd>
				<ul id="brand-item" class="clear">
					<li><img src="/images/common/_thum/@brand_prd03.jpg" alt="" /></li>
					<li><img src="/images/common/_thum/@brand_prd.jpg" alt="" /></li>
					<li><img src="/images/common/_thum/@brand_prd02.jpg" alt="" /></li>
				</ul>
			</dd>
			<dt><img src="/images/common/_ad/brand_puma_130111.gif" alt="" /></dt>
			<dd>
				<ul id="brand-item" class="clear">
					<li><img src="/images/common/_thum/@brand_prd.jpg" alt="" /></li>
					<li><img src="/images/common/_thum/@brand_prd02.jpg" alt="" /></li>
					<li><img src="/images/common/_thum/@brand_prd03.jpg" alt="" /></li>
				</ul>
			</dd>
		</dl>
	</div><!--item-field//-->
	</div>



<script>

$(function(){
	// Divs Masonry Selector Setting
	
	var $contents = $('#contents');

	$contents.imagesLoaded(function(){				
				$contents.masonry({
					itemSelector: '.item'
				});				
				index.arrow_points();
	});

	var limitedDistance = 0; 
	$(window).scroll(function(){
		if ($(window).scrollTop() == ($(document).height() - $(window).height())-limitedDistance){
			index.more_results();
		}
	});

	//Mouseup textarea false
	$("#popup").mouseup(function() 
	{
		return false;
	});
	  
	$(".timeline_container").click(function(e)
	{
		var topdiv=$("#contentstop").height();
	});

});
</script>