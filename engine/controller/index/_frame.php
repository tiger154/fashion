<?php
 /***************************************************************************************
 * 인덱스  프레임 컨트롤러
 * 
 * 작성일 : 2011.10.12
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


/**
 * DB OBJECT
 */
$DB = &Module::loadDb("fassion");

/**
 * VAR / PROC
 */

$TPL->defineTemplate("headerCate", "_global_layer", "headerCate.htm");
/**
 * TEMPLATE VARS
 */
$TPL->setValue(array(
	"conf"=>$conf,
	"notice"=>$notice,
));
?>