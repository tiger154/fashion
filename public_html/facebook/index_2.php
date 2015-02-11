<?php
header('Content-Type: text/html; charset=utf-8');
function file_get_data_htmldom_($url) {
			$data = array();
			$ch = curl_init();
			//$userAgent = 'Googlebot/2.1 (http://www.googlebot.com/bot.html)';
			//$userAgent = "Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1)";
			$userAgent ="Mozilla/5.0 (Windows NT 5.1) AppleWebkit/537.11 (KHTML, like Gecko) Chrome/23.0.127.64 Safari/537.11";
			curl_setopt($ch,CURLOPT_USERAGENT, $userAgent);
			curl_setopt($ch, CURLOPT_CONNECTTIMEOUT ,1); 
			curl_setopt($ch, CURLOPT_TIMEOUT, 400); //timeout in seconds
			curl_setopt($ch, CURLOPT_HEADER, 0);
			curl_setopt($ch, CURLOPT_COOKIESESSION, TRUE); 
			//curl_setopt($ch, CURLOPT_COOKIEFILE, _DIR_TMP.'/cookies.txt');
			//curl_setopt ($ch, CURLOPT_COOKIEJAR, _DIR_TMP.'/cookies.txt');
			curl_setopt($ch, CURLOPT_COOKIE, session_name() . '=' . session_id());
			curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1); //Set curl to return the data instead of printing it to the browser.
			curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1); 		
			curl_setopt($ch, CURLOPT_URL, $url);
			$data['content'] = curl_exec($ch);
			$data['info'] = curl_getinfo($ch,CURLINFO_CONTENT_TYPE);
			curl_close($ch);
			return $data;
}



$url = "http://itempage3.auction.co.kr/detailview.aspx?ItemNo=A673351311&listqs=catetab%3d4%26class%3dCorner.CategoryBest%26listorder%3d0&listtitle=%ba%a3%bd%ba%c6%ae100&frm2=through";
//$url = "http://www.revu.co.kr";
//$url = "http://www.pinterest.com";
//$url = "http://www.wizwid.com/CSW/handler/wizwid/kr/MainView-MainView";
//$url = "http://itempage3.auction.co.kr/detailview.aspx?itemno=A554949112&frm2=through"; // ks~~~ 
//$url = "http://www.wizwid.com/CSW/handler/wizwid/kr/MainView-MainView"; // euc-kr
//$pattern2 = "/[\xA1-\xFE][\xA1-\xFE]/";
//$tempNodes = explode("/",$url );
//
//foreach ( $tempNodes as $i => $url_attr ) {	
//	if(preg_match($pattern2,$url_attr)){
//		$url_attr = urlencode($url_attr);
//	}	
//	if($i > 0) {
//		$final_url .= "/".$url_attr;
//	}else{
//		$final_url .= $url_attr;
//	}
//}
//$sample_html = "
//	<div id='divSellPrice' class='flash'>
//							
//							<script type='text/javascript'>printSWF('SellPrice', 'http://pics.auction.co.kr/swf/common/Price1.swf', '100%', '31', 'transparent', '#FFFFFF', 'addPrice=setFlashPrice('SellPrice',4900.0000, 0)&reSize=resizeFlashSellPriceWidth');</script>
//							
//						</div>
//";
$defaultDIR = "/www/fassion10/public_html/images/crawll/auction_sample.html";

$returnF = file_get_data_htmldom_($url); 


//mb_detect_encoding($string, 'UTF-8, EUC-KR');
$tempInfo = explode("=",$returnF['info']);

if($tempInfo[1] != ""){
	if(preg_match("/ks/",$returnF['info'])){
		$tempInfo[1] = "euc-kr";
	}
	$returnF['content'] = mb_convert_encoding($returnF['content'], "HTML-ENTITIES" , $tempInfo[1]); 
}

$html = new DOMDocument(); 
//$returnF = file_get_contents($defaultDIR);
@$html->loadHTML($returnF['content']);



$tempfilename = "/www/fassion10/public_html/images/crawll/" . md5 ( mt_rand () ) . ".html";

function write($tempfilename, $content)
	{
		$fp = fopen($tempfilename,"w");
		if(fwrite($fp, $content) == false) {
			return false;
		} else {
			fclose($fp);
			return true;
		}
	}

//write($tempfilename,$returnF['content']);
unset($returnF);

$domXpath = new DOMXpath($html);


foreach ( $domXpath->query("//div[@id='divSellPrice']/script") as $element ) {

	$part = "/[0-9]*\.[0-9]{4}/";
	if(preg_match($part ,$element->textContent, $matches1)){
		echo "Before---->".$element->textContent."<br>";
		echo $matches1[0];
	}

	//print $element->textContent."---type is".$element->getAttribute('src')."<br><br>";
}

//$metaChildren = $html->getElementsByTagName('script');
//for ($i = 0; $i < $metaChildren->length; $i++) {
//  $el = $metaChildren->item($i);
//  print $el->getAttribute('type') . '=' . $el->textContent . "<br><br><br>";
//}










//$data = file_get_data_htmldom_($final_url);
//print_r($data );
?>