function ClassWebSocketStomp(){
	
	if(!('WebSocket' in window)) {
		throw new Error("error : WebSocket undefined");
	}
	
	let _this = this,
		_isDebug = false,
		_webSocketStompClient,
		_callback = {},
		_classMessageSocket,
		_default = {
			url : undefined,
			vhost: undefined,
			user : undefined,
			password: undefined,
			onConnection: undefined,
			onError: undefined,
			onClose : undefined,
			queueArray : []
		};
	
	/**
	 * 开启或关闭debug
	 * @param {Object} boolean
	 */
	this.openDebug = function(boolean){
		_isDebug = boolean;
		return this;
	}
	
	/**
	 * 取出stomp client
	 */
	this.getStompClient = function(){
		return _classMessageSocket.getClient();
	}
	
	/**
	 * 取出body，并转换为JSON
	 * @param {Object} result
	 */
	this.getResultBody = function(result){
		let _body;
		try{
			_body = JSON.parse(result.body);
		}catch(e){
			//TODO handle the exception
		}
		return _body;
	}
	
	this.getReadyStateName = function(){
		let _int = this.getStompClient().connected,
			_value;
		switch (_int){
			case false:
				_value = "断开";
				break;
			case true:
				_value = "成功";
				break;
			default:
				_value = "未知";
				break;
		}
		return [_int,_value];
	}
		
	/**
	 * 取出连接状态，返回true或false
	 */
	this.getConnected = function(){
		return this.getStompClient().connected;
	}
	
	/**
	 * 开始连接
	 */
	this.openConnection = function(){
		_classMessageSocket = new MessageSocket();
		_classMessageSocket.init(_default);
		_this.getStompClient().debug = function(message){
			if(_isDebug){
				console.info(message);
			}
		};
		if(_default.onClose){
			_this.getStompClient().ws.onclose = _default.onClose;
		}
		
		if(_default.onError){
			try{
				_this.getStompClient().ws.onerror = _default.onError;
			}catch(e){
				//TODO handle the exception
			}
		}
		
		//设定回调函数
		for(let i in _default.queueArray){
			let _call = _default.queueArray[i];
			_this.addQueue(i,_call);
		}
		return this;
	}
	this.closeConnection = function(){
		this.getStompClient().disconnect();
	}
	
	/**
	 * 添加订阅
	 */
	this.addQueue = function(queueName,callback){
		_classMessageSocket.reciveMessage(queueName,function(result){
			let _body = _this.getResultBody(result);
			if(_body!=undefined && _body!=null){
				if(_isDebug){
					console.info("接收到数据"+new Date,_body);
				}
				callback(queueName,_body);
			}
		});
		return this;
	}
	this.removeQueue = function(queueName){
		_classMessageSocket.unsubscribe(queueName);
		return this;
	}
	
	/**
	 * 初始化
	 */
	this.init = function(option){
		$.extend(true, _default, option);
		this.openConnection();
		return this;
	}
	
	return this;
}
