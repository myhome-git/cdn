$.fn.pagination&&($.fn.pagination.defaults.beforePageText="\u7b2c",$.fn.pagination.defaults.afterPageText="\u5171{pages}\u9801",$.fn.pagination.defaults.displayMsg="\u986f\u793a{from}\u5230{to},\u5171{total}\u8a18\u9304");$.fn.datagrid&&($.fn.datagrid.defaults.loadMsg="\u6b63\u5728\u8655\u7406\uff0c\u8acb\u7a0d\u5f85\u3002\u3002\u3002");$.fn.treegrid&&$.fn.datagrid&&($.fn.treegrid.defaults.loadMsg=$.fn.datagrid.defaults.loadMsg);$.messager&&($.messager.defaults.ok="\u78ba\u5b9a",$.messager.defaults.cancel="\u53d6\u6d88");$.map("validatebox textbox passwordbox filebox searchbox combo combobox combogrid combotree datebox datetimebox numberbox spinner numberspinner timespinner datetimespinner".split(" "),function(a){$.fn[a]&&($.fn[a].defaults.missingMessage="\u8a72\u8f38\u5165\u9805\u70ba\u5fc5\u8f38\u9805")});$.fn.validatebox&&($.fn.validatebox.defaults.rules.email.message="\u8acb\u8f38\u5165\u6709\u6548\u7684\u96fb\u5b50\u90f5\u4ef6\u5730\u5740",$.fn.validatebox.defaults.rules.url.message="\u8acb\u8f38\u5165\u6709\u6548\u7684URL\u5730\u5740",$.fn.validatebox.defaults.rules.length.message="\u8f38\u5165\u5167\u5bb9\u9577\u5ea6\u5fc5\u9808\u4ecb\u65bc{0}\u548c{1}\u4e4b\u9593",$.fn.validatebox.defaults.rules.remote.message="\u8acb\u4fee\u6b63\u6b64\u6b04\u4f4d");$.fn.calendar&&($.fn.calendar.defaults.weeks="\u65e5\u4e00\u4e8c\u4e09\u56db\u4e94\u516d".split(""),$.fn.calendar.defaults.months="\u4e00\u6708 \u4e8c\u6708 \u4e09\u6708 \u56db\u6708 \u4e94\u6708 \u516d\u6708 \u4e03\u6708 \u516b\u6708 \u4e5d\u6708 \u5341\u6708 \u5341\u4e00\u6708 \u5341\u4e8c\u6708".split(" "));$.fn.datebox&&($.fn.datebox.defaults.currentText="\u4eca\u5929",$.fn.datebox.defaults.closeText="\u95dc\u9589",$.fn.datebox.defaults.okText="\u78ba\u5b9a");$.fn.datetimebox&&$.fn.datebox&&$.extend($.fn.datetimebox.defaults,{currentText:$.fn.datebox.defaults.currentText,closeText:$.fn.datebox.defaults.closeText,okText:$.fn.datebox.defaults.okText});$.fn.datetimespinner&&($.fn.datetimespinner.defaults.selections=[[0,4],[5,7],[8,10],[11,13],[14,16],[17,19]]);