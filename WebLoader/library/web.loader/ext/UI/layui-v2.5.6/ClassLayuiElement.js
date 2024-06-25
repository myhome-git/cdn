/**
 * 继承ClassLayuiOBJECT对象
 */
function ClassLayuiElement(){
	
	//继承
	ClassLayuiOBJECT.call(this);
	
	//类型
	this.type = "ELEMENT";
	this.name = "布局";
	
	//定义常用对象
	let _this=this,$body;
	
	this.TEMPLATE = {
		WINDOW : function(){
			let _html = [];
			_html.push("<div class='x-view-window' id='x-view-window'></div>");
			return _html.join("");
		},
		WINDOWHEADER : function(){
			let _html = [];
			_html.push('<div class="x-view-header x-clearfix" id="x-view-header">');
			return _html.join("");
		},
		WINDOWCONTENT : function(){
			let _html = [];
			_html.push("<div class='x-view-content' id='x-view-content'></div>");
			return _html.join("");
		},
		WINDOWFOOT : function(){
			let _html = [];
			_html.push("<div class='x-view-foot' id='x-view-foot'></div>");
			return _html.join("");
		},
		LAYER_TAB : function(option){
			let _html = [];
			_html.push('<div class="layui-tab">');
			_html.push('<div class="layui-tab-title"></div>');
			_html.push('<div class="layui-tab-content"></div>');
			_html.push('</div>');
			return _html.join("");
		}
	};
	
	this.getTemplateArray = function(){
		return this.TEMPLATE;
	}
	
	this.init = function(){
		$body = $("body");
	}
	
};

//对jquery进行扩展
(function($){
	$.fn.extend({
		addLayou : function(html){
			let $html = $(html);
			this.append($html);
			return $html;
		},
		getTabTitle : function(){
			let $doc = this.find(">.layui-tab-title");
		},
		setTabTitle : function(option){
			let $doc = this.getTabTitle();
			if(option.data){
				$.each(option.data,function(index,el){
					let $item = $('<li>网站设置</li>');
					$doc.append($item);
					if(el.active){
						$item.addClass("layui-this");
					}
				});
			}
		},
		setTabTitleShow : function(boolean){
			let $title = this.getTabTitle();
			boolean ? $title.show() : $title.hide();
		},
		getTabContent : function(){
			let $doc = this.find(">.layui-tab-content");
		},
		setTabContent : function(option){
			let $doc = this.getTabContent();
			if(option.data){
				$.each(option.data,function(index,el){
					let $item = $('<div class="layui-tab-content-box"></div>');
					$doc.append($item);
					$item.append(el);
				});
			}
		}
	});
})(jQuery);
