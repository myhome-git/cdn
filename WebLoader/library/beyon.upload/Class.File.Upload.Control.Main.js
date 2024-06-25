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
	
	//设置组件窗口地址，是指文件上传窗口
	this.SetWindowURL = function(_url){
		this.__windowURL = _url;
		return this;
	}
	
	//获取组件窗口地址，是指文件上传窗口
	this.GetWindowURL = function(_url){
		return this.__windowURL;
	}
	
	//设置后台上传地址
	this.SetUploadURL = function(_url){
		this.__uploadURL = _url;
		return this;
	}
	
	//获取后台上传地址
	this.GetUploadURL = function(_url){
		return this.__uploadURL;
	}
	
	//获取最终地址带参数
	this.GetLoadURL = function(){
		return this.GetWindowURL() + "?"+this.getLoadParams();
	}
	
	/**
	 * 获取配置全部参数
	 */
	this.getLoadParams = function(){
		return "type="+this.GetUplaodType()
		+"&size="+this.GetUplaodSize()
		+"&fileMulti="+this.GetUploadFileMultiSelection()
		+(this.GetUploadFileChunkSize() ? "&fileChunkSize="+this.GetUploadFileChunkSize() : "")
		+("&uploadURL="+this.GetUploadURL());
	}
	
	//设置上传类型
	this.SetUplaodType = function(_type){
		this.__uploadType = _type;
		return this;
	}
	
	//取出上传类型
	this.GetUplaodType = function(){
		return this.__uploadType;
	}
	
	//设置上传大小
	this.SetUplaodSize = function(_size){
		this.__uploadSize = _size;
		return this;
	}
	
	//取出上传大小
	this.GetUplaodSize = function(){
		return this.__uploadSize;
	}
	
	//设置文件多选
	this.SetUploadFileMultiSelection = function(_boolean){
		this.__uploadMultiSelection = _boolean;
		return this;
	}
	
	//获取文件多选
	this.GetUploadFileMultiSelection = function(_boolean){
		return this.__uploadMultiSelection || false;
	}
	
	//设置单文件每次上传大小，单位是byte，如果是1MB，应该是1024*1024
	this.SetUploadFileChunkSize = function(_size){
		this.__uploadFileChunkSize = _size;
		return this;
	}
	
	this.GetUploadFileChunkSize = function(_size){
		return this.__uploadFileChunkSize;
	}
	
	//class默认初始化
	this.Init = function(){
		this.SetWindowURL(WebLoader.Config.PROBJECT_PATH +"/library/beyon.upload/file.upload.html");
		this.SetUplaodSize("10mb");
		this.SetUplaodType("all");
	}
	
	this.Init();
	
}
