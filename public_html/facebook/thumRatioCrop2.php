<?php

// $type[0] = 2;
// $width[0] = 220;
// $type[1] = 2;
// $width[1] = 580;
// $type[2] = 1;
// $width[2] = 260;
// $type[3] = 1;
// $width[3] = 80;
// $type[4] = 1;
// $width[4] = 80;



/*
 * Crop-to-fit PHP-GD
 * http://911-need-code-help.blogspot.com/2009/04/crop-to-fit-image-using-aspphp.html
 *
 * Resize and center crop an arbitrary size image to fixed width and height
 * e.g. convert a large portrait/landscape image to a small square thumbnail
 */
	
/*
 $file : OriginalFileUrl
 $thumb : url you want to make thumb
 $width : limit width
 $height : limit height
 $type : 1-To make a rectangle
             2-defaulct
	function create($file, $thumb, $width, $height)	
*/



$fileURL = "http://media-cache-ec2.pinterest.com/upload/270216046362468217_zjZZ8bdA_b.jpg";
$localPath = "/www/fassion10/public_html/images/crawll/"."thumb.jpg";

//makeSquareThumb($fileURL,$localPath,220,150);
makeRectangleThumb($fileURL,$localPath,220,220);


function makeRectangleThumb($fileURL,$thumbURL,$width, $height){
	/*SET VARS*/
	$source_path = $fileURL;
	$DESIRED_IMAGE_WIDTH = $width;
	$DESIRED_IMAGE_HEIGHT = $height;

	/*
	 * Add file validation code here
	 */
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
	if($source_width > $DESIRED_IMAGE_WIDTH ){	
		$ratio = round(($DESIRED_IMAGE_WIDTH / $source_width) * 100);
		$tempWidth = round($source_width * $ratio / 100);	
		$tempHeight = round($source_height * $ratio / 100);	
	}else{
		$tempWidth = $source_width;	
		$tempHeight = $source_height;	
	}
	/*
	 * Resize the image into a temporary GD image
	 */
	$temp_gdim = imagecreatetruecolor($tempWidth, $tempHeight);
	imagecopyresampled(
		$temp_gdim,
		$source_gdim,
		0, 0,
		0, 0,
		$tempWidth, $tempHeight,
		$source_width, $source_height
	);
	
	imagejpeg($temp_gdim,$thumbURL);
	imagedestroy($temp_gdim);
	
	return true;
}


function makeSquareThumb($fileURL, $thumbURL, $width, $height){

	/*SET VARS*/
	$source_path = $fileURL;
	$DESIRED_IMAGE_WIDTH = $width;
	$DESIRED_IMAGE_HEIGHT = $height;


	/*
	 * Add file validation code here
	 */

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
	$desired_aspect_ratio = $DESIRED_IMAGE_WIDTH / $DESIRED_IMAGE_HEIGHT;

	if ($source_aspect_ratio > $desired_aspect_ratio) {
		/*
		 * Triggered when source image is wider
		 */
		$temp_height = $DESIRED_IMAGE_HEIGHT;
		$temp_width = ( int ) ($DESIRED_IMAGE_HEIGHT * $source_aspect_ratio);
	} else {
		/*
		 * Triggered otherwise (i.e. source image is similar or taller)
		 */
		$temp_width =$DESIRED_IMAGE_WIDTH;
		$temp_height = ( int ) ($DESIRED_IMAGE_WIDTH / $source_aspect_ratio);
	}

	/*
	 * Resize the image into a temporary GD image
	 */

	$temp_gdim = imagecreatetruecolor($temp_width, $temp_height);
	imagecopyresampled(
		$temp_gdim,
		$source_gdim,
		0, 0,
		0, 0,
		$temp_width, $temp_height,
		$source_width, $source_height
	);

	/*
	 * Copy cropped region from temporary image into the desired GD image
	 */

	$x0 = ($temp_width - $DESIRED_IMAGE_WIDTH) / 2;
	$y0 = ($temp_height - $DESIRED_IMAGE_HEIGHT) / 2;
	$desired_gdim = imagecreatetruecolor($DESIRED_IMAGE_WIDTH, $DESIRED_IMAGE_HEIGHT);
	imagecopy(
		$desired_gdim,
		$temp_gdim,
		0, 0,
		$x0, $y0,
		$DESIRED_IMAGE_WIDTH, $DESIRED_IMAGE_HEIGHT
	);

	/*
	 * Save the image in file-system or database
	 */
	imagejpeg($desired_gdim,$thumbURL);
}
/*
 * Add clean-up code here
 */
?>