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

var flow;
var watchHandle;

dojo.ready(function() {
	flow = new HAFlow.Main(new HAFlow.UI());
	flow.init();
});

HAFlow.Main = function(ui) {
	this.basePath = dojo.byId("basePath").value;
	this.ui = ui;
	this.rootPath = "hdfs://133.133.2.150:9000/user/root/" + username;
	this.hdfspath = null;
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
					if((dijit.byId("oozie")==null)&&(dijit.byId("hive")==null))
					{
						var contentPane = new dijit.layout.ContentPane(
								{
									id : "oozie",
									title : "oozie",
									content : data,
									closable : true,
									onClose : function() {
										dijit.registry.remove("oozie");
										if(dijit.byId("hive")==null)
											{
											_currentInstance.ui.mainoozieContainer
											.addChild(_currentInstance.ui.leadingContainer);
											_currentInstance.ui.mainoozieContainer
											.addChild(_currentInstance.ui.trailingContainer);
											_currentInstance.ui.mainoozieContainer
											.addChild(_currentInstance.ui.centerContainerParent);
											_currentInstance.ui.centerContainerParent
											.addChild(_currentInstance.ui.centerContainer);
											_currentInstance.ui.mainoozieContainer
											.removeChild(_currentInstance.ui.oozieHiveContainer);									
											}
										else
											{
											
											}
										return true;
									}
								});


						_currentInstance.ui.mainoozieContainer
								.removeChild(_currentInstance.ui.leadingContainer);
						_currentInstance.ui.mainoozieContainer
								.removeChild(_currentInstance.ui.trailingContainer);
						_currentInstance.ui.mainoozieContainer
								.removeChild(_currentInstance.ui.centerContainerParent);
						_currentInstance.ui.centerContainerParent
						.removeChild(_currentInstance.ui.centerContainer);
						_currentInstance.ui.mainoozieContainer
						.addChild(_currentInstance.ui.oozieHiveContainer);	
						_currentInstance.ui.oozieHiveContainer.addChild(contentPane);
						_currentInstance.ui.oozieHiveContainer.selectChild(contentPane);
					}
					else
						{
						if(dijit.byId("oozie")==null)
							{
							var contentPane = new dijit.layout.ContentPane(
									{
										id : "oozie",
										title : "oozie",
										content : data,
										closable : true,
										onClose : function() {
											dijit.registry.remove("oozie");
											if(dijit.byId("hive")==null)
											{
											_currentInstance.ui.mainoozieContainer
											.addChild(_currentInstance.ui.leadingContainer);
											_currentInstance.ui.mainoozieContainer
											.addChild(_currentInstance.ui.trailingContainer);
											_currentInstance.ui.mainoozieContainer
											.addChild(_currentInstance.ui.centerContainerParent);
											_currentInstance.ui.centerContainerParent
											.addChild(_currentInstance.ui.centerContainer);
											_currentInstance.ui.mainoozieContainer
											.removeChild(_currentInstance.ui.oozieHiveContainer);
											}
											else{
												
											}
											return true;
										}
									});
							_currentInstance.ui.oozieHiveContainer.addChild(contentPane);
							_currentInstance.ui.oozieHiveContainer.selectChild(contentPane);
							}
						else{
							_currentInstance.ui.oozieHiveContainer.selectChild("oozie");
						}
						}
					
				},
				error : function(request, status, error) {
					HAFlow.showDialog("Error",
							"An error occurred while opening: " + error);
				}
			});
};

HAFlow.Main.prototype.openhive = function() {
	var _currentInstance = this;
	$
			.ajax({
				url : _currentInstance.basePath + "hive/",
				type : "Post",
				success : function(data, status) {
					if((dijit.byId("oozie")==null)&&(dijit.byId("hive")==null))
					{
						var contentPane = new dijit.layout.ContentPane(
								{
									id : "hive",
									title : "hive",
									content : data,
									closable : true,
									onClose : function() {
										dijit.registry.remove("hive");
										if(dijit.byId("oozie")==null)
											{
											_currentInstance.ui.mainoozieContainer
												.removeChild(_currentInstance.ui.oozieHiveContainer);
											_currentInstance.ui.mainoozieContainer
												.addChild(_currentInstance.ui.leadingContainer);
											_currentInstance.ui.mainoozieContainer
												.addChild(_currentInstance.ui.trailingContainer);
											_currentInstance.ui.mainoozieContainer
												.addChild(_currentInstance.ui.centerContainerParent);
											_currentInstance.ui.centerContainerParent
												.addChild(_currentInstance.ui.centerContainer);
											}
										else
											{
											
											
											}
										return true;
									}
								});
						_currentInstance.ui.mainoozieContainer
						.removeChild(_currentInstance.ui.leadingContainer);
						_currentInstance.ui.mainoozieContainer
								.removeChild(_currentInstance.ui.trailingContainer);
						_currentInstance.ui.mainoozieContainer
								.removeChild(_currentInstance.ui.centerContainerParent);
						_currentInstance.ui.centerContainerParent
							.removeChild(_currentInstance.ui.centerContainer);
						_currentInstance.ui.mainoozieContainer
							.addChild(_currentInstance.ui.oozieHiveContainer);	
						_currentInstance.ui.oozieHiveContainer.addChild(contentPane);
						_currentInstance.ui.oozieHiveContainer.selectChild(contentPane)
					}
					else
						{
						if(dijit.byId("hive")==null)
							{
							var contentPane = new dijit.layout.ContentPane(
									{
										id : "hive",
										title : "hive",
										content : data,
										closable : true,
										onClose : function() {
											dijit.registry.remove("hive");
											if(dijit.byId("oozie")==null)
											{
											_currentInstance.ui.mainoozieContainer
											.addChild(_currentInstance.ui.leadingContainer);
											_currentInstance.ui.mainoozieContainer
											.addChild(_currentInstance.ui.trailingContainer);
											_currentInstance.ui.mainoozieContainer
											.addChild(_currentInstance.ui.centerContainerParent);
											_currentInstance.ui.centerContainerParent
											.addChild(_currentInstance.ui.centerContainer);
											_currentInstance.ui.mainoozieContainer
											.removeChild(_currentInstance.ui.oozieHiveContainer);
											}
										else
											{
											
											}
											return true;
										}
									});						
							_currentInstance.ui.oozieHiveContainer.addChild(contentPane);
							_currentInstance.ui.oozieHiveContainer.selectChild(contentPane);
							}
						else{
							_currentInstance.ui.oozieHiveContainer.selectChild("hive");
						}
						}
					
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
	var _currentInstance = this;
	var url = path + "/" + fileName;
	$.ajax({
		url : this.basePath + "hdfs/file",
		type : "GET",
		dataType : "json",
		data : {
			path : path,
			fileName : fileName
		},
		success : function(data, status) {
			var content = data.content;
			content = content.replace(/\r\n/ig, "<br>");
			var length = content.split("<br>").length;
			if(length<100)
				{
				var contentPane = new dijit.layout.ContentPane({
					id : "flowContainerPane_" + url,
					title : fileName,
					content : "<div id=\"flowContainer_" + url + "\">"
							+ content + "</div>",
					closable : true,
					onClose : function() {
						dijit.registry.remove("flowContainerPane_" + url);
						return true;
					}
				});
				watchHandle.unwatch();
				_currentInstance.ui.centerContainer.addChild(contentPane);
				
				_currentInstance.ui.centerContainer.selectChild(dijit
						.byId("flowContainerPane_" + url));
				}
			else
				{
				if (dijit.byId("setreadline") != null) {
					dijit.registry.remove("setreadline");
				}
				if (dojo.byId("setreadline_btn") != null) {
					dijit.registry.remove("setreadline_btn");
				}
				if (dojo.byId("start") != null) {
					dijit.registry.remove("start");
				}
				var setreadlinedialog = new dijit.Dialog(
						{
							id:"setreadline",
							title : "Set Read Line",
							content : "<html><body><form id=\"setreadline\" method=\"post\">"
									+ "start with line:<input type=\"text\" id=\"start\" name=\"newname\"> </input>"
									+ " <button type=\"button\" id=\"setreadline_btn\">submit</button></form></body></html>"
						});
				setreadlinedialog.show();
				dojo
						.connect(
								dojo.byId("setreadline_btn"),
								"onclick",
								function() {
									var startline = document.getElementById("start").value - 1;
									if (length < startline)
										HAFlow.showDialog("Error", "It has only " + length + "line!");
									else {
										var tmp = content;
										var count = 0;
										for ( var i = 0; i < startline; i++) {
											var start = tmp.indexOf("<br>");
											tmp = tmp.slice(start + 4);
										}
										content = tmp;
										if (length - startline + 1 > 100) {
											for ( var i = 0; i < 100; i++) {
												var start = tmp.indexOf("<br>");
												tmp = tmp.slice(start + 4);
												count = start + count + 4;
											}
											content = content.substring(0, count);
										}
										var contentPane = new dijit.layout.ContentPane({
											id : "flowContainerPane_" + url,
											title : fileName,
											content : "<div id=\"flowContainer_" + url + "\">"
													+ content + "</div>",
											closable : true,
											onClose : function() {
												dijit.registry.remove("flowContainerPane_" + url);
												return true;
											}
										});
										watchHandle.unwatch();
										_currentInstance.ui.centerContainer.addChild(contentPane);
										
										_currentInstance.ui.centerContainer.selectChild(dijit
												.byId("flowContainerPane_" + url));
									}
									setreadlinedialog.destroy();
									});
				}

		},
		error : function(request, status, error) {
			HAFlow.showDialog("Error",
					"An error occurred while reading hdfs file: " + error);
		}
	});
};

HAFlow.Main.prototype.getHdfsPicture = function(path, fileName) {
	var url = this.basePath + "hdfs/picture" + "?path=" + path + "&fileName="
			+ fileName;
	if (dijit.byId("flowContainerPane_"+ path + "/" + fileName) == null) {
		var text = "";
		text += "<div id=\"flowContainer_" + url + "\"><img src=\"" + url
				+ "\"/>";
		text += "</div>";
		var contentPane = new dijit.layout.ContentPane({
			id : "flowContainerPane_" + path + "/" + fileName,
			title : fileName,
			content : text,
			closable : true,
			onClose : function() {
				dijit.registry.remove("flowContainerPane_" + path + "/"
						+ fileName);
				return true;
			}
		});
		this.ui.centerContainer.addChild(contentPane);
		watchHandle.unwatch();
		this.ui.centerContainer.selectChild(dijit.byId("flowContainerPane_"
				+ path + "/" + fileName));
	} else
		this.ui.centerContainer.selectChild(dijit.byId("flowContainerPane_"
				+ path + "/" + fileName));
};

HAFlow.Main.prototype.getHdfsCsv = function(path, fileName) {
	var _currentInstance = this;
	var url = this.basePath + "hdfs/cvs_file" + "?path=" + path + "/"
			+ fileName;
	$.ajax({
		url : url,
		type : "GET",
		dataType : "html",
		success : function(data, status) {
			var text = "";
			text+=data;
			if(dijit.byId("flowContainerPane_" + path + "/"+ fileName)!=null)
				{
				watchHandle.unwatch();
				_currentInstance.ui.centerContainer.selectChild(dijit.byId("flowContainerPane_"
						+ path + "/" + fileName));
				}
			else{
				var contentPane = new  dojox.layout.ContentPane(
						{
							id : "flowContainerPane_" + path + "/"+ fileName,
							title : fileName,
							content : text,
							closable : true,
							onClose : function() {
								dijit.registry.remove("flowContainerPane_" + path + "/"+ fileName);
								return true;
							}
						});
				_currentInstance.ui.centerContainer.addChild(contentPane);
				watchHandle.unwatch();
				_currentInstance.ui.centerContainer.selectChild(dijit.byId("flowContainerPane_"
						+ path + "/" + fileName));
			}
		},
/*		success :function(rawdata, status) {
			
			console.log(rawdata);
			var text = "";
			text += "<div id=\"gridDiv\">";
			<div id="gridContainer"><div hidefocus="hidefocus" role="grid" dojoattachevent="onmouseout:_mouseOut" tabindex="0" aria-multiselectable="true" class="dojoxGrid" id="grid" align="left" widgetid="grid" aria-readonly="true" style="height: 420px; -webkit-user-select: none;">
			<div class="dojoxGridMasterHeader" dojoattachpoint="viewsHeaderNode" role="presentation" style="display: block; height: 40px;"><div class="dojoxGridHeader" dojoattachpoint="headerNode" role="presentation" style="width: 1044px; left: 1px; top: 0px;">
				<div dojoattachpoint="headerNodeContainer" style="width:9000em" role="presentation">
					<div dojoattachpoint="headerContentNode" role="row"><table class="dojoxGridRowTable" border="0" cellspacing="0" cellpadding="0" role="presentation"><tbody><tr><th tabindex="-1" aria-readonly="true" role="columnheader" id="gridHdr0" class="dojoxGridCell dojoDndItem" idx="0" style="width:6em;" dndtype="gridColumn_grid"><div class="dojoxGridSortNode">Index(1)</div></th><th tabindex="-1" aria-readonly="true" role="columnheader" id="gridHdr1" class="dojoxGridCell dojoDndItem" idx="1" style="width:6em;" dndtype="gridColumn_grid"><div class="dojoxGridSortNode">Genre(2)</div></th><th tabindex="-1" aria-readonly="true" role="columnheader" id="gridHdr2" class="dojoxGridCell dojoDndItem" idx="2" style="width:6em;" dndtype="gridColumn_grid"><div class="dojoxGridSortNode">Artist(3)</div></th><th tabindex="-1" aria-readonly="true" role="columnheader" id="gridHdr3" class="dojoxGridCell dojoDndItem" idx="3" style="width:6em;" dndtype="gridColumn_grid"><div class="dojoxGridSortNode">Year(4)</div></th><th tabindex="-1" aria-readonly="true" role="columnheader" id="gridHdr4" class="dojoxGridCell dojoDndItem" idx="4" style="width:6em;" dndtype="gridColumn_grid"><div class="dojoxGridSortNode">Album(5)</div></th><th tabindex="-1" aria-readonly="true" role="columnheader" id="gridHdr5" class="dojoxGridCell dojoDndItem " idx="5" style="width:6em;" dndtype="gridColumn_grid"><div class="dojoxGridSortNode">Name(6)</div></th><th tabindex="-1" aria-readonly="true" role="columnheader" id="gridHdr6" class="dojoxGridCell dojoDndItem" idx="6" style="width:6em;" dndtype="gridColumn_grid"><div class="dojoxGridSortNode">Length(7)</div></th><th tabindex="-1" aria-readonly="true" role="columnheader" id="gridHdr7" class="dojoxGridCell dojoDndItem " idx="7" style="width:6em;" dndtype="gridColumn_grid"><div class="dojoxGridSortNode">Track(8)</div></th><th tabindex="-1" aria-readonly="true" role="columnheader" id="gridHdr8" class="dojoxGridCell dojoDndItem" idx="8" style="width:6em;" dndtype="gridColumn_grid"><div class="dojoxGridSortNode">Composer(9)</div></th><th tabindex="-1" aria-readonly="true" role="columnheader" id="gridHdr9" class="dojoxGridCell dojoDndItem" idx="9" style="width:6em;" dndtype="gridColumn_grid"><div class="dojoxGridSortNode">Download Date(10)</div></th><th tabindex="-1" aria-readonly="true" role="columnheader" id="gridHdr10" class="dojoxGridCell dojoDndItem" idx="10" style="width:6em;" dndtype="gridColumn_grid"><div class="dojoxGridSortNode">Last Played(11)</div></th></tr></tbody></table></div>
				</div>
			</div></div>
			<div class="dojoxGridMasterView" dojoattachpoint="viewsNode" role="presentation"><div class="dojoxGridView" role="presentation" id="dojox_grid__View_25" widgetid="dojox_grid__View_25" style="width: 1044px; height: 378px; left: 1px; top: 0px;">
			
			<input type="checkbox" class="dojoxGridHiddenFocus" dojoattachpoint="hiddenFocusNode" role="presentation">
			<input type="checkbox" class="dojoxGridHiddenFocus" role="presentation">
			<div class="dojoxGridScrollbox" dojoattachpoint="scrollboxNode" role="presentation" style="height: 378px;">
				<div class="dojoxGridContent" dojoattachpoint="contentNode" hidefocus="hidefocus" role="presentation" style="height: 6790px; width: 1027px;"><div role="presentation" style="position: absolute; left: 0px; top: 0px;"><div class="dojoxGridRow" role="row" aria-selected="false" style=""><table class="dojoxGridRowTable" border="0" cellspacing="0" cellpadding="0" role="presentation"><tbody><tr><td tabindex="-1" role="gridcell" class="dojoxGridCell " idx="0" style="width:6em;">1</td><td tabindex="-1" role="gridcell" class="dojoxGridCell" idx="1" style="width:6em;">Easy Listening</td><td tabindex="-1" role="gridcell" class="dojoxGridCell" idx="2" style="width:6em;">Bette Midler</td><td tabindex="-1" role="gridcell" class="dojoxGridCell" idx="3" style="width:6em;">2003</td><td tabindex="-1" role="gridcell" class="dojoxGridCell" idx="4" style="width:6em;">Bette Midler Sings the Rosemary Clooney Songbook</td><td tabindex="-1" role="gridcell" class="dojoxGridCell" idx="5" style="width:6em;">Hey There</td><td tabindex="-1" role="gridcell" class="dojoxGridCell" idx="6" style="width:6em;">03:31</td><td tabindex="-1" role="gridcell" class="dojoxGridCell " idx="7" style="width:6em;">4</td><td tabindex="-1" role="gridcell" class="dojoxGridCell" idx="8" style="width:6em;">Ross, Jerry 1926-1956 -w Adler, Richard 1921-</td><td tabindex="-1" role="gridcell" class="dojoxGridCell" idx="9" style="width:6em;">1923/4/9</td><td tabindex="-1" role="gridcell" class="dojoxGridCell" idx="10" style="width:6em;">04:32:49</td></tr></tbody></table></div><div class="dojoxGridRow dojoxGridRowOdd" role="row" aria-selected="false" style=""><table class="dojoxGridRowTable" border="0" cellspacing="0" cellpadding="0" role="presentation"><tbody><tr><td tabindex="-1" role="gridcell" class="dojoxGridCell " idx="0" style="width:6em;">2</td><td tabindex="-1" role="gridcell" class="dojoxGridCell" idx="1" style="width:6em;">Classic Rock</td><td tabindex="-1" role="gridcell" class="dojoxGridCell" idx="2" style="width:6em;">Jimi Hendrix</td><td tabindex="-1" role="gridcell" class="dojoxGridCell" idx="3" style="width:6em;">1993</td><td tabindex="-1" role="gridcell" class="dojoxGridCell" idx="4" style="width:6em;">Are You Experienced</td><td tabindex="-1" role="gridcell" class="dojoxGridCell " idx="5" style="width:6em;">Love Or Confusion</td><td tabindex="-1" role="gridcell" class="dojoxGridCell " idx="6" style="width:6em;">03:15</td><td tabindex="-1" role="gridcell" class="dojoxGridCell " idx="7" style="width:6em;">4</td><td tabindex="-1" role="gridcell" class="dojoxGridCell" idx="8" style="width:6em;">Jimi Hendrix</td><td tabindex="-1" role="gridcell" class="dojoxGridCell" idx="9" style="width:6em;">1947/12/6</td><td tabindex="-1" role="gridcell" class="dojoxGridCell" idx="10" style="width:6em;">03:47:49</td></tr></tbody></table></div><div class="dojoxGridRow" role="row" aria-selected="false" style=""><table class="dojoxGridRowTable" border="0" cellspacing="0" cellpadding="0" role="presentation"><tbody><tr><td tabindex="-1" role="gridcell" class="dojoxGridCell" idx="0" style="width:6em;">3</td><td tabindex="-1" role="gridcell" class="dojoxGridCell" idx="1" style="width:6em;">Jazz</td><td tabindex="-1" role="gridcell" class="dojoxGridCell" idx="2" style="width:6em;">Andy Narell</td><td tabindex="-1" role="gridcell" class="dojoxGridCell" idx="3" style="width:6em;">1992</td><td tabindex="-1" role="gridcell" class="dojoxGridCell" idx="4" style="width:6em;">Down the Road</td><td tabindex="-1" role="gridcell" class="dojoxGridCell" idx="5" style="width:6em;">Sugar Street</td><td tabindex="-1" role="gridcell" class="dojoxGridCell" idx="6" style="width:6em;">07:00</td><td tabindex="-1" role="gridcell" class="dojoxGridCell" idx="7" style="width:6em;">8</td><td tabindex="-1" role="gridcell" class="dojoxGridCell " idx="8" style="width:6em;">Andy Narell</td><td tabindex="-1" role="gridcell" class="dojoxGridCell" idx="9" style="width:6em;">1906/3/22</td><td tabindex="-1" role="gridcell" class="dojoxGridCell " idx="10" style="width:6em;">21:56:15</td></tr></tbody></table></div><div class="dojoxGridRow dojoxGridRowOdd" role="row" aria-selected="false" style=""><table class="dojoxGridRowTable" border="0" cellspacing="0" cellpadding="0" role="presentation"><tbody><tr><td tabindex="-1" role="gridcell" class="dojoxGridCell" idx="0" style="width:6em;">4</td><td tabindex="-1" role="gridcell" class="dojoxGridCell " idx="1" style="width:6em;">Progressive Rock</td><td tabindex="-1" role="gridcell" class="dojoxGridCell" idx="2" style="width:6em;">Emerson, Lake &amp; Palmer</td><td tabindex="-1" role="gridcell" class="dojoxGridCell" idx="3" style="width:6em;">1992</td><td tabindex="-1" role="gridcell" class="dojoxGridCell" idx="4" style="width:6em;">The Atlantic Years</td><td tabindex="-1" role="gridcell" class="dojoxGridCell" idx="5" style="width:6em;">Tarkus</td><td tabindex="-1" role="gridcell" class="dojoxGridCell" idx="6" style="width:6em;">20:40</td><td tabindex="-1" role="gridcell" class="dojoxGridCell" idx="7" style="width:6em;">5</td><td tabindex="-1" role="gridcell" class="dojoxGridCell " idx="8" style="width:6em;">Greg Lake/Keith Emerson</td><td tabindex="-1" role="gridcell" class="dojoxGridCell" idx="9" style="width:6em;">1994/11/29</td><td tabindex="-1" role="gridcell" class="dojoxGridCell " idx="10" style="width:6em;">03:25:19</td></tr></tbody></table></div><div class="dojoxGridRow" role="row" aria-selected="false" style=""><table class="dojoxGridRowTable" border="0" cellspacing="0" cellpadding="0" role="presentation"><tbody><tr><td tabindex="-1" role="gridcell" class="dojoxGridCell " idx="0" style="width:6em;">5</td><td tabindex="-1" role="gridcell" class="dojoxGridCell " idx="1" style="width:6em;">Rock</td><td tabindex="-1" role="gridcell" class="dojoxGridCell" idx="2" style="width:6em;">Blood, Sweat &amp; Tears</td><td tabindex="-1" role="gridcell" class="dojoxGridCell" idx="3" style="width:6em;">1968</td><td tabindex="-1" role="gridcell" class="dojoxGridCell" idx="4" style="width:6em;">Child Is Father To The Man</td><td tabindex="-1" role="gridcell" class="dojoxGridCell" idx="5" style="width:6em;">Somethin' Goin' On</td><td tabindex="-1" role="gridcell" class="dojoxGridCell" idx="6" style="width:6em;">08:00</td><td tabindex="-1" role="gridcell" class="dojoxGridCell" idx="7" style="width:6em;">9</td><td tabindex="-1" role="gridcell" class="dojoxGridCell" idx="8" style="width:6em;"></td><td tabindex="-1" role="gridcell" class="dojoxGridCell " idx="9" style="width:6em;">1973/9/11</td><td tabindex="-1" role="gridcell" class="dojoxGridCell" idx="10" style="width:6em;">19:49:41</td></tr></tbody></table></div></div><div role="presentation" style="position: absolute; left: 0px; top: 265px;"><div class="dojoxGridRow dojoxGridRowOdd" role="row" aria-selected="false" style=""><table class="dojoxGridRowTable" border="0" cellspacing="0" cellpadding="0" role="presentation"><tbody><tr><td tabindex="-1" role="gridcell" class="dojoxGridCell " idx="0" style="width:6em;">6</td><td tabindex="-1" role="gridcell" class="dojoxGridCell " idx="1" style="width:6em;">Jazz</td><td tabindex="-1" role="gridcell" class="dojoxGridCell " idx="2" style="width:6em;">Andy Narell</td><td tabindex="-1" role="gridcell" class="dojoxGridCell" idx="3" style="width:6em;">1989</td><td tabindex="-1" role="gridcell" class="dojoxGridCell" idx="4" style="width:6em;">Little Secrets</td><td tabindex="-1" role="gridcell" class="dojoxGridCell" idx="5" style="width:6em;">Armchair Psychology</td><td tabindex="-1" role="gridcell" class="dojoxGridCell" idx="6" style="width:6em;">08:20</td><td tabindex="-1" role="gridcell" class="dojoxGridCell " idx="7" style="width:6em;">5</td><td tabindex="-1" role="gridcell" class="dojoxGridCell" idx="8" style="width:6em;">Andy Narell</td><td tabindex="-1" role="gridcell" class="dojoxGridCell " idx="9" style="width:6em;">2010/4/15</td><td tabindex="-1" role="gridcell" class="dojoxGridCell" idx="10" style="width:6em;">01:13:08</td></tr></tbody></table></div><div class="dojoxGridRow" role="row" aria-selected="false" style=""><table class="dojoxGridRowTable" border="0" cellspacing="0" cellpadding="0" role="presentation"><tbody><tr><td tabindex="-1" role="gridcell" class="dojoxGridCell " idx="0" style="width:6em;">7</td><td tabindex="-1" role="gridcell" class="dojoxGridCell " idx="1" style="width:6em;">Easy Listening</td><td tabindex="-1" role="gridcell" class="dojoxGridCell " idx="2" style="width:6em;">Frank Sinatra</td><td tabindex="-1" role="gridcell" class="dojoxGridCell" idx="3" style="width:6em;">1991</td><td tabindex="-1" role="gridcell" class="dojoxGridCell" idx="4" style="width:6em;">Sinatra Reprise: The Very Good Years</td><td tabindex="-1" role="gridcell" class="dojoxGridCell" idx="5" style="width:6em;">Luck Be A Lady</td><td tabindex="-1" role="gridcell" class="dojoxGridCell" idx="6" style="width:6em;">05:16</td><td tabindex="-1" role="gridcell" class="dojoxGridCell" idx="7" style="width:6em;">4</td><td tabindex="-1" role="gridcell" class="dojoxGridCell " idx="8" style="width:6em;">F. Loesser</td><td tabindex="-1" role="gridcell" class="dojoxGridCell" idx="9" style="width:6em;">2035/4/12</td><td tabindex="-1" role="gridcell" class="dojoxGridCell" idx="10" style="width:6em;">06:16:53</td></tr></tbody></table></div><div class="dojoxGridRow dojoxGridRowOdd" role="row" aria-selected="false" style=""><table class="dojoxGridRowTable" border="0" cellspacing="0" cellpadding="0" role="presentation"><tbody><tr><td tabindex="-1" role="gridcell" class="dojoxGridCell " idx="0" style="width:6em;">8</td><td tabindex="-1" role="gridcell" class="dojoxGridCell " idx="1" style="width:6em;">Progressive Rock</td><td tabindex="-1" role="gridcell" class="dojoxGridCell " idx="2" style="width:6em;">Dixie dregs</td><td tabindex="-1" role="gridcell" class="dojoxGridCell " idx="3" style="width:6em;">1977</td><td tabindex="-1" role="gridcell" class="dojoxGridCell" idx="4" style="width:6em;">Free Fall</td><td tabindex="-1" role="gridcell" class="dojoxGridCell " idx="5" style="width:6em;">Sleep</td><td tabindex="-1" role="gridcell" class="dojoxGridCell" idx="6" style="width:6em;">01:58</td><td tabindex="-1" role="gridcell" class="dojoxGridCell " idx="7" style="width:6em;">6</td><td tabindex="-1" role="gridcell" class="dojoxGridCell " idx="8" style="width:6em;">Steve Morse</td><td tabindex="-1" role="gridcell" class="dojoxGridCell" idx="9" style="width:6em;">2032/11/21</td><td tabindex="-1" role="gridcell" class="dojoxGridCell " idx="10" style="width:6em;">08:23:26</td></tr></tbody></table></div><div class="dojoxGridRow" role="row" aria-selected="false" style=""><table class="dojoxGridRowTable" border="0" cellspacing="0" cellpadding="0" role="presentation"><tbody><tr><td tabindex="-1" role="gridcell" class="dojoxGridCell " idx="0" style="width:6em;">9</td><td tabindex="-1" role="gridcell" class="dojoxGridCell " idx="1" style="width:6em;">Easy Listening</td><td tabindex="-1" role="gridcell" class="dojoxGridCell " idx="2" style="width:6em;">Bette Midler</td><td tabindex="-1" role="gridcell" class="dojoxGridCell " idx="3" style="width:6em;">2003</td><td tabindex="-1" role="gridcell" class="dojoxGridCell " idx="4" style="width:6em;">Bette Midler Sings the Rosemary Clooney Songbook</td><td tabindex="-1" role="gridcell" class="dojoxGridCell " idx="5" style="width:6em;">Hey There</td><td tabindex="-1" role="gridcell" class="dojoxGridCell " idx="6" style="width:6em;">03:31</td><td tabindex="-1" role="gridcell" class="dojoxGridCell " idx="7" style="width:6em;">4</td><td tabindex="-1" role="gridcell" class="dojoxGridCell " idx="8" style="width:6em;">Ross, Jerry 1926-1956 -w Adler, Richard 1921-</td><td tabindex="-1" role="gridcell" class="dojoxGridCell " idx="9" style="width:6em;">1923/4/9</td><td tabindex="-1" role="gridcell" class="dojoxGridCell " idx="10" style="width:6em;">04:32:49</td></tr></tbody></table></div><div class="dojoxGridRow dojoxGridRowOdd" role="row" aria-selected="false" style=""><table class="dojoxGridRowTable" border="0" cellspacing="0" cellpadding="0" role="presentation"><tbody><tr><td tabindex="-1" role="gridcell" class="dojoxGridCell " idx="0" style="width:6em;">10</td><td tabindex="-1" role="gridcell" class="dojoxGridCell " idx="1" style="width:6em;">Classic Rock</td><td tabindex="-1" role="gridcell" class="dojoxGridCell " idx="2" style="width:6em;">Jimi Hendrix</td><td tabindex="-1" role="gridcell" class="dojoxGridCell " idx="3" style="width:6em;">1993</td><td tabindex="-1" role="gridcell" class="dojoxGridCell " idx="4" style="width:6em;">Are You Experienced</td><td tabindex="-1" role="gridcell" class="dojoxGridCell " idx="5" style="width:6em;">Love Or Confusion</td><td tabindex="-1" role="gridcell" class="dojoxGridCell " idx="6" style="width:6em;">03:15</td><td tabindex="-1" role="gridcell" class="dojoxGridCell " idx="7" style="width:6em;">4</td><td tabindex="-1" role="gridcell" class="dojoxGridCell " idx="8" style="width:6em;">Jimi Hendrix</td><td tabindex="-1" role="gridcell" class="dojoxGridCell " idx="9" style="width:6em;">1947/12/6</td><td tabindex="-1" role="gridcell" class="dojoxGridCell " idx="10" style="width:6em;">03:47:49</td></tr></tbody></table></div></div><div role="presentation" style="position: absolute; left: 0px; top: 530px;"><div class="dojoxGridRow" role="row" aria-selected="false" style=""><table class="dojoxGridRowTable" border="0" cellspacing="0" cellpadding="0" role="presentation"><tbody><tr><td tabindex="-1" role="gridcell" class="dojoxGridCell " idx="0" style="width:6em;">11</td><td tabindex="-1" role="gridcell" class="dojoxGridCell " idx="1" style="width:6em;">Jazz</td><td tabindex="-1" role="gridcell" class="dojoxGridCell " idx="2" style="width:6em;">Andy Narell</td><td tabindex="-1" role="gridcell" class="dojoxGridCell " idx="3" style="width:6em;">1992</td><td tabindex="-1" role="gridcell" class="dojoxGridCell " idx="4" style="width:6em;">Down the Road</td><td tabindex="-1" role="gridcell" class="dojoxGridCell " idx="5" style="width:6em;">Sugar Street</td><td tabindex="-1" role="gridcell" class="dojoxGridCell " idx="6" style="width:6em;">07:00</td><td tabindex="-1" role="gridcell" class="dojoxGridCell " idx="7" style="width:6em;">8</td><td tabindex="-1" role="gridcell" class="dojoxGridCell " idx="8" style="width:6em;">Andy Narell</td><td tabindex="-1" role="gridcell" class="dojoxGridCell " idx="9" style="width:6em;">1906/3/22</td><td tabindex="-1" role="gridcell" class="dojoxGridCell " idx="10" style="width:6em;">21:56:15</td></tr></tbody></table></div><div class="dojoxGridRow dojoxGridRowOdd" role="row" aria-selected="false" style=""><table class="dojoxGridRowTable" border="0" cellspacing="0" cellpadding="0" role="presentation"><tbody><tr><td tabindex="-1" role="gridcell" class="dojoxGridCell " idx="0" style="width:6em;">12</td><td tabindex="-1" role="gridcell" class="dojoxGridCell " idx="1" style="width:6em;">Progressive Rock</td><td tabindex="-1" role="gridcell" class="dojoxGridCell " idx="2" style="width:6em;">Emerson, Lake &amp; Palmer</td><td tabindex="-1" role="gridcell" class="dojoxGridCell " idx="3" style="width:6em;">1992</td><td tabindex="-1" role="gridcell" class="dojoxGridCell " idx="4" style="width:6em;">The Atlantic Years</td><td tabindex="-1" role="gridcell" class="dojoxGridCell " idx="5" style="width:6em;">Tarkus</td><td tabindex="-1" role="gridcell" class="dojoxGridCell " idx="6" style="width:6em;">20:40</td><td tabindex="-1" role="gridcell" class="dojoxGridCell " idx="7" style="width:6em;">5</td><td tabindex="-1" role="gridcell" class="dojoxGridCell " idx="8" style="width:6em;">Greg Lake/Keith Emerson</td><td tabindex="-1" role="gridcell" class="dojoxGridCell " idx="9" style="width:6em;">1994/11/29</td><td tabindex="-1" role="gridcell" class="dojoxGridCell " idx="10" style="width:6em;">03:25:19</td></tr></tbody></table></div><div class="dojoxGridRow" role="row" aria-selected="false" style=""><table class="dojoxGridRowTable" border="0" cellspacing="0" cellpadding="0" role="presentation"><tbody><tr><td tabindex="-1" role="gridcell" class="dojoxGridCell " idx="0" style="width:6em;">13</td><td tabindex="-1" role="gridcell" class="dojoxGridCell " idx="1" style="width:6em;">Rock</td><td tabindex="-1" role="gridcell" class="dojoxGridCell " idx="2" style="width:6em;">Blood, Sweat &amp; Tears</td><td tabindex="-1" role="gridcell" class="dojoxGridCell " idx="3" style="width:6em;">1968</td><td tabindex="-1" role="gridcell" class="dojoxGridCell " idx="4" style="width:6em;">Child Is Father To The Man</td><td tabindex="-1" role="gridcell" class="dojoxGridCell " idx="5" style="width:6em;">Somethin' Goin' On</td><td tabindex="-1" role="gridcell" class="dojoxGridCell " idx="6" style="width:6em;">08:00</td><td tabindex="-1" role="gridcell" class="dojoxGridCell " idx="7" style="width:6em;">9</td><td tabindex="-1" role="gridcell" class="dojoxGridCell " idx="8" style="width:6em;"></td><td tabindex="-1" role="gridcell" class="dojoxGridCell " idx="9" style="width:6em;">1973/9/11</td><td tabindex="-1" role="gridcell" class="dojoxGridCell " idx="10" style="width:6em;">19:49:41</td></tr></tbody></table></div><div class="dojoxGridRow dojoxGridRowOdd" role="row" aria-selected="false" style=""><table class="dojoxGridRowTable" border="0" cellspacing="0" cellpadding="0" role="presentation"><tbody><tr><td tabindex="-1" role="gridcell" class="dojoxGridCell " idx="0" style="width:6em;">14</td><td tabindex="-1" role="gridcell" class="dojoxGridCell " idx="1" style="width:6em;">Jazz</td><td tabindex="-1" role="gridcell" class="dojoxGridCell " idx="2" style="width:6em;">Andy Narell</td><td tabindex="-1" role="gridcell" class="dojoxGridCell " idx="3" style="width:6em;">1989</td><td tabindex="-1" role="gridcell" class="dojoxGridCell " idx="4" style="width:6em;">Little Secrets</td><td tabindex="-1" role="gridcell" class="dojoxGridCell " idx="5" style="width:6em;">Armchair Psychology</td><td tabindex="-1" role="gridcell" class="dojoxGridCell " idx="6" style="width:6em;">08:20</td><td tabindex="-1" role="gridcell" class="dojoxGridCell " idx="7" style="width:6em;">5</td><td tabindex="-1" role="gridcell" class="dojoxGridCell " idx="8" style="width:6em;">Andy Narell</td><td tabindex="-1" role="gridcell" class="dojoxGridCell " idx="9" style="width:6em;">2010/4/15</td><td tabindex="-1" role="gridcell" class="dojoxGridCell " idx="10" style="width:6em;">01:13:08</td></tr></tbody></table></div><div class="dojoxGridRow" role="row" aria-selected="false" style=""><table class="dojoxGridRowTable" border="0" cellspacing="0" cellpadding="0" role="presentation"><tbody><tr><td tabindex="-1" role="gridcell" class="dojoxGridCell " idx="0" style="width:6em;">15</td><td tabindex="-1" role="gridcell" class="dojoxGridCell " idx="1" style="width:6em;">Easy Listening</td><td tabindex="-1" role="gridcell" class="dojoxGridCell " idx="2" style="width:6em;">Frank Sinatra</td><td tabindex="-1" role="gridcell" class="dojoxGridCell " idx="3" style="width:6em;">1991</td><td tabindex="-1" role="gridcell" class="dojoxGridCell " idx="4" style="width:6em;">Sinatra Reprise: The Very Good Years</td><td tabindex="-1" role="gridcell" class="dojoxGridCell " idx="5" style="width:6em;">Luck Be A Lady</td><td tabindex="-1" role="gridcell" class="dojoxGridCell " idx="6" style="width:6em;">05:16</td><td tabindex="-1" role="gridcell" class="dojoxGridCell " idx="7" style="width:6em;">4</td><td tabindex="-1" role="gridcell" class="dojoxGridCell " idx="8" style="width:6em;">F. Loesser</td><td tabindex="-1" role="gridcell" class="dojoxGridCell " idx="9" style="width:6em;">2035/4/12</td><td tabindex="-1" role="gridcell" class="dojoxGridCell " idx="10" style="width:6em;">06:16:53</td></tr></tbody></table></div></div><div role="presentation" style="position: absolute; left: 0px; top: 780px;"><div class="dojoxGridRow dojoxGridRowOdd" role="row" aria-selected="false" style=""><table class="dojoxGridRowTable" border="0" cellspacing="0" cellpadding="0" role="presentation"><tbody><tr><td tabindex="-1" role="gridcell" class="dojoxGridCell " idx="0" style="width:6em;">16</td><td tabindex="-1" role="gridcell" class="dojoxGridCell " idx="1" style="width:6em;">Progressive Rock</td><td tabindex="-1" role="gridcell" class="dojoxGridCell " idx="2" style="width:6em;">Dixie dregs</td><td tabindex="-1" role="gridcell" class="dojoxGridCell " idx="3" style="width:6em;">1977</td><td tabindex="-1" role="gridcell" class="dojoxGridCell " idx="4" style="width:6em;">Free Fall</td><td tabindex="-1" role="gridcell" class="dojoxGridCell " idx="5" style="width:6em;">Sleep</td><td tabindex="-1" role="gridcell" class="dojoxGridCell " idx="6" style="width:6em;">01:58</td><td tabindex="-1" role="gridcell" class="dojoxGridCell " idx="7" style="width:6em;">6</td><td tabindex="-1" role="gridcell" class="dojoxGridCell " idx="8" style="width:6em;">Steve Morse</td><td tabindex="-1" role="gridcell" class="dojoxGridCell " idx="9" style="width:6em;">2032/11/21</td><td tabindex="-1" role="gridcell" class="dojoxGridCell " idx="10" style="width:6em;">08:23:26</td></tr></tbody></table></div><div class="dojoxGridRow" role="row" aria-selected="false" style=""><table class="dojoxGridRowTable" border="0" cellspacing="0" cellpadding="0" role="presentation"><tbody><tr><td tabindex="-1" role="gridcell" class="dojoxGridCell " idx="0" style="width:6em;">17</td><td tabindex="-1" role="gridcell" class="dojoxGridCell " idx="1" style="width:6em;">Easy Listening</td><td tabindex="-1" role="gridcell" class="dojoxGridCell " idx="2" style="width:6em;">Bette Midler</td><td tabindex="-1" role="gridcell" class="dojoxGridCell " idx="3" style="width:6em;">2003</td><td tabindex="-1" role="gridcell" class="dojoxGridCell " idx="4" style="width:6em;">Bette Midler Sings the Rosemary Clooney Songbook</td><td tabindex="-1" role="gridcell" class="dojoxGridCell " idx="5" style="width:6em;">Hey There</td><td tabindex="-1" role="gridcell" class="dojoxGridCell " idx="6" style="width:6em;">03:31</td><td tabindex="-1" role="gridcell" class="dojoxGridCell " idx="7" style="width:6em;">4</td><td tabindex="-1" role="gridcell" class="dojoxGridCell " idx="8" style="width:6em;">Ross, Jerry 1926-1956 -w Adler, Richard 1921-</td><td tabindex="-1" role="gridcell" class="dojoxGridCell " idx="9" style="width:6em;">1923/4/9</td><td tabindex="-1" role="gridcell" class="dojoxGridCell " idx="10" style="width:6em;">04:32:49</td></tr></tbody></table></div><div class="dojoxGridRow dojoxGridRowOdd" role="row" aria-selected="false" style=""><table class="dojoxGridRowTable" border="0" cellspacing="0" cellpadding="0" role="presentation"><tbody><tr><td tabindex="-1" role="gridcell" class="dojoxGridCell " idx="0" style="width:6em;">18</td><td tabindex="-1" role="gridcell" class="dojoxGridCell " idx="1" style="width:6em;">Classic Rock</td><td tabindex="-1" role="gridcell" class="dojoxGridCell " idx="2" style="width:6em;">Jimi Hendrix</td><td tabindex="-1" role="gridcell" class="dojoxGridCell " idx="3" style="width:6em;">1993</td><td tabindex="-1" role="gridcell" class="dojoxGridCell " idx="4" style="width:6em;">Are You Experienced</td><td tabindex="-1" role="gridcell" class="dojoxGridCell " idx="5" style="width:6em;">Love Or Confusion</td><td tabindex="-1" role="gridcell" class="dojoxGridCell " idx="6" style="width:6em;">03:15</td><td tabindex="-1" role="gridcell" class="dojoxGridCell " idx="7" style="width:6em;">4</td><td tabindex="-1" role="gridcell" class="dojoxGridCell " idx="8" style="width:6em;">Jimi Hendrix</td><td tabindex="-1" role="gridcell" class="dojoxGridCell " idx="9" style="width:6em;">1947/12/6</td><td tabindex="-1" role="gridcell" class="dojoxGridCell " idx="10" style="width:6em;">03:47:49</td></tr></tbody></table></div><div class="dojoxGridRow" role="row" aria-selected="false" style=""><table class="dojoxGridRowTable" border="0" cellspacing="0" cellpadding="0" role="presentation"><tbody><tr><td tabindex="-1" role="gridcell" class="dojoxGridCell " idx="0" style="width:6em;">19</td><td tabindex="-1" role="gridcell" class="dojoxGridCell " idx="1" style="width:6em;">Jazz</td><td tabindex="-1" role="gridcell" class="dojoxGridCell " idx="2" style="width:6em;">Andy Narell</td><td tabindex="-1" role="gridcell" class="dojoxGridCell " idx="3" style="width:6em;">1992</td><td tabindex="-1" role="gridcell" class="dojoxGridCell " idx="4" style="width:6em;">Down the Road</td><td tabindex="-1" role="gridcell" class="dojoxGridCell " idx="5" style="width:6em;">Sugar Street</td><td tabindex="-1" role="gridcell" class="dojoxGridCell " idx="6" style="width:6em;">07:00</td><td tabindex="-1" role="gridcell" class="dojoxGridCell " idx="7" style="width:6em;">8</td><td tabindex="-1" role="gridcell" class="dojoxGridCell " idx="8" style="width:6em;">Andy Narell</td><td tabindex="-1" role="gridcell" class="dojoxGridCell " idx="9" style="width:6em;">1906/3/22</td><td tabindex="-1" role="gridcell" class="dojoxGridCell " idx="10" style="width:6em;">21:56:15</td></tr></tbody></table></div><div class="dojoxGridRow dojoxGridRowOdd" role="row" aria-selected="false" style=""><table class="dojoxGridRowTable" border="0" cellspacing="0" cellpadding="0" role="presentation"><tbody><tr><td tabindex="-1" role="gridcell" class="dojoxGridCell " idx="0" style="width:6em;">20</td><td tabindex="-1" role="gridcell" class="dojoxGridCell " idx="1" style="width:6em;">Progressive Rock</td><td tabindex="-1" role="gridcell" class="dojoxGridCell " idx="2" style="width:6em;">Emerson, Lake &amp; Palmer</td><td tabindex="-1" role="gridcell" class="dojoxGridCell " idx="3" style="width:6em;">1992</td><td tabindex="-1" role="gridcell" class="dojoxGridCell " idx="4" style="width:6em;">The Atlantic Years</td><td tabindex="-1" role="gridcell" class="dojoxGridCell " idx="5" style="width:6em;">Tarkus</td><td tabindex="-1" role="gridcell" class="dojoxGridCell " idx="6" style="width:6em;">20:40</td><td tabindex="-1" role="gridcell" class="dojoxGridCell " idx="7" style="width:6em;">5</td><td tabindex="-1" role="gridcell" class="dojoxGridCell " idx="8" style="width:6em;">Greg Lake/Keith Emerson</td><td tabindex="-1" role="gridcell" class="dojoxGridCell " idx="9" style="width:6em;">1994/11/29</td><td tabindex="-1" role="gridcell" class="dojoxGridCell " idx="10" style="width:6em;">03:25:19</td></tr></tbody></table></div></div></div>
			</div>
		</div></div>
			<div class="dojoxGridMasterMessages" style="display: none;" dojoattachpoint="messagesNode"></div>
			text += "</div>";
			var contentPane = new dijit.layout.ContentPane({
				id : "flowContainerPane_" + path + "/"+ fileName,
				region:"center",
				title : fileName,
				content : text,
				closable : true,
				onClose : function() {
					dijit.registry.remove("flowContainerPane_" + path + "/"+ fileName);
					return true;
				}
			});
			_currentInstance.ui.centerContainer.addChild(contentPane);
			watchHandle.unwatch();
			_currentInstance.ui.centerContainer.selectChild(dijit.byId("flowContainerPane_"
					+ path + "/" + fileName));
			var data = {
					identifier : "id",
					items : []
				};
//				var data_list=JSON.parse(rawdata);
			var data_list=rawdata;
		        for(var i = 2 ; i < data_list.length; i++){
		          data.items.push(dojo._base.lang.mixin({ id: i+1 }, data_list[i]));		        
		        }
				var store = new dojo.data.ItemFileWriteStore({
					data : data	
				});
		    var length=eval(data_list)[0]["length"];
			var layout=[];
			for(i=0;i<length;i++)
				{
				layout.push({
					'name' :eval(data_list)[1][i],
					'field' : eval(data_list)[1][i],
					'width' : '60px',
					type : dojox.grid.cells.CheckBox,
					styles : 'text-align: center;'
				});
				}

				var grid = new dojox.grid.EnhancedGrid({
					id : 'grid',
					store : store,
					structure : layout,
					rowSelector : '20px'
				},document.createElement('div'));

				grid.placeAt("gridDiv");
				grid.startup();
				var griddiv = document.getElementById("gridDiv");
				var html = griddiv.innerHTML;
				console.log('grid div content');
				console.log(html);
	

		},*/
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
//	signal.remove();
	//TODO:
	for (i = 0; i < data.files.length; i++) {
		this.hdfsFileListStore.put({
			id : parentPath + "/" + data.files[i].name,
			name : data.files[i].name,
			isDirectory : data.files[i].directory,
			path : parentPath + "/" + data.files[i].name,
			parentPath : parentPath,
//			type:data.files[i].type,
			size:data.files[i].length,
			time:data.files[i].time
		});
		if (data.files[i].directory) {
			instance.getHdfsFileList(parentPath + "/" + data.files[i].name);
		}
	}
};

HAFlow.Main.prototype.changepath = function(instance, child, newparentpath,
		newhfdname) {
	instance.hdfsFileListStore.put({
		id : newparentpath + "/" + newhfdname,
		name : newhfdname,
		isDirectory : child.isDirectory,
		path : newparentpath + "/" + newhfdname,
		parentPath : newparentpath,
	});
	var tmp = newparentpath + "/" + newhfdname;
	var newparentpath = tmp;
	var items = instance.hdfsFileListStore.query({
		parentPath : child.path
	});
	if (child.isDirectory == true) {
		for ( var i = 0; i < items.total; i++) {
			var childitem = items[i];
			var newhfdname = childitem.name;
			instance.changepath(instance, childitem, newparentpath, newhfdname);
		}
	}
	instance.hdfsFileListStore.remove(child.id);
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
	this.initFlowContainer();
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
		iconClass : "dijitEditorIcon dijitEditorIconDelete",
		disabled:"disabled"
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
		disabled : false
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

	this.menu.oozieMenu.openoozieMenuItem = new dijit.MenuItem({
		id : "openoozieMenuItem",
		label : "Open"
	});
	this.menu.oozieMenu.closeoozieMenuItem = new dijit.MenuItem({
		id : "closeoozieMenuItem",
		label : "Close",
		disabled : true
	});
	this.menu.oozieMenu.addChild(this.menu.oozieMenu.openoozieMenuItem);
	this.menu.oozieMenu.addChild(this.menu.oozieMenu.closeoozieMenuItem);
	this.menu.oozieMenu.startup();

	this.menu.hiveMenu = new dijit.Menu({
		id : "hiveMenu"
	});

	this.menu.hiveMenu.openhiveMenuItem = new dijit.MenuItem({
		id : "openhiveMenuItem",
		label : "Open"
	});
	this.menu.hiveMenu.closehiveMenuItem = new dijit.MenuItem({
		id : "closehiveMenuItem",
		label : "Close",
		disabled : true
	});
	this.menu.hiveMenu.addChild(this.menu.hiveMenu.openhiveMenuItem);
	this.menu.hiveMenu.addChild(this.menu.hiveMenu.closehiveMenuItem);
	this.menu.hiveMenu.startup();

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
	this.ui.mainMenu.addChild(new dijit.PopupMenuBarItem({
		id : "hivePopupMenuBarItem",
		label : "hive",
		popup : this.menu.hiveMenu
	}));
	// userInformation
	this.ui.mainMenu.addChild(new dijit.layout.ContentPane({
		id : "tipContentPane",
		title : "tip",
		content : "|&nbsp&nbsp<a href=quit><font size=2px>quit</font></a>",
		style : "float:right;"
	}));

	this.menu.userMenu = new dijit.Menu({
		id : "userMenu"
	});
	this.menu.userMenu.userInforMenuItem = new dijit.MenuItem({
		id : "userInforMenuItem",
		label : "user information"
	});
	this.menu.userMenu.addChild(this.menu.userMenu.userInforMenuItem);
	this.menu.userMenu.startup();

	this.ui.mainMenu.addChild(new dijit.PopupMenuBarItem({
		id : "usernameContentPane",
		label : "<a href><font color=red size=3px>" + username + "</font></a>",
		style : "float:right;",
		popup : this.menu.userMenu
	}));
	/*this.ui.mainMenu.addChild(new dijit.layout.ContentPane({
		id : "welcomeContentPane",
		title : "welcome",
		content : "<font size=2px align=top>Welcome,</font>",
		style : "float:right;"
	}));*/

	var _currentInstance = this;

	// new dialog
	var user = null;
	var text = "";
	text += "<div >";
	text += "<div ><span style=\"float: left; width: 80px;\"><strong>Name:</strong></span>";
	text += "<span id=\"user_name_text_box\" ></span></div>";

	text += "<div ><span style=\"float: left; width: 80px;\"><strong>Space:</strong></span>";
	text += "<span id=\"user_space_text_box\"></span></div>";
	text += "<div class=\"field\"><span style=\"float: left; width: 80px;\"><strong>UsedSpace:</strong></span>";
	text += "<span id=\"user_used_text_box\"></span></div>";
	text += "<div class=\"field\"><span style=\"float: left; width: 80px;\"><strong>RealName:</strong></span>";
	text += "<span id=\"user_real_text_box\"></span></div>";
	text += "<div class=\"field\"><span style=\"float: left; width: 80px;\"><strong>Email:</strong></span>";
	text += "<span id=\"user_email_text_box\"></span></div>";
	text += "<div><span id=\"edit_user_button\" ></span>";
	text += "<span id=\"save_user_button\" ></span></div>";
	text += "</div>";
	userForm = new dijit.form.Form({
		innerHTML : text
	});
	userForm.startup();
	userDialog = new dijit.Dialog({
		title : "User Infomation",
		style : "width: 400px"
	});
	userDialog.addChild(userForm);
	var userRealTextBox = new dijit.form.TextBox({
		id : "userRealTextBox",
		style : "width:200px;"
	});

	var userEmailTextBox = new dijit.form.TextBox({
		id : "userEmailTextBox",
		style : "width:200px;"
	});

	var button1 = new dijit.form.Button({
		label : "edit",
		onClick : function() {
			dojo.byId("user_real_text_box").innerHTML = '';
			dojo.byId("user_email_text_box").innerHTML = '';
			userRealTextBox.placeAt(dojo.byId("user_real_text_box"));
			userRealTextBox.startup();
			userEmailTextBox.placeAt(dojo.byId("user_email_text_box"));
			userEmailTextBox.startup();

		}
	});
	button1.placeAt(dojo.byId("edit_user_button"));
	button1.startup();

	var button = new dijit.form.Button({
		label : "Save",
		onClick : function() {
			user.realname = userRealTextBox.get("value");
			user.email = userEmailTextBox.get("value");
			saveUser(user, userid);
		}
	});
	button.placeAt(dojo.byId("save_user_button"));
	button.startup();
	saveUser = function(user, userid) {
		$.ajax({
			url : _currentInstance.basePath + "user/update/" + userid,
			type : "Post",
			dataType : "json",
			contentType : "application/json",
			data : JSON.stringify(user),
			success : function(data, status) {
				userDialog.hide();
				HAFlow.showDialog("Success",
						"Successfully update user information! ");

			},
			error : function(request, status, error) {
				userDialog.hide();
				HAFlow.showDialog("Error",
						"An error occurred while updating user information: "
								+ error);
			}
		});
	};
	dojo.connect(dijit.byId("userInforMenuItem"), "onClick", function() {
		$.ajax({
			url : _currentInstance.basePath + "user/get/" + userid,
			type : "GET",
			cache : false,
			dataType : "json",
			success : function(data, status) {
				user = data;
				dojo.byId("user_name_text_box").innerHTML = data.name;
				userRealTextBox.set("value", data.realname);
				userEmailTextBox.set("value", data.email);
				if(data.realname==null) tmp="blank";
				else tmp=data.realname;
				dojo.byId("user_real_text_box").innerHTML=tmp;
				dojo.byId("user_email_text_box").innerHTML=data.email;
				dojo.byId("user_space_text_box").innerHTML=data.space;
				dojo.byId("user_used_text_box").innerHTML=data.usedspace;
				userDialog.show();

			},
			error : function(request, status, error) {
				HAFlow.showDialog("Error",
						"An error occurred while loading user information: "
								+ error);
			}
		});
	});

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
	dojo.connect(this.menu.oozieMenu.openoozieMenuItem, "onClick", function(
			event) {
		_currentInstance.openoozie();
	});
	dojo.connect(this.menu.hiveMenu.openhiveMenuItem, "onClick",
			function(event) {
				_currentInstance.openhive();
			});
	dojo.connect(this.menu.runMenu.runHistoryMenuItem, "onClick", function(
			event) {
		_currentInstance.showRunHistory(_currentInstance.currentFlowId);
	});
};

HAFlow.Main.prototype.initBottomTabs = function() {
	this.initInformationTab();
	this.initConfigurationTab();
//	this.initConsoleTab();
//	this.initLogTab();
};

HAFlow.Main.prototype.initInformationTab = function() {
	var informationContentPane = (new dijit.layout.ContentPane({
		id : this.informationContainerId,
		title : "Information"
	}));
	this.ui.bottomContainer.addChild(informationContentPane);
};

//HAFlow.Main.prototype.initConsoleTab = function() {
//	var consoleContentPane = new dijit.layout.ContentPane({
//		id : this.consoleContainerId,
//		title : "Console"
//	});
//	this.ui.bottomContainer.addChild(consoleContentPane);
//};

//HAFlow.Main.prototype.initLogTab = function() {
//	var logContentPane = new dijit.layout.ContentPane({
//		id : this.logContainerId,
//		title : "Log"
//	});
//	this.ui.bottomContainer.addChild(logContentPane);
//};

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
	this.getHdfsFileList(this.rootPath);
	this.initHdfsFileListTree();
};

HAFlow.Main.prototype.initHdfsFileListStore = function() {
	this.hdfsFileListStore = new dojo.store.Observable(new dojo.store.Memory({
		data : [ {
			id : "root",
			name : "Root",
			isDirectory : true,
			path : this.rootPath,
			parentPath : null,
			type:null,
			time:null,
			size:null
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
		model : treeModel,
		dndController : dijit.tree.dndSource
	}, dojo.create("div", {
		id : this.hdfsFileListTreeId,
	}, this.hdfsFileListContainerId));
	var _currentInstance = this;
	dojo.aspect.around(this.hdfsFileListStore, "put", function(originalPut) {	
		return function(obj, options) {
			 if(options && options.parent){
				 if(options.parent.id!=obj.parentPath)
					 {
	                 obj.parentPath = options.parent.id;
	                 var frompath=obj.path;
	                 var topath=obj.parentPath+"/"+obj.name;
	                 var filename=obj.name;
	                 //TODO:
	                 var toitem=_currentInstance.hdfsFileListStore.query({
							path : obj.parentPath
						});
	                 var toisDerectory=toitem[0].isDirectory;
	                 if(toisDerectory==true)
	                	 {
		                 $.ajax({
			         			url : _currentInstance.basePath + "hdfs/movefile?frompath="+frompath+"&topath="+topath+"&filename="+filename,
			         			type : "GET",	       
			         			dataType : "json",
								contentType : "application/json",
								data : JSON.stringify({}),
			         			success : function(data, status) {
			         				if(data==true)
									HAFlow
									.showDialog(
											"Move",
											"Move success.");
			         				else
										HAFlow
										.showDialog(
												"Move",
												"Move failure.");
			         				},
			                 	error:function(e){
									HAFlow
											.showDialog(
													"Move",
													"Move failure.");
			                 	}
			                 	});
	                	 }
	                 else{
							HAFlow
							.showDialog(
									"Move",
									"Can't move to a file.");
	                 }
					 }
				 else
				 {
//					 flow.hdfsFileListStore.put({
//							id : obj.id,
//							name : obj.name,	                 
//							isDirectory : obj.directory,
//							path : obj.path,
//							parentPath : obj.parentPath
//						});
					 }
             }
			return originalPut.call(flow.hdfsFileListStore, obj, options);
		};
	});
	//TODO:
//	dojo.aspect.after(this.hdfsFileListStore, "put", function() {
//		if (dijit.byId(_currentInstance.hdfsFileListTreeId) != null) {
//			dijit.registry.remove(_currentInstance.hdfsFileListTreeId);
//		}
//		_currentInstance.getHdfsFileList(_currentInstance.rootPath);
//	});
	if (dijit.byId("treeMenu") != null) {
		dijit.registry.remove("treeMenu");
	}	
	this.menu.treeMenu = new dijit.Menu({
		id : "treeMenu",
		targetNodeIds : [ _currentInstance.hdfsFileListTreeId ],
		selector : ".dijitTreeNode"
	});
	if (dijit.byId("DownloadMenuItem") != null) {
		dijit.registry.remove("DownloadMenuItem");
	}
	this.menu.treeMenu.DownloadMenuItem = new dijit.MenuItem({
		id : "DownloadMenuItem",
		label : "Download from Hdfs"
	});
	if (dijit.byId("CreateMenuItem") != null) {
		dijit.registry.remove("CreateMenuItem");
	}
	this.menu.treeMenu.CreateMenuItem = new dijit.MenuItem({
		id : "CreateMenuItem",
		label : "Create new directory"
	});
	if (dijit.byId("DeleteMenuItem") != null) {
		dijit.registry.remove("DeleteMenuItem");
	}
	this.menu.treeMenu.DeleteMenuItem = new dijit.MenuItem({
		id : "DeleteMenuItem",
		label : "Delete"
	});
	if (dijit.byId("UploadMenuItem") != null) {
		dijit.registry.remove("UploadMenuItem");
	}
	this.menu.treeMenu.UploadMenuItem = new dijit.MenuItem({
		id : "UploadMenuItem",
		label : "Upload files to Hdfs"
	});
	if (dijit.byId("RenameMenuItem") != null) {
		dijit.registry.remove("RenameMenuItem");
	}
	this.menu.treeMenu.RenameMenuItem = new dijit.MenuItem({
		id : "RenameMenuItem",
		label : "Rename"
	});
	if (dijit.byId("RefreshMenuItem") != null) {
		dijit.registry.remove("RefreshMenuItem");
	}
	this.menu.treeMenu.RefreshMenuItem = new dijit.MenuItem({
		id : "RefreshMenuItem",
		label : "Refresh"
	});

	this.menu.treeMenu.addChild(this.menu.treeMenu.DownloadMenuItem);
	this.menu.treeMenu.addChild(this.menu.treeMenu.CreateMenuItem);
	this.menu.treeMenu.addChild(this.menu.treeMenu.DeleteMenuItem);
	this.menu.treeMenu.addChild(this.menu.treeMenu.UploadMenuItem);
	this.menu.treeMenu.addChild(this.menu.treeMenu.RenameMenuItem);
	this.menu.treeMenu.addChild(this.menu.treeMenu.RefreshMenuItem);

	dojo
			.connect(

					this.menu.treeMenu.UploadMenuItem,
					"onClick",
					function() {
						var tn = dijit.byNode(this.getParent().currentTarget);
						var path = tn.item.path;
						var isDirectory = tn.item.isDirectory;
						if (isDirectory == true) {
							var dialog = new dijit.Dialog(
									{
										title : "upload",
										content : "<form id=\"hdfsfilepath\" action=\"hdfs/upload\" enctype=\"multipart/form-data\" method=\"post\">"
												+ "<input type=\"file\" name=\"file\" id=\"file\" />"
												+ "<input type=\"hidden\" name=\"remotePath\" value="
												+ "\""
												+ path
												+ "\">"
												+ " <button type=\"button\" id=\"upload_btn\">submit</button></form><div id=\"debug\"><div>",
										style : "width:400px"
									});

							dialog.show();
							dojo.connect(dojo.byId("upload_btn"),"onclick",function(){
								var file=document.getElementById("file").files[0];
								var lastModifiedDate=file.lastModifiedDate;
								var size=file.size;
								var type=file.type;
							var filename = document.getElementById("file").value;
							var result=_currentInstance.hdfsFileListStore.query({path:path+"/"+filename});
							if(result.total==0)
								{
								dojo.io.iframe.send({
								    form: "hdfsfilepath", 								    
								    handleAs: "xml", 
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
										    		size:size,
										    		type:type,
										    		time:lastModifiedDate
										    	});	
									    		}								    		
									    	else
									    		HAFlow.showDialog("Upload", "Upload failure.");		
								    }, 
								    error: function(e){
										HAFlow.showDialog("Upload", "Upload failure.");
								    }
								});
								}
							else{
								HAFlow.showDialog("Upload", "File exits.");
							}
							dialog.destroy();
							});
							}else
							HAFlow.showDialog("Upload",
									"It's a file.Can't upload to it.");
					});
	dojo
			.connect(
					this.menu.treeMenu.DeleteMenuItem,
					"onClick",
					function() {
						var tn = dijit.byNode(this.getParent().currentTarget);
						var path = tn.item.path;
						var isDirectory = tn.item.isDirectory;
						var dialog = new dijit.Dialog(
								{
									id : "dialog_assure",
									title : "Delete",
									content : "<div>Are you sure to delete?<br><button type=\"button\" id=\"assure_btn\">Yes</button><button type=\"button\" id=\"cancel_btn\">No</button></br></div>",
									style : "width:200px"
								});
						dojo
								.connect(
										dojo.byId("assure_btn"),
										"onclick",
										function() {
											if (isDirectory == true)
												$
														.ajax({
															url : _currentInstance.basePath
																	+ "hdfs/deletedirectory?remotepath="
																	+ path,
															type : "GET",
															dataType : "json",
															contentType : "application/json",
															data : JSON
																	.stringify({}),
															success : function(
																	data,
																	status) {
																if (data.success = true) {
																	HAFlow
																			.showDialog(
																					"Remove HdfsFile Directory",
																					"HdfsFile Directory removed.");
																} else
																	HAFlow
																			.showDialog(
																					"Remove HdfsFile Directory",
																					"HdfsFile Directory can't be removed.");
																var file_item = _currentInstance.hdfsFileListStore
																		.query({
																			parentPath : path
																		});
																var i;
																for (i = 0; i < file_item.length; i++) {
																	_currentInstance.hdfsFileListStore
																			.remove(file_item[i].id);
																}
																var directory_item = _currentInstance.hdfsFileListStore
																		.query({
																			path : path
																		});
																_currentInstance.hdfsFileListStore
																		.remove(directory_item[0].id);
															},
															error : function(
																	request,
																	status,
																	error) {
																HAFlow
																		.showDialog(
																				"Error",
																				"An error occurred while removing HdfsFile Directory: "
																						+ error);
															}
														});
											else
												$
														.ajax({
															url : _currentInstance.basePath
																	+ "hdfs/deletefile?remotepath="
																	+ path,
															type : "GET",
															dataType : "json",
															contentType : "application/json",
															data : JSON
																	.stringify({}),
															success : function(
																	data,
																	status) {
																if (data.success = true) {
																	HAFlow
																			.showDialog(
																					"Remove HdfsFile",
																					"HdfsFile removed.");
																	if(dijit.byId("flowContainerPane_"+ path)!=null)
																	_currentInstance.ui.centerContainer
																			.removeChild(dijit
																					.byId("flowContainerPane_"
																							+ path));
																} else
																	HAFlow
																			.showDialog(
																					"Remove HdfsFile",
																					"HdfsFile can't be removed.");
																var item = _currentInstance.hdfsFileListStore
																		.query({
																			path : path
																		});
																_currentInstance.hdfsFileListStore
																		.remove(item[0].id);
															},
															error : function(
																	request,
																	status,
																	error) {
																HAFlow
																		.showDialog(
																				"Error",
																				"An error occurred while removing HdfsFile: "
																						+ error);
															}
														});
											dialog.destroy();
										});
						dojo.connect(dojo.byId("cancel_btn"), "onclick",
								function() {
									dialog.destroy();
								});
						dialog.show();
					});

	dojo
	.connect(
			//TODO:
			this.menu.treeMenu.CreateMenuItem,
			"onClick",
			function() {
				var tn = dijit.byNode(this.getParent().currentTarget);
				var path = tn.item.path;
				var isDirectory = tn.item.isDirectory;
				if (isDirectory == true) {
					var context="";
					context+="<html><body><form id=\"hdfsfilepath\" method=\"post\">";
					context+="new name:<input type=\"text\" id=\"directoryname\" name=\"directoryname\"> </input>";
					context+=" <button type=\"button\" id=\"create_btn\">submit</button></form></body></html>";
					var dialog = new dijit.Dialog(
							{
								title:"create new directory",
								content:context	
							});
					dialog.show();
					dojo
							.connect(
									dojo.byId("create_btn"),
									"onclick",
									function() {
										var directoryname = document
												.getElementById("directoryname").value;
										var result = _currentInstance.hdfsFileListStore
												.query({
													path : path
															+ "/"
															+ directoryname
												});
										if (result.total == 0) {
											$
													.ajax({
														url : _currentInstance.basePath
																+ "hdfs/createdirectory?remotepath="
																+ path
																+ "&directoryname="
																+ dojo
																		.byId("directoryname").value,
														type : "GET",
														dataType : "json",
														contentType : "application/json",
														data : JSON
																.stringify({}),
														success : function(
																data,
																status) {
															if (data.success = true) {
																HAFlow
																		.showDialog(
																				"Create HdfsFile Directory",
																				"HdfsFile Directory created.");
																_currentInstance.hdfsFileListStore
																		.put({
																			id : path
																					+ "/"
																					+ data.directoryname,
																			name : data.directoryname,
																			isDirectory : true,
																			path : path
																					+ "/"
																					+ data.directoryname,
																			parentPath : path,
																		});

															} else
																HAFlow
																		.showDialog(
																				"Create HdfsFile Directory",
																				"HdfsFile Directory can't be created.");
														},
														error : function(
																request,
																status,
																error) {
															HAFlow
																	.showDialog(
																			"Error",
																			"An error occurred while removing HdfsFile Directory: "
																					+ error);
														}
													});
										} else {
											HAFlow
													.showDialog(
															"Create HdfsFile Directory",
															"HdfsFile Directory exits.");
										}
										dialog.destroy();

									});
				} else {
					HAFlow
							.showDialog("Create HdfsFile Directory",
									"It's a file.HdfsFile Directory can't be created in it.");
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
			       var form = $("<form>");   

			       form.attr('style','display:none');   
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

			       $('body').append(form);  

			       form.append(input1);   
			       form.append(input2); 
			       form.submit();   
					$("#form1").ajaxForm(function(){
						HAFlow.showDialog("Download", "Succeed to download it.");
					});
		} else {

			HAFlow
					.showDialog("Download",
							"It's a directory.Can't download it.");
		}
	});

	dojo
			.connect(
					this.menu.treeMenu.RenameMenuItem,
					"onClick",
					function() {
						if (dijit.byId("newname_btn") != null) {
							dijit.registry.remove("newname_btn");
						}
						if (dijit.byId("newname") != null) {
							dijit.registry.remove("newname");
						}
						var renamedialog = new dijit.Dialog(
								{
									title : "Rename",
									content : "<html><body><form id=\"rename\" method=\"post\">"
											+ "new name:<input type=\"text\" id=\"newname\" name=\"newname\"> </input>"
											+ " <button type=\"button\" id=\"newname_btn\">submit</button></form></body></html>"
								});
						renamedialog.show();
						var tn = dijit.byNode(this.getParent().currentTarget);
						var path = tn.item.path;
						var parentpath = tn.item.parentPath;
						dojo
								.connect(
										dojo.byId("newname_btn"),
										"onclick",
										function() {
											var newname = document
													.getElementById("newname").value;
											if (newname != null) {
												var result = _currentInstance.hdfsFileListStore
														.query({
															path : path + "/"
																	+ newname
														});
												var newpath = parentpath + "/"
														+ newname;
												if (result.total == 0) {
													$
															.ajax({
																url : _currentInstance.basePath
																		+ "hdfs/rename?path="
																		+ path
																		+ "&newpath="
																		+ newpath,
																type : "GET",
																dataType : "json",
																contentType : "application/json",
																data : JSON
																		.stringify({}),
																success : function(
																		data,
																		status) {
																	if (data.success = true) {
																		HAFlow
																				.showDialog(
																						"Rename",
																						"Succeed to rename.");
																		var newparentpath = parentpath;
																		var items = _currentInstance.hdfsFileListStore
																				.query({
																					path : path
																				});
																		var newhfdname = newname;
																		var child = items[0];
																		_currentInstance
																				.changepath(
																						_currentInstance,
																						child,
																						newparentpath,
																						newhfdname);
																	} else {
																		HAFlow
																				.showDialog(
																						"Rename",
																						"Can't rename.");
																	}
																},
																error : function(
																		request,
																		status,
																		error) {
																	HAFlow
																			.showDialog(
																					"Error",
																					"An error occurred while renaming: "
																							+ error);
																}
															});
												} else {
													HAFlow.showDialog("Rename",
															"It exits.");
												}
											}
											renamedialog.destroy();
										});
					});
	dojo
	.connect(
			this.menu.treeMenu.RefreshMenuItem,
			"onClick",
			function() {
				if (dijit.byId(_currentInstance.hdfsFileListTreeId) != null) {
					dijit.registry.remove(_currentInstance.hdfsFileListTreeId);
				}
				_currentInstance.getHdfsFileList(_currentInstance.rootPath);
			});

	this.menu.treeMenu.startup();
	tree.on("click", function(item) {
		if (item.directory =="true") {

		} else {
			hdfspath=item.path;
			var information=[];
			information.name=item.name;
			information.path=item.path;
			information.size=item.size;
			information.time=item.time;
			_currentInstance.onFileClicked(_currentInstance, information);
		}
	}, true);
	var picture = new RegExp("^[A-Za-z0-9_]*\.jpg$");
	var text = new RegExp("^[A-Za-z0-9_]*\.(txt|ini)$");
	var csv=new RegExp("^[A-Za-z0-9_-]*\.csv$");
	tree
			.on(
					"dblclick",
					function(item) {
						if (item.isDirectory == true) {

						} else {
							if (picture.test(item.name)) {
								_currentInstance.getHdfsPicture(
										item.parentPath, item.name);
							} else if (text.test(item.name)) {
								var url = item.parentPath+ "/" + item.name;
								if (dijit
										.byId("flowContainerPane_"
												+ url) == null) {
									_currentInstance
											.getHdfsFile(
													item.parentPath,
													item.name);
								} else {
									_currentInstance.ui.centerContainer
											.removeChild(dijit
													.byId("flowContainerPane_"
															+ url));
									dijit.registry
											.remove("flowContainerPane_"
													+ url);
									_currentInstance
											.getHdfsFile(
													item.parentPath,
													item.name);
								}
							}
							else if(csv.test(item.name))
								{
								_currentInstance.getHdfsCsv(
										item.parentPath, item.name);
								}

							else
								HAFlow
										.showDialog("Read file",
												"Can't read it.");
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

HAFlow.Main.prototype.initFlowContainer = function() {
	var _currentInstance = this;
	watchHandle=this.ui.centerContainer.watch("selectedChildWidget", function(name, from,
			to) {
		var flowId = to.domNode.id.replace("flowContainerPane_", "");
		var hdfsreg = new RegExp("^hdfs://");
		if(hdfsreg.test(flowId))
			{
			_currentInstance.toolbar.removeFlowButton.set("disabled","disabled");
			}
		else{
			_currentInstance.toolbar.removeFlowButton.set("disabled", false);
			_currentInstance.currentFlowId = flowId;
			_currentInstance.setupDroppable(flowId);
			_currentInstance.paintFlow(flowId);
		}

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

HAFlow.Main.prototype.onFileClicked = function(instance,fileInformation) {
	var text = "";
	text+="<table border=\"0\">";
	text+="<tr style=\"tr\"><th align=\"left\">Name</th><td>"+ fileInformation.name +"</td></tr>";
	text+="<tr style=\"tr\"><th align=\"left\">Path</th><td>"+ fileInformation.path+"</td></tr>";
	text+="<tr style=\"tr\"><th align=\"left\">Update Time</th><td>"+ fileInformation.time +"</td></tr>";
	text+="<tr style=\"tr\"><th align=\"left\">Size</th><td>"+ fileInformation.size +"B</td></tr>";
	text+="</table>";
	$("#" + instance.informationContainerId).html(text);
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
	text+="<table border=\"0\">";
	text+="<tr style=\"tr\"><th align=\"left\">Node Id</th><td>"+ node.id +"</td></tr>";
	text+="<tr style=\"tr\"><th align=\"left\">Flow</th><td>"+ instance.flows[node.flowId].name +"</td></tr>";
	text+="<tr style=\"tr\"><th align=\"left\">Module</th><td>"+ module.name +"</td></tr>";
	text+="<tr style=\"tr\"><th align=\"left\">Name</th><td><span id=\"node_name_text_box\" class=\"configuration-content\"></span><span id=\"save_node_name_button\" class=\"configuration-content\"></span></div></td></tr>";
	text+="<tr style=\"tr\"><th align=\"left\">Delete</th><td><span id=\"delete_node_button\" class=\"configuration-content\"></span></div></td></tr>";
	text+="</table>";
//	text += "<div class=\"configuration\">";
//	text += "<div class=\"configuration-content\"><span><strong>Node Id:</strong> "
//			+ node.id + "</span></div>";
//	text += "<div class=\"configuration-content\"><span><strong>Flow:</strong> "
//			+ instance.flows[node.flowId].name + "</span></div>";
//	text += "<div class=\"configuration-content\"><span><strong>Module:</strong> "
//			+ module.name + "</span></div>";
//	text += "<div class=\"configuration-content\">";
//	text += "<span><strong>Name:</strong> </span>";
//	text += "<span id=\"node_name_text_box\" class=\"configuration-content\"></span>";
//	text += "<div id=\"save_node_name_button\" class=\"configuration-content\"></div>";
//	text += "</div>";
//	text += "<div class=\"configuration-content\"><strong>Delete?</strong></div>";
//	text += "<div id=\"delete_node_button\" class=\"configuration-content\"></div>";
//	text += "</div>";
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

	var form = "";
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
	$("#" + instance.configurationContainerId).html(form);
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

HAFlow.Main.prototype.onConnectionClicked = function(instance, flowId, info) {
	var source = info.sourceId.replace("node_", "");
	var sourceEndpoint = info.endpoints[0].overlays[0].getLabel();
	var target = info.targetId.replace("node_", "");
	var targetEndpoint = info.endpoints[1].overlays[0].getLabel();
	var sourceNode = instance.getNodeById(instance, flowId, source);
	var targetNode = instance.getNodeById(instance, flowId, target);

	var text = "";
//	text+="<table border=\"0\">";
//	text+="<tr style=\"tr\"><th align=\"left\">From</th><td>"+ sourceNode.name +"</td></tr>";
//	text+="<tr style=\"tr\"><th align=\"left\">Flow</th><td>"+ instance.flows[node.flowId].name +"</td></tr>";
//	text+="<tr style=\"tr\"><th align=\"left\">Module</th><td>"+ module.name +"</td></tr>";
//	text+="<tr style=\"tr\"><th align=\"left\">Name</th><td><span id=\"node_name_text_box\" class=\"configuration-content\"></span><span id=\"save_node_name_button\" class=\"configuration-content\"></span></div></td></tr>";
//	text+="<tr style=\"tr\"><th align=\"left\">Delete</th><td><span id=\"delete_node_button\" class=\"configuration-content\"></span></div></td></tr>";
//	text+="</table>";
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
HAFlow.Main.prototype.onCloseTab_hdfs = function(instance) {
	var flowId = this.id.replace("flowContainerPane_", "");
};

HAFlow.Main.prototype.onModuleAdded = function(instance, flowId, event, ui) {
	var moduleId = ui.draggable.context.id.replace("module_", "");
	instance.doAddModule(instance, flowId, moduleId, ui.position.left,
			ui.position.top);
	instance.paintFlow(flowId);
};
