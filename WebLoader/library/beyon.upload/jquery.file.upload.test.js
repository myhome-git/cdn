(function($){
    			
	$(document).ready(documentReady);
	
	function documentReady(){
		
		$("#btn-upload").fileUpload({
			url : "/HttpRequestConsole/test",
			callback : {
				BeforeUpload : function(upload,file){
					upload.setOption({
						multipart_params:{
							action:"action.upload",
							uploadPath : file.name
						}
					});
				},
				FilesAdded : function(upload,a,b){
					toastr.success("开始上传");
					upload.start();
				},
				UploadProgress : function(upload,file){
					console.info(file.percent+"%")
				},
				FileUploaded : function(upload,file,result){
					try{
						result = JSON.parse(result);
					}catch(e){}
					
					if(result.status==200){
						let response;
						try{
							response = JSON.parse(result.response);
						}catch(e){
							toastr.error("返回数据不正确");
							return;
						}
						if(response.code!="0"){
							toastr.error(response.message);
							return;
						}
						toastr.success("上传成功");
					}else{
						toastr.error("数据上传失败，状态码："+result.status);
					}
				},
				UploadComplete : function(upload,files){
					upload.files= [];
				},
				Error : function(up,b,c){
					toastr.error("上传失败，"+b.message);
				}
			}
		});
		
	}
	
})(jQuery);