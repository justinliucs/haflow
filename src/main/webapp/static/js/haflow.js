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
				+ this.components.components[i].id + "\"><div>"
				+ this.components.components[i].name + "</div></div>";
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
	var type = parseInt(ui.draggable.context.id.replace("component_", ""));
	this.doAddComponent(type, ui.position.left, ui.position.top);
	this.paintFlow();
};

haflow.prototype.doAddComponent = function(type, x, y) {
	var newNode = {};
	newNode["name"] = "node_" + (this.flow.nodes.length + 1);
	newNode["id"] = this.flow.nodes.length + 1;
	newNode["type"] = type;
	newNode["position"] = {};
	newNode.position["x"] = x;
	newNode.position["y"] = y;
	this.flow.nodes.push(newNode);

};

haflow.prototype.putNodes = function() {
	var text = "";
	for ( var i = 0; i < this.flow.nodes.length; i++) {
		text += "<div class=\"node\" style=\"left:"
				+ this.flow.nodes[i].position.x + "px; top:"
				+ this.flow.nodes[i].position.y + "px;\" id=\"node_"
				+ this.flow.nodes[i].id + "\"><div>" + this.flow.nodes[i].name
				+ "</div><div>" + "(Component " + this.flow.nodes[i].type
				+ ")</div>" + "<div class=\"handle\"></div></div>";
	}
	$("#" + this.flowPlace).html(text);
};

haflow.prototype.putEdges = function() {
	for ( var i = 0; i < this.flow.edges.length; i++) {
		jsPlumb.connect({
			source : "node_" + this.flow.edges[i].from,
			target : "node_" + this.flow.edges[i].to
		});
	}
};

haflow.prototype.paintFlow = function() {
	this.initJsPlumb();
	this.putNodes();
	this.initElements();
	this.putEdges();
	this.initConsole();
	jsPlumb.repaintEverything();
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
			if (instance.flow.edges[i].from == nodeId
					|| instance.flow.edges[i].to == nodeId) {
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
	var source = parseInt(info.sourceId.replace("node_", ""));
	var target = parseInt(info.targetId.replace("node_", ""));
	var exist = false;
	for ( var i = 0; i < instance.flow.edges.length; i++) {
		if (instance.flow.edges[i].from == source
				&& instance.flow.edges[i].to == target) {
			exist = true;
			break;
		}
	}
	if (!exist) {
		var newConnection = {};
		newConnection["from"] = source;
		newConnection["to"] = target;
		instance.flow.edges.push(newConnection);
	}
	info.connection.setPaintStyle({
		strokeStyle : "rgb(0,0,0)"
	});
};

haflow.prototype.onConnectionClicked = function(instance, info) {
	var source = parseInt(info.sourceId.replace("node_", ""));
	var target = parseInt(info.targetId.replace("node_", ""));

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
	var source = parseInt(info.sourceId.replace("node_", ""));
	var target = parseInt(info.targetId.replace("node_", ""));
	var i;
	var needToDelete = false;
	do {
		needToDelete = false;
		for (i = 0; i < instance.flow.edges.length; i++) {
			if (instance.flow.edges[i].from == source
					&& instance.flow.edges[i].to == target) {
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
	var newX = ui.position.left;
	var newY = ui.position.top;
	var nodeId = ui.helper.context.id.replace("node_", "");
	for ( var i = 0; i < instance.flow.nodes.length; i++) {
		if (instance.flow.nodes[i].id == nodeId) {
			instance.flow.nodes[i].position.x = newX;
			instance.flow.nodes[i].position.y = newY;
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
	var _currentInstance = this;
	jsPlumb.bind("click", function(info) {
		_currentInstance.onConnectionClicked(_currentInstance, info);
	});
	jsPlumb.bind("connection", function(info) {
		_currentInstance.onConnectionCreated(_currentInstance, info);
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
			connector : [ "StateMachine", {
				curviness : 20
			} ],
			connectorStyle : {
				strokeStyle : "rgb(0,0,0)",
				lineWidth : 3
			}
		});
	});
	jsPlumb.makeTarget($(".node"), {
		dropOptions : {
			hoverClass : "dragHover"
		},
		anchor : "Continuous"
	});
};