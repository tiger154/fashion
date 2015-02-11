<?php
header('Content-Type: text/html; charset=utf-8');
/***************************************************************************************
 * 공용처리 컨트롤러
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
GLOBAL $SITE;
GLOBAL $FRAME;
 
/**
 * CLASS
 */
 $CLASS_THUMBNAIL = &Module::singleton("Thumbnail"); 
$CLASS_COOKIE = &Module::singleton("Cookie");
$CLASS_ZIPCODE = &Module::singleton("Zipcode");
$CLASS_FTP = &Module::singleton("Ftp");
$CLASS_FILE = &Module::singleton("File");
$CLASS_USER = &Module::singleton("User.User");
$CLASS_CASH = &Module::singleton("User.Cash");
$CLASS_FRIEND = &Module::singleton("User.Friend");
$CLASS_BLOG = &Module::singleton("Blog.Blog");
$CLASS_REVIEW = &Module::singleton("Review.Review");
$CLASS_REVIEWBEST = &Module::singleton("Review.ReviewBest");
$CLASS_REVIEWTALK = &Module::singleton("Review.ReviewTalk");
$CLASS_CODE = &Module::singleton("Code.Code");
$CLASS_COLLECTION = &Module::singleton("Collection.Collection");
$CLASS_FRONTIER = &Module::singleton("Frontier.Frontier");
$CLASS_CRAWLL = &Module::singleton("Crawll"); // Fassion Crawll
Module::includeExtends("simple_html_dom", "simple_html_dom");	
/**
 * DB OBJECT
 */
$DB = &Module::loadDb("revu");

/**
 * VAR / PROC
 */
$jsonArr = array();

/**
 * TODO
 */
switch(Module::$todo)
{
	case "download" :
		$FRAME = "popup";
		$CLASS_FILE->download($_POST['filename1'], $_POST['$filename2'], $_POST['$dir']);
		break;
	
	/**
	 * 파일다운로드-테스트
	 */
	case "download.test" :
		$filename1 = "http://"._DOMAIN_FILE."/frontier/rel_file/2011/73.pdf";
		$filename2 = "http://"._DOMAIN_FILE."/frontier/rel_file/2011/73.pdf";
		//$dir = "";
		$CLASS_FILE->download($filename1, $filename2, $dir);
		break;


	/**
	 * 1~4차 지역정보 리스트
	 */	
	case "search.area.set" :		
		$FRAME = "ajax";
		// 지역정보가 없을경우	
		if($_POST['area'] == "") {
			$jsonArr['aaaa'] = "faiaaal";
			$jsonArr['result'] = "success";
			$jsonArr['area'] = array();
			$jsonArr['bcode'] = $_POST['bcode'];
			$jsonArr['mcode'] = $_POST['mcode'];
			$jsonArr['scode'] = $_POST['scode'];
			$jsonArr['bcode_list'] = $CLASS_CODE->getBcodeList($DB);
		} else {
			$area = $CLASS_CODE->transArea($_POST['area']);
			if($CLASS_CODE->isArea($DB, $area) == true) {
				$jsonArr['result'] = "success";
				$jsonArr['area'] = $area;
				$jsonArr['bcode'] = $_POST['bcode'];
				$jsonArr['mcode'] = $_POST['mcode'];
				$jsonArr['scode'] = $_POST['scode'];
				$jsonArr['bcode_list'] = $CLASS_CODE->getBcodeList($DB);
				if($area[0] != "") $jsonArr['mcode_list'] = $CLASS_CODE->getMcodeList($DB, $area[0]);
				if($area[1] != "") $jsonArr['scode_list'] = $CLASS_CODE->getScodeList($DB, $area[0], $area[1]);			
			} else {
				$jsonArr['result'] = "fail";
			}	
		}
		break;
		
	/**
	 * 구군코드 리스트
	 */	
	case "search.mcode" :
		$FRAME = "ajax";		
		$mcode_list = $CLASS_ZIPCODE->getMcodeList($DB, $_POST['bcode']);
		if(is_array($mcode_list) && sizeof($mcode_list) > 0) {
			$jsonArr['result'] = "success";
			$jsonArr['mid'] = $_POST['mid'];
			$jsonArr['sid'] = $_POST['sid'];
			$jsonArr['mcode_list'] = $mcode_list;			
		} else {
			$jsonArr['result'] = "fail";
			$jsonArr['mid'] = $_POST['mid'];
			$jsonArr['sid'] = $_POST['sid'];
		}
		break;
	
	/**
	 * 읍면동코드 리스트
	 */	
	case "search.scode" :
		$FRAME = "ajax";
		$scode_list = $CLASS_ZIPCODE->getScodeList($DB, $_POST['bcode'], $_POST['mcode']);
		if(is_array($scode_list) && sizeof($scode_list) > 0) {
			$jsonArr['result'] = "success";
			$jsonArr['sid'] = $_POST['sid'];
			$jsonArr['scode_list'] = $scode_list;
		} else {
			$jsonArr['result'] = "fail";
			$jsonArr['sid'] = $_POST['sid'];
		}
		break;
	
	/**
	 * 주소검색
	 */	
	case "search.zipcode" :
		$FRAME = "ajax";
		$list = $CLASS_ZIPCODE->getZipcode($DB, $_POST['type'], $_POST['keyword']);
		if(is_array($list) && sizeof($list) > 0) {
			$jsonArr['result'] = "success";
			$jsonArr['list'] = $list;
			$jsonArr['length'] = sizeof($list);
			$jsonArr['zipcode'] = $_POST['zipcode'];
			$jsonArr['addr1'] = $_POST['addr1'];
		} else {
			$jsonArr['result'] = "fail";
		}
		break;

	 /**
	 * FASSION : 1~2차 아이템 등록 카테고리 초기 셋팅
	 */
     case "get.category.init" :
		 $FRAME = "ajax";
		 $colNo = $_POST['colNo'];		
	    if($CLASS_CODE->isCol__($DB, $colNo) == true ||  $colNo != ""){			
			$jsonArr['result'] = "success";
			if($CLASS_CODE->isNewCol__($DB, $colNo)){ // 신규 컬렉션이라면
				 $jsonArr['cate_init_list'] = $CLASS_CODE->getCategoryInit($DB,$colNo,0);
			}else{
				 $jsonArr['cate_init_list'] = $CLASS_CODE->getCategoryInit($DB,$colNo,1);
			}
   		   
//			print_r($jsonArr);
		}else{			
			$jsonArr['result'] = "fail";
		}
	 break;
	 /**
	 * FASSION : 2차 아이템 등록 카테고리 세팅
	 */
     case "get.category2" :
		 $FRAME = "ajax";
		$colNo = $_POST['colNo'];		
		$cate_1 = $_POST['cate_1'];
	    if($CLASS_CODE->isCol__($DB, $colNo) == true ||  $colNo != ""){			
			$jsonArr['result'] = "success";
			if($CLASS_CODE->isNewCol__($DB, $colNo)){ // 신규 컬렉션이라면
				$jsonArr['cate2_list'] = $CLASS_CODE->getCategory2($DB,$colNo,$cate_1,0);
			}else{
				$jsonArr['cate2_list'] = $CLASS_CODE->getCategory2($DB,$colNo,$cate_1,1);
			}			
//			print_r($jsonArr);
		}else{			
			$jsonArr['result'] = "fail";
		}
	 break;

	 /**
	 * FASSION : 유저 컬렉션 리스트 가져오기
	 */
     case "get.list.collection" :
		
		$FRAME = "ajax";		
		$userno = $_SESSION['userno'];
		if($userno=='' || is_null($userno)){		
			$jsonArr['result'] = "fail";
			Module::alert("Error occured[need to get userno]");
			break;
		}else{			
			 if($CLASS_USER->isUser($DB, $userno) == true){						
				$jsonArr['result'] = "success";
				$jsonArr['col_list'] = $CLASS_COLLECTION->getListByuserno($DB,$userno);
				//print_r($jsonArr);
			}else{					
				$jsonArr['result'] = "fail";
				//userno needed
			}
		}
	   
	 break;

	 /**
	 * FASSION : 유저 컬렉션 추가하기 POP[카테고리분류 NULL]
	 */
     case "set.one.collection" :		
		$FRAME = "ajax";		
		$userno = $_SESSION['userno'];

		if($CLASS_USER->isUser($DB,$userno) && $_POST['colDesc'] != ""){
			$arr = array();
			$arr[] = $userno;
			$arr[] = $BASE->replaceNull($_POST['colName']);
			$arr[] = $BASE->replaceNull($_POST['colDesc']);
			$arr[] = "00"; //type its init num$_SESSION['cate1'];
			$arr[] = $BASE->replaceNull($_POST['cate1_2']);
			$arr[] = $BASE->replaceNull($_POST['cate2']);
			$arr[] = $BASE->replaceNull($_POST['cate2_2']);
			$arr[] = $BASE->replaceNull($_POST['cate3']);
			$arr[] = $BASE->replaceNull($_POST['cate3_2']);
			$arr[] = $BASE->replaceNull($_POST['cate4']);
			$arr[] = $BASE->replaceNull($_POST['cate4_2']);
			$arr[] = $BASE->replaceNull($_POST['cate5']);
			$arr[] = $BASE->replaceNull($_POST['cate5_2']);		
			$res = array();
			$res[] = $DB->call("p_collection_ins", $arr);		
			if($res[0]['orcode'] == '1') {
				$jsonArr['result'] = "success";
				$jsonArr['addedColNo'] = $res[0]['ocolno'];
				$jsonArr['addedColName'] = $_POST['colName'];
			} else {
				$jsonArr['result'] = "fail";
			}
		}else{
			$jsonArr['result'] = "fail";
		}
	 break;

	/**
	 * 1~4차 분류 리스트
	 */	
	case "search.cate.set" :
		$FRAME = "ajax";
		$cate = $CLASS_CODE->transCate($_POST['cate']);
		if($CLASS_CODE->isCate($DB, $cate) == true || sizeof($cate) == 0) {
			$jsonArr['result'] = "success";
			$jsonArr['cate'] = $cate;
			$jsonArr['cate1'] = $_POST['cate1'];
			$jsonArr['cate2'] = $_POST['cate2'];
			$jsonArr['cate3'] = $_POST['cate3'];
			$jsonArr['cate4'] = $_POST['cate4'];
			$jsonArr['cate1_list'] = $CLASS_CODE->getCate1List($DB);
			if($cate[0] != "") $jsonArr['cate2_list'] = $CLASS_CODE->getCate2List($DB, $cate[0]);
			if($cate[1] != "") $jsonArr['cate3_list'] = $CLASS_CODE->getCate3List($DB, $cate[0], $cate[1]);
			if($cate[2] != "") $jsonArr['cate4_list'] = $CLASS_CODE->getCate4List($DB, $cate[0], $cate[1], $cate[2]);			
		} else {
			$jsonArr['result'] = "fail";
		}
		break;
	
	/**
	 * 2차 분류 리스트
	 */	
	case "search.cate2" :
		$FRAME = "ajax";
		$cate2_list = $CLASS_CODE->getCate2List($DB, $_POST['cate1']);
		if(is_array($cate2_list) && sizeof($cate2_list) > 0) {
			$jsonArr['result'] = "success";
			$jsonArr['cate2'] = $_POST['cate2'];
			$jsonArr['cate3'] = $_POST['cate3'];
			$jsonArr['cate4'] = $_POST['cate4'];
			$jsonArr['cate2_list'] = $cate2_list;
		} else {
			$jsonArr['result'] = "fail";
			$jsonArr['cate2'] = $_POST['cate2'];
			$jsonArr['cate3'] = $_POST['cate3'];
			$jsonArr['cate4'] = $_POST['cate4'];

		}
		break;

	/**
	 * 3차 분류 리스트
	 */	
	case "search.cate3" :
		$FRAME = "ajax";
		$cate3_list = $CLASS_CODE->getCate3List($DB, $_POST['cate1'], $_POST['cate2']);
		if(is_array($cate3_list) && sizeof($cate3_list) > 0) {
			$jsonArr['result'] = "success";
			$jsonArr['cate3'] = $_POST['cate3'];
			$jsonArr['cate4'] = $_POST['cate4'];
			$jsonArr['cate3_list'] = $cate3_list;
		} else {
			$jsonArr['result'] = "fail";
			$jsonArr['cate3'] = $_POST['cate3'];
			$jsonArr['cate4'] = $_POST['cate4'];

		}
		break;
	
	/**
	 * 4차 분류 리스트
	 */	
	case "search.cate4" :
		$FRAME = "ajax";
		$cate4_list = $CLASS_CODE->getCate4List($DB, $_POST['cate1'], $_POST['cate2'], $_POST['cate3']);
		if(is_array($cate4_list) && sizeof($cate4_list) > 0) {
			$jsonArr['result'] = "success";
			$jsonArr['cate4'] = $_POST['cate4'];
			$jsonArr['cate4_list'] = $cate4_list;
		} else {
			$jsonArr['result'] = "fail";
			$jsonArr['cate4'] = $_POST['cate4'];

		}
		break;	
	
	/*
	 * 회원정보 컨텍스트메뉴
	 */ 
	case "context.user" :
		$FRAME = "ajax";			
		$user = $CLASS_USER->getUser($DB, $_POST['userno']);
		$extra = $CLASS_USER->getUserExtra($DB, $_POST['userno']);
		//$bloglist = $CLASS_BLOG->getBlogList($DB, $_POST['userno']);
		if(is_array($user) && $user['userno'] != "" && is_array($extra) && $extra['userno'] != "") {
			$jsonArr['result'] = "success";			
			$jsonArr['nickname'] = $user['nickname'];
			$jsonArr['userno'] = $user['userno'];
			$jsonArr['userimage'] = $CLASS_USER->getImage($user['userno'], $extra['userimage']);
			if($_SESSION['userno'] != "" && $_SESSION['userno'] != $_POST['userno']) {
				$jsonArr['type'] = $CLASS_FRIEND->getFriendType($DB, $_SESSION['userno'], $_POST['userno']);
				$jsonArr['grouplist'] = $CLASS_FRIEND->getFriendGroupList($DB, $_SESSION['userno']);
				//$jsonArr['login'] = ($_SESSION['userno'] == "") ? "N" : "Y";
				$jsonArr['flag_friend'] = "1";
			} else {
				$jsonArr['flag_friend'] = "0";
			}			
		} else {
			$jsonArr['result'] = "fail";
		}
		break;
	
	/**
	 * 컨텍스트 친구추가
	 */
	case "context.friend.add.proc" :
		$FRAME = "ajax";		
		if($_SESSION['userno'] == $_POST['userno']) {
			$jsonArr['result'] = "self";
			break;
		}		
		if($_SESSION['userno'] == "") {
			$jsonArr['result'] = "login";
			break;
		}		
		$arr = array();
		$arr[] = $_SESSION['userno'];
		$arr[] = $_POST['userno'];
		$arr[] = $_POST['groupno'];		
		$res = array();
		$res[] = $DB->call("p_friend_ins", $arr);		
		if($res[0]['orcode'] == '1') {
			$jsonArr['result'] = "success";
		} else {
			$jsonArr['result'] = "fail";
		}
		break;
	
	/**
	 * 컨텍스트 친구 삭제
	 */
	case "context.friend.delete.proc" :
		$FRAME = "ajax";
		
		if($_SESSION['userno'] == $_POST['userno']) {
			$jsonArr['result'] = "self";
			break;
		}		
		if($_SESSION['userno'] == "") {
			$jsonArr['result'] = "login";
			break;
		}		
		$arr = array();
		$arr[] = $_SESSION['userno'];
		$arr[] = $_POST['userno'];		
		$res = array();
		$res[] = $DB->call("p_friend_del", $arr);		
		if($res[0]['orcode'] == '1') {
			$jsonArr['result'] = "success";
		} else {
			$jsonArr['result'] = "fail";
		}
		break;
	
	/**
	 * 소셜바  전체 로그아웃 처리
	 */
	case "socialbar.logout.proc" :
		$FRAME = "ajax";
		$CLASS_LOGIN = &Module::singleton("Auth.Login");
		$CLASS_TWITTER = &Module::singleton("API.TwitterAPI");
		$CLASS_FACEBOOK = &Module::singleton("API.FacebookAPI");		
		$res = array();		
		$res[] = $CLASS_LOGIN->initSession();
		$res[] = $CLASS_TWITTER->initSession();
		$res[] = $CLASS_FACEBOOK->initSession();
		if(Module::result($res) != false) {
			$jsonArr['result'] = "success";
		} else {
			$jsonArr['result'] = "fail";
		}
		break;
	
	/*
	 * 소셜바-보기
	 */ 
	case "socialbar.view" :
		$FRAME = "ajax";		
		$review = $CLASS_REVIEW->getReview($DB, $_POST['rno']);
		if(is_array($review) && $review['rno'] != "") {
			$jsonArr['result'] = "null";
		}
		$user = $CLASS_USER->getUser($DB, $review['userno']);
		$cate = $CLASS_CODE->transCateArray($review['cate1'],$review['cate2'],$review['cate3'],$review['cate4']);
		$list[$i]['cate_desc'] = $CLASS_CODE->getCateDesc($DB, $cate);						
		if(is_array($review) && $review['rno'] != "") {
			$arr = array();
			$arr[] = $review['rno'];
			$arr[] = $_SESSION['userno'];
			$res[] = $DB->call("p_review_view_cnt_upd", $arr);
			$DB->rConnect();
			
			if($_SESSION['userno'] != "") {
				$arr = array();
				$arr[] = $_SESSION['userno'];
				$arr[] = "0";  
				$arr[] = "306";  
				$arr[] = $review['rno']; 
				$res[] = $DB->call("p_point_ins", $arr);
				$DB->rConnect();
			}		
			$wno_now = $CLASS_REVIEWBEST->getBestWeekWno($DB, date("Y-m-d"));
			$wno = $CLASS_REVIEWBEST->getBestWeekPrev($DB, $wno_now);
			$flag_cand = $CLASS_REVIEWBEST->isBestCandReview($DB, $wno, $_POST['rno']);
			if($flag_cand == true) {
				$cand = $CLASS_REVIEWBEST->getBestCandReview($DB, $wno, $_POST['rno']);
				$review['recom_cnt'] = $cand['recom_cnt'];
			}
			if($review['type'] == "R") {
				$review['url'] = "http://"._DOMAIN."/review/frame/".$review['rno'];
			}
			$jsonArr['result'] = "success";
			$jsonArr['review'] = $review;
			$jsonArr['review']['title'] = $BASE->strLimitUTF(strip_tags($review['title']), 30, false, '...');
			$jsonArr['userno'] = $user['userno'];			
			$jsonArr['nickname'] = $user['nickname'];
			$jsonArr['ico_powerblog'] = ($user['flag_powerblog'] == "1") ? "<img src='"._DIR_IMAGES_."/myrevu/ico_power.gif' />" : "";
			$jsonArr['cate_desc'] = $CLASS_CODE->getCateDesc($DB, $cate);
			$jsonArr['flag_login'] = ($_SESSION['userno'] == "") ? "0" : "1";
			$jsonArr['wno'] = ($flag_cand == false) ? "" : $wno;
			$jsonArr['flag_cand'] = ($flag_cand == false) ? "0" : "1"; 
			$jsonArr['referer'] = $_SERVER['HTTP_REFERER'];
		} else {
			$jsonArr['result'] = "fail";
		}
		break;
	
	/*
	 * 소셜바-베스트후보추천
	 */ 
	case "socialbar.cand.recom" :
		$FRAME = "ajax";
		if(empty($_SESSION['userno']) || $_SESSION['userno'] == "") {
			$jsonArr['result'] = "nouser";
			break;
		}
		if($CLASS_REVIEWBEST->isBestCandReview($DB, $_POST['wno'], $_POST['rno']) == false) {
			$jsonArr['result'] = "nocand";
			break;
		}			
		$review = $CLASS_REVIEWBEST->getBestCandReview($DB, $_POST['wno'], $_POST['rno']);
		if($review['userno'] == $_SESSION['userno']) {
			$jsonArr['result'] = "recomme";
			break; 
		}		
		if($CLASS_REVIEWBEST->isBestRecomUser($DB, $_POST['wno'], $_POST['rno'], $_SESSION['userno']) == true) {
			$jsonArr['result'] = "repeat";
			break; 
		}
		if($CLASS_REVIEWBEST->isBestRecomIP($DB, $_POST['wno'], $review['cate1'], $_SERVER['REMOTE_ADDR']) == true) {
			$jsonArr['result'] = "sameip";
			break; 
		} 		
		$arr = array();
		$arr[] = $_POST['wno'];
		$arr[] = $_POST['rno'];
		$arr[] = $_SESSION['userno'];
		$arr[] = $review['cate1'];
		$arr[] = $_SERVER['REMOTE_ADDR'];
		$res = array();
		$res[] = $DB->call("p_review_best_recom_ins", $arr);
		if(Module::result($res, "err", "-1") == true) {
			$jsonArr['result'] = "success";
			$jsonArr['recom_cnt'] = $review['recom_cnt']+1;
		} else {
			$jsonArr['result'] = "fail";
		}
		break;
	
	/*
	 * 소셜바-추천
	 */ 
	case "socialbar.recom" :		
		$FRAME = "ajax";		
		if(empty($_POST['rno'])) {
			$jsonArr['result'] = "info";
			break;
		}		
		if(!empty($_SESSION['userno']) && $_SESSION['userno'] != "") {			
			$cash = 0;
			$res = array();
			$cres = array();			
			$policy = Module::loadConf(_DIR_CONF."/site.cash.ini", true);	
			$stats = $CLASS_USER->getUserStats($DB, $_SESSION['userno']);
			$review = $CLASS_REVIEW->getReview($DB, $_POST['rno']);
			$user = $CLASS_USER->getUser($DB, $review['userno']);
			$grade = strval($CLASS_USER->getGrade($DB, $review['userno']));			
			if($review['userno'] == $_SESSION['userno']) {
				$jsonArr['result'] = "recomme"; 
				break;
			}
			if($CLASS_REVIEW->isRecomUser($DB, $_SESSION['userno'], $review['userno'], 1, 1) == true) {
				$jsonArr['result'] = "oneuser";				
				break;
			}
			if($CLASS_REVIEW->isRecomIP($DB, $_POST['rno'], $_SERVER['REMOTE_ADDR']) == true) {
				$jsonArr['result'] = "sameip"; 
				break;
			}
			if($CLASS_REVIEW->isRecomDay($DB, $_POST['rno'], $_SESSION['userno']) == true) {
				$jsonArr['result'] = "repeat"; 
				break;
			}				
			$jsonArr['condition'] = array();				
			if($stats['review_cnt'] < 1) {
				$cres[] = false;				
				$jsonArr['condition'][] = "1";
				//$jsonArr['result'] = "1"; break;	
			}	
			if($review['ip'] == $_SERVER['REMOTE_ADDR']) {
				$cres[] = false;				
				$jsonArr['condition'][] = "2";
				//$jsonArr['result'] = "2"; break;
			}		
			if($CLASS_REVIEW->isRecomTime($review['regdate'], 1) == true) {
				$cres[] = false;				
				$jsonArr['condition'][] = "3";
				//$jsonArr['result'] = "3"; break;
			}			
			if(Module::result($cres) == true) {
				$cash += $policy['CASH_GRADE'][$grade];				
				$_cash = 0;
				foreach($policy['CASH_REVIEW_CNT'] as $key => $val) {
					if($stats['review_cnt'] >= $key) {
						$_cash = $val;
					} else {
						break;
					}
				}	
				$cash += $_cash;
				if($user['flag_powerblog'] == "1") {
					$cash += $policy['CASH_POWERBLOGER']['0'];
				}
			}			
			$arr = array();		
			$arr[] = $_POST['rno'];
			$arr[] = $_SESSION['userno'];
			$arr[] = $user['userno'];
			$arr[] = $_SERVER['REMOTE_ADDR'];
			$arr[] = $cash;
			$res[] = $DB->call("p_review_recom_ins", $arr);			
			$cash = 0;
			$cash_val = "";
			$flag = false;
			$code = "";						
			foreach($policy['CASH_RECOM_CNT'] as $key => $val) 
			{
				if($review['recom_cnt']+1 == $key) {
					$_cash = $val;
					$cash_val = $val;
					$flag = true;
				} else {
					break;
				}
			}			
			if($flag == true) {				
				switch($cash_val) 
				{
					case 50 : $code = "330"; break; 
					case 100 : $code = "331"; break;
					case 150 : $code = "332"; break;
					case 200 : $code = "333"; break;
					case 250 : $code = "334"; break;
					//case 300 : $code = "335"; break;
					//case 350 : $code = "336"; break;
					//case 400 : $code = "337"; break;
					//case 450 : $code = "338"; break;
					//case 500 : $code = "339"; break;
				}				
				$cash += $_cash;							
				if($cash > 0) {	
					$arr = array();
					$arr[] = $user['userno'];
					$arr[] = '0';
					$arr[] = $code;
					$arr[] = $cash;
					$arr[] = $_POST['rno'];
					
					$DB->rConnect();
					$res[] = $DB->call("p_cash_ins", $arr);
				}
			}			
			$arr = array();
			$arr[] = $_SESSION['userno'];
			$arr[] = "0"; 
			$arr[] = "304"; 
			$arr[] = $_POST['rno'];
			$DB->rConnect();
			$res[] = $DB->call("p_point_ins", $arr);			
		} else {
			if($CLASS_REVIEW->isRecomIP($DB, $_POST['rno'], $_SERVER['REMOTE_ADDR']) == true) {
				$jsonArr['result'] = "sameip"; 
				break;
			}
			$review = $CLASS_REVIEW->getReview($DB, $_POST['rno']);
			$arr = array();		
			$arr[] = $_POST['rno'];
			$arr[] = 0; //$_SESSION['userno'];
			$arr[] = $review['userno'];
			$arr[] = $_SERVER['REMOTE_ADDR'];
			$arr[] = 0;				
			$DB->rConnect();
			$res[] = $DB->call("p_review_recom_ins", $arr);
		}		
		if(Module::result($res, "err", "-1") == true) {
			$jsonArr['result'] = "success";
			$jsonArr['recom_cnt'] = $review['recom_cnt']+1;
		} else {
			$jsonArr['result'] = "fail";
		}
		break;
	
	/*
	 * 소셜바-인기글
	 */ 
	case "socialbar.popular" :		
		$FRAME = "ajax";		
		$cateArr = array("", "10", "11", "12", "13", "14");
		$_length = sizeof($cateArr);
		$_POST['cate'] = ($_POST['cate'] != "") ? $_POST['cate'] : $cateArr[0];	
		$limit = "LIMIT 0, 10";
		// 카테고리가 있을경우 체크
		if(!empty($_POST['cate'])) {	
			$cate = $CLASS_CODE->transCate($_POST['cate']);		
			if($CLASS_CODE->isCate($DB, $cate) == false) {
				$jsonArr['result'] == "null";
			}
			$jsonArr['desc'] = $CLASS_CODE->getCateDesc($DB, $cate);
		} else {
			$jsonArr['desc'] = "전체";
		}
		$list = $CLASS_REVIEW->getReviewList($DB, $limit, $type="", $cate, "1", "point", "desc");
		if(true) {
			for($i=0; $i<sizeof($list); $i++) {
				$_content = $CLASS_REVIEW->getReviewContent($DB, $list[$i]['rno']);
				$list[$i]['num'] = $i+1;
				$list[$i]['title'] = $_content['title'];
			}
			
			foreach($cateArr as $key => $val) {
				if($val == $_POST['cate']) {	
					$num = $key;
					break;
				}
			}
			$jsonArr['prev'] = ($num - 1 < 0) ? $cateArr[$_length-1] : $cateArr[$num-1];
			$jsonArr['next'] = ($num + 1 >= $_length) ? $cateArr[0] : $cateArr[$num+1];
			//$jsonArr['prev'] = $cateArr[$num-1];		
			//$jsonArr['next'] = $cateArr[$num+1];					
			$jsonArr['result'] = "success";
			$jsonArr['list'] = $list;
			$jsonArr['num'] = $num;
		} else {
			$jsonArr['result'] = "fail";
		}
		break;
	
	/*
	 * 소셜바-진행중인 프론티어
	 */ 
	case "socialbar.frontier" :		
		$FRAME = "ajax";		
		$list = $CLASS_FRONTIER->frbannerList($DB);
		if(sizeof($list) < 1) {
			$jsonArr['result'] = "null";
		} else {
			for($i=0; $i<sizeof($list); $i++) {
				$list[$i]['titleimg'] = $CLASS_FRONTIER->frbannerimgSelect($DB, $list[$i]['frno']);
				$list[$i]['img'] = $CLASS_FRONTIER->getBannerImage($list[$i]['frid'], $list[$i]['titleimg']);
			}
		}
		if(is_array($list) && $list[0]['frno'] != "") {					
			$jsonArr['result'] = "success";
			$jsonArr['list'] = $list;			
		} else {
			$jsonArr['result'] = "fail";
		}
		break;
	
	/*
	 * 소셜바-작성자의 다른리뷰
	 */ 
	case "socialbar.review" :		
		$FRAME = "ajax";		
		$list = $CLASS_REVIEW->getMyReviewList($DB, "LIMIT 0, 10", $_POST['userno'], $blogno="");
		if(is_array($list) && $list[0]['rno'] != "") {					
			$jsonArr['result'] = "success";
			$jsonArr['list'] = $list;			
		} else {
			$jsonArr['result'] = "fail";
		}
		break;
	
	/*
	 * 소셜바-신규리뷰
	 */ 
	case "socialbar.review.new" :		
		$FRAME = "ajax";
		$list = $CLASS_REVIEW->getReviewList($DB, "LIMIT 0, 20", $type="", $cate=array(), $status="1");
		if(is_array($list) && $list[0]['rno'] != "") {
			for($i=0; $i<sizeof($list); $i++) {
				$_review = $CLASS_REVIEW->getReview($DB, $list[$i]['rno']);
				$list[$i]['title'] = $BASE->strLimitUTF(strip_tags($_review['title']), 400, false, '...');
			}
			$jsonArr['result'] = "success";
			$jsonArr['list'] = $list;			
		} else {
			$jsonArr['result'] = "fail";
		}
		break;
	
	/**
	 * 소셜바 트위터 토크등록
	 */
	case "socialbar.twitter.talk.proc" :
		$FRAME = "ajax";
		$CLASS_TWITTER = &Module::singleton("API.TwitterAPI");
		if($_SESSION['access_token']['user_id'] == "") {
			$jsonArr['result'] = "session";
			break;
		}		
		if($CLASS_TWITTER->isUser($DB, $_SESSION['access_token']['user_id']) == false){
			$jsonArr['result'] = "nouser";
			break;
		} 
		$connection = $CLASS_TWITTER->getConnection($DB, $_SESSION['access_token']['user_id']);
		$connection->post('statuses/update', array('status' => $_POST['msg']." ".$_POST['url']));		
		$jsonArr['rno'] = $_POST['rno'];
		if($connection->http_code == 200) {	
			//$CLASS_TWITTER->initSession();
			$review = $CLASS_REVIEW->getReview($DB, $_POST['rno']);			
			
			$content_object = $connection->get('account/verify_credentials');
			$content = get_object_vars($content_object);
			$userid = $content['id'];  
			$name = $content['name']; 
			$arr = array();
			$arr[] = $_POST['rno'];		
			$arr[] = $review['blogno'];
			$arr[] = $review['userno'];
			$arr[] = ($_SESSION['userno'] != "") ? $_SESSION['userno'] : 0;
			$arr[] = $userid;
			$arr[] = $name;
			$arr[] = "T";
			$arr[] = $_SERVER['REMOTE_ADDR'];
			$arr[] = nl2br(htmlspecialchars($_POST['msg']));	
			$res = array();
			$res[] = $DB->call("p_review_talk_ins", $arr);
			if($res[0]['orcode'] == '-1') {
				$jsonArr['result'] = "limit";
			} else if($res[0]['orcode'] == '1') {
				$jsonArr['result'] = "success";
				$jsonArr['talk_cnt'] = $review['talk_cnt'] + 1;
				$jsonArr['talk'] = $CLASS_REVIEWTALK->getTalk($DB, $res[0]['otno']);
			} else {
				$jsonArr['result'] = "fail";
			}
		} else {
			$jsonArr['result'] = "fail";
		}
		break; 
	
	/**
	 * 페이스북 소셜바 토크등록
	 */
	case "socialbar.facebook.talk.proc" :
		$FRAME = "ajax";
		$CLASS_FACEBOOK = &Module::singleton("API.FacebookAPI");
		$user = $CLASS_FACEBOOK->facebook->getUser();
		if($user == "") {
			$jsonArr['result'] = "nouser";
			break;
		}
		$field = $CLASS_FACEBOOK->getSessionField();		
		if($CLASS_FACEBOOK->isLogin($DB, $_SESSION[$field['user_id']]) == false){
			$jsonArr['result'] = "session";
			break;
		} 
		try {
			$CLASS_FACEBOOK->facebook->api("/".$user."/feed?access_token=".$_SESSION[$field['access_token']], "POST", 
			array("access_token"=>$_SESSION[$field['access_token']], "message" =>$_POST['msg']." ".$_POST['url']));			
			//$CLASS_FACEBOOK->initSession();
			$review = $CLASS_REVIEW->getReview($DB, $_POST['rno']);
			$profile = $CLASS_FACEBOOK->facebook->api('/me');	
			$userid = $profile['id'];  
			$name = $profile['name']; 
			$arr = array();
			$arr[] = $_POST['rno'];		
			$arr[] = $review['blogno'];
			$arr[] = $review['userno'];
			$arr[] = ($_SESSION['userno'] != "") ? $_SESSION['userno'] : 0;
			$arr[] = $userid;
			$arr[] = $name;
			$arr[] = "F";
			$arr[] = $_SERVER['REMOTE_ADDR'];
			$arr[] = nl2br(htmlspecialchars($_POST['msg']));	
			$res = array();
			$res[] = $DB->call("p_review_talk_ins", $arr);
			if($res[0]['orcode'] == '-1') {
				$jsonArr['result'] = "limit";
			} else if($res[0]['orcode'] == '1') {
				$jsonArr['result'] = "success";
				$jsonArr['talk_cnt'] = $review['talk_cnt'] + 1;
				$jsonArr['talk'] = $CLASS_REVIEWTALK->getTalk($DB, $res[0]['otno']);
			} else {
				$jsonArr['result'] = "fail";
			}
		} catch (FacebookApiException $e) {
			$jsonArr['result'] = "fail";
		}
		break; 
	
	/**
	 * 레뷰 소셜바 토크등록
	 */
	case "socialbar.talk.bak.proc" :
		$FRAME = "ajax";
		$CLASS_USER = &Module::singleton("User.User");		
		if($_SESSION['userno'] == ""){
			$jsonArr['result'] = "session";
			break;
		}
		if($CLASS_USER->isUser($DB, $_SESSION['userno']) == false) {
			$jsonArr['result'] = "nouser";
			break;
		}		
		$review = $CLASS_REVIEW->getReview($DB, $_POST['rno']);
		$arr = array();
		$arr[] = $_POST['rno'];		
		$arr[] = $review['blogno'];
		$arr[] = $review['userno'];
		$arr[] = $_SESSION['userno'];
		$arr[] = $_SESSION['userid'];
		$arr[] = $_SESSION['nickname'];
		$arr[] = $_SESSION['type'];
		$arr[] = $_SERVER['REMOTE_ADDR'];
		$arr[] = nl2br(htmlspecialchars($_POST['msg']));		
		$res = array();
		$res[] = $DB->call("p_review_talk_ins", $arr);
		if($res[0]['orcode'] == '-1') {
			$jsonArr['result'] = "limit";
		} else if($res[0]['orcode'] == '1') {
			$jsonArr['result'] = "success";
			$jsonArr['talk_cnt'] = $review['talk_cnt'] + 1;
			$jsonArr['talk'] = $CLASS_REVIEWTALK->getTalk($DB, $res[0]['otno']);			
		} else {
			$jsonArr['result'] = "fail";
		}
		break; 
	
	/**
	 * 레뷰 소셜바 토크등록
	 */
	case "socialbar.talk.proc" :
		$FRAME = "ajax";
		$CLASS_USER = &Module::singleton("User.User");
		$CLASS_TWITTER = &Module::singleton("API.TwitterAPI");
		$CLASS_FACEBOOK = &Module::singleton("API.FacebookAPI");			
		$typeArr = array("R", "T", "F");		
		if(!in_array($_POST['type'], $typeArr)) {
			$jsonArr['result'] = "type";
			break;
		}
		$review = $CLASS_REVIEW->getReview($DB, $_POST['rno']);				
		if($_POST['type'] == "R") {
			
			if($_SESSION['userno'] == ""){
				$jsonArr['result'] = "session";
				break;
			}
			if($CLASS_USER->isUser($DB, $_SESSION['userno']) == false) {
				$jsonArr['result'] = "nouser";
				break;
			}			
			$arr = array();
			$arr[] = $_POST['rno'];		
			$arr[] = $review['blogno'];
			$arr[] = $review['userno'];
			$arr[] = $_SESSION['userno'];
			$arr[] = $_SESSION['userid'];
			$arr[] = $_SESSION['nickname'];
			$arr[] = $_POST['type'];
			$arr[] = $_SERVER['REMOTE_ADDR'];
			$arr[] = nl2br(htmlspecialchars($_POST['msg']));
			
		} else if($_POST['type'] == "T") {
			
			if($_SESSION['access_token']['user_id'] == "") {
				$jsonArr['result'] = "session";
				break;
			}
			$connection = $CLASS_TWITTER->getConnection($DB, $_SESSION['access_token']['user_id']);
			//if($connection->http_code == 200) {	
				//$CLASS_TWITTER->initSession();				
				$content_object = $connection->get('account/verify_credentials');
				$content = get_object_vars($content_object);
				$userid = $content['id'];  
				$name = $content['name']; 
				$arr = array();
				$arr[] = $_POST['rno'];		
				$arr[] = $review['blogno'];
				$arr[] = $review['userno'];
				$arr[] = ($_SESSION['userno'] != "") ? $_SESSION['userno'] : 0;
				$arr[] = $userid;
				$arr[] = $name;
				$arr[] = $_POST['type'];
				$arr[] = $_SERVER['REMOTE_ADDR'];
				$arr[] = nl2br(htmlspecialchars($_POST['msg']));	
			//} else {
			//	$jsonArr['result'] = "nouser";
			//	break;
			//}
		
		} else if($_POST['type'] == "F") {
			
			$user = $CLASS_FACEBOOK->facebook->getUser();
			if($user == "") {
				$jsonArr['result'] = "nouser";
				break;
			}
			$field = $CLASS_FACEBOOK->getSessionField();		
			if($CLASS_FACEBOOK->isLogin($DB, $_SESSION[$field['user_id']]) == false){
				$jsonArr['result'] = "session";
				break;
			} 
			$profile = $CLASS_FACEBOOK->facebook->api('/me');	
			$userid = $profile['id'];  
			$name = $profile['name']; 
			$arr = array();
			$arr[] = $_POST['rno'];		
			$arr[] = $review['blogno'];
			$arr[] = $review['userno'];
			$arr[] = ($_SESSION['userno'] != "") ? $_SESSION['userno'] : 0;
			$arr[] = $userid;
			$arr[] = $name;
			$arr[] = $_POST['type'];
			$arr[] = $_SERVER['REMOTE_ADDR'];
			$arr[] = nl2br(htmlspecialchars($_POST['msg']));	
		} else {
			$jsonArr['result'] = "fail";
			break;
		}		
		$res = array();
		$res[] = $DB->call("p_review_talk_ins", $arr);		
		if($res[0]['orcode'] == '-1') {
			$jsonArr['result'] = "limit";
		} else if($res[0]['orcode'] == '1') {
			$jsonArr['result'] = "success";
			$jsonArr['rno'] = $_POST['rno'];
			$jsonArr['talk_cnt'] = $review['talk_cnt'] + 1;
			$jsonArr['talk'] = $CLASS_REVIEWTALK->getTalk($DB, $res[0]['otno']);			
			if($_SESSION['access_token']['user_id'] != "") {
				$connection = $CLASS_TWITTER->getConnection($DB, $_SESSION['access_token']['user_id']);	
				//$connection->post('statuses/update', array('status' => $_POST['msg']." ".$_POST['url']));
				$connection->post('statuses/update', array('status' => $_POST['msg']));	
			}	
			$user = $CLASS_FACEBOOK->facebook->getUser();
			$field = $CLASS_FACEBOOK->getSessionField();
			if($user != "" && $user != "0" && $CLASS_FACEBOOK->isLogin($DB, $_SESSION[$field['user_id']]) == true){
				try {
					//$CLASS_FACEBOOK->facebook->api("/".$user."/feed?access_token=".$_SESSION[$field['access_token']], "POST", 
					//array("access_token"=>$_SESSION[$field['access_token']], "message" =>$_POST['msg']." ".$_POST['url']));			
					//$CLASS_FACEBOOK->initSession();
					$CLASS_FACEBOOK->facebook->api("/".$user."/feed?access_token=".$_SESSION[$field['access_token']], "POST", 
					array("access_token"=>$_SESSION[$field['access_token']], "message" =>$_POST['msg']));
				} catch (FacebookApiException $e) {}	
			}			
			
		} else {
			$jsonArr['result'] = "fail";
		}
		break; 
	
	/**
	 * 레뷰 소셜바 토크삭제
	 */
	case "socialbar.talk.delete.proc" :
		$FRAME = "ajax";
		$talk = $CLASS_REVIEWTALK->getTalk($DB, $_POST['tno']);
		$review = $CLASS_REVIEW->getReview($DB, $talk['rno']);
		if($talk['type'] == "T") {			
			if($_SESSION['access_token']['user_id'] == $talk['userid']) {
				$res = true;
			}
		} elseif($talk['type'] == "F") {
			$CLASS_FACEBOOK = &Module::singleton("API.FacebookAPI");
			$field = $CLASS_FACEBOOK->getSessionField();
			if($_SESSION[$field['user_id']] == $talk['userid']) {
				$res = true;
			}
		} else {
			if($_SESSION['userno'] == $talk['userno'] || $_SESSION['userno'] == $talk['ruserno']) {
				$res = true;
			}
		}
		if($res == true) {
			$arr = array();
			$arr[] = $_POST['tno'];		
			$arr[] = "1";
			$res = array();
			$res[] = $DB->call("p_review_talk_upd", $arr);
			if($res[0]['orcode'] == '1') {
				$jsonArr['result'] = "success";	
				$jsonArr['tno'] = $_POST['tno'];
				$jsonArr['talk_cnt'] = $review['talk_cnt']-1;
			} else {
				$jsonArr['result'] = "fail";
			}
		} else {
			$jsonArr['result'] = "priv";
		}
		break; 
	
	/**
	 * 소셜바 마지막토크
	 */
	case "socialbar.talk.last.proc" :
		$FRAME = "ajax";
		$talk = $CLASS_REVIEWTALK->getTalkLast($DB, $_POST['rno']);
		if(strlen($talk['talk']) > 0) {
			$jsonArr['result'] = "success";
			$jsonArr['talk'] = $talk;
		} else {
			$jsonArr['talk'] = $talk['talk'] = "등록된 토크가 없습니다.";
			$jsonArr['result'] = "fail";
		}
		break; 
	
	/**
	 * 소셜바 토크더보기
	 */
	case "socialbar.talk.more.proc" : 
		$FRAME = "ajax";
		if($_POST['tno'] == ""){
			$jsonArr['result'] = "info";
			break;
		}
		$talk = $CLASS_REVIEWTALK->getTalkList($DB, $_POST['rno'], $num=15, $flag_del="0", $_POST['tno']);		
		$ntno = $CLASS_REVIEWTALK->getTalkNextTno($DB, $_POST['rno'], $flag_del="0", $talk[sizeof($talk)-1]['tno']);
		for($i=0; $i<sizeof($talk); $i++) {
			$talk[$i]['ref'] =  $CLASS_REVIEWTALK->transRef($talk[$i]['type'], $talk[$i]['nickname']);
			$talk[$i]['icon'] =  $CLASS_REVIEWTALK->transIcon($talk[$i]['type']);
		}
		if(sizeof($talk) > 0) {
			$jsonArr['result'] = "success";
			$jsonArr['talk'] = $talk;
			$jsonArr['tno'] = $talk[sizeof($talk)-1]['tno'];
			$jsonArr['ntno'] = $ntno;
		} else {
			$jsonArr['result'] = "fail";
		}
		break;
case "context.item.add.proc" : 
		$FRAME = "ajax";
		// 아이템 추가
	   // 1. URL HTML 가져오기(파싱) CURL or File 객체 이용 
	   //@@-> 1.1 = 쇼핑몰 빅 10 선정, 도메인 추출후 해당 쇼핑몰일 경우 IF 분기 처리(가격정보 추출)
	   // 2. IMG 태그 추출 
	   // 3. IMG 객체 width 와 height 필터링
	   // 4. 추출된 IMG 객체 Json 바인딩 
	   // 5. Json Arr export
		require_once '/usr/local/php5/lib/php/Benchmark/Timer.php';
		$benchTimer = new Benchmark_Timer;
		$benchTimer->start();
		$benchTimer->setMarker('Marker 1 : Script Start');


		$url = urldecode($_POST['url']);
	
		$urlArr = $BASE->extractURL($url); // Root URL extract 
		$benchTimer->setMarker('Marker 2 : extractURL');
////******* Check to time ****************************
		//hyundaihmall.
		$nodes = array ();
		$nodes_price = array();
		$start = microtime(true);
		$res = array ();
		$tempNodes = array();
//////*****************************************************
		//$html = file_get_html_curl($url); //CURL 파싱

		$returnF= file_get_data_htmldom($url);  // 리턴값은 배열이다. $returnF['content'] 콘텐츠 , $returnF['info'] : 헤더 인코딩 정보
		$returnF= $CLASS_CRAWLL->convertChrType($returnF); // Define the type of encoding reffered to $returnF['info']

		

		$html = new DOMDocument(); // For searching some tags(imges,prices)
//		$html->preserveWhiteSpace = false;
		$benchTimer->setMarker('Marker 3_1 : file_get_data_htmldom');		
		if(strlen($returnF['content'])> REAL_MAX_FILE_SIZE){ // Check CHAR Length and limite that length by REAL_MAX_FILE_SIZE
			$returnF['content'] = substr($returnF['content'],0,REAL_MAX_FILE_SIZE);	
		}
		$benchTimer->setMarker('Marker 3_2 : DOMXpath');
		@$html->loadHTML($returnF['content']); 
		$jsonArr['info'] = $returnF['info'];

		unset($returnF); // unset for memory leak
		$benchTimer->setMarker('Marker 3_3 : DOMXpath');
		$domXpath = new DOMXpath($html);
		$benchTimer->setMarker('Marker 3_4 : DOMXpath');


	   if(!empty($html)){
			$jsonArr['result'] = "success";
			 $jsonArr['title'] = $html->getElementsByTagName('title')->item(0)->textContent; // get Title text
            //** @ Extract search text by url and tag role
				$searchTxt  = $CLASS_CRAWLL->getSearchTxt($url,$urlArr[1]);	// Get a tag to search by url			
				$benchTimer->setMarker('Marker 4 : getSearchTxt');
				//$searchTxt = "img";
				//@@ img extract
				if ($html->getElementsByTagName('img') ) {	

					foreach ( $domXpath->query($searchTxt) as $element ) {
						// 상대경로 이미지 체크
						if ($CLASS_CRAWLL->startsWith($element->getAttribute('src'), "/")) {							
							$element->setAttribute('src', $urlArr[1] . $element->getAttribute('src'));						
						}
						// http 프로토콜이아닌 것들 
						if (! $CLASS_CRAWLL->startsWith($element->getAttribute('src'), "http")) {	
							$element->setAttribute('src',$urlArr[1] . "/" . $element->getAttribute('src')); 
						}
					
						//*@@ By url, parse elements and store to array things found
						$nodes_price_attr = $CLASS_CRAWLL->getPrices($element,$url);
						
						if($nodes_price_attr != NULL && $nodes_price_attr > 0){					
							
							array_push($nodes_price,$nodes_price_attr);
						}						
						//*@@ Korean url encoding for getting image sizes
						$final_url = $CLASS_CRAWLL->encodeKorean($element->getAttribute('src'));	
						
						$nodes [] = $final_url; // img tag extract		
					}
				}else{
					echo "There aren't images";
				}		
				$benchTimer->setMarker('Marker 5 : SearchIMG');
	
			//$html->clear();
			unset($html);
		//	 echo "After Call Memory Usage: ".memory_get_usage()."\n";	
		    $excutTime = microtime(true) - $start;
			$jsonArr['time'] = $excutTime;
		    $benchTimer->stop();
			//$jsonArr['benchTimer'] = $benchTimer;
			//$benchTimer->display();


			//**@ EXTRACT OF UNIQUE
			$nodes = array_unique($nodes);
			$nodes = implode("|",$nodes);
			$nodes = explode("|",$nodes);
			
			
			 
			 $start_file = microtime(true);
					 $parsedImgArr = $CLASS_CRAWLL->imageDownload( $nodes, 90, 90 );
			 $end_fileTime = microtime(true) - $start_file;	


			 	
			 $jsonArr['filetime'] = $end_fileTime;
	//*****************************************************
			$jsonArr['imgList'] = $parsedImgArr; 
			
			$jsonArr['price'] = $nodes_price; 

	   }else{
			$jsonArr['result'] = "false!! there aren't data";
	   } 
		break;

	/**
	 * Item 임시업로드
	 */
	case "common.item.image.upload.proc" :
		
		if($_FILES['file_item']['error'] == "0") {
			$tmp = $_FILES['file_item']['tmp_name'];
			$file1 = $_FILES['file_item']['name'];
			$file2 = uniqid("");
			
			if($CLASS_THUMBNAIL->create($tmp, _DIR_TMP."/".$file2, 100, 100) == true) {
				$dir = _FTP_TMP;
				$CLASS_FTP->connect("file");
				$CLASS_FTP->makeDir($dir);
				$CLASS_FTP->upload($dir."/".$file2, _DIR_TMP."/".$file2);
				$CLASS_FTP->delete($dir."/".$_POST['tmpimage']);
				$CLASS_FTP->close();
				$CLASS_FILE->delete(_DIR_TMP."/".$file2);
				Module::callScript("parent.item.previewItemImage('$file2');");
				break;
			}
		} 
		Module::callScript("parent.item.initItemImage();");		
		break;

	/**
	 * 디폴트
	 */ 
	default :
		Module::alert("잘못된 경로입니다.11");
		//Module::redirectModule("index", $param="");
		break;

}

/**
 * AJAX OUTPUT 
 */
if($FRAME == "ajax") {
	$output = json_encode($jsonArr);
	print($output);
}
/**
 * MODULE & DB CONNECT CLOSE 
 */
Module::exitModule();
?>