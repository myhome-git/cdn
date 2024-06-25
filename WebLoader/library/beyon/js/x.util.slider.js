(function($){
	
	$.fn.extend({
        utilSlider : function(option){
           
			var $doc = $(this),
           		$dragBox,
           		$dragBackground,
           		$dragInput;
           		
           	//创建element
           	var _html = "<div class=\"x-ui-mouse-drag-slider x-clearfix\">"
						+"	<div class=\"drag-slider-box\">"
						+"		<div class=\"slider-background\"></div>"
						+"	</div>"
						+"	<div class=\"drag-slider-input\">"
						+"		<input type=\"text\" class=\"layui-input\" autocomplete=\"off\" />"
						+"	</div>"
						+"</div>";
			
			$doc.html(_html);
	
			var _default = {
				min : 0,
				max : 100,
				step : 1,
				value : "",
			    change: function(value){
			    	
				}
			};
			
			$.extend(true, _default, option);
		
			$dragBox = $doc.find(".drag-slider-box");
			
			$dragBackground = $doc.find(".slider-background");
			
			$dragInput = $doc.find("input");
			
			if(_default.value!=undefined){
				setValue(_default.value);
			}
			
			var keyupClock;
			$dragInput.on("keyup",function(event){
				
				keyupClock = event.timeStamp;
				var _this = $(this);
				var _value = $(this).val();
				setTimeout(function(){
		            if(keyupClock-event.timeStamp==0){
						setValue(_value);
						_default.change(_value);
		            }
				},100);
			});
			
			$dragBox.on("mousedown",function(e){
				
				$dragBox.bind('mousemove', onMouseDrag); 
				
				$dragBox.bind('mouseup', onMouseUp);
				
				$(window).bind('mouseup', onMouseUp);
				
				onMouseDrag(e);
				
			})
			
			
			function onMouseDrag(e) {
				e.preventDefault();
		      
				var bgRect = $dragBox.get(0).getBoundingClientRect();
				
				//判断鼠标是否在范围内
				if(e.clientX > bgRect.right){
					
					e.clientX = bgRect.right;
					
				}else if(e.clientX<bgRect.left){
					
					e.clientX = bgRect.left;
					
				}
				
				//得到百分比
				var _progress = (e.clientX-bgRect.left) / (bgRect.right-bgRect.left) * 100;
				
				var _value = _progress*(_default.max/100);
				
				if(_value<_default.min || _value>_default.max){
					
					return;
					
				}
				
				//如果是整数
				if(_default.step==parseInt(_default.step)){
					
					_value = _value.toString().match(/^\d+/);
					
				}else{
					
					_value = _value.toString().match(/^\d+\.{0,1}\d{0,1}/);
					
				}
				
				_value = _value.toString();
				
				setValue(_value);
				
				_default.change(_value);
				
				return false;
				
		    }
			
			function onMouseUp() {
		      $dragBox.unbind('mousemove', onMouseDrag);
		      $dragBox.unbind('mouseup', onMouseUp);
		    }
			
			
			function setValue(value){
				
				$dragInput.val(value);
				
				var _progress = value/_default.max*100;
				
				_progress = _progress.toString().match(/^\d+\.{0,1}\d{0,1}/).toString();
				
				$dragBackground.css({"width":_progress+"%"});
				
			}
			
        }
    });
    
})(jQuery);