<?php /* Template_ 2.2.4 2013/02/05 14:42:46 /www/fassion10/engine/view/V3.9/_global/_frame.htm 000004722 */ ?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="ko" lang="ko">
<head>
<title><?php echo $TPL_VAR["SITE"]["TITLE"]?>:::<?php echo $TPL_VAR["subject"]?></title>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta http-equiv="Content-Script-Type" content="text/javascript" />
<meta http-equiv="Content-Style-Type" content="text/css" />
<meta http-equiv="X-UA-Compatible" content="IE=edge" />

<meta http-equiv="imagetoolbar" content="no" />
<meta name="Subject" content="<?php echo $TPL_VAR["SITE"]["DOMAIN"]?>" />
<meta name="verify-v1" content="c7qPZTfB1pUMtQBmsxdVRpF2Rn4M5+mypsJhQ1yQds4=" />
<meta name="Author" content="<?php echo $TPL_VAR["SITE"]["NAME"]?>" />
<meta name="Publisher" content="<?php echo $TPL_VAR["DOMAIN"]?>" />
<meta name="Other Agent" content="<?php echo $TPL_VAR["SITE"]["EMAIL"]?>" />
<meta name="keywords" content="<?php echo $TPL_VAR["SITE"]["KEYWORDS"]?>" />
<!--link rel="shortcut icon" href="<?php echo $TPL_VAR["IMAGES"]?>/common/favicon.ico" type="image/x-icon" /-->
<!--link rel="icon" href="<?php echo $TPL_VAR["IMAGES"]?>/common/favicon.ico" type="image/x-icon" /-->

<link rel="stylesheet" type="text/css" href="<?php echo $TPL_VAR["CSS"]?>/_global/default.css" />
<link rel="stylesheet" type="text/css" href="<?php echo $TPL_VAR["CSS"]?>/_global/popup.css" />
<link rel="stylesheet" type="text/css" href="<?php echo $TPL_VAR["CSS"]?>/_global/_common.css" />
<link type="text/css" rel="stylesheet" href="<?php echo $TPL_VAR["CSS"]?>/<?php echo $TPL_VAR["MODULE"]?>.css" />
<script type="text/javascript" src="<?php echo $TPL_VAR["EXTENDS"]?>/js.jquery/jquery.js"></script>
<script type="text/javascript" src="<?php echo $TPL_VAR["EXTENDS"]?>/js.jquery.ui/jquery-ui-1.8.13.custom.min.js"></script>
<script src="<?php echo $TPL_VAR["EXTENDS"]?>/js.jquery.masonry/jquery.masonry.min.js"></script>
<script src="http://masonry.desandro.com/js/jquery.infinitescroll.min.js"></script>
<script type="text/javascript" src="<?php echo $TPL_VAR["JS"]?>/<?php echo $TPL_VAR["MODULE"]?>.js"></script>
<script type="text/javascript" src="<?php echo $TPL_VAR["JS"]?>/_global/common.js"></script>
<script type="text/javascript" src="<?php echo $TPL_VAR["JS"]?>/_global/item.js"></script>
<script type="text/javascript" src="<?php echo $TPL_VAR["JS"]?>/_global/layout.js"></script>
<script type="text/javascript" src="<?php echo $TPL_VAR["JS"]?>/_global/login.js"></script>
<script type="text/javascript" src="<?php echo $TPL_VAR["JS"]?>/_global/validation.js"></script>
<script type="text/javascript" src="<?php echo $TPL_VAR["JS"]?>/_global/jquery.init.js"></script>
<script type="text/javascript" src="<?php echo $TPL_VAR["JS"]?>/_global/context.js"></script>
<script type="text/javascript" src="<?php echo $TPL_VAR["JS"]?>/_global/api.js"></script>
<script type="text/javascript">
var DOMAIN = "<?php echo $TPL_VAR["DOMAIN"]?>";
var DOMAIN_FILE = "<?php echo $TPL_VAR["DOMAIN_FILE"]?>/fassion/";
var MOUDLE = "<?php echo $TPL_VAR["MODULE"]?>";
var TODO = "<?php echo $TPL_VAR["TODO"]?>";
var REQUEST_URI = "<?php echo $TPL_VAR["REQUEST_URI"]?>";
var IMAGES = "<?php echo $TPL_VAR["IMAGES"]?>";
var USER = "<?php echo $_SESSION["userno"]?>";
</script>
<!-- 구글 log 스크립트 -->
<script type="text/javascript">

  var _gaq = _gaq || [];
  _gaq.push(['_setAccount', 'UA-5555634-2']);
  _gaq.push(['_setDomainName', 'revu.co.kr']);
  _gaq.push(['_setAllowLinker', true]);
  _gaq.push(['_trackPageview']);

  (function() {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
  })();

</script>
<!-- 구글 log 스크립트 /-->
</head>
<body>
<div id="dialog"></div><!-- jQuery plugin dialog 알림용-->
<div id="dialog2"></div><!-- jQuery plugin dialog 알림용-->
<div id="dialog-modal"></div><!-- jQuery plugin dialog 알림용-->
<div id="progressbar"></div>
<div id="popuplayer"></div>
<div id="bglayer"></div><!-- 모달 백그라운드 용-->
<div id="context-user"></div>
<div id="helplayer"></div>


<div id="header"><?php $this->print_("top",$TPL_SCP,1);?></div>	
<div id="container"><?php $this->print_("mframe",$TPL_SCP,1);?></div>	

<div id="loginlayer"><?php $this->print_("loginlayer",$TPL_SCP,1);?></div>
<?php $this->print_("etcscript",$TPL_SCP,1);?>

</body>
</html>