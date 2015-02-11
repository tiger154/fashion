TrexConfig.addTool(
	"badkeyword", 
	{
		wysiwygonly: false,
		status: false
	}
);
Trex.Tool.BadKeyword = Trex.Class.create({
	$const: {
		__Identity: 'badkeyword'
	},
	$extend: Trex.Tool,
	oninitialized: function(config) {
		var _editor = this.editor;
		var _badKeywords = ['����',  '����','ī����'];
		var _toolHandler = function() {
			var content = _editor.getContent();
			for( var i = 0; i < _badKeywords.length; i++ ){
				if ( (new RegExp(_badKeywords[i])).test(content) ){
					alert( 'bad keyword : "'+ _badKeywords[i] + '"��(��) ����Ǿ����ϴ�.');
					return;
				}
			}
			
			alerht('�������� �����ϳ׿�~');
		};
		this.weave.bind(this)(
			new Trex.Button(this.buttonCfg), 
			null,
			_toolHandler
		);
	}
});
