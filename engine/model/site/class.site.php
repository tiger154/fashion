<?php
class Site
{
	public function Site()
	{
	}
	
	public function getPastTime($regdate)
	{	
		//echo "regdate:$regdate";
		$ptime = time() - strtotime($regdate);
		$time = array();
		$time['min'] = floor($ptime / 60);
		$time['sec'] = round($ptime % 60);
		return $time;
	}

	public function getNotice($db, $num=4)
	{
		$where = "";
		if(is_int($num) && $num != "") $where .= "LIMIT ".$num;
		$sql = "
		SELECT		bno, title, url, pubdate, regdate 
		FROM		Ru_cache_notice
		".$where."
		";
		//echo $sql;
		$rs = $db->fetch($sql);
		return $rs;
	}

	public function getKeywordReview($db, $kno, $num=3)
	{
		$CLASS_REVIEW = &Module::singleton("Review.Review");
		$CLASS_REVIEWKEYWORD = &Module::singleton("Review.ReviewKeyword");		
		$limit = "LIMIT ".$num;
		$list = $CLASS_REVIEWKEYWORD->getKeywordLinkList($db, $kno, $limit);
		$list = $CLASS_REVIEW->getReviewDataBind($db, $list);
		$recom_cnt = array(); 
		for($i=0; $i<$num; $i++) {			
			$list[$i]['thumbimage_url'] = $CLASS_REVIEWKEYWORD->getKeywordImage($kno, $list[$i]['rno'].".jpg");
			$recom_cnt[] = $list[$i]['recom_cnt'];
		}
		$size = $CLASS_REVIEW->getChartBarPercent($recom_cnt);
		for($i=0; $i<$num; $i++) {
			$list[$i]['size'] = $size[$i];
		}
		return $list;
	}

	public function getRecomReviewByOrder($db, $num=5)
	{
		$CLASS_REVIEW = &Module::singleton("Review.Review");
		$sql = "
		SELECT		rno  
		FROM		Ru_cache_review_recom  
		ORDER BY 	bno ASC 
		LIMIT 		".$num."
		";
		//echo $sql;
		$list = $db->fetch($sql);
		$list = $CLASS_REVIEW->getReviewDataBind($db, $list);
		$recom_cnt = array(); 
		for($i=0; $i<$num; $i++) {
			$recom_cnt[] = $list[$i]['recom_cnt'];
		}		
		$size = $CLASS_REVIEW->getChartBarPercent($recom_cnt);
		for($i=0; $i<$num; $i++) {
			$list[$i]['size'] = $size[$i];
		}
		return $list;
	}

	public function getRecomReviewByRegdate($db, $num=5) 
	{
		$CLASS_REVIEW = &Module::singleton("Review.Review");
		$sql = "
		SELECT		DISTINCT rno  
		FROM		Ru_review_recom  
		ORDER BY 	regdate DESC 
		LIMIT 		".$num."
		";
		//echo $sql;
		$list = $db->fetch($sql);
		$recom_cnt = array(); 
		$list = $CLASS_REVIEW->getReviewDataBind($db, $list);
		$recom_cnt = array(); 
		for($i=0; $i<$num; $i++) {
			$recom_cnt[] = $list[$i]['recom_cnt'];
		}
		$size = $CLASS_REVIEW->getChartBarPercent($recom_cnt);
		for($i=0; $i<$num; $i++) {
			$list[$i]['size'] = $size[$i];
		}
		return $list;	
	}

	public function getNoticeReview($db, $cate)
	{
		$sql = "
		SELECT		*   
		FROM		Ru_cache_review_notice
		WHERE 		cate = '".$cate."'
		";
		//echo $sql;
		$rs = $db->fetch($sql);
		return $rs;
	}

	public function getBestReview($db)
	{
		$CLASS_BASE = &Module::singleton("Base");
		$CLASS_REVIEW = &Module::singleton("Review.Review");
		$CLASS_REVIEWBEST = &Module::singleton("Review.ReviewBest");
		$wno_now = $CLASS_REVIEWBEST->getBestWeekWno($db, date("Y-m-d"));
		$wno = $CLASS_REVIEWBEST->getBestWeekPrev($db, $wno_now);
		$_list = $CLASS_REVIEWBEST->getBestReview($db, $wno, $limit=6);
		$list = $CLASS_REVIEW->getReviewDataBind($db, $_list);
		for($i=0; $i<sizeof($list); $i++) {
			$list[$i]['best_recom_cnt'] = $_list[$i]['best_recom_cnt'];
		}
		$bestdate = $CLASS_REVIEWBEST->getBestWeekDate($db, $wno);
		$bestdate['sdate'] = $CLASS_BASE->transDate($bestdate['sdate'], "E");
		$bestdate['edate'] = $CLASS_BASE->transDate($bestdate['edate'], "E");
		$data = array();
		$data['list'] = $list;
		$data['date'] = $bestdate;
		return $data;
	}

	public function getRealtimeReview($db, $type, $cate, $num=3)
	{
		$CLASS_REVIEW = &Module::singleton("Review.Review");
		$CLASS_CODE = &Module::singleton("Code.Code");
		$limit = "LIMIT 0, ".$num;
		$date[0] = date("Y-m-d H:i:s", mktime(date("H"),date("i"),date("s"), date("m"), date("d")-7, date("Y"))); 
		$date[1] = date("Y-m-d H:i:s");
		if($type != "F") {
			$cateArr = $CLASS_CODE->transCate($cate);
		} else {
			$cateArr = array();
		}
		$list = $CLASS_REVIEW->getReviewList($db, $limit, $type, $cateArr, $status="1", $date);
		$list = $CLASS_REVIEW->getReviewDataBind($db, $list);
		for($i=0; $i<sizeof($list); $i++) {
			$time = $this->getPastTime($list[$i]['regdate']);
			$list[$i]['pasttime'] = $time['min']."분 ".$time['sec']."초 전";
		}
		return $list;
	}

	public function getRealtimeTalk($db)
	{
		$CLASS_FRONTIER = &Module::singleton("Frontier.Frontier");
		$CLASS_USER = &Module::singleton("User.User");
		$list = $CLASS_FRONTIER->FrontierMainTalk($db);
		for($i=0; $i<sizeof($list); $i++) {
			$list[$i]['content'] = strip_tags($list[$i]['content']); 
			$time = $this->getPastTime($list[$i]['regdate']);
			$list[$i]['pasttime'] = $time['min']."분 ".$time['sec']."초 전";
			$user = $CLASS_USER->getUser($db, $list[$i]['userno']);
			$extra = $CLASS_USER->getUserExtra($db, $list[$i]['userno']);
			$list[$i]['userimage'] = $CLASS_USER->getImage($list[$i]['userno'], $extra['userimage']);  
		}
		return $list;
	}
}
?>