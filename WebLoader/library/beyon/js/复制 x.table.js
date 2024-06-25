/**
 * 表格组件
 */
function xTable(){
	//节点对象
	this.tableId = undefined;
	//配置
	this.config = {
		tableId : $("body"),
		selectTrue : "false",
		checkbox : "true",
		Columns : [],
		uuid : "id",
		checkboxName : "groupCheckbox"+new Date().getTime(),
		width : "100%",
		isTableNowrap : "true",
		isTableNum : true,
		//是否自动计算页面记录数
		isAutoPageSize : true
	};
	//数据区
	this.datalist = [];
	//分页控制
	this.control = {
		pageIndex : 1,
		pageSize : 10,
		rsCount : 0,
		pageStepNumber : 3
	};
}

(function($,x){
	
	//取出对象类型
	x.prototype.typeOf = function(b){
		var base = Object.prototype.toString.call(b).toLocaleLowerCase();
		return base.replace(/(^\[object\s*)(.*)(\]$)/,"$2");
	}
	
	//创建uuid
	x.prototype.createUUID = function(){
       var d = new Date().getTime();
		var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
		  var r = (d + Math.random()*16)%16 | 0;
		  d = Math.floor(d/16);
		  return (c=='x' ? r : (r&0x3|0x8)).toString(16);
		});
		return uuid;
    }
	
	
	//初始化
	x.prototype.init = function(settings){
		$.extend(true,this.config, settings);
		this.control = {
			pageSize : settings.pageSize,
			pageStepNumber : settings.pageStepNumber		//步进
		};
		
		this.tableId = this.config.tableId = $(settings.tableId) || $("body");
		this.config.height = this.tableId.outerHeight();
		this.createTable();
		this.control.pageSize = this.getLineLength() || 10;
		this.control.pageSize = this.control.pageSize<1 ? 10 : this.control.pageSize;
	}
	
	//清除所有
	x.prototype.empty = function(){
		this.tableId.empty();
	}
	
	//创建loading
	x.prototype.loadding = function(str){
		var dom = this.tableId;
		var len = dom.find("thead th").length;
		var value = ""
				+ "<tr><td Colspan=\""+len+"\" style=\"height:30px;\"><center>"
				+ "<i class=\"iconfont\">&#xe663;</i>"
				+ "<span>"+str+"</span>"
				+ "</center></td></tr>";
		return dom.find("tbody").html(value);
	}
	
	//配置查询
	x.prototype.queryParams = function(params){
		return params;
	}
	
	//创建Table
	x.prototype.createTable = function(){
		var c = this.config,html;
		html = "<div class=\"xTable\">"
			+ "<table class=\""+(c["isTableNowrap"]=="true" ? "table-nowrap" : "")+"\"  cellspacing=\"0\" cellpadding=\"0\">"
			+ this.createTableThead()
			+ "</table>"
			+ "<div class=\"pagePaging x_clearfix\"></div>"
			+ "</div>";
		
		/**
		 * 需用css或js提前设置box的style height，否则可能会获取表格数量异常
		 */
		var o = this.tableId;
		o.css({
			"width" : o.outerWidth()+"px" || "100%"
		});
		o["html"] ? o["html"](html) : "";
		
	}
	
	//创建heade
	x.prototype.createTableThead = function(){
		var c = this.config;
		if(!this.typeOf(c["Columns"])=='array' || c["Columns"].length<1){
			return "";
		}
		var thead = "<thead class=\"thead\" data-type=\"thead\"><tr>";
		var _th = "";
		if(c.checkbox=="checkbox"){
			_th = "<th width=\"34\"><div class=\"thbox\"><input type=\"checkbox\" class=\"th_checkbox\" /></div></th>"
		}else if(c.checkbox=="radio"){
			_th = "<th width=\"34\"><div class=\"thbox\"><input type=\"checkbox\" disabled class=\"th_checkbox\" /></div></th>"
		}
		
		thead += _th;
		
		$.each(c["Columns"], function(i,o) {
			thead += "<th style=\"width:"+o["width"]+"\"><div class=\"thbox\">"+o["title"]+"</div></th>";
		});
		thead += "</tr></thead><tbody class=\"tbody\"></tbody>";
		
		return thead;
	}
	
	//获取表格数量
	x.prototype.getLineLength = function(){
		var _count = 0;
		var xTable = this.tableId.find(".xTable");
		console.info(xTable);
		var _tbody = xTable.find("tbody");
		_tbody.empty();
		for(var i=0;i<100;i++){
			var _tr = $("<tr><td>"+i+"</td></tr>");
			_tbody.append(_tr);
		    if(isScrollTop()){  
				break;
		    }else{  
		       _count += 1;
		    }  
		}
		
		_tbody.empty();
		
		//取出是否有滚动条
		function isScrollTop(){
			if(getScrollTop()>0){
				return true;
			}else{
				return false;
			}
		}
		
		//取出滚动条的位置
		function getScrollTop(){
			try{
				var top = 1;
				document.documentElement.scrollTop = top;
				document.body.scrollTop = top;
			}catch(e){}
			var scrollTop = document.documentElement.scrollTop || document.body.scrollTop || 0;
			return scrollTop;
		}

		return _count;
	}
	
	//节点-创建数据区
	x.prototype.createTableTbody = function(){
		var _this = this;
		if(_this.typeOf(_this.datalist)!=="array"){return;}
		if(_this.datalist.length<1){return;}
		var c = _this.config;
		var tbodyHtml = "";
		$.each(_this.datalist, function(index,d){
			if(index<_this.control.pageSize){
				var tr = "<tr data-uuid=\""+d[c["uuid"]]+"\" data-index=\""+index+"\" data-type=\"unit\">";
				if(c.checkbox=="checkbox" || c.checkbox=="radio"){
					tr += "<td><input type='checkbox' name=\""+c.checkboxName+"\" /></td>"
				}
				$.each(c["Columns"], function(i,o) {
					tr += "<td>"+d[o["field"]]+"</td>";
				});
				tr += "</tr>";
				tbodyHtml += tr;
			}else{
				return;
			}
		});
		
		//tbodyHtml = "<tbody class=\"tbody\">"+tbodyHtml+"</tbody>";
		var dom = this.tableId;
		dom.find("tbody").html(tbodyHtml);
		this.bindTheadChecked();
	}
	
	//数据提交
	x.prototype.ajaxGetTableData = function(){
		var _this = this;
		_this.tableId.find(".pagePaging").empty();
		_this.loadding("正在与服务器通讯...");
		
		var c = _this.config;
		//c.tableId.find("tbody").empty();
		//c.tableId.find(".pagePaging").empty();
		var _queryParams = _this.queryParams({
			pageIndex : _this.control.pageIndex,
			pageSize : _this.control.pageSize
		});
		
		var _default = {
			dataType : "json",
			async : true,
			beforesend : function(){
				_this.loadding("正在向服务器请求数据...");
			},
			success : function(data){
				var _ret = data["return"];
				if(_ret["code"]=="00000"){
					_this.datalist = data["datalist"];
					data["page"] ? data["page"] : {};
					$.extend(true, _this.control, data["page"]);
					$.extend(true, _this.control, _this.jpage(_this.control));
					_this.createPageFootNav();
					_this.createTableTbody();
					_this.onLoadSuccess();
				}else{
					_this.loadding(_ret["message"]);
				}
			},
			error : function(jqXHR, textStatus, errorThrown){
				_this.loadding("服务器请求失败，请刷新重试");
			}
		};
		
		$.extend(true, _default, _queryParams);
		
		$.ajax(_default);
		
	}
	
	//创建分页节点
	x.prototype.createPageFootNav = function(){
		var control = this.control;
		var str = "<center>"
					+ "<span>每页["+control.pageSize+"]条</span>，"
					+ "<span>共["+control.rsCount+"]条</span>，"
					+ "<i class=\"pageIndex\">"+control.pageIndex+"</i>/<i class=\"pageCount\">"+control.pageCount+"</i>页"
					+ "<div class=\"x-inlineblock\" style=\"width:20px;\"></div>"
					+ "<div class=\"pageStep x-inlineblock\">";
					
					//步长从2开始才显示首页
					if(control.pageStep[0] > 1){
						str += "<span class=\"pageNumber pageleft\" data-index=\"1\">首页</span>";
					}
					
					//步长结尾和步长开始相减大于0才显示步长
					if(control.pageStep[1]-control.pageStep[0] > 0){
						var selectIndex;
						for(var i=control.pageStep[0];i<=control.pageStep[1];i++){
							if(i==control.pageIndex){
								selectIndex = "selectIndex"
							}else{
								selectIndex = ""
							}
							str += "<a class=\"pageNumber "+selectIndex+"\" data-index=\""+i+"\">"+(i)+"</a>";
						}
					}
					
					//只有步进结尾小于总页数才显示尾页
					if(control.pageStep[1] < control.pageCount){
						str +=  "<span class=\"pageNumber pageright\" data-index=\""+control.pageCount+"\">尾页</span>";
					}
					
				str += "</div>";
					
					//只有总页数超出步长，才显示跳转
					if(control.pageStepNumber < control.pageCount){
						str += "<div class=\"x-inlineblock\" style=\"width:20px;\"></div>"
							+ "<span>到第&nbsp;</span>"
							+ "<input type=\"text\" class=\"jumpNumber\" />"
							+ "<span>&nbsp;页</span>"
							+ "<div class=\"x-inlineblock\" style=\"width:10px;\"></div>"
							+ "<span class=\"btnJump\">跳转</span>";
					}

				str += "</center>";
		
		this.tableId.find(".pagePaging").empty().html(str);
		this.bindJpage();
	}
		
	//生成分页数据
	x.prototype.jpage = function(option){		
		var _default = {
			rsCount : 0,				//总条数
			pageSize : 10,				//每页大小
			pageCount : 0,				//分页数量
			pageIndex : 1,				//当前第几页
			pageStepNumber : 3,			//步长
			pageStep : [],				//步进
			pageIsHome : false,			//是否是首页
			pageIsEnd : false			//是否有尾页
		};
		
		//加载参数,如果为undefined则不覆盖，null会替换当前参数
		_default = $.extend(true,_default , option);
		
		//全部进行Number转换，防止类型不正确导致计算失败
		_default = {
			rsCount : Number(_default.rsCount),
			pageSize : Number(_default.pageSize),
			pageCount : Number(_default.pageCount),
			pageIndex : Number(_default.pageIndex),
			pageStepNumber : Number(_default.pageStepNumber)
		};
		
		//验证转换结果
		for(var i in _default){
			//如果为null，或者转换失败，则会出现NaN	
			if(_default[i].toString()=="NaN"){
				throw new Error("jsPading params error");
			}
		}
		
		//如果记录数小于1，修正为0，防止负数出现
		_default.rsCount = _default.rsCount < 1 ? 0 : _default.rsCount;
		
		//总分页数
		_default.pageCount = _default.rsCount%_default.pageSize==0
			? _default.rsCount/_default.pageSize 
			: parseInt(_default.rsCount/_default.pageSize)+1;
		
		//修正当前页		
		_default.pageIndex = _default.pageIndex>_default.pageCount ? _default.pageCount : _default.pageIndex;
		_default.pageIndex = _default.pageIndex<1 ? 1 : _default.pageIndex;
		
		//根据用户想看的页pagenum，算出页面的起始和结束页码
		_default.pageStepNumber = _default.pageStepNumber<3 ? 3 : _default.pageStepNumber;
		
		if(_default.pageCount<=_default.pageStepNumber){
			//如果不是最后
			_default.pageStep = [1,_default.pageCount];
		}else{
			_default.pageStep = [_default.pageStepNumber%2==0
				?_default.pageIndex-parseInt(_default.pageStepNumber/2-1)
				:_default.pageIndex- parseInt(_default.pageStepNumber/2),_default.pageIndex + parseInt(_default.pageStepNumber/2)];
		}
		
		_default.pageStep = _default.pageStep[0]<1
			? [1,_default.pageStepNumber]
			: _default.pageStep;
			
		_default.pageStep = _default.pageStep[1]>_default.pageCount 
			? [_default.pageCount-(_default.pageStepNumber-1),_default.pageCount]
			: _default.pageStep;
			
		_default.pageStep = _default.pageStep[0]>_default.pageStep[1] 
			? [_default.pageStep[1],_default.pageStep[1]] 
			: _default.pageStep;
		
		_default.pageStepList = [];
		for(var i=_default.pageStep[0];i<=_default.pageStep[1];i++){
			_default.pageStepList.push(i);
		}

		_default.pageIsHome = _default.pageIndex > 1 ? true : false;
		_default.pageIsEnd = _default.pageIndex < _default.pageCount ? true : false;
	
		_default.result = ""
			+ "记录数["+_default.rsCount+"]"
			+ "，每页大小["+_default.pageSize+"]"
			+ "，分页数["+_default.pageCount+"]"
			+ "，当前页索引["+_default.pageIndex+"]"
			+ "，步进["+_default.pageStep+"]"
			+ "，步长["+_default.pageStepNumber+"]"
			+ "，是否有首页["+_default.pageIsHome+"]"
			+ "，是否有尾页["+_default.pageIsEnd+"]";
		return _default;
	}
	
	//绑定分页事件
	x.prototype.bindJpage = function(){
		var _this = this;
		var _tableId = this.tableId;
		_tableId.find(".pageNumber").on("click",function(){
			var pageIndex = parseInt($(this).attr("data-index"));
			_this.control.pageIndex = pageIndex;
			_this.ajaxGetTableData();
			
		});
		
		_tableId.find(".btnJump").on("click",function(){
			var pageIndex = _tableId.find(".jumpNumber").val();
			pageIndex = parseInt(pageIndex);

			if(isNaN(pageIndex) || pageIndex<1){
				pageIndex = 1;
			}
			if(pageIndex > _this.control.pageCount){
				pageIndex = _this.control.pageCount;
			}
			_this.control.pageIndex = pageIndex;
			_this.ajaxGetTableData();
		});
	}
	
	//加载成功后
	x.prototype.onLoadSuccess = function(){
		
	}
	
	//节点-绑定选中事件
	x.prototype.bindTheadChecked = function(){
		var _this = this;
		var tableId = _this.tableId;
		tableId.find(".xTable thead .th_checkbox").on("click",function(){
			var $this = $(this);
			if(_this.config.checkbox=="checkbox"){
				if($this.is(":checked")==true){
					_this.setCheckedAll();
				}else{
					_this.setCheckedNoneAll();
				}
			}else{
				$this.prop("checked",false);
			}
		});
		
		tableId.find(".xTable tbody tr[data-type='unit']").on("click",function(){
			var $this = $(this);
			if(_this.config.checkbox=="radio"){
				if($this.attr("data-action")!=="checked"){
					_this.setCheckedNoneAll();
					_this.setCheckedId($this.attr("data-uuid"));
				}else{
					_this.setCheckedNoneId($this.attr("data-uuid"));
				}
			}else if(_this.config.checkbox=="checkbox"){
				if($this.attr("data-action")!=="checked"){
					_this.setCheckedId($this.attr("data-uuid"));
				}else{
					_this.setCheckedNoneId($this.attr("data-uuid"));
				}
			}
		});
	}
	
	//节点-选中ID
	x.prototype.setCheckedId = function(uuid){
		var $this = this.tableId.find("tbody tr[data-type='unit'][data-uuid='"+uuid+"']");
			$this
			.attr("data-action","checked")
			.addClass("checked");
			var checkBox = $this.find("input[name='"+this.config.checkboxName+"']")
			checkBox.prop("checked",true);
	}
	//节点-选中取消ID
	x.prototype.setCheckedNoneId = function(uuid){
		var $this = this.tableId.find("tbody tr[data-type='unit'][data-uuid='"+uuid+"']");
			$this
			.removeAttr("data-action")
			.removeClass("checked");
			var checkBox = $this.find("input[name='"+this.config.checkboxName+"']")
			checkBox.prop("checked",false);
	}
	
	//节点-全部选中
	x.prototype.setCheckedAll = function(){
		var _this = this;
		_this.tableId.find("tbody tr[data-type='unit']").each(function(){
			_this.setCheckedId($(this).attr("data-uuid"));
		});
	}
	//节点-取消全部选中
	x.prototype.setCheckedNoneAll = function(){
		var _this = this;
		_this.tableId.find("tbody tr[data-type='unit']").each(function(){
			_this.setCheckedNoneId($(this).attr("data-uuid"));
		});
	}
	//节点-取选中数据
	x.prototype.getTableCheckedDataList = function(){
		var _this = this;
		var ret = [];
		_this.tableId.find("tbody tr[data-type='unit'][data-action='checked']").each(function(index,el){
			var id = $(el).attr("data-uuid");
			var temp = _this.getTableDataId(id);
			if(temp){
				ret.push(temp);
			}
		});
		return ret;
	}
	
	//取数据全部
	x.prototype.getTbaleDataAll = function(){
		return this.datalist;
	}
	
	//节点-删除数据ID
	x.prototype.removeTableSelected = function(uuid){
		this.tableId.find("tr[data-uuid='"+uuid+"']").remove();
	}
	
	//数据区-取数据ID
	x.prototype.getTableDataId = function(uuid){
		var _this = this;
		for(var i in _this.datalist){
			var d = _this.datalist[i];
			if(d[_this.config.uuid].toString() ===uuid.toString()){
				return d;
			}
		}
	}
	
	//数据区-删除数据ID
	x.prototype.deleteTableId = function(uuid){
		var _this = this;
		for(var i=0;i<_this.datalist.length;i++){
			var d = _this.datalist[i];
			if(d[_this.config.uuid].toString()==uuid.toString()){
				_this.datalist.splice(i,1);
				return d;
			}
		}
	}
	
})(jQuery,xTable);