<?php /* Template_ 2.2.4 2013/01/25 13:27:03 /www/fassion10/engine/view/V3.9/_global_layer/headerCate.htm 000001850 */ ?>
<div class="categoryMenu">
			<a href="#none" class="all">전체</a>
			<a href="#none" class="clothing">의류</a>
			<a href="#none" class="shoes">신발</a>
			<a href="#none" class="bag">가방</a>
			<a href="#none" class="beauty">화장품</a>
			<a href="#none" class="jewelry">악세사리</a>
		</div>
<?php if($_SESSION["userno"]==""){?>
		<!--로그인전-->
		<div class="loginArea">
			<a href="/login/">로그인</a>
			<a href="#none">회원가입</a>
		</div>
		<!--로그인전//-->
<?php }else{?>
		<!--로그인후-->
		<div class="loginArea">
			<img src="/images/common/_thum/@dummy_profile.jpg" alt="" />
			<a href="#none" class="nickName"><?php echo $_SESSION["nickname"]?></a>
			<div class="dialogBox" id="privateBox" style="display:none">
				<span class="toparrow"></span>
				<div>
					<img src="/images/common/_thum/@dummy_profile.jpg" alt="" />
					<span><?php echo $_SESSION["nickname"]?>님</span>
					<dl class="hitsList">
						<dt class="first">Item</dt>
						<dd class="first"><?php echo number_format($_SESSION["item_cnt"])?></dd>
						<dt class="last">Collection</dt>
						<dd class="last"><?php echo number_format($_SESSION["collection_cnt"])?></dd>
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
		<!--로그인후//-->
<?php }?>