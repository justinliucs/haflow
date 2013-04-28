$(function() {
	$(".window").draggable({
		appendTo: "#main",
        helper: "clone"
        });

		
	$(".jq-draggable-incontainer").draggable({	
		containment: $( "#flowContent" ).length ? "#flowContent" : "document"
		});
		
	$(".box").draggable({containment: "#flowContent"});	
	//jsPlumb.draggable(".box");
   
	var idCount = 1;
	$("#flowContent").droppable( {
       drop: function (event, ui) {
            //  debugger;
			if (ui.draggable[0].className.indexOf("ui-draggable") > 0) {
                var text = ui.draggable[0].id
				var x = event.pageX,//-event.target.offsetLeft
				y = event.pageY//-event.target.offsetTop
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
				
				if( x < 10){
					x = 10;
				}
				if( x > 948){
					x = 948;
				}
				if( y < 26.5){
					y = 26.5;
				}
				if( y > 964.85){
					y = 964.85;
				}
				
                switch (text) {
                    case "1":
                        $(this).find("p")
                            .append('<div class="box jq-draggable-incontainer ui-draggable boxstyle" id="window'+idCount+'"' +
							'style="position: absolute; left: '+ x + 'px; top: ' + y 
							+'px;"><strong>1</strong></div><div style="height:100px;"></div>');
                            SBS.UI.Views.Plumb.AddEndpoints("window"+idCount++, ["BottomCenter"], []);							
							break;
                    case "2":
                        $(this).find("p")
                            .append('<div class="box jq-draggable-incontainer ui-draggable boxstyle" id="window'+idCount+'"' +
							'style="position: absolute; left: '+ x + 'px; top: ' + y 
							+'px;"><strong>2</strong></div><div style="height:100px;"></div>');
                            SBS.UI.Views.Plumb.AddEndpoints("window"+idCount++, ["BottomCenter","BottomLeft"], ["TopCenter"]);
							break;
                    case "3":
                        $(this).find("p")
                            .after('<div class="box jq-draggable-incontainer ui-draggable boxstyle" id="window'+idCount+'"' +
							'style="position: absolute; left: '+ x + 'px; top: ' + y 
							+'px;"><strong>3</strong></div>');
                            SBS.UI.Views.Plumb.AddEndpoints("window"+idCount++, [], ["TopCenter", "TopLeft"]);
							break;
                }
				idCount++;
				$(".box").draggable({containment: "#flowContent"});	
				jsPlumb.repaintEverything();
            }
        }
    });
		
	var SBS = SBS || {};
	SBS.UI = SBS.UI || {};
	SBS.UI.Views = SBS.UI.Views || {};
	SBS.UI.Views.Plumb = {
		init: function () {
			jsPlumb.importDefaults({
				// default drag options
				DragOptions: { cursor: 'pointer', zIndex: 2000 },
				// default to blue at one end and green at the other
				EndpointStyles: [{ fillStyle: '#225588' }, { fillStyle: '#558822'}],
				// blue endpoints 7 px; green endpoints 11.
				Endpoints: [["Dot", { radius: 7}], ["Dot", { radius: 7}]],
				// the overlays to decorate each connection with.  note that the label overlay uses a function to generate the label text; in this
				// case it returns the 'labelText' member that we set on each connection in the 'init' method below.
				ConnectionOverlays: [
						["Arrow", { location: 0.9}],
						["Label", {
							location: 0.1,
							id: "label",
							cssClass: "aLabel"
						}]
					]
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
				paintStyle: { fillStyle: "#225588", radius: 7 },
				isSource: true,
				connector: ["Flowchart", { stub: 40}],
				connectorStyle: connectorPaintStyle,
				hoverPaintStyle: connectorHoverStyle,
				connectorHoverStyle: connectorHoverStyle,
				overlays:[
                    [ "Label", { 
                        location:[0.5, 1.5], 
                        label:"Output",
                        cssClass:"endpointSourceLabel" 
                    } ]]
			};
			targetEndpoint = {
				endpoint: "Rectangle",
				paintStyle: { fillStyle: "#558822", radius: 7 },
				hoverPaintStyle: connectorHoverStyle,
				maxConnections: -1,
				dropOptions: { hoverClass: "hover", activeClass: "active" },
				isTarget: true
			};
			
			// a source endpoint that sits at BottomCenter
        bottomSource = jsPlumb.extend({ anchor: "BottomCenter" }, sourceEndpoint),
        // the definition of target endpoints (will appear when the user drags a connection) 
            targetEndpoint = {
                endpoint: "Dot",
                paintStyle: { fillStyle: "#558822", radius: 7 },
                hoverPaintStyle: connectorHoverStyle,
                maxConnections: -1,
                dropOptions: { hoverClass: "hover", activeClass: "active" },
                isTarget: true,
                overlays: [
                    ["Label", { location: [0.5, -0.5], label: "Input", cssClass: "endpointTargetLabel"}]
                ]
            };
			
			jsPlumb.bind("jsPlumbConnection", function (connInfo, originalEvent) {
				init(connInfo.connection);
			});
			jsPlumb.bind("click", function (conn, originalEvent) {
				if (confirm("Delete connection from " + conn.sourceId + " to " + conn.targetId + "?"))
					jsPlumb.detach(conn);
			});
		},

		AddEndpoints: function (toId, sourceAnchors, targetAnchors) {
			var allSourceEndpoints = [], allTargetEndpoints = [];
			for (var i = 0; i < sourceAnchors.length; i++) {
				var sourceUUID = toId + sourceAnchors[i];
				allSourceEndpoints.push(jsPlumb.addEndpoint(toId, sourceEndpoint, { anchor: sourceAnchors[i], uuid: sourceUUID }));
			}
			for (var j = 0; j < targetAnchors.length; j++) {
				var targetUUID = toId + targetAnchors[j];
				allTargetEndpoints.push(jsPlumb.addEndpoint(toId, targetEndpoint, { anchor: targetAnchors[j], uuid: targetUUID }));
			}
		}
	}

	//Page load events
	$(document).ready(
		function () {
			//all JavaScript that needs to be call onPageLoad can be put here.
			SBS.UI.Views.Plumb.init();
		}
	);
				
});