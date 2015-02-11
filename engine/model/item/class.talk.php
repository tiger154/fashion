<?php
class Talk
{
	public function Talk()
	{
	}

	/*
	 * FASSION 
	 * $atype = w : WISH, h : HAVE, t : TALK 
	*/
	public function getTalkByItemNo($db,$itemNo,$atype="",$lastid=0){
		
			$where = "";
			if($atype == "all"){				
			}else if($atype != ""){
				$where = " AND atype = '".$atype."'";
			}
			$sql = "
				SELECT * FROM Ru_item_talk  
				WHERE 1 
				 AND ino =  '".$itemNo."'
				".$where."
				 order by tno desc
				 limit ".$lastid.",50
			 ";
			//echo $sql."<br>";
			 $rs = $db->fetch($sql);
			 return $rs;
	} 

	

	
}