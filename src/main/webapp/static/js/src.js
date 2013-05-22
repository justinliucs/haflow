require(
		[ "require", "dojo/_base/array", "dojo/_base/config", "dojo/dom",
				"dojo/dom-class", "dojo/dom-construct", "dojo/_base/kernel",
				"dojo/query", "dojo/ready", "dojo/_base/window",
				"dojo/_base/fx", "dijit/registry", "dijit/MenuItem",
				"dojo/date/locale", "dojo/parser",
				"dojo/data/ItemFileReadStore", "dojo/data/ItemFileWriteStore",
				"dijit/tree/ForestStoreModel", "dojo/number", // dojo.number.format
				"dojo/dnd/Source", // dojo.dnd.Source
				"dojo/_base/json", // dojo.toJson
				"dijit/dijit-all", // dijit.*
				"dojox/layout/ContentPane", "dijit/layout/ContentPane",
				"dijit/layout/TabContainer", "haflow/flow",
				"dojo/store/Memory", "dojo/data/ObjectStore", "dojo/json",
				"dojo/_base/lang" ],
		function(require, array, config, dom, domClass, domConstruct, kernel,
				query, ready, win, fx, registry, MenuItem, locale, parser,
				ItemFileReadStore, ItemFileWriteStore, ForestStoreModel,
				number, source, json1, all, xContentPane, ContentPane,
				TabContainer, flow, Memory, ObjectStore, JSON, lang) {
			// invoked by when page load, the whole model of the project
			loadJson = function() {
				require([ "require", "dojo/ready" ], function(require) {
					dojo.xhrGet({
						url : "full/get.json",
						handleAs : "json",
						headers : {
							"Content-Type" : "application/json"
						},
						error : function(error) {
							loadingError = true;
							alert(error.message);
						},
						load : function(response) {
							fullJson = lang.clone(response);
						}
					});
				});
			}

			// get flow id from flow name
			getFlowId = function(flowName) {
				return flowName + "_id";
			}
			// get canvas id from flow id
			getCanvasId = function(flowId) {
				return "canvas_" + flowId;
			}
			// get tab id from flow id
			getTabId = function(flowId) {
				return "tab_" + flowId;
			}

			getFlowIdFromTabId = function(tabId) {
				for ( var i = 0; i < fullJson.items.length; i++) {
					if (fullJson.items[i].tabid == tabId) {
						return fullJson.items[i].id;
					}
				}
				return null;
			}

			rNewErModule = function() {
				var canvas = dijit.byId("topTabs").selectedChildWidget;
				haflow.flow.newEmModule(canvas, 100, 200);
			}

			// callback function when tab shows
			// triger by newFlowTab
			// new Flow tab invoked by menuClicked and rNewFlow
			flowTabOnShow = function() {

				var flowId = getFlowIdFromTabId(this.id);

				var tab = dijit.byId(getTabId(flowId));
				haflow.flow.clearPane(tab);

				repaintModules(flowId);

			}

			// callback function when tab shows
			flowTabOnClose = function() {
				// confirm() returns true or false, so return that.
				var close = confirm("Do you really want to Close this?");
				var item;
				if (close) {
					var tabId = this.id;
					for ( var i = 0; i < fullJson.items.length; i++) {
						var tempItem = fullJson.items[i];
						if (tempItem.tabid == tabId) {
							item = tempItem;
							break;
						}
					}
					for ( var i = 0; i < item.erModule.length; i++) {
						var window = item.erModule[i];
						var windowId = window.id;
						var confTabId = haflow.flow
								.getConfTabIdByModuleId(windowId);
						var confTab = dijit.byId(confTabId);

						var tabContainer = registry.byId("bottomTabs");
						// var btab4 = registry.byId("btab4");
						// domConstruct.destroy("btab4"); //TODO
						if (confTab) {
							tabContainer.removeChild(confTab);
							confTab.destroy();
						}
					}
				}
				return close;
			}

			// invoked when the tree item was clicked.
			menuClicked = function(item) {
				var flowId = continentStore.getValue(item, "id");
				var tabId = getTabId(flowId);
				var tab = dijit.byId(tabId);

				if (tab) {
					dijit.byId('topTabs').selectChild(tab);
				} else {// open tab and init canvas
					var name = continentStore.getValue(item, "name");
					var canvasId = getCanvasId(flowId);
					newFlowTab(name, tabId, canvasId);// invoke flowTabOnShow

					// invoke on the first load
					// repaintModules(flowId);//paint flow modules
				}

			}

			// invoked by menuClicked, paint flow modules on canvas only on the
			// first time //openflow2
			repaintModules = function(flowId) {
				// clear the pane

				var targetFlow;// get flow object
				for ( var i = 0; i < fullJson.items.length; i++) {
					if (fullJson.items[i].id == flowId) {
						targetFlow = fullJson.items[i];
						break;
					}
				}
				if (targetFlow && targetFlow.erModule.length > 0) {// paint
																	// modules
					// var ppp = $("#"+getContentPaneId(flowId))[0]; //ok
					var ppp = document.getElementById(getCanvasId(flowId));
					var tab = dijit.byId(getTabId(flowId));
					flow.loadEmModule(tab);// wrong
				}
			}

			// invoke by open button click of context menu
			rOpenFlow = function(targetItem) {
				var item = dijit.byNode(targetItem.getParent().currentTarget).item;
				menuClicked(item);// the same as single click on tree node
			}

			// invoke by clear button click of context menu
			rClearFlow = function(targetItem) {
				var item = dijit.byNode(targetItem.getParent().currentTarget).item;
				var flowId = continentStore.getValue(item, "id");
				var tab = dijit.byId(getTabId(flowId));
				haflow.flow.clearPane(tab);
			}

			// invoke by run button click of context menu
			rRunFlow = function(targetItem) {
				var item = dijit.byNode(targetItem.getParent().currentTarget).item;
				var flowId = continentStore.getValue(item, "id");
				runFlowInline(flowId);
			}

			// run flow : flowId
			runFlowInline = function(flowId) {
				dojo.rawXhrPost({
					url : "full/run/" + flowId + ".json",
					postData : JSON.stringify(fullJson, function(key, val) {
						if (key[0] == '_' && key != "_type") {
							return            	       

						}
						return val
					}),
					handleAs : "json",
					headers : {
						"Content-Type" : "application/json"
					},
					error : function(error) {
						alert(error.message);
					},
					load : function(response) {
						alert(response.message);
						domConstruct.place(domConstruct.toDom("<li>"
								+ response.message + "</li>"), dom
								.byId("btab0console"));
						dijit.byId("bottomTabs").selectChild("btab0");
					}
				});
			}

			// invoke by menu bar button run current
			runCurrentFlow = function() {
				var currentTab = dijit.byId("topTabs").selectedChildWidget
				var tabId = currentTab.id;
				for ( var i = 0; i < fullJson.items.length; i++) {
					var item = fullJson.items[i];
					if (item.tabid == tabId) {
						alert(item.id);
						runFlowInline(item.id);
						return;
					}
				}
			}

			// invoke by new button click of context menu
			rNewFlow = function() {
				rNewFlowDialog.show();
			}

			// callback function of rNewFlowDialog's ok button
			fNewFlowNameCallBack = function() {
				var name = rNewFlowName.value;
				if (name != null && dojo.string.trim(name).length > 0) {
					name = dojo.string.trim(name);
					for ( var i = 0; i < fullJson.items.length; i++) {
						if (fullJson.items[i].name == name) {
							rNewFlowDialog.hide();
							alert("name already exists: " + name);
							return;
						}
					}
					newFlowInline(name);// new flow
				} else {
					rNewFlowDialog.hide();
					alert("invalid name : " + name);
				}
			}

			// invoked by fNewFlowNameCallBack
			// create a new flow with flow name
			newFlowInline = function(newFlowName) {
				alert(newFlowName);

				// add one item to continentStore
				var flowId = getFlowId(newFlowName);
				continentStore.newItem({// modify store
					id : flowId,
					name : newFlowName,
					type : "FLOW",
					tabid : getTabId(flowId),
					erModule : []
				});
				newFlowTab(newFlowName, getTabId(flowId), getCanvasId(flowId));// open
																				// a
																				// new
																				// flow
																				// tab
			}

			// invoked when new item function of store was invoked
			newStoreItemCallback = function(newItem) {
				// myStore.remove('entryFlow1');
				alert("new item was added to store");
			}

			// invoke by newFlowInline
			newFlowTab = function(name, tabId, canvasId) {
				var ntp = new dijit.layout.ContentPane({// a new tab when create
														// a new flow
					title : name,
					style : "display:none; padding:10px;",
					content : "<div  id=\"" + canvasId
							+ "\" class=\"flowContent\" ><p></p></div>",
					closable : true,
					id : tabId,
					onShow : flowTabOnShow,
					onClose : flowTabOnClose
				});

				// init flow canvas
				dijit.byId("topTabs").addChild(ntp);
				haflow.flow.pane.init(canvasId);
				dijit.byId("topTabs").selectChild(ntp);
			}

			// invoke by new button click of context menu
			// targetItem: context menu button "delete"
			var currentTreeNode;
			rDeleteFlow = function(targetItem) {
				currentTreeNode = dijit
						.byNode(targetItem.getParent().currentTarget);
				dojo.byId("flowDeleteConfirmContent").innerHTML = "Are you sure to delete flow "
						+ continentStore.getValue(currentTreeNode.item, "name");
				flowDeleteConfirmDialog.show();// make sure that user want to
												// delete flow
			}

			// call back function of delete confirm dialog
			flowDeleteConfirmCallback = function() {
				flowDeleteConfirmDialog.hide();
				var tabid = dijit.byId(continentStore.getValue(
						currentTreeNode.item, "tabid"));
				if (tabid) {
					dijit.byId("topTabs").removeChild(tabid);// close the tab
																// of this tree
																// node
				}
				continentStore.deleteItem(currentTreeNode.item);// remove the
																// item from
																// store
			}

			// flow save2
			saveFlow2 = function() {
				var selected = dijit.byId("topTabs").selectedChildWidget;
				dojo.rawXhrPost({
					url : "full/save.json",
					postData : JSON.stringify(fullJson, function(key, val) {
						if (key[0] == '_' && key != "_type") {
							return            	       

						}
						return val
					}),
					handleAs : "json",
					headers : {
						"Content-Type" : "application/json"
					},
					error : function(error) {
						alert(error.message);
					},
					load : function(response) {
						alert(response.label);
					}
				});
			}

			// button run New Flow
			newFlow = function() {
				var ntp = new dijit.layout.ContentPane(
						{
							title : "flowPane1",
							style : "display:none; padding:10px;",
							content : "<div  id=\"flowContent1\" class=\"flowContent\" ><p></p></div>",
							closable : true,
							id : "flowPane1"
						});

				dijit.byId("topTabs").addChild(ntp);
				haflow.flow.pane.init();
				dijit.byId("topTabs").selectChild("flowPane1");

			}

			// button run run
			runFlow = function() {
				dojo.rawXhrPost({
					url : "flow/run.json",
					postData : dojo.toJson({
						jarPath : dojo.query(".jarPath")[0].value,
						inPath : dojo.query(".inPath")[0].value,
						outPath : dojo.query(".outPath")[0].value,
						confPath : dojo.query(".confPath")[0].value,
						console : "input"
					}),
					handleAs : "json",
					headers : {
						"Content-Type" : "application/json"
					},
					error : function(error) {
						alert(error.message);
					},
					load : function(response) {
						alert(response.console);
						domConstruct.place(domConstruct.toDom("<li>"
								+ response.console + "</li>"), dom
								.byId("btab0console"));
						dijit.byId("bottomTabs").selectChild("btab0");
					}
				});
			}

			// button flow save
			saveFlow = function() {
				dojo.rawXhrPost({
					url : "flow/save.json",
					postData : dojo.toJson({
						identifier : "entryFlow",
						label : "Entry Flow",
						erModule : [ {
							id : moduleArray[0].id,
							name : moduleArray[0].name,
							type : moduleArray[0].type,
							properties : [ {
								jarPath : dojo.query(".jarPath")[0].value,
								inputPath : dojo.query(".inPath")[0].value,
								outputPath : dojo.query(".outPath")[0].value,
								confPath : dojo.query(".confPath")[0].value
							} ],
							position : [ {
								x : moduleArray[0].x,// TODO
								y : moduleArray[0].y
							} ]
						} ]
					}),
					handleAs : "json",
					headers : {
						"Content-Type" : "application/json"
					},
					error : function(error) {
						alert(error.message);
					},
					load : function(response) {
						alert(response.erModule[0].id);
					}
				});
			}

			// button flow open
			openFlow = function() {
				dojo.xhrGet({
					url : "flow/open.json",
					handleAs : "json",
					headers : {
						"Content-Type" : "application/json"
					},
					error : function(error) {
						alert(error.message);
					},
					load : function(response) {
						var ppp = $(".flowContent")[0];
						flow.createEmModule($(ppp),
								response.erModule[0].position[0].x,
								response.erModule[0].position[0].y,
								response.erModule[0].id,
								response.erModule[0].properties[0].jarPath,
								response.erModule[0].properties[0].inputPath,
								response.erModule[0].properties[0].outputPath,
								response.erModule[0].properties[0].confPath);
					}
				});
			}

			ready(function() {

				var tabs = dijit.byId("topTabs");
				dojo.connect(tabs, "_transition", function(newPage, oldPage) {
					alert("I was showing: " + oldPage);
					alert("I am now showing: " + newPage);
				});

				// Delay parsing until the dynamically injected theme <link>'s
				// have had time to finish loading
				setTimeout(function() {
					parser.parse();
					dom.byId('loaderInner').innerHTML += " done.";
					setTimeout(function hideLoader() {
						fx.fadeOut({
							node : 'loader',
							duration : 50,
							onEnd : function(n) {
								n.style.display = "none";
							}
						}).play();
					}, 250);
				});

			});

			myFunc = function() {
				alert("OK2");
			}

		});