// public
HAFlow.Main.prototype.initReportList = function() {
    var reportListContentPane = new dijit.layout.ContentPane({
        id: this.reportListContainerId,
        title: "Reports"
    });
    this.ui.leadingContainer.addChild(reportListContentPane);
    
    var _currentInstance = this;
    $.ajax({
        url: this.basePath + "report",
        type: "GET",
        dataType: "json",
        data: {},
        success: function(data, status) {
        	_currentInstance.initReportListStore();
        	_currentInstance.fillReportListStore(data);
        	_currentInstance.fillReportsData(data);
        	_currentInstance.initReportListTree();
        },
        error: function(request, status, error) {
            HAFlow.showDialog("Error", "An error occurred while loading flow list: " + error);
        }
    });
};

//private
HAFlow.Main.prototype.initReportListStore = function() {
    this.reportListStore = new dojo.store.Observable(new dojo.store.Memory({
        data: [],
        getChildren: function(object) {
            return this.query({
                parent: object.id
            });
        }
    }));
};

HAFlow.Main.prototype.fillReportListStore = function(data) {
    for (var i = 0; i < data.reports.length; i++) {
    	var dataItem = data.reports[i];
        this.reportListStore.put({
            id: dataItem.id,
            name: dataItem.name,
            isdirectory: dataItem.isdirectory,
            parent: dataItem.parentid,
        });
    }
};

HAFlow.Main.prototype.fillReportsData = function(data) {
    for (var i = 0; i < data.reports.length; i++) {
    	var reportItem = data.reports[i];
    	var reportItemId = reportItem.id;
        this.reports[reportItemId] = {};
    	this.reports[reportItemId].id = reportItemId;
    	this.reports[reportItemId].name = reportItem.name;
    	this.reports[reportItemId].isdirectory = reportItem.isdirectory;
    	this.reports[reportItemId].parentid = reportItem.parentid;
    	this.reports[reportItemId].portlets = new Array();//TODO
    }
};

HAFlow.Main.prototype.checkReportItem = function(isDirectory, needsDirectory){
//	if( tn.isdirectory ){    		
//	       _currentInstance.newReport(tn.item.id);
// 	}else{
// 		HAFlow.showDialog("Error", "It's not a flow directory! ");
// 	}
	
	if( needsDirectory ){
		if( isDirectory){
			return true;
		}else{
			HAFlow.showDialog("Error", "It's not a flow directory! ");
			return false;
		}
	}else{
		if( isDirectory){
			HAFlow.showDialog("Error", "It's not a flow! ");
			return false;
		}else{
			return true;
		}
	}
};

HAFlow.Main.prototype.initReportListTree = function() {
	var rootId;
	for(var i = 0; i < this.reportListStore.data.length; i++ ){
		if( this.reportListStore.data[i].parent == null){
			rootId = this.reportListStore.data[i].id;
			break;
		}
	}
    var treeModel = new dijit.tree.ObjectStoreModel({
        store: this.reportListStore,
        query: {
            id: rootId,
        },
        mayHaveChildren: function(item) {
            return item.isdirectory;
        }
    });

    var tree = new dijit.Tree({
	        model: treeModel,
	        dndController: dijit.tree.dndSource
	    },
	    dojo.create("div", {
	        id: this.reportListTreeId,
	    },
	    this.reportListContainerId));
    var _currentInstance = this;
    //TODO put

    this.menu.reportTreeMenu = new dijit.Menu({
        id: "reportTreeMenu",
        targetNodeIds: [_currentInstance.reportListTreeId],
        selector: ".dijitTreeNode"
    });
    this.menu.reportTreeMenu.newReportMenuItem = new dijit.MenuItem({
        id: "newReportMenuItem",
        label: "New Report"
    });
    this.menu.reportTreeMenu.newReportDirectoryMenuItem = new dijit.MenuItem({
        id: "newReportDirectoryMenuItem",
        label: "New Report Directory"
    });
    this.menu.reportTreeMenu.deleteReportMenuItem = new dijit.MenuItem({
        id: "deleteReportMenuItem",
        label: "Delete"
    });
    this.menu.reportTreeMenu.renameReportMenuItem = new dijit.MenuItem({
        id: "renameReportMenuItem",
        label: "Rename"
    });
    this.menu.reportTreeMenu.saveReportMenuItem = new dijit.MenuItem({
        id: "saveReportMenuItem",
        label: "Save"
    });

    this.menu.reportTreeMenu.addChild(this.menu.reportTreeMenu.newReportMenuItem);
    this.menu.reportTreeMenu.addChild(this.menu.reportTreeMenu.newReportDirectoryMenuItem);
    this.menu.reportTreeMenu.addChild(this.menu.reportTreeMenu.deleteReportMenuItem);
    this.menu.reportTreeMenu.addChild(this.menu.reportTreeMenu.renameReportMenuItem);
    this.menu.reportTreeMenu.addChild(this.menu.reportTreeMenu.saveReportMenuItem);

    dojo.connect(this.menu.reportTreeMenu.newReportMenuItem, "onClick",
	    function() {
    	var tn = dijit.byNode(this.getParent().currentTarget);
    	var checkResult = _currentInstance.checkReportItem(tn.item.isdirectory, true);
    	if( checkResult ){    		
	       _currentInstance.newReport(tn.item.id);
    	}
    });
    dojo.connect(this.menu.reportTreeMenu.newReportDirectoryMenuItem, "onClick",
	    function() {
    	var tn = dijit.byNode(this.getParent().currentTarget);
    	var checkResult = _currentInstance.checkReportItem(tn.item.isdirectory, true);
    	if( checkResult ){    		
	       _currentInstance.newReportDirectory(tn.item.id);
    	}
    });
    dojo.connect(this.menu.reportTreeMenu.deleteReportMenuItem, "onClick",
	    function() {
    	
	    });
    dojo.connect(this.menu.reportTreeMenu.renameReportMenuItem, "onClick",
	    function() {
	      
	    });
    dojo.connect(this.menu.reportTreeMenu.saveReportMenuItem, "onClick",
    	    function() {
    	var tn = dijit.byNode(this.getParent().currentTarget);
    	var checkResult = _currentInstance.checkReportItem(tn.item.isdirectory, false);
    	if( checkResult ){    		
	       _currentInstance.saveReport(tn.item.id);
    	}
	});
 
    this.menu.reportTreeMenu.startup();
    tree.on("click", function(item) {
	    	var information = [];
	    	information.id = item.id;
	    	information.name = item.name;
	    	_currentInstance.onReportClicked(_currentInstance, information);
    	}, true);
    var picture = new RegExp("^[A-Za-z0-9_]*\.jpg$");
    var text = new RegExp("^[A-Za-z0-9_]*\.(txt|ini)$");
    var csv = new RegExp("^[A-Za-z0-9_-]*\.csv$");
   
    tree.on("dblclick",
    	function(reportItem) {
        	if (!reportItem.isdirectory) {
	        	_currentInstance.openReport(reportItem.id);
	        }
	    },
	    true);

    tree.startup();
};

HAFlow.Main.prototype.onReportClicked = function(instance, reportInformation) {
    var text = "";
    text += "<table border=\"0\">";
    text += "<tr style=\"tr\"><th align=\"left\">Name</th><td>" + reportInformation.id + "</td></tr>";
    text += "<tr style=\"tr\"><th align=\"left\">Path</th><td>" + reportInformation.name + "</td></tr>";
    text += "</table>";
    $("#" + instance.informationContainerId).html(text);
};

// TODO for now not used
HAFlow.Main.prototype.onCloseTab_hdfs = function(instance) {
    
};