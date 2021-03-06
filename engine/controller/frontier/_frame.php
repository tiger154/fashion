<?php
GLOBAL $TPL;
GLOBAL $BASE;
GLOBAL $LOGIN;
GLOBAL $DESIGN;

$domain			= "http://"._DOMAIN_FILE."/frontier/list_img/";
$oldlink				= "http://"._DOMAIN_FILE."/frontier/old_img/";

$CLASS_PAGE = &Module::singleton("Page");
$CLASS_FRONTIER = &Module::singleton("Frontier.Frontier");
$CLASS_REVIEW		= &Module::singleton("Review.Review");
$CLASS_SITE = &Module::singleton("Site.Site");

$DB = &Module::loadDb("revu");

$nowmonth		= date("m");
$nowday			= date("d");

$right_toplist		= $CLASS_FRONTIER->FrontierListSelectTframe($DB, $code, $flag_delete="0", $btitle, $sch_opt, $sch_con, "B", $frname, "T"); 
$right_mainlist	= $CLASS_FRONTIER->FrontierListSelectTframe($DB, $code, $flag_delete="0", $btitle, $sch_opt, $sch_con, "B", $frname, "M");
$right_reviewlist	= $CLASS_FRONTIER->FrontierReviewTframe($DB);

for($z=0;$z<sizeof($right_reviewlist);$z++){

		$right_reviewlist[$z]['nickname']		= $CLASS_FRONTIER->ReviewUserNickname($DB, $right_reviewlist[$z]['userno']);
		$right_reviewlist[$z]['review']					= $CLASS_FRONTIER->ReviewContentData($DB, $right_reviewlist[$z]['rno']);
		$right_reviewlist[$z]['reviewimg']		= $CLASS_FRONTIER->ReviewFileData($DB, $right_reviewlist[$z]['rno']);		
		$right_reviewlist[$z]['imgurl']				= $CLASS_REVIEW->getThumbimage($right_reviewlist[$z]['reviewimg'], $right_reviewlist[$z]['regdate']) ;
}


$frontierCount = $CLASS_FRONTIER->getListCount($DB, $code, $flag_delete, $btitle, $sch_opt, $sch_con, "B", $frname);


for($i=0;$i<sizeof($right_toplist);$i++) {

	if($right_toplist[$i]['frno'] > "877"){
		$topimgDir									= substr($right_toplist[$i]['frid'],2,4);
		$topimg										= $domain.$topimgDir."/".$right_toplist[$i]['titleimg'];
		$right_toplist[$i]['toplistimg']		= $topimg;
	}else{
		$oldimgname = explode("{", $right_toplist[$i]['frid']);
		$oldimgname = explode("}", $oldimgname[1]);
		$oldimgname = $oldimgname[0];
		$right_toplist[$i]['toplistimg']		= $oldlink.$oldimgname."_list.gif";
	}

	$rnotice_date								= $right_toplist[$i]['notice_date'];
	$rnotice_date								= substr($rnotice_date,0,4)."년".number_format(substr($rnotice_date,5,2))."월".number_format(substr($rnotice_date,8,2))."일";
	$right_toplist[$i]['notice_date']	= $rnotice_date;


}

for($i=0;$i<sizeof($right_mainlist);$i++) {

}


$frontierbannerlist		= $CLASS_FRONTIER->FrontierBannerList($DB, $code, $flag_delete="0", $btitle, $sch_opt, $sch_con, "B", $frname, "M");
$frontierbannerlistcnt	= $CLASS_FRONTIER->FrontierBannerListCnt($DB, $code, $flag_delete="0", $btitle, $sch_opt, $sch_con, "B", $frname, "M");

for($i=0;$i<sizeof($frontierbannerlist);$i++) {



		if($frontierbannerlist[$i]['frno'] > "877"){

			$bannerimgDir							= substr($frontierbannerlist[$i]['frid'],2,4);
			$bannerimg_name = $frontierbannerlist[$i]['titleimg'];
			$bannerimg_ready =  "http://"._DOMAIN_FILE."/frontier/banner_img/".$bannerimgDir."/".$frontierbannerlist[$i]['titleimg'];		
			$frontierbannerlist[$i]['bannerimg'] = $bannerimg_ready;
		}else{

			$oldimgname = explode("{", $frontierbannerlist[$i]['frid']);
			$oldimgname = explode("}", $oldimgname[1]);
			$oldimgname = $oldimgname[0];
			$frontierbannerlist[$i]['bannerimg']		= $oldlink.$oldimgname."_ani.gif";

		}

}

$banner_right = $CLASS_FRONTIER->BannerSelect($DB, "L");				
for($n=0; $n<sizeof($banner_right); $n++) {
		$banner_right_img			= $banner_right[$n]['bannerimg']; 
		$banner_right_linktype		= $banner_right[$n]['linktype'];		
		$banner_right_url			= $banner_right[$n]['siteurl'];		
		if($banner_right_linktype = "T"){
			$banner_right_link = "<a href='$banner_right_url' target='_blank'>";
		}else{
			$banner_right_link = "<a href='$banner_right_url' target='_top'>";
		}
}

if($n < 1){
	$banner_right_img = "N";
}else{
	$banner_right_img 	= "http://"._DOMAIN_FILE."/"._FTP_BANNERIMAGE."/".$banner_right_img;
}


$notice = $CLASS_SITE->getNotice($DB);

$TPL->setValue(array(
	"logo"=>$logo,	
	"right_toplist"=>$right_toplist,
	"right_mainlist"=>$right_mainlist,
	"nowmonth"=>$nowmonth,
	"nowday"=>$nowday,
	"frontierCount"=>$frontierCount,
	"cssblank"=>$cssblank,
	"frontierbannerlist"=>$frontierbannerlist,
	"frontierbannerlistcnt"=>$frontierbannerlistcnt,
	"right_reviewlist"=>$right_reviewlist,
	"banner_right_img"=>$banner_right_img,
	"banner_right_link"=>$banner_right_link,
	"notice"=>$notice,
));

?>