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
	this.propertyContainerId = "propertyContainer";
	this.informationContainerId = "informationContainer";
	this.consoleContainerId = "consoleContainer";
	this.logContainerId = "logContainer";
	this.configurationContainerId = "configurationContainer";
};

HAFlow.Main.prototype.initMainMenu = function() {
	this.menu = {};
	this.initFlowMenu();
};

// initFlowMenu -->  haflow.toolbar.js
// initToolbar --> haflow.toolbar.js

HAFlow.Main.prototype.initBottomTabs = function() {
	this.initPropertyTab();
	this.initInformationTab();
//	this.initConfigurationTab();
//	this.initConsoleTab();
//	this.initLogTab();
};

HAFlow.Main.prototype.initPropertyTab = function() {
	var propertyContentPane = (new dijit.layout.ContentPane({
		id : this.propertyContainerId,
		title : "Property"
	}));
};

HAFlow.Main.prototype.initInformationTab = function() {
	var informationContentPane = (new dijit.layout.ContentPane({
		id : this.informationContainerId,
		title : "Information"
	}));
	this.ui.bottomContainer.addChild(informationContentPane);
};
//HAFlow.Main.prototype.initConfigurationTab = function() {
//	var configurationContentPane = new dijit.layout.ContentPane({
//		id : this.configurationContainerId,
//		title : "Configuration"
//	});
//	this.ui.bottomContainer.addChild(configurationContentPane);
//};
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



// initFlowList --> haflow.flow_list.js

HAFlow.Main.prototype.initFlowContainer = function() {
	var _currentInstance = this;
	watchHandle=this.ui.centerContainer.watch("selectedChildWidget", function(name, from,
			to) {
		var flowId = to.domNode.id.replace("flowContainerPane_", "");
		var hdfsreg = new RegExp("^hdfs://");
		if(hdfsreg.test(flowId)){//hdfs opened
			_currentInstance.afterFlowUnSelected();
		}else if( flowId == "oozie" || flowId == "hive"){//oozie or hive opened
			_currentInstance.afterFlowUnSelected();
		}else{ //flow opened			
			_currentInstance.currentFlowId = flowId;
			_currentInstance.setupDroppable(flowId);
			_currentInstance.paintFlow(flowId);
			_currentInstance.afterFlowSelected();
		}

	});
	
	dojo.connect(this.ui.centerContainer, "closeChild", function(child){
		if( !_currentInstance.ui.centerContainer.hasChildren()){
			_currentInstance.ui.centerRightContainer.removeChild(_currentInstance.ui.trailingContainer);
		}
    });
};

HAFlow.Main.prototype.afterFlowSelected = function(){
	var _currentInstance = this;
	
	//toolbar
	_currentInstance.toolbar.removeFlowButton.set("disabled", false);
	_currentInstance.toolbar.saveFlowButton.set("disabled", false);
	_currentInstance.toolbar.runFlowButton.set("disabled", false);
	//menu item
	_currentInstance.menu.flowMenu.deleteFlowMenuItem.set("disabled", false);
	_currentInstance.menu.flowMenu.saveFlowMenuItem.set("disabled", false);
	_currentInstance.menu.runMenu.runFlowMenuItem.set("disabled", false);
	_currentInstance.menu.runMenu.runFlowHistoryMenuItem.set("disabled", false);
	
	_currentInstance.ui.centerRightContainer.addChild(_currentInstance.ui.trailingContainer);
};

HAFlow.Main.prototype.afterFlowUnSelected = function() {
	var _currentInstance = this;
	
	//toolbar
	_currentInstance.toolbar.removeFlowButton.set("disabled", true);
	_currentInstance.toolbar.saveFlowButton.set("disabled", true);
	_currentInstance.toolbar.runFlowButton.set("disabled", true);
	//menu item
	_currentInstance.menu.flowMenu.deleteFlowMenuItem.set("disabled", true);
	_currentInstance.menu.flowMenu.saveFlowMenuItem.set("disabled", true);
	_currentInstance.menu.runMenu.runFlowMenuItem.set("disabled", true);
	_currentInstance.menu.runMenu.runFlowHistoryMenuItem.set("disabled", true);
	
	_currentInstance.ui.centerRightContainer.removeChild(_currentInstance.ui.trailingContainer);
};
// initHdfsFileList --> halow.hdfs.js

// end initUserInterface

HAFlow.Main.prototype.initData = function() {
/*	this.initFlowListData();*/
	this.initModuleListData();
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
/*	instance.buildFlowListTree();*/
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

/*HAFlow.Main.prototype.buildFlowListTree = function() {
	var i;
	for (i = 0; i < this.flowList.flows.length; i++) {
		this.flowListStore.put({
			id : this.flowList.flows[i].id,
			name : this.flowList.flows[i].name,
			node : true
		});
	}
};*/

//end initData
