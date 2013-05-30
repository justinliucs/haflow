dojo.require("dijit.TitlePane");
dojo.require("dijit.layout.BorderContainer");
dojo.require("dijit.layout.TabContainer");
dojo.require("dijit.layout.ContentPane");

dojo.require("dijit.Menu");
dojo.require("dijit.MenuItem");
dojo.require("dijit.MenuBar");
dojo.require("dijit.MenuBarItem");
dojo.require("dijit.PopupMenuBarItem");

dojo.require("dojo.dom");
dojo.require("dojo.json");
dojo.require("dojo.store.Memory");
dojo.require("dijit.tree.ObjectStoreModel");
dojo.require("dijit.Tree");
dojo.require("dojo.store.Observable");

var flow;

dojo.ready(function() {
	flow = new HAFlow(new HAFlowUI());
	flow.init();
});

function HAFlow(ui) {
	this.basePath = dojo.byId("basePath").value;
	this.ui = ui;
}

HAFlow.prototype.init = function() {
	this.initUserInterface();
	this.initFlowListData();
	this.initModuleListData();
	this.newFlow();
};

HAFlow.prototype.initUserInterfaceId = function() {
	this.flowListContainerId = "flowListTreeContainer";
	this.flowListTreeId = "flowListTree";
	this.moduleListContainerId = "moduleListContainer";
	this.currentFlowContainerId = "currentFlowContainer";
	this.informationContainerId = "informationContainer";
	this.consoleContainerId = "consoleContainer";
	this.logContainerId = "logContainer";
};

HAFlow.prototype.initFlowMenu = function() {
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
	this.menu.flowMenu.addChild(this.menu.flowMenu.newFlowMenuItem);
	this.menu.flowMenu.addChild(this.menu.flowMenu.saveFlowMenuItem);
	this.menu.flowMenu.addChild(this.menu.flowMenu.removeFlowMenuItem);
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
				_currentInstance.saveCurrentFlow();
			});
	dojo.connect(this.menu.flowMenu.removeFlowMenuItem, "onClick", function(
			event) {
		_currentInstance.removeCurrentFlow();
	});
};

HAFlow.prototype.initMainMenu = function() {
	this.menu = {};
	this.initFlowMenu();
};

HAFlow.prototype.initFlowList = function() {
	var flowListContentPane = new dijit.layout.ContentPane({
		id : this.flowListContainerId,
		title : "Flows"
	});
	this.ui.leadingContainer.addChild(flowListContentPane);
	this.initFlowListStore();
	this.initFlowListTree();
};

HAFlow.prototype.buildFlowListTree = function() {
	var i;
	for (i = 0; i < this.flowList.flows.length; i++) {
		this.flowListStore.put({
			id : this.flowList.flows[i].id,
			name : this.flowList.flows[i].name,
			node : true
		});
	}
};

HAFlow.prototype.initFlowListData = function() {
	var _currentInstance = this;
	$.ajax({
		url : this.basePath + "flow",
		type : "GET",
		dataType : "json",
		success : function(data, status) {
			_currentInstance.flowList = data;
			_currentInstance.buildFlowListTree();
		},
		error : function(request, status, error) {
			alert(error);
		}
	});
};

HAFlow.prototype.initFlowListStore = function() {
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

HAFlow.prototype.initFlowListTree = function() {
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
			_currentInstance.doLoadFlow(_currentInstance, item.id);
		}
	}, true);

	tree.startup();
};

HAFlow.prototype.doLoadFlow = function(instance, flowId) {
	instance.loadFlow(flowId);
};

HAFlow.prototype.onFlowClicked = function(instance, flowId) {
	var flow = {};
	if (flowId == instance.currentFlow.id) {
		flow = instance.currentFlow;
	} else {
		var i;
		for (i = 0; i < instance.flowList.flows.length; i++) {
			if (instance.flowList.flows[i].id == flowId) {
				flow = instance.flowList.flows[i];
				break;
			}
		}
	}
	var text = "";
	text += "<div>Id: " + flow.id + "</div>";
	text += "<div>Name: " + flow.name + "</div>";
	$("#" + instance.informationContainerId).html(text);
};

HAFlow.prototype.initInformationTab = function() {
	var informationContentPane = new dijit.layout.ContentPane({
		id : this.informationContainerId,
		title : "Information"
	});
	this.ui.bottomContainer.addChild(informationContentPane);
};

HAFlow.prototype.initConsoleTab = function() {
	var consoleContentPane = new dijit.layout.ContentPane({
		id : this.consoleContainerId,
		title : "Console"
	});
	this.ui.bottomContainer.addChild(consoleContentPane);
};

HAFlow.prototype.initLogTab = function() {
	var logContentPane = new dijit.layout.ContentPane({
		id : this.logContainerId,
		title : "Log"
	});
	this.ui.bottomContainer.addChild(logContentPane);
};

HAFlow.prototype.initBottomTabs = function() {
	this.initInformationTab();
	this.initConsoleTab();
	this.initLogTab();
};

HAFlow.prototype.initModuleList = function() {
	var moduleListPane = new dijit.layout.ContentPane({
		id : this.moduleListContainerId,
		title : "Modules"
	});
	this.ui.trailingContainer.addChild(moduleListPane);
};

HAFlow.prototype.initCurrentFlowPane = function() {
	var currentFlowPane = new dijit.layout.ContentPane({
		id : this.currentFlowContainerId,
		title : "Current Flow"
	});
	var _currentInstance = this;
	dojo.connect(currentFlowPane, "onClick", function(event) {
		_currentInstance.onCurrentFlowClicked(_currentInstance);
	});
	this.ui.centerContainer.addChild(currentFlowPane);
};

HAFlow.prototype.onCurrentFlowClicked = function(instance) {
	instance.onFlowClicked(instance, instance.currentFlow.id);
};

HAFlow.prototype.initUserInterface = function() {
	this.ui.init();
	this.initUserInterfaceId();
	this.initMainMenu();
	this.initBottomTabs();
	this.initFlowList();
	this.initModuleList();
	this.initCurrentFlowPane();
	this.ui.refresh();
};

HAFlow.prototype.initModuleListData = function() {
	var _currentInstance = this;
	$.ajax({
		url : _currentInstance.basePath + "module",
		type : "GET",
		dataType : "json",
		success : function(data, status) {
			_currentInstance.moduleList = data;
			_currentInstance.paintModuleList();
		},
		error : function(request, status, error) {
			alert(error);
		}
	});
};

HAFlow.prototype.paintModuleList = function() {
	var text = "";
	var i;
	for (i = 0; i < this.moduleList.modules.length; i++) {
		text += "<div class=\"module\" id=\"module_"
				+ this.moduleList.modules[i].id + "\"><div>"
				+ this.moduleList.modules[i].name + "</div></div>";
	}
	$("#" + this.moduleListContainerId).html(text);
	var _currentInstance = this;
	$(".module").draggable({
		appendTo : "#" + this.currentFlowContainerId,
		revert : "invalid",
		helper : "clone"
	});
	$("#" + this.currentFlowContainerId).droppable({
		accept : ".module",
		drop : function(event, ui) {
			_currentInstance.onModuleAdded(_currentInstance, event, ui);
		}
	});
};

HAFlow.prototype.onModuleAdded = function(instance, event, ui) {
	var moduleId = ui.draggable.context.id.replace("module_", "");
	this.doAddModule(instance, moduleId, ui.position.left, ui.position.top);
	this.paintCurrentFlow();
};

HAFlow.prototype.doAddModule = function(instance, moduleId, left, top) {
	var newNode = {};
	var id = UUID.generate();
	newNode["id"] = id;
	newNode["flowId"] = instance.currentFlow.id;
	newNode["moduleId"] = moduleId;
	newNode["name"] = "New Node";
	newNode["position"] = {};
	newNode.position["left"] = left;
	newNode.position["top"] = top;
	this.currentFlow.nodes.push(newNode);
};

HAFlow.prototype.paintCurrentFlow = function() {
	this.initJsPlumb();
	this.paintNodes();
	this.initNodes();
	this.paintEdges();
	this.bindJsPlumbEvents();
	this.bindFunctions();
	jsPlumb.repaintEverything();
};

HAFlow.prototype.initJsPlumb = function() {
	jsPlumb.reset();
	jsPlumb.importDefaults({
		Endpoint : [ "Dot", {
			radius : 10
		} ],
		HoverPaintStyle : {
			strokeStyle : "#42a62c",
			lineWidth : 3
		},
		ConnectionOverlays : [ [ "Arrow", {
			location : 1,
			id : "arrow",
			length : 14,
			foldback : 0.8
		} ] ]
	});
};

HAFlow.prototype.paintNodes = function() {
	var text = "";
	for ( var i = 0; i < this.currentFlow.nodes.length; i++) {
		text += "<div class=\"node\" style=\"left:"
				+ this.currentFlow.nodes[i].position.left + "px; top:"
				+ this.currentFlow.nodes[i].position.top + "px;\" id=\"node_"
				+ this.currentFlow.nodes[i].id + "\"><div>"
				+ this.currentFlow.nodes[i].name + "</div><div>" + "("
				+ this.getModuleById(this.currentFlow.nodes[i].moduleId).name
				+ ")</div>" + "<div class=\"handle\"></div></div>";
	}
	$("#" + this.currentFlowContainerId).html(text);
};

HAFlow.prototype.getModuleById = function(moduleId) {
	var i;
	for (i = 0; i < this.moduleList.modules.length; i++) {
		if (this.moduleList.modules[i].id == moduleId) {
			return this.moduleList.modules[i];
		}
	}
	return null;
};

HAFlow.prototype.initNodes = function() {
	var _currentInstance = this;
	jsPlumb.draggable($(".node"), {
		containment : "#" + this.currentFlowContainerId,
		stop : function(event, ui) {
			_currentInstance.onDropNode(_currentInstance, event, ui);
		}
	});
	$(".node").each(function(i, e) {
		jsPlumb.makeSource($(e), {
			filter : ".handle",
			anchor : "Continuous",
			connectorStyle : {
				strokeStyle : "rgb(0,0,0)",
				lineWidth : 3
			},
			connector : [ "StateMachine", {
				curviness : 20
			} ]
		});
	});
	jsPlumb.makeTarget($(".node"), {
		dropOptions : {
			hoverClass : "dragHover"
		},
		anchor : "Continuous"
	});
};

HAFlow.prototype.onDropNode = function(instance, event, ui) {
	var newLeft = ui.position.left;
	var newTop = ui.position.top;
	var nodeId = ui.helper.context.id.replace("node_", "");
	for ( var i = 0; i < instance.currentFlow.nodes.length; i++) {
		if (instance.currentFlow.nodes[i].id == nodeId) {
			instance.currentFlow.nodes[i].position.left = newLeft;
			instance.currentFlow.nodes[i].position.top = newTop;
		}
	}
	jsPlumb.repaintEverything();
};

HAFlow.prototype.paintEdges = function() {
	for ( var i = 0; i < this.currentFlow.edges.length; i++) {
		jsPlumb.connect({
			source : "node_" + this.currentFlow.edges[i].sourceNodeId,
			target : "node_" + this.currentFlow.edges[i].targetNodeId
		});
	}
};

HAFlow.prototype.bindJsPlumbEvents = function() {
	var _currentInstance = this;
	jsPlumb.bind("click", function(info) {
		_currentInstance.onConnectionClicked(_currentInstance, info);
	});
	jsPlumb.bind("connection", function(info) {
		_currentInstance.onConnectionCreated(_currentInstance, info);
	});
};

HAFlow.prototype.onConnectionCreated = function(instance, info) {
	var source = info.sourceId.replace("node_", "");
	var target = info.targetId.replace("node_", "");
	var exist = false;
	for ( var i = 0; i < instance.currentFlow.edges.length; i++) {
		if (instance.currentFlow.edges[i].sourceNodeId == source
				&& instance.currentFlow.edges[i].targetNodeId == target) {
			exist = true;
			break;
		}
	}
	if (!exist) {
		var newConnection = {};
		newConnection["id"] = UUID.generate();
		newConnection["flowId"] = instance.currentFlow.id;
		newConnection["sourceNodeId"] = source;
		newConnection["targetNodeId"] = target;
		instance.currentFlow.edges.push(newConnection);
		info.connection.setPaintStyle({
			strokeStyle : "rgb(0,0,0)"
		});
	} else {
		jsPlumb.detach(info);
	}
};

HAFlow.prototype.onConnectionClicked = function(instance, info) {
	var source = info.sourceId.replace("node_", "");
	var target = info.targetId.replace("node_", "");

	var text = "";
	text += "<div><span>From: " + info.sourceId + ".</span><span>To: "
			+ info.targetId + ".</span></div>";
	text += "<div>Delete?</div>";
	text += "<div><button id=\"delete_connection_" + source + "_" + target
			+ "\">Delete Connection</button></div>";
	$("#" + instance.informationContainerId).html(text);
	$("#delete_connection_" + source + "_" + target).bind("click", function() {
		instance.deleteConnection(instance, info);
	});
};

HAFlow.prototype.deleteConnection = function(instance, info) {
	var source = info.sourceId.replace("node_", "");
	var target = info.targetId.replace("node_", "");
	var i;
	var needToDelete = false;
	do {
		needToDelete = false;
		for (i = 0; i < instance.currentFlow.edges.length; i++) {
			if (instance.currentFlow.edges[i].sourceNodeId == source
					&& instance.currentFlow.edges[i].targetNodeId == target) {
				needToDelete = true;
				break;
			}
		}
		if (needToDelete) {
			instance.currentFlow.edges.splice(i, 1);
		}
	} while (needToDelete);
	jsPlumb.detach(info);
};

HAFlow.prototype.bindFunctions = function() {
	var _currentInstance = this;
	$(".node").bind("click", function() {
		var nodeId = $(this).attr("id").replace("node_", "");
		_currentInstance.onNodeClicked(_currentInstance, nodeId);
	});
	$(".module").bind("click", function() {
		var moduleId = $(this).attr("id").replace("module_", "");
		_currentInstance.onModuleClicked(_currentInstance, moduleId);
	});
};

HAFlow.prototype.onNodeClicked = function(instance, nodeId) {
	var text = "";
	text += "<div>Delete?</div>";
	text += "<div><button id=\"delete_node_" + nodeId
			+ "\">Delete Node</button></div>";
	$("#" + instance.informationContainerId).html(text);
	$("#delete_node_" + nodeId).bind("click", function() {
		instance.deleteNode(instance, nodeId);
	});
};

HAFlow.prototype.deleteNode = function(instance, nodeId) {
	var i;
	var needToDelete = false;
	do {
		needToDelete = false;
		for (i = 0; i < instance.currentFlow.edges.length; i++) {
			if (instance.currentFlow.edges[i].sourceNodeId == nodeId
					|| instance.currentFlow.edges[i].targetNodeId == nodeId) {
				needToDelete = true;
				break;
			}
		}
		if (needToDelete) {
			instance.currentFlow.edges.splice(i, 1);
		}
	} while (needToDelete);
	do {
		needToDelete = false;
		for (i = 0; i < instance.currentFlow.nodes.length; i++) {
			if (instance.currentFlow.nodes[i].id == nodeId) {
				needToDelete = true;
				break;
			}
		}
		if (needToDelete) {
			instance.currentFlow.nodes.splice(i, 1);
		}
	} while (needToDelete);
	instance.paintCurrentFlow();
};

HAFlow.prototype.onModuleClicked = function(instance, moduleId) {
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
	$("#delete_connection_" + source + "_" + target).bind("click", function() {
		instance.deleteConnection(instance, info);
	});
};

HAFlow.prototype.refreshFlowList = function() {
	var _currentInstance = this;
	$.ajax({
		url : this.basePath + "flow",
		type : "GET",
		dataType : "json",
		success : function(data, status) {
			_currentInstance.flowList = data;
		},
		error : function(request, status, error) {
			alert(error);
		}
	});
};

HAFlow.prototype.newFlow = function() {
	this.currentFlow = {};
	this.currentFlow.id = UUID.generate();
	this.currentFlow.name = "New Flow";
	this.currentFlow.nodes = new Array();
	this.currentFlow.edges = new Array();
	this.paintCurrentFlow();
};

HAFlow.prototype.loadFlow = function(flowId) {
	var _currentInstance = this;
	$.ajax({
		url : _currentInstance.basePath + "flow/" + flowId,
		type : "GET",
		dataType : "json",
		success : function(data, status) {
			_currentInstance.currentFlow = data;
			_currentInstance.paintCurrentFlow();
		},
		error : function(request, status, error) {
			alert(error);
		}
	});
};

HAFlow.prototype.saveCurrentFlow = function() {
	var _currentInstance = this;
	$.ajax({
		url : _currentInstance.basePath + "flow/"
				+ _currentInstance.currentFlow.id,
		type : "PUT",
		dataType : "json",
		contentType : "application/json",
		data : JSON.stringify(_currentInstance.currentFlow),
		success : function(data, status) {
			alert("success");
			_currentInstance.refreshFlowList();
			_currentInstance.flowListStore.put({
				id : _currentInstance.currentFlow.id,
				name : _currentInstance.currentFlow.name,
				node : true
			});
		},
		error : function(request, status, error) {
			alert(error);
		}
	});
};

HAFlow.prototype.removeCurrentFlow = function() {
	var _currentInstance = this;
	$.ajax({
		url : _currentInstance.basePath + "flow/"
				+ _currentInstance.currentFlow.id,
		type : "DELETE",
		dataType : "json",
		contentType : "application/json",
		data : JSON.stringify({}),
		success : function(data, status) {
			alert("success");
			_currentInstance.refreshFlowList();
			_currentInstance.flowListStore
					.remove(_currentInstance.currentFlow.id);
			_currentInstance.newFlow();
		},
		error : function(request, status, error) {
			alert(error);
		}
	});
};
