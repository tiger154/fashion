<?php /* Template_ 2.2.4 2012/01/11 15:23:24 /www/revu39/engine/view/V3.9/myrevu/myrevu.blog.register.htm 000002423 */ ?>
<script type="text/javascript" src="<?php echo $TPL_VAR["JS"]?>/myrevu.blog.js"></script>
<div id="regStep01">
	<div class="title_line"><img src="/images/myrevu/title_myblog_step1.gif" align="left"/></div>
	<div class="myblog_step1">
		<!-- 인풋 -->
		<div style="width:466px; height:22px; padding:173px 0 0 160px;">
			<input type="text" name="blog_url" id="blog_url" size="30" value="http://" class="input_trans_myblog" style="width:400px; height:22px;font-weight:bold;" />
		</div>
	</div>
	<div style="width:714px;height:22px; padding:40px 0; text-align:center;" class="clear">
		<!--
		<img src="/images/common/but/but_wb_esc.gif" alt="취소" title="취소" />
		<img src="/images/common/space.gif" width="15" />
		-->
		<img src="/images/common/but/but_gb_next.gif" id="blogRegBtn1" alt="다음" title="다음" class="btn" />
	</div>
</div>

<div id="regStep02" style="display:none;">
	<div class="title_line"><img src="/images/myrevu/title_myblog_step2.gif"  align="left"/></div>
	<div class="myblog_step2">
	<!-- 인풋 -->
	<div style="width:466px; height:22px; padding:175px 0 0 159px;">
		<input type="hidden" name="rss_url" id="rss_url" size="40" value="" />
		<input type="text" name="auth_key" id="auth_key" size="60" value="" class="input_trans_myblog"  style="width:440px; height:22px; font-weight:bold;" />
	</div>
	</div>
	<div style="width:714px;height:22px; padding:40px 0; text-align:center;" class="clear">
		<img src="/images/common/but/but_gb_pre.gif" alt="이전" title="이전" id="blogPrevBtn2" class="btn" />
		<img src="/images/common/space.gif" width="15" />
		<img src="/images/common/but/but_gb_next.gif" alt="다음" title="다음" id="blogRegBtn2" class="btn" />
	</div>
</div>

<div id="regStep03" style="display:none;">
	<div class="title_line"><img src="/images/myrevu/title_myblog_step3.gif"  align="left"/></div>
	<div class="myblog_step3"></div>
	<div style="width:714px;height:22px; padding:40px 0; text-align:center;" class="clear">
		<!--
		<img src="/images/common/but/but_gb_pre.gif" id="blogRegBtn3" alt="이전" title="이전" />
		<img src="/images/common/space.gif" width="15" />
		-->
		<img src="/images/common/but/but_callmyblog.gif" id="reviewRegBtn3" alt="블로그글불러오기" title="블로그글불러오기" class="btn" />
	</div>
</div>