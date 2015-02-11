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
$CLASS_ENCRYPTER = &Module::singleton("Encrypter");
$CLASS_SITE = &Module::singleton("Site.Site");
$CLASS_USER = &Module::singleton("User.User");
$CLASS_CODE = &Module::singleton("Code.Code");
$CLASS_BASE			= &Module::singleton("Base");	
$CLASS_ITEM			= &Module::singleton("Item.Item");	
$CLASS_ITEMOPINION = &Module::singleton("Item.Opinion");
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

/*itemno,regdate,userno*/
$allItemList = $CLASS_ITEM->getAllItemList($DB);
/*Bind userno to the items*/

//print_r($allItemList);

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

for($i=0;$i<sizeof($allItemList);$i++){	

	$userInfo = $CLASS_USER->getUser($DB,$allItemList[$i]['userNo']);
    $allItemList[$i]['userInfo'] = 	$userInfo;

	$userExtraInfo = $CLASS_USER->getUserExtra($DB,$allItemList[$i]['userNo']);	
	$allItemList[$i]['userimage'] = 	$userExtraInfo['userimage'];

	$userStatsInfo = $CLASS_USER->getUserStats($DB,$allItemList[$i]['userNo']);	
	$allItemList[$i]['userStatsInfo'] = 	$userStatsInfo;
	

	$collectionInfo = $CLASS_COLLECTION->getColByColNo($DB,$allItemList[$i]['collectionNo']);	
	$allItemList[$i]['colname'] = 	$collectionInfo['colName'];

	$allItemList[$i]['itemurl'] = "http://"._DOMAIN_FILE."/"._FTP_ITEMIMAGE."/"."list_img"."/".substr($allItemList[$i]['regdate'],0,4)."/".$allItemList[$i]['itemNo'].".gif";	
	
	 $cate1Info= $CLASS_CODE->getClassNameByCate($DB,$allItemList[$i]['cate1']);
	 $allItemList[$i]['cateclass'] = $cate1Info['cate_desc_eng'];

	 $allItemList[$i]['dateYMD'] = $CLASS_BASE->transDate($allItemList[$i]['regdate'],"E");
	 $allItemList[$i]['dateHM'] = $CLASS_BASE->transDate($allItemList[$i]['regdate'],"G");
	 $allItemList[$i]['dateH'] = substr($allItemList[$i]['dateHM'],0,2);
	//echo $allItemList[$i]['regdate']."<br>";

	//Check the current logined user clicked the item or not that is Wish or Have  
	$opinion = $CLASS_ITEMOPINION->getOpinionYnByItemNo($DB,$allItemList[$i]['itemNo']);
	$allItemList[$i]['wishYN']= ($opinion["wCnt"]>0)? "wish disabled" : "wish";
	$allItemList[$i]['haveYN']= ($opinion["hCnt"]>0)? "have disabled" : "have";
			
}	





/**
 * TEMPLATE VARS
 */
$TPL->setValue(array(
	"keyword"=>$keyword,
	"keywordReview"=>$keywordReview, 
	"allItemList"=>$allItemList,
));
?>