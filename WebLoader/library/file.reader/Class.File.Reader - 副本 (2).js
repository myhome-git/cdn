function ClassFileReader(){
	
	this._default = {
		input : null,		//文件容器
		onBeforeSend : null,
		onProgress : null,
		onSuccess : null,
		onError : null,
		onComplete : null,
		readerType : null,
	};
	
	//指针
	var _this = this;
	
	this.readFile = function(e){
		
		var blobSlice = File.prototype.slice || File.prototype.mozSlice || File.prototype.webkitSlice;
		
		_this.files = this.files;
		
		//防止选择空文件夹
		if(_this.files.length<1){
			return;
		}
		
		// Read in chunks of 2MB
//		var chunkSize = 2097152;
		var chunkSize = 1024;
		
		function _readerFile(el){
			
		}
		
		$.each(this.files,function(index,el){
			var file = el,
		        chunks = Math.ceil(file.size / chunkSize),
		        currentChunk = 0,
		        spark = new SparkMD5.ArrayBuffer(),
		        fileReader = _this.fileReader = new FileReader();
			
			//自动判断文件类型
			var readerType;
				/*
				 	readAsArrayBuffer		异步按字节读取文件内容，结果用ArrayBuffer对象表示
				 	readAsBinaryString		异步按字节读取文件内容，结果为文件的二进制串
				 	readAsDataURL			异步读取文件内容，结果用data:url的字符串形式表示
				 	readAsText				异步按字符读取文件内容，结果用字符串形式表示
				 */
			
			//此处可能会出现读取text等文件的时候md5不准的情况，建议使用readAsArrayBuffer
			if(!readerType){
				var _type = file.type;
				if(/^image\//.test(_type)){
					readerType = "readAsDataURL";
				}else if(/^text\//.test(_type)){
					readerType = "readAsText";
				}else{
					readerType = "readAsArrayBuffer";
				}
				readerType = "readAsArrayBuffer";
			}
			
			if(_this._default.onBeforeSend){
				_this._default.onBeforeSend(fileReader,file);
			}
			
		    fileReader.onload = function (e) {
	//	        console.log('read chunk nr', currentChunk + 1, 'of', chunks);
		        spark.append(e.target.result);                   // Append array buffer
		        currentChunk++;	
		        if (currentChunk < chunks) {
		            loadNext();
		        } else {
		        	file.md5Value = spark.end();	        	
		        	if(_this._default.onSuccess){
		        		_this._default.onSuccess(this,file);
		        	}
		        	if(_this.files.length==(index+1) && _this._default.onComplete){
						_this._default.onComplete(_this.files);
					}
		        }
		    };
			
		    fileReader.onerror = function () {
		    	if(_this.onError){
		    		_this.onError(this,file);
		    	}
		    };
		
		    function loadNext() {
		        var start = currentChunk * chunkSize,
		            end = ((start + chunkSize) >= file.size) ? file.size : start + chunkSize;
		            
		        if(end>=file.size && _this._default.onProgress){
		        	_this._default.onProgress(fileReader,file.size,end);
		        }
		        //如果使用其它方式读可能出现md5不准的现象
				fileReader[readerType](blobSlice.call(file, start, end));
				
		    }
		
		    loadNext();
		    
		});
		
	};
	
	this.init = function(option){
		var _this = this;
		$.extend(true, _this._default, option);
		var _default = _this._default;
		if(typeof FileReader==='undefined'){ 
//			    result.innerHTML = "抱歉，你的浏览器不支持 FileReader"; 
		    _default.input.setAttribute('disabled','disabled'); 
		}else{
		    _default.input.addEventListener('change',this.readFile,false); 
		}
	}
	
	return this;
}