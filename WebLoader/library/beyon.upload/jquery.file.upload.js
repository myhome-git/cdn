//通用上传插件
(function($){
	$.fn.extend({
		fileUpload : function(obj){
			
			let $this = $(this),
				_uuid,
				_uploadBoxId,
				_uploadContainerId;
				
			let _object = new Object();
				
			//创建表格
			_object.createForm = function(){
				let _html = "<div id=\""+_uploadBoxId+"\" style=\"position:absolute;width:0;height:0;\">"
	    			+ "<div id=\""+_uploadContainerId+"\" style=\"display: none;\"></div>"
					+ "</div>";
				$("body").append(_html);
				
				//加载插件
				WebLoader.Load(["x.file.upload"]);
			}
			
			_object.bindEvent = function(obj){
				var _uploadURL = obj.url,
					_uploadType = obj.type,
					_uploadSize = obj.size,
					_uploadFileMulti = obj.fileMulti,
					_uploadFileChunkSize = obj.fileChunkSize;
				if(!_uploadFileMulti){
					_uploadFileMulti = false;
				}else{
					_uploadFileMulti = true;
				}
					
				//不能放入类中进行初始化或调用，否则会出现连续点击2次的BUG
//				var $uploadBox = $("#upload-group-1"),
//					$buttonUpload = $uploadBox.find("#button-open-1");
		
				try{
					//x-plupload-template.js
					var upload = new xUpload();
				}catch(e){
					throw new Error("object xUpload undefined");
					return;
				}
				
				upload.settings = {
					url : _uploadURL || "/FileManage/upload",			//服务器端的上传页面地址
					type : _uploadType || "all",		//文件类型,如果为空则不允许上传
					size : _uploadSize || "10mb",				//文件大小
					multi_selection : _uploadFileMulti,	//是否允许多选
					chunk_size : _uploadFileChunkSize,
					swf : WebLoader.Config.PROBJECT_PATH+"/library/file.plupload-2.1.0/js/Moxie.swf",			//swf文件，当需要使用swf方式进行上传时需要配置该参数
					xap : WebLoader.Config.PROBJECT_PATH+"/library/file.plupload-2.1.0/js/Moxie.xap",			//silverlight文件，当需要使用silverlight方式进行上传时需要配置该参数
					btn_openFileId : $this.attr("id"),	//触发文件选择对话框的按钮，为那个元素id
					node_box : document.getElementById(_uploadContainerId)					//节点容器，用于创建结构
				};
				
				upload.init(upload.settings);
//				_classFileUpdateControl = new ClassFileUpdateControl();
//				_classFileUpdateControl.InitLinkClass("upload",upload);
		
				/*************************************************************************
				*	事件控制区
				*************************************************************************/
				
//				//选择文件
//				upload.bindEvent("FilesAdded",_classFileUpdateControl.EventFilesAdded);
//				
//				//单个文件开始上传
//				upload.bindEvent("UploadFile",_classFileUpdateControl.EventUploadFile);
//				
//				//单个文件上传前动作
//				upload.bindEvent("BeforeUpload",_classFileUpdateControl.EventBeforeUpload);
//			
//				//单文件进度条
//				upload.bindEvent("uploadProgress",_classFileUpdateControl.EventuploadProgress);
//				
//				//文件队列变化时
//				upload.bindEvent("QueueChanged",_classFileUpdateControl.EventQueueChanged);
//				
//				//单个文件上传完成
//				upload.bindEvent("FileUploaded",_classFileUpdateControl.EventFileUploaded);
//				
//				//全部文件上传完成
//				upload.bindEvent("UploadComplete",_classFileUpdateControl.EventUploadComplete);
//				
//				//发生错误
//				upload.bindEvent("Error",_classFileUpdateControl.EventError);
				
				if(obj.callback){
					for(var i in obj.callback){
						upload.bindEvent(i,obj.callback[i]);
					}
				}
				
				_object.__upload = upload;
				
			}
			
			//初始化
			_object.init = function(obj){
				//缓存uuid
				if(!$this.data("__cacheUUID")){
					_uuid = xUtilBase.createUUID();
					_uploadBoxId = "upload-box-"+_uuid;
					_uploadContainerId = "upload-container-"+_uuid;
					$this.data("__cacheUUID",_uuid);
					if(!$this.attr("id")){
						$this.attr("btn-uplaod-"+_uuid);
					}
					_object.createForm();
					
					function isLoadJS(){
						try{
							new xUpload();
							_object.bindEvent(obj);
						}catch(e){
							setTimeout(function(){
								isLoadJS();
							},500);
						}
					}
					isLoadJS();
				}
				
				return _object;
			}
			return _object.init(obj);
		}
	});
})(jQuery);
