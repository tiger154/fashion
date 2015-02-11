<?php
 /***************************************************************************************
 * 리뷰-소셜바컨트롤러
 * 
 * 작성일 : 2011.12.14
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
$CLASS_COOKIE = &Module::singleton("Cookie");
$CLASS_CURL = &Module::singleton("Curl");
$CLASS_CODE = &Module::singleton("Code.Code");
$CLASS_USER = &Module::singleton("User.User");
$CLASS_REVIEW = &Module::singleton("Review.Review");
$CLASS_REVIEWBEST = &Module::singleton("Review.ReviewBest");
$CLASS_REVIEWTALK = &Module::singleton("Review.ReviewTalk");
$CLASS_TWITTER = &Module::singleton("API.TwitterAPI");
$CLASS_FACEBOOK = &Module::singleton("API.FacebookAPI");

/**
 * DB OBJECT
 */
$DB = &Module::loadDb("revu");

/**
 * VAR / PROC
 */
// 모듈명이 리뷰일련번호
$rno = Module::$module;
if($CLASS_REVIEW->isReviewByRno($DB, $rno) != true) {
	Module::redirect("notpage");
} else {	
	$url = "http://"._DOMAIN."/".$rno;	
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
		$shortUrl = $url;
	} else {
		$shortUrl = $bitlyData['url'];
	}
	$review = $CLASS_REVIEW->getReview($DB, $rno);
	$user = $CLASS_USER->getUser($DB, $review['userno']);
		
	$review['cate'] = $CLASS_CODE->transCateArray($review['cate1'],$review['cate2'],$review['cate3'],$review['cate4']);
	$review['catedesc'] = $CLASS_CODE->getCateDesc($DB, $review['cate']);
		
	$wno_now = $CLASS_REVIEWBEST->getBestWeekWno($DB, date("Y-m-d"));
	$review['wno'] = $CLASS_REVIEWBEST->getBestWeekPrev($DB, $wno_now);
	$review['flag_cand'] = $CLASS_REVIEWBEST->isBestCandReview($DB, $review['wno'], $review['rno']);
	if($review['flag_cand'] == true) {
		$cand = $CLASS_REVIEWBEST->getBestCandReview($DB, $review['wno'], $review['rno']);
		$review['best_recom_cnt'] = $cand['recom_cnt'];
	}
	if($review['type'] == "R") {
		$review['url'] = "http://"._DOMAIN."/review/frame/".$review['rno'];
	}
	$review['title'] = $BASE->strLimitUTF(strip_tags($review['title']), 70, false, '...');	
	$review['surl'] = "http://"._DOMAIN."/".$review['rno'];
	
	// 레뷰로그인체크
	$login = array();
	$login['R'] = ($_SESSION['userno'] != "") ? true : false;
	$login['T'] = ($_SESSION['access_token']['user_id'] != "") ? true : false;
	$login['F'] = ($CLASS_FACEBOOK->isLogin() == true) ? true : false;
	
	// 디폴트 선택체크
	if($CLASS_COOKIE->is("cookieSocialIcon") == true) {
		if($login[$CLASS_COOKIE->get("cookieSocialIcon")] == true) {
			$iconType = $CLASS_COOKIE->get("cookieSocialIcon");
		}
	}
	
	// 댓글리스트
	$talk = $CLASS_REVIEWTALK->getTalkList($DB, $review['rno'], $num=15, $flag_del="0", $tno="");
	for($i=0; $i<sizeof($talk); $i++) {
		$talk[$i]['ref'] =  $CLASS_REVIEWTALK->transRef($talk[$i]['type'], $talk[$i]['nickname']);
		$talk[$i]['icon'] =  $CLASS_REVIEWTALK->transIcon($talk[$i]['type']);
	}
	//$tno = $CLASS_REVIEWTALK->getTalkNextTno($DB, $review['rno'], $flag_del="0", $talk[sizeof($talk)-1]['tno']);
	$tno = $talk[sizeof($talk)-1]['tno'];
	
	// 다음토크
	$_tno = $CLASS_REVIEWTALK->getTalkNextTno($DB, $review['rno'], $flag_del="0", $tno);	
	if($_tno == "") $tno = ""; 
	
	// 마지막댓글
	$talklast = $CLASS_REVIEWTALK->getTalkLast($DB, $review['rno']);	
	
	// 조회수 업데이트
	$arr = array();
	$arr[] = $review['rno'];
	$arr[] = $_SESSION['userno'];
	$res[] = $DB->call("p_review_view_cnt_upd", $arr);
	$DB->rConnect();
			
	// 리뷰조회 포인트지급
	if($_SESSION['userno'] != "") {
		$arr = array();
		$arr[] = $_SESSION['userno'];
		$arr[] = "0"; // 지급 
		$arr[] = "306"; // 리뷰조회(306) 
		$arr[] = $review['rno']; // 리뷰번호
		$res[] = $DB->call("p_point_ins", $arr);
		$DB->rConnect();
	}
}

/**
 * TEMPLATE VARS
 */
$TPL->setValue(array(
	"shortUrl"=>$shortUrl,
	"rno"=>$rno,
	"review"=>$review, 
	"talk"=>$talk,
	"talklast"=>$talklast,
	"tno"=>$tno, 
	"user"=>$user,
	"login"=>$login,
	"cate"=>$cate, 
	"catedesc"=>$catedesc, 
	"iconType"=>$iconType, 
	"title"=>$review['title'],
));
?>