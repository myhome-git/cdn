var WebLoader = WebLoader||{},
	Response,
	_pageObject = _pageObject || {};
	PAGEOBJECT = _pageObject;

(function(window,module){
	
	let _this = module;
	
	//获取对象类型
	module.typeOf = function(object){
		var s = Object.prototype.toString.call(object).toLocaleLowerCase();
		return s.replace(/(^\[object\s*)(.*)(\]$)/,"$2");
	}
	
	//序列化参数
	module.argumentsToMap = function(arrayArguments){
		var _map = new Map(),
			d,name;
		for(var i=0;i<arrayArguments.length;i++){
			d = arrayArguments[i],
			name = _this.typeOf(d);
			if(_map.get(name)===undefined){
				_map.set(name,d);
			}else{
				var y = 0;
				while(_map[name+y]!=undefined){
					y += 1;
				}
				_map.set(name+y,d);
			}
		}
		return _map;
	};
	
	//加入资源
	module.add = function(resourceArray){
		this.__ResourceArray = this.__ResourceArray || [];
		this.ResourceIndex = this.ResourceIndex || [];
		for(var i in resourceArray){
			this.__ResourceArray[i] = resourceArray[i];
			this.ResourceIndex.push(i);
		}
		return this;
	}
	
	//取出资源
	module.getResourceArray = function(){
		return this.__ResourceArray;
	}
	
	//直接输出
	Response = module.use = module.Response = function(name){
		let	_map = _this.argumentsToMap(arguments),
			_mothodName;
		_map.forEach(function(value,key){
			if(/array/.test(key)){
				value.forEach(function(v,k){
					if(_this.ResourceIndex.indexOf(v)>-1){
						_this.__ResourceArray[v].forEach(function(_v,_index){
							_mothodName = _this.GetResponseTypeMothod(_v);
							if(_mothodName){
								_this[_mothodName](_this.Config.PROBJECT_PATH+"/library"+_v);
							}
						})
					}else{
						_mothodName = _this.GetResponseTypeMothod(v);
						if(_mothodName){
							_this[_mothodName](v);
						}
					}
				});
			}
		});
		return this;
	}
	
	//获取加载类型
	module.GetResponseTypeMothod = function(name){
		let _type = ((""+name).match(/\w+$/)+"").toString(),
			_mothodName;
		switch (_type){
			case "ico":
				_mothodName = "ResponseIco";
				break;
			case "js":
				_mothodName = "ResponseJavaScript";
				break;
			case "css":
				_mothodName = "ResponseCSS";
				break;
			case "flash":
				_mothodName = "ResponseFlash";
				break;
			case "html":
				_mothodName = "ResponseHTML";
				break;	
			default:
				_mothodName = "ResponseText";
				break;
		}
		return _mothodName;
	}
	
	//输出ico
	module.ResponseIco = function(name){
		document.write("<link href=\""+name+"\" rel=\"shortcut icon\" />");
	}
	
	//输出js
	module.ResponseJavaScript = function(name){
		if(this.Config && !this.Config.DEBUG){
			name += "?"+new Date().getTime();
		}
		document.writeln("<script type='text/javascript' src='"+name+"'></script>");
	}
	
	//输出css
	module.ResponseCSS = function(name){
		if(this.Config && !this.Config.DEBUG){
			name += "?"+new Date().getTime();
		}
		document.writeln("<link rel=\"stylesheet\" href='"+name+"' />");
	}
	
	//输出html
	module.ResponseHTML = function(name){
		let _id = name.replace(/(\.|\/)/g,"-");
		document.writeln("<script type='text/html' tag='html' src='"+name+"' id='"+_id+"'></script>");
	}
	
	//输出text
	module.ResponseText = function(name){
		let _id = name.replace(/(\.|\/)/g,"-");
		document.writeln("<script type='text/html' tag='text' onload='WebLoader.setLoadState(this)' src='"+name+"' id='"+_id+"'></script>");
	}
	
	//输出flash
	module.ResponseFlash = function(name){
		var _array = window.Common.ResourcesArray["flash"];
		if(_array[name]){
			var o = window.Common[window.Common.ServerModel];
			return o.PROBJECT_IP + o.PROBJECT_PATH+_array[name]+"?_v="+window.Common.Config.PROBJECT_VERSION;
		}else{
			console.warn("flash not error");
		}
	}
	
	/**
	 * 增加load功能，用于页面加载后加载文件
	 */
	
	module.Load = module.load = function(){
		let	_map = _this.argumentsToMap(arguments),
			_mothodName;
		_map.forEach(function(value,key){
			if(/array/.test(key)){
				value.forEach(function(v,k){
					if(_this.ResourceIndex.indexOf(v)>-1){
						_this.__ResourceArray[v].forEach(function(_v,_index){
							_mothodName = _this.GetLoadTypeMothod(_v);
							if(_mothodName){
								_this[_mothodName](_this.Config.PROBJECT_PATH+"/library"+_v);
							}
						})
					}else{
						_mothodName = _this.GetLoadTypeMothod(v);
						if(_mothodName){
							_this[_mothodName](v);
						}
					}
				});
			}
		});
		return this;
	}
	
	//获取加载类型
	module.GetLoadTypeMothod = function(name){
		let _type = ((""+name).match(/\w+$/)+"").toString(),
			_mothodName;
		switch (_type){
			case "ico":
				_mothodName = "LoadIco";
				break;
			case "js":
				_mothodName = "LoadJavaScript";
				break;
			case "css":
				_mothodName = "LoadCSS";
				break;
			case "flash":
				_mothodName = "LoadFlash";
				break;
			default:
				break;
		}
		return _mothodName;
	}
	
	
	
	//输出ico
	module.LoadIco = function(name){
		let _body = document.getElementsByTagName("body");
		if(_body.length>0){
			let _dom = document.createElement("link");
			_dom.rel = "shortcut icon";
			_dom.href = name;
			_body[0].appendChild(_dom);
		}
	}
	
	//输出js
	module.LoadJavaScript = function(name){
		let _body = document.getElementsByTagName("body");
		if(_body.length>0){
			let _dom = document.createElement("script");
			_dom.type = "text/javascript";
			_dom.src = name;
			_body[0].appendChild(_dom);
		}
	}
	
	//输出css
	module.LoadCSS = function(name){
		let _body = document.getElementsByTagName("body");
		if(_body.length>0){
			let _dom = document.createElement("link");
			_dom.rel = "stylesheet";
			_dom.href = name;
			_body[0].appendChild(_dom);
		}
	}
	
	//输出flash
	module.LoadFlash = function(name){
		var _array = window.Common.ResourcesArray["flash"];
		if(_array[name]){
			var o = window.Common[window.Common.ServerModel];
			return o.PROBJECT_IP + o.PROBJECT_PATH+_array[name]+"?_v="+window.Common.Config.PROBJECT_VERSION;
		}else{
			console.warn("flash not error");
		}
	}
	
	//全局初始化，document载入之后执行
	module.DocumentReadySuccess = function(){
//		console.info("DocumentReadySuccess");
		$.extend(true, module, xUtilBase);

		var $body = $("body"),
			$hiddenWindow = $("#x-hidden-window");
		if(!$hiddenWindow.length){
			$body.prepend($("<div id='x-hidden-window'></div>"));
		}
		
		//判断对象是否跨域或者被嵌套
		if(top != self){
			if(top.location.hostname == self.location.hostname){
				//console.warn("被嵌套框架，"+self.location.pathname,top.location.pathname);
				$body.addClass("iframe-body");
			}else{
				//console.warn("Cross domain，"+self.location.href);
				location.href = "about:blank";
			}
		}
	}
	
	//立即执行的函数
	module.ResponseInit = function(){
		//开始注册document加载之后的程序
		if(document.addEventListener){
			document.addEventListener('DOMContentLoaded',function() {
				document.removeEventListener("DOMContentLoaded", arguments.callee, false); 
				_this.DocumentReadySuccess();
			},false); 
		}else if(document.attachEvent){
			document.attachEvent("onreadystatechange", function(){  
			    if (document.readyState === "complete" ) {  
			        document.detachEvent("onreadystatechange", arguments.callee );  
			        _this.DocumentReadySuccess();
			    }
		  });
		}
	}
	
	module.ResponseInit();
	
})(window,WebLoader);


(function(window,module){
	let _this = module;
	
	//将数组中的对象按其某个成员排序
	module.sort = function(obj, key, desc){
	    var clone = JSON.parse(
	      JSON.stringify(obj || [])
	    );
	    
	    if(!key) return clone;
	    
	    //如果是数字，按大小排序，如果是非数字，按字典序排序
	    clone.sort(function(o1, o2){
	      var isNum = /^-?\d+$/
	      ,v1 = o1[key]
	      ,v2 = o2[key];
	      
	      if(isNum.test(v1)) v1 = parseFloat(v1);
	      if(isNum.test(v2)) v2 = parseFloat(v2);
	      
	      if(v1 && !v2){
	        return 1;
	      } else if(!v1 && v2){
	        return -1;
	      }
	        
	      if(v1 > v2){
	        return 1;
	      } else if (v1 < v2) {
	        return -1;
	      } else {
	        return 0;
	      }
	    });
	
	    desc && clone.reverse(); //倒序
	    return clone;
	};
	
	
})(window,WebLoader);

/**
 * layer弹出层
 * @param {Object} window
 * @param {Object} module
 */
(function(window,module){
	let _this = module;
	module.openWin = function(option){
		let _this = this;
		let _default = {
//          anim: -1,
            anim : 0,
//          isOutAnim: false,
            isOutAnim: true,
            shade: 0.3,
            maxmin : true,
            shadeClose: false,
            btn: false,
            skin : "",
            moveEnd : function(layero){
            	if(option.callback && option.callback.onMoveEnd){
					option.callback.onMoveEnd(layero);
				}
            }
        }
		$.extend(true, _default, option);
		
		//增加自定义class
		_default.skin += " module-layui-layer";
		if(!_default.id){
			_default.id = "layui-layer-"+xUtilBase.createUUID();
		}
		if(_default.skin.indexOf(_default.id)<0){
			_default.skin += " "+_default.id;
		}
		
		if(option.callback){
			if(!_default.success && option.callback.onSuccess){
				_default.success = option.callback.onSuccess;
			}
		}
		
		let _index = layui.layer.open(_default);
		
		//dom被创建后
		if(option.callback){
			if(option.callback.onMoveStart){
				let $layero = $("#"+_default.id);
				let $title = $layero.prev();
				
				let _mouseMoveStart = false,_keyupClock;
				$title.on("mousedown.layuititle",function(event){
					_mouseMoveStart = true;
					event.stopPropagation();
				});
				
				$(document).on("mouseup.layuititle",function(event){
					_mouseMoveStart = false;
					event.stopPropagation();
				}).on("mousemove.layuititle",function(event){
					if(_mouseMoveStart){
						_keyupClock = event.timeStamp;
						setTimeout(function(){
				            if(_keyupClock-event.timeStamp==0){
								option.callback.onMoveStart(event);
				            }
						},100);
					}
				});
			}
			
		}
		
		return _index;
	};
	
	module.closeWinByClassName = function(className){
		let $moduleLayer = this.getLayerByClassName(className);
		if(!$moduleLayer || $moduleLayer.length<1){
			return this;
		}
		
		$.each($moduleLayer, function(index,el) {
			let _win = el.__window,
				$layer = $(el);
			let _index = (""+$layer.attr("id")).replace(/^layui-layer/,"");
			_win.layui.layer.close(_index);
		});
		return this;
	}
	
	/**
	 * 自动吸附位置
	 * @param {Object} option
	 */
	module.autoFixedPosition = function(option){
		let offset = option.offset,
			parent = option.parent,
			children = option.children;
		if(!offset || !parent || !children){
			return;
		}
		
		let _position = {};
		switch (offset){
			case "right":
				_position = {
					left : parent.offset().left+parent.outerWidth(),
					top : parent.offset().top
				};
				break;
			case "bottom":
				_position = {
					left : parent.offset().left,
					top : parent.offset().top+parent.outerHeight()
				};
				break;
			default:
				break;
		}
		children.css({"left":_position.left+"px","top" :_position.top+"px"});
	}
	
	//取出所有layui layer窗口
	module.getLayerArray = function(){
		let _windowArray = xUtilBase.getIframeContentWindowArray();
		let _array = [];
		$.each(_windowArray, function(index,el) {
			if(el.jQuery){
				let $layer = el.jQuery.find(".module-layui-layer");
				if($layer.length>0){
					$.each($layer, function(i,e) {
						e.__window = el;
						_array.push(el.jQuery(e));
					});
				}
			}
		});
		return _array;
	}
	
	/**
	 * 根据选择器返回一个数组
	 * @param {Object} className
	 */
	module.getLayerByClassName = function(className){
		let _array = this.getLayerArray();
		let _ret;
		$.each(_array, function(index,el) {
			if(el.hasClass(className)){
				$.each(el, function(i,e) {
					_ret = jQuery(e);
				});
			}
		});
		return _ret || jQuery("#abcdefgh");
	}
	
})(window,WebLoader.layer={});
