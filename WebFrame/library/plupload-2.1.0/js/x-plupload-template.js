function xUpload() {
	var FileUploader = new Object();
	var FileErrorString = " (File x-plupload-template.js) ";
	
	FileUploader.plupload = undefined;
	
	FileUploader.options = {
		location: undefined,
		config: undefined,
		attr : undefined,
		event : undefined,
		uploadType : undefined,
		uploadTypeIcon : undefined,
		uploadError: undefined
	};
	
	//配置上传类型
	FileUploader.options.uploadType = [
		{
			type: "none",
			list: [{title: "None Files",extensions: ""}]
		}, {
			type: "all",list: [{title: "All Files",extensions: "*"}]
		}, {
			type: "image",list: [{title: "Images Files",extensions: "jpg,gif,png"}]
		}, {
			type: "zip",
			list: [{title: "Zip Files",extensions: "rar,zip"}]
		}, {
			type: "office",
			list: [{title: "Office Files",extensions: "doc,docx,xls,xlsx"}]
		},{
			type: "excel",
			list: [{title: "Excel Files",extensions: "xls,xlsx"}]
		}, {
			type: "text",
			list: [{title: "Text Files",extensions: "txt"}]
		}
	];
	
	//文件对应相应IOCN
	FileUploader.options.uploadTypeIcon = {
		none : "fa fa-file-text-o"
	}
	
	
	//配置uploadError
	FileUploader.options.uploadError = [{
			code: 1,name: "文件等待上传"
		}, {
			code: 2,name: "文件正在上传"
		}, {
			code: 4,name: "文件上传失败"
		}, {
			code: 5,name: "文件上传成功"
		}, {
			code: -100,name: "请检查您的系统配置"
		}, {
			code: -200,name: "发生网络错误"
		}, {
			code: -300,name: "文件读取失败，可能已被占用"
		}, {
			code: -400,name: "文件操作被系统终止"
		}, {
			code: -500,name: "初始化错误"
		}, {
			code: -600,name: "文件大小超出范围"
		}, {
			code: -601,name: "不支持的文件类型"
		}, {
			code: -602,name: "不可选取重复的文件"
		}, {
			code: -700,name: "图片格式错误"
		}, {
			code: -702,name: "文件大小超出浏览器范围"
		}
	];
	
	
	//object初始化
	FileUploader.init = function(settings) {
		if(!settings.btn_openFileId){
			throw new Error("btn_openFileId undefined"+FileErrorString);
		}
		
		if(!settings.node_box){
			throw new Error("node_box undefined"+FileErrorString);
		}
		
		if(!settings.swf){
			throw new error("swf undefined"+FileErrorString);
		}
		
		if(!settings.xap){
			throw new error("xap undefined"+FileErrorString);
		}
		
		
		var tempIndex = 0;
		if (settings.type !== 'undefined') {
			var tempType = FileUploader.options.uploadType;
			for (var i = 0; i < tempType.length; i++) {
				if (settings.type == tempType[i].type) {
					tempIndex = i;
				}
			}
		}
		
		FileUploader.options.config = {
			
/* 				runtimes: 'html5,flash,silverlight,html4,gears', */
			runtimes: 'html5,flash,silverlight,html4',
			browse_button: settings.btn_openFileId,
			container: settings.node_box,
			url: settings.url,
			flash_swf_url: settings.swf,
			silverlight_xap_url: settings.xap,
			multi_selection: settings.multi_selection===false?settings.multi_selection:true,
			chunk_size : settings.chunk_size,
			multipart_params : settings.params,
			prevent_duplicates : true,
			filters: {
				max_file_size: settings.size,
				mime_types: tempType[tempIndex].list
			},
			init: {}
		};
		
		FileUploader.options.location = FileUploader.options.url;
		FileUploader.plupload = new plupload.Uploader(FileUploader.options.config);
		FileUploader.plupload.init();
		
	}


	/*----------------------------------------------------------------------------
	 *	事件绑定
	 *----------------------------------------------------------------------------*/
	 
	FileUploader.event = {
		Init : function($fn){//当Plupload初始化完成后触发 
			FileUploader.plupload.bind('Init', function(uploader) {return $fn(uploader)})
		},
		PostInit : function($fn){//当Init事件发生后触发 
			FileUploader.plupload.bind('PostInit', function(uploader) {return $fn(uploader)})
		},
		OptionChanged : function($fn){//当使用Plupload实例的setOption()方法改变当前配置参数后触发 
			FileUploader.plupload.bind('OptionChanged', function(uploader,option_name,new_value,old_value) {
				return $fn(uploader,option_name,new_value,old_value)
			})
		},
		Refresh : function($fn){//当调用plupload实例的refresh()方法后会触发该事件
			FileUploader.plupload.bind('Refresh', function(uploader) {
				return $fn(uploader)
			})
		},
		StateChanged : function($fn){//当上传队列的状态发生改变时触发 
			FileUploader.plupload.bind('StateChanged', function(uploader) {
				return $fn(uploader)
			})
		},
		UploadFile : function($fn){//当上传队列中某一个文件开始上传后触发 
			FileUploader.plupload.bind('UploadFile', function(uploader,file) {
				return $fn(uploader,file)
			})
		},
		BeforeUpload : function($fn){//当队列中的某一个文件正要开始上传前触发 
			FileUploader.plupload.bind('BeforeUpload', function(uploader,file) {
				return $fn(uploader,file)
			})
		},
		QueueChanged : function($fn){//当上传队列发生变化后触发，即上传队列新增了文件或移除了文件。QueueChanged事件会比FilesAdded或FilesRemoved事件先触发 
			FileUploader.plupload.bind('QueueChanged', function(uploader,files) {
				return $fn(uploader,files)
			})
		},
		UploadProgress : function($fn){//会在文件上传过程中不断触发，可以用此事件来显示上传进度 
			FileUploader.plupload.bind('UploadProgress', function(uploader,file) {
				return $fn(uploader,file)
			})
		},
		FilesRemoved : function($fn){//当文件从上传队列移除后触发 
			FileUploader.plupload.bind('FilesRemoved', function(uploader,files) {
				return $fn(uploader,files)
			})
		},
		FileFiltered : function($fn){//暂不清楚该事件的意义，但根据测试得出，该事件会在每一个文件被添加到上传队列前触发
			FileUploader.plupload.bind('FileFiltered', function(uploader,file) {
				return $fn(uploader,file)
			})
		},
		FilesAdded : function($fn){//当文件添加到上传队列后触发 
			FileUploader.plupload.bind('FilesAdded', function(uploader,files) {
				return $fn(uploader,files)
			})
		},
		FileUploaded : function($fn){//当队列中的某一个文件上传完成后触发 
			FileUploader.plupload.bind('FileUploaded', function(uploader,file,responseObject) {
				return $fn(uploader,file,responseObject)
			})
		},
		ChunkUploaded : function($fn){//当使用文件小片上传功能时，每一个小片上传完成后触发 
			FileUploader.plupload.bind('ChunkUploaded', function(uploader,file,responseObject) {
				return $fn(uploader,file,responseObject)
			})
		},
		UploadComplete : function($fn){//当上传队列中所有文件都上传完成后触发 
			FileUploader.plupload.bind('UploadComplete', function(uploader,files) {
				return $fn(uploader,files)
			})
		},
		Error : function($fn){//当发生错误时触发
			FileUploader.plupload.bind('Error', function(uploader,errObject) {
				return $fn(uploader,errObject)
			})
		},
		Destroy : function($fn){//当调用destroy方法时触发
			FileUploader.plupload.bind('Destroy', function(uploader) {
				return $fn(uploader)
			})
		}
	};
	
	//调用事件
	FileUploader.bindEvent = function(eventName,$fn){
		if(FileUploader["event"][String(eventName+"").toLowerCase()]){
			try{
				return FileUploader["event"][String(eventName+"")]($fn);
			}catch(e){
				//TODO handle the exception
			}
		}
		
		for(var i in FileUploader.event){
			if(String(eventName).toLowerCase()===String(i).toLowerCase()){
				try{
					return FileUploader.event[i]($fn);
					//return eval('FileUploader.event.'+i+'('+$fn+')')
				}catch(e){
					//TODO handle the exception
				}
				
			}
		}
		
	}

	/*----------------------------------------------------------------------------
	 *	方法区域，直接调用即可
	 *----------------------------------------------------------------------------*/
	
	//开始上传
	FileUploader.start = function() {
		return FileUploader.plupload.start();
	}
	
	//重新上传文件
	FileUploader.newStartFile = function(id){
		FileUploader.setFileState(id);
		FileUploader.start();
	}
	
	//重新上传所有文件
	FileUploader.newStartFiles = function(id){
		FileUploader.setFileAllState(FileUploader.getFiles());
		FileUploader.start();
	}

	//停止
	FileUploader.stop = function() {
		return FileUploader.plupload.stop();
	}
	
	
	//刷新
	FileUploader.refresh = function() {
		return FileUploader.plupload.refresh();
	}


	//取plupload对象
	FileUploader.getPlupUploadObject = function() {
		return FileUploader.plupload;
	}
	
	//取所有文件对象
	FileUploader.getFiles = function() {
		return FileUploader.plupload.files;
	}

	//通过id来获取文件对象
	FileUploader.getFile = function(id) {
		return FileUploader.plupload.getFile(id);
	}
	
	//取所有文件大小
	FileUploader.getFileSizeCount = function(files) {
		var count = 0;
		for (var i = 0; i < files.length; i++) {
			count += files[i].size;
		}
		return count;
	}
	
	//文件根据id重新排序,发现addFile方法不可用
	FileUploader.setFilesSort = function(arr) {}
	
	//取文件类型配置
	FileUploader.getFileConfigType = function() {
		
	}
	
	//删除文件
	FileUploader.removeFile = function(id) {
		try{
			FileUploader.plupload.removeFile(id);
			return true;
		}catch(e){
			return false;
		}
	}
	
	//删除文件
	FileUploader.removeFileAll = function() {
		try{
			var files = FileUploader.plupload.files || [];
			for(var i=files.length-1;i>-1;i--){
				FileUploader.plupload.removeFile(files[i]["id"]);
			}
		}catch(e){}
	}
	
	
	//重置文件状态
	FileUploader.setFileState = function(id) {
		try{
			var f = FileUploader.getFile(id);
			f.status = 1;
			f.loaded = 0;
			f.percent = 0;
			return true;
		}catch(e){}
		return false;
	}
	
	//重置所有上传失败的文件状态
	FileUploader.setFileAllState = function(files) {
		for (var i=0;i<files.length;i++) {
			if(files[i].status !== 5){
				FileUploader.setFileState(files[i].id);
			}
		}
	}
	
	
	
	//清除队列中上传成功的文件
	FileUploader.clearSucceedFile = function(files) {
		try {
			var len = files.length - 1;
			for (var i = files.length - 1; i > -1; i--) {
				if(files[i].status === 5){
					FileUploader.removeFile(files[i].id);
				}
			}
		} catch (e) {}
	}
	
	//清除队列中上传失败的文件
	//files[i].status === 5 ? files.splice(i, 1) : files[i].status = 1;
	FileUploader.clearErrorFile = function(files) {
		try {
			var len = files.length - 1;
			for (var i = files.length - 1; i > -1; i--) {
				if(files[i].status !== 5){
					FileUploader.removeFile(files[i].id);
				}
			}
		} catch (e) {}
	}
	
	//取后缀名
	FileUploader.getFileTypeFx = function(val){
		try {
			var str =  /\.[^\.]+$/.exec(val)+"";
			return str.replace(/\./g,"");
		} catch (e) {}
		return null;
	};
	
	//格式化文件大小
	FileUploader.formatSize = function(size, pointLength) {
		var unit = ['B', 'KB', 'MB', 'GB', 'TB'];
		var i = 0;
		while (size >= 1024) {
			i += 1;
			size = size / 1024;
		}
		if (String(size).indexOf(".") + 1 < 1) {
			pointLength = 0;
		}
		return size.toFixed(pointLength || 0) + " " + unit[i];
	}
	
	//格式化时间
	FileUploader.formatDate = function(number) {

		if(!number || typeof number!=='number'){
			return;
		}else{
			if(number<1000){return number + "毫秒"}
		}
		
		var milliseconds = number%1000;
		var dat = new Date(number);//生成日期
		var hour = dat.getHours();//取得小时
		var minutes = dat.getMinutes();//取得分钟
		var second = dat.getSeconds();//取得秒
		return hour+"时"+minutes +"分"+second+"秒"+milliseconds+"毫秒";
	}

	//解析错误信息
	FileUploader.formatErr = function(err) {
		var code = err.code;
		if (code && typeof code == 'number') {
			var tempError = FileUploader.options.uploadError;
			for (var i in tempError) {
				if (tempError[i].code == code) {
					return {err:tempError[i].name,file:err.file.name};
				}
			}
		}
	}

	//图像预览
	FileUploader.previewImage = function(file, callback) {
		if (!file || !/image\//.test(file.type)) return; //确保文件是图片
		if (file.type == 'image/gif') { //gif使用FileReader进行预览,因为mOxie.Image只支持jpg和png
			var fr = new mOxie.FileReader();
			fr.onload = function() {
				callback(fr.result);
				fr.destroy();
				fr = null;
			}
			fr.readAsDataURL(file.getSource());
		} else {
			var preloader = new mOxie.Image();
			preloader.onload = function() {
				preloader.downsize(300, 300); //先压缩一下要预览的图片,宽300，高300
				var imgsrc = preloader.type == 'image/jpeg' ? preloader.getAsDataURL('image/jpeg', 80) : preloader.getAsDataURL(); //得到图片src,实质为一个base64编码的数据
				callback && callback(imgsrc); //callback传入的参数为预览图片的url
				preloader.destroy();
				preloader = null;
			};
			preloader.load(file.getSource());
		}
	}
	

	return FileUploader;
}