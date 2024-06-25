/**
*
* 基于Stomp 模式的WebSocket 客户端
*/
function MessageSocket(){
	
	let _this = this,
		_client;
	
	this.initConstructor = function(option){
		
		let ws = new WebSocket(option.url);
		let client = Stomp.over(ws);
		this.subscribes = [];//已经订阅
		this.pendingSubs = [];//需要订阅
		
		this.subscribesMap = new Map();
		this.pendingSubsMap = new Map();
		
		client.debug = function (message) {
//			console.log(message);
			//不输出消息内容，只用于配合stomp框架做心跳检查
		};
		
		function onConnect(result){
			//订阅信息
			_this.ready = true;
			//在连接以后，判断有没有需要订阅的新消息
			if (_this.pendingSubs.length > 0) {
				let o;
				while (o = _this.pendingSubs.pop()) {
					_this.subscribe_(o.queue, o.callback);
				}
			}
			
			_this.pendingSubsMap.forEach(function(value,key){
				_this.subscribe_(o.queue, o.callback);
			});
			try{
				_this.pendingSubsMap.celar();
			}catch(e){
				
			}
			
			if(option.onConnect){
				option.onConnect();
			}
		}

		client.connect(option.user, option.password, onConnect, option.onError, option.vhost);
		_client = client;
	}
	
	this.getClient = function(){
		return _client;
	}
	
	/**
	 * @description private,真正订阅
	 * @param {*} queue
	 * @param {*} callback
	 */
	this.subscribe_ = function(queueName, callback){
		//"/exchange/zhts.topic/"
		let sub = this.getClient().subscribe("/exchange/zhts.topic/"+queueName, function (result) {
			callback(result);
		});
		let subscribe = {
			name: queueName,
			value: sub
		};
		this.subscribes.push(subscribe);
	}
	
	/**
	 * 接收消息
	 * @param {*} queue 队列名称
	 * @param {*} callback 消息回调函数
	 */
	this.reciveMessage = function(queue, callback) {
		if (this.ready) {
			this.subscribe_(queue, callback);
		} else {
//			this.pendingSubsMap.set(queue,callback);
			this.pendingSubs.push({
				queue,
				callback
			})
		}
	}
	
	/**
	 * 取消订阅队列
	 * @param {*} queue 队列名称 
	 */
	this.unsubscribe = function(queue) {
		let cnt = this.subscribes.length;
		while (cnt--) {
			var q = this.subscribes[cnt];
			if (q.name === queue) {
				this.getClient().unsubscribe(q.value.id);
				this.subscribes.splice(cnt, 1);
			}
		}
	}

	/**
	 * 关闭连接
	 */
	this.stop = function() {
		this.getClient().disconnect();
	}
	
	this.init = function(option){
		try{
			this.initConstructor(option);
		}catch(e){
			console.warn(e.message);
		}
	}
}