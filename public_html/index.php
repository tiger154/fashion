<?php

//phpinfo();
/**
 * 버퍼저장
 */
//ob_start("ob_gzhandler");


/**
 * 시스템 파일 
 * System Config File
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
 * Start estamate process time
 */
$__sTime = Module::getMicroTime();

/**
 * 기본클래스
 * Base Class init
 */
$TPL = &Module::singleton("Template");
$BASE = &Module::singleton("Base");
//$SESSION = &Module::singleton("Session"); DB세션사용

/**
 * 사이트설정정보
 * Set Site Info
 */
$SITE = Module::loadConf(_INI_SITE);
$TPL->setValue(array("SITE"=>$SITE));

/**
 * 템플릿경로
 * Set Template location
 */
$TPL->setValue(array("DOMAIN"=>"http://"._DOMAIN));
$TPL->setValue(array("DOMAIN_FILE"=>"http://"._DOMAIN_FILE));
$TPL->setValue(array("IMAGES"=>"http://"._DOMAIN."/images"));
$TPL->setValue(array("EXTENDS"=>"http://"._DOMAIN."/extends"));
$TPL->setValue(array("JS"=>"http://"._DOMAIN."/js"));
$TPL->setValue(array("CSS"=>"http://"._DOMAIN."/css"));
 
/**
 * 세션설정
 * Set Session 
 */
ini_set("session.cookie_domain", _DOMAIN);
session_cache_limiter('nocache, must-revalidate');
session_set_cookie_params(0, "/", _DOMAIN);
session_start();
$TPL->setValue($_SESSION);	 // 세션변수설정
/**
 * 모듈로드
 * 
 *  1. JMVC Framework 
 *  - summary : To make easy and faste some website we can use EasyMVC Framework 
 *              it has MVC pattern and include Template engine(http://~~)
 *				 
 * 
 *  First of all an action is a page and a controller , so unfortunally we can't use 상속... now, 
 *  in controller we can do like general MVC framework do . it means u can code and define a view 
 *  also as you know model is same like u know.
 *  
 *  2. RouteRule  
 *   - firstly we use strict Route rules which we encourage you to follow . However there are opportunities for adaption.
 *   - every request to server route to index.php first by .htaccess
 *  
 *   1) example 
 *     - below see you can understand more easy also you can change all this location in /engine/_sys/sys.config
 *     URI			: /SomeModule/SomeAction
 *     Controller	: /Controller/SomeModule/SomeModule.SomeAction.php
 *     View			: /view/SomeModule/SomeModule.SomeAction.htm 
 * 
 *   2) Parameter 
 *    -> after second item will be parameters so you can add parameter all you want  
 * 
 *  3. TemplateEngine 
 *    - By TemlpateEngine we can use like VIEW 
 *  
 */
Module::routeModule(); // Route and load module , it parse every request as module for example if u request /SomeModule/SomeAction it load SomeModule as a Module
$TPL->setValue(array("MODULE"=>Module::$module));
$TPL->setValue(array("TODO"=>Module::$todo));
$TPL->setValue(array("REQUEST_URI"=>$_SERVER["REQUEST_URI"]));

/**
 * 시작페이지(모듈명변경) / 파킹페이지 설정
 *  Set ParkigPage
 *  Set StartPage
 */
Module::parking(Module::$module);
Module::startPage(Module::$module);

/**
 * 디자인프레임설정
 *  - routeModule function set a frame that is global var and used as Template Frame 
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
 * Assign All value
 */
$TPL->assignValue();

/**
 * 디자인프레임에 따른 페이지 출력
 * Print Template 
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
 * estimate process time
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