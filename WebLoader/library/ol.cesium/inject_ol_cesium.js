(function() {
  var mode = window.location.href.match(/mode=([a-z0-9\-]+)\&?/i);
  var DIST = true;
  var isDev = mode && mode[1] === 'dev';
  var cs = isDev ? 'CesiumUnminified/Cesium.js' : 'Cesium/Cesium.js';
  var ol = (DIST && isDev) ? 'olcesium-debug.js' : 'olcesium.js';
  //modify by zn
//  var ol =  'olcesium-debug.js' ;

  if (!window.LAZY_CESIUM) {
    document.write('<scr' + 'ipt type="text/javascript" src="../resources/plugins/ol-cesium/' + cs + '"></scr' + 'ipt>');
  }
  document.write('<scr' + 'ipt type="text/javascript" src="../resources/plugins/ol-cesium/' + ol + '"></scr' + 'ipt>');

  var s;
  window.lazyLoadCesium = function() {
    if (!s) {
      s = document.createElement("script");
      s.type = "text/javascript";
      s.src = '../resources/plugins/ol-cesium/' + cs;
      console.log('loading Cesium...');
      document.body.appendChild(s);
    }
    return s;
  };
})();

