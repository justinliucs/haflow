// public
HAFlow.Main.prototype.initReportList = function() {
    var reportListContentPane = new dijit.layout.ContentPane({
        id: this.reportListContainerId,
        title: "Reports"
    });
    this.ui.leadingContainer.addChild(reportListContentPane);
    this.initReportListStore();
    this.getReportList();
    this.initReportListTree();
};

HAFlow.Main.prototype.initReportListStore = function() {
    this.reportListStore = new dojo.store.Observable(new dojo.store.Memory({
        data: [{
            id: "reports",
            name: "Reports",
            directory: true,
            parent: null
        }],
        getChildren: function(object) {
            return this.query({
                parent: object.id
            });
        }
    }));
};

HAFlow.Main.prototype.getReportList = function(path) {
    var _currentInstance = this;
//    $.ajax({
//        url: this.basePath + "report/list",
//        type: "GET",
//        dataType: "json",
//        data: {
//            path: path
//        },
//        success: function(data, status) {
//            _currentInstance.refreshHdfsFileList(data);
//        },
//        error: function(request, status, error) {
//            HAFlow.showDialog("Error", "An error occurred while loading flow list: " + error);
//        }
//    });
    var data = [];
    data.reports = [{id: '1', name: 'root', parent: 'reports', directory: true}, 
                    {id: '1223', name: '1223', parent: '1', directory: true}, 
                    {id: '1224', name: '1224', parent: '1', directory: false}];
	_currentInstance.refreshReportList(data);
};

HAFlow.Main.prototype.refreshReportList = function(data) {
	var _currentInstance = this;
    for (var i = 0; i < data.reports.length; i++) {
    	var dataItem = data.reports[i];
        this.reportListStore.put({
            id: dataItem.id,
            name: dataItem.name,
            isDirectory: dataItem.directory,
            parent: dataItem.parent,
        });
//        if (data.files[i].directory) {
//            instance.getHdfsFileList(parentPath + "/" + data.files[i].name);
//        }
    }
};

HAFlow.Main.prototype.initReportListTree = function() {
    var treeModel = new dijit.tree.ObjectStoreModel({
        store: this.reportListStore,
        query: {
            id: "reports"
        },
        mayHaveChildren: function(item) {
            return item.isDirectory;
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

    this.menu.reportTreeMenu.addChild(this.menu.reportTreeMenu.newReportMenuItem);
    this.menu.reportTreeMenu.addChild(this.menu.reportTreeMenu.newReportDirectoryMenuItem);
    this.menu.reportTreeMenu.addChild(this.menu.reportTreeMenu.deleteReportMenuItem);
    this.menu.reportTreeMenu.addChild(this.menu.reportTreeMenu.renameReportMenuItem);

    dojo.connect(this.menu.reportTreeMenu.newReportMenuItem, "onClick",
	    function() {
    		var tn = dijit.byNode(this.getParent().currentTarget);
	       _currentInstance.newReport(tn.item.id);
	    });
    dojo.connect(this.menu.reportTreeMenu.newReportDirectoryMenuItem, "onClick",
	    function() {
	       
	    });
    dojo.connect(this.menu.reportTreeMenu.deleteReportMenuItem, "onClick",
	    function() {
    	
	    });
    dojo.connect(this.menu.reportTreeMenu.renameReportMenuItem, "onClick",
	    function() {
	      
	    });
 
    this.menu.reportTreeMenu.startup();
    tree.on("click",
	    function(item) {
	        if (item.directory != "true") {
	            var information = [];
	            information.id = item.id;
	            information.name = item.name;
	            _currentInstance.onReportClicked(_currentInstance, information);
	        }
	    },
	    true);
    var picture = new RegExp("^[A-Za-z0-9_]*\.jpg$");
    var text = new RegExp("^[A-Za-z0-9_]*\.(txt|ini)$");
    var csv = new RegExp("^[A-Za-z0-9_-]*\.csv$");
   
    tree.on("dblclick",
    	function(reportItem) {
        	if (reportItem.isDirectory != true) {
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