<?php
/***************************************************************************************
 * 페이스북 로그인 컨트롤러
 * 
 * 작성일 : 2011.07.22
 * 작성자 : 이종학
 * 히스토리 : 
 ***************************************************************************************/ 

 /**
 * GLOBAL CLASS / VAR
 */
GLOBAL $TPL;
GLOBAL $BASE;
// var
GLOBAL $SITE;
GLOBAL $FRAME;
$FRAME = "popup";
 
/**
 * CLASS
 */
$CLASS_COOKIE = &Module::singleton("Cookie");
$CLASS_ENCRYPTER = &Module::singleton("Encrypter");
$CLASS_CURL = &Module::singleton("Curl");
$CLASS_FACEBOOK = &Module::singleton("API.FacebookAPI");
$CLASS_AUTH = &Module::singleton("Auth.Auth");
$CLASS_LOGIN = &Module::singleton("Auth.Login");
$CLASS_BLOG = &Module::singleton("Blog.Blog");
$CLASS_USER = &Module::singleton("User.User");
$CLASS_CASH = &Module::singleton("User.Cash");
$CLASS_POINT = &Module::singleton("User.Point");
$CLASS_GRADE = &Module::singleton("User.Grade");
$CLASS_FRONTIER = &Module::singleton("Frontier.Frontier");
$CLASS_REVIEW = &Module::singleton("Review.Review");

/**
 * DB OBJECT
 */
$DB = &Module::loadDb("revu");
$DB_LOG = &Module::loadDb("revulog");

/**
 * VAR / PROC
 */
$user = $CLASS_FACEBOOK->facebook->getUser();

// API 세션
$_SESSION['api_facebook_todo'] = Module::$param[0];
$_SESSION['api_facebook_param'] = Module::$param[1];

if($user && $user != "0") {	
	try {
		$profile = $CLASS_FACEBOOK->facebook->api('/me');
		if(!empty($profile) && $CLASS_FACEBOOK->isLogin() == true) {				
			$field = $CLASS_FACEBOOK->getSessionField();
			$arr = array();
			$arr[] = $_SESSION[$field['code']]; // 페이스북코드
			$arr[] = $_SESSION[$field['access_token']]; // 페이스북토큰
			$arr[] = $_SESSION[$field['user_id']]; // 페이스북유저아이디
			$arr[] = $_SESSION[$field['state']]; // 페이스북상태값
			$DB->rConnect();
			$res[] = $DB->call("p_account_facebook_ins", $arr);			
			switch($_SESSION['api_facebook_todo'])
			{
				case "login" : 
					
					if($_SESSION['api_facebook_param'] == "1") $reload = true;
					
					$type = "F"; // 회원타입
					$userid = $profile['id']; // 레뷰아이디
					$name = $profile['name']; // 페이스북이름
					// 회원이 아닐 경우  가입폼	
					if($CLASS_USER->isUserID($DB, $userid, $type) == false && $CLASS_USER->isUserSNS($DB, $userid, $type) == false) {
						$_SESSION['joinType'] = $type;
						$_SESSION['joinSNSKey'] = $CLASS_ENCRYPTER->encryptMD5($_SERVER['REMOTE_ADDR'], "login");
						$script = "window.opener.document.location = '/join/sns' ;";
						Module::callScript($script);
						Module::close();
						Module::exitModule();
					}
					if($CLASS_USER->isUserID($DB, $userid, $type) == true) {
						// 회원정보
						$userInfo = $CLASS_USER->getUserByID($DB, $userid, $type);
						$extraInfo = $CLASS_USER->getUserExtra($DB, $userInfo['userno']);
						$statsInfo = $CLASS_USER->getUserStats($DB, $userInfo['userno']);
						$blogInfo = $CLASS_BLOG->getLoginBlogList($DB, $userInfo['userno'], 2);
						$frontierInfo1 = $CLASS_FRONTIER->getLoginFrontierList($DB, $userInfo['userno'], "A", 2);
						$frontierInfo2 = $CLASS_FRONTIER->getLoginFrontierList($DB, $userInfo['userno'], "B", 2);
						$cashInfo = $CLASS_CASH->getCash($DB, $userInfo['userno']);
						$pointInfo = $CLASS_POINT->getPoint($DB, $userInfo['userno']);
						// 등급, 캐시, 포인트, 리뷰수, 추천, 댓글;
						$userInfo['grade'] = $CLASS_GRADE->getGrade($DB, $userInfo['userno']); 
						$userInfo['cash'] = number_format($cashInfo['cash']);
						$userInfo['point'] = number_format($pointInfo['point']);
						$statsInfo['review_cnt'] = number_format($statsInfo['review_cnt']);
						$statsInfo['recom_cnt'] = number_format($statsInfo['recom_cnt']);
						$statsInfo['talk_cnt'] = number_format($pointInfo['talk_cnt']);
						// 세션		
						$CLASS_LOGIN->setSession($userInfo);
						$CLASS_LOGIN->addSession($extraInfo);
						$CLASS_LOGIN->addSession($statsInfo);
						$CLASS_LOGIN->addSession($blogInfo);
						$CLASS_LOGIN->addSession($frontierInfo1);
						$CLASS_LOGIN->addSession($frontierInfo2);
						// 회원이미지 ?type = square | small | normal | large
						$_SESSION['userimage'] = "https://graph.facebook.com/".$profile['id']."/picture?type=square";
						// 등급업데이트
						$arr = array();
						$arr[] = $userInfo['userno'];
						$arr[] = $userInfo['grade'];
						$DB->rConnect();
						$res[] = $DB->call("p_account_grade_upd", $arr);
						// 로그인포인트지급
						if($CLASS_LOGIN->isLoginPastTime($DB, $userInfo['userno'], $time=24) == true) {
							$arr = array();
							$arr[] = $userInfo['userno'];
							$arr[] = "0"; // 지급 
							$arr[] = "101"; // 유효로그인(101) 
							$arr[] = ""; // 리뷰번호
							$DB->rConnect();
							$res[] = $DB->call("p_point_ins", $arr);
						}
						// 로그인시간업데이트
						$arr = array();
						$arr[] = $userInfo['userno'];
						$arr[] = "FI"; // 로그인타입 
						$DB->rConnect();
						$res[] = $DB->call("p_account_login_upd", $arr);
						// 결과	
						$loginArr['login_result'] = "Y";
						// 페이스북 로그아웃 url
						$_SESSION['logout_url'] = $CLASS_FACEBOOK->facebook->getLogoutUrl();
					} else {
						$loginArr['login_result'] = "N";
					}
					$loginArr['login_type'] = $type."I";
					// 로그인 로그
					$CLASS_LOGIN->insertLoginLog($DB_LOG, $userInfo, $loginArr);					
					if($loginArr['login_result'] == "Y") {
						if($reload == true) {
							$script = "var url = window.opener.document.URL; opener.document.location = url;";
						} else {
							$script = "window.opener.loginFlag['R'] = '1';";
							$script .= "window.opener.socialbar.turnIcon('R', 'on');";
							$script .= "window.opener.socialbar.setIcon();";				
							$script .= "window.opener.common.closeLayer('loginlayer');";
						}	
						Module::callScript($script);
						Module::close();
					} else {
						Module::close("페이스북 연동 로그인이 실패하였습니다.");
					}
					break; 
				case "wall" :
					$review = $CLASS_REVIEW->getReview($DB, $_SESSION['api_facebook_param']);
					if($review['rno'] == "") {
						Module::close("리뷰가 존재 하지 않습니다.");
					}
					$review['title'] = $BASE->strLimitUTF($review['title'], 70, false, "...");
					
					$logoutUrl = $CLASS_FACEBOOK->facebook->getLogoutUrl();	
					
					// 회원정보
					$userid = $profile['id']; // 레뷰아이디
					$name = $profile['name']; // 페이스북이름
					
					$url = "http://"._DOMAIN."/".$_SESSION['api_facebook_param'];	
					$CLASS_CURL->init(BITLY_SHORTEN_URL, "POST");
					$CLASS_CURL->setAutoReferer();
					$CLASS_CURL->addPostParameter(new CurlPostParameter('login', BITLY_ID));
					$CLASS_CURL->addPostParameter(new CurlPostParameter('apiKey', BITLY_APIKEY));
					$CLASS_CURL->addPostParameter(new CurlPostParameter('longUrl', $url));
					$CLASS_CURL->addPostParameter(new CurlPostParameter('format', 'json'));
					$result = $CLASS_CURL->execute();
					$CLASS_CURL->close();
					$bitly = get_object_vars(json_decode($result->ResposeBody));
					$bitlyData = get_object_vars($bitly['data']);			
					if($bitly['status_code'] != 200) {
						Module::close("짧은URL 연동이 실패하였습니다. 다시 시도하세요.");
					}
					/*
					try {
						$CLASS_FACEBOOK->facebook->api("/".$user."/feed?access_token=".$_SESSION[$field['access_token']], "POST", 
						array("access_token"=>$_SESSION[$field['access_token']], "message" => "안녕하세요!!!"));	
					} catch (FacebookApiException $e) {
						Module::close("페이스북 연동이 실패하였습니다.");
					} 
					*/
					break; 
				case "logout" : 
					$CLASS_FACEBOOK->initSession();
					Module::close();
					break;
					
				case "slogin" :				
					//$script = "window.opener.document.location.reload();";
					$script = "window.opener.loginFlag['F'] = '1';";
					$script .= "window.opener.socialbar.turnIcon('F', 'on');";
					$script .= "window.opener.socialbar.setIcon();";
					Module::callScript($script);
					Module::close();
					break;

				case "slogout" : 
					$CLASS_TWITTER->initSession();
					//$script = "window.opener.document.location.reload();";
					$script = "window.opener.loginFlag['F'] = '';";
					$script .= "window.opener.socialbar.turnIcon('F', 'off');";
					$script .= "window.opener.socialbar.setIcon();";		
					Module::callScript($script); 
					Module::close();
					break;
				
				default : 
					break;
			}
		} else {
			Module::redirect($CLASS_FACEBOOK->loginURL);
		}		
	} catch (FacebookApiException $e) {
		Module::close("페이스북 회원정보가 없습니다.");
		//error_log($e);
		//$user = null;
	}
} else {
	//echo "없음";
	Module::redirect($CLASS_FACEBOOK->loginURL);
}

/**
 * TEMPLATE VARS
 */
$TPL->setValue(array(
	"todo"=>$_SESSION['api_facebook_todo'],
	"review"=>$review,
	"bitlyData"=>$bitlyData,
	"userid"=>$userid,
	"name"=>$name,
	"logoutUrl"=>$logoutUrl, 
));
?>
