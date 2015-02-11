<?php
class Module
{
	public static $module = "";
	public static $todo = "";
	public static $omit = false;
	public static $param = array();
	public static $debug = array();
	private static $jar;
		
	public function Module()
	{
	}

	public static function &singleton($className)
	{
        if (!is_array(self::$jar)) self::$jar = array();
        if (isset(self::$jar[$className])) {
            return self::$jar[$className];
        } else {
			$_className = Module::_loadClass($className);
			if(!empty($_className)) {
				$argv = func_get_args();
				unset($argv[0]);
				self::$jar[$_className] = new $_className;
				if (count($argv) > 0) {
					call_user_func_array(array(&self::$jar[$_className], $_className), $argv);
				}
				return self::$jar[$_className];
			} else {
				return false;
			}
        }
    }

	public static function &singletonExtends($className)
	{
        if (!is_array(self::$jar)) self::$jar = array();
        if (is_object(self::$jar[$className])) {
            return self::$jar[$className];
        } else {
            $_className = Module::_loadExtends($className);			
			if(!empty($_className)) {
				$argv = func_get_args();
				unset($argv[0]);
				self::$jar[$_className] = new $_className;
				if (count($argv) > 0) {
					call_user_func_array(array(&self::$jar[$_className], $_className), $argv);
				}
				return self::$jar[$_className];
			} else {
				return false;
			}
        }
    }
	
	private static function _loadClass($className)
	{
		$_classSrc = "";
		if(strpos($className,'.')) {			
			$_classArr	= explode(".", $className);
			for($i=0; $i<count($_classArr)-1; $i++)
			{
				$_classSrc .=  "/".$_classArr[$i];
			}
			$className = substr($className, strrpos($className, ".")+1, (strlen($className)-strrpos($className, ".")));
		}
		$classSrc = _DIR_MODEL.strtolower($_classSrc)."/".strtolower("class.".$className).".php";
		if(is_file($classSrc) && is_readable($classSrc)) {
			require_once($classSrc);
			if(class_exists($className)) {
				return $className;
			} else {
				Module::msg("2001", "클래스명=>$className");
				return false;
			}
		} else {
			Module::msg("2002", "클래스명=>$className <br/> 경로=>$classSrc <br/>");
			return false;
		}
	}
	
	private static function _loadExtends($extendsName)
	{
		$extendsSrc	 = _DIR_EXTENDS."/php.".$extendsName."/".$extendsName.".php";
		if(is_file($extendsSrc) && is_readable($extendsSrc)) {
			require_once($extendsSrc);
			if(class_exists($extendsName)) {
				return $extendsName;
			} else {
				Module::msg("2003", "확장모듈명=>$extendsName");
				return false;
			}
		} else {
			Module::msg("2004", "확장모듈명=>$extendsName <br/> 경로=>$extendsSrc <br/>");
			return false;
		}
	}

	public static function includeExtends($extendsName, $fileName)
	{
		$extendsSrc	 = _DIR_EXTENDS."/php.".$extendsName."/".$fileName.".php";
		if(is_file($extendsSrc) && is_readable($extendsSrc)) {
			require_once($extendsSrc);
		} else {
			Module::msg("2005", "확장모듈명=>$extendsName <br/> 경로=>$extendsSrc <br/>");
			return false;
		}
	}
	
	private static function _loadDb($dbName, $params)
	{
		$className = "Connect";
		$classSrc = _DIR_SYS."/".strtolower("sys.".$className).".php";
		if(is_file($classSrc) && is_readable($classSrc)) {
			// 클래스파일 include
			require_once($classSrc);
			if(class_exists($className))
			{
				$classObj = "return new {$className}(\"$dbName\"";
				if(count($params) > 0)
				{
					for($i=0;$i<count($params);++$i)
					{
						$classObj .= ",".$params[$i];
					}
				}
				$classObj .= ");";
				return eval($classObj);
			} else {
				Module::msg("2002", "경로=>$classSrc");
				return false;
			}
		}
	}	
	
	public static function loadDb($dbName)
	{
		if(func_num_args() > 0) {
			$params = array_slice(func_get_args(),1);
			$connect = Module::_loadDb($dbName, $params);
			//$connect->dbConnect($dbName);
			return $connect;
		} else {
			Module::msg("3005", "loadDb($dbName)을 확인하세요.");
			return false;
		}
	}
	
	public static function routeModule() 
	{	
		$uri = parse_url($_SERVER['REQUEST_URI']);
		$arr = explode("/", substr($uri['path'], 1, strlen($uri['path'])));		
		$_moduleName = (trim($arr[0]) == "") ? $_moduleName = "index" : $arr[0];
		if(trim($arr[1]) == "") {
			$_todoName = "";
		} else if(substr(trim($arr[1]),0,1) == "@") {
			$_todoName = "";
			Module::$omit = true;
		} else {
			$_todoName = $arr[1];
		}
		$pattern = '/[^\x{1100}-\x{11FF}\x{3130}-\x{318F}\x{AC00}-\x{D7AF}0-9a-zA-Z]+/u';		
		for($i=1; $i<sizeof($arr); $i++) {
			if($i == 1) {
				if(Module::$omit == true) $arr[$i] = substr($arr[$i], 1, strlen($arr[$i]));
				else $i++;
			}
			$arr[$i] = urldecode($arr[$i]);
			$arr[$i] = preg_replace($pattern, "", $arr[$i]);
			Module::$param[] = $arr[$i];   
		}
		Module::$module = $_moduleName;
		Module::$todo = $_todoName;
		$PRIV = &Module::singleton("Priv");
		$PRIV->isPriv(Module::$module, Module::$todo, $_SESSION);
		$_todoArr	= explode(".", $_todoName);
		$_length = count($_todoArr);
		for($i=0; $i<$_length; $i++)
		{
			if($i==($_length-1)) {
				$_proc = ($_todoArr[$i] == "proc") ? true : false;
			}
		}		
		$_moduleSrc = "";
		switch($_moduleName)
		{			
			case "common" : 
				GLOBAL $FRAME;
				$FRAME = "none";
				if(Module::isAllowDomain() == true) {
					$_moduleSrc ="/_global/common.php";
				} else {
					//Module::msg("6001");
					Module::exitModule();
				}
				break;
			case "parking" : 
				GLOBAL $FRAME;
				$FRAME = "parking";
				$_moduleSrc ="/_global/parking.php";
				break;
			case "notpage" : 
				GLOBAL $FRAME;
				$FRAME = "notpage";
				$_moduleSrc ="/_global/notpage.php";
				break;
			case "manager" : 
				GLOBAL $FRAME;
				$FRAME = "manager";
			case "login" : 
				GLOBAL $FRAME;
				$FRAME = "login";
			default :
				if(is_numeric($_moduleName)) {
					GLOBAL $FRAME;
					$FRAME = "socialbar";
					$_moduleSrc ="/socialbar/index.php";
					break;
				}
				if($_proc == true) {
					if(Module::isAllowDomain() == true) {
						$_moduleSrc = $_moduleName."/_proc.php";
					} else {
						//Module::msg("6001");
						Module::exitModule();
					}
				} else if($_todoName == "") {
					$_moduleSrc = $_moduleName."/index.php";
				} else {
					$_moduleSrc = $_moduleName."/".$_moduleName.".".$_todoName.".php";
				}
				$moduleFrameSrc = _DIR_CONTROLLER."/".$_moduleName."/_frame.php";
				if($_moduleName != "manager") {
					if(is_file($moduleFrameSrc) && is_readable($moduleFrameSrc)) {
						include_once $moduleFrameSrc;
					} else {
						Module::msg("1002", "MODULE => $_moduleName <br /> TODO => frame<br/>");
						//Module::redirect("/");
						Module::redirect("/notpage");
					}
				}
				break;
		}
		
		$moduleSrc = _DIR_CONTROLLER."/".$_moduleSrc;
		
		if(is_file($moduleSrc) && is_readable($moduleSrc)) {
			include_once $moduleSrc;
		} else {
			//$msg = urlencode($moduleName." 모듈이 존재하지 않습니다.");
			Module::msg("1002", "MODULE => $_moduleName <br /> TODO => $_todoName<br/>");
			//Module::redirect("/");
			Module::redirect("/notpage");
			return false;
		}
	}
	
	private static function isAllowDomain()
	{
		$url = parse_url($_SERVER['HTTP_REFERER']);
		if($url['host'] == $_SERVER['HTTP_HOST']) {
			return true;
		} else {
			return false;
		}
	}

	public static function loadConf($confSrc, $section=false)
	{
		if(is_file($confSrc) && is_readable($confSrc)) {
			$confInfo = parse_ini_file($confSrc, $section);
			return $confInfo;
		} else {
			// Module::msg("1005", "경로=>$confSrc <br/>");
			return false;
		}
	}

	public static function frame($frameName)
	{
		GLOBAL $FRAME;
		$FRAME = $frameName;
	}
	
	public static function exitModule()
	{
		global $CONNECT;
		if(count($CONNECT) > 0) {
			foreach($CONNECT as $key => $val) {
				unset($CONNECT[$key]);
			}
		}
		exit;
	}
	
	public static function result($res, $field="", $val="")
	{
		$cnt = 0;
		for($i=0; $i<sizeof($res); $i++) {
			if($field == "") {
				if($res[$i] == false) {
					$cnt++;
				}
			} else {
				if($res[$i][$field] == $val) {
					$cnt++;
				}	
			}
		}
		if($cnt > 0) {
			return false;
		} else {
			return true;
		}
	}

	public static function startPage($module)
	{
		GLOBAL $SITE;
		$exceptArr = array("", "/", "index");
		if($SITE['STARTPAGE'] == "Y" && ($module == "" || $module == "index")) {
			if(!in_array($SITE['STARTMODULE'], $exceptArr)) {
				Module::redirect($SITE['STARTMODULE']);
			}
		}
	}
	
	public static function parking($module)
	{
		GLOBAL $SITE;	
		$exceptArr = array("parking", "manager");
		if($SITE['PARKING'] == "Y" && !in_array($module, $exceptArr)) {			
			Module::redirect("/parking");
		} elseif($SITE['PARKING'] == "N" && $module == "parking") {
			Module::redirect("/");
		}
	}
	
	public static function msg($msgNo, $msgAdd="")
	{
		if(_MSG == true) {
			$msgInfo = Module::loadConf(_DIR_CONF."/msg.ini", true);
			$msg = $msgInfo[$msgNo];
			if(strlen(trim($msg))>0) {
				print("<div class='module-msg'>");
				print("<h3>☞ [".$msgNo."] ".$msg."</h3>");
				if(strlen(trim($msgAdd))>0) {
					print("<br />");
					print($msgAdd);
				}
				print("</div>");
			} else {
				if(strlen(trim($msgAdd))>0) {
					print($msgAdd);
				}
			}
			Module::exitModule();
		} else {
			//Module::redirect("/notpage");
		}
	}
	
	public static function error($errno, $errstr, $errfile, $errline, $errcontext)
	{
		print("<div class='module-msg'>");
		print("<h4>☞ [".$errno."] ".$errstr."</h4>");
		print("<h6>파일명 : ".$errfile." => ".number_format($errline)." 째 줄</h6>");
		//print("<h5>=================================================================</h5>");
		//print("에러내용 :<br />");
		//print("<pre>");
		//print_r($errcontext);
		//print("</pte>");
		//print("</div>");
		//Module::exitModule();
	}

	public static function debug($msgNo, $msgAdd="")
	{
		if(_DEBUG == true) {
			$msgInfo = Module::loadConf(_DIR_CONF."/msg.ini", false);
			$msg = $msgInfo[$msgNo];
			$_debug = "";
			$_debug .= "<div class='module-msg'>";
			if(strlen(trim($msg))>0) {
				$_debug .= "<h3>☞ [".$msgNo."] ".$msg."</h3>";
				if(strlen(trim($msgAdd))>0) {
					$_debug .= "<br />".$msgAdd;
				}
			} else {
				if(strlen(trim($msgAdd))>0) {
					$_debug .= $msgAdd;
				}
			}
			$_debug .= "</div>";
			Module::$debug[sizeof(Module::$debug)+1] = $_debug;
		}
	}

	public static function debugMsg()
	{
		if(_DEBUG == true) {
			$_debug = "";
			for($i=0; $i<sizeof(Module::$debug); $i++) {
				$_debug .= Module::$debug[$i];
			}
			print($_debug);
		}
	}

	public static function runTimeMsg($sTime, $eTime)
	{
		if(_DEBUG == true) {
			$_debug = "";
			$_debug .= "<div class='module-msg'>";
			$_debug .= "<h3>☞ 페이지 처리시간 </h3><br />";
			$_debug .= "시작시간 => ".$sTime." sec<br />";
			$_debug .= "종료시간 => ".$eTime." sec<br />";
			$_debug .= "수행시간 => ".($eTime-$sTime)." sec<br />";
			$_debug .= "</div>";
			print($_debug);
		}
	}
	
	public static function getMicroTime()
	{
		list($usec, $sec) = explode(" ", microtime());
		return ((float)$usec + (float)$sec);
	}

	public static function getRunTime($sTime=0, $eTime=0)
	{
		if($eTime >= $sTime) {
			return $eTime-$sTime;
		} else {
			return 0;
		}
	}
		
	public static function alert($msg)
	{
		$script = "alert(\"".$msg."\");";
		Module::callScript($script);
	}

	public static function close($msg="") {
		if(!empty($msg) && strlen($msg) > 0) {
			$msg = "alert(\"$msg\");";
		}
		$script = $msg."self.close();";
		Module::callScript($script);
	}

	public static function redirect($retUrl)
	{
		$script = "document.location = \"".$retUrl."\";\n";
		Module::callScript($script);
	}

	public static function redirectModule($module="", $todo="", $param="", $target="")
	{
		if(!empty($target) && strlen($target) > 0) $target .= ".";
		if(is_array($param)) {
			for($i=0; $i<count($param); $i++) {
				$_param .= ($i ==0) ? $param[$i] : "/".$param[$i]; 
			}
		} else {
			$_param = $param;
		}
		$script = $target."document.location = \"/".$module;
		if($todo != "" && $_param == "") {
			$script .= "/".$todo;	
		}
		if($todo != "" && $_param != "") {
			$script .= "/".$_param;
		}
		$script .= "\";\n";
		Module::callScript($script);
	}

	public static function reloadModule($target="")
	{
		if(!empty($target) && strlen($target) > 0) $target .= ".";
		$script = $target."document.location.reload();\n";
		Module::callScript($script);
	}

	public static function callScript($script)
	{
		//print "<html><head><title>callScript</title></head><body>";
		print "<script type=\"text/javascript\">\n";
		print $script."\n";
		print "</script>";
		//print "</body></html>";
	}

	public static function submitForm($form, $module, $todo, $method, $arr)
	{
		$html = "";
		$module = "/?_module=".$module;
		$html.= "\n<form name='".$form."' id='".$form."' action='".$module."' method='".$method."'>\n";
		foreach($arr as $key=>$value)
		{
			$html .= "<input type='hidden' name='".$key."' id='".$key."' value='".$value."' />\n";
		}
		$html.= "</form>";
		$script = "";
		$script .= "var form = document.".$form.";\n";
		$script .= "form.submit();\n";
		print $html;
		Module::callScript($script);
	}

	public static function submitFormOut($form, $url, $method, $arr)
	{
		$html = "";
		$html.= "\n<form name='".$form."' id='".$form."' action='".$url."' method='".$method."'>\n";
		foreach($arr as $key=>$value)
		{
			$html .= "<input type='hidden' name='".$key."' id='".$key."' value='".$value."' />\n";
		}
		$html.= "</form>";
		$script = "";
		$script .= "var form = document.".$form.";\n";
		$script .= "form.submit();\n";
		print $html;
		Module::callScript($script);
	}
}
?>