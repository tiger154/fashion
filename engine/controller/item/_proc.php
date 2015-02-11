<?php
/***************************************************************************************
 * 컬렉션 컨트롤러
 * 
 * 작성일 : 2013.01.22
 * 작성자 :  원전환
 * 히스토리 : 
 * 
 * 2013.XX.XX (작성자)
 * > 수정내용1
 * > 수정내용2 
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
$CLASS_FTP = &Module::singleton("Ftp");
$CLASS_FILE = &Module::singleton("File");
$CLASS_THUMBNAIL = &Module::singleton("Thumbnail"); 
$CLASS_USER = &Module::singleton("User.User");
$CLASS_CASH = &Module::singleton("User.Cash");
$CLASS_CODE = &Module::singleton("Code.Code");
$CLASS_ITEM = &Module::singleton("Item.Item");
$CLASS_ITEMOPINION = &Module::singleton("Item.Opinion");
$CLASS_ITEMTALK = &Module::singleton("Item.Talk");
$CLASS_COLLECTION = &Module::singleton("Collection.Collection");
$CLASS_CRAWLL = &Module::singleton("Crawll"); // Fassion Crawll
Module::includeExtends("simple_html_dom", "simple_html_dom");	
/**
 * DB OBJECT
 */
$DB = &Module::loadDb("fassion");

/**
 * VAR / PROC
 */
$jsonArr = array();

/**
 * TODO
 */
switch(Module::$todo)
{	
	/**
	 * 아이템등록[URL기준]
	 * 썸네일 5개생성 
	 */
	case "item.add.byurl.proc" :		 
		$FRAME = "ajax";

		$userno = $_SESSION['userno'];
		$itemName = $_POST['itemName'];
		$selectedColNo = $_POST['selectedColNo'];
        $selectedCate1 = $_POST['selectedCate1'];
		$selectedCate2 = $_POST['selectedCate2'];
        $itemImgUrl = $_POST['itemImgUrl'];
		$origin = $_POST['origin'];

		$itemArr = array();		
		$itemArr[] = $userno;
		$itemArr[] = $selectedColNo;
		$itemArr[] = $itemName;
		$itemArr[] = $selectedCate1;
		$itemArr[] = $selectedCate2;
		$itemArr[] = $origin;		
		
		$res = array();		
		//step1. 아이템 기본 정보 인서트 처리
		$res[] = $DB->call("p_item_ins", $itemArr);
		
		if($res[0]['orcode'] == '1') {  //성공일때			
			
				// 이미지 작업 시작!
				/*
				 * 이미지 저장 및 썸네일 제작 
				 * 1) 이미지 저장[원본] /item/original_img/
				 * 2) 썸네일[+RECTANGLE][width=220, 아이템 LIST 용] || /item/list_img/
				 * 3) 썸네일[+RECTANGLE][width=580, 아이템 VIEW용] || /item/view_img/
				 * 4) 썸네일[-SQUARE][width=260,height=260, 아이템 VIEW내 컬렉션 커버용] || /item/view_col_cover_img/
				 * 5) 썸네일[-SQUARE][width=80,height=80, 아이템 VIEW내 컬렉션 아이템용] || /item/view_simg/
				 * 6) 썸네일[-SQUARE][width=170,height=170, 아이템 VIEW내 같은카테고리 인기아이템 커버용] || /item/view_catefamous_cover_img/
				*/
				$dirname = date("Y");
				#########################################################
				#########################################################
				$dir1 = _FTP_ITEMIMAGE."/"."original_img"."/".$dirname;			
				$dir2 = _FTP_ITEMIMAGE."/"."list_img"."/".$dirname;			
				$dir3 = _FTP_ITEMIMAGE."/"."view_img"."/".$dirname;		
				$dir4 = _FTP_ITEMIMAGE."/"."view_col_cover_img"."/".$dirname;				
				$dir5 = _FTP_ITEMIMAGE."/"."view_simg"."/".$dirname;				
				$dir6 = _FTP_ITEMIMAGE."/"."view_catefamous_cover_img"."/".$dirname;				

				#########################################################
				#########################################################
				$file1 = $res[0]['oitemno'].".gif"; //파일 리네임
				
				/*****************************************
				*SAVE IMAGES AND MAKE THUMB NAIL
				******************************************/
				$sourcePath = $CLASS_FILE->uploadByUrl($itemImgUrl,$file1,_DIR_TMP);
				$CLASS_FTP->connect("file"); //웹서버에서 파일서버 ftp connect
				$CLASS_FTP->makeDir($dir1); // 파일서버에 해당 디렉토리 생성
				$CLASS_FTP->upload($dir1."/".$file1, _DIR_TMP."/".$file1); //웹서버에서 파일서버로 업로드 처리

				/*Make listImg[::makeRectangleThumb::]*/
				if($CLASS_THUMBNAIL->makeRectangleThumb($sourcePath,_DIR_TMP."/list_img_".$file1,220)){
					$CLASS_FTP->connect("file"); //웹서버에서 파일서버 ftp connect
					$CLASS_FTP->makeDir($dir2); // 파일서버에 해당 디렉토리 생성
					$CLASS_FTP->upload($dir2."/".$file1, _DIR_TMP."/list_img_".$file1); //웹서버에서 파일서버로 업로드 처리
					$CLASS_FILE->delete(_DIR_TMP."/list_img_".$file1);				
				}else{
					echo "Making false";
				};

				/*Make viewImg[::makeRectangleThumb::]*/
				if($CLASS_THUMBNAIL->makeRectangleThumb($sourcePath,_DIR_TMP."/view_img_".$file1,580)){
					$CLASS_FTP->connect("file"); //웹서버에서 파일서버 ftp connect
					$CLASS_FTP->makeDir($dir3); // 파일서버에 해당 디렉토리 생성
					$CLASS_FTP->upload($dir3."/".$file1, _DIR_TMP."/view_img_".$file1); //웹서버에서 파일서버로 업로드 처리
					$CLASS_FILE->delete(_DIR_TMP."/view_img_".$file1);				
				}else{
					echo "Making false";
				};

				/*Make viewColCoverImg[::view_col_cover_img::]*/
				if($CLASS_THUMBNAIL->makeSquareThumb($sourcePath,_DIR_TMP."/view_col_cover_img_".$file1,260,260)){
					$CLASS_FTP->connect("file"); //웹서버에서 파일서버 ftp connect
					$CLASS_FTP->makeDir($dir4); // 파일서버에 해당 디렉토리 생성
					$CLASS_FTP->upload($dir4."/".$file1, _DIR_TMP."/view_col_cover_img_".$file1); //웹서버에서 파일서버로 업로드 처리
					$CLASS_FILE->delete(_DIR_TMP."/view_col_cover_img_".$file1);				
				}else{
					echo "Making false";
				};

				/*Make viewSImg[::view_simg::]*/
				if($CLASS_THUMBNAIL->makeSquareThumb($sourcePath,_DIR_TMP."/view_simg_".$file1,80,80)){
					$CLASS_FTP->connect("file"); //웹서버에서 파일서버 ftp connect
					$CLASS_FTP->makeDir($dir5); // 파일서버에 해당 디렉토리 생성
					$CLASS_FTP->upload($dir5."/".$file1, _DIR_TMP."/view_simg_".$file1); //웹서버에서 파일서버로 업로드 처리
					$CLASS_FILE->delete(_DIR_TMP."/view_simg_".$file1);				
				}else{
					echo "Making false";
				};
				
				/*Delete the temp file of original*/
				$CLASS_FILE->delete(_DIR_TMP."/".$file1);	
			
				$jsonArr['result'] = "success";	
				$jsonArr['result_file'] = "success";	
				$jsonArr['addedItemNo'] = $res[0]['oitemno']; 

		}else{	 // 실패
			$jsonArr['result'] = "fail";
		}

		
		
		break;
	/**
	 * 아이템-리스트-가져오기
	 *  
	 */
	case "item.get.list.proc" :		 
		$FRAME = "ajax";
		$lastid = $_POST['lastid'];
		
		
		$itemlist = $CLASS_ITEM->getAllItemList($DB,$lastid);
		$size = sizeof($itemlist);
		if($size>0){
			$jsonArr['result'] = "success";			
			
			for($i=0;$i<sizeof($itemlist);$i++) {
				$userInfo = $CLASS_USER->getUser($DB,$itemlist[$i]['userNo']);
				$itemlist[$i]['userInfo'] = 	$userInfo;

				$userExtraInfo = $CLASS_USER->getUserExtra($DB,$itemlist[$i]['userNo']);	
				$itemlist[$i]['userimage'] = 	$userExtraInfo['userimage'];

				$userStatsInfo = $CLASS_USER->getUserStats($DB,$itemlist[$i]['userNo']);	
				$itemlist[$i]['userStatsInfo'] = 	$userStatsInfo;

				$collectionInfo = $CLASS_COLLECTION->getColByColNo($DB,$itemlist[$i]['collectionNo']);	
				$itemlist[$i]['colname'] = 	$collectionInfo['colName'];

				$itemlist[$i]['itemurl'] = "http://"._DOMAIN_FILE."/"._FTP_ITEMIMAGE."/"."list_img"."/".substr($itemlist[$i]['regdate'],0,4)."/".$itemlist[$i]['itemNo'].".gif";	
				
				 $cate1Info= $CLASS_CODE->getClassNameByCate($DB,$itemlist[$i]['cate1']);
				 $itemlist[$i]['cateclass'] = $cate1Info['cate_desc_eng'];

				 $itemlist[$i]['dateYMD'] = $BASE->transDate($itemlist[$i]['regdate'],"E");
				 $itemlist[$i]['dateHM'] = $BASE->transDate($itemlist[$i]['regdate'],"G");
				 $itemlist[$i]['dateH'] = substr($itemlist[$i]['dateHM'],0,2);

			}			

			$jsonArr['itemlist'] = $itemlist;
		}else{	 // 실패
			$jsonArr['result'] = "fail";
		}
	break;

	case "item.del.opinion.proc" :		 
		$FRAME = "ajax";
		
		$ino = $_POST['ino'];		
		$atype = $_POST['atype'];
		$atype = ($atype=="wish") ? "W" : "H";

		if($_SESSION["userno"] == ""){
			$jsonArr['result'] = "fail";
			$jsonArr['faildes'] = "비정상 접근 으로 차단되었습니다.";
			break;
		}

		$itemArr = array();
		$itemArr[] = $ino;
		$itemArr[] = $_SESSION["userno"];
		$itemArr[] = $atype;

		$res = array();			
		$res[] = $DB->call("p_item_opinion_del", $itemArr);
		if($res[0]['orcode'] == '1') {  //성공일때	
			$jsonArr['result'] = "success";
		}else{
			$jsonArr['result'] = "fail";
		}
	break;
	
	/**
	 * 아이템-의견(활동)-추가
	 *  
	 */
	case "item.add.opinion.proc" :		 
		$FRAME = "ajax";
		
		//		IN  pino BIGINT(20), -- 아이템번호
		//		IN  piuserno BIGINT(20), -- 아이템 작성회원 번호
		//		IN  pauserno BIGINT(20), -- 활동(액션)회원 번호
		//		IN  patype char(1), -- 활동 타입(W:위시,H:해브)
		//		IN  pip VARCHAR(15) -- 활동(액션) IP 

		$ino = $_POST['ino'];
		$atype = $_POST['atype'];
		$atype = ($atype=="wish") ? "W" : "H";
	
		$iuser = $CLASS_ITEM->getItemByItemNo($DB,$ino);
	
	    //본인 아이템에 WISH/HAVE 클릭시 
		if($_SESSION["userno"]==$iuser["userNo"]){
			$jsonArr['result'] = "fail";
			$jsonArr['faildes'] = "본인의 작성한 아이템에는 WISH/HAVE 불가능 합니다.";
			break;
		}
		// HAVE 또는 WISH 클릭 여부     	
		$opinion = $CLASS_ITEMOPINION->getOpinionYnByItemNo($DB,$ino);
		if(sizeof($opinion)>0){
			$jsonArr['result'] = "fail";
			// 실패 사유 설명(아이템-의견 룰)
			if($atype =="W" && $opinion["wCnt"] > 0){
				$jsonArr['faildes'] = "해당 아이템은, 이미 'WISH' 되었습니다.";
			}else if($atype =="W" && $opinion["hCnt"] > 0){
				$jsonArr['faildes'] = "'HAVE'된 아이템에는, 'WISH' 가 불가능 합니다.";
			}else if($atype =="H" && $opinion["hCnt"] > 0){
				$jsonArr['faildes'] = "해당 아이템은, 이미 'HAVE' 되었습니다.";
			}else if($atype =="H" && $opinion["wCnt"] > 0){
				$jsonArr['faildes'] = "'WISH'된 아이템에는, 'HAVE'가 불가능 합니다.";
			}
			break;
		}

		$itemArr = array();		
		$itemArr[] = $ino;
		$itemArr[] = $iuser["userNo"];
		$itemArr[] = $_SESSION["userno"];
		$itemArr[] = $atype;
		$itemArr[] = $_SERVER['REMOTE_ADDR'];

		$res = array();			
		$res[] = $DB->call("p_item_opinion_ins", $itemArr);
		if($res[0]['orcode'] == '1') {  //성공일때	
			$jsonArr['result'] = "success";
			$jsonArr['ino'] = $ino;
		}else{
			$jsonArr['result'] = "fail";
		}        
	break;
	/**
	 * 아이템-의견(활동)-추가
	 *  
	 */
	case "item.add.talk.proc" :		 
		$FRAME = "ajax";

		$ino = $_POST['ino'];
		$atype = $_POST['atype'];
		$talk = $_POST['talk'];
		$iuser = $CLASS_ITEM->getItemByItemNo($DB,$ino);

		$itemArr = array();		
		$itemArr[] = $ino;
		$itemArr[] = $iuser["userNo"];
		$itemArr[] = $_SESSION["userno"];
		$itemArr[] = $atype;
		$itemArr[] = $_SERVER['REMOTE_ADDR'];
		$itemArr[] = rawurldecode($talk);

		$res = array();			
		$res[] = $DB->call("p_item_talk_ins", $itemArr);
		if($res[0]['orcode'] == '1') {  //성공일때	
			$jsonArr['result'] = "success";
			$jsonArr['ino'] = $ino;
		}else{
			$jsonArr['result'] = "fail";
		}		

	break;

	case "item.get.talk.proc" :		 
		$FRAME = "ajax";
		$ino = $_POST['ino'];
		$atype = $_POST['atype'];
		if($atype=="wish"){
			$atype = "w";
		}else if($atype=="have"){
			$atype = "h";
		}
		$lastid = $_POST['lastid'];
		$lastid = ($lastid == "") ? 0 : $lastid;
	
		//echo $ino."//".$atype."//".$lastid;
		
		$itemlist = $CLASS_ITEMTALK->getTalkByItemNo($DB,$ino,$atype,$lastid);
		
		$size = sizeof($itemlist);
		if($size>0){
			$jsonArr['result'] = "success";
			$jsonArr['itemlist'] = $itemlist;
		}else{
			$jsonArr['result'] = "false";	
		}

	break;
	
	/**
	 * 디폴트
	 */
	default :
		Module::alert("잘못된 경로입니다.");
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