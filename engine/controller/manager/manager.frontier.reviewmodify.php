<?php
/***************************************************************************************
* Module Name			:	관리자 - 프론티어 관련리뷰 수정
* Created Date			:	2012.01.26
* Created by				:	RevU 박상선 
* Modify History			:   
****************************************************************************************/

//===============================================================
//GLOBAL CLASS
//===============================================================
GLOBAL $TPL;
GLOBAL $BASE;
GLOBAL $LOGIN;

//===============================================================
//GLOBAL VARS
//===============================================================
GLOBAL $FRAME;


$CLASS_PAGE = &Module::singleton("Page");
$CLASS_MANAGER = &Module::singleton("Manager.Manager");

//===============================================================
//CLASS
//===============================================================

//===============================================================
//EXTEND_CLASS
//===============================================================

//===============================================================
//DB OBJECT
//===============================================================
$DB = &Module::loadDb("revu");

//===============================================================
//VARS
//===============================================================
$type		= Module::$param[0];
$reviewno = Module::$param[1];
$frno			= Module::$param[2];
$ofrno			= Module::$param[3];


if($type == "M"){

	$result = $CLASS_MANAGER->FrontierReviewModify($DB, $frno, $ofrno, $reviewno);

	if($result == true) {
		//echo "1";
		Module::alert("해당 리뷰의 프론티어가 수정되었습니다.");
		Module::redirect("/manager/frontier.reviewmodify");

	} else {
		Module::alert("오류-프로그램 관리자 문의요망");
		Module::redirectModule("/manager/frontier.reviewmodify");
	}

}

//===============================================================
//TEMPLATE VARS
//===============================================================
$TPL->setValue(array(

));
?>