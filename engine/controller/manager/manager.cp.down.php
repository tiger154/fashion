<?php
/******************************************
* FTP ���� �ٿ�ε� �׽�Ʈ
*
* ���� �ڻ�
*******************************************/
//GLOBAL $TPL;
GLOBAL $BASE;
GLOBAL $LOGIN;

//===============================================================
//GLOBAL VARS
//===============================================================
//GLOBAL $FRAME;



$CLASS_MANAGER	= &Module::singleton("Manager.Manager");
$CLASS_FTP					= &Module::singleton("Ftp");

$DB = &Module::loadDb("revu");

$no = Module::$param[0];




$file_name = $CLASS_MANAGER->AfileSelect($DB, $no);
for($i=0;$i<sizeof($file_name);$i++) {
	$ftpfile	= $file_name[$i]['file'];
}


$dir1 = _FTP_CP;	

// ���丮������ ���� 
$CLASS_FTP->connect("file");

$CLASS_FTP->getFile2($ftpfile, $dir1);



ftp_close($conn_id);  
fclose($fp);  


?>
