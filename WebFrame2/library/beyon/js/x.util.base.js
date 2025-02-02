﻿/*********************************************************
*	自定义工具类
*********************************************************/
window.onerror = function(){
	//return true;
};

//修复ie不支持console会报错bug
if(!window.console){
	window.console =  {
		info : function(o){
			alert(JSON.stringify(o));
		}
	};
	window.console.log = function(option){
		window.console.info(option);
	}
}

var x = xUtilBase = {};
(function($,x){
	
	"use strict";
	
	/**
	 * 判断参数类型
	 * string、number、boolean、array、object、null、undefined、function、date
	 * @param {Object} object
	 */
	x.getObjectType = function(object){
		var s = Object.prototype.toString.call(object).toLocaleLowerCase();
		return s.replace(/(^\[object\s*)(.*)(\]$)/,"$2");
	}
	
	x.typeOf = function(object){
		return x.getObjectType(object);
	}
	
	x.typeof = function(object){
		return x.typeOf(object);
	}
	
	/**
	 * 判断是否是一个JQuery对象
	 * @param {Object} object
	 */
	x.isJQueryObject = function(object){
    	return object instanceof jQuery;
	}
	
	/**
	 * 判断是否是一个Date对象
	 * @param {Object} object
	 */
	x.isDateObject = function(object){
    	return object instanceof Date;
	}
	
	x.isObjectEmpty = function(object){
		var ret = false;
		for(var i in object){
			ret = true;
			break;
		}
		return ret;
	}
	
	/**
	 * 判断是否为有效数字
	 * @param {Object} object
	 */
	x.isNumber = function(object){
		if(x.getObjectType(object)!="string" && x.getObjectType(object)!="number"){
			return false;
		}	
		var object = Number(object);
    	if(isNaN(object)){
    		return false;
    	}
    	if(object===Infinity || object===-Infinity){
    		return false;
    	} 	
    	return true;
	}
	
	
	/**
	 * 判断是否为一个整数
	 * @param {Object} num
	 */
	x.isInteger = function(num) {
        return Math.floor(num) === num;
	}
	
	/**
	 * 判断是否是汉字
	 * @param {Object} object
	 */
    x.isChinese = function(object){
    	return /^[\u4e00-\u9fa5]+$/.test(""+object);
    	var reg = new RegExp("[\\u4E00-\\u9FFF]+","g");
    	return reg.test(val);
    }
    
    /**
     * 匹配帐号是否合法(必须以字母开头，允许5-16位，允许字母数字下划线)
     * @param {Object} name
     */
    x.isUserName = function(name){
    	if(name===undefined || name===null){
    		return false;
    	}
    	return /^[a-zA-Z][a-zA-Z0-9_]{4,15}$/.test(""+name);
    };
    
    /**
     * 验证手机号码
     * @param {Object} object
     */
    x.isPhone = function(object){
    	//目前手机号网段为13,15,18,17,19,16
		var re= /^(((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1})|(19[0-9]{1})|(16[0-9]{1}))+\d{8})$/; 
		return re.test(""+object);
	}
	
	/**
	 * 验证是否email格式
	 * @param {Object} object
	 */
	x.isEmail = function(object){
		var re = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
		return re.test(""+object);
	}
	
	/**
	 * 验证身份证号码是否合法(18位)
	 * @param {Object} code
	 */
	x.isIdCard = function(code){
		code = (""+code).toString();
		if(code.length<16){
			if(/(^[1-9]\d{14}$)/.test(code)===false){
				return false;
			}
		}else{
			if(/(^[1-9]\d{16}(\d|X|x)$)/.test(code)===false){
				return false;
			}
		}
		return true;
	}
	
	/*
	x.getFunctionName = function(arguments){
		var s = arguments.callee.toString();
		var p = /^function\s*(\w*)/;
		var _a = s.match(p);
		return _a ? _a[1] : undefined;
	}
	*/
	
	/**
	 * 根据一个字符串返回扩展名(不带.)
	 * @param {Object} string
	 */
	x.getFileExtend = function(string){
		var d=/\.[^\.]+$/.exec(string);
		if(!d){
			d = "";
		}else{
			d = d[0];
		}
		//替换特殊字符
		d = d.replace(/\./,"");
		return d;
	} 

	/**
	 * 根据18位身份证取出性别
	 * @param {Object} object
	 */
	x.getIdCardSex = function(object){
		try{
			var sex = (""+object).substring(14,17)%2==0 ? '女':'男';
			return sex;
		}catch(e){}
		return undefined;
	}
	
	/**
	 * 根据身份证取出出生年月，返回一个对象
	 * @param {Object} str
	 * @param {Object} type
	 */
	x.getIdCardBirth = function(str,type){
		try{
			var idCard,birth,retType;
			idCard = str===undefined ? "" : str.toString();
			retType = type===undefined ? "object" : "string";
			if(idCard.length==18){
				birth = idCard.substring(6,14);
			}else if(idCard.length==15){
				birth = "19"+idCard.substring(6,12);
			}
			if(retType == "object"){
				return {
					year : birth.substring(0,4),
					month : birth.substring(4,6),
					day : birth.substring(6,8)
				}
			}else{
				return {
					year : parseInt(birth.substring(0,4)),
					month : parseInt(birth.substring(4,6)),
					day : parseInt(birth.substring(6,8))
				}
			}
		}catch(e){}
		return undefined;
	}
		
    /**
     * 运行一个函数
     * @param {Object} callback
     */
    x.exeFunction = function(callback){
    	if(x.getObjectType(callback)=="function"){
    		callback();
    	}
    },
	
	/**
	 * 封装ajax
	 * @param {Object} params
	 */
	x.ajax = function(params){
		var _default = {
			dataType : "json",
			type : "POST",
			error : function(xhr,type,text){
				layer.msg(""+text,{time:5000});
			},
			beforeSend : function(xhr,event){
				//ajax发送之前，不可修改event数据
				//console.info("beforeSend生效",xhr,event);
			},
			complete : function(xhr,text){
				//ajax执行完毕，不论成功或失败
				//console.info("complete生效",xhr,text);
			}
		};
		_default = $.extend(true, _default, params);
		$.ajax(_default);
	}
	
	/**
	 * 对特殊符号进行转换
	 * @param {Object} object
	 */
	x.encodeHtml = function(object){
		var codeMap = {
			"<":"",
			">":"",
			"&":"",
			"\"":"",
			"\\":"",
			"'":"",
			"(":"",
			")":"",
			"：" : "",
			"," : "",
			"，" : "",
			" " : "",
			"100" : "",
			"102" : ""
		};
		object = ""+object;
		for(var i in codeMap){
			object = x.replaceAll(object,i,codeMap[i]);
		}
		return object;
	}
	
	/**
	 * 对数据有效性进行验证
	 * @param {Object} sourceObject
	 * @param {Object} optionObject
	 */
	x.dataVerification = function(sourceObject,optionObject){
		if(x.getObjectType(sourceObject)!="object" || x.getObjectType(optionObject)!="object"){
   			return;
   		}
   		for(var i in sourceObject){
			if(x.getObjectType(optionObject[i])===undefined || x.getObjectType(optionObject[i])==null || optionObject[i]==""){
				return sourceObject[i];
			}
		}
   		return true;
	}
	
	/**
	 * str2UTF8
	 * @param {Object} object
	 */
	x.str2UTF8 = function(object){
    	var bytes = new Array();   
	    var len,c;  
	    len = str.length;  
	    for(var i = 0; i < len; i++){
	        c = str.charCodeAt(i);  
	        if(c >= 0x010000 && c <= 0x10FFFF){  
	            bytes.push(((c >> 18) & 0x07) | 0xF0);  
	            bytes.push(((c >> 12) & 0x3F) | 0x80);  
	            bytes.push(((c >> 6) & 0x3F) | 0x80);  
	            bytes.push((c & 0x3F) | 0x80);  
	        }else if(c >= 0x000800 && c <= 0x00FFFF){  
	            bytes.push(((c >> 12) & 0x0F) | 0xE0);  
	            bytes.push(((c >> 6) & 0x3F) | 0x80);  
	            bytes.push((c & 0x3F) | 0x80);  
	        }else if(c >= 0x000080 && c <= 0x0007FF){  
	            bytes.push(((c >> 6) & 0x1F) | 0xC0);  
	            bytes.push((c & 0x3F) | 0x80);  
	        }else{  
	            bytes.push(c & 0xFF);  
	        }  
	    }  
	    return bytes;  
    }
    
    /**
     * 将一个char数组转换成字符串
     * @param {Object} bytes
     */
    x.charsToString = function(bytes){
    	var _return = "";
		for(var i in bytes){
			_return += String.fromCharCode(bytes[i]);
		}
		return _return;
    }
    /**
	 * 格式化一个对象，转换为JSONVALUE方式
	 * @param {Object} object
	 */
    x.toJsonValue = function(object){
		var data = $.extend(true, {}, object);
    	data["TIMESTAMP"] = new Date().getTime();
    	var _ret = JSON.stringify(data);
    	_ret = encodeURIComponent(_ret ,true);
    	return _ret;
    }
    x.toJsonValueHex = function(object){
    	var _ret = x.toJsonValue(object);
    	var _return = "";
    	for(var i=0;i<_ret.length;i++){
			_return += i==0 ? x.toHex(_ret.charCodeAt(i)) : "|" + x.toHex(_ret.charCodeAt(i));
		}
		return _return;
    }
    
    
    /**
	 * 格式化一个对象，转换为JSONVALUE方式
	 * @param {Object} object
	 */
    x.toJsonValueInput = function(object){
    	return x.toJsonValue({input:object});
    }
    
    /**
     * 取浏览器信息
     */
    x.getBrowser = function(){
		var sys = {},
			ua = navigator.userAgent.toLowerCase(),
			re =/(msie|firefox|chrome|opera|version).*?([\d.]+)/,
			m = ua.match(re);
		sys.info = ua;
		sys.browser = m[1].replace(/version/, "'safari");
		sys.ver = m[2];
		return sys;
		
	}
    
    /**
     * 取浏览器地址栏参数
     * @param {Object} name
     */
    x.getUrlParam = function (name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
		var r = window.location.search.substr(1).match(reg);
		if (r != null) return decodeURIComponent(r[2]); return null;
	}
    
	/**
	 * 设置url参数，如果不存在则自动创建，如果存在则覆盖
	 */
	x.setURLParam = function(destiny,par,par_value){
		par_value = encodeURIComponent(par_value ,true);
		destiny = destiny || "";		
		var pattern = par + '=([^&]*)';
		var replaceText = par + '=' + par_value;
		if(destiny.match(pattern)) {
			var tmp = '/\\' + par + '=[^&]*/';
			tmp = destiny.replace(eval(tmp), replaceText);
			return(tmp);
		} else {
			if(destiny.match('[\?]')) {
				return destiny + '&' + replaceText;
			} else {
				return destiny + '?' + replaceText;
			}
		}
		return destiny + '\n' + par + '\n' + par_value;
	}
	
	/**
	 * 取密码等级,共1,2,3
	 * @param {Object} str
	 */
	x.getPasswordLevel = function(str){
		var s = str===undefined ? str="" : str.toString(),
			level = 0;
		if(s.length<6){return level;}
		var reg = /[0-9]+/igm;
		reg.test(s) ? level=level+1 : level;
		reg = /[a-z]+/igm;
		reg.test(s) ? level=level+1 : level;
		reg = /[\.\!@#\$%\^&\*\(\)\[\]\{\}]{1,}/igm;
		reg.test(s) ? level=level+1 : level;
		return level;
	}
	
	//生成随机key
	x.getKey = function(){
		var key="0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz[]{}:/,"
		Math.random();
		for(var i=0;i<1000;i++){
			var x= parseInt(Math.random()*(key.length)+1),
				y = parseInt(Math.random()*(key.length)+1),
				si = key.substring(x-1,x),
				sj = key.substring(y-1,y);
			key = key.replace(si,"-")
				.replace(sj,si)
				.replace("-",sj);
		}
		return key;
	}
	
	//根据key进行加密
	x.setStringEncode = function(keyStr,s){			
		var temp_str="0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz[]{}:/,",
			_array = [],
			e = "";
		s = encodeURIComponent(s);
		for(var i=0;i<128;i++){
			_array[i] = String.fromCharCode(i);
			var li = temp_str.indexOf(_array[i]);
			if(li>-1){
				_array[i] = keyStr.substring(li,li+1);
			}
		}
		for(var i in s){
			e = e + _array[s.charCodeAt(i)];
		}
		return e.replace(/(\-*$)/g, "");
	}
	
	//解密
	x.getStringDecode = function(keyStr,s){
		var temp_str="0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz[]{}:/,",
			_array = [],
			e = "";
		for(var i=0;i<128;i++){
			_array[i] = String.fromCharCode(i);
			var li = temp_str.indexOf(_array[i]);
			if(li>-1){
				_array[i] = keyStr.substring(li,li+1);
			}
		}
		var _s = s;
		for(var i in _s){
			var _d = _s[i];
			var _li = -1;
			for(var x=0;x<128;x++){
				if(_array[x]==_d){
					_li = x;
					break;
				}
			}
			//_li = -1 ? e= e + String.fromCharCode(_li) : 
			e = e + String.fromCharCode(_li);
		}
		return e;
	}


    /**
     * 创建一个uuid
     */
    x.createUUID = function(){
       var d = new Date().getTime();
		var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
		  var r = (d + Math.random()*16)%16 | 0;
		  d = Math.floor(d/16);
		  return (c=='x' ? r : (r&0x3|0x8)).toString(16);
		});
		return uuid;
    }
    
    /**
     * 取右边字符串
     * @param {Object} string
     * @param {Object} i
     */
	x.getStringRight = function(string,i){
		i = i===undefined ? string.length : i;
		i = i > string.length ? string.length : i;
		return string.match(new RegExp(".*(.{"+i+"})"))[1];
	}
	
	/**
	 * 将一个字符串格式化为对象，字符串格式例如：model.user.name
	 * @param {Object} data
	 * @param {Object} key
	 * @param {Object} val
	 */
	x.setStringFormatObject = function(data,key,val){
		var pattern = /(\w*)\W(\w.*)$/;
		var _array = key.match(pattern);
		if(_array===null){
			data[key] = val;
			return data;
		}
	    data[_array[1]] = data[_array[1]] || {};
		data[_array[1]] = this.setStringFormatObject(data[_array[1]],_array[2],val);
		return data;
	},
	/**
	 * 用字符串方式从一个对象中取出对象
	 * @param {Object} data
	 * @param {Object} key
	 */
	x.getStringFormatObject = function(data,key){
		if(!data){
			return undefined;
		}
		var pattern = /(\w*)\W(\w.*)$/;
		var _array = key.match(pattern);
		if(!_array){
			return data[key];
		}else{
			return this.getStringFormatObject(data[_array[1]],_array[2]);
		}
	}
		
	/**
	 * 转换为unicode编码
	 * @param {Object} str
	 */
	x.toUnicode = function(str){
		str = str===undefined ? "" : str;
		return escape(str).toLocaleLowerCase().replace(/%u/gi,"\\u");
	}
	
	/**
	 * 到16进制字符串
	 * @param {Object} num
	 */
	x.toHex = function(num){
		var str = num<16?"0x0"+num.toString(16).toUpperCase():"0x"+num.toString(16).toUpperCase();
		//str += "000000";
		return str.substring(0,6);
	}
	
	
	/**
	 * 替换全部字符串(不能包含特殊字符)
	 * @param {Object} reallyDo
	 * @param {Object} replaceString
	 */
	x.replaceAll = function(string,replaceString,replaceNewString){
		try{
			var jsSpecialChars = ["\\", "^", "$", "*", "?", ".", "+", "(", ")", "[","]", "|", "{", "}"];
			var replaceString = replaceString===undefined ? "" : ""+replaceString;
			var replaceNewString = replaceNewString===undefined ? "" : ""+replaceNewString;
			for (var i = 0; i < jsSpecialChars.length; i++) {
		        replaceString = replaceString.replace(new RegExp("\\"
		                + jsSpecialChars[i], "g"), "\\"
		                + jsSpecialChars[i]);
			}
			for (var i = 0; i < jsSpecialChars.length; i++) {
		        replaceNewString = replaceNewString.replace(new RegExp("\\"
		                + jsSpecialChars[i], "g"), "\\"
		                + jsSpecialChars[i]);
			}
			var reg = new RegExp(replaceString,"gm");
			return string.replace(reg,replaceNewString);
		}catch(e){}
	}
	
	/**
	 * 保留小数
	 * @param {Object} num
	 * @param {Object} s
	 */
    x.toFixed = function(num, s) {
	    var times = Math.pow(10, s)
	    var des = num * times + 0.5
	    des = parseInt(des, 10) / times
	    return des + ''
	}
	

    /**
     * 格式化参入参数,只能用在function内部
     * 示例：function test(a,b,c,d,f,g,h,i){
	 *			console.info(x.getFormatArguments(arguments));
	 *		}
     * @param {Object} arrayArguments
     */
    x.formatArguments = function(arrayArguments){
    	/**
    	 * 不明白为何IE下不能用foreach循环
    	 */
    	var params = {};
    	for(var i=0;i<arrayArguments.length;i++){
    		var d = arrayArguments[i],
				name = x.getObjectType(d);
				if(params[name]===undefined){
					params[name] = d;
				}else{
					var y = 0;
					while(params[name+y]!=undefined){
						y += 1;
					}
					params[name+y] = d;
				}
    	}
    	return params;
	};
	
	/**
	 * 默认接收两个参数，一个string，一个callback
	 */
	x.buttonClick = function(){		
		var params = x.formatArguments(arguments);		
		var name = params["string"];
		var callback = params["function"];
		var boolean = params["boolean"];
		$("[x-button-name='"+name+"']").unbind("click").on("click",function(event){
			//是否冒泡，默认允许
			if(boolean===false){
				if (window.event) {
					event.cancelBubble=true;// ie下阻止冒泡
				} else {
				  //e.preventDefault();
				  event.stopPropagation();// 其它浏览器下阻止冒泡
				}
			}
			try{
				x.exeFunction(callback(event));
			}catch(e){}
			return this;
		});
	}
   
   /*
	* formatMoney(s,type)
	* 功能：金额按千位逗号分割
	* 参数：s，需要格式化的金额数值.
	* 参数：type,判断格式化后的金额是否需要小数位.
	* 返回：返回格式化后的数值字符串.
	*/ 
	x.formatMoney = function(s, type) {
		if(/[^0-9\.]/.test(s))
			return "0";
		if(s == null || s == "")
			return "0";
		s = s.toString().replace(/^(\d*)$/, "$1.");
		s = (s + "00").replace(/(\d*\.\d\d)\d*/, "$1");
		s = s.replace(".", ",");
		var re = /(\d)(\d{3},)/;
		while(re.test(s))
		s = s.replace(re, "$1,$2");
		s = s.replace(/,(\d\d)$/, ".$1");
		if(type == 0) { // 不带小数位(默认是有小数位)
			var a = s.split(".");
			if(a[1] == "00") {
				s = a[0];
			}
		}
		return s;
	}
	
	/**
	 * 禁用退格键
	 */
	x.disablePageBackEvent = function(){
		function banBackSpace(e) {
			var ev = e || window.event; //获取event对象
			var obj = ev.target || ev.srcElement; //获取事件源
			var t = obj.type || obj.getAttribute('type'); //获取事件源类型
			//获取作为判断条件的事件类型
			var vReadOnly = obj.getAttribute('readonly');
			var vEnabled = obj.getAttribute('enabled');
			//处理null值情况
			vReadOnly = (vReadOnly == null) ? false : vReadOnly;
			vEnabled = (vEnabled == null) ? true : vEnabled;
			//当敲Backspace键时，事件源类型为密码或单行、多行文本的，
			//并且readonly属性为true或enabled属性为false的，则退格键失效
			var flag1 = (ev.keyCode == 8 && (t == "password" || t == "text" || t == "textarea") && (vReadOnly == true || vEnabled != true)) ? true : false;
			//当敲Backspace键时，事件源类型非密码或单行、多行文本的，则退格键失效
			var flag2 = (ev.keyCode == 8 && t != "password" && t != "text" && t != "textarea") ? true : false;
			//判断
			if(flag2) {
				return false;
			}
			if(flag1) {
				return false;
			}
		}
		//禁止后退键 作用于Firefox、Opera
		document.onkeypress=banBackSpace;
		//禁止后退键 作用于IE、Chrome
		document.onkeydown=banBackSpace;
		//处理键盘事件 禁止后退键（Backspace）密码或单行、多行文本框除外
	}
	/**
	 * 禁用F5事件
	 */
	x.disablePageF5Event = function(){
		document.onkeydown = function(e){
			e = window.event || e;
			var keycode = e.keyCode || e.which;
			if(e.ctrlKey || e.altKey || e.shiftKey || keycode >= 112 && keycode <= 123) {
				if(window.event) { // ie
					try {
						e.keyCode = 0;
					} catch(e) {}
					e.returnValue = false;
				} else { // ff
					e.preventDefault();
				}
			}
		}
	}
	
	/**
	 * 禁用右键
	 */
	x.disablePageRightButtonEvent = function(){
		document.oncontextmenu = function(e){
			return false;
		}
	}
	/**
     * 抛出一个异常
     * @param {Object} error
     */
	x.throwNewError = function(error){
   		throw new Error(error);
	},
	
	/**
	 * layui table组件单击时不能选中，就算样式变化，但是实际选择数据部分根本没选中，使用这个同步选中状态和数据
	 * @param {Object} obj
	 */
	x.layuiTableTdClickEventSelectedPatch = function($tableBox){
		$($tableBox).find(".layui-table-body td:not(.layui-table-col-special)").on("click",function(event){
			var $this = $(this);
			var $input = $this.parent().find(".laytable-cell-checkbox > input");
			$input.next().find(">i").trigger("click");
		});
	}
	
	/**
	 * 用于数据变化后，重置table
	 * @param {Object} $tableBox
	 * @param {Object} datas
	 */
	x.layuiTableResetDatasPatch = function($tableBox,datas){
		for(var i=0;i<datas.length;i++){
	   		var d = datas[i];
	   		var tr = $tableBox.find(".layui-table-body tbody tr[data-index='"+i+"']");
	   		tr.attr("x-uuid",d["uuid"]);
	   		for(var x in d){
	   			var td = tr.find("td[data-field='"+x+"']");
	   			td.find(".layui-table-cell").html(d[x]);
	   		}
	  	}
	}
	
	x.jsPading = function(_params){		
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
		var params = x.formatArguments(arguments);
		_default = $.extend(true,_default , params["object"]);
		
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
			+ "，是否有尾页["+_default.pageIsEnd+"]"
		return _default;
	}
})(jQuery,xUtilBase);

/**
 * x class date
 * @param {Object} $
 * @param {Object} x
 */
(function($,x){
	
	"use strict";
	
	var date = {};
	
	/**
	 * 创建一个日常时间对象
	 * 默认传入对象为date，如果无参数，则以当前时间自动创建
	 * @param {Object} object
	 */
	date.newDate = function(object,format){		
		var d = object instanceof Date ?  object : new Date();
		d = {
			year : d.getFullYear(),
			month : d.getMonth()+1,
			date : d.getDate(),
			hour : d.getHours(),
			minute :  d.getMinutes(),
			seconds :  d.getSeconds(),
			day : d.getDay() - 1 < 0 ? 6 : d.getDay() - 1
		};
		if(format){
			var weekday = ["星期一", "星期二", "星期三", "星期四", "星期五", "星期六", "星期日"];
			return {
				year : x.getStringRight("0000"+d["year"],4),
				month : x.getStringRight("00"+d["month"],2),
				date : x.getStringRight("00"+d["date"],2),
				hour : x.getStringRight("00"+d["hour"],2),
				minute :  x.getStringRight("00"+d["minute"],2),
				seconds :  x.getStringRight("00"+d["seconds"],2),
				day : weekday[d.day]
			};
		}
		return d;
	}
	
	/**
	 * 将一个时间输出为日期格式
	 * yyyy-mm-dd，yyyy-mm-dd hh:mm:ss
	 * yyyy年mm月dd日，yyyy年mm月dd日 hh时mm分ss秒
	 * @param {Object} object
	 * @param {Object} formatText
	 */
	date.responseDate = function(object,formatText){
		var d = object instanceof Date ?  object : date.newDate();
			d = date.newDate(d);
			formatText = formatText===undefined ? "yyyy-mm-dd" : formatText;
		var respText;
		switch (formatText) {
			case "yyyy":
				respText = d["year"];
				break;
			case "yyyy-mm":
				respText = d["year"]+"-"+d["month"];
				break;
			case "yyyy-mm-dd":
				respText = d["year"]+"-"+d["month"]+"-"+d["date"];
				break;
			case "yyyy-mm-dd hh:mm:ss":
				respText = d["year"]+"-"+d["month"]+"-"+d["date"]+" "+d["hour"]+":"+d["minute"]+":"+d["seconds"];
				break;
			case "yyyy年mm月dd日":
				respText = d["year"]+"年"+d["month"]+"月"+d["date"]+"日";
				break;
			case "yyyy年mm月dd日 hh时mm分ss秒":
				respText = d["year"]+"年"+d["month"]+"月"+d["date"]+"日 "+d["hour"]+"时"+d["minute"]+"分"+d["seconds"]+"秒";
				break;
			default:
				respText = ""
				break;
		}
		return respText;
	}
	
	/**
	 * 增加日期时间
	 * 参数分别为日期对象，增加的类型，增加的数量 
	 * @param {Object} date
	 * @param {Object} type
	 * @param {Object} Number
	 */
	date.dateAdd = function(dateObject,type, Number) {
		if(x.getObjectType(dateObject)!="date") return {};
		var d;
		var dtTmp = dateObject;  
		switch (type) {
			case 'second':
			case 's' :
				d = new Date(Date.parse(dtTmp) + (1000 * Number));
				break;
			case 'minute':
			case 'n' :
				d = new Date(Date.parse(dtTmp) + (60000 * Number));  
				break;
			case 'hour':
			case 'h' :
				d = new Date(Date.parse(dtTmp) + (3600000 * Number)); 
				break;
			case 'day':                            
			case 'd' :
				d = new Date(Date.parse(dtTmp) + (86400000 * Number)); 
				break;
			case 'week':                            
			case 'w' :
				d = new Date(Date.parse(dtTmp) + ((86400000 * 7) * Number));
				break;
			case 'month':
			case 'm' :
				d = new Date(dtTmp.getFullYear(), (dtTmp.getMonth()) + Number, dtTmp.getDate(), dtTmp.getHours(), dtTmp.getMinutes(), dtTmp.getSeconds()); 
				break;
			case 'year':
			case 'y' :
				d = new Date((dtTmp.getFullYear() + Number), dtTmp.getMonth(), dtTmp.getDate(), dtTmp.getHours(), dtTmp.getMinutes(), dtTmp.getSeconds()); 
				break;
			default:
				d = new Date;
				break;
			
		}
		return date.newDate(d);
	}
	
	/**
	 * 判断两个日期间隔
	 * @param {Object} date1
	 * @param {Object} date2
	 */
    date.dateDiff = function(date1, date2){
    	//除1000是毫秒，不加是秒 
        return (date2.getTime() - date1.getTime()) / 1000 / 60 / 60 / 24;    
    }
    
    /**
     * 把一个字符串转换为date日期类型,格式为2014-1-1,如果是2014/1/1不能进行转换
     * @param {Object} object
     */
    date.stringFormatToDate = function(object){
    	//把一个字符串转换为date日期类型,格式为2014-1-1,如果是2014/1/1不能进行转换
    	//return new Date(Date.parse((""+object).replace(/-/g,  "/")));
    	return new Date(Date.parse(object));
    }
    
	x.classDate = date;
	
})(jQuery,xUtilBase);


/**
 *x class string 
 */
(function($,x){
	
	"use strict";
	
	var stringObject = {};
	
	/**
	 * 将字符串格式化为整数
	 * @param {Object} val
	 */
	stringObject.formatToInteger = function(val){
		val = val + "";
		if(val=="undefined" || val.length<1){
			return "";
		}
		val = val.replace(/\D/g,"");
		return val;
	}
	
	/**
	 * 将字符串格式化为数字(包含小数点)
	 * @param {Object} val
	 */
	stringObject.formatToNumber = function(val){
		val = val + "";
		if(val=="undefined" || val.length<1){
			return "";
		}
		val = val.replace(/[^\d.]/g,"");//先把非数字的都替换掉，除了数字和.
		val = val.replace(/^\./g,""); //必须保证第一个为数字而不是.
		val = val.replace(/\.{2,}/g,"."); //保证只有出现一个.而没有多个.	
		val = val.replace(".","$#$").replace(/\./g,"").replace("$#$","."); //保证.只出现一次，而不能出现两次以上 
		return val;
	}
	
	/**
	 * 将数字字符串格式化为保留2位小数
	 * @param {Object} val
	 * @param {Object} len
	 */
	stringObject.formatToMoney = function(val,len){
		var val = stringObject.formatToNumber(val);
		if(val.length<1){
			return "";
		}
		len = len===undefined ? 2 : len;
		var RegStr = '^[\\+\\-]?\\d+\\.?\\d{0,'+len+'}'; // 保留小数点后2位
		val = val.match(new RegExp(RegStr, 'g'));
		return val[0];
	}

	x.classString = stringObject;
})(jQuery,xUtilBase);


/**
 * x class cookies
 */

(function($,x){
	
	"use strict";
	
	var cookieObject = {};
	/**
	 * 取cookie
	 * @param {Object} name
	 */
	cookieObject.getCookie = function (name){
        var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
        if (arr != null) return unescape(arr[2]);
        return null;

    }
	
	/**
	 * 设置cookie
	 * @param {Object} name
	 * @param {Object} value
	 */
    cookieObject.setCookie = function (name, value) {
        var Days = 30;
        var exp = new Date();
        exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
        document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString() + ";path=/";
    }
    x.classCookie = cookieObject;
})(jQuery,xUtilBase);

(function($){
	
	"use strict";
	
	$.fn.extend({
		
		//将光标位置为最后
		setFocusAfter : function(){
			var v = this.val();
			this.val("").focus().val(v); 
		},
		
		//获取iframe内部对象
		getIframeObject : function(){
			//return this.get(0).contentWindow;
			//return this.contents();
		},
		
		//设置元素表单内容
		setHTML : function(options){
			var val = this.is(":input") ? "val" : "html";
			return this[val](options);
		},
		
		//取出表单内容
		getHTML : function(){
			var val = this.is(":input") ? "val" : "html";
			return this[val]();
		},
		
		//清除元素表单内容为空
		xClearHTML : function(){			
			var val = this.is(":input") ? "val" : "html";
			return this[val]("");
		},
		
		//设置提示信息,
		setElMessage : function(name,value){
			var el = this.find("[x-input-message-name='"+name+"']");
			if(el.length>0){
				el.setHTML(value);
			}
			return this;
        },
        
        //清除提示信息,
		clearElMessage : function(){
			return this.find("[x-input-message-name]").xClearHTML();
        },
        
		//设置表单内容,
		setElValue : function(object){
			for(var i in object){
				var el = this.find("[x-input-name='"+i+"']");
				if(el.length>0){
					el.setHTML(object[i]);
				}
			}
			return this;
        },
        
        //设置表单内容-加强版
        setElValuePlus : function(){
        	var params = x.formatArguments(arguments);
			var attrName = params["string"];
			var object = params["object"];
			
			for(var i in object){
				var el = this.find("["+attrName+"='"+i+"']");
				if(el.length>0){
					el.setHTML(object[i]);
				}
			}
			return this;
        },
        
        //清除表单内容
        clearElValue : function(){
			return this.find("[x-input-name]").xClearHTML();
        },
        
        /**
         * 设置select
         */
        setSelect : function(){
			if(this.length<1) return false;
			var _params = x.formatArguments(arguments),
				_array = _params["array"] || [],
				_object = _params["object"],
				_string = _params["string"] || "请选择",
				_keys = {_key : "id",_value : "name"},
				_input = this.find("input"),
				_select_ul = this.find(".x-select-ul"),
				_select = this.find("select");

			if(_object){
				_keys["_key"] = _object["key"]||_object["KEY"];
				_keys["_value"] = _object["value"]||_object["VALUE"];
			}
			
			_input.attr("placeholder",_string);
			_select_ul.empty();
			_select.empty();
			
			for(var i in _array){
				var d = _array[i];
				_select.append($("<option value=\""+d[_keys["_key"]]+"\">"+d[_keys["_value"]]+"</option>"));
				_select_ul.append($("<li>"+d[_keys["_value"]]+"</li>"));
			}
			return this;
		},
		/**
         * 设置radio
         */
        setRadio : function(){
			if(this.length<1) return false;
			var _params = x.formatArguments(arguments),
				_array = _params["array"] || [],
				_object = _params["object"],
				_keys = {},
				_radio_ul = this.find(".x-radio-ul"),
				_radio_data = this.find(".x-radio-data");
			if(_object){
				_keys["_key"] = _object["key"]||_object["KEY"]||"id";
				_keys["_value"] = _object["value"]||_object["VALUE"]||"name";
			}
			
			_radio_data.empty();
			_radio_ul.empty();

			for(var i in _array){
				var d = _array[i];
				var _li;
				switch (_object["style"]) {
					case "1":
						_li = $("<li class='style1'><label>"+d[_keys["_value"]]+"</label></li>");
						break;			
					default:
						_li = $("<li><i class=\"icon iconfont x-icon-selected-copy\"></i><label>"+d[_keys["_value"]]+"</label></li>");
						break;
				}				
				_radio_ul.append(_li);
				_radio_data.append($("<input type='radio' name=\""+_object["name"]+"\" x-out-name=\""+_object["name"]+"\" value=\""+d[_keys["_key"]]+"\"/>"));
			}
			return this;
		},
		/**
         * 设置checkbox
         */
        setCheckbox : function(){
			if(this.length<1) return false;
			var _params = x.formatArguments(arguments),
				_array = _params["array"] || [],
				_object = _params["object"],
				_keys = {},
				_radio_ul = this.find(".x-checkbox-ul"),
				_radio_data = this.find(".x-checkbox-data");
			if(_object){
				_keys["_key"] = _object["key"]||_object["KEY"]||"id";
				_keys["_value"] = _object["value"]||_object["VALUE"]||"name";
			}
			
			_radio_data.empty();
			_radio_ul.empty();

			for(var i in _array){
				var d = _array[i];
				_radio_data.append($("<input type='checkbox' name=\""+_object["name"]+"\" x-out-name=\""+_object["name"]+"\" value=\""+d[_keys["_key"]]+"\"/>"));
				var _li = $("<li><i class=\"icon iconfont x-icon-weidianxuan\"></i><label>"+d[_keys["_value"]]+"</label></li>");
				_radio_ul.append(_li);
			}
			return this;
		},
        //取节点数据，返回一个对象
        getElValue : function(){
        	var _params = x.formatArguments(arguments);
			var _name = _params["string"]||"x-out-name";
        	
			var els = this.find("["+_name+"]");
			var object = {};
			for(var i=0;i<els.length;i++){
				var _el = $(els[i]);				
				var _outName = _el.attr(_name);
				if(_outName.length>0){
					var _s = _el.getHTML();
					_s = (_s===undefined || _s==null) ? "" : _s;
					object[_outName] = _s;					
				}
			}
			this.find("input[type='radio']:checked").each(function(index,element){
				var _this = $(element);
				object[_this.attr(_name)] = _this.getHTML();
			});
			
			var _checkboxObject = {};
			this.find("input[type='checkbox']").each(function(index,element){
				_checkboxObject[$(element).attr(_name)] = [];
			});
			for(var i in _checkboxObject){
				this.find("input["+_name+"='"+i+"']:checked").each(function(index,element){
					_checkboxObject[i].push($(element).val());
				});
				object[i] = _checkboxObject[i];
			}
			
			return object;
		},
		outerHTML : function(s) {
			return (s) ? this.before(s).remove() : $("<Hill_man>").append(this.eq(0).clone()).html();
		},
		animatelo : function(s) {
			if(!this.attr("id")){
				console.warn("element is not id");
				return this;
			}else{
				try{
					window.animatelo[s]("#"+this.attr("id"));
				}catch(e){
					console.warn(e.message);
				}
			}
			return this;
		},
		/**
		 * 取出一个element节点的style属性
		 * @param {Object} element
		 */
		getElementStyleFormatObject : function(element){
			var attributeString = "background|backgroundAttachment|backgroundColor|backgroundImage|backgroundPosition|backgroundPositionX|backgroundPositionY|backgroundRepeat|border|borderBottom|borderBottomColor|borderBottomStyle|borderBottomWidth|borderColor|borderLeft|borderLeftColor|borderLeftStyle|borderLeftWidth|borderRight|borderRightColor|borderRightStyle|borderRightWidth|borderStyle|borderTop|borderTopColor|borderTopStyle|borderTopWidth|borderWidth|margin|marginBottom|marginLeft|marginRight|marginTop|outline|outlineColor|outlineStyle|outlineWidth|padding|paddingBottom|paddingLeft|paddingRight|paddingTop|clear|clip|content|counterIncrement|counterReset|cssFloat|cursor|direction|display|height|markerOffset|marks|maxHeight|maxWidth|minHeight|minWidth|overflow|verticalAlign|visibility|width|listStyle|listStyleImage|listStylePosition|listStyleType|bottom|left|position|right|top|zIndex|orphans|page|pageBreakAfter|pageBreakBefore|pageBreakInside|size|widows|scrollbar3dLightColor|scrollbarArrowColor|scrollbarBaseColor|scrollbarDarkShadowColor|scrollbarFaceColor|scrollbarHighlightColor|scrollbarShadowColor|scrollbarTrackColor|borderCollapse|borderSpacing|captionSide|emptyCells|tableLayout|color|font|fontFamily|fontSize|fontSizeAdjust|fontStretch|fontStyle|fontVariant|fontWeight|letterSpacing|lineHeight|quotes|textAlign|textDecoration|textIndent|textShadow|textTransform|unicodeBidi|whiteSpace|wordSpacing";
			var _obj = new Object();
			var element = this || $(element).get(0);
			attributeString = attributeString.split("|");
			$.each(attributeString, function(i,attribute) {
				var _text = element.style[attribute];
				if(_text && _text.length>0){
					_obj[attribute] = _text;
				}
			});
			return _obj;
		},
		addClickEffect : function() {
			var $this = $(this);
		    var ink, d, x, y;
		    $this.on("click touchstart",function(e) {
		    	var _this = $(this);
		        _this.find(".ink").remove();
		        if (_this.children(".ink").length === 0) {
		           _this.append("<b class='ink'></b>");
		        }
		       
		        ink = _this.find(".ink");
		        ink.removeClass("animate-ink");
		        if (!ink.height() && !ink.width()) {
		            d = Math.max(_this.outerWidth(),_this.outerHeight());
		            ink.css({
		                height: d,
		                width: d
		            })
		        }
		        x = e.pageX -_this.offset().left - ink.width() / 2;
		        y = e.pageY -_this.offset().top - ink.height() / 2;
		        ink.css({
		            top: y + 'px',
		            left: x + 'px'
		        }).addClass("animate-ink")
		    })
		}
	});
	
})(jQuery);

/**
 * 将字符串格式化为整数
 * @param {Object} val
 */
function stringFormatToInteger(val){
	val = val + "";
	if(val=="undefined" || val.length<1){
		return "";
	}
	val = val.replace(/\D/g,"");
	return val;
}

/**
 * 将字符串格式化为数字(包含小数点)
 * @param {Object} val
 */
function stringFormatToNumber(val){
	val = val + "";
	if(val=="undefined" || val.length<1){
		return "";
	}
	val = val.replace(/[^\d.]/g,"");//先把非数字的都替换掉，除了数字和.
	val = val.replace(/^\./g,""); //必须保证第一个为数字而不是.
	val = val.replace(/\.{2,}/g,"."); //保证只有出现一个.而没有多个.	
	val = val.replace(".","$#$").replace(/\./g,"").replace("$#$","."); //保证.只出现一次，而不能出现两次以上 
	return val;
}
/**
 * 将数字字符串格式化为保留2位小数
 * @param {Object} val
 * @param {Object} len
 */
function stringFormatToMoney(val,len){
	val = stringFormatToNumber(val);
	if(val.length<1){
		return "";
	}
	len = len===undefined ? 2 : len;
	var RegStr = '^[\\+\\-]?\\d+\\.?\\d{0,'+len+'}'; // 保留小数点后2位
	val = val.match(new RegExp(RegStr, 'g'));
	return val[0];
}


var bindName;
if (navigator.userAgent.indexOf("MSIE") != -1){
	bindName = 'input keyup propertychange beforepaste';
}else{
	bindName = "input keyup beforepaste";
}

$(document).on(bindName,"input[data-control-type='money']",function(){
	this.value = stringFormatToMoney(this.value);
});
$(document).on(bindName,"input[data-control-type='number']",function(){
	this.value = stringFormatToNumber(this.value);
});
$(document).on(bindName,"input[data-control-type='integer']",function(){
	this.value = stringFormatToInteger(this.value);
});
$(document).on(bindName,"input[data-control-type='identity_card']",function(){
	//var reg=/^[1-9]{1}[0-9]{14}$|^[1-9]{1}[0-9]{16}([0-9]|[xX])$/;
	if(this.value.length<18){
		var val = stringFormatToInteger(this.value);
		this.value = val.substring(0,17);
	}else if(this.value.length==18 || this.value.length>18){
		var val = stringFormatToInteger(this.value);
		val = val.substring(0,17);
		val = val +  this.value.substring(17,18);
		val = val.toLocaleUpperCase();
		this.value = val;
	}
	
});
$(document).on(bindName,"input[data-control-type='phone']",function(){
	this.value = stringFormatToInteger(this.value);
	if(this.value.length>11){
		this.value = this.value.substring(0,11);
	}
});

$(document).on("blur","input[data-control-type='XINGMING']",function(){
	this.value = this.value.replace(/[^\u4E00-\u9FA5]/g,"");
});

/**
 * ---------------------------------------------------------------
 * 监听
 * ---------------------------------------------------------------
 */
$(document).bind("DOMNodeInserted",function(e){
    //console.log("插入节点"+e.target);
})
$(document).bind("DOMNodeRemoved",function(e){
    //console.log("删除节点"+e.target);
})

//取消a标签点击后的虚线
$(document).on("click","a",function(event){
	this.blur();
});

//图片懒加载
window.Echo = (function(window, document, undefined) {
	'use strict';
	var store = [],
		offset,
		throttle,
		poll;
	var _inView = function(el) {
		var coords = el.getBoundingClientRect();
		return((coords.top >= 0 && coords.left >= 0 && coords.top) <= (window.innerHeight || document.documentElement.clientHeight) + parseInt(offset));
	};
	var _pollImages = function() {
		for(var i = store.length; i--;) {
			var self = store[i];
			if(_inView(self)) {
				self.src = self.getAttribute('data-echo');
				store.splice(i, 1);
			}
		}
	};
	var _throttle = function() {
		clearTimeout(poll);
		poll = setTimeout(_pollImages, throttle);
	};
	var init = function(obj) {
		var nodes = document.querySelectorAll('[data-echo]');
		var opts = obj || {};
		offset = opts.offset || 0;
		throttle = opts.throttle || 250;
		for(var i = 0; i < nodes.length; i++) {
			store.push(nodes[i]);
		}
		_throttle();
		if(document.addEventListener) {
			window.addEventListener('scroll', _throttle, false);
		} else {
			window.attachEvent('onscroll', _throttle);
		}
	};
	return {
		init: init,
		render: _throttle
	};
})(window, document);

/**
 * 初始化函数
 */
//x.disablePageRightButtonEvent();
//xUtilBase.disablePageBackEvent();
//x.disablePageF5Event();

