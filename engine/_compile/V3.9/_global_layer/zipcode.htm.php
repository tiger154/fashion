<?php /* Template_ 2.2.4 2012/12/06 10:07:18 /www/fassion10/engine/view/V3.9/_global_layer/zipcode.htm 000001372 */ ?>
<!-- 우편번호팝업 /사이즈 디폴터 w427 h가변  값은 style에서 변경-->
<div class="pop_postnum_box" style="width:407px;">
	<div class="pop_postnum_tbox" style="width:375px; height:350px;">
		<ul>
			<li class="pop_postnum_title">
				<img src="/images/common/but/but_xclose.gif" align="right" alt="닫기" title="닫기" onClick="common.closeLayer('zipcodelayer');" class="btn" />
			</li>
		</ul>
		<p class="pt20">현재 거주하고있는 읍/면/동을 입력하여 주세요.</p>
		<table border="0" cellpadding="0" cellspacing="0">
			<tr>
				<td>
					<select id="zipcodeType" style="width:140px;">
						<option value="dong">읍/면/동 검색</option>
						<option value="abname">아파트/건물명 검색</option>
					</select>
				</td>
				<td>
					<input type="text" name="zipcodeKeyword" id="zipcodeKeyword" class="input_common input150"/>
					<input type="button" id="zipcodeSearchBtn" value="검색" onClick="zipcode.search('addrzip','addr1');" />
				</td>
			</tr>
		</table>
		<p class="pt20">검색결과</p>
		<p class="pt10">
			<div id="zipcodeList"></div>
			<!--<select id="zipcodeList" multiple="multiple" style="width:365px;height:200px;"></select>-->
		</p>
	</div>
</div>