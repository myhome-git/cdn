(function($) {
	$.fn.TreeMenu = function(options) {
		options = $.extend({}, $.fn.TreeMenu.defaults, options || {});
		var target = $(this),
			_KEY = {
				ID : "id",
				TEXT : "text",
				ICON : "icon",
				CHILDREN : "children"
			};
		
		target.empty().addClass("x-tree-menu");
		if(options.data) {
			init(target, options.data);
		} else {
			if(!options.url) return;
			$.getJSON(options.url, options.param, function(data) {
				init(target, data.data);
			});
		}
		
		var url = window.location.pathname;
		
		function _BindModelAttribute(element){
			element.find("a").unbind().on("click",function(event){
				event = event || window.event;
				var _this = $(this),
					_ul = _this.next();
				
				if(_ul.is(":hidden")){
					//显示
					_ul.slideDown(300);
				}else{
					//隐藏
					_ul.slideUp(300);
				}					
				
				target.find(".one-line a").removeClass("action");
				_this.addClass("action");
				//_parent.siblings().find(">ul").slideUp(300);
			
			});
		}
	
		function init(target, data) {
			$.each(data, function(i, item) {
				
				var li = $('<li></li>');
				var a = $("<a></a>");
				
				var _temp = $.extend({},item);
				delete _temp["children"];
				a.data("data",_temp);
				
				if(target.hasClass("x-tree-menu")){
					li.addClass("one-line");
				}
				
				li.append(a);
				
				if(item[_KEY.CHILDREN] && item[_KEY.CHILDREN].length > 0) {
					var _i = $("<i></i>"),
						_span = $("<span></span>"),
						_i1 = $("<i></i>");
					
					_i.addClass("iconfont")
						.addClass(item[_KEY.ICON]);
					
					_span.addClass('name')
						.html(item[_KEY.TEXT]);
						
					_i1.addClass("iconfont")
						.addClass("x-iconfont-down")
					a.append(_i).append(_span).append(_i1);
					
					var menus = $('<ul></ul>');
					menus.addClass('item');
					li.append(menus);

					init(menus, item[_KEY.CHILDREN]);
				} else {
					var _i = $("<i></i>"),
						_span = $("<span></span>"),
						_i1 = $("<i></i>");
					
					_i.addClass("iconfont")
						.addClass(item[_KEY.ICON]);

					_span.addClass('name')
						.html(item[_KEY.TEXT]);
					a.append(_i).append(_span);

				}
								
				target.append(li);
			});
			
			//target.find(".item .one-line").removeClass("one-line");
			_BindModelAttribute(target);
		}
	}
	
	$.fn.TreeMenu.defaults = {
		url: null,
		param: null,
		data: null
	};

})(jQuery);