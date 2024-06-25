(function($) {
	$.fn.extend({
		resizePlus : function(callback){
			
			let $this = $(this),
				_setTimeout = 250;
			$this.data("__width",$this.width());
			$this.data("__height",$this.height());
			function setOuter(){
				if($this.width()!=$this.data("__width")){
					$this.data("__width",$this.width());
					if(callback){
						callback($this);
					}
				}
				
				if($this.height()!=$this.data("__height")){
					$this.data("__height",$this.height());
					if(callback){
						callback($this);
					}
				}
				
				setTimeout(function(){
					setOuter();
				},_setTimeout);
			}
			
			setOuter();
		}
	});
})(jQuery);