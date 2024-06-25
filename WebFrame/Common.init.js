//系统配置
window.Common = {
	Config : {
		//服务器协议、域名(或IP)、端口号
		PROBJECT_IP : "",
		PROBJECT_NAME : "",
		PROBJECT_NAME_ANOHTER : "",
		PROBJECT_PATH : "/WebFrame",
		PROBJECT_VERSION : "1.0",
		COMPANY_NAME : "",
		COMPANY_ADDRESS : "",
		COMPANY_EMAIL : "",
		COMPANY_TELEPHONE : "",
		COMPANY_WEBSITE : ""
	},
	CDN : {
		//cdn模式，用来分解服务器静态资源压力
		PROBJECT_IP : "",
		PROBJECT_NAME : "静态资源调用",
		PROBJECT_PATH : "/WebFrame"
	},
	//这个配置决定了静态资源模式的KEY
	ServerModel : "CDN",
	//DEBUG
	ModelType : "DEBUG"
};

//默认加载
var _timeStamp = window.Common.ModelType=="DEBUG" ? "" : "?" + new Date().getTime();
document.writeln("<script src='"+window.Common[window.Common.ServerModel].PROBJECT_IP + window.Common[window.Common.ServerModel].PROBJECT_PATH +"/Common.Config.js"+_timeStamp+"'><\/script>");
document.writeln("<script src='"+window.Common[window.Common.ServerModel].PROBJECT_IP + window.Common[window.Common.ServerModel].PROBJECT_PATH +"/Common.DefaultLoad.js"+_timeStamp+"'><\/script>");
