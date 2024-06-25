//layui 表格组件二次封装
function xUtilLayuiTable(){
	
	//获取表格所需高度，初始化后需要复写
	this.GetTableAutoHeight = function(){}
	
	//layui table object
	this.SetLayuitable = function(_object){
		this.layuitable = _object;
	}
	this.GetLayuitable = function(){
		return this.layuitable;
	}
	
	//table jquery对象
	this.$table = undefined;
	
	//初始化
	this.Init = function(option){
		
		//指针
		var _this = this;
		
		//layui参数
		var _default = {
			layuiTable : undefined,
			elem: undefined,
			cellMinWidth: 1,
			height: undefined,
			page : true,
			limit:30,
			cols: [],
			url:undefined,
			method : "GET",
			parseData:function (result) {
				return {
					code:0,
					count: result.page ? result.page.rsCount || result.page.total || 0 : 0,
					data:result.data || []
				}
			},
			request:{
				pageName:'pageIndex',
				limitName:'pageSize'
			},
			where : undefined,
			done: function(res, curr, count){
				_this._cache = {
					data : res.data,
					curr : curr,
					count : count
				};
//				console.info(_this._cache);
			}
		};
		$.extend(true, _default, option);
		_this.option = _default;
		
		if(_this.option.layuiTable){
			_this.SetLayuitable(_this.option.layuiTable);
		}
		
		//声明jquery doc对象
		_this.$table = $(_this.option.elem);
		if(_this.$table.length>1){
			console.warn("warning:table id repeat!");
		}
		
		//获取filterName
		var _filterName = _this.$table.attr("lay-filter");
		if(!_filterName){
			_filterName = "lay-filter-"+new Date().getTime()+""+parseInt(Math.random()*1000000);
			_this.$table.attr("lay-filter",_filterName);
		}
		
		//监听行事件
		if(_this.option["onRowClick"]){
			_this.GetLayuitable().on("row("+_filterName+")", function(obj) {
				_this.option["onRowClick"](obj);
			});
		}
		
		//监听行按钮事件
		if(_this.option["onRowTool"]){
			_this.GetLayuitable().on("tool("+_filterName+")", function(obj) {
				_this.option["onRowTool"](obj);
			});
		}
		
		//监听自定义on
		if(_this.option["on"]){
			var _layuiTable = _this.GetLayuitable(),
				_on = this.option["on"];
			for(var i in _on){
				if(/switch\(/.test(i)){
					layui.form.on(i, _on[i]);
				}else{
					_layuiTable.on(i, _on[i]);
				}
			}
		}
		
		//选中事件
		if(_this.option["onSelected"]){
			_this.GetLayuitable().on("checkbox("+_filterName+")", function(obj) {
				var _selectList = _this.GetLayuitable().checkStatus(_this.$table.attr("id"));
				_this.option["onSelected"](_selectList,obj);
			});
		}
		
		//窗口变化
		if(_this.option["autoHeight"]){
			$(window).unbind("resize").on("resize",function(event){
				//表格载入锁，延时
				_this.tableLoadClock = event.timeStamp;
				setTimeout(function(){
		            if(_this.tableLoadClock-event.timeStamp==0){
						_this.table.reload({
							height : _this.GetTableAutoHeight()
						});
		            }
				},500);
			})
		}
		
		//初始化的对象
		_this.table = _this.GetLayuitable().render(_this.option);
	}
	
	
	
	//重载表格
	this.reload = function(option){
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
	
}