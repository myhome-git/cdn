/**
 * layui 表格组件二次封装
 */

function xUtilLayuiTable(){
	
	if(!layui.table){
		throw new Error("no layui table found");
	}
	
	//指针
	let _this = this;
	
	this.$table = undefined;
	
	//初始化
	this.init = function(option){
		
		//layui参数
		_this._default = {
			elem: undefined,
			cellMinWidth: 1,
			height: undefined,
			size : "sm",
			cols: [],
			toolbar : true,
			url:undefined,
			page : true,
			limit : 30,
			limitAuto : true,
			limits : [10,20,30,40,50,60,70,80,90,100],
//			isLoadScrollbar : true,
			method : "POST",
			parseData:function (result) {
				if(_this._default.callback && _this._default.callback.onParseData){
					return _this._default.callback.onParseData(result);
				}
				
				result.data = result.data || {};
				return {
					code:result.code,
					msg : result.message,
					count: result.data.total ? result.data.total : 0,
					data:result.data.rows || []
				};
			},
			request:{
				pageName:'page',
				limitName:'rows'
			},
			where : undefined,
			done: function(res, curr, count){
				_this._cache = {
					data : res.data,
					curr : curr,
					count : count
				};
				
				if(!_this._default.callback){
					return;
				}
				
				let $tableBox = _this.$table.next().find(".layui-table-box");
				//取消checkbox事件传播
				$tableBox.find(".layui-table-body.layui-table-main tbody .layui-form-checkbox").on("click",function(event){
					event.stopPropagation();
				});
				
				if(_this._default.callback.onSuccessBefore){
					_this._default.callback.onSuccessBefore(res);
					$.each(res.data, function(index,el) {
						el.__LAY_TABLE_INDEX = index;
						if(el.LAY_CHECK_DATA_RESULT!=undefined){
							$tableBox.find(".layui-table-body tbody >tr:eq("+index+")").addClass(el.LAY_CHECK_DATA_RESULT).addClass("lay-check-data-result-"+el.LAY_CHECK_DATA_RESULT);
						}
					});
				}
				
				//绑定行hover
				if(_this._default.callback.onRowMouseHover){
					$tableBox.find(".layui-table-body tbody >tr").hover(function(event){
						event.stopPropagation();
						let $this = $(this);
						let $target = $(event.target);
						
						let $tr = $this,
							_trIndex = $tr.attr("data-index");
						if(_trIndex!=null && _trIndex.length>0){
							_trIndex = Number(_trIndex);
						}
						
						//根据索引取出数据
						let _d = _this.getDataAll()[_trIndex];
						$.each(_this.getDataAll(), function(index,el) {
							if(index.toString()===_trIndex){
								_d = el;
							}
						});
							
						_this._default.callback.onRowMouseHover.over($this,_d);
					},function(event){
						event.stopPropagation();
						let $this = $(this);
						let $target = $(event.target);
						
						let $tr = $this,
							_trIndex = $tr.attr("data-index");
						if(_trIndex!=null && _trIndex.length>0){
							_trIndex = Number(_trIndex);
						}
						
						//根据索引取出数据
						let _d = _this.getDataAll()[_trIndex];
						$.each(_this.getDataAll(), function(index,el) {
							if(index.toString()===_trIndex){
								_d = el;
							}
						});
						_this._default.callback.onRowMouseHover.out($this,_d);
					});
				}
				
				//绑定单元格
				if(_this._default.callback.onRowTdClick){
					$tableBox.find(".layui-table-body tbody >tr >td").on("click.td",function(event){
						event.stopPropagation();
						let $this = $(this);
						let $target = $(event.target);
						
						//选中checkbox
						let $checkbox = $this.parent().find(">td:eq(0) input[type='checkbox']");
						if($target.hasClass("layui-icon layui-icon-ok")){
							
						}else{
							if($checkbox.prop("checked")){
								$checkbox.prop("checked",false);
								$checkbox.removeAttr("checked");
							}else{
								$checkbox.prop("checked",true);
								$checkbox.attr("checked");
							}
							_this.renderForm($checkbox.get(0).type);
						}
						
						let $tr = $this.parent(),
							_trIndex = $tr.attr("data-index");
						if(_trIndex!=null && _trIndex.length>0){
							_trIndex = Number(_trIndex);
						}
						
						//根据索引取出数据
						let _d = _this.getDataAll()[_trIndex];
						$.each(_this.getDataAll(), function(index,el) {
							if(index.toString()===_trIndex){
								_d = el;
							}
						});
							
						if($checkbox.length>0 && _d){
							_d.LAY_CHECKED = $checkbox.prop("checked");
						}
						
						_this._default.callback.onRowTdClick($this,_d);
					});
				}
				
				//取消第一行的冒泡
//				$tableBox.find("tr td .layui-unselect").on("click",function(event){
//					event.stopPropagation();
//					if(_this._default.callback && _this._default.callback.onSelected){
//						let _checkStatus = layui.table.checkStatus(_this.$table.attr("id"));
//						_this._default.callback.onSelected(_checkStatus);
//					}
//				});
				
				if(_this._default.callback.onSuccess){
					_this._default.callback.onSuccess(res, curr, count);
				}
//				console.info(_this._cache);
			}
		};
		
		$.extend(true, _this._default, option);
		_this._default.__url = _this._default.url;
		
		if(_this._default.page){
			
		}else{
			$.extend(true, _this._default, {
				limit : 5000,
			});
		}
		
		$.each(_this._default.cols, function(index,el) {
			$.each(el, function(i,e) {
				//拖动
				if(e.unresize==undefined || e.unresize==null){
					e.unresize = false;
				}
//				//排序
//				if(e.sort==undefined || e.sort==null){
//					e.sort = true;
//				}
			});
		});
		
		//对url进行特殊处理，否则在reload data时会出现刷新
//		_httpURL = _this._default.url;
		
		//声明jquery doc对象
		_this.$table = $(_this._default.elem);
		
		if(_this.$table.length>1){
			console.warn("warning:table id repeat!");
		}
		
		//获取filterName
		let _filterName = _this.$table.attr("lay-filter");
		if(!_filterName){
			_filterName = "lay-filter-"+new Date().getTime()+""+parseInt(Math.random()*1000000);
			_this.$table.attr("lay-filter",_filterName);
		}
		
		//监听事件
		if(_this._default.callback){
			let _callback = _this._default.callback;
			
			if(_callback.onBeforeSend){
				_callback.onBeforeSend();
			}
			
			layui.table.on("row("+_filterName+")", function(obj){
				//未调试完成，待续
//				let $input = obj.tr.find(">td:eq(0) input");
//				if($input.length>0){
//					let _type = $input.get(0).type;
//					if(_type=="checkbox"){
//						$input.prop("checked",!$input.prop("checked"));
//					}else if(_type=="radio"){
//						$input.prop("checked",true);
//					}
//					$input.trigger("click");
//					layui.form.render(_type, _this.$table.next().attr("lay-filter"));
//				}
				if(_callback.onRowClick){
					_callback.onRowClick(obj);
				}
			});
			
			layui.table.on("tool("+_filterName+")", function(obj){
				if(_callback.onRowTool){
					_callback.onRowTool(obj);
				}
			});
			
			layui.table.on("rowDouble("+_filterName+")", function(obj){
				if(_callback.onRowDBLClick){
					_callback.onRowDBLClick(obj);
				}
			});
			
			//选择事件可能与原生绑定有冲突
			if(_callback.onSelected){
				layui.table.on("checkbox("+_filterName+")", function(obj){
					let _checkStatus = layui.table.checkStatus(_this.$table.attr("id"));
					_callback.onSelected(_checkStatus,obj);
				});
				
				layui.table.on("radio("+_filterName+")", function(obj){
					let _checkStatus = layui.table.checkStatus(_this.$table.attr("id"));
					_callback.onSelected(_checkStatus,obj);
				});
			}
			
			layui.table.on("toolbar("+_filterName+")", function(obj){
				if(_callback.onToolbar){
					let _checkStatus = layui.table.checkStatus(obj.config.id);
					_callback.onToolbar(obj.event,_checkStatus);
				}
			});
			
			//窗口变化
			if(_callback.onResize){
//				$(window).on("resize",function(event){
//					//表格载入锁，延时
//					_this.tableLoadClock = event.timeStamp;
//					setTimeout(function(){
//			            if(_this.tableLoadClock-event.timeStamp==0){
//							if(_callback.onResize){
//								_callback.onResize(event);
//							}
//			            }
//					},250);
//				})
			}
		
			//兼容原生写法
			if(_callback.on && _callback.on instanceof Object){
				for(var i in _callback.on){
					layui.form.on(i, _callback.on[i]);
				}
			}
		}
		
		//初始化的对象
		_this.table = layui.table.render(_this._default);
//		if(_this._default.isLoadScrollbar){
//			_this.loadScrollbar();
//		}
	}
	
	/**
	 * 设置tr中的input选中或非选中，请注意，这里只操作dom
	 * 至于layui.table中的缓存数据，请用rowobj.update({LAY_CHECKED :false})，这样获取选中时的方法才会正常
	 */
	this.setRowChecked = function(rowIndex,cosIndex,checked){
		let $tr = this.$table.next().find(".layui-table-body tr[data-index='"+rowIndex+"']");
		let $td = $tr.find("td:eq("+cosIndex+")");
		let $input = $td.find("input");
		$input.prop("checked",checked);
		if(!checked){
			$input.removeAttr("checked");
		}
		try{
			this.renderForm($input.get(0).type);
		}catch(e){
			//TODO handle the exception
		}
		return this;
	}
	
	/**
	 * 渲染table中的表单
	 */
	this.renderForm = function(type){
		layui.form.render(type,this.$table.next().attr("lay-filter"));
	}
	
	//重载表格
	this.reload = function(option){
		if(!this.table){
			return;
		}
		option = option || this._default;
		//isLastPageIndex，加入末尾判断，一般用在删除数据后表格不能正确识别最后一页而出现的空白
		if(option && option["isLastPageIndex"]){
			var _cache = this._cache;
			if(_cache.data.length<=1){
				var _index = _cache.curr;
				if(_index>1){
					_default = {
						page : {
							curr : _index - 1
						}
					};
					$.extend(true, option, _default);
				}
			}
		}
		this.table.reload(option);
	}
	
	//取出表格jquery
	this.getElement = function(){
		return this.$table;
	}
	
	//获取初始化后的layuitable对象
	this.getLayuiTable = function(){
		return this.table;
	}
	
	//获取所有数据，这个方法待定
	this.getDataAll = function(){
		return layui.table.cache[this.$table.attr("id")];
	}
	
	//获取选中数据
	this.getCheckData = function(){
		return layui.table.checkStatus(this.$table.attr("id"));
	}
	
	this.getCheckedData = this.getCheckData;
	
	/**
	 * 加载自定义滚动条，适合tale body已经固定尺寸的情形，注意如果done方法被覆盖，请手动调用一次
	 */
	this.loadScrollbar = function(option){
		return false;
		let $tableView,$tableBody;
		
		//添加补丁
		function addPatch(){
			let $scrollContainer = $tableBody.find(".mCSB_container"),
				$parent = $tableBody.parent();
			let scrollLeft = $scrollContainer.css("left"),
				scrollTop = $scrollContainer.css("top");

			scrollLeft = (""+scrollLeft).replace(/(-|px)/g,"");
			scrollLeft = Number(scrollLeft);
			
			scrollTop = (""+scrollTop).replace(/(-|px)/g,"");
			scrollTop = Number(scrollTop);
			$parent.find(">.layui-table-header").scrollLeft(scrollLeft);
			$parent.find(">.layui-table-fixed").scrollTop(scrollTop);
		}
		
		if(jQuery.mCustomScrollbar && this.$table && this.$table.next()){
			if(_this._default.isLoadScrollbar){
				_this.$table.addClass("layui-table-scrollbar");
			}
			$tableView = this.$table.next();
			$tableBody = $tableView.find(".layui-table-body:eq(0)");
			
			let _default = {
				theme: 'minimal-dark',
				scrollInertia: 60,
				axis: 'yx',
				setTop : 0,
				mouseWheel: {
					enable: true,
					axis: 'yx',
					preventDefault: true
				},
				callbacks : {
					onScrollStart : function(){
						
					},
					onScroll : function(event){
						addPatch();
					}
				}
			};
			$.extend(true, _default, option);
			
			$tableBody.mCustomScrollbar(_default);
			//修正不能设置top的bug
//			$tableBody.find(".mCSB_container").css({"top":"0px"});
//			$tableBody.find(".mCSB_dragger").css({"top":"0px"});
			
			$tableBody.find(".mCSB_container .layui-table").resizePlus(function($this0){
				let $this = $this0,
					$parent = $this0.parent();
				$tableBody.mCustomScrollbar("update");
//				if($this.outerWidth()<=$parent.outerWidth()){
//					$parent.css({
//						"width":"100%",
//					});
//				}else{
//					$parent.css({
//						"width":$this.outerWidth()+"px",
//					});
//				}
			});
			
//			let $header = $scrollbar.find(".layui-table-header");
//			let $newHeader = $header.clone();
//			$scrollbar.append($newHeader.outerHTML());
		}
	}
	
	return this;
}

var ClassLayuiTable = xUtilLayuiTable;