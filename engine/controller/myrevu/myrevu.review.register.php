<?php
/***************************************************************************************
 * 마이레뷰-리뷰등록 컨트롤러
 * 
 * 작성일 : 2011.07.29
 * 작성자 : 이종학
 * 히스토리 :  
 * 
 ***************************************************************************************/ 

/**
 * GLOBAL CLASS / VAR
 */
GLOBAL $TPL;
GLOBAL $BASE;
// var
GLOBAL $SITE;
GLOBAL $FRAME;
 
/**
 * CLASS
 */
$CLASS_BLOG = &Module::singleton("Blog.Blog");

/**
 * DB OBJECT
 */
$DB = &Module::loadDb("revu");

/**
 * VAR / PROC
 */
$bloglist = $CLASS_BLOG->getBlogList($DB, $_SESSION['userno']);
$formArr = array("blog", "url", "revu");
$type = (in_array(Module::$param[0], $formArr) == false) ? "blog" : Module::$param[0];
		
/**
 * TEMPLATE VARS
 */
$TPL->defineTemplate("reviewlayer", "_global_layer", "review.htm");
$TPL->defineTemplate("editor", "_global", "editor.htm");
$TPL->setValue(array(
	"bloglist"=>$bloglist,
	"type"=>$type,
));
?>