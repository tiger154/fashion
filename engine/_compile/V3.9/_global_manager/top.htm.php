<?php /* Template_ 2.2.4 2012/01/31 13:19:07 /www/revu39/engine/view/V3.9/_global_manager/top.htm 000004991 */ ?>
<!-- top 메뉴영역 시작 -->
<div id="top-logo">
	<img src="<?php echo $TPL_VAR["IMAGES"]?>/common/logo.png" alt="레뷰로고" onClick="common.redirect('/manager');" class="btn" />
<?php if($_SESSION["grade"]> 100&&$_SESSION["grade"]< 103){?>		
	관계사 페이지
<?php }?>
<?php if($_SESSION["grade"]> 104){?>
	관리자 페이지 
<?php }?>
</div>
<div id="top-link">
	<div id="menu">
		<ul class="menu">
<?php if($_SESSION["grade"]> 100&&$_SESSION["grade"]< 103){?>			
			<li><a href="/manager/cp.file"><span>파일다운</span></a></li>
			<li><a href=""><span>관련알림글</span></a></li>
			<!-- <li><a href="#"><span>지난 발송 내역</span></a></li> -->
			<li><a href="/manager/logout.proc"><span>로그아웃</span></a></li>
<?php }?>
<?php if($_SESSION["grade"]> 104){?>
			<li><a href="/manager"><span>홈</span></a></li>
			<li><a href="/manager/user" class="parent"><span>회원관리</span></a>
				<ul>
					<li><a href="/manager/user"><span>전체회원</span></a></li>
					<li><a href="/manager/user.powerblog"><span>파워블로거신청자</span></a></li>
					<li><a href="/manager/user.secede"><span>탈퇴회원</span></a></li>
					<li><a href="/manager/user.admin"><span>관리자계정관리</span></a></li>
				</ul>
			</li>
			<li><a href="/manager/letter.step1" class="parent"><span>메일관리</span></a>
				<ul>
					<li><a href="/manager/letter.step1"><span>개별메일발송</span></a></li>
					<li><a href="/manager/letter.step2"><span>회원그룹메일</span></a></li>
					<li><a href="/manager/letter.step3"><span>프론티어 당첨메일</span></a></li>
					<!-- <li><a href="#"><span>지난 발송 내역</span></a></li> -->
				</ul>
			</li>
			<li><a href="#" class="parent"><span>SMS발송</span></a></li>
			<li><a href="/manager/cash.stats" class="parent"><span>캐쉬</span></a>
				<ul>
					<li><a href="/manager/cash.withdraw"><span>캐쉬 신청자</span></a></li>
					<li><a href="/manager/cash.stats"><span>캐쉬 적립현황</span></a></li>
					<li><a href="/manager/cash.list"><span>캐쉬 합계내역</span></a></li>
				</ul>
			</li>
			<li><a href="/manager/review" class="parent"><span>리뷰관리</span></a>
				<ul>
					<li><a href="/manager/review"><span>전체리뷰</span></a></li>
					<li><a href="/manager/review2"><span>리뷰검색</span></a></li>
					<li><a href="/manager/review.best"><span>베스트리뷰</span></a></li>
					<li><a href="#" class="parent"><span>테마리뷰</span></a>
						<ul>
							<li><a href="#"><span>목록</span></a></li>
							<li><a href="#"><span>추천현황</span></a></li>
						</ul>
					</li>
					<li><a href="#"><span>금칙어 관리</span></a></li>
				</ul>
			</li>
			<li><a href="/manager/review.keyword" class="parent"><span>화면관리</span></a>
				<ul>
					<li><a href="/manager/review.keyword" class="parent"><span>메인 키워드리뷰</span></a>
						<ul>
							<li><a href="/manager/review.keyword"><span>노출키워드설정</span></a></li>
							<li><a href="/manager/review.keyword.link"><span>키워드링크</span></a></li>
						</ul>	
						
					</li>
					<li><a href="/manager/regist.banner"><span>배너등록</span></a></li>
					<li><a href="/manager/list.banner"><span>배너관리</span></a></li>					
				</ul>
			</li>
			<li><a href="/manager/frontier.list" class="parent"><span>프론티어</span></a>
				<ul>
					<li><a href="/manager/frontier.regist"><span>프론티어 등록</span></a></li>
					<li><a href="/manager/frontier.list"><span>프론티어 목록</span></a></li>
					<li><a href="/manager/frontier.cashpay"><span>당첨자캐시지급</span></a></li>
					<li><a href="/manager/frontier.reviewdel"><span>프론티어 리뷰삭제</span></a></li>
					<li><a href="/manager/frontier.reviewmodify"><span>프론티어 리뷰수정</span></a></li>
					<li><a href="/manager/frontier.partner"><span>제휴문의 조회</span></a></li>
				</ul>
			</li>
<?php }?>
<?php if($_SESSION["grade"]> 106){?>
			<li>
				<a href="#" class="parent"><span>로그</span></a>
				<ul>
					<li><a href="/manager/log.count"><span>통계로그</span></a></li>
					<li><a href="/manager/log.cash"><span>캐시로그</span></a></li>
					<li><a href="/manager/log.point"><span>포인트로그</span></a></li>
					<li><a href="/manager/log.transaction"><span>트랜잭션 에러로그</span></a></li>
					<li><a href="/manager/log.cron"><span>크론로그</span></a></li>
					<li><a href="/manager/letter.history1"><span>예약/그룹메일전송내역</span></a></li>
					<li><a href="/manager/letter.history2"><span>개별메일전송내역</span></a></li>

				</ul>
			</li>
<?php }?>
<?php if($_SESSION["grade"]> 104){?>
			<li><a href="/manager/logout.proc"><span>[로그아웃]</span></a></li>
<?php }?>

		</ul>
	</div>
</div>

<div class="clear"></div>
<!-- top 메뉴영역 끝 -->