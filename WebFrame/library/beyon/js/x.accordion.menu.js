/**
 * 折叠面板插件
 */
(function($){
	$.fn.extend({
		xAccordionMenu : function(parameter){
			
			var _default = {
				skin : "skin-default",
				//titleIcon : "fa fa-list-ul",
				//chlidrenOpenIcon : "fa fa-minus-circle",
				//chlidrenCloseIcon : "fa fa-plus-circle",
				
				titleIcon : "x-icon-xitongcaidan",
				chlidrenOpenIcon : "x-icon-xiala2",
				chlidrenCloseIcon : "x-icon-xiayibu",
				datalist : []
			}
			
			$.extend(true, _default, parameter);
			
			var _object = this;
			
			_object.addClass("x-accordion-panel-box").addClass(_default.skin);
			
			//创建元素
			_object.SetElementDataList = function(datalist){
				_object.empty();
				var box = " <ul class=\"x-accordion-panel\">"
							+"	{{_lis}}"
							+"</ul>";
				
				var _lis = "";
				$.each(datalist, function(index,el) {
					_lis += "<li class=\"x-accordion-item\">"
							+"		<div class=\"x-accordion-title\">"
							+"			<i class=\"iconfont "+(el.icon||_default.titleIcon)+"\"></i>"
							+"			<font>"+el.text+"</font>"
							+"			<i class=\"iconfont x-iconfont-down "+_default.chlidrenCloseIcon+"\"></i>"
							+"		</div>"
							+"		<ul class=\"x-accordion-children\">"+el.content+"</ul>"
							+"	</li>";
				});
				
				box = box.replace(/{{_lis}}/ig,_lis);
				_object.append(box);
				_object.BingdTitleEvent();
			}
			
			//设置content内容
			_object.SetElementContent = function(index,element){
				var _children = _object.find(".x-accordion-children:eq("+index+")");
				_children.empty().html(element);
			};
			
			_object.BingdTitleEvent = function(){
				//绑定第一层标题
				_object.find(".x-accordion-panel .x-accordion-title").each(function (index, el) {
					var _title = $(el);
					_title.find(".iconfont:eq(1)").addClass("fa-plus-circle");
					_title.unbind().on("click touchstart", function (event) {
						event = event || window.event;
						var _this = $(this),
							_parent = _this.parent(),
							_ul = _parent.find(">ul");
			
						if (_ul.is(":hidden")) {
							//显示
							_this.find(".x-iconfont-down").removeClass(_default.chlidrenCloseIcon).addClass(_default.chlidrenOpenIcon);
							_ul.slideDown(300);
						} else {
							//隐藏
							_this.find(".x-iconfont-down").removeClass(_default.chlidrenOpenIcon).addClass(_default.chlidrenCloseIcon);
							_ul.slideUp(300);
						}
						_parent.siblings().find(">ul").slideUp(300);
						_parent.siblings().find(".x-accordion-title").find(".x-iconfont-down").removeClass(_default.chlidrenOpenIcon).addClass(_default.chlidrenCloseIcon);
					});
					//_object.addClickEffect();
				})
			}
			
			_object.SetElementDataList(_default.datalist);
			return _object;
		},
		addClickEffect : function(){
			var element = this;
			var ink, d, x, y;
			element.css({
				"overflow": "hidden"
			});
			element.bind("click touchstart", function (e) {
				var _this = $(this);
				_this.find(".x-ink").remove();
				if (_this.children(".x-ink").length === 0) {
					_this.append("<b class='x-ink'></b>");
				}

				ink = _this.find(".x-ink");
				ink.removeClass("x-animate-ink");
				if (!ink.height() && !ink.width()) {
					d = Math.max(_this.outerWidth(), _this.outerHeight());
					ink.css({
						height: d,
						width: d
					})
				}
				x = e.pageX - _this.offset().left - ink.width() / 2;
				y = e.pageY - _this.offset().top - ink.height() / 2;
				ink.css({
					top: y + 'px',
					left: x + 'px'
				}).addClass("x-animate-ink")
			})
		}
	});
	
	$.extend({
		addClickEffect : function(element){
			var ink, d, x, y;
			element.css({
				"overflow": "hidden"
			});
			element.bind("click touchstart", function (e) {
				var _this = $(this);
				_this.find(".x-ink").remove();
				if (_this.children(".x-ink").length === 0) {
					_this.append("<b class='x-ink'></b>");
				}

				ink = _this.find(".x-ink");
				ink.removeClass("x-animate-ink");
				if (!ink.height() && !ink.width()) {
					d = Math.max(_this.outerWidth(), _this.outerHeight());
					ink.css({
						height: d,
						width: d
					})
				}
				x = e.pageX - _this.offset().left - ink.width() / 2;
				y = e.pageY - _this.offset().top - ink.height() / 2;
				ink.css({
					top: y + 'px',
					left: x + 'px'
				}).addClass("x-animate-ink")
			})
		}
	});
})(jQuery);
