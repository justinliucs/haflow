// public 
HAFlow.Main.prototype.initFlowMenu = function() {
	this.menu.flowMenu = new dijit.Menu({
		id : "flowMenu"
	});
	this.menu.flowMenu.newFlowMenuItem = new dijit.MenuItem({
		id : "newFlowMenuItem",
		label : "New",
	});
	this.menu.flowMenu.saveFlowMenuItem = new dijit.MenuItem({
		id : "saveFlowMenuItem",
		label : "Save",
		disabled : true
	});
//	this.menu.flowMenu.openFlowMenuItem = new dijit.MenuItem({
//		id : "openFlowMenuItem",
//		label : "Open",
//		disabled : true
//	});
//	this.menu.flowMenu.closeFlowMenuItem = new dijit.MenuItem({
//		id : "closeFlowMenuItem",
//		label : "Close",
//		disabled : true
//	});
	this.menu.flowMenu.deleteFlowMenuItem = new dijit.MenuItem({
		id : "deleteFlowMenuItem",
		label : "Delete",
		disabled : true
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
	this.menu.flowMenu.addChild(this.menu.flowMenu.saveFlowMenuItem);
//	this.menu.flowMenu.addChild(this.menu.flowMenu.openFlowMenuItem);
//	this.menu.flowMenu.addChild(this.menu.flowMenu.closeFlowMenuItem);
	this.menu.flowMenu.addChild(this.menu.flowMenu.deleteFlowMenuItem);
	this.menu.flowMenu.addChild(this.menu.flowMenu.exportFlowMenuItem);
	this.menu.flowMenu.addChild(this.menu.flowMenu.importFlowMenuItem);
	this.menu.flowMenu.startup();

	this.menu.runMenu = new dijit.Menu({
		id : "runMenu"
	});
	this.menu.runMenu.runFlowMenuItem = new dijit.MenuItem({
		id : "runFlowMenuItem",
		label : "Run",
		disabled : true
	});
	this.menu.runMenu.debugFlowMenuItem = new dijit.MenuItem({
		id : "debugFlowMenuItem",
		label : "Debug",
		disabled : true
	});
	this.menu.runMenu.validateFlowMenuItem = new dijit.MenuItem({
		id : "validateFlowMenuItem",
		label : "Validate",
		disabled : true
	});
	this.menu.runMenu.runFlowHistoryMenuItem = new dijit.MenuItem({
		id : "runFlowHistoryMenuItem",
		label : "Run History",
		disabled : true
	});
	this.menu.runMenu.debugHistoryMenuItem = new dijit.MenuItem({
		id : "debugHistoryMenuItem",
		label : "Debug History",
		disabled : true
	});
	this.menu.runMenu.addChild(this.menu.runMenu.runFlowMenuItem);
	this.menu.runMenu.addChild(this.menu.runMenu.debugFlowMenuItem);
	this.menu.runMenu.addChild(this.menu.runMenu.validateFlowMenuItem);
	this.menu.runMenu.addChild(this.menu.runMenu.runFlowHistoryMenuItem);
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
	this.ui.mainMenu
			.addChild(new dijit.layout.ContentPane(
					{
						id : "tipContentPane",
						title : "tip",
						content : "<div style='margin-bottom:0px; padding-top:4px; font-family:Times, serif;'>" +
								"|&nbsp<a href=quit style='text-decoration: none;'>" +
								"<font size=2px>quit</font></a>&nbsp&nbsp</div>",
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
		label : "<font size=2px style='font-family:Times, serif;'>" + username
				+ "</font>",
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
				_currentInstance.addToConsole(
						"Successfully update user information! ", false);

			},
			error : function(request, status, error) {
				userDialog.hide();
				_currentInstance.addToConsole(
						"An error occurred while updating user information: "
								+ error, true);
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
				if (data.realname == null)
					tmp = "blank";
				else
					tmp = data.realname;
				dojo.byId("user_real_text_box").innerHTML = tmp;
				dojo.byId("user_email_text_box").innerHTML = data.email;
				dojo.byId("user_space_text_box").innerHTML = data.space;
				dojo.byId("user_used_text_box").innerHTML = data.usedspace;
				userDialog.show();

			},
			error : function(request, status, error) {
				_currentInstance.addToConsole(
						"An error occurred while loading user information: "
								+ error, true);
			}
		});
	});

	dojo.connect(this.menu.flowMenu.newFlowMenuItem, "onClick",
			function(event) {
				_currentInstance.newFlow();
			});
	dojo.connect(this.menu.flowMenu.saveFlowMenuItem, "onClick",
			function(event) {
				_currentInstance.saveFlow(_currentInstance.currentFlowId);
			});
//	dojo.connect(this.menu.flowMenu.openFlowMenuItem, "onClick",
//			function(event) {
//				_currentInstance.loadFlow(_currentInstance.currentFlowId);
//			});
	dojo.connect(this.menu.flowMenu.deleteFlowMenuItem, "onClick", function(
			event) {
		_currentInstance.removeFlow(_currentInstance.currentFlowId);
	});
	dojo.connect(this.menu.runMenu.runFlowMenuItem, "onClick", function(event) {
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
	dojo.connect(this.menu.runMenu.runFlowHistoryMenuItem, "onClick", function(
			event) {
		_currentInstance.showRunHistory(_currentInstance.currentFlowId);
	});
};

HAFlow.Main.prototype.initToolbar = function() {
	this.toolbar = {};
	this.initFlowToolbar();
	this.ui.mainMenu.addChild(this.toolbar.toolbar);
	this.initHdfsToolbar();
};

// public
HAFlow.Main.prototype.initFlowToolbar = function() {
	
	this.toolbar.toolbar = new dijit.Toolbar({
		id : "toolbar"
	});
	this.toolbar.newFlowButton = new dijit.form.Button({
		id : "toolbar_newFlow",
		label : "New Flow",
		showLabel : false,
		iconClass : "dijitEditorIcon dijitEditorIconNewPage"
	});
	this.toolbar.saveFlowButton = new dijit.form.Button({
		id : "toolbar_saveFlow",
		label : "Save Flow",
		showLabel : false,
		iconClass : "dijitEditorIcon dijitEditorIconSave",
		disabled : true
	});

	this.toolbar.openFlowButton = new dijit.form.Button({
		id : "toolbar_openFlow",
		label : "Open Flow",
		showLabel : false,
		iconClass : "dijitIconFolderOpen",
		disabled : true
	});
	this.toolbar.closeFlowButton = new dijit.form.Button({
		id : "toolbar_closeFlow",
		label : "Close Flow",
		showLabel : false,
		iconClass : "dijitIconFolderClosed",
		disabled : true
	});
	this.toolbar.removeFlowButton = new dijit.form.Button({
		id : "toolbar_removeFlow",
		label : "Remove Flow",
		showLabel : false,
		iconClass : "dijitEditorIcon dijitEditorIconDelete",
		disabled : true
	});
	this.toolbar.sepButton_1 = new dijit.form.Button({
		id : "toolbar_Sep_1",
		showLabel : false,
		iconClass : "dijitEditorIcon dijitEditorIconSep",
	});

	this.toolbar.runFlowButton = new dijit.form.Button({
		id : "toolbar_runFlow",
		label : "Run Flow",
		showLabel : false,
		iconClass : "dijitEditorIcon dijitEditorIconTabIndent",
		disabled : true
	});
	this.toolbar.sepButton_2 = new dijit.form.Button({
		id : "toolbar_Sep_2",
		showLabel : false,
		iconClass : "dijitEditorIcon dijitEditorIconSep",
	});
	this.toolbar.searchButton = new dijit.form.Button({
		id : "toolbar_search",
		label : "Search Flow",
		showLabel : false,
		iconClass : "dijitIconSearch",
		disabled : "disabled"
	});
	this.toolbar.sepButton_3 = new dijit.form.Button({
		id : "toolbar_Sep_3",
		showLabel : false,
		iconClass : "dijitEditorIcon dijitEditorIconSep",
	});
	this.toolbar.hideToolbarButton = new dijit.form.Button({
		id : "toolbar_hidetoolbar",
		label : "Hide Toolbar",
		showLabel : false,
		iconClass : "dijitIconClear",
		disabled : true
	});
	this.toolbar.sepButton_4 = new dijit.form.Button({
		id : "toolbar_Sep_4",
		showLabel : false,
		iconClass : "dijitEditorIcon dijitEditorIconSep",
	});
	this.toolbar.manual = new dijit.form.Button({
		id : "toolbar_manual",
		label : "Manual",
		showLabel : false,
		iconClass : "dijitIconBookmark",
		disabled : true
	});
	this.toolbar.sepButton_5 = new dijit.form.Button({
		id : "toolbar_Sep_5",
		showLabel : false,
		iconClass : "dijitEditorIcon dijitEditorIconSep",
	});
	this.toolbar.openOozieButton = new dijit.form.Button({
		id : "toolbar_openOozie",
		label : "Open Oozie",
		iconClass : "dijitIconFolderOpen"
	});
	this.toolbar.closeOozieButton = new dijit.form.Button({
		id : "toolbar_closeOozie",
		label : "Close Oozie",
		iconClass : "dijitIconFolderClosed",
		disabled : "disabled"
	});
	this.toolbar.sepButton_6 = new dijit.form.Button({
		id : "toolbar_Sep_6",
		showLabel : false,
		iconClass : "dijitEditorIcon dijitEditorIconSep",
	});
	this.toolbar.openHiveButton = new dijit.form.Button({
		id : "toolbar_openHive",
		label : "Open Hive",
		iconClass : "dijitIconFolderOpen"
	});
	this.toolbar.closeHiveButton = new dijit.form.Button({
		id : "toolbar_closeHive",
		label : "Close Hive",
		iconClass : "dijitIconFolderClosed",
		disabled : "disabled"
	});
	this.toolbar.sepButton_7 = new dijit.form.Button({
		id : "toolbar_Sep_7",
		showLabel : false,
		iconClass : "dijitEditorIcon dijitEditorIconSep",
	});
	this.toolbar.copyFlowButton = new dijit.form.Button({
		id : "toolbar_copyFlow",
		label : "Copy Flow",
		showLabel : false,
		iconClass : "dijitEditorIcon dijitEditorIconCopy",
		disabled : "disabled"
	});
	this.toolbar.pasteFlowButton = new dijit.form.Button({
		id : "toolbar_pasteFlow",
		label : "Paste Flow",
		showLabel : false,
		iconClass : "dijitEditorIcon dijitEditorIconPaste",
		disabled : "disabled"
	});
	this.toolbar.undoFlowButton = new dijit.form.Button({
		id : "toolbar_Undo",
		label : "Undo",
		showLabel : false,
		iconClass : "dijitEditorIcon dijitEditorIconUndo",
		disabled : "disabled"
	});
	this.toolbar.redoFlowButton = new dijit.form.Button({
		id : "toolbar_Redo",
		label : "Redo",
		showLabel : false,
		iconClass : "dijitEditorIcon dijitEditorIconRedo",
		disabled : "disabled"
	});
	this.toolbar.BoldFlowButton = new dijit.form.Button({
		id : "Bold",
		label : "Bold",
		showLabel : false,
		iconClass : "dijitEditorIcon dijitEditorIconBold",
		disabled : "disabled"
	});
	this.toolbar.CancelFlowButton = new dijit.form.Button({
		id : "Cancel",
		label : "Cancel",
		showLabel : false,
		iconClass : "dijitEditorIcon dijitEditorIconCancel",
		disabled : "disabled"
	});
	this.toolbar.InsertImageFlowButton = new dijit.form.Button({
		id : "InsertImage",
		label : "InsertImage",
		showLabel : false,
		iconClass : "dijitEditorIcon dijitEditorIconInsertImage",
		disabled : "disabled"
	});

	this.toolbar.toolbar.addChild(this.toolbar.newFlowButton);
	this.toolbar.toolbar.addChild(this.toolbar.saveFlowButton);
	this.toolbar.toolbar.addChild(this.toolbar.openFlowButton);
	this.toolbar.toolbar.addChild(this.toolbar.closeFlowButton);
	this.toolbar.toolbar.addChild(this.toolbar.copyFlowButton);
	this.toolbar.toolbar.addChild(this.toolbar.pasteFlowButton);
	this.toolbar.toolbar.addChild(this.toolbar.removeFlowButton);
	this.toolbar.toolbar.addChild(this.toolbar.sepButton_1);

	this.toolbar.toolbar.addChild(this.toolbar.runFlowButton);
	this.toolbar.toolbar.addChild(this.toolbar.sepButton_2);

	this.toolbar.toolbar.addChild(this.toolbar.searchButton);
	this.toolbar.toolbar.addChild(this.toolbar.sepButton_3);

	this.toolbar.toolbar.addChild(this.toolbar.hideToolbarButton);
	this.toolbar.toolbar.addChild(this.toolbar.sepButton_4);

	this.toolbar.toolbar.addChild(this.toolbar.manual);
	this.toolbar.toolbar.addChild(this.toolbar.sepButton_5);

	this.toolbar.toolbar.addChild(this.toolbar.openOozieButton);
	this.toolbar.toolbar.addChild(this.toolbar.closeOozieButton);
	this.toolbar.toolbar.addChild(this.toolbar.sepButton_6);

	this.toolbar.toolbar.addChild(this.toolbar.openHiveButton);
	this.toolbar.toolbar.addChild(this.toolbar.closeHiveButton);
	this.toolbar.toolbar.addChild(this.toolbar.sepButton_7);

	this.toolbar.toolbar.addChild(this.toolbar.undoFlowButton);
	this.toolbar.toolbar.addChild(this.toolbar.redoFlowButton);
	this.toolbar.toolbar.addChild(this.toolbar.BoldFlowButton);
	this.toolbar.toolbar.addChild(this.toolbar.CancelFlowButton);
	this.toolbar.toolbar.addChild(this.toolbar.InsertImageFlowButton);
	this.toolbar.toolbar.startup();

	var _currentInstance = this;
	dojo.connect(this.toolbar.newFlowButton, "onClick", function(event) {
		_currentInstance.newFlow();
	});
	dojo.connect(this.toolbar.saveFlowButton, "onClick", function(event) {
		_currentInstance.saveFlow(_currentInstance.currentFlowId);
	});
	dojo.connect(this.toolbar.removeFlowButton, "onClick", function(event) {
		_currentInstance.removeFlow(_currentInstance.currentFlowId);
	});
	dojo.connect(this.toolbar.runFlowButton, "onClick", function(event) {
		_currentInstance.runFlow(_currentInstance.currentFlowId);
	});
	dojo.connect(this.toolbar.openOozieButton, "onClick", function(event) {
		_currentInstance.openoozie();
	});
	dojo.connect(this.toolbar.openHiveButton, "onClick", function(event) {
		_currentInstance.openhive();
	});
};


HAFlow.Main.prototype.initHdfsToolbar = function() {
	this.toolbar.hdfsToolbar = new dijit.Toolbar({
		id : "hdfsToolbar"
	});
	this.toolbar.downloadFileButton = new dijit.form.Button({
		id : "hdfsToolbar_downloadFile",
		label : "Download File",
		showLabel : false,
		iconClass : "dijitEditorIcon dijitEditorIconNewPage"
	});
	this.toolbar.createNewDirButton = new dijit.form.Button({
		id : "hdfsToolbar_createNewDir",
		label : "Create New Directory",
		showLabel : false,
		iconClass : "dijitEditorIcon dijitEditorIconSave",
		disabled : true
	});

	this.toolbar.deleteFileButton = new dijit.form.Button({
		id : "hdfsToolbar_deleteFile",
		label : "Delete File",
		showLabel : false,
		iconClass : "dijitIconFolderOpen",
		disabled : true
	});
	this.toolbar.uploadFileButton = new dijit.form.Button({
		id : "hdfsToolbar_uploadFile",
		label : "Upload",
		showLabel : false,
		iconClass : "dijitIconFolderClosed",
		disabled : true
	});
	this.toolbar.renameFileButton = new dijit.form.Button({
		id : "hdfsToolbar_renameFile",
		label : "Rename File",
		showLabel : false,
		iconClass : "dijitEditorIcon dijitEditorIconDelete",
		disabled : true
	});
	this.toolbar.sepButton_1 = new dijit.form.Button({
		id : "hdfsToolbar_Sep_1",
		showLabel : false,
		iconClass : "dijitEditorIcon dijitEditorIconSep",
	});

	this.toolbar.refreshHdfsListButton = new dijit.form.Button({
		id : "hdfsToolbar_refreshHdfsList",
		label : "Refresh",
		showLabel : false,
		iconClass : "dijitEditorIcon dijitEditorIconTabIndent",
		disabled : true
	});

	this.toolbar.toolbar.addChild(this.toolbar.downloadFileButton);
	this.toolbar.toolbar.addChild(this.toolbar.createNewDirButton);
	this.toolbar.toolbar.addChild(this.toolbar.deleteFileButton);
	this.toolbar.toolbar.addChild(this.toolbar.uploadFileButton);
	this.toolbar.toolbar.addChild(this.toolbar.renameFileButton);
	this.toolbar.toolbar.addChild(this.toolbar.sepButton_1);
	this.toolbar.toolbar.addChild(this.toolbar.refreshHdfsListButton);
	
	var _currentInstance = this;
	dojo.connect(this.toolbar.downloadFileButton, "onClick", function(event) {
		_currentInstance.newFlow();
	});
	dojo.connect(this.toolbar.createNewDirButton, "onClick", function(event) {
		_currentInstance.saveFlow(_currentInstance.currentFlowId);
	});
	dojo.connect(this.toolbar.deleteFileButton, "onClick", function(event) {
		_currentInstance.removeFlow(_currentInstance.currentFlowId);
	});
	dojo.connect(this.toolbar.uploadFileButton, "onClick", function(event) {
		_currentInstance.runFlow(_currentInstance.currentFlowId);
	});
	dojo.connect(this.toolbar.renameFileButton, "onClick", function(event) {
		_currentInstance.openoozie();
	});
	dojo.connect(this.toolbar.refreshHdfsListButton, "onClick", function(event) {
		_currentInstance.openhive();
	});
//	this.ui.mainMenu.addChild(this.toolbar.hdfsToolbar);
};