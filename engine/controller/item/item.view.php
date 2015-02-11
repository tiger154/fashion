<?php
 /***************************************************************************************
 * 인덱스 컨트롤러
 * 
 * 작성일 : 2011.07.04
 * 작성자 : 이종학
 * 히스토리 :
 ***************************************************************************************/ 

/**
 * GLOBAL CLASS / VAR
 */
GLOBAL $TPL;
GLOBAL $BASE;
// var
//GLOBAL $SITE;
//GLOBAL $FRAME;

/**
 * CLASS
 */

$CLASS_SITE = &Module::singleton("Site.Site");
$CLASS_USER = &Module::singleton("User.User");
$CLASS_CODE = &Module::singleton("Code.Code");
$CLASS_BASE			= &Module::singleton("Base");	
$CLASS_ITEM			= &Module::singleton("Item.Item");	
$CLASS_ITEMOPINION = &Module::singleton("Item.Opinion");
$CLASS_ITEMTALK = &Module::singleton("Item.Talk");
$CLASS_COLLECTION			= &Module::singleton("Collection.Collection");	


/**
 * DB OBJECT
 */
$DB = &Module::loadDb("fassion");

/**
 * VAR / PROC
 */
$today = date("YmdHis");		
$day_nowmonth	 = date("m");
$day_nowday		 = date("d");

//echo Module::$param[0];
/*
 1) getItemView
  - title,regdate,colname,url,wishcnt,
 2) getItemListByCol
  - 
 3) getItemListByUrl
 4) getWishByItem
 5) getHaveByItem
 6) getTalkByItem
 7) setCntView

*/
$itemInfo = $CLASS_ITEM->getItemByItemNo($DB,Module::$param[0]);
#########################################################
#########################################################
$dir1 = _FTP_ITEMIMAGE."/"."original_img/";			
$dir2 = _FTP_ITEMIMAGE."/"."list_img/";			
$dir3 = _FTP_ITEMIMAGE."/"."view_img/";		
$dir4 = _FTP_ITEMIMAGE."/"."view_col_cover_img/";				
$dir5 = _FTP_ITEMIMAGE."/"."view_simg/";				
$dir6 = _FTP_ITEMIMAGE."/"."view_catefamous_cover_img/";			
#########################################################
#########################################################

$userInfo = $CLASS_USER->getUser($DB,$itemInfo['userNo']);
$itemInfo['userInfo'] = 	$userInfo;

$userExtraInfo = $CLASS_USER->getUserExtra($DB,$itemInfo['userNo']);	
$itemInfo['userimage'] = 	$userExtraInfo['userimage'];

$userStatsInfo = $CLASS_USER->getUserStats($DB,$itemInfo['userNo']);	
$itemInfo['userStatsInfo'] = 	$userStatsInfo;


$collectionInfo = $CLASS_COLLECTION->getColByColNo($DB,$itemInfo['collectionNo']);	
$itemInfo['colname'] = 	$collectionInfo['colName'];

$itemInfo['itemurl'] = "http://"._DOMAIN_FILE."/"._FTP_ITEMIMAGE."/"."view_img"."/".substr($itemInfo['regdate'],0,4)."/".$itemInfo['itemNo'].".gif";	

 $cate1Info= $CLASS_CODE->getClassNameByCate($DB,$itemInfo['cate1']);
 $itemInfo['cateclass'] = $cate1Info['cate_desc_eng'];

 $itemInfo['dateYMD'] = $CLASS_BASE->transDate($itemInfo['regdate'],"E");
 $itemInfo['dateHM'] = $CLASS_BASE->transDate($itemInfo['regdate'],"G");
 $itemInfo['dateH'] = substr($itemInfo['dateHM'],0,2);
//echo $itemInfo['regdate']."<br>";

//Check which is clicked or not that is Wish or Have or Talk

$opinion = $CLASS_ITEMOPINION->getOpinionYnByItemNo($DB,$itemInfo['itemNo']);
$itemInfo['wishYN']= ($opinion["wCnt"]>0)? "wish disabled" : "wish";
$itemInfo['haveYN']= ($opinion["hCnt"]>0)? "have disabled" : "have";

//Get user nickname haved
$opinion_have_nick = $CLASS_ITEMOPINION->getOpinionNickHavedByItemNo($DB,$itemInfo['itemNo']);
$itemInfo['have_nick'] = $opinion_have_nick["nick"];

//Get user nickname wished
$opinion_wish_nick = $CLASS_ITEMOPINION->getOpinionNickWishedByItemNo($DB,$itemInfo['itemNo']);
$itemInfo['wish_nick'] = $opinion_wish_nick["nick"];

//Get talk
$talk = $CLASS_ITEMTALK->getTalkByItemNo($DB,$itemInfo['itemNo']);
$itemInfo['talk'] = $talk;
for($i=0;$i<sizeof($talk);$i++){
	if($talk[$i]['atype']=="h"){
		$itemInfo['talk'][$i]['dec'] = "have";
	}else if($talk[$i]['atype']=="w"){
		$itemInfo['talk'][$i]['dec'] = "wish";
	}else if($talk[$i]['atype']=="t"){
		$itemInfo['talk'][$i]['dec'] = "talk";
	}	
}

/*Bind Layer*/

/**
 * TEMPLATE VARS
 */
$TPL->setValue(array(
	"keyword"=>$keyword,
	"keywordReview"=>$keywordReview, 
	"itemInfo"=>$itemInfo,
));
?>