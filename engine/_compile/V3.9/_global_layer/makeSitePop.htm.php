<?php /* Template_ 2.2.4 2013/01/22 13:58:31 /www/fassion10/engine/view/V3.9/_global_layer/makeSitePop.htm 000002204 */ ?>
<p class="section-title">아이템 직접등록하기</p>
		<form id="popInner" action="item.html" class="cate-make">
			<input type="hidden" id="selectedWidth">
			<input type="hidden" id="selectedHeight">
			<input type="hidden" id="selectedColNo">
			<dl>
				<dt><img src="/images/common/top//@dummy/@dummy_profile.jpg" alt="" width="70px" height="70px" /></dt>
				<dd class="file-intro">
					<p>웹사이트 제품 페이지 링크를 아래에 입력해 주세요.</p>
					<input type="text" id="origin" value="출처:http://www.cjmall.com/asdf/qwer" />
				</dd>
				<dt>아이템이름</dt>
				<dd><input type="text"  id="itemName" value="아이템 이름을 입력해주세요." /></dd>
				<dt>컬렉션 선택</dt>
				<dd id="collection-select">
					<div class="selectBox" id="colOnItemPop">
						<p>어느 컬렉션에 넣을까요?</p>
						<!-- select list display:none상태 -->
						<ul style="display:none;">
							<!--li><a href="#none">기본 컬렉션</a></li>
							<li><a href="#none">My 2012 F/W Collection</a></li>
							<li><a href="#none">지름신 발동</a></li>
							<li><a href="#none">2012 이쁜 아가들</a></li-->
							<li class="category-make"><input type="text" /><button type="submit">만들기</button></li>
						</ul>
					</div>
					<p class="item-select">이 아이템을 넣을 컬렉션을 선택해주세요.<br >원하시는게 없으시면 새로 만들어주세요.</p>
				</dd>
				<dt>카테고리 선택</dt>
				<dd>
					<div class="clear">
						<select class="formSelect" id="cate_code1" onChange="item_.cateSelectChange2('cate_code1');">
							<option>1차분류</option>
						</select>
						<select class="formSelect asd" id="cate_code2" >
							<option>2차분류</option>
						</select>
					</div>
				</dd>
			</dl>
			<div class="buttonBox">
				<a href="#none" class="button itemMake"><span>아이템 만들기</span></a>
			</div>
		</form>
		<a href="#" onclick="common.closeSimpleLayer('make-sitePop')" class="button close"><span>close</span></a>