/**
 * 表格组件
 */
function xTable(){}
(function($,x){
	
	//操作的节点
	x.prototype.TableElement = undefined;
	
	x.prototype.config = {
		//主节点
		TableElement : $("body"),
		//是否可以选择
		selectTrue : "false",
		//表格的类型，数据显示base，单选radio，多选select
		type : "base",	
		//字段数组
		Columns : [],
		//关键字
		uuid : "uuid",
		//生成的分组name
		checkboxName : "groupCheckbox"+new Date().getTime(),
		//宽度
		width : "100%",
		//高度
		height : "100%",
		//是否允许换行
		isTableNowrap : "true",
		//是否自动加入序号
		isTableNum : true
	};
	
	//服务器返回的数据
	this.returndata = {};
	
	//分页控制
	this.control = {
		pageIndex : 1,
		pageSize : 10,
		rsCount : 0
	};
	
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
	x.prototype.init = function(s){
		$.extend(true,this.config, s);
		
		//设置分页控制
		var _control = {
			pageSize : s.pageSize || 10,
			pageStepNumber : s.pageStepNumber
		}
		$.extend(true, this.control, _control);
		
		this.TableElement = this.config.TableElement = $(s.tableId) || $("body");
		this.config.height = this.TableElement.outerHeight();
		
		//this.control.pageSize = this.getLineLength() || 10;
		this.control.pageSize = this.control.pageSize<1 ? 10 : this.control.pageSize;
	}
	
})(jQuery,xTable);
