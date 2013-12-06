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
    this.userId = userid;
    this.userName = username;
    this.hdfspath = null;
};

// Initialize
HAFlow.Main.prototype.init = function() {
    this.flows = {};
    this.jsPlumb = {};
    this.reports = {};
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
    this.initReportList();
    this.ui.refresh();
};

HAFlow.Main.prototype.initUserInterfaceId = function() {
    this.flowListContainerId = "flowListTreeContainer";
    this.flowListTreeId = "flowListTree";
    this.hdfsFileListContainerId = "hdfsFileListContainer";
    this.hdfsFileListTreeId = "hdfsFileListTree";
    this.moduleListContainerId = "moduleListContainer";
    this.reportListContainerId = "reportListContainer";
    this.reportListTreeId = "reportListTree";
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

// initFlowMenu -->  haflow.toolbar.js
// initToolbar --> haflow.toolbar.js

HAFlow.Main.prototype.initBottomTabs = function() {
	this.initInformationTab();
	this.initConsoleTab();
};

HAFlow.Main.prototype.initConsoleTab = function() {
    var consoleContentPane = (new dijit.layout.ContentPane({
        id : this.consoleContainerId,
        title : myfile.console
    }));
    this.ui.bottomContainer.addChild(consoleContentPane);
};

HAFlow.Main.prototype.initInformationTab = function() {
    var informationContentPane = (new dijit.layout.ContentPane({
        id : this.informationContainerId,
        title : myfile.information
    }));
    this.ui.bottomContainer.addChild(informationContentPane);
};

// initFlowList --> haflow.flow_list.js

HAFlow.Main.prototype.initFlowContainer = function() {
    var _currentInstance = this;
    watchHandle=this.ui.centerContainer.watch("selectedChildWidget", function(name, from,
            to) {
        var targetContainerPaneId = to.domNode.id; 
        var flowContainerPaneString = "flowContainerPane_";
        var reportContainerPaneString = "reportContainerPane_";
        var hdfsContainerPaneString = "hdfsContainerPane_";
        
        if(targetContainerPaneId.substring(0, reportContainerPaneString.length) 
                === reportContainerPaneString){//report opened
            _currentInstance.afterFlowUnSelected();
            _currentInstance.afterReportSelected();
            
            var reportId = targetContainerPaneId.replace(reportContainerPaneString, "");
            _currentInstance.currentReportId = reportId;
            _currentInstance.setupReportDroppable(reportId);
//            _currentInstance.paintReport(reportId);    
        }else if(targetContainerPaneId.substring(0, flowContainerPaneString.length) 
                === flowContainerPaneString){ //flow opened
            
            _currentInstance.afterReportUnSelected();
            _currentInstance.afterFlowSelected();
            
            var flowId = targetContainerPaneId.replace(flowContainerPaneString, "");
            _currentInstance.currentFlowId = flowId;
            _currentInstance.setupDroppable(flowId);
            _currentInstance.paintFlow(flowId);            
        }else{
            _currentInstance.afterFlowUnSelected();
            _currentInstance.afterReportUnSelected();
            
//            var hdfsreg = new RegExp("^hdfs://");hdfsreg.test(targetContainerPaneId)
            if(targetContainerPaneId.substring(0, hdfsContainerPaneString.length) 
                    === hdfsContainerPaneString){ //hdfs opened                
                
            }else if( targetContainerPaneId == "oozie" 
                || targetContainerPaneId == "hive"){//oozie or hive opened
                
            }else {
                alert("not known target container!");
            }
        }

    });
    
    dojo.connect(this.ui.centerContainer, "closeChild", function(child){
        if( !_currentInstance.ui.centerContainer.hasChildren()){
            _currentInstance.ui.centerRightContainer.removeChild(_currentInstance.ui.trailingContainer);
        }
    });
};

HAFlow.Main.prototype.afterReportSelected = function(){
    var _currentInstance = this;
    _currentInstance.ui.centerRightContainer.addChild(_currentInstance.ui.secondTrailingContainer);
    if(_currentInstance.ui.secondTrailingContainerLoaded == false){
        _currentInstance.paintReportList();
        _currentInstance.ui.secondTrailingContainerLoaded = true;
    }
};

HAFlow.Main.prototype.afterReportUnSelected = function(){
    var _currentInstance = this;
    _currentInstance.ui.centerRightContainer.removeChild(_currentInstance.ui.secondTrailingContainer);
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
    if(_currentInstance.ui.trailingContainerLoaded == false){
        _currentInstance.paintModuleList();
        _currentInstance.ui.trailingContainerLoaded = true;
    }    
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
// initReportList --> haflow.report_list.js
// end initUserInterface

HAFlow.Main.prototype.initData = function() {
/*    this.initFlowListData();*/
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
            _currentInsance.addToConsole("An error occurred while loading module list: " + error, true);
        }
    });
};

HAFlow.Main.prototype.drawLists = function(instance) {
    instance.paintModuleList();
/*    instance.buildFlowListTree();*/
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
        $("#" + this.moduleListContainerId + "_"
                + this.moduleList.modules[i].category).append(text);
    }
    this.ui.refresh();

};

HAFlow.Main.prototype.addToConsole = function(message, isError) {
	var consoleContainer = dijit.registry
			.byId(_currentInstance.consoleContainerId);
	
	var text = "</br> &gt;&gt;&gt;</br> ";
	if( isError){
		text += "<div style=\"color:red\">" + message + "</div>";
	}else{
		text += "<div style=\"color:green\">" + message + "</div>";
	}
	var randomId = HAFlow.generateUUID();
	text += "<div id='" + randomId + "'>" + "" + "</div>";
	$("#" + _currentInstance.consoleContainerId).append(text);
	dojo.window.scrollIntoView(randomId);
	_currentInstance.ui.bottomContainer.selectChild(consoleContainer);
};

//paintReportList --> haflow.report.js

//end initData
