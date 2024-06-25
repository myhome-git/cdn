Array.prototype.toLINESTRING = function(){
	let _array = [];
	this.forEach(function(value,key){
		//MULTILINESTRING
		_array.push(value.join(" "));
	});
	
	if(_array.length>0){
		return "LINESTRING("+_array.join(",")+")";
	}
	return null;
}
/**
 * 将数组转为MULTILINESTRING，[[[0,1],[1,1]]]
 */
Array.prototype.toMULTILINESTRING = function(){
	let _array0 = [];
	let _pointArray=[];
	this.forEach(function(value,key){
		_pointArray = [];
		value.forEach(function(v,k){
			_pointArray.push(v.join(" "));
		})
		_array0.push("("+_pointArray.join(",")+")");
	});
	
	if(_array0.length>0){
		return "MULTILINESTRING("+_array0.join(",")+")";
	}
	return null;
}
/**
 * 将数组转为POLYGON
 */
Array.prototype.toPOLYGON = function(){
	let _array0 = [];
	let _pointArray=[];
	this.forEach(function(value,key){
		_pointArray = [];
		value.forEach(function(v,k){
			_pointArray.push(v.join(" "));
		})
		_array0.push("("+_pointArray.join(",")+")");
	});
	
	if(_array0.length>0){
		return "POLYGON("+_array0.join(",")+")";
	}
	return null;
}

/**
 *线过日期变更线处理
 */
function LineStringUtil(){
	
}

/**
 * 创建轨道对象
 * @param {*} points 轨迹点 [[0,1],[1,1]]
 */
LineStringUtil.prototype.createMultiLineString = function (points) {
    var pointsSplitted = [];
    var pointsArray = [];
    pointsSplitted.push(points[0]);
    var lastLambda = points[0][0];
    for (var i = 1; i < points.length; i++) {
        var lastPoint = points[i - 1];
        var nextPoint = points[i];
        if (Math.abs(nextPoint[0] - lastLambda) > 180) {
            var deltaX = this.xToValueRange(nextPoint[0] - lastPoint[0]);
            var deltaY = nextPoint[1] - lastPoint[1];
            var deltaXS = this.xToValueRange(180 - nextPoint[0]);
            var deltaYS;
            if (deltaX === 0) {
                deltaYS = 0;
            } else {
                deltaYS = deltaY / deltaX * deltaXS;
            }
            var sign = lastPoint[0] < 0 ? -1 : 1;
            pointsSplitted.push([180 * sign, nextPoint[1] + deltaYS]);
            pointsArray.push(pointsSplitted);
            pointsSplitted = [];
            pointsSplitted.push([-180 * sign, nextPoint[1] + deltaYS]);
        }
        pointsSplitted.push(nextPoint);
        lastLambda = nextPoint[0];
    }
    
    //添加最后一个点数组
    pointsArray.push(pointsSplitted);
  
    return pointsArray;
}

/**
 * 用于处理日期变更线
 */
LineStringUtil.prototype.transformMultiLineString = LineStringUtil.prototype.createMultiLineString;

LineStringUtil.prototype.xToValueRange = function (x) {
    if (Math.abs(x) > 180) {
        var sign = x < 0 ? -1 : 1;
        return x - 2 * 180 * sign;
    } else {
        return x;
    }
}

var _classLineStringUtil = new LineStringUtil();
