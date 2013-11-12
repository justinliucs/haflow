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
									title : "Oozie",
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
										title : "Oozie",
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
									title : "Hive",
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
						_currentInstance.ui.oozieHiveContainer.selectChild(contentPane);
					}
					else
						{
						if(dijit.byId("hive")==null)
							{
							var contentPane = new dijit.layout.ContentPane(
									{
										id : "hive",
										title : "Hive",
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