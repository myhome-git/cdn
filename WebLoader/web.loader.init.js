//系统配置
var WebLoader = WebLoader||{};

WebLoader.Config = {
	PROBJECT_NAME : "静态资源调用",
	PROBJECT_PATH : "/WebLoader",
	VERSION : "0.1",
	LOADDING : function(_url){
		document.writeln("<script src='"+ this.PROBJECT_PATH +_url+"?v="+this.VERSION+"'><\/script>");
	}
};

//默认加载，请勿删除
WebLoader.Config.LOADDING("/web.loader.js");
WebLoader.Config.LOADDING("/web.loader.resource.js");
WebLoader.Config.LOADDING("/web.loader.event.key.js");
WebLoader.Config.LOADDING("/web.loader.default.js");
