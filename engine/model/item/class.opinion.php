<?php
class Opinion
{
	public function Opinion()
	{
	}
	/*
	 * �ش� �����ۿ� Wish or Have �� ���� ���� ��������
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
	 * �ش� �����ۿ� Wish or Have �� ���� ���� ��������
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
	 * ���� �α��� ������ ��� �����ۿ� Wish or Have ����(List��)
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