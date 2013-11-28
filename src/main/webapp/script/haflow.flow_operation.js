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

// public
HAFlow.Main.prototype.initFlowList = function() {
	var flowListContentPane = new dijit.layout.ContentPane({
		id : this.flowListContainerId,
		title : "Flows"
	});
	this.ui.leadingContainer.addChild(flowListContentPane);
/*	this.initFlowListStore();*/
	this.initFlowListData();
/*	this.initFlowListTree();*/
};

HAFlow.Main.prototype.initFlowListStore = function(FlowListStoreId) {
	this.flowListStore = new dojo.store.Observable(new dojo.store.Memory({
		data : [ {
			id : FlowListStoreId,
			name : "Flows",
			node : false,
			path:"Flows",
			parentpath:"root",
		} ],
		getChildren : function(object) {
			var children = this.query({
				parentpath: object.id
			});
			console.log('----------children of id:'+object.id);
			console.log(children);
			return children; 
		}
	}));
};

HAFlow.Main.prototype.initFlowListData = function() {
	_currentInstance=this;
	$.ajax({
		url : this.basePath +"flow",
		type : "GET",
		cache : false,
		dataType : "json",
		data : {
			path : "root"
		},				
		success : function(data, status) {
			var newFlowId;
			if(data.flows.length==1)
				{
				newFlowId=data.flows[0].id;
				_currentInstance.getFlowList(data.flows[0].id);
				}
				
			else
				{
				newFlowId = HAFlow.generateUUID();;
				_currentInstance.flows[newFlowId] = {};
				_currentInstance.flows[newFlowId].id =newFlowId;
				_currentInstance.flows[newFlowId].name = "Flows";
				_currentInstance.flows[newFlowId].node = false;
				_currentInstance.flows[newFlowId].path= "Flows";
				_currentInstance.flows[newFlowId].parentpath="root";
				_currentInstance.flows[newFlowId].nodes = new Array();
				_currentInstance.flows[newFlowId].edges = new Array();
				$.ajax({
					url : _currentInstance.basePath + "flow/" + newFlowId,
					type : "PUT",
					dataType : "json",
					contentType : "application/json",
					data : JSON.stringify(_currentInstance.flows[newFlowId]),
					success : function(data, status) {
						//#_currentInstance.refreshFlowList();
					},
					error : function(request, status, error) {
						HAFlow.showDialog("Error", "An error occurred while saving flow: "
								+ error);
					}
				});
				}
			_currentInstance.initFlowListStore(newFlowId);
			_currentInstance.initFlowListTree(newFlowId);
		},
		error : function(request, status, error) {
			HAFlow.showDialog("Error",
					"An error occurred while loading "+path+"list: " + error);
		}
	});
};



HAFlow.Main.prototype.initFlowListTree = function(FlowListStoreId) {
	console.log("------query store id")
	console.log(FlowListStoreId);
	var _currentInstance = this;
	
	
	var treeModel = new dijit.tree.ObjectStoreModel({
		store : this.flowListStore,
		query : {
			id : FlowListStoreId
		},
		mayHaveChildren : function(item){
			return !(item.node);
		}
	});
	var tree = new dijit.Tree({
		model : treeModel
	}, dojo.create("div", {
		id : this.flowListTreeId,
	}, this.flowListContainerId));
	this.menu.flowtreeMenu = new dijit.Menu({
		id : "flowtreeMenu",
		targetNodeIds : [ _currentInstance.flowListTreeId ],
		selector : ".dijitTreeNode"
	});
	this.menu.flowtreeMenu.newFlowMenuItem = new dijit.MenuItem({
		id : "newFlowPopupMenuItem",
		label : "New Flow"
	});
	this.menu.flowtreeMenu.saveFlowMenuItem = new dijit.MenuItem({
		id : "saveFlowPopupMenuItem",
		label : "Save Flow"
	});

	this.menu.flowtreeMenu.CreateFlowFolderMenuItem = new dijit.MenuItem({
		id : "CreateFlowFolderMenuItem",
		label : "Create flow folder"
	this.menu.flowtreeMenu.deleteFlowMenuItem = new dijit.MenuItem({
		id : "deleteFlowPopupMenuItem",
		label : "Delete Flow"
	});

	this.menu.flowtreeMenu.addChild(this.menu.flowtreeMenu.newFlowMenuItem);
	this.menu.flowtreeMenu.addChild(this.menu.flowtreeMenu.saveFlowMenuItem);
	this.menu.flowtreeMenu.addChild(this.menu.flowtreeMenu.deleteFlowMenuItem);

	dojo
	.connect(
			this.menu.flowtreeMenu.newFlowMenuItem,
			"onClick",
			function() {
				var tn = dijit.byNode(this.getParent().currentTarget);
				var isnode=tn.item.node;
				var path=tn.item.path;
				if(isnode==false)
					{
					_currentInstance.newFlow(tn.item.id,tn.item.path);
					}
				else
					{
					HAFlow.showDialog("Error", "It's not a directory! ");
					}
				
			});
	dojo
	.connect(
			this.menu.flowtreeMenu.DeleteFlowMenuItem,
			"onClick",
			function() {
				var tn = dijit.byNode(this.getParent().currentTarget);
				var flowId = tn.item.id;
				var isnode=tn.item.node;
				if(isnode==true)
					{
						_currentInstance.removeFlow(flowId);
					}
				else
					{
						_currentInstance.removeFlowFolder(flowId);
					/*HAFlow.showDialog("Error", "It's not a flow! ");*/
					}				
			});
	
	dojo
	.connect(
			this.menu.flowtreeMenu.CreateFlowFolderMenuItem,
			"onClick",
			function() {
				var tn = dijit.byNode(this.getParent().currentTarget);
				var isnode=tn.item.node;
				if(isnode==false)
					{
					_currentInstance.createFlowFolder(tn.item.id,tn.item.path);
					}
				else{
					HAFlow.showDialog("Error", "It's a flow! ");
				}
				
			});
	
	tree.on("click", function(item) {
		if (item.node == true) {
			_currentInstance.onFlowClicked(_currentInstance, item.id);

		}
		else{
			_currentInstance.onFlowFolderClicked(_currentInstance, item.id);
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

HAFlow.Main.prototype.getFlowList= function(flowid) {
	var _currentInstance = this;
	$.ajax({
		url : this.basePath +"flow",
		type : "GET",
		cache : false,
		dataType : "json",
		data : {
			path : flowid
		},				
		success : function(data, status) {
			_currentInstance.refreshFlowList(_currentInstance, flowid, data);
		},
		error : function(request, status, error) {
			HAFlow.showDialog("Error",
					"An error occurred while loading "+path+"list: " + error);
		}
	});
};

HAFlow.Main.prototype.refreshFlowList = function(instance, parentPath, data) {
	var i;
	for (i = 0; i < data.flows.length; i++) {
		instance.flowListStore.put({
			id : data.flows[i].id,
			name : data.flows[i].name,
			node : data.flows[i].node,
			path :data.flows[i].path,
			parentpath : data.flows[i].parentpath,
		});
		if(!(data.flows[i].node)){
			instance.getFlowList(data.flows[i].id);
		}
	}
};

//Event Handler
HAFlow.Main.prototype.onFlowClicked = function(instance, flowId) {
	var flowBrief = instance.getFlowBriefById(instance, flowId);
	var text = "";
	text += "<table border=\"0\">";
	text += "<tr style=\"tr\"><th align=\"left\">Flow Info</th><td>"
			+ flowBrief.id + "</td></tr>";
	text += "<tr style=\"tr\"><th align=\"left\">Name</th><td><span id=\"flow_name_text_box\" class=\"configuration-content\"></span></td></tr>";
	text += "<tr style=\"tr\"><td align=\"left\"><div id=\"save_flow_name_button\" class=\"configuration-content\"></div></td></tr>";
	text += "</table>";
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

HAFlow.Main.prototype.onFlowFolderClicked = function(instance, flowId) {
	var flowBrief = instance.getFlowBriefById(instance, flowId);
	var text = "";
	text+="<table border=\"0\">";
	text+="<tr style=\"tr\"><th align=\"left\">Name</th><td><span id=\"flow_name_text_box\" class=\"configuration-content\"></span></td></tr>";
	text+="<tr style=\"tr\"><td align=\"left\"><div id=\"save_flow_name_button\" class=\"configuration-content\"></div></td></tr>";
	text+="</table>";
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
			instance.saveFlowFolderName(instance, flowBrief.id);
		}
	});
	button.placeAt(dojo.byId("save_flow_name_button"));
	button.startup();
};

HAFlow.Main.prototype.newFlow = function(parentpath,path) {
	var newFlowId = HAFlow.generateUUID();
	this.flows[newFlowId] = {};
	this.flows[newFlowId].id = newFlowId;
	this.flows[newFlowId].name = "NewFlow";
	this.flows[newFlowId].node = true;
	this.flows[newFlowId].path= path+"/"+this.flows[newFlowId].name;
	this.flows[newFlowId].parentpath=parentpath;
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
		node : this.flows[newFlowId].node,
		path:this.flows[newFlowId].path,
		parentpath:this.flows[newFlowId].parentpath,
	});
};

HAFlow.Main.prototype.createFlowFolder = function(parentpath,path) {
	var newFlowId = HAFlow.generateUUID();
	this.flows[newFlowId] = {};
	this.flows[newFlowId].id = newFlowId;
	this.flows[newFlowId].name = "NewFlowFolder";
	this.flows[newFlowId].node = false;
	this.flows[newFlowId].path= path+"/"+this.flows[newFlowId].name;
	this.flows[newFlowId].parentpath=parentpath;
	this.flows[newFlowId].nodes = new Array();
	this.flows[newFlowId].edges = new Array();
	_currentInstance=this;
	$.ajax({
		url : _currentInstance.basePath + "flow/" + newFlowId ,
		type : "PUT",
		dataType : "json",
		contentType : "application/json",
		data : JSON.stringify(_currentInstance.flows[newFlowId]),
		success : function(data, status) {
			HAFlow.showDialog("Save FlowFolder", "FlowFolder saved.");
		},
		error : function(request, status, error) {
			HAFlow.showDialog("Error", "An error occurred while saving flowfolder: "
					+ error);
		}
	});
	this.flowListStore.put({
		id : this.flows[newFlowId].id,
		name : this.flows[newFlowId].name,
		node : false,
		path:this.flows[newFlowId].path,
		parentpath:this.flows[newFlowId].parentpath,
	});
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
			/*_currentInstance.refreshFlowList();*/
		},
		error : function(request, status, error) {
			HAFlow.showDialog("Error", "An error occurred while saving flow: "
					+ error);
		}
	});
};


HAFlow.Main.prototype.removeFlow = function(flowId) {
	var _currentInstance = this;
	if (flowId == null) {
		HAFlow.showDialog("Error",
				"No flow selected, please double click a flow!");
		return;
	}
	$.ajax({
		url : _currentInstance.basePath + "flow/" + flowId,
		type : "DELETE",
		dataType : "json",
		contentType : "application/json",
		data : JSON.stringify({}),
		success : function(data, status) {
			
			if(dijit.byId("flowContainerPane_" + flowId)!=null)
				_currentInstance.ui.centerContainer.removeChild(dijit
						.byId("flowContainerPane_" + flowId));
			_currentInstance.flowListStore.remove(flowId);
			HAFlow.showDialog("Remove Flow", "Flow removed.");
		},
		error : function(request, status, error) {
			HAFlow.showDialog("Error",
					"An error occurred while removing flow: " + error);
		}
	});
};

HAFlow.Main.prototype.removeFlowFolder = function(flowId) {
	var _currentInstance = this;
	$.ajax({
		url : _currentInstance.basePath + "flow/" + flowId,
		type : "DELETE",
		dataType : "json",
		contentType : "application/json",
		data : JSON.stringify({}),
		success : function(data, status) {			
			var item=_currentInstance.flowListStore.query({parentpath:flowId});
			for(var i=0;i<item.length;i++)
				{
				if(item[i].node==true)
					{
					_currentInstance.removeFlow(item[i].id);
					}
				else
					_currentInstance.removeFlowFolder(item[i].id);
				}
			_currentInstance.flowListStore.remove(flowId);
			HAFlow.showDialog("Remove FlowFolder", "FlowFolder removed.");
		},
		error : function(request, status, error) {
			HAFlow.showDialog("Error",
					"An error occurred while removing flow: " + error);
		}
	});
};

// double click on flow item
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

HAFlow.Main.prototype.runFlow = function(flowId) {
	var _currentInstance = this;
	if (flowId == null || flowId.length == 0) {
		HAFlow.showDialog("Error", "No flow selected!");
		return;
	}
	$.ajax({
		url : _currentInstance.basePath + "flow/" + flowId,
		type : "PUT",
		dataType : "json",
		contentType : "application/json",
		data : JSON.stringify(_currentInstance.flows[flowId]),
		success : function(data, status) {
			HAFlow.showDialog("Save Flow", "Flow saved.");
			/*_currentInstance.refreshFlowList();*/
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
	if (flowId == null) {
		HAFlow.showDialog("Error",
				"No flow selected, please double click a flow!");
		return;
	}

	var found = false;
	var children = this.ui.bottomContainer.getChildren();	
	var i;
	for( i = 0; i < children.length; i++ ){
		var child = children[i];
		if (child.id == ("runHistoryPane_" + flowId)) {
			HAFlow.showDialog("Info", "Run History Panel for " + flowId
					+ " already opened!");
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
				node : true,
				path:instance.flows[flowId].path,
				parentpath:instance.flows[flowId].parentpath
			});
		} else {
			HAFlow.showDialog("Error", "Invalid flow name");
		}
	} else {
		HAFlow.showDialog("Error",
				"Please load the flow before saving flow metadata!");
	}
};

//TODO:
HAFlow.Main.prototype.saveFlowFolderName = function(instance, flowId) {
	var value = $("#" + "flow_" + flowId + "_name").val();
	var item=instance.flowListStore.query({id:flowId});
	var flowfolder={};
	instance.getFlowBriefById(instance, flowId).name = value;
	flowfolder.id=item[0].id;
	flowfolder.name=value;
	flowfolder.node=item[0].node;
	flowfolder.path=item[0].path;
	flowfolder.parentpath=item[0].parentpath;
	flowfolder.nodes = new Array();
	flowfolder.edges = new Array();
	$.ajax({
		url : _currentInstance.basePath + "flow/rename/" + flowId,
		type : "GET",
		dataType : "json",
		contentType : "application/json",
		data : {
			name : value
		},
		success : function(data, status) {
			if(data==true)
				{
				instance.getFlowBriefById(instance, flowId).name = value;
				instance.flowListStore.remove(flowId);
				instance.flowListStore.put({
					id : flowfolder.id,
					name : flowfolder.name,
					node : false,
					path:flowfolder.path,
					parentpath:flowfolder.parentpath
				});
				}
			else
				HAFlow.showDialog("Error", "An error occurred while saving flowfolder");

		},
		error : function(request, status, error) {
			HAFlow.showDialog("Error", "An error occurred while saving flowfolder: "
					+ error);
		}
	});
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
