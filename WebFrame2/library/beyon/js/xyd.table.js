/**
 * 表格组件
 */
var xydTable;
$(function() {
	xydTable = function() {
		var c = {
			getTypeof: function(a) {
				return Object.prototype.toString.call(a).toLocaleLowerCase().replace(/(^\[object\s*)(.*)(\]$)/, "$2")
			},
			jpage: {
				ajax: {},
				params: {},
				data: void 0,
				control: {},
				settings: void 0
			},
			init: function(a) {
				c.jpage.settings = {
					tableId: "body",
					selectTrue: "false",
					checkbox: "true",
					Columns: [],
					isTableNowrap: "true",
					uuid: "uuid",
					checkboxName: "groupCheck" + (new Date).getTime(),
					isTableNum: !0,
					width: "100%"
				};
				c.jpage.settings = $.extend(this, a);
				a.pageSize = a.pageSizeGroup ? a.pageSizeGroup[0] : a.pageSize;
				c.jpage.control = {
					pageSize: a.pageSize || 10,
					pageIndex: 1,
					pageStepNumber: a.pageStepNumber || 5,
					pageSizeGroup: a.pageSizeGroup || [10, 15, 20, 50, 100, 200]
				};
				c.createAuto();
				return c
			},
			createAuto: function() {
				var a = c.jpage.settings,
					b;
				b = "true" == a.isTableNowrap ? " table-nowrap" : "";
				b = '\x3cdiv class\x3d"xydTable"\x3e\x3ctable class\x3d"' + b + '"  cellspacing\x3d"0" cellpadding\x3d"0"\x3e' + c.createTableThead() + "\x3c/table\x3e\x3c/div\x3e";
				var d = $(a.tableId);
				d.css({
					width: d.parent().outerWidth() + "px"
				});
				d.html ? d.html(b) : "";
				var e = $(a.tableId).find(".xydTable");
				e.css({
					width: d.innerWidth() + "px",
					overflow: "auto"
				});
				var f = $('\x3cdiv class\x3d"xydTableMenu"\x3e\x3c/div\x3e');
				f.css({
					position: "relative",
					background: "#f5f5f5"
				});
				var g = $('\x3cdiv class\x3d"xydTableMenuBtnBox"\x3e\x3c/div\x3e');
				g.css({
					"float": "left"
				});
				g.append(a.btnBox);
				var k = $('\x3cdiv class\x3d"xydTableMenuControl" style\x3d"font-size:14px;color:#239DCE;"\x3e\x3ci class\x3d"iconfont"\x3e\x26#xe7ab;\x3c/i\x3e\x26nbsp;\u64cd\u4f5c\x3c/div\x3e');
				k.css({
					position: "absolute",
					right: "10px",
					top: "-35px",
					cursor: "pointer"
				});
				k.click(function() {
					f.find("div.ul_box").toggle()
				});
				var n = $('\x3cdiv class\x3d"ul_box"\x3e\x3c/div\x3e');
				n.css({
					position: "absolute",
					right: "0",
					top: "0",
					"z-index": "1",
					display: "none"
				});
				n.hover(function() {}, function() {
					$(this).hide()
				});
				var h = $("\x3cul\x3e\x3c/ul\x3e");
				h.css({
					background: "#FFB200",
					padding: "5px",
					border: "1px solid #ddd"
				});
				n.append(h);
				for(var m = 0; m < a.Columns.length; m++) {
					var l = a.Columns[m],
						p = $("\x3cli\x3e\x3c/li\x3e");
					p.css({
						padding: "5px",
						cursor: "pointer"
					});
					b = $('\x3cinput type\x3d"checkbox" name\x3d"xydTableMenuCheckbox" checked\x3d"true"/\x3e');
					try {
						throw m;
					} catch(q) {
						b.click(function() {
							for(var a = 0, c = d.find(".ul_box").find(":checkbox"), b = 0; b < c.length; b++) !0 === $(c[b]).prop("checked") && (a += 1);
							if(2 > a) return !1;
							for(var a = $(this), f = a.parent().text(), c = e.find(".thead"), k = c.find("th"), g, b = 0; b < k.length; b++) f == $(k[b]).text() && (g = b);
							f = e.find(".tbody").find("tr");
							if(!1 === a.prop("checked"))
								for(c.find("th:eq(" + g + ")").hide(), b = 0; b < f.length; b++) $(f[b]).find("td:eq(" + g + ")").hide();
							else
								for(c.find("th:eq(" + g + ")").show(), b = 0; b < f.length; b++) $(f[b]).find("td:eq(" + g + ")").show()
						})
					}
					l = $("\x3cspan\x3e" + l.title + "\x3c/span\x3e");
					l.css({
						color: "#fff"
					});
					p.append(b);
					p.append(l);
					h.append(p)
				}
				f.append(g);
				f.append(k);
				g.css({
					width: f.outerWidth() - k.outerWidth() - 100 + "px"
				});
				f.append('\x3cdiv style\x3d"clear:both;"\x3e\x3c/div\x3e');
				f.append(n);
				d.prepend(f);
				e.scroll(function() {
					$(this);
					f.css({})
				});
				c.bindHeadOnclick()
			},
			createPageLoadding: function() {
				var a = $(c.jpage.settings.tableId),
					b = '\x3ctr\x3e\x3ctd Colspan\x3d"' + a.find("thead th").length + '" style\x3d"height:30px;"\x3e\x3ccenter\x3e\x3cimg src\x3d"/web/page/images/load.gif" style\x3d"width:auto;height:auto;"/\x3e\x3cspan\x3e\x26nbsp;\x26nbsp;\u6b63\u5728\u52a0\u8f7d....\x3c/span\x3e\x3c/center\x3e\x3c/td\x3e\x3c/tr\x3e';
				return a.find("tbody").html(b)
			},
			createPageLoaddingNoneData: function() {
				var a = $(c.jpage.settings.tableId),
					b = '\x3ctr\x3e\x3ctd Colspan\x3d"' + a.find("thead th").length + '" style\x3d"height:30px;"\x3e\x3ccenter\x3e\x3ci class\x3d"iconfont"\x3e\x26#xe663;\x3c/i\x3e\x3cspan\x3e\x26nbsp;\x26nbsp;\u6ca1\u6709\u67e5\u8be2\u5230\u76f8\u5173\u6570\u636e\uff01\x3c/span\x3e\x3c/center\x3e\x3c/td\x3e\x3c/tr\x3e';
				return a.find("tbody").html(b)
			},
			createPageLoaddingErr: function(a) {
				var b = $(c.jpage.settings.tableId);
				a = '\x3ctr\x3e\x3ctd Colspan\x3d"' + b.find("thead th").length + '" style\x3d"height:30px;color:#f00;"\x3e\x3ccenter\x3e\x3cspan\x3e\x26nbsp;\x26nbsp;' + a + "\x3c/span\x3e\x3c/center\x3e\x3c/td\x3e\x3c/tr\x3e";
				return b.find("tbody").html(a)
			},
			createTableThead: function() {
				var a = c.jpage.settings;
				if("array" == !c.getTypeof(a.Columns) || 1 > a.Columns.length) return "";
				var b;
				b = '\x3cthead class\x3d"thead" data-type\x3d"thead"\x3e\x3ctr\x3e';
				"true" === a.checkbox && (b += "true" === a.selectTrue ? '\x3cth width\x3d"34"\x3e\x3cdiv class\x3d"thbox"\x3e\x3cinput type\x3d"checkbox" class\x3d"th_checkbox" /\x3e\x3c/div\x3e\x3c/th\x3e' : '\x3cth width\x3d"34"\x3e\x3cdiv class\x3d"thbox"\x3e\x3cinput type\x3d"checkbox" class\x3d"th_checkbox" disabled\x3d"disabled" autocomplete\x3d"off"/\x3e\x3c/div\x3e\x3c/th\x3e');
				!0 === a.isTableNum && (b += '\x3cth\x3e\x3cdiv class\x3d"thbox"\x3e\u5e8f\u53f7\x3c/div\x3e\x3c/th\x3e');
				for(var d in a.Columns) {
					var e = a.Columns[d];
					b += e.width ? '\x3cth width\x3d"' + e.width + '"\x3e\x3cdiv class\x3d"thbox"\x3e' + e.title + "\x3c/div\x3e\x3c/th\x3e" : '\x3cth\x3e\x3cdiv class\x3d"thbox"\x3e' + e.title + "\x3c/div\x3e\x3c/th\x3e"
				}
				return b + '\x3c/tr\x3e\x3c/thead\x3e\x3ctbody class\x3d"tbody"\x3e\x3c/tbody\x3e'
			},
			createTableTbody: function(a) {
				if("array" === c.getTypeof(a) && !(1 > a.length)) {
					for(var b = c.jpage.settings, d = "", e = $(c.tableId).find(".ul_box").find("li"), f = {}, g = 0; g < e.length; g++) !1 === $(e[g]).find("input[type\x3d'checkbox']").prop("checked") ? f[$(e[g]).text()] = !1 : f[$(e[g]).text()] = !0;
					for(g = 0; g < a.length; g++) {
						e = a[g];
						void 0 === e[b.uuid] && (e[b.uuid] = g);
						var k = '\x3ctr data-uuid\x3d"' + e[b.uuid] + '" data-index\x3d"' + g + '" data-type\x3d"unit"\x3e';
						"true" === b.checkbox ? k += '\x3ctd\x3e\x3cinput type\x3d"checkbox" name\x3d"' + b.checkboxName + '" /\x3e\x3c/td\x3e' : k;
						!0 === b.isTableNum && (k += "\x3ctd\x3e" + ((c.jpage.control.pageIndex - 1) * c.jpage.control.pageSize + g) + "\x3c/td\x3e");
						for(var n in b.Columns) {
							var h = b.Columns[n],
								m = !1 === f[h.title] ? "display:none;" : "",
								m = h.isTitle ? '\x3ctd title\x3d"' + e[h.field] + '" style\x3d"' + m + '"\x3e' : '\x3ctd style\x3d"' + m + '"\x3e',
								l = e[h.field];
							try {
								for(var p in h.replace) h.replace[p].key == l && (l = h.replace[p].value)
							} catch(q) {}
							l = void 0 === l ? "-" : l;
							!0 === e[h.escape] ? (h = l, h = "string" === typeof h ? h.replace(/&/g, "\x26amp;").replace(/</g, "\x26lt;").replace(/>/g, "\x26gt;").replace(/"/g, "\x26quot;").replace(/'/g, "\x26#039;") : h) : h = l;
							l = h;
							m += l + "\x3c/td\x3e";
							k += m
						}
						k += "\x3c/tr\x3e";
						d += k
					}
					return d
				}
			},
			createJpage: function(a) {
				if(!a) return !1;
				var b = c.jpage.control,
					d = {
						pageSizeGroup: b.pageSizeGroup,
						rsCount: void 0,
						pageSize: void 0,
						pageCount: void 0,
						pageIndex: void 0,
						pageStepNumber: void 0,
						pageStep: []
					};
				d.rsCount = void 0 === a.rsCount || 1 > a.rsCount ? 0 : a.rsCount;
				d.pageSize = b.pageSize;
				d.pageCount = 0 == d.rsCount % d.pageSize ? d.rsCount / d.pageSize : parseInt(d.rsCount / d.pageSize) + 1;
				d.pageIndex = void 0 === b.pageIndex || 1 > b.pageIndex ? 1 : b.pageIndex;
				0 < d.pageCount && (d.pageIndex = d.pageIndex > d.pageCount ? d.pageCount : d.pageIndex);
				d.pageStepNumber = b.pageStepNumber;
				d.pageStepNumber = 5 > d.pageStepNumber ? 5 : d.pageStepNumber;
				d.pageStep = d.pageCount <= d.pageStepNumber ? [1, d.pageCount] : [0 == d.pageStepNumber % 2 ? d.pageIndex - parseInt(d.pageStepNumber / 2 - 1) : d.pageIndex - parseInt(d.pageStepNumber / 2), d.pageIndex + parseInt(d.pageStepNumber / 2)];
				d.pageStep = 1 > d.pageStep[0] ? [1, d.pageStepNumber] : d.pageStep;
				d.pageStep = d.pageStep[1] > d.pageCount ? [d.pageCount - (d.pageStepNumber - 1), d.pageCount] : d.pageStep;
				d.pageStep = d.pageStep[0] > d.pageStep[1] ? [d.pageStep[1], d.pageStep[1]] : d.pageStep;
				c.jpage.control = d;
				return c.jpage.control
			},
			createPageBottomNav: function() {
				var a = c.jpage.control,
					b;
				b = '\x3cdiv class\x3d"pagePaging xyd_clearfix"\x3e\x3ccenter\x3e\x3cspan\x3e\u6bcf\u9875\u663e\u793a\x3c/span\x3e\x3cdiv class\x3d"xyd_inlineblock" style\x3d"width:10px;"\x3e\x3c/div\x3e\x3cselect class\x3d"pageSizeGroup" style\x3d"width:60px;"\x3e';
				for(var d in a.pageSizeGroup) {
					var e = a.pageSizeGroup[d];
					b = a.pageSize == e ? b + ('\x3coption selected\x3d"selected"\x3e' + e + "\x3c/option\x3e") : b + ("\x3coption\x3e" + e + "\x3c/option\x3e")
				}
				b += '\x3c/select\x3e\x3cdiv class\x3d"xyd_inlineblock" style\x3d"width:10px;"\x3e\x3c/div\x3e\x3cspan\x3e\u6761\x3c/span\x3e\uff0c\x3cspan\x3e\u5171\x3ci class\x3d"rsCount"\x3e' + a.rsCount + '\x3c/i\x3e\u6761\u6570\u636e\uff0c\x3c/span\x3e\x3cdiv class\x3d"xyd_inlineblock" style\x3d"width:10px;"\x3e\x3c/div\x3e\x3ci class\x3d"pageIndex"\x3e' + a.pageIndex + '\x3c/i\x3e/\x3ci class\x3d"pageCount"\x3e' + a.pageCount + '\x3c/i\x3e\u9875\x3cdiv class\x3d"xyd_inlineblock" style\x3d"width:10px;"\x3e\x3c/div\x3e\x3cdiv class\x3d"pageStep xyd_inlineblock"\x3e';
				1 < a.pageStep[0] && (b += '\x3cspan class\x3d"pageNumber pageleft" data-index\x3d"1"\x3e\u9996\u9875\x3c/span\x3e');
				if(0 < a.pageStep[1] - a.pageStep[0])
					for(d = a.pageStep[0]; d <= a.pageStep[1]; d++) e = d == a.pageIndex ? "selectIndex" : "", b += '\x3ca class\x3d"pageNumber ' + e + '" data-index\x3d"' + d + '"\x3e' + d + "\x3c/a\x3e";
				a.pageStep[1] < a.pageCount && (b += '\x3cspan class\x3d"pageNumber pageright" data-index\x3d"' + a.pageCount + '"\x3e\u5c3e\u9875\x3c/span\x3e');
				b += "\x3c/div\x3e";
				a.pageStepNumber < a.pageCount && (b += '\x3cdiv class\x3d"xyd_inlineblock" style\x3d"width:20px;"\x3e\x3c/div\x3e\x3cspan\x3e\u5230\u7b2c\x26nbsp;\x3c/span\x3e\x3cinput type\x3d"text" class\x3d"jumpNumber" /\x3e\x3cspan\x3e\x26nbsp;\u9875\x3c/span\x3e\x3cdiv class\x3d"xyd_inlineblock" style\x3d"width:10px;"\x3e\x3c/div\x3e\x3cspan class\x3d"btnJump"\x3e\u8df3\u8f6c\x3c/span\x3e');
				return b + "\x3c/center\x3e\x3c/div\x3e"
			},
			bindTheadChecked: function() {
				var a = c.jpage.settings;
				$(a.tableId + " .xydTable thead .th_checkbox").on("click", function() {
					1 == $(this).is(":checked") ? c.setCheckedAll() : c.setCheckedNoneAll()
				});
				$(a.tableId + " .xydTable tbody tr[data-type\x3d'unit']").on("click", function() {
					var b = $(this);
					"false" == a.selectTrue ? "checked" !== b.attr("data-action") ? (c.setCheckedNoneAll(), c.setCheckedId(b.attr("data-uuid"))) : c.setCheckedNoneId(b.attr("data-uuid")) : "true" == a.selectTrue && ("checked" !== b.attr("data-action") ? c.setCheckedId(b.attr("data-uuid")) : c.setCheckedNoneId(b.attr("data-uuid")))
				})
			},
			bindHeadOnclick: function(a) {
				$(c.jpage.settings.tableId).find("[data-type\x3d'thead'] .thbox").on("dblclick", function() {
					a && a(this);
					return !1
				})
			},
			bindJpage: function() {
				var a = c.jpage.settings;
				$(a.tableId + " .pageNumber").on("click", function() {
					var a = parseInt($(this).attr("data-index"));
					c.jpage.control.pageIndex = a;
					c.ajaxGetTableData()
				});
				$(a.tableId + " .pageSizeGroup").on("change", function() {
					c.jpage.control.pageSize = $(this).val();
					c.setPageSizeCount(this);
					c.ajaxGetTableData()
				});
				$(a.tableId + " .btnJump").on("click", function() {
					var b = $(a.tableId).find(".jumpNumber").val(),
						b = parseInt(b);
					if(isNaN(b) || 1 > b) b = 1;
					b > c.jpage.control.pageCount && (b = c.jpage.control.pageCount);
					c.jpage.params.pageIndex = b;
					c.jpage.control.pageIndex = b;
					c.ajaxGetTableData()
				})
			},
			queryParams: function(a) {
				return a
			},
			ajaxGetTableData: function() {
				var a = c.jpage,
					b = a.settings;
				a.params.pageSize = a.control.pageSize;
				a.params.pageIndex = a.control.pageIndex;
				var d = c.queryParams(c.jpage.params);
				a.params = d.params;
				a.ajax = d.ajax;
				a.ajax.url = a.ajax.url;
				a.ajax.type = "get";
				d = void 0 === a.ajax.type && "get" !== a.ajax.type ? "get" : a.ajax.type;
				$(b.tableId).find("tbody").empty();
				$(b.tableId).find(".pagePaging").empty();
				$.ajax({
					url: a.ajax.url,
					data: a.params,
					type: d,
					dataType: "json",
					async: !0,
					success: function(a) {
						if("00000" !== a["return"].RTNCODE) c.createPageLoaddingErr("" + a["return"].RTNMSG);
						else {
							var d = $(b.tableId);
							try {
								try {
									"array" == c.getTypeof(a.datalist) ? (c.jpage.data = a.datalist, c.createJpage({
										rsCount: a.page ? a.page.RECORD_COUNT : 0
									})) : c.jpage.data = []
								} catch(k) {
									throw Error(k.massage);
								}
								c.getTbaleDataAll();
								var e = c.createTableTbody(c.jpage.data);
								window.setTimeout(function() {
									d.find("tbody").html(e);
									c.onLoadSuccess();
									var a = d.find(".pagePaging");
									1 > a.length && (a = $('\x3cdiv class\x3d"pagePaging"\x3e\x3c/div\x3e'), d.append(a));
									c.bindTheadChecked();
									if("array" == c.getTypeof(c.jpage.data))
										if(0 < c.jpage.data.length) {
											try {
												a.show(), a.html(c.createPageBottomNav())
											} catch(n) {}
											c.bindJpage()
										} else a.hide(), c.createPageLoaddingNoneData();
									else a.hide(), c.createPageLoaddingNoneData()
								}, 500)
							} catch(k) {
								c.createPageLoaddingErr("\u6570\u636e\u52a0\u8f7d\u5931\u8d25\uff0c\u8bf7\u5237\u65b0\u91cd\u8bd5\uff01")
							}
						}
					},
					error: function(a, b, d) {
						c.createPageLoaddingErr("\u670d\u52a1\u5668\u8bf7\u6c42\u5931\u8d25\uff0c\u8bf7\u5237\u65b0\u91cd\u8bd5\uff01")
					}
				})
			},
			setCheckedId: function(a) {
				if("string" === c.getTypeof(a) || "number" === c.getTypeof(a)) {
					var b = c.jpage.settings;
					a = $(b.tableId).find("tbody tr[data-type\x3d'unit'][data-uuid\x3d'" + a + "']");
					a.attr("data-action", "checked").addClass("checked");
					a.find("input[name\x3d'" + b.checkboxName + "']").prop("checked", !0)
				}
			},
			setCheckedNoneId: function(a) {
				if("string" === c.getTypeof(a) || "number" === c.getTypeof(a)) {
					var b = c.jpage.settings;
					a = $(b.tableId).find("tbody tr[data-type\x3d'unit'][data-uuid\x3d'" + a + "']");
					a.removeAttr("data-action").removeClass("checked");
					a.find("input[name\x3d'" + b.checkboxName + "']").prop("checked", !1)
				}
			},
			setCheckedAll: function() {
				$(c.jpage.settings.tableId).find("tbody tr[data-type\x3d'unit']").each(function() {
					c.setCheckedId($(this).attr("data-uuid"))
				})
			},
			setCheckedNoneAll: function() {
				$(c.jpage.settings.tableId).find("tbody tr[data-type\x3d'unit']").each(function() {
					c.setCheckedNoneId($(this).attr("data-uuid"))
				})
			},
			getTableCheckedData: function() {
				var a = [];
				$(c.jpage.settings.tableId).find("tbody tr[data-type\x3d'unit'][data-action\x3d'checked']").each(function(b, d) {
					var e = $(d).attr("data-uuid");
					(e = c.getTableDataId(e)) && a.push(e)
				});
				return a
			},
			remove: function(a) {
				var b = c.jpage.settings;
				if("array" !== c.getTypeof(a))
					for(var d in a) $(b.tableId).find("tr[data-uuid\x3d'" + a[d] + "']").remove();
				else $(b.tableId).find("tr[data-uuid\x3d'" + a + "']").remove()
			},
			setTbodyHtml: function(a) {
				$(c.jpage.settings.tableId).find("tbody").html(a)
			},
			setPageSizeCount: function() {},
			getTbaleDataAll: function() {
				return c.jpage.data
			},
			setTbaleData: function(a) {
				return c.jpage.data = a
			},
			getTableDataId: function(a) {
				if(void 0 !== a) {
					var b = c.jpage.data,
						d = c.jpage.settings,
						e;
					for(e in b) {
						var f = b[e];
						if(f[d.uuid].toString() === a.toString()) return f
					}
				}
			},
			onLoadSuccess: function() {},
			deleteTableId: function(a) {
				if(void 0 !== a) {
					var b = c.jpage.settings,
						d = c.getTbaleDataAll(),
						e;
					for(e in d)
						if(d[e][b.uuid].toString() == a.toString()) return d.splice(a, 1), d
				}
			},
			sortBy: function(a, b, c) {
				b = b ? -1 : 1;
				return function(d, f) {
					d = d[a];
					f = f[a];
					"undefined" != typeof c && (d = c(d), f = c(f));
					return d < f ? -1 * b : d > f ? 1 * b : 1
				}
			},
			sortCreateTbody: function(a) {
				var b = c.jpage.settings;
				try {
					c.jpage.data.sort(c.sortBy(a, !0, String))
				} catch(d) {}
				c.getTbaleDataAll();
				$(b.tableId).find("tbody").html(c.createTableTbody(c.jpage.data));
				c.bindTheadChecked()
			}
		};
		return c
	}
});