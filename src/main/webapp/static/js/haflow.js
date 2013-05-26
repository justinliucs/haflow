function haflow(info) {
	this.flow = info.flow;
	this.components = info.components;
	this.flowPlace = info.flowPlace;
	this.componentsPlace = info.componentsPlace;
	this.consolePlace = info.consolePlace;
}

haflow.prototype.paint = function() {
	this.paintComponents();
	this.paintFlow();
};

haflow.prototype.paintComponents = function() {
	var text = "";
	for ( var i = 0; i < this.components.components.length; i++) {
		text += "<div class=\"component\" id=\"component_"
				+ this.components.components[i].id + "\"><div>" + this.components.components[i].name
				+ "</div></div>";
	}
	$("#" + this.componentsPlace).html(text);
	var _currentInstance = this;
	$(".component").draggable({
		appendTo : "#" + this.flowPlace,
		revert : "invalid",
		helper : "clone"
	});
	$("#" + this.flowPlace).droppable({
		accept : ".component",
		drop : function(event, ui) {
			_currentInstance.onComponentAdded(_currentInstance, event, ui);
		}
	});
};

haflow.prototype.onComponentAdded = function(instance, event, ui) {
	var componentId = ui.draggable.context.id.replace("component_", "");
	this.doAddComponent(instance, componentId, ui.position.left,
			ui.position.top);
	this.paintFlow();
};

haflow.prototype.doAddComponent = function(instance, componentId, left, top) {
	var newNode = {};
	var id = UUID.generate();
	newNode["id"] = id;
	newNode["flowId"] = instance.flow.id;
	newNode["componentId"] = componentId;
	newNode["name"] = "New Node";
	newNode["position"] = {};
	newNode.position["left"] = left;
	newNode.position["top"] = top;
	this.flow.nodes.push(newNode);
};

haflow.prototype.getComponentById = function(componentId) {
	var i;
	for (i = 0; i < this.components.components.length; i++) {
		if (this.components.components[i].id == componentId) {
			return this.components.components[i];
		}
	}
	return null;
};

haflow.prototype.putNodes = function() {
	var text = "";
	for ( var i = 0; i < this.flow.nodes.length; i++) {
		text += "<div class=\"node\" style=\"left:"
				+ this.flow.nodes[i].position.left + "px; top:"
				+ this.flow.nodes[i].position.top + "px;\" id=\"node_"
				+ this.flow.nodes[i].id + "\"><div>" + this.flow.nodes[i].name
				+ "</div><div>" + "("
				+ this.getComponentById(this.flow.nodes[i].componentId).name
				+ ")</div>" + "<div class=\"handle\"></div></div>";
	}
	$("#" + this.flowPlace).html(text);
};

haflow.prototype.putEdges = function() {
	for ( var i = 0; i < this.flow.edges.length; i++) {
		jsPlumb.connect({
			source : "node_" + this.flow.edges[i].sourceNodeId,
			target : "node_" + this.flow.edges[i].targetNodeId
		});
	}
};

haflow.prototype.paintFlow = function() {
	this.initJsPlumb();
	this.putNodes();
	this.initElements();
	this.putEdges();
	this.bindFunctions();
	this.initConsole();
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
	$(".component").bind("click", function() {
		var componentId = $(this).attr("id").replace("component_", "");
		_currentInstance.onComponentClicked(_currentInstance, componentId);
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
	instance.paintFlow();
};

haflow.prototype.onComponentClicked = function(instance, componentId) {
	var text = "";
	var i;
	for (i = 0; i < instance.components.components.length; i++) {
		if (componentId == instance.components.components[i].id) {
			break;
		}
	}
	text += "<div><span>Name: " + instance.components.components[i].name
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