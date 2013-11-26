//jsplumb helper

//public
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

HAFlow.Main.prototype.onModuleAdded = function(instance, flowId, event, ui) {
	var moduleId = ui.draggable.context.id.replace("module_", "");
	instance.doAddModule(instance, flowId, moduleId, ui.position.left,
			ui.position.top);
	instance.paintFlow(flowId);
};

//public
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
		var moduleName = this.getModuleById(this,
				this.flows[flowId].nodes[i].moduleId).name;
		var moduleType = this.getModuleById(this,
				this.flows[flowId].nodes[i].moduleId).type;
		text += "<div class=\"node" + "\" style=\"left:"
				+ this.flows[flowId].nodes[i].position.left + "px; top:"
				+ this.flows[flowId].nodes[i].position.top + "px;";
		if (moduleName == "Start") {
			text += "background:#C0C0C0";
		}
		if (moduleName == "End") {
			text += "background:#B8860B";
		}
		if (moduleName == "Kill") {
			text += "background:#DC143C";
		}
		
		if( moduleType == "SOURCE"){
			text += "background:#ACE6E6";
		}else if( moduleType == "DEST"){
			text += "background:#009999";
		}else if( moduleType == "MIDDLE_DATA"){
			text += "background:#FFD9BF";
		}else{
			text += "background:#FF6600";
		}
		
		text += "\" id=\"node_" + this.flows[flowId].nodes[i].id + "\">"
				+ "<div>" + this.flows[flowId].nodes[i].name + "</div><div>"
				+ "(" + moduleName + ")</div>" + "</div>";
	}
	$("#" + "flowContainer_" + flowId).html(text);
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

HAFlow.Main.prototype.onConnectionClicked = function(instance, flowId, info) {
	var source = info.sourceId.replace("node_", "");
	var sourceEndpoint = info.endpoints[0].overlays[0].getLabel();
	var target = info.targetId.replace("node_", "");
	var targetEndpoint = info.endpoints[1].overlays[0].getLabel();
	var sourceNode = instance.getNodeById(instance, flowId, source);
	var targetNode = instance.getNodeById(instance, flowId, target);

	var text = "";
	text += "<div class=\"configuration\">";
	text += "<div class=\"configuration-content\"><span><strong><span width='115em'>From: </span>"
			+ sourceNode.name + "." + sourceEndpoint + "</strong></span></div>"
			+ "<div class=\"configuration-content\"><span><strong><span width='115em'>To: </span>"
			+ targetNode.name + "." + targetEndpoint + "</strong></span></div>";
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
	text+="<h2>Node Information</h2>";
	text+="<table border=\"0\">";
	text+="<tr style=\"tr\"><th align=\"left\">Node Id</th><td>"+ node.id +"</td></tr>";
	text+="<tr style=\"tr\"><th align=\"left\">Flow</th><td>"+ instance.flows[node.flowId].name +"</td></tr>";
	text+="<tr style=\"tr\"><th align=\"left\">Module</th><td>"+ module.name +"</td></tr>";
	text+="<tr style=\"tr\"><th align=\"left\">Name</th><td><span id=\"node_name_text_box\" class=\"configuration-content\"></span><span id=\"save_node_name_button\" class=\"configuration-content\"></span></div></td></tr>";
	text+="<tr style=\"tr\"><th align=\"left\">Delete</th><td><span id=\"delete_node_button\" class=\"configuration-content\"></span></div></td></tr>";
	text+="</table>";

	var form = "";
	form += "<h2>Node Configuration</h2>";
	form += "<div class=\"configuration\">";
//	form += "<div class=\"configuration-content\"><strong>Configuration:</strong></div>";
	var i;
	for (i = 0; i < module.configurations.length; i++) {
		var textBoxId = "flow_" + flowId + "_node_" + nodeId + "_"
				+ module.configurations[i].key;
		var divId = textBoxId + "_container";
		var hdfspathButtonId = textBoxId + "_hdfspathButton";
		form += "<div class=\"configuration-content\">";
		if (module.configurations[i].type == "BOOLEAN") {
			form += "<div class=\"configuration-content\"><span><strong>"
					+ module.configurations[i].displayName
					+ "</strong></span><span id=\"" + divId
					+ "\" class=\"configuration-content\"></span></div>";
		} else {
			form += ("<span><strong>" + module.configurations[i].displayName + "</strong></span>");
			form += "<div class=\"configuration-content\"><span id=\"" + divId
					+ "\" class=\"configuration-content\"></span><span id=\""
					+ hdfspathButtonId
					+ "\" class=\"configuration-content\"></div>";
		}
		form += "</div>";
	}
	form += "<div class=\"configuration-content\" id=\"save_configuration_button\"></div>";
	form += "</div>";
//	var information = $("#" + instance.informationContainerId).html();
//	$("#" + instance.informationContainerId).html(information + form);
	text += "<p></br>" + form;
	$("#" + instance.informationContainerId).html(text);
	
	

	if (dijit.byId("node_" + nodeId + "_name") != null) {
		dijit.registry.remove("node_" + nodeId + "_name");
	}
	var nodeNameTextBox = new dijit.form.TextBox({
		id : "node_" + nodeId + "_name",
		value : node.name,
		style : "width:300px;"
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
	
	
	for (i = 0; i < module.configurations.length; i++) {
		var textBoxId = "flow_" + flowId + "_node_" + nodeId + "_"
				+ module.configurations[i].key;
		var divId = textBoxId + "_container";
		var hdfspathButtonId = textBoxId + "_hdfspathButton";
		if (module.configurations[i].type == "BOOLEAN") {
			if (dijit.byId(textBoxId) != null) {
				dijit.registry.remove(textBoxId);
			}
			var configtype_true = new dijit.form.CheckBox({
				id : textBoxId,
				checked : (instance.getConfigurationValue(instance, flowId,
						nodeId, module.configurations[i].key) == "on") ? true
						: false
			});
			configtype_true.placeAt(dojo.byId(divId));
			configtype_true.startup();
		} else {
			if (dijit.byId(textBoxId) != null) {
				dijit.registry.remove(textBoxId);
			}
			var configurationTextBox = new dijit.form.TextBox({
				id : textBoxId,
				value : instance.getConfigurationValue(instance, flowId,
						nodeId, module.configurations[i].key),
				style : "width:600px;"
			});
			configurationTextBox.placeAt(dojo.byId(divId));
			configurationTextBox.startup();
			if (dijit.byId(textBoxId+"_hdfspath") != null) {
				dijit.registry.remove(textBoxId+"_hdfspath");
			}
			var a="_hdfspath";
			var hdfspathButton = new dijit.form.Button({
				id : textBoxId+a,
				label : "HDFS Path",
				onClick : function() {
					dijit.byId(this.id.replace(a,"")).set("value", hdfspath);
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
								location : [ 1.5, -0.1 ],
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
								location : [ -0.3, -0.2 ],
								label : module.inputs[j].name
							} ] ]
						}));
	}
};

