//解决easy datagrid序号宽度不能自动适应的问题
function DocumentLoadCommonEasyUIDataGrid(){
	$.extend($.fn.datagrid.methods, {  
	    fixRownumber : function (jq) {  
	        return jq.each(function () {  
	            var panel = $(this).datagrid("getPanel");  
	            var clone = $(".datagrid-cell-rownumber", panel).last().clone();  
	            clone.css({  
	                "position" : "absolute",  
	                left : -1000  
	            }).appendTo("body");
	            var width = clone.width("auto").width();
	            if (width >= 25) {  
	                //多加5个像素,保持一点边距  
	                $(".datagrid-header-rownumber,.datagrid-cell-rownumber", panel).width(width + 5);  
	                $(this).datagrid("resize");  
	                //一些清理工作  
	                clone.remove();  
	                clone = null;  
	            } else {  
	                //还原成默认状态  
	                $(".datagrid-header-rownumber,.datagrid-cell-rownumber", panel).removeAttr("style");  
	            }  
	        });  
	    }
	});
}
if(document.addEventListener){
	document.addEventListener('DOMContentLoaded',function() {
		document.removeEventListener("DOMContentLoaded", arguments.callee, false); 
		DocumentLoadCommonEasyUIDataGrid();
	},false); 
	
}else if(document.attachEvent){
	document.attachEvent("onreadystatechange", function(){  
	    if ( document.readyState === "complete" ) {  
	        document.detachEvent( "onreadystatechange", arguments.callee );  
	        DocumentLoadCommonEasyUIDataGrid();
	    }
  });
}