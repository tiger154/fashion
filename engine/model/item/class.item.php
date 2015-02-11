<?php
class Item
{
	public function Item()
	{
	}


	/*
	 * FASSION : getItemByItemNo
	*/
		public function getItemByItemNo($db,$itemNo){	
			$sql = "
			  SELECT * 
			  FROM Ru_item 
			  WHERE itemNo = ".$itemNo."
			  ORDER BY itemno desc			  
			 ";
			 $rs = $db->fetch($sql,true);
			 return $rs;
		}
	 	


	/*
	 * FASSION : getAllItemList
	*/
		public function getAllItemList($db,$seqNo=0){
			$where = "";
			if($seqNo != 0){
				$where .= "AND itemNo < '".$seqNo."'";
			}
			$sql = "
			  SELECT * 
			  FROM Ru_item
			  where  1
			  ".$where."
			  ORDER BY itemno desc
			  LIMIT 0,10
			 ";
			//echo $sql;			
			 $rs = $db->fetch($sql);
			
			
			 return $rs;
		}


		/*
	 * FASSION : getListCollection By userno
	 */	
	public function getListByuserno($db,$userno){
		$sql = "
		  SELECT colNo,colName 
		  FROM Ru_collection 
		  WHERE
		    userno = ".$userno."
		 ";
		 $rs = $db->fetch($sql);
		 return $rs;
	}


	/*
	 * FASSION : getCategoryInit
	 */	
    public function getCategoryInit($db,$colNo){
		$sql = "
		  SELECT * 
		  FROM Rf_cate1_code
		  WHERE 
			cate1 in (select cate1 from Ru_collection where colNo = ".$colNo.") or
			cate1 in (select cate2 from Ru_collection where colNo = ".$colNo.") or
			cate1 in (select cate3 from Ru_collection where colNo = ".$colNo.") or
			cate1 in (select cate4 from Ru_collection where colNo = ".$colNo.") or
			cate1 in (select cate5 from Ru_collection where colNo = ".$colNo.")
		 ";
		 $rs = $db->fetch($sql);
		 return $rs;
	 }
	 /*
	 * FASSION : getCategoryInit
	 */	
    public function getCategory2($db,$colNo,$cate_1){
		$sql = "
		  SELECT * 
		  FROM Rf_cate2_code
		  WHERE 
		    cate1 = '".$cate_1."' and ((cate2 in (select cate1_2 from Ru_collection where cate1 = '".$cate_1."' AND colNo = '".$colNo."' )) or
	        (cate2 in (select cate2_2 from Ru_collection where cate2 = '".$cate_1."' AND colNo = '".$colNo."' )) or
            (cate2 in (select cate3_2 from Ru_collection where cate3 = '".$cate_1."' AND colNo = '".$colNo."' )) or
            (cate2 in (select cate4_2 from Ru_collection where cate4 = '".$cate_1."' AND colNo = '".$colNo."' )) or
            (cate2 in (select cate5_2 from Ru_collection where cate5 = '".$cate_1."' AND colNo = '".$colNo."' )))
		 ";
		 $rs = $db->fetch($sql);
		 return $rs;
	 }

	public function isCate__($db, $conNo){
		$length = sizeof($conNo);
		if($length < 1) return false;
		
		$where = "";
		$where .= "AND colNo = '".$conNo."'";

		$sql = "
		SELECT			COUNT(userNo) as cnt   
		FROM			Ru_collection 
		WHERE			1 
		".$where."
		";		
		$row = $db->fetch($sql, true);
		if($row['cnt'] > 0) {
			return true;
		} else {
			return false;
		}	

	}

	
}