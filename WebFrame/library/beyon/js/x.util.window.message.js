var _xUtilWindowMessage = {};
(function ($,_object) {
	$(document).ready(documentReady);
	function documentReady() {
		
		//绑定数据
		_object._data = {
			element : undefined,
			list : [],
			time : 1,
			index : 0
		};
		
		//控制启动和停止
		_object._controlStop = true;
		
		//创建窗口
		_object.Create = function(data){
			
			var _this = this;
			
			data.element = $(data.element);
			$.extend(true, _this._data, data);
			
			var mouseClock;
			data.element.find(".m-text").hover(function(event){
				_this.SetLock(true);
			},function(event){
				mouseClock = event.timeStamp;
				setTimeout(function(){
//					console.info(mouseClock,event.timeStamp,mouseClock-event.timeStamp);
		            if(mouseClock-event.timeStamp==0){
		            	if(_this.IsLock()){
		            		_this.SetLock(false);
		            		_this.SetAnimateStart();
		            	}
		            }
				},_this._data.time+1000);
			});
			
			if(_this._data.click){
				_this.BindEventClick(_this._data.click);
			}
			_this.Open();
			
		}
		
		//打开窗口
		_object.Open = function(){
			this._data.element.removeClass("message-close");
			this.SetLock(false);
			this.SetAnimateStart();
		}
		
		_object.Close = function(func){
			this._data.element.addClass("message-close");
			this.SetLock(true);
			if(func){
				func();
			}
		}
		
		//打开text
		_object.OpenText = function(){
			if(this._data.element.hasClass("simple")){
				this._data.element.removeClass("simple");
				this.SetLock(false);
				this.SetAnimateStart();
			}
		}
		
		//关闭text
		_object.CloseText = function(func){
			this._data.element.addClass("simple");
			this.SetLock(true);
			if(func){
				func();
			}
		}
		
		//设置节点
		_object.SetMessageElement = function(_element){
			this._data.element = _element;
		}
		
		//绑定事件
		_object.BindEventClick = function(_func){
			var _this = this;
			_this._data.element.find(".m-text a").unbind("click").on("click",function(event){
				var $this = $(this);
				_func(event,$this.data("_data"));
			})
		}
		
		//设置消息数据
		_object.SetMessageList = function(_list){
			this._data.list = _list;
			this._data.index = 0;
			this.SetAnimateStart();
		}
		
		//设置索引
		_object.SetMessageIndex = function(_index){
			this._data.index = _index;
		}
		
		//设置element content
		_object.SetElementContent = function(_data){
			var $dom = this._data.element.find(".m-text > a");
			$dom.data("_data",_data)
				.attr("id","_tempAnimateId"+_data.id)
				.animatelo("flipOutX")
				.html(_data.text)
				.animatelo("flipInX");
		}
		
		//开始循环消息
		_object._prevTime = new Date().getTime();
		_object.SetAnimateStart = function(){
			var _this = this;
			var $element = _this._data.element;
			
			//判断是否锁定
			if(_this.IsLock()){
				return false;
			}
			
			var _list = _this._data.list;
			if(_this._data.index+1>_list.length){
				_this._data.index = 0;
			}
//			console.info(_this._data.index,_this._data.time,new Date().getTime() - _this._prevTime);
			_this.SetElementContent(_list[_this._data.index]);
			_this._data.index += 1;
			_this._prevTime = new Date().getTime();
			
			setTimeout(function(){
				_this.SetAnimateStart();
			},_this._data.time);
		}
		
		_object.IsLock = function(){
			return this._data.element.hasClass("run-lock");
		}
		
		_object.SetLock = function(_result){
			_result===true ? this._data.element.addClass("run-lock") : this._data.element.removeClass("run-lock");
		}
		
		
		//初始化
		_object.init = function(){
			
		}
		
		_object.init();
	}
})(jQuery, _xUtilWindowMessage);
