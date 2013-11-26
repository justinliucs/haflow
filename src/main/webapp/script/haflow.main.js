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

var flow;
var watchHandle;

dojo.ready(function() {
	flow = new HAFlow.Main(new HAFlow.UI());
	flow.init();
});

HAFlow.Main = function(ui) {
	this.basePath = dojo.byId("basePath").value;
	this.ui = ui;
	this.rootPath = "hdfs://133.133.2.150:9000/user/root/" + username;
	this.hdfspath = null;
};

// Initialize
HAFlow.Main.prototype.init = function() {
	this.flows = {};
	this.jsPlumb = {};
	this.initUserInterface();
	this.initData();
};

HAFlow.Main.prototype.initUserInterface = function() {
	this.ui.init();
	this.initUserInterfaceId();
	this.initMainMenu();
	this.initToolbar();
	this.initBottomTabs();
	this.initFlowList();
	this.initFlowContainer();
	this.initHdfsFileList();
	this.ui.refresh();
};

HAFlow.Main.prototype.initUserInterfaceId = function() {
	this.flowListContainerId = "flowListTreeContainer";
	this.flowListTreeId = "flowListTree";
	this.hdfsFileListContainerId = "hdfsFileListContainer";
	this.hdfsFileListTreeId = "hdfsFileListTree";
	this.moduleListContainerId = "moduleListContainer";
	this.flowContainerId = "flowContainer";
	this.informationContainerId = "informationContainer";
	this.consoleContainerId = "consoleContainer";
	this.logContainerId = "logContainer";
	this.configurationContainerId = "configurationContainer";
};

HAFlow.Main.prototype.initMainMenu = function() {
	this.menu = {};
	this.initFlowMenu();
};

HAFlow.Main.prototype.initFlowMenu = function() {
	this.menu.flowMenu = new dijit.Menu({
		id : "flowMenu"
	});
	this.menu.flowMenu.newFlowMenuItem = new dijit.MenuItem({
		id : "newFlowMenuItem",
		label : "New",
	});
	this.menu.flowMenu.openFlowMenuItem = new dijit.MenuItem({
		id : "openFlowMenuItem",
		label : "Open",
		disabled : true
	});
	this.menu.flowMenu.closeFlowMenuItem = new dijit.MenuItem({
		id : "closeFlowMenuItem",
		label : "Close",
		disabled : true
	});
	this.menu.flowMenu.deleteFlowMenuItem = new dijit.MenuItem({
		id : "deleteFlowMenuItem",
		label : "Delete"
	});
	this.menu.flowMenu.exportFlowMenuItem = new dijit.MenuItem({
		id : "exportFlowMenuItem",
		label : "Export",
		disabled : true
	});
	this.menu.flowMenu.importFlowMenuItem = new dijit.MenuItem({
		id : "importFlowMenuItem",
		label : "Import",
		disabled : true
	});
	this.menu.flowMenu.addChild(this.menu.flowMenu.newFlowMenuItem);
	this.menu.flowMenu.addChild(this.menu.flowMenu.openFlowMenuItem);
	this.menu.flowMenu.addChild(this.menu.flowMenu.closeFlowMenuItem);
	this.menu.flowMenu.addChild(this.menu.flowMenu.deleteFlowMenuItem);
	this.menu.flowMenu.addChild(this.menu.flowMenu.exportFlowMenuItem);
	this.menu.flowMenu.addChild(this.menu.flowMenu.importFlowMenuItem);
	this.menu.flowMenu.startup();

	this.menu.runMenu = new dijit.Menu({
		id : "runMenu"
	});
	this.menu.runMenu.runMenuItem = new dijit.MenuItem({
		id : "runMenuItem",
		label : "Run",
	});
	this.menu.runMenu.debugMenuItem = new dijit.MenuItem({
		id : "debugMenuItem",
		label : "Debug",
		disabled : true
	});
	this.menu.runMenu.validateMenuItem = new dijit.MenuItem({
		id : "validateMenuItem",
		label : "Validate",
		disabled : true
	});
	this.menu.runMenu.runHistoryMenuItem = new dijit.MenuItem({
		id : "runHistoryMenuItem",
		label : "Run History",
		disabled : false
	});
	this.menu.runMenu.debugHistoryMenuItem = new dijit.MenuItem({
		id : "debugHistoryMenuItem",
		label : "Debug History",
		disabled : true
	});
	this.menu.runMenu.addChild(this.menu.runMenu.runMenuItem);
	this.menu.runMenu.addChild(this.menu.runMenu.debugMenuItem);
	this.menu.runMenu.addChild(this.menu.runMenu.validateMenuItem);
	this.menu.runMenu.addChild(this.menu.runMenu.runHistoryMenuItem);
	this.menu.runMenu.addChild(this.menu.runMenu.debugHistoryMenuItem);
	this.menu.runMenu.startup();

	this.menu.searchMenu = new dijit.Menu({
		id : "searchMenu"
	});
	this.menu.searchMenu.searchFlowMenuItem = new dijit.MenuItem({
		id : "searchFlowMenuItem",
		label : "Search Flow",
		disabled : true
	});
	this.menu.searchMenu.searchModuleMenuItem = new dijit.MenuItem({
		id : "searchModuleMenuItem",
		label : "Search Module",
		disabled : true
	});
	this.menu.searchMenu.searchLogMenuItem = new dijit.MenuItem({
		id : "searchLogMenuItem",
		label : "Search Log",
		disabled : true
	});
	this.menu.searchMenu.addChild(this.menu.searchMenu.searchFlowMenuItem);
	this.menu.searchMenu.addChild(this.menu.searchMenu.searchModuleMenuItem);
	this.menu.searchMenu.addChild(this.menu.searchMenu.searchLogMenuItem);
	this.menu.searchMenu.startup();

	this.menu.windowMenu = new dijit.Menu({
		id : "windowMenu"
	});
	this.menu.windowMenu.hideToolbarMenuItem = new dijit.MenuItem({
		id : "hideToolbarMenuItem",
		label : "Hide Toolbar",
		disabled : true
	});
	this.menu.windowMenu.addChild(this.menu.windowMenu.hideToolbarMenuItem);
	this.menu.windowMenu.startup();

	this.menu.helpMenu = new dijit.Menu({
		id : "helpMenu"
	});
	this.menu.helpMenu.aboutMenuItem = new dijit.MenuItem({
		id : "aboutMenuItem",
		label : "About",
		disabled : true
	});
	this.menu.helpMenu.manualMenuItem = new dijit.MenuItem({
		id : "manualMenuItem",
		label : "Manual",
		disabled : true
	});
	this.menu.helpMenu.addChild(this.menu.helpMenu.aboutMenuItem);
	this.menu.helpMenu.addChild(this.menu.helpMenu.manualMenuItem);
	this.menu.helpMenu.startup();

	this.menu.oozieMenu = new dijit.Menu({
		id : "oozieMenu",
		label : "Oozie",
	});

	this.menu.oozieMenu.openoozieMenuItem = new dijit.MenuItem({
		id : "openoozieMenuItem",
		label : "Open"
	});
	this.menu.oozieMenu.closeoozieMenuItem = new dijit.MenuItem({
		id : "closeoozieMenuItem",
		label : "Close",
		disabled : true
	});
	this.menu.oozieMenu.addChild(this.menu.oozieMenu.openoozieMenuItem);
	this.menu.oozieMenu.addChild(this.menu.oozieMenu.closeoozieMenuItem);
	this.menu.oozieMenu.startup();

	this.menu.hiveMenu = new dijit.Menu({
		id : "hiveMenu",
		label : "Hive",
	});

	this.menu.hiveMenu.openhiveMenuItem = new dijit.MenuItem({
		id : "openhiveMenuItem",
		label : "Open"
	});
	this.menu.hiveMenu.closehiveMenuItem = new dijit.MenuItem({
		id : "closehiveMenuItem",
		label : "Close",
		disabled : true
	});
	this.menu.hiveMenu.addChild(this.menu.hiveMenu.openhiveMenuItem);
	this.menu.hiveMenu.addChild(this.menu.hiveMenu.closehiveMenuItem);
	this.menu.hiveMenu.startup();

	this.ui.mainMenu.addChild(new dijit.PopupMenuBarItem({
		id : "flowPopupMenuBarItem",
		label : "Flow",
		popup : this.menu.flowMenu
	}));
	this.ui.mainMenu.addChild(new dijit.PopupMenuBarItem({
		id : "runPopupMenuBarItem",
		label : "Run",
		popup : this.menu.runMenu
	}));
	this.ui.mainMenu.addChild(new dijit.PopupMenuBarItem({
		id : "searchPopupMenuBarItem",
		label : "Search",
		popup : this.menu.searchMenu
	}));
	this.ui.mainMenu.addChild(new dijit.PopupMenuBarItem({
		id : "windowPopupMenuBarItem",
		label : "Window",
		popup : this.menu.windowMenu
	}));
	this.ui.mainMenu.addChild(new dijit.PopupMenuBarItem({
		id : "helpPopupMenuBarItem",
		label : "Help",
		popup : this.menu.helpMenu
	}));
	this.ui.mainMenu.addChild(new dijit.PopupMenuBarItem({
		id : "ooziePopupMenuBarItem",
		label : "Oozie",
		popup : this.menu.oozieMenu
	}));
	this.ui.mainMenu.addChild(new dijit.PopupMenuBarItem({
		id : "hivePopupMenuBarItem",
		label : "Hive",
		popup : this.menu.hiveMenu
	}));
	// userInformation
	this.ui.mainMenu.addChild(new dijit.layout.ContentPane({
		id : "tipContentPane",
		title : "tip",
		content : "<div style='margin-bottom:0px; padding-top:4px; font-family:Times, serif;'>|&nbsp<a href=quit style='text-decoration: none;'><font size=2px>quit</font></a>&nbsp&nbsp</div>",
		style : "float:right;"
	}));

	this.menu.userMenu = new dijit.Menu({
		id : "userMenu"
	});
	this.menu.userMenu.userInforMenuItem = new dijit.MenuItem({
		id : "userInforMenuItem",
		label : "user information"
	});
	this.menu.userMenu.addChild(this.menu.userMenu.userInforMenuItem);
	this.menu.userMenu.startup();

	this.ui.mainMenu.addChild(new dijit.PopupMenuBarItem({
		id : "usernameContentPane",
		label : "<font size=2px style='font-family:Times, serif;'>" + username + "</font>",
		style : "float:right;padding-top:4px;",
		popup : this.menu.userMenu
	}));

	var _currentInstance = this;

	// new dialog
	var user = null;
	var text = "";
	text += "<div >";
	text += "<div ><span style=\"float: left; width: 80px;\"><strong>Name:</strong></span>";
	text += "<span id=\"user_name_text_box\" ></span></div>";

	text += "<div ><span style=\"float: left; width: 80px;\"><strong>Space:</strong></span>";
	text += "<span id=\"user_space_text_box\"></span></div>";
	text += "<div class=\"field\"><span style=\"float: left; width: 80px;\"><strong>UsedSpace:</strong></span>";
	text += "<span id=\"user_used_text_box\"></span></div>";
	text += "<div class=\"field\"><span style=\"float: left; width: 80px;\"><strong>RealName:</strong></span>";
	text += "<span id=\"user_real_text_box\"></span></div>";
	text += "<div class=\"field\"><span style=\"float: left; width: 80px;\"><strong>Email:</strong></span>";
	text += "<span id=\"user_email_text_box\"></span></div>";
	text += "<div><span id=\"edit_user_button\" ></span>";
	text += "<span id=\"save_user_button\" ></span></div>";
	text += "</div>";
	userForm = new dijit.form.Form({
		innerHTML : text
	});
	userForm.startup();
	userDialog = new dijit.Dialog({
		title : "User Infomation",
		style : "width: 400px"
	});
	userDialog.addChild(userForm);
	var userRealTextBox = new dijit.form.TextBox({
		id : "userRealTextBox",
		style : "width:200px;"
	});

	var userEmailTextBox = new dijit.form.TextBox({
		id : "userEmailTextBox",
		style : "width:200px;"
	});

	var button1 = new dijit.form.Button({
		label : "edit",
		onClick : function() {
			dojo.byId("user_real_text_box").innerHTML = '';
			dojo.byId("user_email_text_box").innerHTML = '';
			userRealTextBox.placeAt(dojo.byId("user_real_text_box"));
			userRealTextBox.startup();
			userEmailTextBox.placeAt(dojo.byId("user_email_text_box"));
			userEmailTextBox.startup();

		}
	});
	button1.placeAt(dojo.byId("edit_user_button"));
	button1.startup();

	var button = new dijit.form.Button({
		label : "Save",
		onClick : function() {
			user.realname = userRealTextBox.get("value");
			user.email = userEmailTextBox.get("value");
			saveUser(user, userid);
		}
	});
	button.placeAt(dojo.byId("save_user_button"));
	button.startup();
	saveUser = function(user, userid) {
		$.ajax({
			url : _currentInstance.basePath + "user/update/" + userid,
			type : "Post",
			dataType : "json",
			contentType : "application/json",
			data : JSON.stringify(user),
			success : function(data, status) {
				userDialog.hide();
				HAFlow.showDialog("Success",
						"Successfully update user information! ");

			},
			error : function(request, status, error) {
				userDialog.hide();
				HAFlow.showDialog("Error",
						"An error occurred while updating user information: "
								+ error);
			}
		});
	};
	dojo.connect(dijit.byId("userInforMenuItem"), "onClick", function() {
		$.ajax({
			url : _currentInstance.basePath + "user/get/" + userid,
			type : "GET",
			cache : false,
			dataType : "json",
			success : function(data, status) {
				user = data;
				dojo.byId("user_name_text_box").innerHTML = data.name;
				userRealTextBox.set("value", data.realname);
				userEmailTextBox.set("value", data.email);
				if(data.realname==null) tmp="blank";
				else tmp=data.realname;
				dojo.byId("user_real_text_box").innerHTML=tmp;
				dojo.byId("user_email_text_box").innerHTML=data.email;
				dojo.byId("user_space_text_box").innerHTML=data.space;
				dojo.byId("user_used_text_box").innerHTML=data.usedspace;
				userDialog.show();

			},
			error : function(request, status, error) {
				HAFlow.showDialog("Error",
						"An error occurred while loading user information: "
								+ error);
			}
		});
	});

	dojo.connect(this.menu.flowMenu.newFlowMenuItem, "onClick",
			function(event) {
				_currentInstance.newFlow();
			});
	dojo.connect(this.menu.flowMenu.deleteFlowMenuItem, "onClick", function(
			event) {
		_currentInstance.removeFlow(_currentInstance.currentFlowId);
	});
	dojo.connect(this.menu.runMenu.runMenuItem, "onClick", function(event) {
		_currentInstance.runFlow(_currentInstance.currentFlowId);
	});
	dojo.connect(this.menu.oozieMenu.openoozieMenuItem, "onClick", function(
			event) {
		_currentInstance.openoozie();
	});
	dojo.connect(this.menu.hiveMenu.openhiveMenuItem, "onClick",
			function(event) {
				_currentInstance.openhive();
			});
	dojo.connect(this.menu.runMenu.runHistoryMenuItem, "onClick", function(
			event) {
		_currentInstance.showRunHistory(_currentInstance.currentFlowId);
	});
};

// initToolbar --> haflow.toolbar.js

HAFlow.Main.prototype.initBottomTabs = function() {
	this.initInformationTab();
	this.initConfigurationTab();
//	this.initConsoleTab();
//	this.initLogTab();
};

HAFlow.Main.prototype.initInformationTab = function() {
	var informationContentPane = (new dijit.layout.ContentPane({
		id : this.informationContainerId,
		title : "Information"
	}));
	this.ui.bottomContainer.addChild(informationContentPane);
};

//HAFlow.Main.prototype.initConsoleTab = function() {
//	var consoleContentPane = new dijit.layout.ContentPane({
//		id : this.consoleContainerId,
//		title : "Console"
//	});
//	this.ui.bottomContainer.addChild(consoleContentPane);
//};

//HAFlow.Main.prototype.initLogTab = function() {
//	var logContentPane = new dijit.layout.ContentPane({
//		id : this.logContainerId,
//		title : "Log"
//	});
//	this.ui.bottomContainer.addChild(logContentPane);
//};

HAFlow.Main.prototype.initConfigurationTab = function() {
	var configurationContentPane = new dijit.layout.ContentPane({
		id : this.configurationContainerId,
		title : "Configuration"
	});
	this.ui.bottomContainer.addChild(configurationContentPane);
};

// initFlowList --> haflow.flow_list.js

HAFlow.Main.prototype.initFlowContainer = function() {
	var _currentInstance = this;
	watchHandle=this.ui.centerContainer.watch("selectedChildWidget", function(name, from,
			to) {
		var flowId = to.domNode.id.replace("flowContainerPane_", "");
		var hdfsreg = new RegExp("^hdfs://");
		if(hdfsreg.test(flowId)){
			_currentInstance.toolbar.removeFlowButton.set("disabled","disabled");
			_currentInstance.ui.centerRightContainer.removeChild(_currentInstance.ui.trailingContainer);
		}else if( flowId == "oozie" || flowId == "hive"){
			_currentInstance.ui.centerRightContainer.removeChild(_currentInstance.ui.trailingContainer);
		}else{
			_currentInstance.ui.centerRightContainer.addChild(_currentInstance.ui.trailingContainer);
			_currentInstance.toolbar.removeFlowButton.set("disabled", false);
			_currentInstance.currentFlowId = flowId;
			_currentInstance.setupDroppable(flowId);
			_currentInstance.paintFlow(flowId);
		}

	});
};

// initHdfsFileList --> halow.hdfs.js

// end initUserInterface

HAFlow.Main.prototype.initData = function() {
	this.initFlowListData();
};

HAFlow.Main.prototype.initFlowListData = function() {
	var _currentInstance = this;
	$.ajax({
		url : this.basePath + "flow",
		type : "GET",
		cache : false,
		dataType : "json",
		success : function(data, status) {
			_currentInstance.flowList = data;
			_currentInstance.initModuleListData();
		},
		error : function(request, status, error) {
			HAFlow.showDialog("Error",
					"An error occurred while loading flow list: " + error);
		}
	});
};

HAFlow.Main.prototype.initModuleListData = function() {
	var _currentInstance = this;
	$.ajax({

		url : _currentInstance.basePath + "module",
		type : "GET",
		cache : false,
		dataType : "json",
		success : function(data, status) {
			_currentInstance.moduleList = data;
			_currentInstance.drawLists(_currentInstance);
		},
		error : function(request, status, error) {
			HAFlow.showDialog("Error",
					"An error occurred while loading module list: " + error);
		}
	});
};

HAFlow.Main.prototype.drawLists = function(instance) {
	instance.paintModuleList();
	instance.buildFlowListTree();
};

HAFlow.Main.prototype.paintModuleList = function() {
	var i;
	for (i = 0; i < this.moduleList.modules.length; i++) {
		if (dijit.byId(this.moduleListContainerId + "_"
				+ this.moduleList.modules[i].category) == null) {
			var moduleListPane = new dijit.layout.ContentPane({
				id : this.moduleListContainerId + "_"
						+ this.moduleList.modules[i].category,
				title : this.moduleList.modules[i].category
			});
			this.ui.trailingContainer.addChild(moduleListPane);
		}
		text = "<div class=\"module\" id=\"module_"
				+ this.moduleList.modules[i].id + "\"><div>"
				+ this.moduleList.modules[i].name + "</div></div>";
		$(
				"#" + this.moduleListContainerId + "_"
						+ this.moduleList.modules[i].category).append(text);
	}
	this.ui.refresh();

};

HAFlow.Main.prototype.buildFlowListTree = function() {
	var i;
	for (i = 0; i < this.flowList.flows.length; i++) {
		this.flowListStore.put({
			id : this.flowList.flows[i].id,
			name : this.flowList.flows[i].name,
			node : true
		});
	}
};

//end initData
