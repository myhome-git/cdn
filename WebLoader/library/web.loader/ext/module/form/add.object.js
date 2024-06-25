/**
 * layui UI框架对象
 */
function ClassFormOBJECT(){
	
	this.type = "OBJECT";
	this.name = "表单父类";
	
	let _this = this,
		$ = jQuery,
		$doc;
	
	//初始化doc
	this.setFormElement = function($ele){
		$doc = $ele;
		return this;
	}
	
	this.bindEvent = function(){
		
	}
	
	//默认初始化
	this.init = function(){
		this.bindEvent();
	}
};