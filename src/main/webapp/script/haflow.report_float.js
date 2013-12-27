dojo.require("dojox.widget.Portlet");
dojo.require("dojox.charting.Chart");
dojo.require("dojox.charting.plot2d.StackedAreas");
dojo.require("dojox.charting.themes.Wetland");
dojo.require("dojox.charting.themes.Julie");
dojo.require("dojox.charting.themes.Claro");
dojo.require("dojox.charting.axis2d.Default");
dojo.require("dojox.charting.plot2d.Columns");
dojo.require("dojo.fx.easing");
dojo.require("dojox.fx.scroll");
dojo.require("dijit.registry");
dojo.require("dojo.window");
dojo.require("dojox.charting.plot2d.Lines");
dojo.require("dojox.charting.plot2d.Markers");
dojo.require("dojox.charting.plot2d.Stacked");
dojo.require("dojox.charting.plot2d.Bars");
dojo.require("dojox.charting.plot2d.Columns");
dojo.require("dojox.charting.plot2d.Pie");
dojo.require("dojox.charting.plot2d.ClusteredBars"); 
dojo.require("dojox.charting.axis2d.Default");
dojo.require("dojox/charting/action2d/Tooltip");	
dojo.require("dojox.layout.GridContainer");
dojo.require("dojox.charting.widget.Legend");
dojo.require("dojo.topic");
dojo.require("dojo.dnd.Source");
dojo.require("dojo.dnd.Mover");
dojo.require("dojox.layout.FloatingPane");
dojo.require("dojo.dnd.Source");
dojo.require("dojo.dnd.Moveable");
dojo.require("dojo.dom");
dojo.require("dojo.on");
dojo.require("dojox.layout.ResizeHandle");
//dojo.require("dojo.resize.stop");

HAFlow.Main.prototype.newFloatReport5 = function(parentId) {
	var _currentInstance = this;
	var reportId = HAFlow.generateUUID();
	var contentPane = dijit.byId("reportFloatContainerPane_" + reportId);//mush be dijit.byId
	if( contentPane == null){  
		
		var reportFloatContainerInnerPaneId = "reportFloatContainerInnerPane_"+ reportId;
		
		
		contentPane = new dijit.layout.ContentPane({//stable
			id : "reportFloatContainerPane_" + reportId,
			title : "test",
			content : "<div class='reportcontainerdiv'>" + "<div id='tttt' style='width:400px; height:700px;background-color: red;'></div>" + "</div>",
//			content : "<div  class='reportfloatcontainerdiv' style='width: 900px;height: 978px;'>" + //width: 900px;height: 978px;
//						"<div id='"+ reportFloatContainerDivId + "'></div>" +
//								"</div>",
			closable : true,
		});
		contentPane.startup();
		this.ui.centerContainer.addChild(contentPane);
		
		var innerContentPane = new dijit.layout.ContentPane({
			id: reportFloatContainerInnerPaneId,
			style: 'width:100%; height:100%; background-color: blue;',
		}, "tttt");

		//start test portlet
		var dummyPortletId = "dummy_portlet_id_" + reportId;
	    var portlet1 = dojox.widget.Portlet({
	    	id: dummyPortletId,
	        closable: false,
	        dndType: 'Portlet',
	        title: 'Sample portlet',
	        content: "<div id='chartchart'></div>",//dummyPortlet,
	        style: 'width:200px;',//height is auto fit
	    });
		var handle = new dojox.layout.ResizeHandle({
			id: "ddddd",
			targetId : dummyPortletId
		}).placeAt(dummyPortletId);
//		dojo.place("ddddd", dummyPortletId);
		handle.startup();		
	    portlet1.startup();
	    innerContentPane.addChild(portlet1);
	    var dnd = new dojo.dnd.Moveable(dojo.byId(dummyPortletId));//dnd
	    
	    var dummyPortletId2 = "dummy_portlet_id2_" + reportId;
	    var portlet2 = dojox.widget.Portlet({
	    	id: dummyPortletId2,
	        closable: false,
	        dndType: 'Portlet',
	        title: 'Sample portlet',
	        content: "<div id='chartchart2' style='width:180px; height:140px; background-color: red;'>abc</div>",//dummyPortlet,
	        style: 'width:200px;',
	    });	    
	    portlet2.startup();
		 innerContentPane.addChild(portlet2);
	    
	    var handleDiv = document.createElement('div');
//		dojo.byId(dummyPortletId2).appendChild(handleDiv);
	    var handle2 = new dojox.layout.ResizeHandle({
			targetId : dummyPortletId2,
			activeResize: true,
//			style: "bottom:4px; right:4px;",
		}).placeAt('chartchart2',"after"); //, handleDiv
		handle2.startup();
//		handle2.buildRendering();
		//portlet2.addChild(handle2);
		 
	    
	    var dnd2 = new dojo.dnd.Moveable(dojo.byId(dummyPortletId2));//dnd
//	    dojo.connect(dnd2, "onMoveStop", function(e){ });

		var chart = new dojox.charting.Chart("chartchart").
		addAxis("y", {fixLower: "minor", fixUpper: "minor", natural: true}).
		addAxis("x", {vertical: true, fixLower: "major", fixUpper: "major", includeZero: true}).
		addPlot("default", {type: "ClusteredBars", gap: 5}).
		addSeries("Series A", [0.53, 0.51]).
		addSeries("Series B", [0.84, 0.79]).
		addSeries("Series C", [0.68, 0.95]).
		addSeries("Series D", [0.77, 0.66]);
		chart.render();
		chart.resize(180, 140);

		dojo.subscribe("/dojo/resize/stop", function(inst) {
			// inst.targetDomNode is the node resized.
			// sometimes there will be a inst.targetWidget. inst is the
			// ResizeHandle instance.
			// var pp = portlet1;
			_currentInstance.addToConsole("portlet2.domNode.offsetWidth:"
					+ portlet1.domNode.offsetWidth
					+ " portlet2.domNode.offsetHeight:"
					+ portlet1.domNode.offsetHeight, false); // the new size
			_currentInstance.addToConsole("inst.targetDomNode.offsetWidth:"
					+ inst.targetDomNode.offsetWidth
					+ " inst.targetDomNode.offsetHeight:"
					+ inst.targetDomNode.offsetHeight, false);// the new size
//			_currentInstance.addToConsole("portlet2.size.w:" + portlet1._size.w
//					+ " portlet2.size.h:" + portlet1._size.h, false);// the original size
			_currentInstance.addToConsole("inst.startSize.w:"
					+ inst.startSize.w + " inst.startSize.h:"
					+ inst.startSize.h, false);// the original size
			var newHeight = inst.targetDomNode.offsetHeight;
			var newWidth = inst.targetDomNode.offsetWidth;
			// portlet2.resize({w:newWidth, h:newHeight});// not work
			chart.resize(newWidth * 0.9, newHeight * 0.9 - 10);
			_currentInstance.addToConsole("newWidth:" + newWidth
					+ " newHeight:" + newHeight, false);// the original size
		});
	}else{
//		this.ui.centerContainer.selectChild(contentPane);	//todo
	}
	this.ui.centerContainer.selectChild(contentPane);	//todo
};