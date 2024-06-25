(function($,x,layui){
	var layer = layui.layer;
	if(x===undefined){
		x = {};
	}
	x.pjax = {
		defaultIndex : "/welcome"
	};
	
	if('onhashchange' in window){
		window.onhashchange=function(){
			//x.pjax.load(location.hash);
		}
	}
	
	x.pjax.setHash = function(h){
		h = (h===undefined || h=="") ? x.pjax.defaultIndex : h,
		h = h.replace(/^(\#\!)?\#/, "");
		h = "#"+h;
	
		if(h!==x.pjax.defaultIndex){
			if (!!(window.history && history.pushState)){
			  // 支持History API
			  window.history.pushState(null, null, h);
			  window.history.replaceState({state:1,url:h},"title",h);
			} else {
			  // 不支持
			  window.location.hash = h;
			}
			x.pjax.defaultIndex = h;
		}		
		x.pjax.load();
	}
	
	x.pjax.load = function(){
		var hash = location.hash;
		if(hash===undefined || hash==null || hash==""){
			hash = x.pjax.defaultIndex;
		}
		var _go_url = hash.replace(/^(\#\!)?\#/, "");
		var dom = $("#x-right-content-element");
		var _url = _go_url;
		var _window_name = "x-window-"+_url.replace(/\//g,"-");
		var _window_dom = $("#"+_window_name);
		
		//隐藏所有窗口
		dom.find("iframe[id*='x-window-']").hide();
		
		//如果已经创建，则显示该窗口
		if(_window_dom.length>0){
			_window_dom.show();
			return false;
		}
		
		//清空
		//dom.empty();
		
		_go_url = window.Admin.Config.PROBJECT_PATH+"/page/page"+_go_url+".asp?"+new Date().getTime();
		var _index = layer.load(1, {
			shade: [0.1,'#000'] //0.1透明度的白色背景
		});
		
		var _Iframe = $("<iframe frameborder=\"0\" width=\'100%\' height=\'100%\'></iframe>");
		_Iframe.attr("id",_window_name)
			.attr("src",_go_url)
			.attr("name",_window_name);
		_Iframe.get(0).onload = function(){
			layer.close(_index);
		};	
		dom.append(_Iframe);
	}
})(jQuery,x,layui);

