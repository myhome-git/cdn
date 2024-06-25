function xZTree(){
	
}
(function(_object){
	
	_object.prototype._defaultSetting = {
		view: {
			showLine: true
		}
	}
	
	_object.prototype.zTreeObj = undefined;
	
	_object.prototype.init = function(obj){
		this.element = obj.element;
		$.extend(true, this._defaultSetting, obj.setting);
		this.zNodes = obj.zNodes;
		
		if(!this.element.hasClass("ztree")){
			this.element.addClass("ztree");
		}
		
		this.zTreeObj = $.fn.zTree.init(this.element, this._defaultSetting, this.zNodes);
	};
	
	//取出ztree对象
	_object.prototype.GetZTreeObj = function(obj){
		return this.zTreeObj || $.fn.zTree.getZTreeObj(this.element.attr("id"));
	};
	
	
})(xZTree);