<?php
class Opinion
{
	public function Opinion()
	{
	}
	/*
	 * 해당 아이템에 Wish or Have 한 유저 별명 가져오기
	*/
	public function getOpinionNickWishedByItemNo($db,$itemNo){	
			$sql = "
				SELECT (select nickname from Ru_account where userno = auserno) as nick
				FROM Ru_item_opinion WHERE ino =  '".$itemNo."' and atype = 'W' 
				order by ono desc
			 ";
			 //echo $sql."<br>";
			 $rs = $db->fetch($sql,true);
			 return $rs;
	} 
	
	/*
	 * 해당 아이템에 Wish or Have 한 유저 별명 가져오기
	*/
	public function getOpinionNickHavedByItemNo($db,$itemNo){	
			$sql = "
				SELECT (select nickname from Ru_account where userno = auserno) as nick
				FROM Ru_item_opinion WHERE ino =  '".$itemNo."' and atype = 'H' 
				order by ono desc
			 ";
			 //echo $sql."<br>";
			 $rs = $db->fetch($sql,true);
			 return $rs;
	} 


	
	/*
	 * 현재 로그인 유저가 대상 아이템에 Wish or Have 유무(List용)
	*/
	public function getOpinionYnByItemNo($db,$itemNo){	
			$sql = "
				SELECT 
					auserno,
					(select count(*) as cnt from Ru_item_opinion 
					where ino = '".$itemNo."' and auserno= '".$_SESSION["userno"]."'  and atype ='W'
					) as wCnt,
					(select count(*) as cnt from Ru_item_opinion 
					where ino = '".$itemNo."' and auserno= '".$_SESSION["userno"]."'  and atype ='H'
					) as hCnt
				FROM  Ru_item_opinion 
					WHERE ino = '".$itemNo."' 
					and auserno= '".$_SESSION["userno"]."' 
				limit 1		  			  
			 ";
			 //echo $sql."<br>";
			 $rs = $db->fetch($sql,true);
			 return $rs;
	} 

	/*
	 * FASSION : getItemByItemNo
	*/
		public function getItemOpinionByItemNo($db,$itemNo,$atype){	
			$sql = "
			  SELECT * 
			  FROM Ru_item_opinion 
			  WHERE ino = '".$itemNo."'
			  AND auserno = '".$_SESSION["userno"]."'
			  AND atype = '".$atype."'			  			  
			 ";
			 $rs = $db->fetch($sql,true);
			 return $rs;
		}

	
}