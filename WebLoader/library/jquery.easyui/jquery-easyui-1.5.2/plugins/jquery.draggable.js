/**
 * jQuery EasyUI 1.5.2
 * 
 * Copyright (c) 2009-2017 www.jeasyui.com. All rights reserved.
 *
 * Licensed under the freeware license: http://www.jeasyui.com/license_freeware.php
 * To use it on other terms please contact us: info@jeasyui.com
 *
 */
(function(b){function l(a){var d=b.data(a.data.target,"draggable"),e=d.options,d=d.proxy,c=a.data,f=c.startLeft+a.pageX-c.startX,g=c.startTop+a.pageY-c.startY;d&&(d.parent()[0]==document.body?(f=null!=e.deltaX&&void 0!=e.deltaX?a.pageX+e.deltaX:a.pageX-a.data.offsetWidth,g=null!=e.deltaY&&void 0!=e.deltaY?a.pageY+e.deltaY:a.pageY-a.data.offsetHeight):(null!=e.deltaX&&void 0!=e.deltaX&&(f+=a.data.offsetWidth+e.deltaX),null!=e.deltaY&&void 0!=e.deltaY&&(g+=a.data.offsetHeight+e.deltaY)));a.data.parent!=document.body&&(f+=b(a.data.parent).scrollLeft(),g+=b(a.data.parent).scrollTop());"h"==e.axis?c.left=f:("v"!=e.axis&&(c.left=f),c.top=g)}function m(a){var d=b.data(a.data.target,"draggable"),e=d.options;(d=d.proxy)||(d=b(a.data.target));d.css({left:a.data.left,top:a.data.top});b("body").css("cursor",e.cursor)}function n(a){if(!b.fn.draggable.isDragging)return!1;var d=b.data(a.data.target,"draggable"),e=d.options,c=b(".droppable:visible").filter(function(){return a.data.target!=this}).filter(function(){var c=b.data(this,"droppable").options.accept;return c?0<b(c).filter(function(){return this==a.data.target}).length:!0});d.droppables=c;c=d.proxy;c||(e.proxy?(c="clone"==e.proxy?b(a.data.target).clone().insertAfter(a.data.target):e.proxy.call(a.data.target,a.data.target),d.proxy=c):c=b(a.data.target));c.css("position","absolute");l(a);m(a);e.onStartDrag.call(a.data.target,a);return!1}function p(a){if(!b.fn.draggable.isDragging)return!1;var d=b.data(a.data.target,"draggable");l(a);0!=d.options.onDrag.call(a.data.target,a)&&m(a);var e=a.data.target;d.droppables.each(function(){var c=b(this);if(!c.droppable("options").disabled){var d=c.offset();a.pageX>d.left&&a.pageX<d.left+c.outerWidth()&&a.pageY>d.top&&a.pageY<d.top+c.outerHeight()?(this.entered||(b(this).trigger("_dragenter",[e]),this.entered=!0),b(this).trigger("_dragover",[e])):this.entered&&(b(this).trigger("_dragleave",[e]),this.entered=!1)}});return!1}function r(a){function d(){f&&f.remove();c.proxy=null}function e(){var e=!1;c.droppables.each(function(){var c=b(this);if(!c.droppable("options").disabled){var h=c.offset();if(a.pageX>h.left&&a.pageX<h.left+c.outerWidth()&&a.pageY>h.top&&a.pageY<h.top+c.outerHeight())return g.revert&&b(a.data.target).css({position:a.data.startPosition,left:a.data.startLeft,top:a.data.startTop}),b(this).trigger("_drop",[a.data.target]),d(),e=!0,this.entered=!1}});e||g.revert||d();return e}if(!b.fn.draggable.isDragging)return q(),!1;p(a);var c=b.data(a.data.target,"draggable"),f=c.proxy,g=c.options;if(g.revert)if(1==e())b(a.data.target).css({position:a.data.startPosition,left:a.data.startLeft,top:a.data.startTop});else if(f){var h,k;f.parent()[0]==document.body?(h=a.data.startX-a.data.offsetWidth,k=a.data.startY-a.data.offsetHeight):(h=a.data.startLeft,k=a.data.startTop);f.animate({left:h,top:k},function(){d()})}else b(a.data.target).animate({left:a.data.startLeft,top:a.data.startTop},function(){b(a.data.target).css("position",a.data.startPosition)});else b(a.data.target).css({position:"absolute",left:a.data.left,top:a.data.top}),e();g.onStopDrag.call(a.data.target,a);q();return!1}function q(){b.fn.draggable.timer&&(clearTimeout(b.fn.draggable.timer),b.fn.draggable.timer=void 0);b(document).unbind(".draggable");b.fn.draggable.isDragging=!1;setTimeout(function(){b("body").css("cursor","")},100)}b.fn.draggable=function(a,d){return"string"==typeof a?b.fn.draggable.methods[a](this,d):this.each(function(){function e(a){var c=b.data(a.data.target,"draggable"),d=c.handle,e=b(d).offset(),g=b(d).outerWidth(),d=b(d).outerHeight();return Math.min(a.pageY-e.top,e.left+g-a.pageX,e.top+d-a.pageY,a.pageX-e.left)>c.options.edge}var c;(c=b.data(this,"draggable"))?(c.handle.unbind(".draggable"),c=b.extend(c.options,a)):c=b.extend({},b.fn.draggable.defaults,b.fn.draggable.parseOptions(this),a||{});var d=c.handle?"string"==typeof c.handle?b(c.handle,this):c.handle:b(this);b.data(this,"draggable",{options:c,handle:d});c.disabled?b(this).css("cursor",""):d.unbind(".draggable").bind("mousemove.draggable",{target:this},function(a){if(!b.fn.draggable.isDragging){var c=b.data(a.data.target,"draggable").options;e(a)?b(this).css("cursor",c.cursor):b(this).css("cursor","")}}).bind("mouseleave.draggable",{target:this},function(a){b(this).css("cursor","")}).bind("mousedown.draggable",{target:this},function(a){if(0!=e(a)){b(this).css("cursor","");var c=b(a.data.target).position(),d=b(a.data.target).offset(),c={startPosition:b(a.data.target).css("position"),startLeft:c.left,startTop:c.top,left:c.left,top:c.top,startX:a.pageX,startY:a.pageY,width:b(a.data.target).outerWidth(),height:b(a.data.target).outerHeight(),offsetWidth:a.pageX-d.left,offsetHeight:a.pageY-d.top,target:a.data.target,parent:b(a.data.target).parent()[0]};b.extend(a.data,c);c=b.data(a.data.target,"draggable").options;if(0!=c.onBeforeDrag.call(a.data.target,a))return b(document).bind("mousedown.draggable",a.data,n),b(document).bind("mousemove.draggable",a.data,p),b(document).bind("mouseup.draggable",a.data,r),b.fn.draggable.timer=setTimeout(function(){b.fn.draggable.isDragging=!0;n(a)},c.delay),!1}})})};b.fn.draggable.methods={options:function(a){return b.data(a[0],"draggable").options},proxy:function(a){return b.data(a[0],"draggable").proxy},enable:function(a){return a.each(function(){b(this).draggable({disabled:!1})})},disable:function(a){return a.each(function(){b(this).draggable({disabled:!0})})}};b.fn.draggable.parseOptions=function(a){var d=b(a);return b.extend({},b.parser.parseOptions(a,["cursor","handle","axis",{revert:"boolean",deltaX:"number",deltaY:"number",edge:"number",delay:"number"}]),{disabled:d.attr("disabled")?!0:void 0})};b.fn.draggable.defaults={proxy:null,revert:!1,cursor:"move",deltaX:null,deltaY:null,handle:null,disabled:!1,edge:0,axis:null,delay:100,onBeforeDrag:function(a){},onStartDrag:function(a){},onDrag:function(a){},onStopDrag:function(a){}};b.fn.draggable.isDragging=!1})(jQuery);