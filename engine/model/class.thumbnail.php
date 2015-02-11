<?php
class Thumbnail
{
	public function Thumbnail()
	{
	}

	public function checkFile($file)
	{
		$img = getimagesize($file);
		if($img[2] == 1 || $img[2] == 2 || $img[2] == 3) {
			return true;
		} else {
			return false;
		}
	}

	public function create($file, $thumb, $width, $height)
	{
		$GD = gd_info();
		$version = substr(preg_replace("/[^0-9]/", "", $GD['GD Version']), 0, 1);
		if(!$version) {
			//return "GD가 설치 되어있지 않거나 버젼이 1 미만입니다.";
			return false;
		}

		$img = getimagesize($file);

		//if($img[2] != 1 && $img[2] != 2 && $img$thumb && $img[2] != 6) {
		if($img[2] != 1 && $img[2] != 2 && $img[2] != 3) {
			//return "확장자가 jp(e)g/png/gif 가 아닙니다.";
			return false;
		} else {
			if($img[2] == 1) {
				$cFile = imagecreatefromgif($file);
			} elseif($img[2] == 2) {
				$cFile = imagecreatefromjpeg($file);
			} elseif($img[2] == 3) {
				$cFile = imagecreatefrompng($file);
			} elseif($img[2] == 6) {
				$cFile = imagecreatefromwbmp($file);
			} else {
				$cFile = imagecreatefromgif($file);
			}
			if($version == 2) {
				$dest = imagecreatetruecolor($width, $height);
				imagecopyresampled($dest, $cFile, 0, 0, 0, 0, $width, $height, $img[0], $img[1]);
			} else {
				$dest = imagecreate($width, $height);
				imagecopyresized($dest, $cFile, 0, 0, 0, 0, $width, $height, $img[0], $img[1]);
			}
			if($img[2] == 1) {
				imagegif($dest, $thumb, 90);
			} elseif($img[2] == 2) {
				 imagejpeg($dest, $thumb, 90);
			} elseif($img[2] == 3) {
				imagepng($dest, $thumb, 9);
			} elseif($img[2] == 6) {
				image2wbmp($dest, $thumb, 90);
			} else {
				imagegif($dest, $thumb, 90);
			}
			imagedestroy($dest);
			return true;
		}
	}
	/******************************************
	 - FASSION : REACTANGLE RESIZED THUMBNAIL
	*******************************************/
	public function makeRectangleThumb($fileURL,$thumbURL,$width, $height){
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
			$tempWidth = $DESIRED_IMAGE_WIDTH;// round($source_width * $ratio / 100);	
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
		
		imagegif($temp_gdim,$thumbURL);		
		imagedestroy($temp_gdim);
		
		return true;
	}

	/******************************************
	 - FASSION : SQUARE RESIZED+CROP THUMBNAIL
	*******************************************/
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
		imagegif($desired_gdim,$thumbURL);
		imagedestroy($temp_gdim);
		return true;
	}
	public function getThumbname($filename)
	{
		$_filename = substr($filename,0,strrpos($filename,"."));
		$_extname = substr(strrchr($filename,"."),1);
		if($_extname == "bmp") {
			$_extname = "gif";
		}
		$thumbname = $_filename."_thumb.".$_extname;
		return $thumbname;
	}
}
?>