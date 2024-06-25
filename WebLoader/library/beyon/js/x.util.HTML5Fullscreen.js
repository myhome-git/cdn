(function($){
	$.extend({
        HTML5FullscreenChange: function(func1, func2) {
			//全屏事件监听
			var fullscreenArray = ["", "moz", "webkit", "ms"];
			fullscreenArray.forEach(function(o, index) {
				document.addEventListener(o + "fullscreenchange", function(e) {
					if(document._fullScreen == "open") {
						if(func1) {
							func1(e);
						}
					} else if(document._fullScreen == "close") {
						if(func2) {
							func2(e);
						}
					}
				}, false);

			});
			return this;
		},
		HTML5IsFullscreen: function() {
			var fullscreenElement =
				document.fullscreenEnabled ||
				document.mozFullscreenElement ||
				document.webkitFullscreenElement ||
				document.msFullscreenElement;
			var fullscreenEnabled =
				document.fullscreenEnabled ||
				document.mozFullscreenEnabled ||
				document.webkitFullscreenEnabled ||
				document.msFullscreenEnabled;

			//console.info("侦测结果",fullscreenElement,fullscreenEnabled);
			if(fullscreenEnabled == null) {
				return false;
			} else {
				return true;
			}
		},
		HTML5FullScreen: function(isFullscreen) {
			if(isFullscreen === true) {
				var de = document.documentElement;
				if(de.requestFullscreen) {
					de.requestFullscreen();
				} else if(de.mozRequestFullScreen) {
					de.mozRequestFullScreen();
				} else if(de.webkitRequestFullScreen) {
					de.webkitRequestFullScreen();
				} else if(de.msRequestFullScreen) {
					de.msRequestFullScreen();
				}
				document._fullScreen = "open";
			} else {
				var de = document;
				if(de.exitFullscreen) {
					de.exitFullscreen();
				} else if(de.mozCancelFullScreen) {
					de.mozCancelFullScreen();
				} else if(de.mozExitFullscreen) {
					de.mozExitFullscreen();
				} else if(de.webkitCancelFullScreen) {
					de.webkitCancelFullScreen();
				} else if(de.webkitExitFullscreen) {
					de.webkitExitFullscreen();
				} else if(de.msCancelFullScreen) {
					de.msCancelFullScreen();
				} else if(de.msExitFullscreen) {
					de.msExitFullscreen();
				}
				document._fullScreen = "close";
			}
			return this;
		}
    });
    
})(jQuery);