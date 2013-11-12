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

// Flow Operation Helper
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
