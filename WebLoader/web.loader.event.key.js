var WebLoader = WebLoader||{};
/**
 * webLoader事件常量
 * @param {Object} window
 * @param {Object} module
 */
(function(window,module){
	
	module.LAYUI = {
		COLORPICKER : {
			DONE : "layui.colorpicker.done",
			SUCCESS : "layui.colorpicker.success"
		},
		SLIDER : {
			CHANGE : "layui.slider.change"
		},
		TABLE : {
			ONROWCLICK : "onRowClick",
			ONROWDBLCLICK : "onRowDBLClick",
			ONROWTOOLCLICK : "onRowTool",
			ONSELECTED : "onSelected",
			ONTOOLBAR : "onToolbar",
			ONBEFORESEND : "beforeSend",
			ONSUCCESSBEFORE : "onSuccessBefore",
			ONSUCCESS : "onSuccess",
			ONRESIZE : "onResize",
			ON : "on"
		}
	};
	
})(window,WebLoader.EVENT={});
