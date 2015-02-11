<?php /* Template_ 2.2.4 2013/02/06 17:04:18 /www/fassion10/engine/view/V3.9/item/item.view.htm 000007160 */ ?>
<style>
body {width:1230px;}
</style>
<link rel="stylesheet" type="text/css" href="http://www.fassion.co.kr/css/_global/main.css" />
<div id="itemviewBox">
			<h1><?php echo $TPL_VAR["itemInfo"]["itemName"]?></h1>
			<ul class="uploaDate">
				<li>wished 2 days ago</li>
				<li><?php echo $TPL_VAR["itemInfo"]["colname"]?></li>
				<li><a href="#none"><?php echo $TPL_VAR["itemInfo"]["url"]?></a></li>
			</ul>
			<div class="clear">
				<div class="itemView">
					<div class="image-item">
						<img src="<?php echo $TPL_VAR["itemInfo"]["itemurl"]?>" alt="" />
						<span class="price-tag"><img src="/images/common/_layout/price23_130111.png" alt="230,000원"></span>
						<div class="buttonBox" style="display:none">
							<a href="#none" class="button <?php echo $TPL_VAR["itemInfo"]["wishYN"]?>"><span>WISH</span><span class="numHit"><?php echo $TPL_VAR["itemInfo"]["wishCnt"]?></span></a>
							<a href="#none" class="button <?php echo $TPL_VAR["itemInfo"]["haveYN"]?>"><span>HAVE</span><span class="numHit"><?php echo $TPL_VAR["itemInfo"]["haveCnt"]?></span></a>
							<a href="#none" class="button talk "><span>TALK</span><span class="numHit"><?php echo $TPL_VAR["itemInfo"]["talkCnt"]?></span></a>
						</div>
					</div>
					<p class="item-comment">지니킴에서 발견한 정말 이쁜 토슈즈 12센티의 굽높이는 허리를 아프게 하지만<br />정말 이쁜듯… 가지고 싶당…</p>
					<div class="source-url">
						<p><span>쇼핑하기 : </span><a href="#none"><?php echo $TPL_VAR["itemInfo"]["url"]?></a></p>
						<ul class="clear">
							<li><a href="#none"><img src="/images/common/_layout/btn_like_130111.gif" alt="like" /></a></li>
							<li><a href="#none"><img src="/images/common/_layout/btn_share_130111.gif" alt="share" /></a></li>
							<li><a href="#none"><img src="/images/common/_layout/btn_tweet_130111.gif" alt="tweet" /></a></li>
							<li><a href="#none"><img src="/images/common/_layout/btn_me_130111.gif" alt="me2day" /></a></li>
							<li><a href="#none"><img src="/images/common/_layout/btn_cyworld_130111.gif" alt="cyworld" /></a></li>
							<li><a href="#none"><img src="/images/common/_layout/btn_email_130111.gif" alt="email" /></a></li>
							<li><a href="#none"><img src="/images/common/_layout/btn_messenger_130111.gif" alt="messenger" /></a></li>
						</ul>
					</div>
					<table cellpadding="0" class="tblType">
						<thead>
							<tr>
								<th width="50%" scope="col">I Wish</th>
								<th width="50%">I Have</th>
							</tr>
						</thead>
						<tbody>
							<tr class="bloger-hits">
								<td>
<?php if($TPL_VAR["itemInfo"]["wishCnt"]> 0){?>
									<img src="/images/common/_thum/@dummy-bloger.jpg" alt="" />
									<p><span class="blogerName"><?php echo $TPL_VAR["itemInfo"]["wish_nick"]?>님</span> 외 <?php echo $TPL_VAR["itemInfo"]["wishCnt"]- 1?>명이 <br />이 아이템을 가지고 싶어 합니다.</p>
<?php }else{?>
										WISH 내역이 없습니다.
<?php }?>
								</td>
								<td>
<?php if($TPL_VAR["itemInfo"]["haveCnt"]> 0){?>
									<img src="/images/common/_thum/@dummy-bloger.jpg" alt="" />
									<p><span class="blogerName"><?php echo $TPL_VAR["itemInfo"]["have_nick"]?>님</span> 외 <?php echo $TPL_VAR["itemInfo"]["haveCnt"]- 1?>명이 <br />이 아이템을 가지고 싶어 합니다.</p>
<?php }else{?>
										HAVE 내역이 없습니다.
<?php }?>
								</td>
							</tr>
						</tbody>
					</table>
					<dl class="togetherTalk talk">
						<dt>Wish, Have 버튼 누르셨나요? Wish, Have와 함께 이야기를 나눠보세요.<span></span></dt>
						<dd>
							<img src="/images/common/_thum/@dummy-bloger.jpg" alt="" />
							<textarea id="textbox">
							</textarea>
						</dd>
					</dl>
					<div class="commentBox">
						<ul class="commentType">
							<li class="on"><a href="#none" id="commentAll">모든댓글</a><span class="check"></span></li>
							<li><a href="#none"  id="commentWish">Wish People 댓글</a></li>
							<li><a href="#none"  id="commentHave">Have People 댓글</a></li>
						</ul>
						<ul class="commentCont">							
<?php if(is_array($TPL_R1=$TPL_VAR["itemInfo"]["talk"])&&!empty($TPL_R1)){foreach($TPL_R1 as $TPL_V1){?>
							<li id='comment<?php echo $TPL_V1["tno"]?>'><img src="/images/common/_thum/@dummy-bloger.jpg" alt="" /><span><?php echo $TPL_V1["talk"]?></span><span class="icon <?php echo $TPL_V1["dec"]?>"><?php echo $TPL_V1["dec"]?></span></li>
<?php }}?>								
						</ul>
						<div class="moreBtn">
							<a href="#none"><img src="/images/common/_layout/btn_more_130111.gif" alt="더보기" /></a>
						</div>
					</div>
					<div class="itemCollection">
						<p class="title">이 아이템이 담긴 컬렉션</p>
						<div id="select-img" class="section-item">
							<img src="/images/common/_thum/@dummy_item01.jpg" alt="" />
							<p>My 2012 FW Collection</p>
						</div>
						<div id="imgList" class="section-item">
							<img src="/images/common/_thum/@dummy_item01.jpg" alt="" /><img src="/images/common/_thum/@dummy_item02.jpg" alt="" /><img src="/images/common/_thum/@dummy_item03.jpg" alt="" class="end" /><img src="/images/common/_thum/@dummy_item04.jpg" alt="" /><img src="/images/common/_thum/@dummy_item05.jpg" alt="" /><img src="/images/common/_thum/@dummy_item06.jpg" alt="" class="end" /><img src="/images/common/_layout/itemView_thum_130111.gif" alt="" /><img src="/images/common/_layout/itemView_thum_130111.gif" alt="" /><img src="../img/../common/_layout/itemView_thum_130111.gif" alt="" class="end" />
						</div>
						<div id="popularity-item" class="section-item">
							<p class="title">이 아이템과 같은 카테고리의 인기 아이템</p>
							<img src="/images/common/_thum/@dummy_item170.jpg" alt="" />
							<div class="cate-image">
								<img src="/images/common/_thum/@dummy_item02.jpg" alt="" />
								<img src="/images/common/_thum/@dummy_item03.jpg" alt="" />
							</div>
						</div>
						<div id="brand-item" class="section-item">
							<p class="title">Jinnykim.com 인기 아이템</p>
							<img src="/images/common/_thum/@dummy_item170.jpg" alt="" />
							<div class="cate-image">
								<img src="/images/common/_thum/@dummy_item02.jpg" alt="" />
								<img src="/images/common/_thum/@dummy_item03.jpg" alt="" />
							</div>
						</div>
						<a href="#none" class="btn-subscribe">구독하기</a>
					</div>
				</div>
				<div class="blogerItem">
					<img src="/images/common/_thum/@dummy_profile02.jpg" alt="" class="profile" />
					<p class="nickName">로아공주님</p>
					<dl class="hitsList">
						<dt>Item</dt>
						<dd>15,254</dd>
						<dt>Collection</dt>
						<dd>82</dd>
					</dl>
					<div class="clear">
						<a href="#none" class="button museAdd"><span>나의 뮤즈로 추가</span></a>
						<a href="#none" class="button itemBuy"><span>이 아이템 사고 싶어요</span></a>
						<a href="#none" class="button itmSell"><span>이 아이템 팔고 싶어요</span></a>
					</div>
				</div>
			</div>
		</div>
	</div>