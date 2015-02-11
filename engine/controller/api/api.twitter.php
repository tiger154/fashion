<?php
/***************************************************************************************
 * 트위터컨트롤러
 * 
 * 작성일 : 2011.12.02
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
$CLASS_TWITTER = &Module::singleton("API.TwitterAPI");
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
// callback 페이지
if(!empty($_REQUEST['oauth_verifier'])) {
	// 트위터 토큰 얻은 후 정보 저장 
	$connection = $CLASS_TWITTER->getAccessToken($DB);
	//if (200 == $connection->http_code) {
	if ($connection != false) {
		if($CLASS_TWITTER->isResource() == true) {	
			// 인증후 처리페이지 리다이렉트
			$param = "";
			$param .= ($_SESSION['api_twitter_todo'] != "") ? "/".$_SESSION['api_twitter_todo'] : "";
			$param .= ($_SESSION['api_twitter_param'] != "") ? "/".$_SESSION['api_twitter_param'] : ""; 			
			Module::redirect("/api/twitter".$param);
		} else {
			$CLASS_TWITTER->initSession();
			Module::alert("트위터 리소스정보가 없습니다. 다시 시도 하시길 바랍니다.");
			Module::close();
		}
	} else {
		Module::alert("트위터 인증이 실패하였습니다. 다시 시도 하시길 바랍니다.");
		Module::close();
	}
} else {
	// API 리소스 세션
	$_SESSION['api_twitter_todo'] = Module::$param[0];
	$_SESSION['api_twitter_param'] = Module::$param[1];
	
	if($_SESSION['access_token']['user_id'] == "") {
		$connection = $CLASS_TWITTER->getRequestToken();
		switch ($connection->http_code) {
			case 200:
				$url = $connection->getAuthorizeURL($_SESSION['oauth_token']);
				Module::redirect($url);
				break;
			default:
				Module::alert("트위터 접속이 실패하였습니다. 다시 시도 하시길 바랍니다.");
				Module::close();
				break;
		}
	} else {
		if($CLASS_TWITTER->isUser($DB, $_SESSION['access_token']['user_id']) == true) {									
			$connection = $CLASS_TWITTER->getConnection($DB, $_SESSION['access_token']['user_id']);		
			
			switch($_SESSION['api_twitter_todo'])
			{
				case "login" : 
					
					if($_SESSION['api_twitter_param'] == "1") $reload = true;
					
					$content_object = $connection->get('account/verify_credentials');
					$content = get_object_vars($content_object);
											
					if(!empty($content['id'])) {
						
						$type = "T"; // 회원타입
						$userid = $content['id']; // 트위터아이디 
						$name = $content['name']; // 트위터이름
						
						// 회원이 아닐 경우  가입폼
						if($CLASS_USER->isUserID($DB, $userid, $type) == false && 
						$CLASS_USER->isUserSNS($DB, $userid, $type) == false) {
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
							// 회원이미지  $content['profile_image_url_https']
							$_SESSION['userimage'] = $content['profile_image_url']; 
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
							$arr[] = "TI"; // 로그인타입 
							$DB->rConnect();
							$res[] = $DB->call("p_account_login_upd", $arr);							
							// 결과
							$loginArr['login_result'] = "Y";
						} else {
							$loginArr['login_result'] = "N";
						}
						$loginArr['login_type'] = $type."I";					
						// 로그인 로그
						$CLASS_LOGIN->insertLoginLog($DB_LOG, $userInfo, $loginArr);						
						// 트위터 리소스 초기화
						$CLASS_TWITTER->initResource();
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
							Module::close("트위터 연동 로그인이 실패하였습니다.");		
						}
						
					} else {
						//$CLASS_TWITTER->initSession();
						Module::close("트위터 연동로그인이 실패하였습니다. 다시 시도 하시길 바랍니다.");
					}
					break;
				
				case "logout" : 
					$CLASS_TWITTER->initSession();
					Module::close();
					break;
					
				case "auth" :  
					Module::close();
					break;
					
				case "tweet" :
					// 리뷰댓글 레이어노출 
					//$script = "opener.twitter.tweet(".$_SESSION['api_twitter_param'].");";
					//Module::callScript($script);
					//Module::close();
					//print_r($_SESSION);
					$review = $CLASS_REVIEW->getReview($DB, $_SESSION['api_twitter_param']);
					if($review['rno'] == "") {
						Module::close("리뷰가 존재 하지 않습니다.");
					}
					$review['title'] = $BASE->strLimitUTF($review['title'], 70, false, "...");					
					// 회원정보
					$content_object = $connection->get('account/verify_credentials');
					$content = get_object_vars($content_object);
					$userid = $content['id']; // 트위터아이디 
					$name = $content['name']; // 트위터이름
					
					$url = "http://"._DOMAIN."/".$_SESSION['api_twitter_param'];	
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
					break;
				
				case "slogin" :					
					//$script = "window.opener.document.location.reload();";					
					$script = "window.opener.loginFlag['T'] = '1';";
					$script .= "window.opener.socialbar.turnIcon('T', 'on');";
					$script .= "window.opener.socialbar.setIcon();";
					Module::callScript($script);
					Module::close();
					break;

				case "slogout" : 
					$CLASS_TWITTER->initSession();
					$script = "window.opener.loginFlag['T'] = '';";
					$script .= "window.opener.socialbar.turnIcon('T', 'off');";
					$script .= "window.opener.socialbar.setIcon();";					
					//$script = "window.opener.document.location.reload();";
					Module::callScript($script); 
					Module::close();
					break;
					
				default : 
					Module::callScript("alert('aa');"); 
					//$CLASS_TWITTER->initSession();
					//Module::close("트위터 리소스정보가 없습니다. 다시 시도 하시길 바랍니다.");
					Module::close();
					break;
			}
		
		// 허용안된 경우 세션 초기화 후 인증페이지 
		} else {
			$CLASS_TWITTER->initSession();
			Module::redirect("/api/twitter");
		}
	}
}
/**
 * TEMPLATE VARS
 */
$TPL->setValue(array(
	"todo"=>$_SESSION['api_twitter_todo'],
	"review"=>$review,
	"bitlyData"=>$bitlyData,
	"userid"=>$userid,
	"name"=>$name,
));
?>