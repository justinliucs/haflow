define(
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
				'dojo/_base/kernel', 'dojo/io/script', 'dojo/_base/loader',
				"dojo/NodeList-traverse" ],
		function(require, array, config, dom, domClass, domConstruct, kernel,
				query, ready, win, fx, registry, MenuItem, locale, parser,
				ItemFileReadStore, ItemFileWriteStore, ForestStoreModel,
				number, source, json, all, xContentPane, ContentPane,
				TabContainer, flow, dojo, ioScript, loader, traverse) {

			dojo.provide("haflow.flow");

			haflow.flow.name = "It works";

			// invoked when drag window from module list
			haflow.flow.newEmModule = function(tab, x, y) {
				// canvas = dijit.byId("topTabs").selectedChildWidget;
				var item;
				var erModules;
				for ( var i = 0; i < fullJson.items.length; i++) {
					var flowId = fullJson.items[i].id;
					var a = getTabId(flowId);
					var b = tab.id;
					if (a == b) {
						item = fullJson.items[i];
						erModules = item.erModule;
						break;
					}
				}
				var idCount = erModules.length;
				var windowId = "window_" + item.id + "_" + idCount;
				// var confPaneId = "conf_" + item.id + "_" + idCount;
				// var confTabId = "conf_tab_" + item.id + "_" + idCount;

				erModules[idCount] = {
					"id" : windowId,
					"name" : "ER",
					"_type" : "String",
					"mtype" : "ER-MODULE",
					"erProperties" : {
						"jarPath" : "",
						"inputPath" : "",
						"outputPath" : "",
						"confPath" : ""
					},
					"position" : {
						"x" : x,
						"y" : y
					}
				}
				var canvas = dojo.byId(getCanvasId(flowId));
				var p = canvas.children[0];
				$(p)
						.append(
								'<div class="box jq-draggable-incontainer ui-draggable boxstyle" id="'
										+ windowId
										+ '"'
										+ 'style="position: absolute; left: '
										+ x
										+ 'px; top: '
										+ y
										+ 'px;"><strong>ER</strong></div><div style="height:100px;"></div>');
				// SBS.UI.Views.Plumb.AddEndpoints(windowId, ["BottomCenter"],
				// []);

				var tabContainer = registry.byId("bottomTabs");

				var pane = createConfTabPane(windowId, "", "", "", "");

				tabContainer.addChild(pane);
				tabContainer.selectChild(pane);

				$(".box").draggable({
					containment : "#" + getCanvasId(flowId)
				});
				jsPlumb.repaintEverything();
			}

			haflow.flow.clearPane = function(tab) {
				var item;
				var erModules;
				var flowId;
				for ( var i = 0; i < fullJson.items.length; i++) {
					flowId = fullJson.items[i].id;
					var a = getTabId(flowId);
					var b = tab.id;
					if (a == b) {
						item = fullJson.items[i];
						erModules = item.erModule;
						break;
					}
				}
				var canvas = dojo.byId(getCanvasId(flowId));
				var p = canvas.children[0];
				for ( var i = 0; i < erModules.length; i++) {
					var id = erModules[i].id;
					var windowId = id;
					// var confPaneId = "conf_" + id + "_" + i;
					// var confTabId = "conf_tab_" + item.id + "_" + i;
					var confPaneId = haflow.flow.getConfPaneIdByModuleId(id);// "conf_"
																				// + id
																				// +
																				// "_"
																				// + i;
					var confTabId = haflow.flow.getConfTabIdByModuleId(id);// "conf_tab_"
																			// +
																			// item.id
																			// +
																			// "_"
																			// + i;

					var window = dojo.byId(id);
					if (window) {
						dojo.destroy(window);

						// var tabContainer = registry.byId("bottomTabs");
						// var confTab = registry.byId(confTabId);
						// if (confTab) {
						// tabContainer.removeChild(confTab);
						// }
					}
				}

			}

			haflow.flow.getConfTabIdByModuleId = function(moduleId) {
				return "conf_tab_" + moduleId;
			}

			haflow.flow.getConfPaneIdByModuleId = function(moduleId) {
				return "conf_pane_" + moduleId;
			}

			inputBlur = function() {
				// var a = query("#" + this.id);
				// var abcd = a.parent(".dijitTabPane");
				for ( var i = 0; i < fullJson.items.length; i++) {
					var item = fullJson.items[i];
					for ( var j = 0; j < item.erModule.length; j++) {
						var window = item.erModule[j];
						if (window.id == this.parent) {
							switch (this.class) {
							case "jarPath":
								window.erProperties.jarPath = this.value;
								break;
							case "inPath":
								window.erProperties.inputPath = this.value;
								break;
							case "outPath":
								window.erProperties.outputPath = this.value;
								break;
							case "confPath":
								window.erProperties.confPath = this.value;
								break;
							}
							return true;
						}
					}
				}
				return true;
			}
			haflow.flow.loadEmModule = function(tab) {
				// canvas = dijit.byId("topTabs").selectedChildWidget;
				var item;
				var erModules;
				var flowId;
				for ( var i = 0; i < fullJson.items.length; i++) {
					flowId = fullJson.items[i].id;
					var a = getTabId(flowId);
					var b = tab.id;
					if (a == b) {
						item = fullJson.items[i];
						erModules = item.erModule;
						break;
					}
				}

				for ( var i = 0; i < erModules.length; i++) {
					var id = erModules[i].id;
					var name = erModules[i].name;
					var jarPath = erModules[i].erProperties.jarPath;
					var inputPath = erModules[i].erProperties.inputPath;
					var outputPath = erModules[i].erProperties.outputPath;
					var confPath = erModules[i].erProperties.confPath;
					var xx = erModules[i].position.x;
					var yy = erModules[i].position.y;

					var windowId = id;
					// var confPaneId =
					// haflow.flow.getConfPaneIdByModuleId(id);//"conf_" + id +
					// "_" + i;
					var confTabId = haflow.flow.getConfTabIdByModuleId(id);// "conf_tab_"
																			// +
																			// item.id
																			// +
																			// "_"
																			// + i;

					var canvas = dojo.byId(getCanvasId(flowId));
					var p = canvas.children[0];
					$(p)
							.append(
									'<div class="box jq-draggable-incontainer ui-draggable boxstyle" id="'
											+ windowId
											+ '"'
											+ 'style="position: absolute; left: '
											+ xx
											+ 'px; top: '
											+ yy
											+ 'px;"><strong>ER</strong></div><div style="height:100px;"></div>');
					// SBS.UI.Views.Plumb.AddEndpoints(windowId,
					// ["BottomCenter"], []);

					if (!dojo.byId(confTabId)) {// test if the first load
						var tabContainer = registry.byId("bottomTabs");
						var pane = createConfTabPane(windowId, jarPath,
								inputPath, outputPath, confPath);

						tabContainer.addChild(pane);
						tabContainer.selectChild(pane);
					}
				}

				$(".box").draggable({
					containment : "#" + getCanvasId(flowId)
				});
				jsPlumb.repaintEverything();
			}

			createConfTabPane = function(windowId, jarPath, inputPath,
					outputPath, confPath) {

				var confPaneId = haflow.flow.getConfPaneIdByModuleId(windowId);// "conf_"
																				// + id
																				// +
																				// "_"
																				// + i;
				var confTabId = haflow.flow.getConfTabIdByModuleId(windowId);// "conf_tab_"
																				// +
																				// item.id
																				// +
																				// "_"
																				// + i;

				var entryJSP = "<div id=\""
						+ confPaneId
						+ "\">"
						+ "<table>"
						+ "<thead>"
						+ "<tr><td colspan=2><B>Entry Recognition Configuration</B></td></tr>"
						+ "</thead>"
						+ "<tr>"
						+ "<td><label for=\"jarPath\">Jar Path </label></td>"
						+ "<td><input data-dojo-type=\"dijit.form.TextBox\" data-dojo-props=\"onBlur:inputBlur\" parent=\""
						+ windowId
						+ "\" class=\"jarPath\" value=\""
						+ jarPath
						+ "\" /></td>"
						+ "</tr>"
						+ "<tr>"
						+ "<td><label for=\"inPath\">Input Path</label></td>"
						+ "<td><input data-dojo-type=\"dijit.form.TextBox\" data-dojo-props=\"onBlur:inputBlur\" parent=\""
						+ windowId
						+ "\" class=\"inPath\" value=\""
						+ inputPath
						+ "\" /></td>"
						+ "</tr>"
						+ "<tr>"
						+ "<td><label for=\"outPath\">Output Path</label></td>"
						+ "<td><input data-dojo-type=\"dijit.form.TextBox\" data-dojo-props=\"onBlur:inputBlur\" parent=\""
						+ windowId
						+ "\" class=\"outPath\" value=\""
						+ outputPath
						+ "\" /></td>"
						+ "</tr>"
						+ "<tr>"
						+ "<td><label for=\"confPath\">Conf Path </label></td>"
						+ "<td><input data-dojo-type=\"dijit.form.TextBox\" data-dojo-props=\"onBlur:inputBlur\" parent=\""
						+ windowId + "\" class=\"confPath\" value=\""
						+ confPath + "\" /></td>" + "</tr>" + "</table>"
						+ "</div>";

				var entryPane = new xContentPane({
					content : entryJSP,
					executescripts : true
				});
				// entryPane.setHref("/haflow/entry");
				var pane = new ContentPane({
					content : entryPane,
					style : "padding:10px",
					title : "ER Conf",
					id : confTabId
				});
				return pane;
			}

			haflow.flow.repaintEverything = function() {
				jsPlumb.repaintEverything();
			}

			haflow.flow.pane = {
				init : function(canvasId) {
					$(".window").draggable({
						appendTo : "#main",
						helper : "clone"
					});
					$(".jq-draggable-incontainer").draggable(
							{
								containment : $("#" + canvasId).length ? "#"
										+ canvasId : "document"
							});

					$(".box").draggable({
						containment : "#" + canvasId
					});
					$("#" + canvasId)
							.droppable(
									{
										drop : function(event, ui) {
											// debugger;
											if (ui.draggable[0].className
													.indexOf("ui-draggable") > 0) {
												var text = ui.draggable[0].id
												var x = event.pageX,
												// -event.target.offsetLeft
												y = event.pageY // -event.target.offsetTop
												// var tt0 =
												// event.target.offsetLeft;
												// var tt1 =
												// event.target.parentElement;
												// var tt2 = tt1.offsetLeft;

												var x0 = event.target.offsetLeft;
												var x1 = event.target.parentElement.offsetLeft;
												var x2 = $("#topTabs")[0].offsetLeft;
												var posx = x0 + x1 + x2;
												x -= posx;

												var y0 = event.target.offsetTop;
												var y1 = event.target.parentElement.offsetTop;
												var y2 = $("#topTabs")[0].offsetTop;
												var posy = y0 + y1 + y2;
												y -= posy;

												var scrollx = event.target.parentElement.scrollLeft;
												var scrolly = event.target.parentElement.scrollTop;
												x += scrollx;
												y += scrolly;

												if (x < 10) {
													x = 10;
												}
												if (x > 948) {
													x = 948;
												}
												if (y < 26.5) {
													y = 26.5;
												}
												if (y > 964.85) {
													y = 964.85;
												}
												var idCount = 3;// moduleArray.length;
												
												var elementId=ui.helper.context.id;
												for(var i=0;i<idCount;i++){
													if(fullJson.items[i].erModule[0].id==elementId){
														fullJson.items[i].erModule[0].position.x=x;
														fullJson.items[i].erModule[0].position.y=y;
													}
												}
												
												switch (text) {
												case "1":
													if (this.id == "flowContentr") {
														haflow.flow
																.createEmModule(
																		$(this),
																		x,
																		y,
																		idCount,
																		"", "",
																		"", "");
													} else {
														haflow.flow
																.newEmModule(
																		dijit
																				.byId("topTabs").selectedChildWidget,
																		x, y);
													}
													break;
												case "2":
													$(this)
															.find("p")
															.append(
																	'<div class="box jq-draggable-incontainer ui-draggable boxstyle" id="window'
																			+ idCount
																			+ '"'
																			+ 'style="position: absolute; left: '
																			+ x
																			+ 'px; top: '
																			+ y
																			+ 'px;"><strong>Test</strong></div><div style="height:100px;"></div>');
													SBS.UI.Views.Plumb
															.AddEndpoints(
																	"window"
																			+ idCount,
																	[
																			"BottomCenter",
																			"BottomLeft" ],
																	[ "TopCenter" ]);

													var tabContainer = registry
															.byId("bottomTabs");
													var btab4 = registry
															.byId("btab4");
													// domConstruct.destroy("btab4");
													// //TODO
													if (btab4) {
														tabContainer
																.removeChild(btab4);
													}

													break;
												case "3":
													$(this)
															.find("p")
															.after(
																	'<div class="box jq-draggable-incontainer ui-draggable boxstyle" id="window'
																			+ idCount
																			+ '"'
																			+ 'style="position: absolute; left: '
																			+ x
																			+ 'px; top: '
																			+ y
																			+ 'px;"><strong>HQ</strong></div>');
													SBS.UI.Views.Plumb
															.AddEndpoints(
																	"window"
																			+ idCount,
																	[],
																	[
																			"TopCenter",
																			"TopLeft" ]);

													var tabContainer = registry
															.byId("bottomTabs");
													var entryPane = new xContentPane(
															{
																content : "Loading contents.html.",
																executescripts : true
															});
													entryPane
															.setHref("/haflow/hive");
													var pane = new ContentPane(
															{
																content : entryPane,
																style : "padding:10px",
																title : "HQ Conf"
															});
													tabContainer.addChild(pane);
													tabContainer
															.selectChild(pane);

													break;
												}
												jsPlumb.repaintEverything();
											}

										}
									});

				}
			}

			haflow.flow.view = {
				init : function() {
					SBS.UI.Views.Plumb.init();
				}
			}

			var SBS = SBS || {};
			SBS.UI = SBS.UI || {};
			SBS.UI.Views = SBS.UI.Views || {};
			SBS.UI.Views.Plumb = {
				init : function() {
					jsPlumb.importDefaults({
						// default drag options
						DragOptions : {
							cursor : 'pointer',
							zIndex : 2000
						},
						// default to blue at one end and green at the other
						EndpointStyles : [ {
							fillStyle : '#225588'
						}, {
							fillStyle : '#558822'
						} ],
						// blue endpoints 7 px; green endpoints 11.
						Endpoints : [ [ "Dot", {
							radius : 7
						} ], [ "Dot", {
							radius : 7
						} ] ],
						// the overlays to decorate each connection with. note
						// that the label overlay uses a function to generate
						// the label text; in this
						// case it returns the 'labelText' member that we set on
						// each connection in the 'init' method below.
						ConnectionOverlays : [ [ "Arrow", {
							location : 0.9
						} ], [ "Label", {
							location : 0.1,
							id : "label",
							cssClass : "aLabel"
						} ] ]
					});
					var connectorPaintStyle = {
						lineWidth : 5,
						strokeStyle : "#deea18",
						joinstyle : "round"
					},
					// .. and this is the hover style.
					connectorHoverStyle = {
						lineWidth : 7,
						strokeStyle : "#2e2aF8"
					};
					sourceEndpoint = {
						endpoint : "Dot",
						paintStyle : {
							fillStyle : "#225588",
							radius : 7
						},
						isSource : true,
						connector : [ "Flowchart", {
							stub : 40
						} ],
						connectorStyle : connectorPaintStyle,
						hoverPaintStyle : connectorHoverStyle,
						connectorHoverStyle : connectorHoverStyle,
						overlays : [ [ "Label", {
							location : [ 0.5, 1.5 ],
							label : "Output",
							cssClass : "endpointSourceLabel"
						} ] ]
					};
					targetEndpoint = {
						endpoint : "Rectangle",
						paintStyle : {
							fillStyle : "#558822",
							radius : 7
						},
						hoverPaintStyle : connectorHoverStyle,
						maxConnections : -1,
						dropOptions : {
							hoverClass : "hover",
							activeClass : "active"
						},
						isTarget : true
					};

					// a source endpoint that sits at BottomCenter
					bottomSource = jsPlumb.extend({
						anchor : "BottomCenter"
					}, sourceEndpoint),
					// the definition of target endpoints (will appear when the
					// user drags a connection)
					targetEndpoint = {
						endpoint : "Dot",
						paintStyle : {
							fillStyle : "#558822",
							radius : 7
						},
						hoverPaintStyle : connectorHoverStyle,
						maxConnections : -1,
						dropOptions : {
							hoverClass : "hover",
							activeClass : "active"
						},
						isTarget : true,
						overlays : [ [ "Label", {
							location : [ 0.5, -0.5 ],
							label : "Input",
							cssClass : "endpointTargetLabel"
						} ] ]
					};

					jsPlumb.bind("jsPlumbConnection", function(connInfo,
							originalEvent) {
						init(connInfo.connection);
					});
					jsPlumb.bind("click", function(conn, originalEvent) {
						if (confirm("Delete connection from " + conn.sourceId
								+ " to " + conn.targetId + "?"))
							jsPlumb.detach(conn);
					});
				},

				AddEndpoints : function(toId, sourceAnchors, targetAnchors) {
					var allSourceEndpoints = [], allTargetEndpoints = [];
					for ( var i = 0; i < sourceAnchors.length; i++) {
						var sourceUUID = toId + sourceAnchors[i];
						allSourceEndpoints.push(jsPlumb.addEndpoint(toId,
								sourceEndpoint, {
									anchor : sourceAnchors[i],
									uuid : sourceUUID
								}));
					}
					for ( var j = 0; j < targetAnchors.length; j++) {
						var targetUUID = toId + targetAnchors[j];
						allTargetEndpoints.push(jsPlumb.addEndpoint(toId,
								targetEndpoint, {
									anchor : targetAnchors[j],
									uuid : targetUUID
								}));
					}
				}
			}

			// canvas: jQuery object of the canvas div
			// x,y: window position
			// *Path: configuration strings
			haflow.flow.createEmModule = function(canvas, x, y, idCount,
					jarPath, inPath, outPath, confPath) {// discard
				// ppp.find("p")
				var ch = canvas.children();
				var p = ch[0];
				$(p)
						.append(
								'<div class="box jq-draggable-incontainer ui-draggable boxstyle" id="window'
										+ idCount
										+ '"'
										+ 'style="position: absolute; left: '
										+ x
										+ 'px; top: '
										+ y
										+ 'px;"><strong>ER</strong></div><div style="height:100px;"></div>');
				// SBS.UI.Views.Plumb.AddEndpoints("window" + idCount,
				// ["BottomCenter"], []);

				var btab4 = dom.byId("btab4");
				var tabContainer = registry.byId("bottomTabs");
				// var pane = createConfTabPane(confTabId, confPaneId, windowId,
				// jarPath, inputPath, outputPath, confPath);
				var entryJSP = "<div id=\"entryContent\">"
						+ "<table>"
						+ "<thead>"
						+ "<tr><td colspan=2><B>Entry Recognition Configuration</B></td></tr>"
						+ "</thead>" + "<tr>"
						+ "<td><label for=\"jarPath\">Jar Path </label></td>"
						+ "<td><input class=\"jarPath\" value=\""
						+ jarPath
						+ "\" /></td>"
						+ "</tr>"
						+ "<tr>"
						+ "<td><label for=\"inPath\">Input Path</label></td>"
						+ "<td><input class=\"inPath\" value=\""
						+ inPath
						+ "\" /></td>"
						+ "</tr>"
						+ "<tr>"
						+ "<td><label for=\"outPath\">Output Path</label></td>"
						+ "<td><input class=\"outPath\" value=\""
						+ outPath
						+ "\" /></td>"
						+ "</tr>"
						+ "<tr>"
						+ "<td><label for=\"confPath\">Conf Path </label></td>"
						+ "<td><input class=\"confPath\" value=\""
						+ confPath
						+ "\" /></td>" + "</tr>" + "</table>" + "</div>"
				var entryPane = new xContentPane({
					content : entryJSP,
					executescripts : true
				});
				// entryPane.setHref("/haflow/entry");
				var pane = new ContentPane({
					content : entryPane,
					style : "padding:10px",
					title : "ER Conf"
				});

				tabContainer.addChild(pane);
				tabContainer.selectChild(pane);

				// moduleArray[idCount] = {
				// id: idCount,
				// name: "ER-" + idCount,
				// type: "ER-MODULE",
				// x: x,
				// y: y
				// };
				$(".box").draggable({
					containment : ".flowContent"
				});
				jsPlumb.repaintEverything();
			}
		});
