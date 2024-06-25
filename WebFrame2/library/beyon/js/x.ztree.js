//ztree 二次封装
function ClassZTree(){
	
	//配置
	this._defaultConfig = {
		view: {
			showLine: true
		}
	};
	
	//初始化
	this.init = function(option){
		this.element = option.element;
		$.extend(true, this._defaultConfig, option.setting);
		this.zNodes = option.zNodes;
		
		if(!this.element.hasClass("ztree")){
			this.element.addClass("ztree");
		}
		
		this.zTreeObj = $.fn.zTree.init(this.element, this._defaultConfig, this.zNodes);
	}
	
	//取出ztree对象
	this.getZtreeObj = this.GetZTreeObj = function(){
		return this.zTreeObj;
	};
	
	return {
		_defaultConfig : this._defaultConfig,
		init : this.init,
		GetZTreeObj :this.GetZTreeObj,
		getZTreeObj :this.GetZTreeObj
	};
	
}