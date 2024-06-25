function xLoading(){
	//element
	this.element = "#xLoading-box";
	
	//是否显示加载图片
	this.isImage = true;
	
	//图片地址
	this.imageUrl = window.Common.Config.PROBJECT_PATH+"/images/load.gif";
	
	//是否有图标
	this.isIconFont = false;
	
	//iconClass
	this.iconClass = "";
	
	//宽度
	this.width = "420px";
	
	//高度
	this.height = "auto";
	
	//索引
	this._index = 0;
}
(function($,x,layui){
	var layer = layui.layer;
	x.prototype.loading = function(value,option){
		var _html = "<div id=\"xLoading-box\" class=\"xLoading\">"
				+ "<center><table><tbody>"
				+ "<tr>"
				+ (this.isImage===true? "<td><img src=\""+this.imageUrl+"\"/>&nbsp;&nbsp;</td>":"")
				+ (this.isIconFont===true? "<td><i class=\"iconfont "+this.iconClass+"\">"+value+"</i></td>":"")
				+ "<td><span>"+value+"</span></td>"
				+ "</tr>"
				+ "</tbody></table></center>"
				+ "</div>";
		
		var _default = {
			type: 1,
			area: [this.width, this.height], //宽高
			content: _html
		};
		$.extend(true, _default, option);
		this._index = layer.open(_default);
	};
	x.prototype.setValue = function(value){
		$(this.element).find("img").show();
		$(this.element).find("span").html(value);
	};
	
	x.prototype.setSuccessValue = function(value){
		$(this.element).find("img").hide();
		$(this.element).find("span").html(value);
	};
	
	x.prototype.setErrorValue = function(value){
		$(this.element).find("img").hide();
		$(this.element).find("span").html(value);
	};
	
	x.prototype.closeLoading = function(){
		layer.close(this._index);
	}
})(jQuery,xLoading,layui);

