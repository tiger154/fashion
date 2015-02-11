
<?php

/*
//Alternative Image Saving Using cURL seeing as allow_url_fopen is disabled - bummer
function save_image($img,$fullpath){
    $ch = curl_init ($img);
    curl_setopt($ch, CURLOPT_HEADER, 0);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_BINARYTRANSFER,1);
	curl_setopt ($ch, CURLOPT_FOLLOWLOCATION, 1);
    $rawdata=curl_exec($ch);
    curl_close ($ch);
    if(file_exists($fullpath)){
        unlink($fullpath);
    }
    $fp = fopen($fullpath,'x');
    fwrite($fp, $rawdata);
    fclose($fp); 
}
$remote_img = 'http://www.revu.co.kr/images/include/gnb/gnb_logo.gif';
$img = imagecreatefromgif($remote_img);
$path = '/www/fassion10/public_html/images/crawll/';
save_image($remote_img,$path);
*/







//$img[]='http://www.revu.co.kr/images/include/gnb/gnb_logo.gif';
// 
//$img[]='http://file.revu.co.kr/banner/20120604022731.gif';
// 
//foreach($img as $i){
//    save_image($i); 
//    if(getimagesize(basename($i))){
//        echo '<h3 style="color: green;">Image ' . basename($i) . ' Downloaded OK</h3>';
//    }else{
//        echo '<h3 style="color: red;">Image ' . basename($i) . ' Download Failed</h3>';
//    }
//}
// $remote_img = 'http://www.revu.co.kr/images/include/gnb/gnb_logo.gif';
// $path = '/www/fassion10/public_html/images/crawll/';
//save_image($remote_img, $path); 

/*
 * 이미지 저장 및 썸네일 제작 
 * 1) 이미지 저장[원본] /item/original_img/
 * 2) 썸네일[+RECTANGLE][width=220, 아이템 LIST 용] || /item/list_img/
 * 3) 썸네일[+RECTANGLE][width=580, 아이템 VIEW용] || /item/view_img/
 * 4) 썸네일[-SQUARE][width=260,height=260, 아이템 VIEW내 컬렉션 커버용] || /item/view_col_cover_img/
 * 5) 썸네일[-SQUARE][width=80,height=80, 아이템 VIEW내 컬렉션 아이템용] || /item/list_simg/
 * 6) 썸네일[-SQUARE][width=170,height=170, 아이템 VIEW내 같은카테고리 인기아이템 커버용] || /item/view_cate_famous_img/
 *
 * Description : RECTANGLE -> ONLY RESIZE, NON CROP
                        SQUARE -> RESIZE , CROP
						IF ORIGINAL IMAGE SIZE IS SMALLER THEN INDICATER OF THUMBS,
						DONT RESIZE OR CROP IMAGES
 */

/*********************************************
 * Save a image by both url, curl
 **********************************************/
define('DESIRED_IMAGE_WIDTH', 260);
define('DESIRED_IMAGE_HEIGHT', 260);

$imgUrl = "http://static.naver.net/www/bn2_newsstand20130101.jpg";
$localPath = "/www/fassion10/public_html/images/crawll/";
$source_path= image_save_from_url($imgUrl,$localPath); //img save by both url,curl

//echo $source_path."<br>";

/*********************************************
 * Add file validation code here
 **********************************************/
list($source_width, $source_height, $source_type) = getimagesize($source_path);


switch ($source_type) {
    case IMAGETYPE_GIF:
        $source_gdim = imagecreatefromgif($source_path);
        break;
    case IMAGETYPE_JPEG:
        $source_gdim = imagecreatefromjpeg($source_path);
        break;
    case IMAGETYPE_PNG:
        $source_gdim = imagecreatefrompng($source_path);
        break;
}

$source_aspect_ratio = $source_width / $source_height;
$desired_aspect_ratio = DESIRED_IMAGE_WIDTH / DESIRED_IMAGE_HEIGHT;

//echo $source_width."<br>".$source_height."<br>".$source_aspect_ratio."<br>".$desired_aspect_ratio."<br>";


if ($source_aspect_ratio > $desired_aspect_ratio) {
    /*
     * Triggered when source image is wider
     */
    $temp_height = DESIRED_IMAGE_HEIGHT;
    $temp_width = ( int ) (DESIRED_IMAGE_HEIGHT * $source_aspect_ratio);
} else {
    /*
     * Triggered otherwise (i.e. source image is similar or taller)
     */
    $temp_width = DESIRED_IMAGE_WIDTH;
    $temp_height = ( int ) (DESIRED_IMAGE_WIDTH / $source_aspect_ratio);
}


/*********************************************
 * Resize the image into a temporary GD image
 **********************************************/

$temp_gdim = imagecreatetruecolor($temp_width, $temp_height);
imagecopyresampled(
    $temp_gdim,
    $source_gdim,
    0, 0,
    0, 0,
    $temp_width, $temp_height,
    $source_width, $source_height
);

/**********************************************
 * Copy cropped region from temporary image into the desired GD image
 **********************************************/

$x0 = ($temp_width - DESIRED_IMAGE_WIDTH) / 2;
$y0 = ($temp_height - DESIRED_IMAGE_HEIGHT) / 2;
$desired_gdim = imagecreatetruecolor(DESIRED_IMAGE_WIDTH, DESIRED_IMAGE_HEIGHT);
imagecopy(
    $desired_gdim,
    $temp_gdim,
    0, 0,
    $x0, $y0,
    DESIRED_IMAGE_WIDTH, DESIRED_IMAGE_HEIGHT
);

header('Content-type: image/jpeg');
imagejpeg($desired_gdim,"/www/fassion10/public_html/images/crawll/thumb.jpg");

//$my_img[]='http://media-cache-ec3.pinterest.com/upload/93238654755037178_Fre28sKI_b.jpg'; 
////$my_img[]='http://file.revu.co.kr/banner/20120604022731.gif'; 
//$fullpath = "/www/fassion10/public_html/images/crawll/";
// 
//foreach($my_img as $i){
//    image_save_from_url($i,$fullpath);
// 
//    if(getimagesize($fullpath."/".basename($i))){
//        echo '<h3 style="color: green;">Image ' . basename($i) . ' Downloaded Successfully</h3>';
//    }else{
//        echo '<h3 style="color: red;">Image ' . basename($i) . ' Download Failed</h3>';
//    }
//}
// 
function image_save_from_url($my_img,$fullpath){
    if($fullpath!="" && $fullpath){
        $fullpath = $fullpath."/".basename($my_img);
    }
    $ch = curl_init ($my_img);
    curl_setopt($ch, CURLOPT_HEADER, 0);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_BINARYTRANSFER,1);
    curl_setopt ($ch, CURLOPT_FOLLOWLOCATION, 1);
    $rawdata=curl_exec($ch);
    curl_close ($ch);
    if(file_exists($fullpath)){
        unlink($fullpath);
    }
    $fp = fopen($fullpath,'x');
    fwrite($fp, $rawdata);
    fclose($fp);
	
	return $fullpath;
}
?>

