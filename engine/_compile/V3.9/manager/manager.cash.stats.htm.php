<?php /* Template_ 2.2.4 2011/12/29 10:17:01 /www/revu39/engine/view/V3.9/manager/manager.cash.stats.htm 000002623 */ 
$TPL_list_1=empty($TPL_VAR["list"])||!is_array($TPL_VAR["list"])?0:count($TPL_VAR["list"]);?>
<script type="text/javascript" src="<?php echo $TPL_VAR["JS"]?>/_global/input.js"></script>
<script type="text/javascript" src="<?php echo $TPL_VAR["JS"]?>/manager.cash.js"></script>
<h2>캐시적립현황</h2>
<form name="form1" id="form1">
<input type="radio" name="flag" value="all" <?php if($TPL_VAR["param"][ 1]=='all'||$TPL_VAR["param"][ 1]==''){?>checked<?php }?> />전체
<input type="radio" name="flag" value="0" <?php if($TPL_VAR["param"][ 1]=='0'){?>checked<?php }?> />적립
<input type="radio" name="flag" value="1" <?php if($TPL_VAR["param"][ 1]=='1'){?>checked<?php }?> />사용
<select name="opt" id="opt">
	<option value="">==검색==</option>
	<option value="nickname" <?php if($TPL_VAR["param"][ 2]=='nickname'){?>selected<?php }?>>닉네임</option>
	<option value="userid" <?php if($TPL_VAR["param"][ 2]=='userid'){?>selected<?php }?>>아이디</option>
	<option value="userno" <?php if($TPL_VAR["param"][ 2]=='userno'){?>selected<?php }?>>회원번호</option>
</select>
<input type="text" name="keyword" id="keyword" value="<?php echo $TPL_VAR["param"][ 3]?>" />
<input type="button" value="검색" id="searchCashLogBtn" />
&nbsp;
<strong>| 총 <font color="red"><?php echo number_format($TPL_VAR["cnt"])?></font>건이 검색되었습니다.</strong>
<hr />
<table width="100%">
	<tr>
		<th>일련번호</th> 
		<th>아이디</th>
		<th>닉네임</th>
		<th>이름</th>
		<th>캐시구분</th>
		<th>캐시타입</th>
		<th>캐시</th>
		<th>적용전캐시</th>
		<th>적용후캐시</th>
		<th>리뷰</th>
		<th>등록일</th>
	</tr>
<?php if($TPL_list_1){foreach($TPL_VAR["list"] as $TPL_V1){?>
	<tr align="center">
		<td><?php echo $TPL_V1["idx"]?></td>
		<td><?php echo $TPL_V1["user"]["userid"]?></td>
		<td><a href="javascript:manager.user(<?php echo $TPL_V1["userno"]?>);"><?php echo $TPL_V1["user"]["nickname"]?></a></td>
		<td><?php echo $TPL_V1["user"]["username"]?></td>
		<td><?php echo $TPL_V1["flag_sign_text"]?></td>
		<td><?php echo $TPL_V1["cash_type_text"]?></td>
		<td><?php echo number_format($TPL_V1["cash"])?></td>
		<td><?php echo number_format($TPL_V1["cash_before"])?></td>
		<td><?php echo number_format($TPL_V1["cash_after"])?></td>
		<td><?php echo $TPL_V1["rno"]?></td>
		<td><?php echo $TPL_V1["regdate"]?></td>
	</tr>
<?php }}?>
</table>

<div class="pageno"><?php echo $TPL_VAR["link"]?></div>
</form>