dojo.require("dojo.dom");
dojo.require("dojo.aspect");
dojo.require("dojo.on");
dojo.require("dojo.json");
dojo.require("dojo.parser");
dojo.require("dojo.mouse");
dojo.require("dojo.store.Memory");
dojo.require("dojo.store.Observable");
dojo.require("dojo.io.iframe");
dojo.require("dijit.form.Button");
dojo.require("dijit.form.CheckBox");
dojo.require("dijit.form.TextBox");
dojo.require("dijit.layout.BorderContainer");
dojo.require("dijit.layout.TabContainer");
dojo.require("dijit.layout.ContentPane");
dojo.require("dijit.tree.ObjectStoreModel");
dojo.require("dijit.Menu");
dojo.require("dijit.MenuItem");
dojo.require("dijit.MenuBar");
dojo.require("dijit.MenuBarItem");
dojo.require("dijit.PopupMenuBarItem");
dojo.require("dijit.TitlePane");
dojo.require("dijit.Toolbar");
dojo.require("dijit.Tree");
dojo.require("dijit.tree.dndSource");
dojo.require("dijit.registry");
dojo.require("dijit.form.Form");
dojo.require("dojo._base.lang");
dojo.require("dojox.grid.EnhancedGrid");
dojo.require("dojo.data.ItemFileWriteStore");
dojo.require("dojox.grid.cells.dijit");
dojo.require("dojox.layout.ContentPane");

HAFlow.Main.prototype.openoozie = function() {
	var _currentInstance = this;
	if (dijit.byId("oozie") != null) {
		_currentInstance.ui.centerContainer.selectChild(dijit.byId("oozie"));
		return;
	}

	$.ajax({
		url : _currentInstance.basePath + "oozie/",
		type : "Post",
		success : function(data, status) {
			var contentPane = new dijit.layout.ContentPane({
				id : "oozie",
				title : "Oozie",
				content : data,
				closable : true,
				onClose : function() {
					dijit.registry.remove("oozie");
					return true;
				}
			});
			_currentInstance.ui.centerContainer.addChild(contentPane);
			_currentInstance.ui.centerContainer.selectChild(contentPane);
		},
		error : function(request, status, error) {
			HAFlow.showDialog("Error", "An error occurred while opening oozie: "
					+ error);
		}
	});
};

HAFlow.Main.prototype.openhive = function() {
	var _currentInstance = this;
	if (dijit.byId("hive") != null) {
		_currentInstance.ui.oozieHiveContainer.selectChild(dijit.byId("hive"));
		return;
	}
	$.ajax({
		url : _currentInstance.basePath + "hive/",
		type : "Post",
		success : function(data, status) {
			var contentPane = new dijit.layout.ContentPane({
				id : "hive",
				title : "Hive",
				content : data,
				closable : true,
				onClose : function() {
					dijit.registry.remove("hive");
					return true;
				}
			});
			_currentInstance.ui.centerContainer.addChild(contentPane);
			_currentInstance.ui.centerContainer.selectChild(contentPane);
		},
		error : function(request, status, error) {
			HAFlow.showDialog("Error", "An error occurred while opening hive: "
					+ error);
		}
	});
};