dojo.require("dijit.TitlePane");
dojo.require("dijit.layout.BorderContainer");
dojo.require("dijit.layout.TabContainer");
dojo.require("dijit.layout.ContentPane");

dojo.require("dijit.Menu");
dojo.require("dijit.MenuItem");
dojo.require("dijit.MenuBar");
dojo.require("dijit.MenuBarItem");
dojo.require("dijit.PopupMenuBarItem");

dojo.require("dijit.form.Button");
dojo.require("dijit.form.TextBox");
dojo.require("dijit.form.SimpleTextarea");

dojo.require("dojo.dom");
dojo.require("dojo.json");
dojo.require("dojo.store.Memory");
dojo.require("dijit.tree.ObjectStoreModel");
dojo.require("dijit.Tree");
dojo.require("dojo.store.Observable");

var admin;

dojo.ready(function() {
	admin = new HAFlow.Admin(new HAFlow.UI());
	admin.init();
});

HAFlow.Admin = function(ui) {
	this.basePath = dojo.byId("basePath").value;
	this.ui = ui;
};

HAFlow.Admin.prototype.init = function() {
	this.initUserInterface();
	this.createAddModuleUserInterface();
	this.loadModuleListData();
};

HAFlow.Admin.prototype.createAddModuleUserInterface = function() {
	var text = "";
	text += "<div>";
	text += "<div>";
	text += "<span>Name:</span>";
	text += "<div id=\"add_module_name_container\"></div>";
	text += "</div>";
	text += "<div>";
	text += "<div>Configurations: (displayName,key)</div>";
	text += "<div id=\"add_module_configuration_container\"></div>";
	text += "</div>";
	text += "<div id=\"add_module_button\"></div>";
	text += "</div>";
	$("#" + this.addModuleContainerId).html(text);
	var _currentInstance = this;
	if (dijit.byId("add_module_name") != null) {
		dijit.registry.remove("add_module_name");
	}
	var moduleNameTextBox = new dijit.form.TextBox({
		id : "add_module_name",
	});
	moduleNameTextBox.placeAt(dojo.byId("add_module_name_container"));
	moduleNameTextBox.startup();

	if (dijit.byId("add_module_configuration") != null) {
		dijit.registry.remove("add_module_configuration");
	}
	var textarea = new dijit.form.SimpleTextarea({
		id : "add_module_configuration",
		rows : 5,
		cols : 50
	});
	textarea.placeAt(dojo.byId("add_module_configuration_container"));
	textarea.startup();

	var button = new dijit.form.Button({
		label : "Add Module",
		onClick : function() {
			var module = {
				name : $("#add_module_name").val(),
				configurations : _currentInstance.extractConfiguration($(
						"#add_module_configuration").val())
			};
			_currentInstance.addModule(_currentInstance, module);
		}
	});
	button.placeAt(dojo.byId("add_module_button"));
	button.startup();
};

HAFlow.Admin.prototype.extractConfiguration = function(source) {
	var splited = source.split("\n");
	var regex = (/\((.*),(.*)\)/);
	var i;
	var result = [];
	for (i = 0; i < splited.length; i++) {
		var r = regex.exec(splited[i]);
		result.push({
			id : HAFlow.generateUUID(),
			displayName : r[1],
			key : r[2]
		});
	}
	return result;
};

HAFlow.Admin.prototype.loadModuleListData = function() {
	var _currentInstance = this;
	$.ajax({
		url : _currentInstance.basePath + "module",
		type : "GET",
		dataType : "json",
		success : function(data, status) {
			_currentInstance.moduleList = data;
			_currentInstance.generateModuleList(_currentInstance);
		},
		error : function(request, status, error) {
			HAFlow.showDialog("Error",
					"An error occurred while loading module list: " + error);
		}
	});
};

HAFlow.Admin.prototype.generateModuleList = function(instance) {
	var text = "";
	text += "<div>";
	var i, j;
	for (i = 0; i < this.moduleList.modules.length; i++) {
		text += "<div>";
		text += "<div><span>Id: " + this.moduleList.modules[i].id
				+ "</span></div>";
		text += "<div><span>Name: " + this.moduleList.modules[i].name
				+ "</span></div>";
		text += "<div>Configurations:</div>";
		for (j = 0; j < this.moduleList.modules[i].configurations.length; j++) {
			text += "<div>";
			text += "<div>-->Id: "
					+ this.moduleList.modules[i].configurations[j].id
					+ "</div>";
			text += "<div>-->Key: "
					+ this.moduleList.modules[i].configurations[j].key
					+ "</div>";
			text += "<div>-->Display Name: "
					+ this.moduleList.modules[i].configurations[j].displayName
					+ "</div>";
			text += "</div>";
			text += "<p/>";
		}
		text += "<div id=\"remove_module_" + this.moduleList.modules[i].id
				+ "\"></div>";
		text += "<p/>";
		text += "</div>";
	}
	text += "</div>";
	$("#" + this.moduleListContainerId).html(text);
	for (i = 0; i < this.moduleList.modules.length; i++) {
		var _currentInstance = this;
		var button = new dijit.form.Button({
			label : "Remove Module",
			moduleId : this.moduleList.modules[i].id,
			onClick : function() {
				var moduleId = $(this).attr("moduleId");
				_currentInstance.removeModule(_currentInstance, moduleId);
			}
		});
		button.placeAt(dojo.byId("remove_module_"
				+ this.moduleList.modules[i].id));
		button.startup();
	}
};

HAFlow.Admin.prototype.removeModule = function(instance, moduleId) {
	$.ajax({
		url : instance.basePath + "module/" + moduleId,
		type : "DELETE",
		contentType : "application/json",
		data : JSON.stringify({}),
		dataType : "json",
		success : function(data, status) {
			if (data.success) {
				HAFlow.showDialog("Remove Module", "Module removed.");
			} else {
				HAFlow.showDialog("Remove Module",
						"An error occurred while removing module.");
			}
			instance.loadModuleListData();
		},
		error : function(request, status, error) {
			HAFlow.showDialog("Error",
					"An error occurred while removing module: " + error);
		}
	});
};

HAFlow.Admin.prototype.addModule = function(instance, module) {
	$.ajax({
		url : instance.basePath + "module",
		type : "POST",
		contentType : "application/json",
		data : JSON.stringify(module),
		dataType : "json",
		success : function(data, status) {
			if (data.success) {
				HAFlow.showDialog("Add Module", "Module added.");
			} else {
				HAFlow.showDialog("Add Module",
						"An error occurred while adding module.");
			}
			instance.loadModuleListData();
		},
		error : function(request, status, error) {
			HAFlow.showDialog("Error",
					"An error occurred while adding module: " + error);
		}
	});
};

HAFlow.Admin.prototype.initUserInterface = function() {
	this.ui.init();
	this.initUserInterfaceId();
	this.initMainMenu();
	this.initModuleListContainer();
	this.initAddModuleContainer();
	this.ui.refresh();
};

HAFlow.Admin.prototype.initUserInterfaceId = function() {
	this.moduleListContainerId = "moduleListContainer";
	this.addModuleContainerId = "addModuleContainer";
};

HAFlow.Admin.prototype.initMainMenu = function() {
	this.menu = {};
	this.initModuleMenu();
};

HAFlow.Admin.prototype.initModuleMenu = function() {
	this.menu.moduleMenu = new dijit.Menu({
		id : "moduleMenu"
	});
	this.menu.moduleMenu.newModuleMenuItem = new dijit.MenuItem({
		id : "newModuleMenuItem",
		label : "New Module",
	});
	this.menu.moduleMenu.modifyModuleMenuItem = new dijit.MenuItem({
		id : "modifyModuleMenuItem",
		label : "Modify Module"
	});
	this.menu.moduleMenu.removeModuleMenuItem = new dijit.MenuItem({
		id : "removeModuleMenuItem",
		label : "Remove Module"
	});
	this.menu.moduleMenu.addChild(this.menu.moduleMenu.newModuleMenuItem);
	this.menu.moduleMenu.addChild(this.menu.moduleMenu.modifyModuleMenuItem);
	this.menu.moduleMenu.addChild(this.menu.moduleMenu.removeModuleMenuItem);
	this.menu.moduleMenu.startup();
	this.ui.mainMenu.addChild(new dijit.PopupMenuBarItem({
		id : "modulePopupMenuBarItem",
		label : "Module",
		popup : this.menu.moduleMenu
	}));
};

HAFlow.Admin.prototype.initModuleListContainer = function() {
	var moduleListContentPane = (new dijit.layout.ContentPane({
		id : this.moduleListContainerId,
		title : "Module List"
	}));
	this.ui.centerContainer.addChild(moduleListContentPane);
};

HAFlow.Admin.prototype.initAddModuleContainer = function() {
	var addModuleContentPane = (new dijit.layout.ContentPane({
		id : this.addModuleContainerId,
		title : "Add Module"
	}));
	this.ui.centerContainer.addChild(addModuleContentPane);
};
