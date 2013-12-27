// public
HAFlow.Main.prototype.initReportList = function() {
    var reportListContentPane = new dijit.layout.ContentPane({
        id: this.reportListContainerId,
        title: myfile.reports
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
        	_currentInstance.addToConsole("An error occurred while loading flow list: " + error, true);
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
    	this.reports[reportItemId].nbZones = reportItem.nbZones;
    	this.reports[reportItemId].panelType = reportItem.panelType;//TODO
    	this.reports[reportItemId].parentid = reportItem.parentid;
    	this.reports[reportItemId].portlets = new Array();
    	
    	var portlets = reportItem.portlets;
    	for( var j = 0; j < portlets.length; j++){
    		var currentPortlet = {
    				id: portlets[j].id, 
    				title: portlets[j].title, 
    				type: portlets[j].type,
    				position: portlets[j].position,
    				
    				reportId: portlets[j].reportId, 
    				configurations:[],
    				chartSeries:[],
    				column: portlets[j].column,
    				zone: portlets[j].zone,
    				width: portlets[j].width,
    				height: portlets[j].height,
    				left: portlets[j].left,
    				right: portlets[j].right,
    			};
    		var configurations = portlets[j].configurations;
    		for( var x = 0; x < configurations.length; x++){
    			var configuration = configurations[x];
    			currentPortlet.configurations.push(configuration);
    		}
    		var chartSeries = portlets[j].chartSeries;
    		if(chartSeries != null){
	    		for( var x = 0; x < chartSeries.length; x++){
	    			var chartSerie = chartSeries[x];
	    			currentPortlet.chartSeries.push(chartSerie);
	    		}
    		}
    		this.reports[reportItemId].portlets.push(currentPortlet);
    	}
    }
};

HAFlow.Main.prototype.checkReportItem = function(isDirectory, needsDirectory){
	if( needsDirectory ){
		if( isDirectory){
			return true;
		}else{
			_currentInstance.addToConsole("It's not a flow directory!", true);
			return false;
		}
	}else{
		if( isDirectory){
			_currentInstance.addToConsole("It's not a flow! ", true);
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
        label: myfile.newReport
    });
    this.menu.reportTreeMenu.newFloatReportMenuItem = new dijit.MenuItem({
        id: "newFloatReportMenuItem",
        label: myfile.newReport
    });
    this.menu.reportTreeMenu.newReportDirectoryMenuItem = new dijit.MenuItem({
        id: "newReportDirectoryMenuItem",
        label: myfile.newReportDirectory
    });
    this.menu.reportTreeMenu.deleteReportMenuItem = new dijit.MenuItem({
        id: "deleteReportMenuItem",
        label: myfile.delete_
    });
    this.menu.reportTreeMenu.renameReportMenuItem = new dijit.MenuItem({
        id: "renameReportMenuItem",
        label: myfile.rename
    });
    this.menu.reportTreeMenu.saveReportMenuItem = new dijit.MenuItem({
        id: "saveReportMenuItem",
        label: myfile.save
    });

    this.menu.reportTreeMenu.addChild(this.menu.reportTreeMenu.newReportMenuItem);
    this.menu.reportTreeMenu.addChild(this.menu.reportTreeMenu.newFloatReportMenuItem);
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
    dojo.connect(this.menu.reportTreeMenu.newFloatReportMenuItem, "onClick",
    	    function() {
        	var tn = dijit.byNode(this.getParent().currentTarget);
        	var checkResult = _currentInstance.checkReportItem(tn.item.isdirectory, true);
        	if( checkResult ){    		
    	       _currentInstance.newFloatReport(tn.item.id);
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
    	var tn = dijit.byNode(this.getParent().currentTarget);
		_currentInstance.deleteReport(tn.item.id);
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
	    	_currentInstance.onReportClicked(_currentInstance, item.id);
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

HAFlow.Main.prototype.onReportClicked = function(instance, reportId) {
	var reportInfo = instance.reports[reportId];
	var text = "";
	text += "<table border=\"0\">";
	text += "<tr style=\"tr\"><th align=\"left\">Flow Info</th>" + "<td>" + reportInfo.id + "</td></tr>";
	text += "<tr style=\"tr\"><th align=\"left\">IsDirectory</th><td>" + reportInfo.isdirectory + "</td></tr>";
	text += "<tr style=\"tr\"><th align=\"left\">ParentId</th><td>" + reportInfo.parentid + "</td></tr>";
	text += "<tr style=\"tr\"><th align=\"left\">Name</th><td><span id=\"report_name_text_box\" class=\"configuration-content\"></span></td></tr>";
	text += "<tr style=\"tr\"><td align=\"left\"><div id=\"save_report_name_button\" class=\"configuration-content\"></div></td></tr>";	
	text += "</table>";
	$("#" + instance.informationContainerId).html(text);
	
	var reportNameTextBoxId = "report_" + reportInfo.id + "_name";
	if (dijit.byId(reportNameTextBoxId) != null) {
		dijit.registry.remove(reportNameTextBoxId);
	}
	var flowNameTextBox = new dijit.form.TextBox({
		id : reportNameTextBoxId,
		value : reportInfo.name,
		style : "width:300px;"
	});
	flowNameTextBox.placeAt(dojo.byId("report_name_text_box"));
	flowNameTextBox.startup();
	var button = new dijit.form.Button({
		label : "Save",
		onClick : function() {
			instance.saveReportName(instance, reportInfo.id);
		}
	});
	button.placeAt(dojo.byId("save_report_name_button"));
	button.startup();
	var informationPane = dijit.byId(instance.informationContainerId);
	_currentInstance.ui.bottomContainer.selectChild(informationPane);
};

// TODO for now not used
HAFlow.Main.prototype.onCloseTab_hdfs = function(instance) {
    
};
