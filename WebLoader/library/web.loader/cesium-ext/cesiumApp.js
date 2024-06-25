function ClassCesiumApp(){
	
	let _this = this;
	let _cesiumViewer,_handler;
	
	this.initViewer = function(doc){
		var _this = this;
		_cesiumViewer = new Cesium.Viewer(option.domElement, {
			animation: false, //是否创建动画小器件，左下角仪表
			baseLayerPicker: false, //是否显示图层选择器
			fullscreenButton: false, //是否显示全屏按钮
			geocoder: false, //是否显示geocoder小器件，右上角查询按钮
			homeButton: false, //是否显示Home按钮
			infoBox: true, //是否显示信息框
			sceneModePicker: true, //是否显示3D/2D选择器
			selectionIndicator: true, //是否显示选取指示器组件
			timeline: false, //是否显示时间轴
			navigationHelpButton: true, //是否显示右上角的帮助按钮
			scene3DOnly: true, //如果设置为true，则所有几何图形以3D模式绘制以节约GPU资源
			clock: new Cesium.Clock(), //用于控制当前时间的时钟对象
			fullscreenElement: document.body, //全屏时渲染的HTML元素,
			useDefaultRenderLoop: true, //如果需要控制渲染循环，则设为true
			targetFrameRate: undefined, //使用默认render loop时的帧率
			showRenderLoopErrors: false, //如果设为true，将在一个HTML面板中显示错误信息
			automaticallyTrackDataSourceClocks: true, //自动追踪最近添加的数据源的时钟设置
			contextOptions: undefined, //传递给Scene对象的上下文参数（scene.options）
			sceneMode: Cesium.SceneMode.SCENE3D, //初始场景模式
			mapProjection: new Cesium.WebMercatorProjection(), //地图投影体系
			dataSources: new Cesium.DataSourceCollection()
		});
		
//		this.scene = this.viewer.scene;
//		this.canvas = this.viewer.canvas;
//		this.clock = this.viewer.clock;
//		this.camera = this.viewer.scene.camera;
//		this.entities = this.viewer.entities;
//		this.primitives = this.viewer.primitives;
//		this.ellipsoid = this.scene.globe.ellipsoid;
		
		_handler = new Cesium.ScreenSpaceEventHandler(_cesiumViewer.scene.canvas);
		_cesiumViewer.scene.screenSpaceCameraController.minimumZoomDistance = 100; //相机的高度的最小值
//		this.handler = new Cesium.ScreenSpaceEventHandler(this.scene.canvas);
		
		//this.viewer.scene.screenSpaceCameraController.minimumZoomDistance = 100; //相机的高度的最小值
		// this.viewer.scene.screenSpaceCameraController.maximumZoomDistance = 20000000; //相机高度的最大值
		// this.viewer.scene.screenSpaceCameraController._minimumZoomRate = 30000; // 设置相机缩小时的速率
		// this.viewer.scene.screenSpaceCameraController._maximumZoomRate = 5906376272000 //设置相机放大时的速率

		var startMousePosition;
		var mousePosition;
		this.handler.setInputAction(function(movement) {
			mousePosition = startMousePosition = Cesium.Cartesian3.clone(movement.position);
			_this.handler.setInputAction(function(movement) {
				mousePosition = movement.endPosition;
				var y = mousePosition.y - startMousePosition.y;
				if (y > 0) {
					_this.scene.screenSpaceCameraController.enableTilt = true;
				}
			}, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
		}, Cesium.ScreenSpaceEventType.MIDDLE_DOWN);


		//移动设备上禁掉以下几个选项，可以相对更加流畅
		if (navigator.userAgent.match(/(iPhone|iPod|Android|ios)/i)) {
			this.viewer.scene.fog.enable = false;
			this.viewer.scene.skyAtmosphere.show = false;
			this.viewer.scene.fxaa = false;
		}
		this.cn();
		this.hide();
		if (option.homePostion) {
			this.flyToByPosition(option.homePostion, 0, function(e) {

			});
			Cesium.Camera.DEFAULT_VIEW_RECTANGLE = Cesium.Rectangle.fromDegrees(89.5, 20.4, 110.4, 61.2); //homebutton默认跳转位置
		}
		if (callback) callback(this);

		// 设置鼠标位置经纬度\视角高度实时显示
		var longitude_show = document.getElementById('longitude_show');
		var latitude_show = document.getElementById('latitude_show');
		var altitude_show = document.getElementById('altitude_show');
		var electude_show = document.getElementById('electude_show');
		//鼠标移动
		this.handler.setInputAction(function(event) {
			try {
				var cartesian = _this.camera.pickEllipsoid(event.endPosition, _this.ellipsoid);
				if (cartesian) {
					var cartographic =_this. ellipsoid.cartesianToCartographic(cartesian);
					var lat_String = Cesium.Math.toDegrees(cartographic.latitude).toFixed(4);//经度
					var log_String = Cesium.Math.toDegrees(cartographic.longitude).toFixed(4);//纬度
					var alti_String = (_this.camera.positionCartographic.height / 1000).toFixed(2);//视角高度
					var elec_String =0;
					if((_this.scene.globe.getHeight(cartographic))){
						elec_String = (_this.scene.globe.getHeight(cartographic)).toFixed(4);//海拔高度
					}
					longitude_show.innerHTML = log_String;
					latitude_show.innerHTML = lat_String;
					altitude_show.innerHTML = alti_String;
					electude_show.innerHTML = elec_String;
				}
			} catch (e) {
				console.log(e);
			}
		}, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
		
		
		//键盘事件ctrl+shift+D切换模板操作
		document.addEventListener('keydown', function(event) {
			var e = event || window.event || arguments.callee.caller.arguments[0];
			if (e) {
				var keyCode = event.keyCode || event.which || e.charCode;
				if (event.ctrlKey == true && keyCode == 70) {
					_this.scene.debugShowFramesPerSecond = !_this.scene.debugShowFramesPerSecond;
					event.preventDefault();
				}
			}
		});
	}
	
	//更新位置
	this.update = function(){
		
		/**
		 * {tx: 102.9275, ty: 25.09979999999999, tz: 0, rx: 0, ry: 0,rz : 323}
		 * 
		 */

		//旋转
		var mx = Cesium.Matrix3.fromRotationX(Cesium.Math.toRadians(params.rx));
		var my = Cesium.Matrix3.fromRotationY(Cesium.Math.toRadians(params.ry));
		var mz = Cesium.Matrix3.fromRotationZ(Cesium.Math.toRadians(params.rz));
		var rotationX = Cesium.Matrix4.fromRotationTranslation(mx);
		var rotationY = Cesium.Matrix4.fromRotationTranslation(my);
		var rotationZ = Cesium.Matrix4.fromRotationTranslation(mz);
		//平移
		var position = Cesium.Cartesian3.fromDegrees(params.tx, params.ty, params.tz);
		var m = Cesium.Transforms.eastNorthUpToFixedFrame(position);
		//旋转、平移矩阵相乘
		Cesium.Matrix4.multiply(m, rotationX, m);
		Cesium.Matrix4.multiply(m, rotationY, m);
		Cesium.Matrix4.multiply(m, rotationZ, m);
		//赋值给tileset,,,Cesium3DTileset对象
		_this.tileset._root.transform = m;
	}
}
