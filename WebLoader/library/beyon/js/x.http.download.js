var HttpDownload = function(){
	var download = new Object();
	download.iframe = undefined;
	//开始下载
	download.go = function(src,params){
		$('#xydHttpDownload').remove();
		var paramsStr = "";
		if(params){
			paramsStr += "?";
			for(var i in params){
				paramsStr += i + "=" + params[i] + "&";
			}
		}
		paramsStr = paramsStr.replace(/(\&*$)/g, "");
		download.iframe = $('<iframe></iframe>');
		download.iframe.attr('id',"httpDownload");
		download.iframe.css({'display':'none'});
		download.iframe.attr('src',encodeURI(src+paramsStr));
		download.iframe.get(0).onload = function(){
			download.onload();
		};	
		$('body').append(download.iframe);
	}
	
	download.onload = function(){
		if(typeof download.iframe == 'object'){
			try{
				//download.iframe[download.iframe.length-1].remove();
			}catch(e){}
		}
	}
	return download;
}

function downloadTest(){
	var down = new HttpDownload();
	down.go('http://localhost/bootstrapDemo/htmlpage/js/11111.rar');
}	