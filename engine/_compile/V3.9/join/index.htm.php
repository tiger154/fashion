<?php /* Template_ 2.2.4 2012/12/06 10:07:18 /www/fassion10/engine/view/V3.9/join/index.htm 000003168 */ ?>
<script type="text/javascript" src="<?php echo $TPL_VAR["JS"]?>/_global/input.js"></script>

<form name="form1" id="form1">

<div class="title_line"><img src="/images/myrevu/title_agree.gif" /></div>
<img src="/images/myrevu/img_joinstep1.gif" />
<div class="pt40"><span class="black_title">레뷰이용약관</span></div>
<textarea cols="100" rows="8" class="input_common_area join_textarea" readonly><?php echo $TPL_VAR["agree"]?></textarea>
<div class="join_agree_radio">
	<input type="radio" name="agree_confirm" value="1" checked /><span class="gray11_db_text">동의함</span>&nbsp;
	<input type="radio" name="agree_confirm" value="0" /><span class="common11_text">동의하지 않음</span>&nbsp;
</div>

<div class="pt20"><span class="black_title">개인정보 수집, 이용 등에 대한 동의</span></div>
<div class="join_title_indent">1. 개인정보의 수집 및 이용 목적</div>
<textarea cols="100" rows="8" class="input_common_area join_textarea" readonly><?php echo $TPL_VAR["policy1"]?></textarea>
<div class="join_agree_radio">
	<input type="radio" name="policy_confirm1" value="1" checked /><span class="gray11_db_text">동의함</span>&nbsp;
	<input type="radio" name="policy_confirm1" value="0"  /><span class="common11_text">동의하지 않음</span>&nbsp;
</div>

<div class="join_title_indent">2. 수집하는 개인정보 항목</div>
<textarea cols="100" rows="8" class="input_common_area join_textarea" readonly><?php echo $TPL_VAR["policy2"]?></textarea>
<div class="join_agree_radio">
	<input type="radio" name="policy_confirm2" value="1" checked /><span class="gray11_db_text">동의함</span>&nbsp;
	<input type="radio" name="policy_confirm2" value="0"  /><span class="common11_text">동의하지 않음</span>&nbsp;
</div>

<div class="join_title_indent">3. 개인정보의 보유 및 이용기간</div>
<textarea cols="100" rows="8" class="input_common_area join_textarea" readonly><?php echo $TPL_VAR["policy3"]?></textarea>
<div class="join_agree_radio">
	<input type="radio" name="policy_confirm3" value="1" checked /><span class="gray11_db_text">동의함</span>&nbsp;
	<input type="radio" name="policy_confirm3" value="0"  /><span class="common11_text">동의하지 않음</span>&nbsp;
</div>

<div class="join_title_indent">4. 개인정보의제공 및 취급 위탁</div>
<textarea cols="100" rows="8" class="input_common_area join_textarea" readonly><?php echo $TPL_VAR["policy4"]?></textarea>
<div class="join_agree_radio">
	<input type="radio" name="policy_confirm4" value="1" checked /><span class="gray11_db_text">동의함</span>&nbsp;
	<input type="radio" name="policy_confirm4" value="0"  /><span class="common11_text">동의하지 않음</span>&nbsp;
</div>

<center>
	<img src="/images/common/but/but_gb_pre.gif" alt="이전" title="이전" class="btn" id="agreeCancelBtn" />
	&nbsp;&nbsp;&nbsp;&nbsp;
	<img src="/images/common/but/but_gb_next.gif" alt="다음" title="다음" class="btn" id="agreeBtn" />
</center>

<div class="pt40"></div>
	
</form>