
TrexMessage.addMsg({
	'@canvas.unload.message': "지금까지 작성된 글은 안전하게 자동 저장되어, 회원님이 다시 글쓰기 하실 때 불러올 수 있습니다.",
	'@canvas.unload.message.at.modify': "지금까지 작성된 글은 안전하게 자동 저장되어, 회원님이 다시 수정하실 때 불러올 수있습니다."
});

Trex.install("editor.isDisableUnloadHandler & editor.setDisableUnloadHandler",
	function(editor, toolbar, sidebar, canvas, config){
		var _beforeUnloadCheck = true;
		editor.isDisableUnloadHandler = function(unloadCheck) {
			return _beforeUnloadCheck;
		};
		editor.setDisableUnloadHandler = function() {
			_beforeUnloadCheck = false;
		};
	}
);
	
Trex.module("observing beforeunload event",
	function(editor, toolbar, sidebar, canvas, config) {
		var _evConfig = config.events;
		var _validator = new Trex.Validator();
		$tx.observe(window, 'beforeunload', function(ev) {
			canvas.fireJobs(Trex.Ev.__CANVAS_BEFORE_UNLOAD);
			if (editor.isDisableUnloadHandler()) {
				if (_evConfig.preventUnload) {
 				    //NOTE: exists content
					if (_validator.exists(canvas.getContent())) {
						ev.returnValue = TXMSG("@canvas.unload.message");
						return TXMSG("@canvas.unload.message");   // for safari
					}
				}
			}
		}, false);
	}
);
	