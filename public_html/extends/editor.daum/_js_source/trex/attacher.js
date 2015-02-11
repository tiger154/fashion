/**
 * @filewoverview 
 * attacher.js - 첨부 관련 source로 이 소스에서 존재하는 Attacher들을 직접 생성한다. 
 * Editor가 생성될때 initialize된다.
 */

TrexMessage.addMsg({
	'@attacher.can.modify.alert': "기존에 등록된 #{title}를 수정할 수 있는 화면으로 이동합니다.",
	'@attacher.can.modify.confirm': "#{title}은(는) 하나만 등록이 가능합니다.\n다시 올리시면 기존의 #{title}이(가) 삭제됩니다. 계속하시겠습니까?",
	'@attacher.insert.alert': "에디터 상태에서만 삽입할 수 있습니다.",
	'@attacher.capacity.alert': "용량을 초과하였습니다.",
	'@attacher.size.alert': "용량을 초과하여 더이상 등록할 수 없습니다."
});	

Trex.install("sidebar.getAttacher & sidebar.getUploadAdaptor",
	function(editor, toolbar, sidebar, canvas, config) {
		var _attachBox = editor.getAttachBox();
		var _attachers = sidebar.attachers = {};
		
		/**
		 * memberOf Trex.Sidebar.prototype
		 * @param {Object} name
		 */
		sidebar.getAttacher = function(name) {
			if(_attachers[name] != null) {
				return _attachers[name];
			} else if(arguments.length == 0){
				return _attachers;
			}else{
				return null;
			}
		};
		
	}
);

Trex.register("new attachers",
	function(editor, toolbar, sidebar, canvas, config) {
		var _attachBox = editor.getAttachBox();
		var _attachers = sidebar.attachers;
		
		for(var i in Trex.Attacher) {
			var _name = Trex.Attacher[i]['__Identity'];
			if(_name){
				if(!toolbar.tools[_name]){
					console.log(["No tool '",_name,"', but Attacher '", _name, "' is initialized."].join(""));
				}
				_attachers[_name] = new Trex.Attacher[i](editor, _attachBox, config); 
			}
		}
		
		if (_attachers["file"]) {
			sidebar.getUploadAdaptor = function(){
				return _attachers["file"].getAdaptor();
			};
		}
	}
);

/**
 * Class Trex.Attacher 
 * 
 * @abstract
 * @class
 * @extends Trex.Actor
 * @param {Object} editor
 * @param {Object} entryBox
 * @param {Object} config 
 */
Trex.Attacher = Trex.Class.draft(/** @lends Trex.Attacher.prototype */{
	/** @ignore */
	$extend: Trex.Actor,
	canModified: false,
	canResized: false,
	initialize: function(editor, entryBox, config) {
		this.editor = editor;
		this.canvas = editor.getCanvas();
		this.entryBox = entryBox;

		this.pvUrl =  TrexConfig.getUrl(config.pvpage, { "pvname": this.name });
		
		var _config = this.config = TrexConfig.getAttacher(this.constructor.__Identity, config);
		this.boxonly = ((_config.boxonly != null)? _config.boxonly: false); //NOTE: insert panel
		this.isMultiple = ((_config.multiple != null)? _config.multiple: false);
		this.isCheckSize = ((_config.checksize != null)? _config.checksize: false);
		this.wysiwygonly = ((_config.wysiwygonly != null)? _config.wysiwygonly: true);
		this.pastescope = _config.pastescope;
		
		if (this.oninitialized) {
			this.oninitialized(config);
		}
		/* entry create */
		this.attachHandler = this.attachHandler.bind(this);
	},
	/**
	 * Attacher를 실행, 첨부를 하기 위한 popup window를 띄워주거나 필요한 action을 수행한다.
	 * @param {String} param - 팝업을 띄울때 추가할 파라미터 문자열 
	 * @function
	 */
	execute: function(param) {
		if(this.wysiwygonly && !this.canvas.canHTML()) {
			alert(TXMSG("@attacher.insert.alert"));
			return;
		}

		if(this.isCheckSize && !this.entryBox.checkAvailableCapacity()) {
			alert(TXMSG("@attacher.capacity.alert"));
			return;
		}

		if(!this.checkInsertable()) {
			if(this.canModified) {
				var _jstObj = new Template( TXMSG("@attacher.can.modify.alert") );
				alert( _jstObj.evaluate( {title : this.title}));
			} else {
				var _jstObj = new Template( TXMSG("@attacher.can.modify.confirm") );
				if(!confirm(_jstObj.evaluate({ title : this.title }))) {
					return;
				}
			}
		}
		if(this.clickHandler) {
			this.clickHandler();
		} else {
			try {
				var _url = this.config.popPageUrl;
				if(param) {
					_url = _url + ((_url.indexOf("?") > -1) ? "&" : "?") + param;
				}
				_url = ((this.config.usepvpage)? this.pvUrl+"&u="+escape(_url): _url);
				var _win = window.open(_url, "at" + this.name, this.config.features);
				_win.focus();
			} catch (e) {}
		}
	},
	/**
	 * Argument의 data를 이용해서 editor에 첨부하며, Attacher type에 때라 data의 format은 다르다.  
	 * @function
	 * @param {Object} data
	 * @param {Object} attachmentType - optional
	 */
	attachHandler: function(data, attachmentType) {
		if(this.checkInsertable()) {
			if(this.isCheckSize && !this.entryBox.checkInsertableSize(data.filesize)) {
				alert(TXMSG("@attacher.size.alert"));
				return;
			}
			this.execAttach(data,  attachmentType);
		} else {
			this.execReattach(data,  attachmentType);
		}
	},
	createEntry: function(data, type) {
		return this.createAttachment(data, type);
 	},
	createAttachment: function(data, type) {
		var _attachmentType = this.constructor.__Identity;
		if(type){
			_attachmentType = type;
		}
		return new Trex.Attachment[_attachmentType.capitalize()](this, data);
	},
	checkInsertable: function() {
		return (this.isMultiple || this.getDatalist().length === 0);
	}
});
