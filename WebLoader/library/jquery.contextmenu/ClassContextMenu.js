function ClassContextMenu(){
	
	this.init = function(option){
		this.initMenu(option);
		return this;
	}
	
	this.initMenu = function(option){
		
	    let menu = new BootstrapMenu(option.selector, {
	    	moduleName : option.moduleName,
		    fetchElementData: option.getRowData,
		      /* group actions by their id to make use of separators between
		       * them in the context menu. Actions not added to any group with
		       * this option will appear in a default group of their own. */
		    actionsGroups: option.actionsGroups || [],
		      /* you can declare 'actions' as an object instead of an array,
		       * and its keys will be used as action ids. */
		    actions: option.actions || {}
	    });
	    
	    let $style = $("<style></style>");
	    let _html = [];
	    	_html.push(".dropdown-menu{padding:0;border:0}");
	    	_html.push(".dropdown-menu>li{padding:5px 0px;}");
	    	_html.push(".dropdown-menu .divider{margin:0px;padding:0;height:0;position:relative;overflow:inherit;}");
	    	_html.push(".dropdown-menu .divider:after{display:block;content:'';position:absolute;left:0;top:0;width:100%;border-bottom:1px solid #f2f2f2;}");
	    	_html.push(".dropdown-menu .divider{display:none;}");
	    	$style.html(_html.join(""));
	    menu.$menuList.append($style);
	    
//	    menu.$menuList.css({"padding":"0","border":"0"});
//	    menu.$menuList.find(">li").css({"padding":"5px 0px"});
//	    menu.$menuList.find(".divider").css({"margin":"0px","padding":"0","height":"0"});
//	    menu.$menuList.find(".divider:eq(0)").css({"height":"0"});
	    
//		示例
//	    let optionNew = {
//			selector : "tbody [data-index]",
//			getRowData : function($elem){
//				let _index = $elem.attr("data-index");
//				return data[Number(_index)];
//			},
//			actionsGroups: [
//		        ['setEditable', 'setUneditable' ],
//		        ['deleteRow']
//		    ],
//			actions : {
//				editName: {
//		          name: 'Edit name',
//		          iconClass: 'fa-pencil',
//		          onClick: function(row) {
//		            _message.info("'Edit name' clicked on '" + row.name + "'");
//		          },
//		          isEnabled: function(row) {
//		            return row.isEditable || true;
//		          }
//		        },
//		        editDescription: {
//		          name: 'Edit description',
//		          iconClass: 'fa-pencil',
//		          onClick: function(row) {
//		            _message.info("'Edit description' clicked on '" + row.name + "'");
//		          },
//		          isEnabled: function(row) {
//		            return row.isEditable;
//		          }
//		        },
//		        setEditable: {
//		          name: 'Set editable',
//		          iconClass: 'fa-unlock',
//		          onClick: function(row) {
//		            _message.info("'Set editable' clicked on '" + row.name + "'");
//		          },
//		          isShown: function(row) {
//		            return !row.isEditable;
//		          }
//		        },
//		        setUneditable: {
//		          name: 'Set uneditable',
//		          iconClass: 'fa-lock',
//		          onClick: function(row) {
//		            _message.info("'Set uneditable' clicked on '" + row.name + "'");
//		          },
//		          isShown: function(row) {
//		            return row.isEditable;
//		          }
//		        },
//		        deleteRow: {
//		          name: 'Delete row',
//		          iconClass: 'fa-trash-o',
//		          onClick: function(row) {
//		            _message.info("'Delete row' clicked on '" + row.name + "'");
//		          },
//		          isEnabled: function(row) {
//		            return row.isEditable && row.isRemovable;
//		          }
//		        }
//			}
//		};
	}
	
}

