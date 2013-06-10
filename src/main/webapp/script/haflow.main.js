dojo.require("dijit.TitlePane");
dojo.require("dijit.layout.BorderContainer");
dojo.require("dijit.layout.TabContainer");
dojo.require("dijit.layout.ContentPane");

dojo.require("dijit.Menu");
dojo.require("dijit.MenuItem");
dojo.require("dijit.MenuBar");
dojo.require("dijit.MenuBarItem");
dojo.require("dijit.PopupMenuBarItem");

dojo.require("dijit.form.Button");
dojo.require("dijit.form.TextBox");

dojo.require("dojo.dom");
dojo.require("dojo.json");
dojo.require("dojo.store.Memory");
dojo.require("dijit.tree.ObjectStoreModel");
dojo.require("dijit.Tree");
dojo.require("dojo.store.Observable");

var flow;

dojo.ready(function() {
	flow = new HAFlow.Main(new HAFlow.UI());
	flow.init();
});

HAFlow.Main = function(ui) {
	this.basePath = dojo.byId("basePath").value;
	this.ui = ui;
};

HAFlow.Main.prototype.init = function() {
	this.doInit();
	this.initUserInterface();
	this.initFlowContainer();
	this.initData();

};

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

HAFlow.Main.prototype.doInit = function() {
	this.flows = {};
	this.jsPlumb = {};
};

HAFlow.Main.prototype.initUserInterface = function() {
	this.ui.init();
	this.initUserInterfaceId();
	this.initMainMenu();
	this.initBottomTabs();
	this.initFlowList();
	this.ui.refresh();
};

HAFlow.Main.prototype.initUserInterfaceId = function() {
	this.flowListContainerId = "flowListTreeContainer";
	this.flowListTreeId = "flowListTree";
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
		label : "New Flow",
	});
	this.menu.flowMenu.saveFlowMenuItem = new dijit.MenuItem({
		id : "saveFlowMenuItem",
		label : "Save Flow"
	});
	this.menu.flowMenu.removeFlowMenuItem = new dijit.MenuItem({
		id : "removeFlowMenuItem",
		label : "Remove Flow"
	});
	this.menu.flowMenu.runFlowMenuItem = new dijit.MenuItem({
		id : "runFlowMenuItem",
		label : "Run Flow"
	});
	this.menu.flowMenu.addChild(this.menu.flowMenu.newFlowMenuItem);
	this.menu.flowMenu.addChild(this.menu.flowMenu.saveFlowMenuItem);
	this.menu.flowMenu.addChild(this.menu.flowMenu.removeFlowMenuItem);
	this.menu.flowMenu.addChild(this.menu.flowMenu.runFlowMenuItem);
	this.menu.flowMenu.startup();
	this.ui.mainMenu.addChild(new dijit.PopupMenuBarItem({
		id : "flowPopupMenuBarItem",
		label : "Flow",
		popup : this.menu.flowMenu
	}));

	var _currentInstance = this;
	dojo.connect(this.menu.flowMenu.newFlowMenuItem, "onClick",
			function(event) {
				_currentInstance.newFlow();
			});
	dojo.connect(this.menu.flowMenu.saveFlowMenuItem, "onClick",
			function(event) {
				_currentInstance.saveFlow(_currentInstance.currentFlowId);
			});
	dojo.connect(this.menu.flowMenu.removeFlowMenuItem, "onClick", function(
			event) {
		_currentInstance.removeFlow(_currentInstance.currentFlowId);
	});
	dojo.connect(this.menu.flowMenu.runFlowMenuItem, "onClick",
			function(event) {
				_currentInstance.runFlow(_currentInstance.currentFlowId);
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
	}, true);
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

HAFlow.Main.prototype.getFlowBriefById = function(instance, flowId) {
	var i;
	for (i = 0; i < instance.flowList.flows.length; i++) {
		if (instance.flowList.flows[i].id == flowId) {
			return instance.flowList.flows[i];
		}
	}
	return null;
};

HAFlow.Main.prototype.onFlowClicked = function(instance, flowId) {
	var flowBrief = instance.getFlowBriefById(instance, flowId);
	var text = "";
	text += "<div>";
	text += "<div><span>Id: " + flowBrief.id + "</span></div>";
	text += "<div><span>Name: </span></div>";
	text += "<div id=\"flow_name_text_box\"></div>";
	text += "<div id=\"save_flow_name_button\"></div>";
	text += "</div>";
	$("#" + instance.informationContainerId).html(text);
	if (dijit.byId("flow_" + flowBrief.id + "_name") != null) {
		dijit.registry.remove("flow_" + flowBrief.id + "_name");
	}
	var flowNameTextBox = new dijit.form.TextBox({
		id : "flow_" + flowBrief.id + "_name",
		value : flowBrief.name
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

HAFlow.Main.prototype.onModuleAdded = function(instance, flowId, event, ui) {
	var moduleId = ui.draggable.context.id.replace("module_", "");
	instance.doAddModule(instance, flowId, moduleId, ui.position.left,
			ui.position.top);
	instance.paintFlow(flowId);
};

HAFlow.Main.prototype.doAddModule = function(instance, flowId, moduleId, left,
		top) {
	var newNode = {};
	var id = HAFlow.generateUUID();
	newNode["id"] = id;
	newNode["flowId"] = flowId;
	newNode["moduleId"] = moduleId;
	newNode["name"] = "Node-" + id;
	newNode["position"] = {};
	newNode.position["left"] = left;
	newNode.position["top"] = top;
	newNode["configurations"] = [];
	instance.flows[flowId].nodes.push(newNode);
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

HAFlow.Main.prototype.paintFlow = function(flowId) {
	this.initJsPlumb(flowId);
	this.paintNodes(flowId);
	this.initNodes(flowId);
	this.paintEdges(flowId);
	this.bindJsPlumbEvents(flowId);
	this.bindFunctions(flowId);
	this.jsPlumb[flowId].repaintEverything();
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

HAFlow.Main.prototype.paintNodes = function(flowId) {
	var text = "";
	for ( var i = 0; i < this.flows[flowId].nodes.length; i++) {
		text += "<div class=\"node\" style=\"left:"
				+ this.flows[flowId].nodes[i].position.left
				+ "px; top:"
				+ this.flows[flowId].nodes[i].position.top
				+ "px;\" id=\"node_"
				+ this.flows[flowId].nodes[i].id
				+ "\"><div>"
				+ this.flows[flowId].nodes[i].name
				+ "</div><div>"
				+ "("
				+ this
						.getModuleById(this,
								this.flows[flowId].nodes[i].moduleId).name
				+ ")</div>" + "</div>";
	}
	$("#" + "flowContainer_" + flowId).html(text);
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
			endpoint : "Dot",
			anchor : "Continuous",
			paintStyle : {
				strokeStyle : "#225588",
				fillStyle : "transparent",
				radius : 7,
				lineWidth : 2
			},
			isSource : true,
			connector : [ "StateMachine", {
				curviness : 20
			} ]
		};
		var targetEndpoint = {
			anchor : "Continuous",
			endpoint : "Dot",
			isTarget : true,
			maxConnections : -1,
		};

		this.jsPlumb[flowId].allSourceEndpoints = [];
		this.jsPlumb[flowId].allTargetEndpoints = [];
		var node = this.getNodeById(this, flowId,
				this.flows[flowId].nodes[i].id);
		var module = this.getModuleById(this, node.moduleId);

		_addEndpoints = function(instance, flowId, nodeId, module) {
			for ( var i = 0; i < module.outputs.length; i++) {
				var sourceId = nodeId + "_" + module.outputs[i].name;
				instance.jsPlumb[flowId].allSourceEndpoints
						.push(instance.jsPlumb[flowId].addEndpoint(nodeId,
								sourceEndpoint, {
									uuid : sourceId,
									overlays : [ [ "Label", {
										location : [ 0.5, -0.5 ],
										label : module.outputs[i].name
									} ] ]
								}));
			}
			for ( var j = 0; j < module.inputs.length; j++) {
				var targetId = nodeId + "_" + module.inputs[j].name;
				instance.jsPlumb[flowId].allTargetEndpoints
						.push(instance.jsPlumb[flowId].addEndpoint(nodeId,
								targetEndpoint, {
									uuid : targetId,
									overlays : [ [ "Label", {
										location : [ 0.5, -0.5 ],
										label : module.inputs[j].name
									} ] ]
								}));
			}
		};

		_addEndpoints(this, flowId, nodeId, module);
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

HAFlow.Main.prototype.paintEdges = function(flowId) {
	for ( var i = 0; i < this.flows[flowId].edges.length; i++) {
		this.jsPlumb[flowId].connect({
			uuids : [
					"node_" + this.flows[flowId].edges[i].sourceNodeId + "_"
							+ this.flows[flowId].edges[i].sourceEndpoint,
					"node_" + this.flows[flowId].edges[i].targetNodeId + "_"
							+ this.flows[flowId].edges[i].targetEndpoint ],
			editable : true
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

HAFlow.Main.prototype.onConnectionCreated = function(instance, flowId, info) {
	var source = info.sourceId.replace("node_", "");
	var sourceEndpoint = info.sourceEndpoint.overlays[0].getLabel();
	var target = info.targetId.replace("node_", "");
	var targetEndpoint = info.targetEndpoint.overlays[0].getLabel();
	var exist = false;
	for ( var i = 0; i < instance.flows[flowId].edges.length; i++) {
		if (instance.flows[flowId].edges[i].sourceNodeId == source
				&& instance.flows[flowId].edges[i].sourceEndpoint == sourceEndpoint
				&& instance.flows[flowId].edges[i].targetNodeId == target
				&& instance.flows[flowId].edges[i].targetEndpoint == targetEndpoint) {
			exist = true;
			break;
		}
	}
	if (!exist) {
		var newConnection = {};
		newConnection["id"] = HAFlow.generateUUID();
		newConnection["flowId"] = instance.flows[flowId].id;
		newConnection["sourceNodeId"] = source;
		newConnection["sourceEndpoint"] = sourceEndpoint;
		newConnection["targetNodeId"] = target;
		newConnection["targetEndpoint"] = targetEndpoint;
		instance.flows[flowId].edges.push(newConnection);
		info.connection.setPaintStyle({
			strokeStyle : "rgb(0,0,0)"
		});
	} else {
		instance.jsPlumb[flowId].detach(info);
	}
};

HAFlow.Main.prototype.onConnectionClicked = function(instance, flowId, info) {
	var source = info.sourceId.replace("node_", "");
	var sourceEndpoint = info.endpoints[0].overlays[0].getLabel();
	var target = info.targetId.replace("node_", "");
	var targetEndpoint = info.endpoints[1].overlays[0].getLabel();
	var sourceNode = instance.getNodeById(instance, flowId, source);
	var targetNode = instance.getNodeById(instance, flowId, target);

	var text = "";
	text += "<div><span>From: " + sourceNode.name + "." + sourceEndpoint
			+ "</span><span>To: " + targetNode.name + "." + targetEndpoint
			+ "</span></div>";
	text += "<div>Delete?</div>";
	text += "<div id=\"delete_connection_button\"></div>";
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

HAFlow.Main.prototype.onNodeClicked = function(instance, flowId, nodeId) {
	var node = instance.getNodeById(instance, flowId, nodeId);
	var module = instance.getModuleById(instance, node.moduleId);
	var text = "";
	text += "<div>";
	text += "<div><span>Node Id: " + node.id + "</span></div>";
	text += "<div><span>Flow: " + instance.flows[node.flowId].name
			+ "</span></div>";
	text += "<div><span>Module: " + module.name + "</span></div>";
	text += "<div>";
	text += "<span>Name: </span>";
	text += "<div id=\"node_name_text_box\"></div>";
	text += "<div id=\"save_node_name_button\"></div>";
	text += "</div>";
	text += "<div>Delete?</div>";
	text += "<div id=\"delete_node_button\"></div>";
	text += "</div>";
	$("#" + instance.informationContainerId).html(text);

	if (dijit.byId("node_" + nodeId + "_name") != null) {
		dijit.registry.remove("node_" + nodeId + "_name");
	}
	var nodeNameTextBox = new dijit.form.TextBox({
		id : "node_" + nodeId + "_name",
		value : node.name
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
		label : "DeleteNode",
		onClick : function() {
			instance.deleteNode(instance, flowId, nodeId);
		}
	});
	deleteNodeButton.placeAt(dojo.byId("delete_node_button"));
	deleteNodeButton.startup();

	var form = "";
	form += "<div>";
	form += "<div>Configuration:</div>";
	var i;
	for (i = 0; i < module.configurations.length; i++) {
		var textBoxId = "flow_" + flowId + "_node_" + nodeId + "_"
				+ module.configurations[i].key;
		var divId = textBoxId + "_container";
		form += "<div>";
		form += ("<span>" + module.configurations[i].displayName + "</span>");
		form += "<div id=\"" + divId + "\"></div>";
		form += "</div>";
	}
	form += "<div id=\"save_configuration_button\"></div>";
	form += "</div>";
	$("#" + instance.configurationContainerId).html(form);

	for (i = 0; i < module.configurations.length; i++) {
		var textBoxId = "flow_" + flowId + "_node_" + nodeId + "_"
				+ module.configurations[i].key;
		var divId = textBoxId + "_container";
		if (dijit.byId(textBoxId) != null) {
			dijit.registry.remove(textBoxId);
		}
		var configurationTextBox = new dijit.form.TextBox({
			id : textBoxId,
			value : instance.getConfigurationValue(instance, flowId, nodeId,
					module.configurations[i].key)
		});
		configurationTextBox.placeAt(dojo.byId(divId));
		configurationTextBox.startup();
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

HAFlow.Main.prototype.saveConfiguration = function(instance, flowId, nodeId) {
	var node = instance.getNodeById(instance, flowId, nodeId);
	var module = instance.getModuleById(instance, node.moduleId);
	var i;
	node.configurations = [];
	for (i = 0; i < module.configurations.length; i++) {
		node.configurations.push({
			key : module.configurations[i].key,
			value : $(
					"#" + "flow_" + flowId + "_node_" + nodeId + "_"
							+ module.configurations[i].key).val()
		});
	}
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

HAFlow.Main.prototype.onModuleClicked = function(instance, moduleId) {
	var text = "";
	var i;
	for (i = 0; i < instance.moduleList.modules.length; i++) {
		if (moduleId == instance.moduleList.modules[i].id) {
			break;
		}
	}
	text += "<div><span>Name: " + instance.moduleList.modules[i].name
			+ ".</span></div>";
	$("#" + instance.informationContainerId).html(text);
};

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
