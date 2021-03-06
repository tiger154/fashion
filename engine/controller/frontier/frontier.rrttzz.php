<?php
/***************************************************************************************
* Module Name			:	프론티어 목록(메인) 
* Created Date			:	2011.09.19
* Created by				:	RevU 박상선 
* Modify History			:   
 ***************************************************************************************/ 

//===============================================================
//GLOBAL CLASS
//===============================================================
GLOBAL $TPL;
GLOBAL $BASE;
GLOBAL $LOGIN;
GLOBAL $DESIGN;

//===============================================================
//GLOBAL VARS
//===============================================================
//GLOBAL $FRAME;

//===============================================================
// EXTEND_CLASS
//===============================================================
$CLASS_PAGE = &Module::singleton("Page");
$CLASS_FRONTIER = &Module::singleton("Frontier.Frontier");
$CLASS_BASE			= &Module::singleton("Base");		


//===============================================================
// DB OBJECT
//===============================================================
$DB = &Module::loadDb("revu");

$flag = Module::$param[0];



if($flag == "ss119"){


	$result		= $CLASS_FRONTIER->func119($DB); //

	if($result == "1"){

		echo "응급조치 쿼리가 성공적으로 실행됐습니다.<br>";exit;
	}else{
		echo "응급조치 쿼리가 실패했습니다.<br>";exit;
	}
}



//$sql = "SELECT * FROM test LIMIT 0, 10";
//$aa = $DB->fetch($sql);

//===============================================================
// VARS
//===============================================================


//===============================================================
//TEMPLATE VARS
//===============================================================
$TPL->setValue(array(
	"logo"=>$logo,	
	"toplist"=>$toplist,
	"mainlist"=>$mainlist,
	"nowmonth"=>$nowmonth,
	"nowday"=>$nowday,
	"frontierCount"=>$frontierCount,
	"cssblank"=>$cssblank,
));
?>