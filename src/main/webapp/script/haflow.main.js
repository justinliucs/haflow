dojo.require("dojo.dom");
dojo.require("dojo.on");
dojo.require("dojo.json");
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
dojo.require("dijit.registry");
dojo.require("dojox.form.FileUploader");
var flow;

dojo.ready(function() {
	flow = new HAFlow.Main(new HAFlow.UI());
	flow.init();
});

HAFlow.Main = function(ui) {
	this.basePath = dojo.byId("basePath").value;
	this.ui = ui;
	this.rootPath = "hdfs://133.133.2.150:9000/user/root";
	this.hdfspath=null;
};

// Flow
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

HAFlow.Main.prototype.openoozie = function() {
	var _currentInstance = this;
	$
			.ajax({
				url : _currentInstance.basePath + "oozie/",
				type : "Post",
				success : function(data, status) {
					var contentPane = new dijit.layout.ContentPane(
							{
								// id : "oozie",
								title : "oozie",
								content : data,
								closable : true,
								onClose : function() {
									_currentInstance.ui.mainoozieContainer
											.addChild(_currentInstance.ui.leadingContainer);
									_currentInstance.ui.mainoozieContainer
											.addChild(_currentInstance.ui.trailingContainer);
									_currentInstance.ui.mainoozieContainer
											.addChild(_currentInstance.ui.centerContainerParent);
									_currentInstance.ui.mainoozieContainer
											.removeChild(contentPaneContainer);
								}
							});
					var contentPaneContainer = new dijit.layout.TabContainer({
						// id : "ooziecontent",
						region : "center",
						splitter : "true",
					});

					_currentInstance.ui.mainoozieContainer
							.removeChild(_currentInstance.ui.leadingContainer);
					_currentInstance.ui.mainoozieContainer
							.removeChild(_currentInstance.ui.trailingContainer);
					_currentInstance.ui.mainoozieContainer
							.removeChild(_currentInstance.ui.centerContainerParent);
					contentPaneContainer.addChild(contentPane);
					contentPaneContainer.selectChild(contentPane);
					contentPaneContainer.startup();
					_currentInstance.ui.mainoozieContainer
							.addChild(contentPaneContainer);

				},
				error : function(request, status, error) {
					HAFlow.showDialog("Error",
							"An error occurred while opening: " + error);
				}
			});
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

// Flow Helper
HAFlow.Main.prototype.refreshFlowList = function() {
	var _currentInstance = this;
	$.ajax({
		url : this.basePath + "flow",
		type : "GET",
		cache : false,
		dataType : "json",
		success : function(data, status) {
			_currentInstance.flowList = data;
		},
		error : function(request, status, error) {
			HAFlow.showDialog("Error",
					"An error occurred while refreshing flow list: " + error);
		}
	});
};

HAFlow.Main.prototype.getFlowBriefById = function(instance, flowId) {
	var i;
	for (i = 0; i < instance.flowList.flows.length; i++) {
		if (instance.flowList.flows[i].id == flowId) {
			return instance.flowList.flows[i];
		}
	}
	return null;
};

HAFlow.Main.prototype.getNodeById = function(instance, flowId, nodeId) {
	var i;
	for (i = 0; i < instance.flows[flowId].nodes.length; i++) {
		if (instance.flows[flowId].nodes[i].id == nodeId) {
			return instance.flows[flowId].nodes[i];
		}
	}
	return null;
};

HAFlow.Main.prototype.getModuleById = function(instance, moduleId) {
	var i;
	for (i = 0; i < instance.moduleList.modules.length; i++) {
		if (instance.moduleList.modules[i].id == moduleId) {
			return instance.moduleList.modules[i];
		}
	}
	return null;
};

HAFlow.Main.prototype.getConfigurationValue = function(instance, flowId,
		nodeId, key) {
	var node = instance.getNodeById(instance, flowId, nodeId);
	var i;
	for (i = 0; i < node.configurations.length; i++) {
		if (node.configurations[i].key == key) {
			return node.configurations[i].value;
		}
	}
	return "";
};

HAFlow.Main.prototype.checkNodeName = function(instance, flowId, oldName,
		newName) {
	var i;
	if (oldName == newName) {
		return true;
	}
	var regex = /^[a-zA-Z_][a-zA-Z_0-9]{0,38}$/;
	if (!regex.test(newName)) {
		return false;
	}
	for (i = 0; i < instance.flows[flowId].nodes.length; i++) {
		if (newName == instance.flows[flowId].nodes[i].name) {
			return false;
		}
	}
	return true;
};

HAFlow.Main.prototype.checkFlowName = function(instance, oldName, newName) {
	var i;
	if (oldName == newName) {
		return true;
	}
	var regex = /^[a-zA-Z_][a-zA-Z_0-9]{0,38}$/;
	if (!regex.test(newName)) {
		return false;
	}
	for (i = 0; i < instance.flows.length; i++) {
		if (newName == instance.flows[i].name) {
			return false;
		}
	}
	return true;
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

HAFlow.Main.prototype.newConnection = function(flowId, source, sourceEndpoint,
		target, targetEndpoint) {
	var newConnection = {};
	newConnection["id"] = HAFlow.generateUUID();
	newConnection["flowId"] = flowId;
	newConnection["sourceNodeId"] = source;
	newConnection["sourceEndpoint"] = sourceEndpoint;
	newConnection["targetNodeId"] = target;
	newConnection["targetEndpoint"] = targetEndpoint;
	return newConnection;
};

HAFlow.Main.prototype.deleteConnection = function(instance, flowId, info) {
	var source = info.sourceId.replace("node_", "");
	var target = info.targetId.replace("node_", "");
	var i;
	var needToDelete = false;
	do {
		needToDelete = false;
		for (i = 0; i < instance.flows[flowId].edges.length; i++) {
			if (instance.flows[flowId].edges[i].sourceNodeId == source
					&& instance.flows[flowId].edges[i].targetNodeId == target) {
				needToDelete = true;
				break;
			}
		}
		if (needToDelete) {
			instance.flows[flowId].edges.splice(i, 1);
		}
	} while (needToDelete);
	instance.jsPlumb[flowId].detach(info);
};

HAFlow.Main.prototype.deleteNode = function(instance, flowId, nodeId) {
	var i;
	var needToDelete = false;
	do {
		needToDelete = false;
		for (i = 0; i < instance.flows[flowId].edges.length; i++) {
			if (instance.flows[flowId].edges[i].sourceNodeId == nodeId
					|| instance.flows[flowId].edges[i].targetNodeId == nodeId) {
				needToDelete = true;
				break;
			}
		}
		if (needToDelete) {
			instance.flows[flowId].edges.splice(i, 1);
		}
	} while (needToDelete);
	do {
		needToDelete = false;
		for (i = 0; i < instance.flows[flowId].nodes.length; i++) {
			if (instance.flows[flowId].nodes[i].id == nodeId) {
				needToDelete = true;
				break;
			}
		}
		if (needToDelete) {
			instance.flows[flowId].nodes.splice(i, 1);
		}
	} while (needToDelete);
	instance.paintFlow(flowId);
};

HAFlow.Main.prototype.doAddModule = function(instance, flowId, moduleId, left,
		top) {
	var currentNewNodeNumber = -1;
	var i;
	var j;
	for (i = 0; i < instance.flows[flowId].nodes.length; i++) {
		var pattern = /^NewNode(\d+)$/;
		var matches = pattern.exec(instance.flows[flowId].nodes[i].name);
		for (j = 0; j < matches.length; j++) {
			if (parseInt(matches[j]) > currentNewNodeNumber) {
				currentNewNodeNumber = parseInt(matches[j]);
			}
		}
	}
	currentNewNodeNumber++;
	var newNode = {};
	var id = HAFlow.generateUUID();
	newNode["id"] = id;
	newNode["flowId"] = flowId;
	newNode["moduleId"] = moduleId;
	newNode["name"] = "NewNode" + currentNewNodeNumber;
	newNode["position"] = {};
	newNode.position["left"] = left;
	newNode.position["top"] = top;
	newNode["configurations"] = [];
	instance.flows[flowId].nodes.push(newNode);
};

// HDFS
HAFlow.Main.prototype.getHdfsFile = function(path, fileName) {
	_currentInstance=this;
	$.ajax({
		url : this.basePath + "hdfs/file",
		type : "GET",
		dataType : "json",
		data : {
			path : path,
			fileName : fileName
		},
		success : function(data, status) {
			var contentPane = new dijit.layout.ContentPane({
				id : data.path,
				title : data.filename,
				content : data.content,
				closable : true,
			});
			_currentInstance.ui.centerContainer.addChild(contentPane);
			_currentInstance.ui.centerContainer.selectChild(dijit
					.byId(data.path));
		},
		error : function(request, status, error) {
			HAFlow.showDialog("Error",
					"An error occurred while reading hdfs file: " + error);
		}
	});
};

HAFlow.Main.prototype.getHdfsFileList = function(path) {
	var _currentInstance = this;
	$.ajax({
		url : this.basePath + "hdfs/list",
		type : "GET",
		dataType : "json",
		data : {
			path : path
		},
		success : function(data, status) {
			_currentInstance.refreshHdfsFileList(_currentInstance, path, data);
		},
		error : function(request, status, error) {
			HAFlow.showDialog("Error",
					"An error occurred while loading flow list: " + error);
		}
	});
};

HAFlow.Main.prototype.refreshHdfsFileList = function(instance, parentPath, data) {
	var i;
	for (i = 0; i < data.files.length; i++) {
		this.hdfsFileListStore.put({
			id:parentPath + "/" + data.files[i].name,
			name : data.files[i].name,
			isDirectory : data.files[i].directory,
			path : parentPath + "/" + data.files[i].name,
			parentPath : parentPath
		});
		if (data.files[i].directory) {
			instance.getHdfsFileList(parentPath + "/" + data.files[i].name);
		}
	}
};

// Paint Helper
HAFlow.Main.prototype.addEndpoints = function(instance, flowId, nodeId, module,
		sourceEndpoint, targetEndpoint) {
	var k = 0;
	for ( var i = 0; i < module.outputs.length; i++, k++) {
		var sourceId = nodeId + "_" + module.outputs[i].name;
		instance.jsPlumb[flowId].allSourceEndpoints
				.push(instance.jsPlumb[flowId].addEndpoint(nodeId,
						sourceEndpoint, {
							anchor : [ 1,
									1 / (module.outputs.length + 1) * (i + 1),
									1, 0 ],
							uuid : sourceId,
							overlays : [ [ "Label", {
								location : [ 0.5, -0.5 ],
								label : module.outputs[i].name
							} ] ]
						}));
	}
	k = 0;
	for ( var j = 0; j < module.inputs.length; j++, k++) {
		var targetId = nodeId + "_" + module.inputs[j].name;
		instance.jsPlumb[flowId].allTargetEndpoints
				.push(instance.jsPlumb[flowId].addEndpoint(nodeId,
						targetEndpoint, {
							anchor : [ 0,
									1 / (module.inputs.length + 1) * (j + 1),
									-1, 0 ],
							uuid : targetId,
							overlays : [ [ "Label", {
								location : [ 0.5, -0.5 ],
								label : module.inputs[j].name
							} ] ]
						}));
	}
};

// Initialize
HAFlow.Main.prototype.init = function() {
	this.flows = {};
	this.jsPlumb = {};

	this.initUserInterface();
	this.initFlowContainer();
	this.initData();
};

HAFlow.Main.prototype.initNodes = function(flowId) {
	var _currentInstance = this;
	this.jsPlumb[flowId].draggable($(".node"), {
		containment : "#" + "flowContainer_" + flowId,
		stop : function(event, ui) {
			_currentInstance.onDropNode(_currentInstance, flowId, event, ui);
		}
	});
	var i;
	for (i = 0; i < this.flows[flowId].nodes.length; i++) {
		var nodeId = "node_" + this.flows[flowId].nodes[i].id;
		var sourceEndpoint = {
			paintStyle : {
				strokeStyle : "#225588",
				fillStyle : "transparent",
				radius : 7,
			},
			isSource : true,
			connector : [ "Flowchart", {} ],
			connectorStyle : {
				strokeStyle : "#225588",
				lineWidth : 3
			}
		};
		var targetEndpoint = {
			endpoint : "Dot",
			isTarget : true,
			maxConnections : -1,
		};

		this.jsPlumb[flowId].allSourceEndpoints = [];
		this.jsPlumb[flowId].allTargetEndpoints = [];
		var node = this.getNodeById(this, flowId,
				this.flows[flowId].nodes[i].id);
		var module = this.getModuleById(this, node.moduleId);

		this.addEndpoints(this, flowId, nodeId, module, sourceEndpoint,
				targetEndpoint);
	}
};

HAFlow.Main.prototype.initData = function() {
	this.initFlowListData();
	this.getHdfsFileList(this.rootPath);
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

HAFlow.Main.prototype.initUserInterface = function() {
	this.ui.init();
	this.initUserInterfaceId();
	this.initMainMenu();
	this.initToolbar();
	this.initBottomTabs();
	this.initFlowList();
	this.initHdfsFileList();
	this.ui.refresh();
};

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
	this.toolbar.removeFlowButton = new dijit.form.Button({
		id : "toolbar_removeFlow",
		label : "Remove Flow",
		showLabel : false,
		iconClass : "dijitEditorIcon dijitEditorIconDelete"
	});
	this.toolbar.runFlowButton = new dijit.form.Button({
		id : "toolbar_runFlow",
		label : "Run Flow",
		showLabel : false,
		iconClass : "dijitEditorIcon dijitEditorIconTabIndent"
	});
	this.toolbar.toolbar.addChild(this.toolbar.newFlowButton);
	this.toolbar.toolbar.addChild(this.toolbar.saveFlowButton);
	this.toolbar.toolbar.addChild(this.toolbar.removeFlowButton);
	this.toolbar.toolbar.addChild(this.toolbar.runFlowButton);
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
	this.ui.mainMenu.addChild(this.toolbar.toolbar);
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
		disabled : true
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
		id : "oozieMenu"
	});
	this.menu.oozieMenu.openMenuItem = new dijit.MenuItem({
		id : "openMenuItem",
		label : "Open"
	});
	this.menu.oozieMenu.closeMenuItem = new dijit.MenuItem({
		id : "closeMenuItem",
		label : "Close",
		disabled : true
	});
	this.menu.oozieMenu.addChild(this.menu.oozieMenu.openMenuItem);
	this.menu.oozieMenu.addChild(this.menu.oozieMenu.closeMenuItem);
	this.menu.oozieMenu.startup();

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
		label : "oozie",
		popup : this.menu.oozieMenu
	}));

	var _currentInstance = this;
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
	dojo.connect(this.menu.oozieMenu.openMenuItem, "onClick", function(event) {
		_currentInstance.openoozie();
	});

	dojo.connect(this.menu.runMenu.runHistoryMenuItem, "onClick", function(event){
		_currentInstance.showRunHistory(_currentInstance.currentFlowId);
	});
};

HAFlow.Main.prototype.initBottomTabs = function() {
	this.initInformationTab();
	this.initConfigurationTab();
	this.initConsoleTab();
	this.initLogTab();
};

HAFlow.Main.prototype.initInformationTab = function() {
	var informationContentPane = (new dijit.layout.ContentPane({
		id : this.informationContainerId,
		title : "Information"
	}));
	this.ui.bottomContainer.addChild(informationContentPane);
};

HAFlow.Main.prototype.initConsoleTab = function() {
	var consoleContentPane = new dijit.layout.ContentPane({
		id : this.consoleContainerId,
		title : "Console"
	});
	this.ui.bottomContainer.addChild(consoleContentPane);
};

HAFlow.Main.prototype.initLogTab = function() {
	var logContentPane = new dijit.layout.ContentPane({
		id : this.logContainerId,
		title : "Log"
	});
	this.ui.bottomContainer.addChild(logContentPane);
};

HAFlow.Main.prototype.initConfigurationTab = function() {
	var configurationContentPane = new dijit.layout.ContentPane({
		id : this.configurationContainerId,
		title : "Configuration"
	});
	this.ui.bottomContainer.addChild(configurationContentPane);
};

HAFlow.Main.prototype.initFlowList = function() {
	var flowListContentPane = new dijit.layout.ContentPane({
		id : this.flowListContainerId,
		title : "Flows"
	});
	this.ui.leadingContainer.addChild(flowListContentPane);
	this.initFlowListStore();
	this.initFlowListTree();
};

HAFlow.Main.prototype.initHdfsFileList = function() {
	var hdfsFileListContentPane = new dijit.layout.ContentPane({
		id : this.hdfsFileListContainerId,
		title : "HDFS"
	});
	this.ui.leadingContainer.addChild(hdfsFileListContentPane);
	this.initHdfsFileListStore();
	this.initHdfsFileListTree();
};

HAFlow.Main.prototype.initHdfsFileListStore = function() {
	this.hdfsFileListStore = new dojo.store.Observable(new dojo.store.Memory({
		data : [ {
			id : "root",
			name : "Root(" + this.rootPath + ")",
			isDirectory : true,
			path : this.rootPath
		} ],
		getChildren : function(object) {
			return this.query({
				parentPath : object.path
			});
		}
	}));
};

HAFlow.Main.prototype.initHdfsFileListTree = function() {
	var treeModel = new dijit.tree.ObjectStoreModel({
		store : this.hdfsFileListStore,
		query : {
			id : "root"
		},
		mayHaveChildren : function(item) {
			return item.isDirectory;
		}
	});
	var tree = new dijit.Tree({
		model : treeModel
	}, dojo.create("div", {
		id : this.hdfsFileListTreeId,
	}, this.hdfsFileListContainerId));
	var _currentInstance = this;

	this.menu.treeMenu = new dijit.Menu({
		id : "treeMenu",
		targetNodeIds : [ _currentInstance.hdfsFileListTreeId ],
		selector : ".dijitTreeNode"
	});
	this.menu.treeMenu.DownloadMenuItem = new dijit.MenuItem({
		id : "DownloadMenuItem",
		label : "Download from Hdfs"
	});
	this.menu.treeMenu.CreateMenuItem = new dijit.MenuItem({
		id : "CreateMenuItem",
		label : "Create new directory"
	});
	this.menu.treeMenu.DeleteMenuItem = new dijit.MenuItem({
		id : "DeleteMenuItem",
		label : "Delete"
	});

	this.menu.treeMenu.UploadMenuItem = new dijit.MenuItem({
		id : "UploadMenuItem",
		label : "Upload files to Hdfs"
	});
	this.menu.treeMenu.addChild(this.menu.treeMenu.DownloadMenuItem);
	this.menu.treeMenu.addChild(this.menu.treeMenu.CreateMenuItem);
	this.menu.treeMenu.addChild(this.menu.treeMenu.DeleteMenuItem);
	this.menu.treeMenu.addChild(this.menu.treeMenu.UploadMenuItem);

	dojo.connect(
					this.menu.treeMenu.UploadMenuItem,
					"onClick",
					function() {
						var tn = dijit.byNode(this.getParent().currentTarget);
						var path=tn.item.path;
						alert(path);
						var isDirectory=tn.item.isDirectory;
						if(isDirectory==true)
							{
							var dialog = new dijit.Dialog({
								title : "upload",
								content : "<html><body><form id=\"hdfsfilepath\" action=\"hdfs/upload\" enctype=\"multipart/form-data\" method=\"post\">"
									+ "<input type=\"file\" name=\"file\" />"
									+ " <button type=\"button\" id=\"upload_btn\">submit</button></form><div id=\"debug\"><div></body></html>",
								style : "width:400px"
							});
							dialog.show();
							dojo.connect(dojo.byId("upload_btn"),"onclick",function(){
	//						alert("before send. url:"+_currentInstance.basePath+"/hdfs/upload");
							alert(path);
							dojo.io.iframe.send({
							    form: "hdfsfilepath", //某个form元素包含本地文件路径
							    handleAs: "xml", //服务器将返回html页面
							    url:_currentInstance.basePath+"/hdfs/upload?remotePath="+path,
							    load: function(response){
								    	var success = response.getElementsByTagName("success")[0].childNodes[0].nodeValue;
								    	var filename = response.getElementsByTagName("filename")[0].childNodes[0].nodeValue;
								    	if(success=="true")
								    		{
								    		HAFlow.showDialog("Upload", "Upload scceess.");
									    	_currentInstance.hdfsFileListStore.put({
									    		id:path+"/"+filename,
									    		name:filename,
									    		isDirectory:false,
									    		path:path+"/"+filename,
									    		parentPath:path,
									    	});	
								    		}								    		
								    	else
								    		HAFlow.showDialog("Upload", "Upload failure.");		
							    }, //提交成功
							    error: function(e){
									HAFlow.showDialog("Upload", "Upload failure.");
							    }//提交失败
							});
							dialog.destroy();
							});
							}
						else
							HAFlow.showDialog("Upload", "It's a file.Can't upload to it.");
						

					});
	dojo.connect(
			this.menu.treeMenu.DeleteMenuItem,
			"onClick",
			function() {
				var tn = dijit.byNode(this.getParent().currentTarget);
				var path=tn.item.path;
				var isDirectory=tn.item.isDirectory;
				if(isDirectory==true)
				$.ajax({
					url : _currentInstance.basePath+"hdfs/deletedirectory?remotepath="+path,
					type : "GET",
					dataType : "json",
					contentType : "application/json",
					data : JSON.stringify({}),
					success : function(data, status) {
						if(data.success=true)
							{
							 HAFlow.showDialog("Remove HdfsFile Directory", "HdfsFile Directory removed.");
							}
						else
							HAFlow.showDialog("Remove HdfsFile Directory", "HdfsFile Directory can't be removed.");
						var file_item=_currentInstance.hdfsFileListStore.query({parentPath:path});
						var i;
						for(i=0;i<file_item.length;i++)
							{
							_currentInstance.hdfsFileListStore.remove(file_item[i].id);
							}
						var directory_item=_currentInstance.hdfsFileListStore.query({path:path});
						_currentInstance.hdfsFileListStore.remove(directory_item[0].id);
					},
					error : function(request, status, error) {
						HAFlow.showDialog("Error",
								"An error occurred while removing HdfsFile Directory: " + error);
					}
				});
				else
					$.ajax({
						url : _currentInstance.basePath+"hdfs/deletefile?remotepath="+path,
						type : "GET",
						dataType : "json",
						contentType : "application/json",
						data : JSON.stringify({}),
						success : function(data, status) {
							if(data.success=true)
								{
								 HAFlow.showDialog("Remove HdfsFile", "HdfsFile removed.");
								}
							else
								HAFlow.showDialog("Remove HdfsFile", "HdfsFile can't be removed.");
							var item=_currentInstance.hdfsFileListStore.query({path:path});
							_currentInstance.hdfsFileListStore.remove(item[0].id);
						},
						error : function(request, status, error) {
							HAFlow.showDialog("Error",
									"An error occurred while removing HdfsFile: " + error);
						}
					});

			});
	dojo.connect(
			this.menu.treeMenu.CreateMenuItem,
			"onClick",
			function() {
				var tn = dijit.byNode(this.getParent().currentTarget);
				var path=tn.item.path;
				var isDirectory=tn.item.isDirectory;
				if(isDirectory==true)
					{
					HAFlow
					.showDialog(
							"create new directory",
							"<html><body><form id=\"hdfsfilepath\" method=\"post\">"
									+ "new name:<input type=\"text\" id=\"directoryname\" name=\"directoryname\"> </input>"
									+ " <button type=\"button\" id=\"create_btn\">submit</button></form></body></html>");
					dojo.connect(dojo.byId("create_btn"),"onclick",function(){	
					$.ajax({
						url : _currentInstance.basePath+"hdfs/createdirectory?remotepath="+path+"&directoryname="+dojo.byId("directoryname").value,
						type : "GET",
						dataType : "json",
						contentType : "application/json",
						data : JSON.stringify({}),
						success : function(data, status) {
							if(data.success=true)
								{
								 HAFlow.showDialog("Create HdfsFile Directory", "HdfsFile Directory created.");
							    	_currentInstance.hdfsFileListStore.put({
							    		id:path+"/"+data.directoryname,
							    		name:data.directoryname,
							    		isDirectory:true,
							    		path:path+"/"+data.directoryname,
							    		parentPath:path,
							    	});	
							    	
								}
							else
								HAFlow.showDialog("Create HdfsFile Directory", "HdfsFile Directory can't be created.");
						},
						error : function(request, status, error) {
							HAFlow.showDialog("Error",
									"An error occurred while removing HdfsFile Directory: " + error);
						}
						});
					});
					}
				else
					{
					HAFlow.showDialog("Create HdfsFile Directory", "It's a file.HdfsFile Directory can't be created in it.");
					}
				
			});
	dojo.connect(
			this.menu.treeMenu.DownloadMenuItem,
			"onClick",
			function() {
				var tn = dijit.byNode(this.getParent().currentTarget);
				var path=tn.item.path;
				var name=tn.item.name;
				var isDirectory=tn.item.isDirectory;
				if(isDirectory==false)
				{
			       var form = $("<form>");   //定义一个form表单

			       form.attr('style','display:none');   //在form表单中添加查询参数

			       form.attr('target','');

			       form.attr('method','post');

			       form.attr('action',"/haflow/hdfs/download");

			       form.attr('id',"form1");

			       var input1 = $('<input>'); 
			       input1.attr('id','input1'); 

			       input1.attr('type','hidden'); 

			       input1.attr('name','remotepath'); 

			       input1.attr('value',path); 

			       var input2 = $('<input>'); 

			       input2.attr('type','hidden'); 

			       input2.attr('name','filename'); 

			       input2.attr('value',name); 

			       $('body').append(form);  //将表单放置在web中

			       form.append(input1);   //将查询参数控件提交到表单上
			       form.append(input2); 
			       form.submit();   //表单提交
					$("#form1").ajaxForm(function(){
						HAFlow.showDialog("Download", "Succeed to download it.");
					});
				}
				else
					{
					
					HAFlow.showDialog("Download", "It's a directory.Can't download it.");
					}
				});
	this.menu.treeMenu.startup();
	tree.on("click", function(item) {
		if (item.directory == true) {

		}
		else{
			hdfspath=item.path;
		}
	}, true);
	tree.on("dblclick", function(item) {
		if (item.isDirectory == true) {

		} else {
			_currentInstance.getHdfsFile(item.parentPath, item.name);
		}
	}, true);

	tree.startup();
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

	tree.on("click", function(item) {
		if (item.node == true) {
			_currentInstance.onFlowClicked(_currentInstance, item.id);

		}

	});
	tree.on("dblclick", function(item) {
		if (item.node == true) {
			_currentInstance.loadFlow(item.id);
		}
	}, true);

	tree.startup();
};

HAFlow.Main.prototype.initFlowContainer = function() {
	var _currentInstance = this;
	this.ui.centerContainer.watch("selectedChildWidget", function(name, from,
			to) {
		var flowId = to.domNode.id.replace("flowContainerPane_", "");
		_currentInstance.currentFlowId = flowId;
		_currentInstance.setupDroppable(flowId);
		_currentInstance.paintFlow(flowId);
	});
};

HAFlow.Main.prototype.initJsPlumb = function(flowId) {
	this.jsPlumb[flowId] = jsPlumb.getInstance();
	this.jsPlumb[flowId].reset();
	this.jsPlumb[flowId].importDefaults({
		DragOptions : {
			cursor : 'pointer',
			zIndex : 2000
		},
		Endpoints : [ [ "Dot", {
			radius : 8
		} ], [ "Dot", {
			radius : 8
		} ] ],
		ConnectionOverlays : [ [ "Arrow", {
			location : -40
		} ] ]
	});
};

HAFlow.Main.prototype.setupDroppable = function(flowId) {
	$(".module").draggable({
		appendTo : "#" + "flowContainer_" + flowId,
		revert : "invalid",
		helper : "clone"
	});
	var _currentInstance = this;
	$("#" + "flowContainer_" + flowId).droppable(
			{
				accept : ".module",
				drop : function(event, ui) {
					_currentInstance.onModuleAdded(_currentInstance, flowId,
							event, ui);
				}
			});
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

HAFlow.Main.prototype.drawLists = function(instance) {
	instance.paintModuleList();
	instance.buildFlowListTree();
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

HAFlow.Main.prototype.paintFlow = function(flowId) {
	this.initJsPlumb(flowId);
	this.paintNodes(flowId);
	this.initNodes(flowId);
	this.paintEdges(flowId);
	this.bindJsPlumbEvents(flowId);
	this.bindFunctions(flowId);
	this.jsPlumb[flowId].repaintEverything();
};

HAFlow.Main.prototype.paintNodes = function(flowId) {
	var text = "";
	for ( var i = 0; i < this.flows[flowId].nodes.length; i++) {
		var moduleName = this.getModuleById(this,
				this.flows[flowId].nodes[i].moduleId).name;
		text += "<div class=\"node" + "\" style=\"left:"
				+ this.flows[flowId].nodes[i].position.left + "px; top:"
				+ this.flows[flowId].nodes[i].position.top + "px;";
		// TODO:
		if (moduleName == "Start") {
			text += "background:#C0C0C0";
		}
		if (moduleName == "End") {
			text += "background:#B8860B";
		}
		if (moduleName == "Kill") {
			text += "background:#DC143C";
		}
		text += "\" id=\"node_" + this.flows[flowId].nodes[i].id + "\">"
				+ "<div>" + this.flows[flowId].nodes[i].name + "</div><div>"
				+ "(" + moduleName + ")</div>" + "</div>";
	}
	$("#" + "flowContainer_" + flowId).html(text);
};

HAFlow.Main.prototype.paintEdges = function(flowId) {
	for ( var i = 0; i < this.flows[flowId].edges.length; i++) {
		this.jsPlumb[flowId].connect({
			uuids : [
					"node_" + this.flows[flowId].edges[i].sourceNodeId + "_"
							+ this.flows[flowId].edges[i].sourceEndpoint,
					"node_" + this.flows[flowId].edges[i].targetNodeId + "_"
							+ this.flows[flowId].edges[i].targetEndpoint ],
			detachable : false
		});
	}
};

HAFlow.Main.prototype.bindJsPlumbEvents = function(flowId) {
	var _currentInstance = this;
	this.jsPlumb[flowId].bind("click", function(info) {
		_currentInstance.onConnectionClicked(_currentInstance, flowId, info);
	});
	this.jsPlumb[flowId].bind("connection", function(info) {
		_currentInstance.onConnectionCreated(_currentInstance, flowId, info);
	});

};

HAFlow.Main.prototype.bindFunctions = function(flowId) {
	var _currentInstance = this;
	$(".node").bind("click", function() {
		var nodeId = $(this).attr("id").replace("node_", "");
		_currentInstance.onNodeClicked(_currentInstance, flowId, nodeId);
	});
	$(".module").bind("click", function() {
		var moduleId = $(this).attr("id").replace("module_", "");
		_currentInstance.onModuleClicked(_currentInstance, flowId, moduleId);
	});
};

// Event Handler
HAFlow.Main.prototype.onFlowClicked = function(instance, flowId) {
	var flowBrief = instance.getFlowBriefById(instance, flowId);
	var text = "";
	text += "<div class=\"configuration\">";
	text += "<div class=\"configuration-content\"><strong>Flow Info:</strong></div>";
	text += "<div class=\"configuration-content\"><span><strong>Id:</strong> "
			+ flowBrief.id + "</span></div>";
	text += "<div class=\"configuration-content\"><span><strong>Name:</strong></span>";
	text += "<span id=\"flow_name_text_box\" class=\"configuration-content\"></span></div>";
	text += "<div id=\"save_flow_name_button\" class=\"configuration-content\"></div>";
	text += "</div>";
	$("#" + instance.informationContainerId).html(text);
	if (dijit.byId("flow_" + flowBrief.id + "_name") != null) {
		dijit.registry.remove("flow_" + flowBrief.id + "_name");
	}
	var flowNameTextBox = new dijit.form.TextBox({
		id : "flow_" + flowBrief.id + "_name",
		value : flowBrief.name,
		style : "width:600px;"
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

HAFlow.Main.prototype.onModuleClicked = function(instance, flowId, moduleId) {
	var text = "";
	var i;
	for (i = 0; i < instance.moduleList.modules.length; i++) {
		if (moduleId == instance.moduleList.modules[i].id) {
			break;
		}
	}
	text += "<div class=\"configuration\"><div class=\"configuration-content\">"
			+ "<span><strong>Name:</strong> "
			+ instance.moduleList.modules[i].name + ".</span></div></div>";
	$("#" + instance.informationContainerId).html(text);
};

HAFlow.Main.prototype.onNodeClicked = function(instance, flowId, nodeId) {
	var node = instance.getNodeById(instance, flowId, nodeId);
	var module = instance.getModuleById(instance, node.moduleId);
	var text = "";
	text += "<div class=\"configuration\">";
	text += "<div class=\"configuration-content\"><span><strong>Node Id:</strong> "
			+ node.id + "</span></div>";
	text += "<div class=\"configuration-content\"><span><strong>Flow:</strong> "
			+ instance.flows[node.flowId].name + "</span></div>";
	text += "<div class=\"configuration-content\"><span><strong>Module:</strong> "
			+ module.name + "</span></div>";
	text += "<div class=\"configuration-content\">";
	text += "<span><strong>Name:</strong> </span>";
	text += "<span id=\"node_name_text_box\" class=\"configuration-content\"></span>";
	text += "<div id=\"save_node_name_button\" class=\"configuration-content\"></div>";
	text += "</div>";
	text += "<div class=\"configuration-content\"><strong>Delete?</strong></div>";
	text += "<div id=\"delete_node_button\" class=\"configuration-content\"></div>";
	text += "</div>";
	$("#" + instance.informationContainerId).html(text);

	if (dijit.byId("node_" + nodeId + "_name") != null) {
		dijit.registry.remove("node_" + nodeId + "_name");
	}
	var nodeNameTextBox = new dijit.form.TextBox({
		id : "node_" + nodeId + "_name",
		value : node.name,
		style : "width:600px;"
	});
	nodeNameTextBox.placeAt(dojo.byId("node_name_text_box"));
	nodeNameTextBox.startup();

	var saveNodeNameButton = new dijit.form.Button({
		label : "Save Node Name",
		onClick : function() {
			instance.saveNodeName(instance, flowId, nodeId);
		}
	});
	saveNodeNameButton.placeAt(dojo.byId("save_node_name_button"));
	saveNodeNameButton.startup();

	var deleteNodeButton = new dijit.form.Button({
		label : "Delete Node",
		onClick : function() {
			instance.deleteNode(instance, flowId, nodeId);
		}
	});
	deleteNodeButton.placeAt(dojo.byId("delete_node_button"));
	deleteNodeButton.startup();

	var form = "";
	form += "<div class=\"configuration\">";
	form += "<div class=\"configuration-content\"><strong>Configuration:</strong></div>";
	var i;
	for (i = 0; i < module.configurations.length; i++) {
		var textBoxId = "flow_" + flowId + "_node_" + nodeId + "_"
				+ module.configurations[i].key;
		var divId = textBoxId + "_container";
		var hdfspathButtonId=textBoxId+"_hdfspathButton";
		form += "<div class=\"configuration-content\">";
		if (module.configurations[i].type == "BOOLEAN") {
			form += "<div class=\"configuration-content\"><span><strong>"
					+ module.configurations[i].displayName
					+ "</strong></span><span id=\"" + divId
					+ "\" class=\"configuration-content\"></span></div>";
		} else {
			form += ("<span><strong>" + module.configurations[i].displayName + "</strong></span>");
			form += "<div class=\"configuration-content\"><span id=\"" + divId
					+ "\" class=\"configuration-content\"></span><span id=\""+hdfspathButtonId+"\" class=\"configuration-content\"></div>";
		}
		form += "</div>";
	}
	form += "<div class=\"configuration-content\" id=\"save_configuration_button\"></div>";
	form += "</div>";
	$("#" + instance.configurationContainerId).html(form);
	for (i = 0; i < module.configurations.length; i++) {
		var textBoxId = "flow_" + flowId + "_node_" + nodeId + "_"
				+ module.configurations[i].key;
		var divId = textBoxId + "_container";
		var hdfspathButtonId=textBoxId+"_hdfspathButton";
		if (dijit.byId(textBoxId) != null) {
			dijit.registry.remove(textBoxId);
		}
		if (module.configurations[i].type == "BOOLEAN") {
			var configtype_true = new dijit.form.CheckBox({
				id : textBoxId,
				checked : (instance.getConfigurationValue(instance, flowId,
						nodeId, module.configurations[i].key) == "on") ? true
						: false
			});
			configtype_true.placeAt(dojo.byId(divId));
			configtype_true.startup();
		} else {
			var configurationTextBox = new dijit.form.TextBox({
				id : textBoxId+"_textbox",
				value : instance.getConfigurationValue(instance, flowId,
						nodeId, module.configurations[i].key),
				style : "width:600px;"
			});
			configurationTextBox.placeAt(dojo.byId(divId));
			configurationTextBox.startup();			
			var hdfspathButton = new dijit.form.Button({
				id:textBoxId,
				label : "Hdfs Path",
				onClick : function() {
					dijit.byId(this.id+"_textbox").set("value",hdfspath);				
				}
			});
			hdfspathButton.placeAt(dojo.byId(hdfspathButtonId));
			hdfspathButton.startup();
		}
	}

	var saveConfigurationButton = new dijit.form.Button({
		label : "Save Configuration",
		onClick : function() {
			instance.saveConfiguration(instance, flowId, nodeId);
		}
	});
	saveConfigurationButton.placeAt(dojo.byId("save_configuration_button"));
	saveConfigurationButton.startup();
};

HAFlow.Main.prototype.onConnectionClicked = function(instance, flowId, info) {
	var source = info.sourceId.replace("node_", "");
	var sourceEndpoint = info.endpoints[0].overlays[0].getLabel();
	var target = info.targetId.replace("node_", "");
	var targetEndpoint = info.endpoints[1].overlays[0].getLabel();
	var sourceNode = instance.getNodeById(instance, flowId, source);
	var targetNode = instance.getNodeById(instance, flowId, target);

	var text = "";
	text += "<div class=\"configuration\">";
	text += "<div class=\"configuration-content\"><span><strong>From: "
			+ sourceNode.name + "." + sourceEndpoint + "</strong></span></div>"
			+ "<div class=\"configuration-content\"><span><strong>To: "
			+ targetNode.name + "." + targetEndpoint + "</strong></span></div>";
	text += "<div class=\"configuration-content\">Delete?</div>";
	text += "<div class=\"configuration-content\" id=\"delete_connection_button\"></div>";
	text += "</div>";
	$("#" + instance.informationContainerId).html(text);
	var button = new dijit.form.Button({
		label : "Delete Connection",
		onClick : function() {
			instance.deleteConnection(instance, flowId, info);
		}
	});
	button.placeAt(dojo.byId("delete_connection_button"));
	button.startup();
};

HAFlow.Main.prototype.onConnectionCreated = function(instance, flowId, info) {
	var source = info.sourceId.replace("node_", "");
	var sourceEndpoint = info.sourceEndpoint.overlays[0].getLabel();
	var target = info.targetId.replace("node_", "");
	var targetEndpoint = info.targetEndpoint.overlays[0].getLabel();
	var exist = false;
	var illegal = false;
	for ( var i = 0; i < instance.flows[flowId].edges.length; i++) {
		if (instance.flows[flowId].edges[i].sourceNodeId == source
				&& instance.flows[flowId].edges[i].sourceEndpoint == sourceEndpoint
				&& instance.flows[flowId].edges[i].targetNodeId == target
				&& instance.flows[flowId].edges[i].targetEndpoint == targetEndpoint) {
			exist = true;
			break;
		}
	}
	if (source == target) {
		illegal = true;
	}
	if (!exist && !illegal) {
		var newConnection = instance.newConnection(instance.flows[flowId].id,
				source, sourceEndpoint, target, targetEndpoint);
		instance.flows[flowId].edges.push(newConnection);
		info.connection.setDetachable(false);
		info.connection.setPaintStyle({
			strokeStyle : "rgb(22,55,88)"
		});
	} else {
		instance.jsPlumb[flowId].detach(info);
	}
};

HAFlow.Main.prototype.onDropNode = function(instance, flowId, event, ui) {
	var newLeft = ui.position.left;
	var newTop = ui.position.top;
	var nodeId = ui.helper.context.id.replace("node_", "");
	for ( var i = 0; i < instance.flows[flowId].nodes.length; i++) {
		if (instance.flows[flowId].nodes[i].id == nodeId) {
			instance.flows[flowId].nodes[i].position.left = newLeft;
			instance.flows[flowId].nodes[i].position.top = newTop;
		}
	}
	instance.jsPlumb[flowId].repaintEverything();
};

HAFlow.Main.prototype.onCloseTab = function(instance) {
	return function() {
		var flowId = this.id.replace("flowContainerPane_", "");
		var saveChange = confirm("Save flow before close?");
		if (saveChange) {
			instance.saveFlow(flowId);
		}
		return true;
	};
};

HAFlow.Main.prototype.onModuleAdded = function(instance, flowId, event, ui) {
	var moduleId = ui.draggable.context.id.replace("module_", "");
	instance.doAddModule(instance, flowId, moduleId, ui.position.left,
			ui.position.top);
	instance.paintFlow(flowId);
};
