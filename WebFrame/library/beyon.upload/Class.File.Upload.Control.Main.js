/**
 * 通用上传入口文件
 */
function ClassFileUpdateControlMain(){
	
	//对象指针
	var _this = this,
	
		layer = layui.layer;
	
	
	this.__ClassLinkObject = new Object();
	
	
	//初始化外部类
	this.InitLinkClass = function(_name,_class){
		
		this.__ClassLinkObject[_name] = _class;
		
	}
	
	//获取外部类
	this.GetLinkClass = function(_name){
		
		return this.__ClassLinkObject[_name];
		
	}
	
	//打开面板
	this.OpenPanel = function(_conf){
		
		var _this = this;
		
		
		
	}
	
	//关闭面板
	this.ClosePanel = function(){
		
		layer.close(_this.__openPanelIndex);
		
	}
	
	//设置上传地址
	this.SetWindowURL = function(_url){
		
		this.__windowURL = _url;
		
	}
	
	//获取上传地址
	this.GetWindowURL = function(_url){
		
		return this.__windowURL;
		
	}
	
	//获取最终地址带参数
	this.GetLoadURL = function(){
		
		return this.__windowURL + "?type="+this.__uploadType+"&size="+this.__uploadSize+"&fileMulti="+this.__uploadMultiSelection+(this.__uploadFileChunkSize ? "&fileChunkSize="+this.__uploadFileChunkSize : "");
		
	}
	
	//设置上传类型
	this.SetUplaodType = function(_type){
		
		this.__uploadType = _type;
		
	}
	
	//取出上传类型
	this.GetUplaodType = function(){
		
		return this.__uploadType;
		
	}
	
	//设置上传大小
	this.SetUplaodSize = function(_size){
		
		this.__uploadSize = _size;
		
	}
	
	//取出上传大小
	this.GetUplaodSize = function(){
		
		return this.__uploadSize;
		
	}
	
	//设置文件多选
	this.SetUploadFileMultiSelection = function(_boolean){
		
		return this.__uploadMultiSelection = _boolean;
		
	}
	
	//设置单文件每次上传大小，单位是byte，如果是1MB，应该是1024*1024
	this.SetUploadFileChunkSize = function(_size){
		
		return this.__uploadFileChunkSize = _size;
		
	}
	
	//class默认初始化
	this.Init = function(){
		
		this.SetWindowURL(window.Common.CDN.PROBJECT_IP + window.Common.CDN.PROBJECT_PATH+"/library/beyon.upload/file.upload.html");
		
		this.SetUplaodSize("10mb");
		
		this.SetUplaodType("all");
		
	}
	
	this.Init();
	
}


