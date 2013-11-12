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

//public
HAFlow.Main.prototype.initFlowList = function() {
	var flowListContentPane = new dijit.layout.ContentPane({
		id : this.flowListContainerId,
		title : "Flows"
	});
	this.ui.leadingContainer.addChild(flowListContentPane);
	this.initFlowListStore();
	this.initFlowListTree();
};

HAFlow.Main.prototype.initFlowListStore = function() {
	this.flowListStore = new dojo.store.Observable(new dojo.store.Memory({
		data : [ {
			id : "root",
			name : "Flows",
			node : false
		} ],

		getChildren : function(object) {
			if (object.id == "root") {
				return this.query({
					node : true
				});
			}
			return null;
		}
	}));
};

HAFlow.Main.prototype.initFlowListTree = function() {
	var treeModel = new dijit.tree.ObjectStoreModel({
		store : this.flowListStore,
		query : {
			id : "root"
		},
		mayHaveChildren : function(item) {
			return !(item.node);
		}
	});
	var tree = new dijit.Tree({
		model : treeModel
	}, dojo.create("div", {
		id : this.flowListTreeId,
	}, this.flowListContainerId));
	var _currentInstance = this;
	this.menu.flowtreeMenu = new dijit.Menu({
		id : "flowtreeMenu",
		targetNodeIds : [ _currentInstance.flowListTreeId ],
		selector : ".dijitTreeNode"
	});
	this.menu.flowtreeMenu.NewFlowMenuItem = new dijit.MenuItem({
		id : "NewFlowMenuItem",
		label : "New flow"
	});
	this.menu.flowtreeMenu.DeleteFlowMenuItem = new dijit.MenuItem({
		id : "DeleteFlowMenuItem",
		label : "Delete flow"
	});

	this.menu.flowtreeMenu.addChild(this.menu.flowtreeMenu.NewFlowMenuItem);
	this.menu.flowtreeMenu.addChild(this.menu.flowtreeMenu.DeleteFlowMenuItem);
	
	dojo
	.connect(
			this.menu.flowtreeMenu.NewFlowMenuItem,
			"onClick",
			function() {
//				var tn = dijit.byNode(this.getParent().currentTarget);
//				var path = tn.item.path;
				_currentInstance.newFlow();
			});
	dojo
	.connect(
			this.menu.flowtreeMenu.DeleteFlowMenuItem,
			"onClick",
			function() {
				var tn = dijit.byNode(this.getParent().currentTarget);
				var flowId = tn.item.id;
				_currentInstance.removeFlow(flowId);
			});
	
	tree.on("click", function(item) {
		if (item.node == true) {
			_currentInstance.onFlowClicked(_currentInstance, item.id);

		}

	});
	tree.on("dblclick", function(item) {
		if (item.node == true) {
			watchHandle=_currentInstance.ui.centerContainer.watch("selectedChildWidget", function(name, from,
					to) {
				var flowId = to.domNode.id.replace("flowContainerPane_", "");
				//TODO:
				var hdfsreg = new RegExp("^hdfs://");
				if(hdfsreg.test(flowId))
					{
//					alert("hdfs");
//					_currentInstance.toolbar.removeFlowButton.set("disabled", "disabled");
					}
				else
					{
					_currentInstance.toolbar.removeFlowButton.set("disabled", false);
					_currentInstance.currentFlowId = flowId;
					_currentInstance.setupDroppable(flowId);
					_currentInstance.paintFlow(flowId);
					}

			});
			_currentInstance.loadFlow(item.id);
		}
	}, true);

	tree.startup();
};

//Event Handler
HAFlow.Main.prototype.onFlowClicked = function(instance, flowId) {
	var flowBrief = instance.getFlowBriefById(instance, flowId);
	var text = "";
	text+="<table border=\"0\">";
	text+="<tr style=\"tr\"><th align=\"left\">Flow Info</th><td>"+ flowBrief.id +"</td></tr>";
	text+="<tr style=\"tr\"><th align=\"left\">Name</th><td><span id=\"flow_name_text_box\" class=\"configuration-content\"></span></td></tr>";
	text+="<tr style=\"tr\"><td align=\"left\"><div id=\"save_flow_name_button\" class=\"configuration-content\"></div></td></tr>";
	text+="</table>";
//	text += "<div class=\"configuration\">";
//	text += "<div class=\"configuration-content\"><strong>Flow Info:</strong></div>";
//	text += "<div class=\"configuration-content\"><span><strong>Id:</strong> "
//			+ flowBrief.id + "</span></div>";
//	text += "<div class=\"configuration-content\"><span><strong>Name:</strong></span>";
//	text += "<span id=\"flow_name_text_box\" class=\"configuration-content\"></span></div>";
//	text += "<div id=\"save_flow_name_button\" class=\"configuration-content\"></div>";
//	text += "</div>";
	$("#" + instance.informationContainerId).html(text);
	if (dijit.byId("flow_" + flowBrief.id + "_name") != null) {
		dijit.registry.remove("flow_" + flowBrief.id + "_name");
	}
	var flowNameTextBox = new dijit.form.TextBox({
		id : "flow_" + flowBrief.id + "_name",
		value : flowBrief.name,
		style : "width:300px;"
	});
	flowNameTextBox.placeAt(dojo.byId("flow_name_text_box"));
	flowNameTextBox.startup();
	var button = new dijit.form.Button({
		label : "Save",
		onClick : function() {
			instance.saveFlowName(instance, flowBrief.id);
		}
	});
	button.placeAt(dojo.byId("save_flow_name_button"));
	button.startup();
};

HAFlow.Main.prototype.newFlow = function() {
	var newFlowId = HAFlow.generateUUID();
	this.flows[newFlowId] = {};
	this.flows[newFlowId].id = newFlowId;
	this.flows[newFlowId].name = "NewFlow";
	this.flows[newFlowId].nodes = new Array();
	this.flows[newFlowId].edges = new Array();
	var _currentInstance = this;
	var contentPane = new dijit.layout.ContentPane({
		id : "flowContainerPane_" + newFlowId,
		title : _currentInstance.flows[newFlowId].name,
		content : "<div id=\"flowContainer_" + newFlowId
				+ "\" class=\"flowcontainer\"></div>",
		closable : true,
		onClose : _currentInstance.onCloseTab(_currentInstance)
	});
	this.ui.centerContainer.addChild(contentPane);
	this.ui.centerContainer.selectChild(contentPane);
	this.setupDroppable(newFlowId);
	this.paintFlow(newFlowId);
	this.saveFlow(newFlowId);
	this.flowListStore.put({
		id : this.flows[newFlowId].id,
		name : this.flows[newFlowId].name,
		node : true
	});
};

HAFlow.Main.prototype.saveFlow = function(flowId) {
	var _currentInstance = this;
	$.ajax({
		url : _currentInstance.basePath + "flow/" + flowId,
		type : "PUT",
		dataType : "json",
		contentType : "application/json",
		data : JSON.stringify(_currentInstance.flows[flowId]),
		success : function(data, status) {
			HAFlow.showDialog("Save Flow", "Flow saved.");
			_currentInstance.refreshFlowList();
		},
		error : function(request, status, error) {
			HAFlow.showDialog("Error", "An error occurred while saving flow: "
					+ error);
		}
	});
};

HAFlow.Main.prototype.removeFlow = function(flowId) {
	var _currentInstance = this;
	$.ajax({
		url : _currentInstance.basePath + "flow/" + flowId,
		type : "DELETE",
		dataType : "json",
		contentType : "application/json",
		data : JSON.stringify({}),
		success : function(data, status) {
			HAFlow.showDialog("Remove Flow", "Flow removed.");
			_currentInstance.ui.centerContainer.removeChild(dijit
					.byId("flowContainerPane_" + flowId));
			_currentInstance.refreshFlowList();
			_currentInstance.flowListStore
					.remove(_currentInstance.flows[flowId].id);
		},
		error : function(request, status, error) {
			HAFlow.showDialog("Error",
					"An error occurred while removing flow: " + error);
		}
	});
};

//double click on flow item
HAFlow.Main.prototype.loadFlow = function(flowId) {
	if (dojo.byId("flowContainer_" + flowId) == null) {
		var _currentInstance = this;
		$.ajax({
			url : _currentInstance.basePath + "flow/" + flowId,
			type : "GET",
			cache : false,
			dataType : "json",
			success : function(data, status) {
				_currentInstance.flows[data.id] = data;
				var contentPane = new dijit.layout.ContentPane({
					id : "flowContainerPane_" + flowId,
					title : _currentInstance.flows[flowId].name,
					content : "<div id=\"flowContainer_" + flowId
							+ "\" class=\"flowcontainer\"></div>",
					closable : true,
					onClose : _currentInstance.onCloseTab(_currentInstance)
				});
				_currentInstance.ui.centerContainer.addChild(contentPane);
				_currentInstance.setupDroppable(flowId);
				_currentInstance.paintFlow(flowId);
				_currentInstance.ui.centerContainer.selectChild(dijit
						.byId("flowContainerPane_" + flowId));
			},
			error : function(request, status, error) {
				HAFlow.showDialog("Error",
						"An error occurred while loading flow: " + error);
			}
		});
	} else {
		this.ui.centerContainer.selectChild(dijit.byId("flowContainerPane_"
				+ flowId));
	}
};

HAFlow.Main.prototype.runFlow = function(flowId) {
	var _currentInstance = this;
	$.ajax({
		url : _currentInstance.basePath + "flow/" + flowId,
		type : "PUT",
		dataType : "json",
		contentType : "application/json",
		data : JSON.stringify(_currentInstance.flows[flowId]),
		success : function(data, status) {
			HAFlow.showDialog("Save Flow", "Flow saved.");
			_currentInstance.refreshFlowList();
			$.ajax({
				url : _currentInstance.basePath + "run/" + flowId,
				type : "POST",
				dataType : "json",
				contentType : "application/json",
				data : JSON.stringify({}),
				success : function(data, status) {
					HAFlow.showDialog("Run Flow", " Commited: " + data.commited
							+ "\n" + "Result: " + data.message);
				},
				error : function(request, status, error) {
					HAFlow.showDialog("Error",
							"An error occurred while running flow: " + error);
				}
			});
		},
		error : function(request, status, error) {
			HAFlow.showDialog("Error", "An error occurred while saving flow: "
					+ error);
		}
	});
};


HAFlow.Main.prototype.showRunHistory = function(flowId) {
	if( flowId == null){
		alert("No flow selected, please double click a flow!");
		return;
	}
	
	var found = false;
	var children = this.ui.bottomContainer.getChildren();	
	var i;
	for( i = 0; i < children.length; i++ ){
		var child = children[i];
		if( child.id == ("runHistoryPane_" + flowId)){
			alert("Run History Panel for " + flowId + " already opened!");
			this.ui.bottomContainer.selectChild(child);
			found = true;
			break;
		}
	}
	var _currentInstance = this;
	dojo.xhrGet({
		url :  _currentInstance.basePath + "runHistory/get/" + flowId,
		load : function(data, ioArgs){
			if( found == true){
				var contentPane = dijit.registry.byId("runHistoryPaneInline_" + flowId);
				contentPane.set('content', data);	
			}else {
				var contentPaneInner = new dijit.layout.ContentPane({
					id : "runHistoryPaneInline_" + flowId,
					title : "History_" + _currentInstance.flows[flowId].name,
					content : data,
					closable : true
				});
				var contentPane = new dijit.layout.ContentPane({
					id : "runHistoryPane_" + flowId,
					title : "History_" + _currentInstance.flows[flowId].name,
					content : contentPaneInner,
					closable : true
				});
				_currentInstance.ui.bottomContainer.addChild(contentPane);			
				_currentInstance.ui.bottomContainer.selectChild(contentPane);
			}
		},
		error : function(err, ioArgs){
			alert(err);
		}
	});
};

HAFlow.Main.prototype.saveFlowName = function(instance, flowId) {
	if (instance.flows[flowId]) {
		var value = $("#" + "flow_" + flowId + "_name").val();
		if (this.checkFlowName(instance, instance.flows[flowId].name, value)) {
			instance.flows[flowId].name = value;
			instance.getFlowBriefById(instance, flowId).name = value;
			var pane = dijit.byId("flowContainerPane_" + flowId);
			pane.title = value;
			instance.ui.centerContainer.removeChild(pane);
			instance.ui.centerContainer.addChild(pane);
			instance.ui.centerContainer.selectChild(pane);
			instance.flowListStore.remove(flowId);
			instance.flowListStore.put({
				id : instance.flows[flowId].id,
				name : instance.flows[flowId].name,
				node : true
			});
		} else {
			HAFlow.showDialog("Error", "Invalid flow name");
		}
	} else {
		HAFlow.showDialog("Error",
				"Please load the flow before saving flow metadata!");
	}
};

HAFlow.Main.prototype.saveNodeName = function(instance, flowId, nodeId) {
	var node = instance.getNodeById(instance, flowId, nodeId);
	var value = $("#" + "node_" + nodeId + "_name").val();
	if (instance.checkNodeName(instance, flowId, node.name, value)) {
		node.name = value;
		instance.paintFlow(flowId);
		instance.jsPlumb[flowId].repaintEverything();
	} else {
		HAFlow.showDialog("Error", "Invalid node name");
	}
};

HAFlow.Main.prototype.saveConfiguration = function(instance, flowId, nodeId) {
	var node = instance.getNodeById(instance, flowId, nodeId);
	var module = instance.getModuleById(instance, node.moduleId);
	var i;
	node.configurations = [];
	for (i = 0; i < module.configurations.length; i++) {
		var val = dijit.registry.byId(
				"flow_" + flowId + "_node_" + nodeId + "_"
						+ module.configurations[i].key).get("value");
		if (module.configurations[i].type != "BOOLEAN" && val != null
				&& val.match(module.configurations[i].pattern) == null) {
			HAFlow.showDialog("Error", "Invalid node configuration: "
					+ module.configurations[i].displayName);
			return;
		}
	}
	for (i = 0; i < module.configurations.length; i++) {
		console.log(module.configurations[i].displayName);
		node.configurations.push({
			key : module.configurations[i].key,
			value : dijit.registry.byId(
					"flow_" + flowId + "_node_" + nodeId + "_"
							+ module.configurations[i].key).get("value")
		});
	}

};
