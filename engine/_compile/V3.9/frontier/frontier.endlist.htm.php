<?php /* Template_ 2.2.4 2012/01/13 15:11:38 /www/revu39/engine/view/V3.9/frontier/frontier.endlist.htm 000002982 */ 
$TPL_mainlist_1=empty($TPL_VAR["mainlist"])||!is_array($TPL_VAR["mainlist"])?0:count($TPL_VAR["mainlist"]);?>
<div class="title_line gray_l_text"><img src="/images/frontier/title_frontier_end.gif"  align="left"/></div>
      <!-- 스페셜 박스 시작  / 있으면 최소 2개-->

        <!-- 리스트 묶음 박스 시작 -->
        
<?php if($TPL_mainlist_1){foreach($TPL_VAR["mainlist"] as $TPL_V1){?>   
       <div class="clear"> </div>
		 <div class="frontier_cbox">
			<div class="frontier_list">
				<!-- <div class="thum110_box" style="background:url(<?php echo $TPL_V1["listimg"]?>) no-repeat; float:left; display:inline;">
					<div  class="them_text_g white11_text" style="text-align:center;"><?php echo $TPL_V1["b_cate"]?>

					</div> -->

				 <div class="thum110_nbox">
					 <div class="them_text_ng white11_text" style="text-align:center;"><?php echo $TPL_V1["b_cate"]?></div>
					<img src="<?php echo $TPL_V1["listimg"]?>" width="110" height="110" />
					</div>

				<div class="frontier_revw_box" style="float:left; display:inline;">
					<div class="gray_title list_title_line2"><a href="/frontier/detailview/1/<?php echo $TPL_V1["frno"]?>/C/"><?php echo $TPL_V1["subject"]?></a>
					</div>
					<div class="list_count_line2"><span class="orange11_text">등록리뷰 <?php echo $TPL_V1["reviewcnt"]?> 건&nbsp;
<?php if($TPL_V1["reviewcnt"]< 1){?>
		
<?php }else{?>
					<a href="/frontier/detailview/1/<?php echo $TPL_V1["frno"]?>/C//M"><img src="/images/common/ico/frontier_more.gif"></a>
<?php }?>			
					</span>
					</div>
					<div class="clear"></div>
					
<?php if($TPL_V1["view"]=="Y"){?> 
					<div class="frontier_revw_text">
					<ul>
					<li class="frontier_revw_titleline"><span class="common_text pl20"><a href="javascript:common.socialbar(<?php echo $TPL_V1["rno"]?>)"><strong><?php echo htmlspecialchars($TPL_V1["content"]["title"])?></strong></a>&nbsp;|&nbsp;</span><span class="gray11_l_text"><a href="javascript:context.load(<?php echo $TPL_V1["userno"]?>)"><?php echo $TPL_V1["review_nickname"]?></a></span> </li>
					<li style="height:8px;"></li>
					<li class="frontier_revw_textline common_text"><?php echo strip_tags($TPL_V1["content"]["content"])?> </li>
					</ul>
					</div>
<?php }else{?>

					<div class="frontier_revw_text">
					<ul>
					<li style="height:8px;"></li>
					<li class="frontier_revw_textline common_text "><font color="#977EB6">등록된 리뷰가 없습니다.</font></li>
					</ul>
					</div>

<?php }?>

				</div>
			</div>
        <div class="clear"></div>
        <div  class="cbox_line_endfrontier"></div>
      </div>
	 
<?php }}?>




     <!-- 페이지 넘버링 박스 시작 -->
<?php if($TPL_VAR["size"]> 0){?> 
		<div class="pageno"><?php echo $TPL_VAR["link"]?></div>
<?php }else{?>
		<div class="nolist"></div>
<?php }?>
	<!-- 페이지 넘버링 박스 끝 -->