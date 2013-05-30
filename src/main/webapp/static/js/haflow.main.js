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
	flow = new HAFlow.Main(new HAFlow.UI());
	flow.init();
});

HAFlow.Main = function(ui) {
	this.basePath = dojo.byId("basePath").value;
	this.ui = ui;
};

HAFlow.Main.prototype.generateUUID = function() {
	var a = function(a) {
		return 0 > a ? NaN : 30 >= a ? 0 | Math.random() * (1 << a)
				: 53 >= a ? (0 | 1073741824 * Math.random()) + 1073741824
						* (0 | Math.random() * (1 << a - 30)) : NaN;
	};
	var b = function(a, b) {
		for ( var c = a.toString(16), d = b - c.length, e = "0"; 0 < d; d >>>= 1, e += e)
			d & 1 && (c = e + c);
		return c;
	};

	return b(a(32), 8) + "-" + b(a(16), 4) + "-" + b(16384 | a(12), 4) + "-"
			+ b(32768 | a(14), 4) + "-" + b(a(48), 12);
};

HAFlow.Main.prototype.init = function() {
	this.doInit();
	this.initUserInterface();
	this.initFlowListData();
	this.initModuleListData();
	this.initFlowContainer();
};

HAFlow.Main.prototype.initFlowContainer = function() {
	var _currentInstance = this;
	this.ui.centerContainer.watch("selectedChildWidget", function(name, from,
			to) {
		var flowId = to.domNode.id.replace("flowContainer_", "");
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

HAFlow.Main.prototype.doInit = function() {
	this.flows = {};
	this.jsPlumb = {};
};

HAFlow.Main.prototype.initUserInterfaceId = function() {
	this.flowListContainerId = "flowListTreeContainer";
	this.flowListTreeId = "flowListTree";
	this.moduleListContainerId = "moduleListContainer";
	this.flowContainerId = "flowContainer";
	this.informationContainerId = "informationContainer";
	this.consoleContainerId = "consoleContainer";
	this.logContainerId = "logContainer";
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
				_currentInstance.saveFlow(_currentInstance.currentFlowId);
			});
	dojo.connect(this.menu.flowMenu.removeFlowMenuItem, "onClick", function(
			event) {
		_currentInstance.removeFlow(_currentInstance.currentFlowId);
	});
};

HAFlow.Main.prototype.initMainMenu = function() {
	this.menu = {};
	this.initFlowMenu();
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

HAFlow.Main.prototype.initFlowListData = function() {
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

HAFlow.Main.prototype.onFlowClicked = function(instance, flowId) {
	var flow = {};
	var i;
	for (i = 0; i < instance.flowList.flows.length; i++) {
		if (instance.flowList.flows[i].id == flowId) {
			flow = instance.flowList.flows[i];
			break;
		}
	}
	var text = "";
	text += "<div>Id: " + flow.id + "</div>";
	text += "<div>Name: " + flow.name + "</div>";
	$("#" + instance.informationContainerId).html(text);
};

HAFlow.Main.prototype.initInformationTab = function() {
	var informationContentPane = new dijit.layout.ContentPane({
		id : this.informationContainerId,
		title : "Information"
	});
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

HAFlow.Main.prototype.initBottomTabs = function() {
	this.initInformationTab();
	this.initConsoleTab();
	this.initLogTab();
};

HAFlow.Main.prototype.initModuleList = function() {
	var moduleListPane = new dijit.layout.ContentPane({
		id : this.moduleListContainerId,
		title : "Modules"
	});
	this.ui.trailingContainer.addChild(moduleListPane);
};

HAFlow.Main.prototype.initUserInterface = function() {
	this.ui.init();
	this.initUserInterfaceId();
	this.initMainMenu();
	this.initBottomTabs();
	this.initFlowList();
	this.initModuleList();
	this.ui.refresh();
};

HAFlow.Main.prototype.initModuleListData = function() {
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

HAFlow.Main.prototype.paintModuleList = function() {
	var text = "";
	var i;
	for (i = 0; i < this.moduleList.modules.length; i++) {
		text += "<div class=\"module\" id=\"module_"
				+ this.moduleList.modules[i].id + "\"><div>"
				+ this.moduleList.modules[i].name + "</div></div>";
	}
	$("#" + this.moduleListContainerId).html(text);
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
	var id = instance.generateUUID();
	newNode["id"] = id;
	newNode["flowId"] = flowId;
	newNode["moduleId"] = moduleId;
	newNode["name"] = "New Node";
	newNode["position"] = {};
	newNode.position["left"] = left;
	newNode.position["top"] = top;
	instance.flows[flowId].nodes.push(newNode);
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

HAFlow.Main.prototype.paintNodes = function(flowId) {
	var text = "";
	for ( var i = 0; i < this.flows[flowId].nodes.length; i++) {
		text += "<div class=\"node\" style=\"left:"
				+ this.flows[flowId].nodes[i].position.left + "px; top:"
				+ this.flows[flowId].nodes[i].position.top + "px;\" id=\"node_"
				+ this.flows[flowId].nodes[i].id + "\"><div>"
				+ this.flows[flowId].nodes[i].name + "</div><div>" + "("
				+ this.getModuleById(this.flows[flowId].nodes[i].moduleId).name
				+ ")</div>" + "<div class=\"handle\"></div></div>";
	}
	$("#" + "flowContainer_" + flowId).html(text);
};

HAFlow.Main.prototype.getModuleById = function(moduleId) {
	var i;
	for (i = 0; i < this.moduleList.modules.length; i++) {
		if (this.moduleList.modules[i].id == moduleId) {
			return this.moduleList.modules[i];
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
		this.jsPlumb[flowId].makeSource($("#" + nodeId), {
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
		this.jsPlumb[flowId].makeTarget($("#" + nodeId), {
			dropOptions : {
				hoverClass : "dragHover"
			},
			anchor : "Continuous"
		});
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
	this.jsPlumb[flowId].repaintEverything();
};

HAFlow.Main.prototype.paintEdges = function(flowId) {
	for ( var i = 0; i < this.flows[flowId].edges.length; i++) {
		this.jsPlumb[flowId].connect({
			source : "node_" + this.flows[flowId].edges[i].sourceNodeId,
			target : "node_" + this.flows[flowId].edges[i].targetNodeId
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
	var target = info.targetId.replace("node_", "");
	var exist = false;
	for ( var i = 0; i < instance.flows[flowId].edges.length; i++) {
		if (instance.flows[flowId].edges[i].sourceNodeId == source
				&& instance.flows[flowId].edges[i].targetNodeId == target) {
			exist = true;
			break;
		}
	}
	if (!exist) {
		var newConnection = {};
		newConnection["id"] = instance.generateUUID();
		newConnection["flowId"] = instance.flows[flowId].id;
		newConnection["sourceNodeId"] = source;
		newConnection["targetNodeId"] = target;
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
	var target = info.targetId.replace("node_", "");

	var text = "";
	text += "<div><span>From: " + info.sourceId + ".</span><span>To: "
			+ info.targetId + ".</span></div>";
	text += "<div>Delete?</div>";
	text += "<div><button id=\"delete_connection_" + source + "_" + target
			+ "\">Delete Connection</button></div>";
	$("#" + instance.informationContainerId).html(text);
	$("#delete_connection_" + source + "_" + target).bind("click", function() {
		instance.deleteConnection(instance, flowId, info);
	});
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
	var text = "";
	text += "<div>Delete?</div>";
	text += "<div><button id=\"delete_node_" + nodeId
			+ "\">Delete Node</button></div>";
	$("#" + instance.informationContainerId).html(text);
	$("#delete_node_" + nodeId).bind("click", function() {
		instance.deleteNode(instance, flowId, nodeId);
	});
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
		dataType : "json",
		success : function(data, status) {
			_currentInstance.flowList = data;
		},
		error : function(request, status, error) {
			alert(error);
		}
	});
};

HAFlow.Main.prototype.newFlow = function() {
	var newFlowId = this.generateUUID();
	this.flows[newFlowId] = {};
	this.flows[newFlowId].id = newFlowId;
	this.flows[newFlowId].name = "New Flow";
	this.flows[newFlowId].nodes = new Array();
	this.flows[newFlowId].edges = new Array();
	this.ui.centerContainer.addChild(new dijit.layout.ContentPane({
		id : "flowContainer_" + newFlowId,
		title : this.flows[newFlowId].name
	}));
	this.setupDroppable(newFlowId);
	this.paintFlow(newFlowId);
	this.saveFlow(newFlowId);
	this.flowListStore.put({
		id : newFlowId.flows[newFlowId].id,
		name : newFlowId.flows[newFlowId].name,
		node : true
	});
};

HAFlow.Main.prototype.loadFlow = function(flowId) {
	if (dojo.byId("flowContainer_" + flowId) == null) {
		var _currentInstance = this;
		$.ajax({
			url : _currentInstance.basePath + "flow/" + flowId,
			type : "GET",
			dataType : "json",
			success : function(data, status) {
				_currentInstance.flows[data.id] = data;
				_currentInstance.ui.centerContainer
						.addChild(new dijit.layout.ContentPane({
							id : "flowContainer_" + data.id,
							title : _currentInstance.flows[data.id].name
						}));
				_currentInstance.setupDroppable(flowId);
				_currentInstance.paintFlow(flowId);
			},
			error : function(request, status, error) {
				alert(error);
			}
		});
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
			alert("success");
			_currentInstance.refreshFlowList();
		},
		error : function(request, status, error) {
			alert(error);
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
			alert("success");
			_currentInstance.refreshFlowList();
			_currentInstance.flowListStore
					.remove(_currentInstance.flows[flowId].id);
		},
		error : function(request, status, error) {
			alert(error);
		}
	});
};
