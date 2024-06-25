var WebLoader = WebLoader||{};

(function(window,module){
	
	let _resourceArray = {
		
		"jquery" : ["/jquery.1.9.1/jquery-1.9.1.min.js"],
		"jquery.1.8.3" : ["/jquery.1.8.3/jquery-1.8.3.js"],
		"jquery.1.9.1" : ["/jquery.1.9.1/jquery-1.9.1.min.js"],
		"jquery.mCustomScrollbar" : [
			"/jquery.mCustom-Scrollbar/jquery.mCustomScrollbar.css",
			"/jquery.mCustom-Scrollbar/jquery.mCustomScrollbar.concat.min.js"
//			"/jquery.mCustom-Scrollbar/jquery.mCustomScrollbar.js"
		],
		"jquery.ztreev3" : [
			"/jquery.zTree_v3/css/zTreeStyle/zTreeStyle.css",
			"/jquery.zTree_v3/jquery.bootstrap-ztree-style/bootstrapStyle.css",
			"/jquery.zTree_v3/js/jquery.ztree.all.min.js",
			"/jquery.zTree_v3/js/jquery.ztree.exhide.min.js",
			"/beyon/js/x.ztree.js",
		],
		"jquery.viewer" : [
			"/jquery.imageView/viewer.css",
			"/jquery.imageView/viewer-jquery.js",
		],
		"jquery.bootstrap.3.3.5" : [
			"/jquery.bootstrap-3.3.5/css/bootstrap.min.css",
			"/jquery.bootstrap-3.3.5/js/bootstrap.min.js"
		],
		
		"jquery.easyui" : [],
		"jquery.easyui.1.5.2" : [],
		"jquery.easyui.1.3.2" : [
			"/jquery.easyui/jquery-easyui-1.3.2/themes/default/easyui.css",
			"/jquery.easyui/jquery-easyui-1.3.2/jquery.easyui.min.js",
			"/beyon/js/x.util.easyui.js"
		],
		"jquery.easyui.1.7.0" : [],
		"jquery.toastr":[
			"/jquery.toastr/toastr.min.css",
			"/jquery.toastr/toastr.min.js",
			"/jquery.toastr/toastr.config.js"
		],
		"jquery.coco.message":[
			"/jquery.coco.message/coco-message.js",
		],
		
		"jquery.Tdrag":[
			"/jquery.Tdrag/Tdrag.js"
		],
		"jquery.qrcode":[
			"/jquery.qrcode/qrcode.js",
			"/jquery.qrcode/reqrcode.js"
		],
		
		
		"layui" : [
			"/layui.2.4.3/css/layui.css",
			"/layui.2.4.3/layui.all.js",
			"/web.loader/layui.2.4.3/css/layui.2.4.3.css",
		],
		"layui.2.4.3" : [
			"/layui.2.4.3/css/layui.css",
			"/layui.2.4.3/layui.all.js",
			"/web.loader/layui.2.4.3/css/layui.2.4.3.css",
		],
		"layui.2.4.5" : [
			"/layui.2.4.5/dist/css/layui.css",
			"/layui.2.4.5/dist/layui.all.js",
			"/web.loader/layui.2.4.3/css/layui.2.4.3.css",
		],
		"layui.2.5.3" : [
			"/layui-v2.5.3/dist/css/layui.css",
			"/layui-v2.5.3/dist/layui.all.js",
			"/web.loader/layui.2.4.3/css/layui.2.4.3.css",
		],
		"layui.2.5.6" : [
			"/layui-v2.5.6/layui/css/layui.css",
			"/layui-v2.5.6/layui/layui.all.js",
			"/web.loader/layui.2.4.3/css/layui.2.4.3.css",
		],
		"layui-scrollBar-vx" : [
			"/layui-scrollBar-vx/css/myScrollBar.css",
			"/layui-scrollBar-vx/zUI.js",
		],
		
		"ol" : [
			"/ol/4.6.5/ol.css",
			"/ol/4.6.5/ol-debug.js"
		],
		"ol.4" : [
			"/ol/4.6.5/ol.css",
			"/ol/4.6.5/ol-debug.js"
		],
		"ol.4.olext" : [
			"/ol/4.6.5/ol-ext-2.0.6/ol-ext.js"
		],
		"ol.5" : [
			"/ol/5.3/ol.css",
			"/ol/5.3/ol.js"
		],
		"ol.6" : [
			"/ol/6.4.3/ol_v6.4.3.css",
			"/ol/6.4.3/ol_v6.4.3.js"
		],
		"ol.6.olext" : [
			"/ol/6.4.3/ol-ext-3.1.11/ol-ext.css",
			"/ol/6.4.3/ol-ext-3.1.11/ol-ext.js"
		],
		
		"ol.6.plot" : [
			"/ol-plot/ol-plot.css",
			"/ol-plot/ol-plot.js"
		],
		
		"ol.plus" : [
			"/beyon/js/x.util.ol.plus.js"
		],
		"ol.cesium" : [
			"/ol.cesium/olcesium-debug.js"
		],
		"mackdown" : [
			"/mackdown/editormd/css/editormd.min.css",
			"/mackdown/editormd/editormd.js"
		],
		
		"baidu.echarts.4" : ["/baidu.echarts/echarts4/echarts.js"],
		"baidu.echarts.4.8" : ["/baidu.echarts.4.8/dist/echarts-en.min.js"],
		
		"highcharts-v8" : [
			"/highcharts/Highcharts-Gantt-8.2.2/code/css/highcharts.css",
			"/highcharts/Highcharts-Gantt-8.2.2/code/highcharts-gantt.js"
		],
		"highcharts-v8-exporting" : [
			"/highcharts/Highcharts-Gantt-8.2.2/code/modules/exporting.js"
		],
		
		"d3-v3" : ["/d3-v3/d3.min.js"],
		"d3-v6" : ["/d3-v6/d3.min.js"],
		
		"jsmind-v3" : [
			"/jsmind-v0.3-89/style/jsmind.css",
			"/jsmind-v0.3-89/js/jsmind.js",
			"/jsmind-v0.3-89/js/jsmind.draggable.js"
		],
		
		//复制组件
		"ZeroClipboard" : ["/ZeroClipboard/ZeroClipboard.min.js"],
		
		"animatelo" : [
			"/animatelo/web-animations.min.js",
			"/animatelo/animatelo.min.js"
		],
		
		//自定义工具类
		"x.loading" : ["/beyon/js/x.loading.js"],
		"x.plus.in" : ["/beyon/js/x.plus.in.js"],
		"x.template" : ["/beyon/js/artTemplate.js"],
		"x.table" : ["/beyon/x-table/x.table.js"],
		"x.accordion.menu" : [
			"/beyon/css/x.accordion.menu.css",
			"/beyon/js/x.accordion.menu.js"
		],
		"x.tree.menu" : [
			"/beyon/js/x.tree.menu.js"
		],
		"x.contextmenu" : [
			"/jquery.contextmenu/dist/BootstrapMenu.min.js",
			"/jquery.contextmenu/ClassContextMenu.js"
		],
		
		"x.file.upload" : [
			"/beyon.upload/file.plupload-2.1.0/js/plupload.full.min.js",
			"/beyon.upload/file.plupload-2.1.0/js/x-plupload-template.js",
			"/beyon.upload/Class.File.Upload.Control.js",
			"/beyon.upload/Class.File.Upload.Control.Main.js",
			"/beyon.upload/jquery.file.upload.js",
		],
		"x.file.upload.plus" : [
			"/beyon.upload/file.plupload-2.1.0/js/plupload.full.min.js",
			"/beyon.upload/file.plupload-2.1.0/js/x-plupload-template.js",
			"/beyon.upload/jquery.file.upload.js",
		],
		"x.video" : ["/ckplayerX/ckplayer/ckplayer.js"],
		"x.animatelo" : ["/animatelo/web-animations.min.js","/animatelo/animatelo.min.js"],
		"x.http.download" : ["/beyon/js/x.http.download.js"],
		"x.util.dragDiv" : ["/beyon/js/Tdrag.js","/beyon/js/x.util.dragDiv.js"],
		"x.util.window.message" : ["/beyon/js/x.util.window.message.js"],
		"x.util.layui.table" : [
			"/beyon/js/x.util.layui.table.js",
			"/web.loader/ext/module/resize/jquery.resize.js"
		],
		"x.util.slider" : [
			"/beyon/x.util.slider/x.util.slider.css",
			"/beyon/x.util.slider/x.util.slider.js"
		],
		"x.file.reader" : [
			"/file.reader/spark-md5.js",
			"/file.reader/Class.File.Reader.js"
		],
		"x.util.html2canvas":[
			"/beyon/js/html2canvas.js"
		],
		"x.util.HTML5Fullscreen":[
			"/beyon/js/x.util.HTML5Fullscreen.js"
		],
		"x.webSocket.stomp":[
			"/beyon.webSocket/stomp.js",
			"/beyon.webSocket/test.msgsocket.js",
			"/beyon.webSocket/class.webSocket.stomp.js",
		],
		"x.resize":[
			"/web.loader/ext/module/resize/jquery.resize.js",
		],
		"x.hookAjax" : [
			"/beyon/js/ajaxhook.min.js"
		],
		"webloader" : [
			"/web.loader/css/common.css",
			"/web.loader/css/web.loader.css",
			"/beyon/js/x.util.base.js"
		],
		"webloader.ext.ol" : [
			"/web.loader/ext/ol/ext/Array.js",
		],
	};
	
	module.add(_resourceArray);
	
})(window,WebLoader);
