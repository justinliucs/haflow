define([
	     	"require",
	     	"dojo/_base/array",
	     	"dojo/_base/config",
	     	"dojo/dom",
	     	"dojo/dom-class",
	     	"dojo/dom-construct",
	     	"dojo/_base/kernel",
	     	"dojo/query",
	     	"dojo/ready",
	     	"dojo/_base/window",
	     	"dojo/_base/fx",
	     	"dijit/registry",
	     	"dijit/MenuItem",
	     	"dojo/date/locale",
	     	"dojo/parser",
	     	"dojo/data/ItemFileReadStore",
	     	"dojo/data/ItemFileWriteStore",
	     	"dijit/tree/ForestStoreModel",
	     	"dojo/number", // dojo.number.format
	     	"dojo/dnd/Source", // dojo.dnd.Source
	     	"dojo/_base/json", // dojo.toJson
	     	"dijit/dijit-all", // dijit.*
	     	"dojox/layout/ContentPane",
	     	"dijit/layout/ContentPane", 
	     	"dijit/layout/TabContainer",
	     	"haflow/flow",'dojo/_base/kernel', 'dojo/io/script', 'dojo/_base/loader'
	     	    ], function(require, array, config, dom, domClass, domConstruct, kernel, query, ready, win, fx, registry, MenuItem,
	     			locale, parser, ItemFileReadStore,ItemFileWriteStore, ForestStoreModel, number, source, json, 
	     		    all, xContentPane, ContentPane, TabContainer, flow, dojo, ioScript){
		
	dojo.provide("haflow.flow");
	
    haflow.flow.name = "It works";

    haflow.flow.createEmModule = function(ppp, x, y, idCount, jarPath, inPath, outPath, confPath){
    	// ppp.find("p")
        $("#flowContent p").append('<div class="box jq-draggable-incontainer ui-draggable boxstyle" id="window' + idCount + '"' + 'style="position: absolute; left: ' + x + 'px; top: ' + y + 'px;"><strong>ER</strong></div><div style="height:100px;"></div>');
        SBS.UI.Views.Plumb.AddEndpoints("window" + idCount, ["BottomCenter"], []);

        var btab4 = dom.byId("btab4");
        var tabContainer = registry.byId("bottomTabs");
        var entryJSP = "<div id=\"entryContent\">" +
		"<table>" +
			"<thead>" +
				"<tr><td colspan=2><B>Entry Recognition Configuration</B></td></tr>" +
			"</thead>" +
			"<tr>" +
				"<td><label for=\"jarPath\">Jar Path </label></td>" +
				"<td><input class=\"jarPath\" value=\"" + jarPath + "\" /></td>" +
			"</tr>" +
			"<tr>" +
				"<td><label for=\"inPath\">Input Path</label></td>" +
				"<td><input class=\"inPath\" value=\"" + inPath + "\" /></td>" +
			"</tr>" +
			"<tr>" +
				"<td><label for=\"outPath\">Output Path</label></td>" +
				"<td><input class=\"outPath\" value=\"" + outPath + "\" /></td>" +
			"</tr>" +
			"<tr>" +
				"<td><label for=\"confPath\">Conf Path </label></td>" +
				"<td><input class=\"confPath\" value=\"" + confPath + "\" /></td>" +
			"</tr>" +			
		"</table>" +	  	
		"</div>"
        var entryPane = new xContentPane({
            content: entryJSP,
            executescripts: true
        });
        //entryPane.setHref("/haflow/entry");
        var pane = new ContentPane({
            content: entryPane,
            style: "padding:10px",
            title: "ER Conf"
        });
        tabContainer.addChild(pane);
        tabContainer.selectChild(pane);

        moduleArray[idCount] = {
            id: idCount,
            name: "ER-" + idCount,
            type: "ER-MODULE",
            x: x,
            y: y
        };
        $(".box").draggable({
            containment: "#flowContent"
        });
        jsPlumb.repaintEverything();
    }

    haflow.flow.pane = {
        init: function() {
            $(".window").draggable({
                appendTo: "#main",
                helper: "clone"
            });
            $(".jq-draggable-incontainer").draggable({
                containment: $("#flowContent").length ? "#flowContent": "document"
            });

            $(".box").draggable({
                containment: "#flowContent"
            });
            $("#flowContent").droppable({
                drop: function(event, ui) {
                    //  debugger;
                    if (ui.draggable[0].className.indexOf("ui-draggable") > 0) {
                        var text = ui.draggable[0].id
                        var x = event.pageX,
                        //-event.target.offsetLeft
                        y = event.pageY //-event.target.offsetTop
                        var x0 = $("#flowContent")[0].offsetLeft;
                        var x1 = $("#flowTab")[0].offsetLeft;
                        var x2 = $("#topTabs")[0].offsetLeft;
                        var posx = x0 + x1 + x2;
                        x -= posx;

                        var y0 = $("#flowContent")[0].offsetTop;
                        var y1 = $("#flowTab")[0].offsetTop;
                        var y2 = $("#topTabs")[0].offsetTop;
                        var posy = y0 + y1 + y2;
                        y -= posy;

                        var scrollx = $("#flowTab")[0].scrollLeft;
                        var scrolly = $("#flowTab")[0].scrollTop;
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
                        var idCount = moduleArray.length;
                        switch (text) {
                        case "1":
                        	haflow.flow.createEmModule($(this), x, y, idCount,"","","","");
                            break;
                        case "2":
                            $(this).find("p").append('<div class="box jq-draggable-incontainer ui-draggable boxstyle" id="window' + idCount + '"' + 'style="position: absolute; left: ' + x + 'px; top: ' + y + 'px;"><strong>Test</strong></div><div style="height:100px;"></div>');
                            SBS.UI.Views.Plumb.AddEndpoints("window" + idCount, ["BottomCenter", "BottomLeft"], ["TopCenter"]);

                            var tabContainer = registry.byId("bottomTabs");
                            var btab4 = registry.byId("btab4");
                            //domConstruct.destroy("btab4"); //TODO
                            if (btab4) {
                                tabContainer.removeChild(btab4);
                            }

                            break;
                        case "3":
                            $(this).find("p").after('<div class="box jq-draggable-incontainer ui-draggable boxstyle" id="window' + idCount + '"' + 'style="position: absolute; left: ' + x + 'px; top: ' + y + 'px;"><strong>HQ</strong></div>');
                            SBS.UI.Views.Plumb.AddEndpoints("window" + idCount, [], ["TopCenter", "TopLeft"]);

                            var tabContainer = registry.byId("bottomTabs");
                            var entryPane = new xContentPane({
                                content: "Loading contents.html.",
                                executescripts: true
                            });
                            entryPane.setHref("/haflow/hive");
                            var pane = new ContentPane({
                                content: entryPane,
                                style: "padding:10px",
                                title: "HQ Conf"
                            });
                            tabContainer.addChild(pane);
                            tabContainer.selectChild(pane);

                            break;
                        }
                        jsPlumb.repaintEverything();
                    }
                   
                }
            });
            SBS.UI.Views.Plumb.init();
        }
    }

    var SBS = SBS || {};
    SBS.UI = SBS.UI || {};
    SBS.UI.Views = SBS.UI.Views || {};
    SBS.UI.Views.Plumb = {
        init: function() {
            jsPlumb.importDefaults({
                // default drag options
                DragOptions: {
                    cursor: 'pointer',
                    zIndex: 2000
                },
                // default to blue at one end and green at the other
                EndpointStyles: [{
                    fillStyle: '#225588'
                },
                {
                    fillStyle: '#558822'
                }],
                // blue endpoints 7 px; green endpoints 11.
                Endpoints: [["Dot", {
                    radius: 7
                }], ["Dot", {
                    radius: 7
                }]],
                // the overlays to decorate each connection with.  note that the label overlay uses a function to generate the label text; in this
                // case it returns the 'labelText' member that we set on each connection in the 'init' method below.
                ConnectionOverlays: [["Arrow", {
                    location: 0.9
                }], ["Label", {
                    location: 0.1,
                    id: "label",
                    cssClass: "aLabel"
                }]]
            });
            var connectorPaintStyle = {
                lineWidth: 5,
                strokeStyle: "#deea18",
                joinstyle: "round"
            },
            // .. and this is the hover style. 
            connectorHoverStyle = {
                lineWidth: 7,
                strokeStyle: "#2e2aF8"
            };
            sourceEndpoint = {
                endpoint: "Dot",
                paintStyle: {
                    fillStyle: "#225588",
                    radius: 7
                },
                isSource: true,
                connector: ["Flowchart", {
                    stub: 40
                }],
                connectorStyle: connectorPaintStyle,
                hoverPaintStyle: connectorHoverStyle,
                connectorHoverStyle: connectorHoverStyle,
                overlays: [["Label", {
                    location: [0.5, 1.5],
                    label: "Output",
                    cssClass: "endpointSourceLabel"
                }]]
            };
            targetEndpoint = {
                endpoint: "Rectangle",
                paintStyle: {
                    fillStyle: "#558822",
                    radius: 7
                },
                hoverPaintStyle: connectorHoverStyle,
                maxConnections: -1,
                dropOptions: {
                    hoverClass: "hover",
                    activeClass: "active"
                },
                isTarget: true
            };

            // a source endpoint that sits at BottomCenter
            bottomSource = jsPlumb.extend({
                anchor: "BottomCenter"
            },
            sourceEndpoint),
            // the definition of target endpoints (will appear when the user drags a connection) 
            targetEndpoint = {
                endpoint: "Dot",
                paintStyle: {
                    fillStyle: "#558822",
                    radius: 7
                },
                hoverPaintStyle: connectorHoverStyle,
                maxConnections: -1,
                dropOptions: {
                    hoverClass: "hover",
                    activeClass: "active"
                },
                isTarget: true,
                overlays: [["Label", {
                    location: [0.5, -0.5],
                    label: "Input",
                    cssClass: "endpointTargetLabel"
                }]]
            };

            jsPlumb.bind("jsPlumbConnection",
            function(connInfo, originalEvent) {
                init(connInfo.connection);
            });
            jsPlumb.bind("click",
            function(conn, originalEvent) {
                if (confirm("Delete connection from " + conn.sourceId + " to " + conn.targetId + "?")) jsPlumb.detach(conn);
            });
        },

        AddEndpoints: function(toId, sourceAnchors, targetAnchors) {
            var allSourceEndpoints = [],
            allTargetEndpoints = [];
            for (var i = 0; i < sourceAnchors.length; i++) {
                var sourceUUID = toId + sourceAnchors[i];
                allSourceEndpoints.push(jsPlumb.addEndpoint(toId, sourceEndpoint, {
                    anchor: sourceAnchors[i],
                    uuid: sourceUUID
                }));
            }
            for (var j = 0; j < targetAnchors.length; j++) {
                var targetUUID = toId + targetAnchors[j];
                allTargetEndpoints.push(jsPlumb.addEndpoint(toId, targetEndpoint, {
                    anchor: targetAnchors[j],
                    uuid: targetUUID
                }));
            }
        }
    }
  
});
