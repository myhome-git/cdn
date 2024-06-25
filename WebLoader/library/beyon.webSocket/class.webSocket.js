function ClassWebSocket(){
	
	if(!('WebSocket' in window)) {
		throw new Error("error : WebSocket undefined");
	}
	
	let _this = this,
		_default = {
			url : undefined,
			userName : undefined,
			userPassword : undefined,
		},
		_webSocket,
		_callback = {};
	
	/**
	 * 生成随机数据
	 */
	function createUUID(){
       var d = new Date().getTime();
		var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
		  var r = (d + Math.random()*16)%16 | 0;
		  d = Math.floor(d/16);
		  return (c=='x' ? r : (r&0x3|0x8)).toString(16);
		});
		return uuid;
    }
	
	/**
	 * 配置回调函数
	 */
	this.setCallback = function(type,callback){
		_callback[type] = callback;
		return this;
	}
	
	/**
	 * set get websocket对象
	 */
	this.setWebSocket = function(webSocket){
		_webSocket = webSocket;
		return this;
	}
	
	this.getWebSocket = function(){
		return _webSocket;
	}
	
	/**
	 * open close websocket
	 */
	this.openConnection = function(){
		if(!_default.url){
			return this;
		}
		//监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常。
		window.onbeforeunload = function() {
			_this.closeConnection();
		}
		
		_webSocket = new WebSocket(_default.url);
		if(_webSocket){
			this.setCallback("onerror",function(event){
				setMessageInnerHTML("系统消息：WebSocket连接发生错误");
			}).setCallback("onopen",function(event){
				setMessageInnerHTML("系统消息：WebSocket连接成功");
			}).setCallback("onmessage",function(event){
				console.info(event);
			}).setCallback("onclose",function(event){
				setMessageInnerHTML("系统消息：WebSocket连接关闭");
			});
			for(let i in _callback){
				_webSocket[i] = _callback[i];
			}
		}
	}
	
	this.send = function(obj){
		try{
			this.getWebSocket().send(JSON.stringify(obj));
		}catch(e){
			//TODO handle the exception
		}
		return this;
	}
	
	this.closeConnection = function(){
		try{
			this.getWebSocket().close();
		}catch(e){
			//TODO handle the exception
		}
	}
	
	/**
	 * 初始化
	 */
	this.init = function(option){
		$.extend(true, _default, option);
		return this;
	}
	
	//将消息显示在网页上
	function setMessageInnerHTML(innerHTML) {
		console.info(innerHTML);
	}	
	
	return this;
}
