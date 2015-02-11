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

/*

*/

/*Bind Layer*/
$TPL->defineTemplate("getItemByUrl", "_global_layer", "getItemByUrl.htm");
$TPL->defineTemplate("parsedImgList", "_global_layer", "parsedImgList.htm");
$TPL->defineTemplate("makeSitePop", "_global_layer", "makeSitePop.htm");

/**
 * TEMPLATE VARS
 */
$TPL->setValue(array(
	"keyword"=>$keyword,
	"keywordReview"=>$keywordReview, 
));
?>