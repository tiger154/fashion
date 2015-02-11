<?php /* Template_ 2.2.4 2011/12/28 14:46:56 /www/revu39/engine/view/V3.9/myrevu/myrevu.secede.htm 000003886 */ 
$TPL_list_1=empty($TPL_VAR["list"])||!is_array($TPL_VAR["list"])?0:count($TPL_VAR["list"]);?>
<script>var type = "<?php echo $_SESSION["type"]?>";</script>
<script type="text/javascript" src="<?php echo $TPL_VAR["JS"]?>/_global/input.js"></script>
<script type="text/javascript" src="<?php echo $TPL_VAR["JS"]?>/myrevu.secede.js"></script>
<form name="form1" id="form1">
<div class="title_line gray_l_text"><img src="/images/myrevu/title_delrevu.gif"  align="left"/></div>
<div class="myrevu_wtext_box" style="background:#666666;"><span class="white_text"><strong>회원탈퇴 신청에 앞서 아래의 사항을 반드시 확인하시기 바랍니다.</strong></span></div>
<div class="myrevu_wtext_box">
	<ul>
		<li class="myrevu_text_line">1. 회원탈퇴를 신청하시면 해당 아이디는 즉시 탈퇴처리되며 이후 해당 아이디는 영구적으로 사용이 중지되므로 해당 아이디로는 재가입이 불가능합니다.</li>
		<li class="myrevu_text_line">2. 회원탈퇴 즉시 회원정보는 삭제됩니다. 단, 공공적(리뷰, 토크) 성격의 게시물은 탈퇴 후에도 삭제되지 않습니다. 게시물 등의 삭제를 원하시는 경우 반드시 먼저 삭제하신 후, 탈퇴를 신청하시기 바랍니다</li>
		<li class="myrevu_text_line">3. 불량이용 및 이용제한에 관한 기록은 당사의 개인정보취급방침에 따라 처리됩니다.</li>
		<li class="myrevu_text_line">4. 탈퇴하신 정보는 복구가 불가능하오니 신중하게 결정하여 주시기 바랍니다. </li>
	</ul>
</div>
<!-- 탈퇴 입력 폼 시작 -->
<div style="714px; height:auto; border-top:#f1f1f1 solid 2px;">
	<table width="100%" border="0" cellspacing="0">
		<tr>
			<td class="block_text">아이디</td>
			<td class="block_text2">
<?php if($_SESSION["type"]=="R"){?>
				<span class="black_text"><strong><?php echo $_SESSION['userid']?></strong></span>
<?php }else{?>
				소셜 로그인 사용자의 계정정보는  레뷰에서 보유하고 있지 않습니다.
<?php }?>
			</td>
		</tr>
		<tr>
			<td class="block_text">비밀번호</td>
			<td class="block_text2">
<?php if($_SESSION["type"]=="R"){?>
				*********
<?php }else{?>
				소셜 로그인 사용자의 계정정보는  레뷰에서 보유하고 있지 않습니다.
<?php }?>
			</td>
		</tr>
<?php if($_SESSION["type"]=="R"){?>
		<tr>
			<td class="block_text">비밀번호 확인</td>
			<td class="block_text2">
				<input type="password" name="passwd" id="passwd" class="input_common" style=" width:150px;margin-bottom:-4px;"/>
				&nbsp;
				<span class="common11_text">비밀번호를 입력해주세요.</span>
			</td>
		</tr>
<?php }?>
		<tr>
			<td class="block_text">탈퇴사유</td>
			<td class="block_text2">
				<select name="secede_type" id="secede_type" style="width:440px;">
					<option value="">탈퇴사유를 선택해주세요.</option>
<?php if($TPL_list_1){foreach($TPL_VAR["list"] as $TPL_V1){?>
					<option value="<?php echo $TPL_V1["state"]?>"><?php echo $TPL_V1["state_explain"]?></option>
<?php }}?>
				</select>
			</td>
		</tr>
		<tr>
			<td class="block_text">기타사유 및 <br />레뷰에게 바라는점</td>
			<td class="block_text2"><textarea name="content" id="content" class="input_common_area" style="width:440px; height:180px;"></textarea></td>
		</tr>
	</table>
</div>
<!-- 탈퇴 입력 폼 끝 -->
<div style="714px; height:22px; padding:40px 0; text-align:center;">	
	<img src="/images/common/but/but_gb_ok.gif" id="secedeBtn" alt="확인" title="확인" class="btn" />
	&nbsp;&nbsp;&nbsp;
	<img src="/images/common/but/but_wb_esc.gif" id="secedeCancelBtn" alt="취소" title="취소" class="btn" /> 
</div>
</form>