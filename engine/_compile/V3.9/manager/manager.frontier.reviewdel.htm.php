<?php /* Template_ 2.2.4 2012/01/26 13:58:10 /www/revu39/engine/view/V3.9/manager/manager.frontier.reviewdel.htm 000002416 */ ?>
<script type="text/javascript" src="<?php echo $TPL_VAR["JS"]?>/_global/input.js"></script>

<script type="text/javascript" src="<?php echo $TPL_VAR["EXTENDS"]?>/editor.htmlarea/config/button_action.js"></script>


<input type="hidden" name="tmp_img" id="tmp_img" value="" />
<form name="RevUform" id="RevUform" method="post" enctype="multipart/form-data" action="">
	<!-- 상단 -->
	<table border="0" width="980" cellpadding="5" cellspacing="0" >
		<tr>
			<!--본문-->
			<td valign="top" bgcolor="#FFFFFF">
				<table border="0" width="100%">
					<tr>
						<td align="left" height="35" border="0" bgcolor="#330033">
							<font color="#FFFFFF">&nbsp;<img src="<?php echo $TPL_VAR["IMAGES"]?>/admin/lyr_tit_bu.gif">&nbsp;프론티어><b>등록 리뷰 삭제처리</b></font>&nbsp;
						</td>
					</tr>
				</table>

				<table>
					<!-- 프론티어 타입 선택 -->
					<tr>
						<td align="left" width="120" border="0" bgcolor="#99CC66">
							&nbsp;해당 프론티어번호&nbsp;<br>
						</td>
						<td>
							<input type="text" name="frno" id="frno" value="" size="10"> ☞ 삭제할 리뷰리스트의 프론티어 번호 
						</td>
					</tr>
					
					<tr>
						<td align="left" width="120" border="0" bgcolor="#99CC66">
							&nbsp;삭제할 리뷰번호&nbsp;<br>
						</td>
						<td>
							<input type="text" name="rno" id="rno" value="" size="10"> ☞ 리뷰번호를 입력한 후 삭제하면 프론티어 당첨자 리뷰리스트에서만 삭제됨. 
						</td>
					</tr>
				
					

				</table>			
			</td>
			<!-- 본문 끝 -->
		</tr>
	</table>
	<!-- 버튼 -->
	<table width="800" border="0">
		<tr>
			<td width="800">&nbsp;
				<center>
				<!-- <input type="button" id="registCheckbanner" value="삭제"/> -->
				<input type="button" id="frontier_reviewdel" value="삭제"/>
				<!-- <input type="button" id="cancelBtn" value="취소"/> -->
				</center>
			</td>
		</tr>
	</table>
	<!-- 버튼 끝 -->


	<table width="800" border="0">
		<tr>
			<td width="800">&nbsp;<!-- 공백 -->
			</td>
		</tr>
	</table>




<!-- <script type="text/javascript">HTMLArea.init();</script> -->
<!-- <script type="text/javascript">HTMLArea2.init();</script> -->

</form>