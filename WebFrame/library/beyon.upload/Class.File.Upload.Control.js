/**
 * 通用上传Class
 */
function ClassFileUpdateControl(){
	
	//对象指针
	var _this = this,
	
		layer = layui.layer,
		
		$body = $("body"),
		
		$panelFileUploadBox = $("#file-upload-box"),
		
		$panelFileList = $panelFileUploadBox.find("#file-list");
	
	this.__ClassLinkObject = new Object();
	
	
	
	
	
	//初始化外部类
	this.InitLinkClass = function(_name,_class){
		
		this.__ClassLinkObject[_name] = _class;
		
	}
	
	//获取外部类
	this.GetLinkClass = function(_name){
		
		return this.__ClassLinkObject[_name];
		
	}
	
	//获取upload类
	this.GetLinkClassUpload = function(){
		
		return this.__ClassLinkObject["upload"];
		
	}
	
	//设置弹出面板标题
	this.ShowTitle = function(_boolean){
		
		var _mothodName = _boolean ? "show" : "hide";
		
		$body.find(".layui-tab-title")[_mothodName]();
		
	}
	
	//打开面板
	this.OpenPanel = function(_conf){
		
		var _this = this;
		
	}
	
	//关闭面板
	this.ClosePanel = function(){
		
		layer.close(_this.__openPanelIndex);
		
	}
	
	//设置上传参数
	this.SetUplaodConfig = function(_conf){
		
		var _upload = this.GetLinkClassUpload();
		
		$.extend(true, _upload.plupload.settings, _conf);
		
	}
	
	//设置上传地址
	this.SetUplaodURL = function(_url){
		
		var _upload = this.GetLinkClassUpload();
		
		_upload.plupload.settings.url = _url;
		
	}
	
	//设置上传大小
	this.SetUplaodSize = function(_size){
		
		var _upload = this.GetLinkClassUpload();
		
		_upload.plupload.settings.filters.max_file_size = _size;
		
	}
	
	//根据id取出document
	this.GetDocumentUplodFileBeanById = function(_id){
		
		return $panelFileList.find(">.file-bean[file-id='"+_id+"']");
		
	}
	
	//设置锁定，只能进行单个锁定，代表的是正在上传的逻辑
	this.SetDocumentUplodStateBeanLock = function(_id,_lock){
		
		//取消所有锁
		$panelFileList.find(">.file-bean").removeClass("is-lock");
		
		//根据id设置锁
		var $bean = this.GetDocumentUplodFileBeanById(_id);
		
		var _mothodName = _lock ? "addClass" : "removeClass";
		
		$bean[_mothodName]("is-lock");
		
		$bean.find(".bean-uploading")[_mothodName]("panel-show");
		
		return $bean;
		
	}
	
	//设置bean上传状态文字
	this.SetDocumentUplodStateBeanText = function(_id,_text){
		
		var $bean = this.GetDocumentUplodFileBeanById(_id);
		
		$bean.find(".bean-uploading > .uploading-font").html(_text);
		
	}
	
	//设置bean上传状态图例
	this.SetDocumentUplodStateStyle = function(_id,_text){
		
		var $bean = this.GetDocumentUplodFileBeanById(_id);
		
		$bean.find(">.bean-state > div").removeClass("panel-show");
		
		$bean.find(">.bean-state > ."+_text).addClass("panel-show");
		
	}
	
	//删除文件
	this.RemoveDocumentFile = function(_id){
		
		var _file = _this.GetLinkClassUpload().getFile(_id);
		
		if(_file){
			
			//判断是否是已上传的文件
			if(_file.status==5){
				
				_this.__oldFileList = _this.__oldFileList || [];
				
				_this.__oldFileList.push(_file);
				
			}
			
			var $bean = this.GetDocumentUplodFileBeanById(_id);
		
			$bean.remove();
			
			var _upload = this.GetLinkClassUpload();
			
			_upload.removeFile(_id);
			
		}
	}
	
	//设置进度显示
	this.SetDocumentUploadProgress = function(){
		
//		var str = "共上传 "+ _this.__UploadProgress.count+" 个，成功 " + _this.__UploadProgress.success + " 个，失败 " + _this.__UploadProgress.error + " 个";
		var _progress = (_this.__UploadProgress.success+_this.__UploadProgress.error)/_this.__UploadProgress.queue*100;
		
		var str = "上传进度：" + (_progress+"").match(/^\d+\.{0,1}\d{0,2}/)+" %";
		
		$panelFileUploadBox.find(".panel-upload-progress > font").html(str);
		
		$panelFileUploadBox.find(".panel-upload-progress > .prog-background").css({"width" : _progress+"%"});
		
	}
	
	//取出上传成功列表
	this.GetLinkInterfaceUploadSuccessData = function(up,files){
		
		var _upload = _this.GetLinkClassUpload();
		
		var _files = _upload.plupload.files;
		
		var _ret = {
			
			uploadFiles : _files,
			
			uploadErrorFiles : [],
			
			oldFiles : _this.__oldFileList || []	//历史服务器文件
			
		};
		
		$.each(_files, function(index,el) {
			
			if(el.status==5){
				
			}else{
				
				_ret.uploadErrorFiles.push(el.id);
				
			}
			
		});
		
		return _ret;
		
	};
	
	//根据对象添加文件，用于模拟反显
	this.AddUploadFile = function(_file){
		
		var _upload = _this.GetLinkClassUpload();
		
//		var _newFile = {
//			
//			id : "o_1dncehip0qv31mum166gufj6bhp",
//			
//			name : "test",
//			
//			status : 5,
//			
//			type : undefined
//			
//		};
//		
//		_upload.plupload.files.push(_newFile);
		
		var _html = "<li class='file-bean'>"
	    			+"	<div class='view-box'>"
	    			+"		<i class='iconfont layui-icon layui-icon-file-b'></i>"
	    			+"	</div>"
	    			+"	<div class='file-name'>测试文件名</div>"
	    			+"	<div class='bean-uploading'>"
	    			+"		<div class='uploading-font'>准备上传..</div>"
	    			+"	</div>"
	    			+"	<div class='bean-top-bar'>"
	    			+"		<div class='bean-btn btn-delete'><i class='iconfont layui-icon layui-icon-delete' title='删除'></i></div>"
	    			+"	</div>"
	    			+"	<div class='bean-state'>"
	    			+"		<div class='success'><i class='iconfont layui-icon layui-icon-ok'></i></div>"
	    			+"		<div class='error'><i class='iconfont layui-icon layui-icon-close'></i></div>"
	    			+"  </div>"
	    			+"</li>";
		
		var $bean = $(_html);
		
		$bean.attr("file-id",_file.id);
		
		$bean.find(".file-name").html(_file.name).attr("title",_file.name);
		
		$panelFileList.append($bean);
		
		$bean.find(".bean-btn").on("click",function(){
			
			var $this = $(this);
			
			if($this.hasClass("btn-delete")){
				
				_this.RemoveDocumentFile(_file.id);
				
			}
			
		});
		
		if(/^image\//.test(_file.type)){
			
			//5代表从服务器返回的图片，否则则是本地手动选择文件
			if(_file.status==5){
				
				$bean.find(".view-box > .iconfont").remove();
					
				$bean.find(".view-box").append("<img src='"+_file.httpURL+"'>");
				
			}else{
				
				_upload.previewImage(_file, function (imgsrc) {
				
					$bean.find(".view-box > .iconfont").remove();
					
					$bean.find(".view-box").append("<img src='"+imgsrc+"'>");
					
				});
				
			}
			
		}
		
		//如果有uploadReturn属性是本次上传的
		if(_file.__httpUploadRetrun){
			
			_upload.plupload.files.push(_file);
			
			_this.SetDocumentUplodStateStyle(_file.id,"success");
			
		}
		
		$bean.hover(onmouseover,onmouseout);
		
		//鼠标滑过
		function onmouseover(event) {
			
			var $this =  $(this);
			
			if($this.hasClass("is-lock")){
				
				return;
				
			}
			
			$this.find(">.bean-top-bar").addClass("panel-show");
			
		}
		
		//鼠标移出
		function onmouseout(event) {
			
			var $this =  $(this);
			
			if($this.hasClass("is-lock")){
				
				return;
				
			}
			
			$this.find(">.bean-top-bar").removeClass("panel-show");
			
		}
		
	}
	
	
	
	
	
	//事件-添加文件到列表
	this.EventFilesAdded = function(up,files){
		
		var _upload = _this.GetLinkClassUpload();
		
		_upload.setFileAllState(_upload.getFiles());
		
		if(_upload.settings.multi_selection==false){
			
//			if(_upload.getFiles()>0){
//				
//				_this.RemoveDocumentFile(_upload.getFiles()[0].id);
//				
//			}
			
		}
						
		$.each(files, function(index,el) {
			
			_this.AddUploadFile(el);
			
		});
		
	}
	
	//事件-文件发生变化
	this.EventQueueChanged = function(up){
		
		var _files = up.files;
		
		var _upload = _this.GetLinkClassUpload();
		
		$panelFileUploadBox.find(".panel-button-control .selected-font").html("当前 "+_files.length+" 个文件，大小合计 "+_upload.formatSize(_upload.getFileSizeCount(_files)));
		
		_this.__UploadProgress = {
		
			queue : 0,
			
			success : 0,
			
			error : 0,
			
		};
		
		$.each(_files, function(index,el) {
			
			if(el.status!=5){
				
				_this.__UploadProgress.queue += 1;
				
			}
			
		});
		
		var str = "当前列表中有 " + _this.__UploadProgress.queue + " 个文件等待上传";
		
		$panelFileUploadBox.find(".panel-upload-progress > font").html(str);
		
		$panelFileUploadBox.find(".panel-upload-progress > .prog-background").css({"width":"0"});
		
	}
	
	/**
	 * 上传前的回调函数，需要提前在实例对象后申明，
	 * 其中_size可能在分块上传中会用到，用来判断是否已经接收完毕，
	 * 如果是分块插件会自动加入chunks这个参数，可以用这个参数进行判断是否是分块上传
	 */
	this.onBeforeUpload = function(file){
		
		this.__beforeUplaodParams = {
			multipart_params:{
				_uuid:file.id,
				_size:file.size
			}
		};
		
	}
	
	//单个文件上传前动作
	this.EventBeforeUpload = function(up,file){
		
		var _upload = _this.GetLinkClassUpload();
		
		var plup = _upload.getPlupUploadObject();
		
		var f = plup.getFile(file.id);
		
//		plup.setOption({multipart_params:{uuid:f.id,name:f.name}});
		if(_this.onBeforeUpload){
			_this.onBeforeUpload(file);
		}
		
		_upload.getPlupUploadObject().setOption(_this.__beforeUplaodParams);
		
		//准备锁定
		_this.SetDocumentUplodStateBeanLock(file.id,true);
		
		_this.SetDocumentUplodStateBeanText(file.id,"<i class='iconfont layui-icon layui-icon-loading layui-icon layui-anim layui-anim-rotate layui-anim-loop' style='animation-duration:3s'></i>");
		
	};
	
	//单个文件开始上传
	this.EventUploadFile =function(up,file){
		
		var _upload = _this.GetLinkClassUpload();
		
	};
					
	//单文件进度条
	this.EventuploadProgress = function(up,file){
		
		//进度百分比
//		console.info(file.percent);
		
//		console.info(up,file);
		
	};
	
	//单文件上传完成
	this.EventFileUploaded = function(up,file,responseObject){
		
		if(file["status"]===5 && responseObject["status"]=="200"){
							
			_this.SetDocumentUplodStateBeanText(file.id,"上传成功");
			
			_this.SetDocumentUplodStateStyle(file.id,"success");
			
			var _object = new Object();
			
			try{
				
				_object = JSON.parse(responseObject.response);
				
			}catch(e){
				//TODO handle the exception
			}
			
			file.__httpUploadRetrun = _object.data;
			
			_this.__UploadProgress.success += 1;
			
		}else{
			
			_this.__UploadProgress.error += 1;
			
			_this.SetDocumentUplodStateBeanText(file.id,"重新上传");
			
			_this.SetDocumentUplodStateStyle(file.id,"eroor");
			
		}
		
		//设置进度
		_this.SetDocumentUploadProgress()
		
		//解锁
		_this.SetDocumentUplodStateBeanLock(file.id,false);
		
	}
	
	//全部文件上传完成
	this.EventUploadComplete = function(up,files){
		
		if(files.length > 0){
			
			var _upload = _this.GetLinkClassUpload();
		
			var str = "上传数量 "+ _this.__UploadProgress.queue+" 个，成功 " + _this.__UploadProgress.success + " 个，失败 " + _this.__UploadProgress.error + " 个";
			
			$panelFileUploadBox.find(".panel-upload-progress > font").html(str);
		
		}
		
//		_upload.removeFileAll();

	};
	
	//发生错误
	this.EventError = function(up,err){
		
		var _upload = _this.GetLinkClassUpload();
		
		var _json = _upload.formatErr(err);
		
		//解锁
		_this.SetDocumentUplodStateBeanLock(err.file.id,false);
		
		_this.SetDocumentUplodStateBeanText(err.file.id,"重新上传");
		
	}
	
	
	//临时调试
	this.TempRun = function(){
		
		return this;
		
	}
	
	//class默认初始化
	this.Init = function(){
		
		this.TempRun();
		
		this.ShowTitle(false);
		
	}
	
	this.Init();
	
}


