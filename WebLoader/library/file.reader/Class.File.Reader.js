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
		var chunkSize = 2097152,chunks,currentChunk,spark,fileReader;
		
		var wait = function(el){
	
			var dtd = $.Deferred(); //在函数内部，新建一个Deferred对象
				
			var tasks = function(){
				
				var file = el;
				
		        chunks = Math.ceil(file.size / chunkSize);
		        
		        currentChunk = 0;
		        
		        spark = new SparkMD5.ArrayBuffer();
		     
		        fileReader = new FileReader();
				
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
					_this._default.onBeforeSend(file);
				}
				
			    fileReader.onload = function (e) {
		//	        console.log('read chunk nr', currentChunk + 1, 'of', chunks);
			        spark.append(e.target.result);                   // Append array buffer
			        currentChunk++;	
			        if (currentChunk < chunks) {
			            loadNext();
			        } else {
			        	file.md5Value = spark.end();
			        	//设置状态-成功
						dtd.resolve({state:"success"}); // 改变Deferred对象的执行状态
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
			            
			        //如果使用readAsArrayBuffer以外其它方式读可能出现md5不准的现象
					fileReader[readerType](blobSlice.call(file, start, end));
					
					if(_this._default.onProgress){
			        	_this._default.onProgress(file,file.size,end);
			        }
			    }
			
			    loadNext();
				//reject
//				dtd.reject({state:"error"});
							
			};
				
			setTimeout(tasks,50);
				
			return dtd.promise(); // 返回promise对象
				
		};
		
		
		
		function __readerFile(files,index){
			
			if(files.length<1 || index>=files.length){
				
				if(_this._default.onComplete){
					
					_this._default.onComplete(files);
					
				}
				
				return;
				
			}
			
			var file = files[index];
		
			$.when(wait(file)).then(function(){
			
//				console.info("读取完毕");
				
				$.each(arguments, function(index,el) {
					
				});
				
				if(_this._default.onSuccess){
	        		_this._default.onSuccess(fileReader,file);
	        	}
				
				__readerFile(files,index+1);
				
			},function(){
				
//				console.info("读取失败");
				
				$.each(arguments, function(index,el) {
					
				});
				
				if(_this._default.onError){
					_this._default.onError(file);
				}
				
			});
			
		}
		
	　　__readerFile(_this.files,0);
		
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