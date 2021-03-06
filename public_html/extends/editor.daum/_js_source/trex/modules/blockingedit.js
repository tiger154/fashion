
Trex.module("Register an eventhandler in order to block resizing and editing search results & some images in wysiwig panel.",
	function(editor, toolbar, sidebar, canvas, config) {
		
		if ($tx.msie) {
			var _blockResizeHandler = function(element) {
				if (element.onresizestart == null) {
					element.onresizestart = function() {
						return false;
					};
				}
			};
			canvas.observeElement({ tag: "img", klass: "_tx-unresizable" }, _blockResizeHandler);
			canvas.observeElement({ tag: "img", klass: "tx-entry-attach" }, _blockResizeHandler);
			canvas.observeElement({ tag: "img", klass: "txc-footnote" }, _blockResizeHandler);
			canvas.observeElement({ tag: "iframe", klass: "txc-map" }, _blockResizeHandler); 
		}
		
		var _blockSelectHandler;
		if ($tx.msie) {
			_blockSelectHandler = function(element) {
				element.setAttribute("unselectable", "on");
				$A(element.getElementsByTagName("*")).each(function(child) {
					if (child.nodeName.charAt(0) != "/") {
						child.setAttribute("unselectable", "on");
					}
				});
				var _processor = canvas.getProcessor();
				_processor.selectControl(element);
			};
		} else {
			_blockSelectHandler = function(element) {
				var _processor = canvas.getProcessor();
				_processor.selectControl(element);
				throw $stop;
			};
		}
		canvas.observeElement({ tag: "button" }, _blockSelectHandler);
		canvas.observeElement({ tag: "img" }, function(element) {
			var _button = $tom.find(element, 'button');
			if(_button) {
				_blockSelectHandler(_button);
				throw $stop;
			} 
		});
	}
);	
