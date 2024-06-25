(function($) {
    $.fn.dragDiv = function(options) {
    	var $this = this;
       $this.Tdrag({
		     scope:options,
		     cbMove : function(){
		     	$this.css({"right":"auto"});
		     },
		     cbEnd:function(){
		     	$this.css({"right":"auto"});
		     }
		});
    }
})(jQuery)