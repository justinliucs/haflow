dojo.require("dijit.TitlePane");
dojo.require("dijit.layout.BorderContainer");
dojo.require("dijit.layout.TabContainer");
dojo.require("dijit.layout.ContentPane");

var flow;

dojo.ready(function() {
	flow = new haflow();
	flow.init();
});

function haflow() {
	this.basePath = dojo.byId("basePath").value;
}

haflow.prototype.init = function() {
	this.createUserInterface();
	this.loadFlowList();
	this.loadModuleList();
};

haflow.prototype.refresh = function() {
	this.loadFlowList();
	this.loadModuleList();
};

haflow.prototype.createUserInterface = function() {
	this.mainPlace = "main";
	this.flowListPlace = "flowList";
	this.moduleListPlace = "moduleList";
	this.flowPlace = "flow";
	this.consolePlace = "console";

	dojo.create("div", {
		id : this.mainPlace
	}, dojo.body());

	this.container = new dijit.layout.BorderContainer({
		design : "headline",
		style : "width: 100%;height:900px;",
	}, this.mainPlace);

	var topContainer = new dijit.layout.ContentPane({
		content : "Top",
		region : "top"
	}, dojo.create("div", {
		id : "top",
		style : "height:100px;"
	}, this.mainPlace));
	this.container.addChild(topContainer);

	var bottomContainer = new dijit.layout.ContentPane({
		content : "Bottom",
		region : "bottom"
	}, dojo.create("div", {
		id : this.consolePlace,
		style : "height:200px;"
	}, this.mainPlace));
	this.container.addChild(bottomContainer);

	var flowContainer = new dijit.layout.ContentPane({
		region : "center"
	}, dojo.create("div", {
		id : this.flowPlace,
	}, this.mainPlace));
	this.container.addChild(flowContainer);

	var leadingContainer = new dijit.layout.ContentPane({
		content : "Leading",
		region : "leading"
	}, dojo.create("div", {
		id : this.flowListPlace,
		style : "width:200px;"
	}, this.mainPlace));
	this.container.addChild(leadingContainer);

	var trailingContainer = new dijit.layout.ContentPane({
		content : "Trailing",
		region : "trailing"
	}, dojo.create("div", {
		id : this.moduleListPlace,
		style : "width:200px;"
	}, this.mainPlace));
	this.container.addChild(trailingContainer);

	// var otherPanel = new dijit.layout.ContentPane({
	// content : "Hello World!",
	// title : "Hello World!",
	// closable : true
	// });
	// otherPanel.placeAt("flow");
	// otherPanel.startup();
	//
	// var anotherPanel = new dijit.layout.ContentPane({
	// content : "Hello World!",
	// title : "Hello World!",
	// closable : true
	// });
	// anotherPanel.placeAt("flow");
	// anotherPanel.startup();

	this.container.startup();
};

haflow.prototype.loadFlowList = function() {
	var _currentInstance = this;
	$.ajax({
		url : this.basePath + "flow",
		type : "GET",
		dataType : "json",
		success : function(data, status) {
			_currentInstance.flowList = data;
			_currentInstance.paintFlowList();
		},
		error : function(request, status, error) {
			alert(error);
		}
	});
};

haflow.prototype.loadFlow = function(flowId) {
	var _currentInstance = this;
	$.ajax({
		url : _currentInstance.basePath + "flow/" + flowId,
		type : "GET",
		dataType : "json",
		success : function(data, status) {
			_currentInstance.flow = data;
			_currentInstance.paintCurrentFlow();
		},
		error : function(request, status, error) {
			alert(error);
		}
	});
};

haflow.prototype.loadModuleList = function() {
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

haflow.prototype.newFlow = function() {
	this.flow = {};
	this.flow.id = UUID.generate();
	this.flow.name = "New Flow";
	this.flow.nodes = new Array();
	this.flow.edges = new Array();
	this.mergeCurrentFlow();
	this.paintCurrentFlow();
};

haflow.prototype.mergeCurrentFlow = function() {
	var _currentInstance = this;
	$.ajax({
		url : _currentInstance.basePath + "flow/" + _currentInstance.flow.id,
		type : "PUT",
		dataType : "json",
		contentType : "application/json",
		data : JSON.stringify(_currentInstance.flow),
		success : function(data, status) {
			alert("success");
			_currentInstance.refresh();
		},
		error : function(request, status, error) {
			alert(error);
		}
	});
};

haflow.prototype.removeCurrentFlow = function() {
	var _currentInstance = this;
	$.ajax({
		url : _currentInstance.basePath + "flow/" + _currentInstance.flow.id,
		type : "DELETE",
		dataType : "json",
		contentType : "application/json",
		data : JSON.stringify({}),
		success : function(data, status) {
			alert("success");
			_currentInstance.refresh();
		},
		error : function(request, status, error) {
			alert(error);
		}
	});
};

haflow.prototype.paintModuleList = function() {
	var text = "";
	var i;
	for (i = 0; i < this.moduleList.modules.length; i++) {
		text += "<div class=\"module\" id=\"module_"
				+ this.moduleList.modules[i].id + "\"><div>"
				+ this.moduleList.modules[i].name + "</div></div>";
	}
	$("#" + this.moduleListPlace).html(text);
	var _currentInstance = this;
	$(".module").draggable({
		appendTo : "#" + this.flowPlace,
		revert : "invalid",
		helper : "clone"
	});
	$("#" + this.flowPlace).droppable({
		accept : ".module",
		drop : function(event, ui) {
			_currentInstance.onModuleAdded(_currentInstance, event, ui);
		}
	});
};

haflow.prototype.paintFlowList = function() {
	var text = "";
	var i;
	for (i = 0; i < this.flowList.flows.length; i++) {
		text += "<div class=\"flowItem\" id=\"flow_"
				+ this.flowList.flows[i].id + "\">"
				+ this.flowList.flows[i].name + "</div>";
	}
	$("#" + this.flowListPlace).html(text);
	var _currentInstance = this;
	for (i = 0; i < this.flowList.flows.length; i++) {
		$("#flow_" + this.flowList.flows[i].id).bind("click", function(event) {
			var flowId = event.currentTarget.id.replace("flow_", "");
			_currentInstance.loadFlow(flowId);
		});
	}
};

haflow.prototype.paintCurrentFlow = function() {
	this.initJsPlumb();
	this.paintNodes();
	this.initElements();
	this.paintEdges();
	this.bindFunctions();
	this.initConsole();
	jsPlumb.repaintEverything();
};

haflow.prototype.onModuleAdded = function(instance, event, ui) {
	var moduleId = ui.draggable.context.id.replace("module_", "");
	this.doAddModule(instance, moduleId, ui.position.left, ui.position.top);
	this.paintCurrentFlow();
};

haflow.prototype.doAddModule = function(instance, moduleId, left, top) {
	var newNode = {};
	var id = UUID.generate();
	newNode["id"] = id;
	newNode["flowId"] = instance.flow.id;
	newNode["moduleId"] = moduleId;
	newNode["name"] = "New Node";
	newNode["position"] = {};
	newNode.position["left"] = left;
	newNode.position["top"] = top;
	this.flow.nodes.push(newNode);
};

haflow.prototype.getModuleById = function(moduleId) {
	var i;
	for (i = 0; i < this.moduleList.modules.length; i++) {
		if (this.moduleList.modules[i].id == moduleId) {
			return this.moduleList.modules[i];
		}
	}
	return null;
};

haflow.prototype.paintNodes = function() {
	var text = "";
	for ( var i = 0; i < this.flow.nodes.length; i++) {
		text += "<div class=\"node\" style=\"left:"
				+ this.flow.nodes[i].position.left + "px; top:"
				+ this.flow.nodes[i].position.top + "px;\" id=\"node_"
				+ this.flow.nodes[i].id + "\"><div>" + this.flow.nodes[i].name
				+ "</div><div>" + "("
				+ this.getModuleById(this.flow.nodes[i].moduleId).name
				+ ")</div>" + "<div class=\"handle\"></div></div>";
	}
	$("#" + this.flowPlace).html(text);
};

haflow.prototype.paintEdges = function() {
	for ( var i = 0; i < this.flow.edges.length; i++) {
		jsPlumb.connect({
			source : "node_" + this.flow.edges[i].sourceNodeId,
			target : "node_" + this.flow.edges[i].targetNodeId
		});
	}
};

haflow.prototype.bindFunctions = function() {
	var _currentInstance = this;
	jsPlumb.bind("click", function(info) {
		_currentInstance.onConnectionClicked(_currentInstance, info);
	});
	jsPlumb.bind("connection", function(info) {
		_currentInstance.onConnectionCreated(_currentInstance, info);
	});
};

haflow.prototype.initConsole = function() {
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

haflow.prototype.onNodeClicked = function(instance, nodeId) {
	var text = "";
	text += "<div>Delete?</div>";
	text += "<div><button id=\"delete_node_" + nodeId
			+ "\">Delete Node</button></div>";
	$("#" + instance.consolePlace).html(text);
	$("#delete_node_" + nodeId).bind("click", function() {
		instance.deleteNode(instance, nodeId);
	});
};

haflow.prototype.deleteNode = function(instance, nodeId) {
	var i;
	var needToDelete = false;
	do {
		needToDelete = false;
		for (i = 0; i < instance.flow.edges.length; i++) {
			if (instance.flow.edges[i].sourceNodeId == nodeId
					|| instance.flow.edges[i].targetNodeId == nodeId) {
				needToDelete = true;
				break;
			}
		}
		if (needToDelete) {
			instance.flow.edges.splice(i, 1);
		}
	} while (needToDelete);
	do {
		needToDelete = false;
		for (i = 0; i < instance.flow.nodes.length; i++) {
			if (instance.flow.nodes[i].id == nodeId) {
				needToDelete = true;
				break;
			}
		}
		if (needToDelete) {
			instance.flow.nodes.splice(i, 1);
		}
	} while (needToDelete);
	instance.paintCurrentFlow();
};

haflow.prototype.onModuleClicked = function(instance, moduleId) {
	var text = "";
	var i;
	for (i = 0; i < instance.moduleList.modules.length; i++) {
		if (moduleId == instance.moduleList.modules[i].id) {
			break;
		}
	}
	text += "<div><span>Name: " + instance.moduleList.modules[i].name
			+ ".</span></div>";
	$("#" + instance.consolePlace).html(text);
	$("#delete_connection_" + source + "_" + target).bind("click", function() {
		instance.deleteConnection(instance, info);
	});
};

haflow.prototype.onConnectionCreated = function(instance, info) {
	var source = info.sourceId.replace("node_", "");
	var target = info.targetId.replace("node_", "");
	var exist = false;
	for ( var i = 0; i < instance.flow.edges.length; i++) {
		if (instance.flow.edges[i].sourceNodeId == source
				&& instance.flow.edges[i].targetNodeId == target) {
			exist = true;
			break;
		}
	}
	if (!exist) {
		var newConnection = {};
		newConnection["id"] = UUID.generate();
		newConnection["flowId"] = instance.flow.id;
		newConnection["sourceNodeId"] = source;
		newConnection["targetNodeId"] = target;
		instance.flow.edges.push(newConnection);
		info.connection.setPaintStyle({
			strokeStyle : "rgb(0,0,0)"
		});
	} else {
		jsPlumb.detach(info);
	}
};

haflow.prototype.onConnectionClicked = function(instance, info) {
	var source = info.sourceId.replace("node_", "");
	var target = info.targetId.replace("node_", "");

	var text = "";
	text += "<div><span>From: " + info.sourceId + ".</span><span>To: "
			+ info.targetId + ".</span></div>";
	text += "<div>Delete?</div>";
	text += "<div><button id=\"delete_connection_" + source + "_" + target
			+ "\">Delete Connection</button></div>";
	$("#" + instance.consolePlace).html(text);
	$("#delete_connection_" + source + "_" + target).bind("click", function() {
		instance.deleteConnection(instance, info);
	});

};

haflow.prototype.deleteConnection = function(instance, info) {
	var source = info.sourceId.replace("node_", "");
	var target = info.targetId.replace("node_", "");
	var i;
	var needToDelete = false;
	do {
		needToDelete = false;
		for (i = 0; i < instance.flow.edges.length; i++) {
			if (instance.flow.edges[i].sourceNodeId == source
					&& instance.flow.edges[i].targetNodeId == target) {
				needToDelete = true;
				break;
			}
		}
		if (needToDelete) {
			instance.flow.edges.splice(i, 1);
		}
	} while (needToDelete);
	jsPlumb.detach(info);
};

haflow.prototype.onDrop = function(instance, event, ui) {
	var newLeft = ui.position.left;
	var newTop = ui.position.top;
	var nodeId = ui.helper.context.id.replace("node_", "");
	for ( var i = 0; i < instance.flow.nodes.length; i++) {
		if (instance.flow.nodes[i].id == nodeId) {
			instance.flow.nodes[i].position.left = newLeft;
			instance.flow.nodes[i].position.top = newTop;
		}
	}
	jsPlumb.repaintEverything();
};

haflow.prototype.initJsPlumb = function() {
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

haflow.prototype.initElements = function() {
	var _currentInstance = this;
	jsPlumb.draggable($(".node"), {
		containment : "#" + this.flowPlace,
		stop : function(event, ui) {
			_currentInstance.onDrop(_currentInstance, event, ui);
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