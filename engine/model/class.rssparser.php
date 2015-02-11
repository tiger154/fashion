<?php

class RSSParser {
	
	var $parser;

    var $insideTag	= '';
    var $activeTag	= '';
    var $channel	= array();

    var $items		= array();
    var $item		= array();

	var $images		= array();
    var $image		= array();

    var $textinput	= array();
    var $textinputs	= array();

    var $parentTags		= array('CHANNEL', 'ITEM', 'IMAGE', 'TEXTINPUT');
	var $channelTags	= array('TITLE', 'LINK', 'DESCRIPTION', 'LANGUAGE','COPYRIGHT','MANAGINGEDITOR',
								'WEBMASTER','PUBDATE','LASTBUILDDATE','CATEGORY','GENERATOR','DOCS','CLOUD',
								'TTL','RATING','SKIPHOURS','SKIPDAYS','IMAGE','ITEMS', 'TEXTINPUT');
    var $itemTags		= array('TITLE', 'LINK', 'DESCRIPTION', 'AUTHOR','CATEGORY','COMMENTS','ENCLOSURE','GUID','PUBDATE','SOURCE');
    var $imageTags		= array('TITLE', 'URL', 'LINK','WIDTH','HEIGHT','DESCRIPTION');
    var $textinputTags	= array('TITLE', 'DESCRIPTION', 'NAME', 'LINK');
    var $moduleTags		= array('DC:TITLE', 'DC:CREATOR', 'DC:SUBJECT', 'DC:DESCRIPTION',
							    'DC:PUBLISHER', 'DC:CONTRIBUTOR', 'DC:DATE', 'DC:TYPE',
								'DC:FORMAT', 'DC:IDENTIFIER', 'DC:SOURCE', 'DC:LANGUAGE',
								'DC:RELATION', 'DC:COVERAGE', 'DC:RIGHTS',
								'BLOGCHANNEL:BLOGROLL', 'BLOGCHANNEL:MYSUBSCRIPTIONS',
								'BLOGCHANNEL:MYSUBSCRIPTIONS', 'BLOGCHANNEL:CHANGES');

	public function RSSParser(){
		$this->_create();
	}

	private function _create() {
		$this->parser = @xml_parser_create();
		if (is_resource($this->parser)) {
			xml_set_object($this->parser, &$this);
			xml_set_element_handler($this->parser, "startHandler", "endHandler");
			xml_set_character_data_handler($this->parser, "cdataHandler");
			return true;
		}
		return false;
    }

	public function free(){
		if(is_resource($this->parser)) {
			xml_parser_free($this->parser);
			unset( $this->parser );
		}
		return null;
    }

	private function startHandler($parser, $element, $attr){
		switch ($element) {
			case 'CHANNEL':
			case 'ITEM':
			case 'IMAGE':
			case 'TEXTINPUT':
				$this->insideTag = $element;
				break;
			default:
			$this->activeTag = $element;
		}
	}

	private function endHandler($parser, $element){
		if ($element == $this->insideTag) {
			$this->insideTag = '';
			$this->struct[] = array_merge(array('type' => strtolower($element)), $this->last);
		}
		if ($element == 'ITEM') {
			$this->items[] = $this->item;
			$this->item = '';
		}
        if ($element == 'IMAGE') {
        	$this->images[] = $this->image;
			$this->image = '';
		}
        if ($element == 'TEXTINPUT') {
        	$this->textinputs = $this->textinput;
			$this->textinput = '';
        }
        $this->activeTag = '';
    }

	private function cdataHandler($parser, $cdata) {
		if (in_array($this->insideTag, $this->parentTags)) {
			$tagName = strtolower($this->insideTag);
			$var = $this->{$tagName . 'Tags'};
			if (in_array($this->activeTag, $var)){
				$this->_add($tagName, strtolower($this->activeTag),$cdata);
			} elseif(in_array($this->activeTag, $this->moduleTags)) {
				$this->_add($tagName, strtolower($this->activeTag),$cdata);
			}
		}
	}

	private function _add($type, $field, $value)
	{
		if (empty($this->{$type}) || empty($this->{$type}[$field])) {
			$this->{$type}[$field] = $value;
		} else {
			$this->{$type}[$field] .= $value;
		}
		$this->last = $this->{$type};
	}

	public function parse($data){
		xml_parse($this->parser,$data);
		return true;
	}

	public function getStructure()
	{
		return (array)$this->struct;
    }

	public function getChannel()
	{
		return (array)$this->channel;
	}

	public function getItems()
	{
		return (array)$this->items;
	}

	public function getImages()
	{
		return (array)$this->images;
	}

	public function getTextinputs()
	{
		return (array)$this->textinputs;
	}
}
?>