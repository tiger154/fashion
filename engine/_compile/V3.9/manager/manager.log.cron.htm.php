<?php /* Template_ 2.2.4 2011/11/04 11:50:26 /www/revu39/engine/view/V3.9/manager/manager.log.cron.htm 000001706 */ 
$TPL_list_1=empty($TPL_VAR["list"])||!is_array($TPL_VAR["list"])?0:count($TPL_VAR["list"]);?>
<script type="text/javascript" src="<?php echo $TPL_VAR["JS"]?>/_global/input.js"></script>
<script type="text/javascript" src="<?php echo $TPL_VAR["JS"]?>/manager.log.js"></script>
<h2>크론로그</h2>
<form name="form1" id="form1">
<input type="radio" name="flag" value="all" <?php if($TPL_VAR["param"][ 1]=='all'||$TPL_VAR["param"][ 1]==''){?>checked<?php }?> />전체
<select name="opt" id="opt">
	<option value="">==검색==</option>
	<option value="name" <?php if($TPL_VAR["param"][ 2]=='name'){?>selected<?php }?>>크론명</option>
</select>
<input type="text" name="keyword" id="keyword" value="<?php echo $TPL_VAR["param"][ 3]?>" />
<input type="button" value="검색" id="searchCronLogBtn" />
&nbsp;
<strong>| 총 <font color="red"><?php echo number_format($TPL_VAR["cnt"])?></font>건이 검색되었습니다.</strong>
<hr />
* 특수문자때문에 검색안됨 - 차후에 수정할 예정 <hr />
<table width="100%">
	<tr>
		<th>일련번호</th> 
		<th>크론명</th>
		<th>크론파일</th>
		<th>내용</th>
		<th>등록일</th>
	</tr>
<?php if($TPL_list_1){foreach($TPL_VAR["list"] as $TPL_V1){?>
	<tr align="center">
		<td><?php echo $TPL_V1["idx"]?></td>
		<td><?php echo $TPL_V1["cron_name"]?></td>
		<td align="right"><?php echo $TPL_V1["cron_src"]?></td>
		<td><?php echo $TPL_V1["content"]?></td>
		<td><?php echo $TPL_V1["regdate"]?></td>
	</tr>
<?php }}?>
</table>

<div class="pageno"><?php echo $TPL_VAR["link"]?></div>
</form>