/**
 * layui UI框架对象
 */
function ClassFormAdd(){
	
	ClassFormOBJECT.call(this);
	
	this.type = "add";
	this.name = "表单提交";
	let _this = this;
	
	/**
	 * 接口类
	 */
	this.http = {
		submitForm : function(option){
			let _data = {},
				_url,
				layui = top.layui;
				
			$.extend(true, _data, $doc.getFormValue());
			_data.action = _pageAction || "add";
	
			if(_data.action=="update"){
				_url = getModuleURL("http.shouduan.rongherenwu.update");
			}else{
				_url = getModuleURL("http.shouduan.rongherenwu.add");
			}
			
			let _sendData = JSON.stringify(_data);
			xUtilBase.ajax({
				url : _url,
				data : _sendData,
				success : function(result){
					if(result["code"]=="0"){
						if(_pageAction=="update"){
							layui.layer.msg("更新成功");
						}else{
							layui.layer.msg("添加成功");
						}
						if(option.callback && option.callback.success){
							option.callback.success(result.data);
						}
					}else{
						layui.layer.msg(result["message"]);
					}
				},
				error : function(a,b,c){
					layui.layer.msg(b);
				}
			});
		},
		getById : function(option){
			let _sendData;
			if(option.sendType.toLowerCase()=="json"){
				_sendData = JSON.stringify(option.data);
			}else{
				_sendData = option.data;
			}
			
			let _default = {
				url : getModuleURL("http.shouduan.rongherenwu.getById"),
				data : _sendData,
				success : function(result){
					if(result["code"]=="0"){
						if(!result.data){
							layui.layer.msg("数据格式不正确");
							return false;
						}
						var _d = result.data;
						$doc.setFormValue(_d);
						$doc.layuiFormRender();
					}else{
						layui.layer.msg(result["message"],{time:5000});
					}
				}
			};
			$.extend(true, _default, option.default);
			xUtilBase.ajax(_default);
		},
	}
	
	this.bindEvent = function(){
		
	}
	
};