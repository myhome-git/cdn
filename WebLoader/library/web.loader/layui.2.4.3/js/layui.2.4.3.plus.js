//点击tr选中checkbox
$(document).on("click",".layui-table-view .layui-table-body tr",function(event){
	let obj = event ? event.target : event.srcElement,
		$this = $(this),
		$input = $this.find(">td:eq(0) > .laytable-cell-checkbox > input,>td:eq(0) > .laytable-cell-radio > input");
//		$input = $this.find("td div.layui-form-checkbox");
	
	if($input.length<1){
		return;
	}
	
	//更新layui缓存
	let _layTableId = $this.closest(".layui-table-view").prev().attr("id"),
		_data = layui.table.cache[_layTableId],
		_index = $this.index(),
		_layFilterName = $this.closest(".layui-table-view").attr("lay-filter");
	
	if(!_data){
		return;
	}
	
	let _inputType = $input.get(0).type;
	if(_inputType=="checkbox"){
		$input.prop("checked",!$input.prop("checked"));
		_data[_index]["LAY_CHECKED"]=$input.prop("checked");
		//render
//		layui.form.render("checkbox",_layFilterName);
	}else if(_inputType=="radio"){
		//单选需要清空标记
		$.each(_data, function(index,el) {
			delete el["LAY_CHECKED"];
		});
		if($input.prop("checked")){
			$input.removeAttr("checked");
		}else{
			$input.prop("checked",true);
			_data[_index]["LAY_CHECKED"]=true;
		}
//		layui.form.render("radio",_layFilterName);
	}
	layui.form.render(null,_layFilterName);
});

$(document).on("click",".layui-table-view .layui-table-body .layui-form-checkbox,.layui-table-view .layui-table-body .layui-form-radio",function(event){
	event.stopPropagation();
});