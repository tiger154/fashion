<?php

//phpinfo();
/**
 * 버퍼저장
 */
//ob_start("ob_gzhandler");


/**
 * 시스템 파일 
 */
$_DOC_ROOT = substr($_SERVER['DOCUMENT_ROOT'], 0, strrpos($_SERVER['DOCUMENT_ROOT'], "/"));
require_once $_DOC_ROOT."/engine/_sys/sys.conf.php";
require_once _DIR_ENGINE."/_sys/sys.module.php";
require_once _DIR_ENGINE."/_extends/php.Template_/Template_.class.php";

/**
 * PHP 에러리포트 / 에러핸들러 설정
 * 
 * sys.conf.php 참조
 */
error_reporting(_ERROR_REPORTING);
//if(_ERROR_HANDLER == true) set_error_handler(_ERROR_HANDLER_FUNCTION);

/**
 * 처리시간측정-시작
 */
$__sTime = Module::getMicroTime();

/**
 * 기본클래스
 */
$TPL = &Module::singleton("Template");
$BASE = &Module::singleton("Base");
//$SESSION = &Module::singleton("Session"); DB세션사용

/**
 * 사이트설정정보
 */
$SITE = Module::loadConf(_INI_SITE);
$TPL->setValue(array("SITE"=>$SITE));

/**
 * 템플릿경로
 */
$TPL->setValue(array("DOMAIN"=>"http://"._DOMAIN));
$TPL->setValue(array("DOMAIN_FILE"=>"http://"._DOMAIN_FILE));
$TPL->setValue(array("IMAGES"=>"http://"._DOMAIN."/images"));
$TPL->setValue(array("EXTENDS"=>"http://"._DOMAIN."/extends"));
$TPL->setValue(array("JS"=>"http://"._DOMAIN."/js"));
$TPL->setValue(array("CSS"=>"http://"._DOMAIN."/css"));
 
/**
 * 세션설정
 */
ini_set("session.cookie_domain", _DOMAIN);
session_cache_limiter('nocache, must-revalidate');
session_set_cookie_params(0, "/", _DOMAIN);
session_start();
$TPL->setValue($_SESSION);	 // 세션변수설정
/**
 * 모듈로드 
 */
Module::routeModule(); // 권한체크포함
$TPL->setValue(array("MODULE"=>Module::$module));
$TPL->setValue(array("TODO"=>Module::$todo));
$TPL->setValue(array("REQUEST_URI"=>$_SERVER["REQUEST_URI"]));

/**
 * 시작페이지(모듈명변경) / 파킹페이지 설정
 */
Module::parking(Module::$module);
Module::startPage(Module::$module);

/**
 * 디자인프레임설정
 */
switch($FRAME) {
	case "none" :
	case "ajax" : // AJAX처리
		break;	
	
	case "parking" : // 파킹
		$TPL->defineTemplate("frame", "_global", "_parking.htm");
		break;
	
	case "notpage" : // 페이지/모듈없음
		$TPL->defineTemplate("frame", "_global", "_notpage.htm");
		break;
	
	case "popup" : // 팝업창
		$TPL->defineTemplate("frame", "_global", "_popup.htm");
		$TPL->defineTemplate("contents", Module::$module, Module::$module.".".Module::$todo.".htm");
		$TPL->defineTemplate("etcscript", "_global", "_etcscript.htm");
		// 리사이즈체크
		foreach(Module::$param as $key => $val) {
			if($val == "resize") $resize = true;
			$TPL->setValue(array("RESIZE"=>$resize));
		}
		break;
	
	case "view" : // 뷰
		if(Module::$todo != "") {
			$TPL->defineTemplate("frame", Module::$module, Module::$module.".".Module::$todo.".htm");
		} else {
			$TPL->defineTemplate("frame", Module::$module, "index.htm");			
		}
		break;	
	
	case "socialbar" : // 소셜바 
		$TPL->defineTemplate("frame", "_global", "_socialbar.htm");
		$TPL->defineTemplate("socialbar", "socialbar", "index.htm");
		$TPL->defineTemplate("etcscript", "_global", "_etcscript.htm");
		$TPL->defineTemplate("loginlayer", "_global_layer", "slogin.htm");
		break;

	case "login" : // 소셜바 
		// 인덱스 및 일반페이지 (TPL_ID, SRC, FILENAME)
		$TPL->defineTemplate("frame", "_global", "_frame_login.htm"); // 패션 SNS 완료
		//$TPL->defineTemplate("sidebar", "_global", "sidebar.htm");		
		$TPL->defineTemplate("container", "_global", "container.htm");
		//$TPL->defineTemplate("footer", "_global", "footer.htm");
		$TPL->defineTemplate("etcscript", "_global", "_etcscript.htm");
		$TPL->defineTemplate("mframe", Module::$module, "_frame.htm");		
		$TPL->defineTemplate("loginlayer", "_global_layer", "login.htm");
		if(Module::$todo != "") {
			$TPL->defineTemplate("contents", Module::$module, Module::$module.".".Module::$todo.".htm");
		} else {
			
			$TPL->defineTemplate("contents", Module::$module, "index.htm");			
		}
		break;

	case "manager" : // 페이지
		// 인덱스 및 일반페이지 (TPL_ID, SRC, FILENAME)
		$TPL->defineTemplate("frame", "_global_manager", "_frame.htm");
		$TPL->defineTemplate("top", "_global_manager", "top.htm");
		$TPL->defineTemplate("container", "_global_manager", "container.htm");
		$TPL->defineTemplate("footer", "_global_manager", "footer.htm");
		$TPL->defineTemplate("etcscript", "_global_manager", "_etcscript.htm");
		$TPL->defineTemplate("mframe", Module::$module, "_frame.htm");
		if(Module::$todo != "") {
			$TPL->defineTemplate("contents", Module::$module, Module::$module.".".Module::$todo.".htm");
		} else {
			$TPL->defineTemplate("contents", Module::$module, "index.htm");			
		}
		break;
	
	case "frame" : 
	default :
		// 인덱스 및 일반페이지 (TPL_ID, SRC, FILENAME)
		$TPL->defineTemplate("frame", "_global", "_frame.htm"); // 패션 SNS 완료
		$TPL->defineTemplate("top", "_global", "top.htm"); // 패션 SNS 완료 		
		//$TPL->defineTemplate("sidebar", "_global", "sidebar.htm");		
		$TPL->defineTemplate("container", "_global", "container.htm");
		//$TPL->defineTemplate("footer", "_global", "footer.htm");
		$TPL->defineTemplate("etcscript", "_global", "_etcscript.htm");
		$TPL->defineTemplate("mframe", Module::$module, "_frame.htm");		
		$TPL->defineTemplate("loginlayer", "_global_layer", "login.htm");
		
		
		if(Module::$todo != "") {
			$TPL->defineTemplate("contents", Module::$module, Module::$module.".".Module::$todo.".htm");
		} else {
			
			$TPL->defineTemplate("contents", Module::$module, "index.htm");			
		}
		break;
}

/**
 * 템플릿최종변수셋팅
 */
$TPL->assignValue();

/**
 * 디자인프레임에 따른 페이지 출력
 */
switch($FRAME) {
	case "none" : // 템플릿출력안함
	case "ajax" : // AJAX처리
		break;
	case "popup" : // 팝업창	
	case "view" : // 뷰프레임	
	case "socialbar" : // 소셜바
	case "frame" :
	default :
		$TPL->print_("frame");
		break;
}

/**
 * 처리시간측정-종료
 */
$__eTime = Module::getMicroTime();
Module::runTimeMsg($__sTime, $__eTime);
Module::debugMsg();

/**
 * 버퍼내용출력
 */
//ob_end_flush();

/**
 * 종료
 */
Module::exitModule();
?>