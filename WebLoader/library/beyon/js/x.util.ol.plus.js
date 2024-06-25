(function(module){
	
	function ClassOL(){
		
		//声明内部变量
		let _this=this,_map;
		
		//取出map对象
		this.getMap = function(){
			return _map;
		}
		
		//创建矢量图层
		this.newVector = function(obj){
			let _source = new ol.source.Vector();
			let _default = {
				source: _source
			};
			$.extend(true, _default, obj);
			new ol.layer.Vector(_default);
		}
		
		//移除矢量层
		this.removeVector = function(){
			
		}
		
		//根据点获取feature,position=[x,y]
		this.getFeaturePixel = function(position){
			let _features = [];
			map.forEachFeatureAtPixel(position, function(feature) {
				_features.push(feature);
				return false;
			});
			return _features;
		}
		
		//坐标转换
		this.fromLonLat = function(position){
			return ol.proj.fromLonLat(position);
		}
		
		this.init = function(map){
			_map = map;
		}
		
	}
	
	module.ClassOL = ClassOL;
	
})(xUtilBase);