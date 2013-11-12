// public 
HAFlow.Main.prototype.initToolbar = function() {
	this.toolbar = {};
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
		iconClass : "dijitEditorIcon dijitEditorIconSave"
	});
	
	this.toolbar.openFlowButton = new dijit.form.Button({
		id : "toolbar_openFlow",
		label : "Open Flow",
		showLabel : false,
		iconClass : "dijitIconFolderOpen",
		disabled:"disabled"
	});
	this.toolbar.closeFlowButton = new dijit.form.Button({
		id : "toolbar_closeFlow",
		label : "Close Flow",
		showLabel : false,
		iconClass : "dijitIconFolderClosed",
		disabled:"disabled"
	});
	this.toolbar.removeFlowButton = new dijit.form.Button({
		id : "toolbar_removeFlow",
		label : "Remove Flow",
		showLabel : false,
		iconClass : "dijitEditorIcon dijitEditorIconDelete",
		disabled:"disabled"
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
		iconClass : "dijitEditorIcon dijitEditorIconTabIndent"
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
		disabled:"disabled"
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
		disabled:"disabled"
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
		disabled:"disabled"
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
		disabled:"disabled"
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
		disabled:"disabled"
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
		disabled:"disabled"
	});
	this.toolbar.pasteFlowButton = new dijit.form.Button({
		id : "toolbar_pasteFlow",
		label : "Paste Flow",
		showLabel : false,
		iconClass : "dijitEditorIcon dijitEditorIconPaste",
		disabled:"disabled"
	});
	this.toolbar.undoFlowButton = new dijit.form.Button({
		id : "toolbar_Undo",
		label : "Undo",
		showLabel : false,
		iconClass : "dijitEditorIcon dijitEditorIconUndo",
		disabled:"disabled"
	});
	this.toolbar.redoFlowButton = new dijit.form.Button({
		id : "toolbar_Redo",
		label : "Redo",
		showLabel : false,
		iconClass : "dijitEditorIcon dijitEditorIconRedo",
		disabled:"disabled"
	});
//	this.toolbar.BackColorFlowButton = new dijit.form.Button({
//		id : "BackColor",
//		label : "BackColor",
//		showLabel : false,
//		iconClass : "dijitEditorIcon dijitEditorIconBackColor" 
//	});
	this.toolbar.BoldFlowButton = new dijit.form.Button({
		id : "Bold",
		label : "Bold",
		showLabel : false,
		iconClass : "dijitEditorIcon dijitEditorIconBold",
		disabled:"disabled"
	});
	this.toolbar.CancelFlowButton = new dijit.form.Button({
		id : "Cancel",
		label : "Cancel",
		showLabel : false,
		iconClass : "dijitEditorIcon dijitEditorIconCancel",
		disabled:"disabled"
	});
	this.toolbar.InsertImageFlowButton = new dijit.form.Button({
		id : "InsertImage",
		label : "InsertImage",
		showLabel : false,
		iconClass : "dijitEditorIcon dijitEditorIconInsertImage",
		disabled:"disabled"
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
	this.ui.mainMenu.addChild(this.toolbar.toolbar);
};