dojo.require("dojox.widget.Portlet");
dojo.require("dojox.charting.Chart");
dojo.require("dojox.charting.plot2d.StackedAreas");
dojo.require("dojox.charting.themes.Wetland");
dojo.require("dojox.charting.axis2d.Default");
dojo.require("dojox.charting.plot2d.Columns");
dojo.require("dojo.fx.easing");
dojo.require("dojox.fx.scroll");
dojo.require("dijit.registry");
dojo.require("dojo.window");

HAFlow.Main.prototype.newReport = function(parentId) {
	var newReportId = HAFlow.generateUUID();
	this.newReportItem(newReportId, parentId, false);
	this.openReport(newReportId);
};

HAFlow.Main.prototype.newReportDirectory = function(parentId) {
	var newReportId = HAFlow.generateUUID();
	this.newReportItem(newReportId, parentId, true);
};

HAFlow.Main.prototype.newReportItem = function(newReportId, parentId, isdirectory){	
	this.reports[newReportId] = {};
	this.reports[newReportId].id = newReportId;
	this.reports[newReportId].name = "NewReport" + (isdirectory ? "Dir" : "");
	this.reports[newReportId].isdirectory = isdirectory;
	this.reports[newReportId].parentid = parentId;
	this.reports[newReportId].portlets = new Array();
	
	this.reportListStore.put({
		id : newReportId,
		name : this.reports[newReportId].name,
		isdirectory : isdirectory,
		parent : parentId
	});
	
	this.saveReport(newReportId);//save this.reports[newReportId]
};

//private
HAFlow.Main.prototype.openReport = function(reportId){
	var contentPane = dijit.byId("reportContainerPane_" + reportId);//mush be dijit.byId
	if( contentPane == null){
		var currentReport = this.reports[reportId];
		var reportContainer = new dijit.layout.ContentPane({
			id : "reportContainer_" + reportId,
			class : "reportcontainer",
			content : "<div style='visibility: hidden'>abc</div>"
		});
		contentPane = new dijit.layout.ContentPane({
			id : "reportContainerPane_" + reportId,
			title : currentReport.name,
			content : reportContainer,
			closable : true,
		});
		this.ui.centerContainer.addChild(contentPane);
		this.paintReport(reportId);
	}
	this.ui.centerContainer.selectChild(contentPane);		
};


HAFlow.Main.prototype.saveReport = function(reportId){
	var _currentInstance = this;
	$.ajax({
		url : _currentInstance.basePath + "report/" + reportId,
		type : "PUT",
		dataType : "json",
		contentType : "application/json",
		data : JSON.stringify(_currentInstance.reports[reportId]),
		success : function(data, status) {
			if( data.success ){
				_currentInstance.addToConsole("Report Saved!", false);
			}else{
				_currentInstance.addToConsole("Report Save Failed!", true);
				_currentInstance.addToConsole(data.message, true);
			}
		},
		error : function(request, status, error) {
			_currentInstance.addToConsole("An error occurred while saving flow: "
					+ error + " </br>status : " + status, true);
		}
	});
};

HAFlow.Main.prototype.deleteReport = function(reportId){
	var _currentInstance = this;
	if (reportId == null) {
		_currentInstance.addToConsole("No report selected, please double click a report!", true);
		return;
	}
	$.ajax({
		url : _currentInstance.basePath + "report/" + reportId,
		type : "DELETE",
		dataType : "json",
		contentType : "application/json",
		success : function(data, status) {
			if( data.success){
				_currentInstance.reportListStore.remove(reportId);
				for( var i = 0; i < data.deletedReportIds.length; i++ ){
					if(dijit.byId("reportContainerPane_" + data.deletedReportIds[i])!=null)
						_currentInstance.ui.centerContainer.removeChild(dijit
								.byId("reportContainerPane_" + data.deletedReportIds[i]));
				}
				_currentInstance.addToConsole( "Report removed.", false);
			}else{
				_currentInstance.addToConsole("Report failed to remove.", true);
			}
		},
		error : function(request, status, error) {
			_currentInstance.addToConsole("An error occurred while removing report: " + error, true);
		}
	});
};

HAFlow.Main.prototype.saveReportName = function(instance, reportId) {
	if (instance.reports[reportId]) {
		var value = $("#" + "report_" + reportId + "_name").val();
		if (this.checkReportName(instance, instance.reports[reportId].name, value)) {
			instance.reports[reportId].name = value;
			instance.saveReport(reportId);
			var pane = dijit.byId("reportContainerPane_" + reportId);
			if( pane != null){
			pane.title = value;
				instance.ui.centerContainer.removeChild(pane);
				instance.ui.centerContainer.addChild(pane);
				instance.ui.centerContainer.selectChild(pane);
			}
			instance.reportListStore.remove(reportId);
			instance.reportListStore.put({
				id : instance.reports[reportId].id,
				name : instance.reports[reportId].name,
				isdirectory : instance.reports[reportId].isdirectory,
				parent : instance.reports[reportId].parentid,
			});
		} else {
			_currentInstance.addToConsole("Error:</br>" + "Invalid report name", true);
		}
	} else {
		_currentInstance.addToConsole("Please load the flow before saving report metadata!", true);
	}
};

HAFlow.Main.prototype.checkReportName = function(instance, oldName, newName) {
	var i;
	if (oldName == newName) {
		return true;
	}
	var regex = /^[a-zA-Z_][a-zA-Z_0-9]{0,38}$/;
	if (!regex.test(newName)) {
		return false;
	}
	for (i = 0; i < instance.flows.length; i++) {
		if (newName == instance.reports[i].name) {
			return false;
		}
	}
	return true;
};

// public
HAFlow.Main.prototype.setupReportDroppable = function(reportId) {
	$(".reportmodule").draggable({
		appendTo : "#" + "reportContainer_" + reportId,
		revert : "invalid",
		helper : "clone"
	});
	var _currentInstance = this;
	$("#" + "reportContainer_" + reportId).droppable(
			{
				accept : ".reportmodule",
				drop : function(event, ui) {
					_currentInstance.onReportModuleAdded(_currentInstance,
							reportId, event, ui);
				}
			});
};

HAFlow.Main.prototype.paintReportList = function() {
	this.simpleReportListPaneId = this.reportListContainerId + "_" + "test";
	var reportListPane = new dijit.layout.ContentPane({
		id : this.simpleReportListPaneId,
		title : "Simple",
	});
	this.ui.secondTrailingContainer.addChild(reportListPane);
	text = "<div class=\"reportmodule\" id=\"reportmodule_" + "text"
			+ "\"><div>" + "text portlet" + "</div></div>";
	$("#" + this.simpleReportListPaneId).append(text);

	text = "<div class=\"reportmodule\" id=\"reportmodule_" + "curve"
			+ "\"><div>" + "curve portlet" + "</div></div>";
	$("#" + this.simpleReportListPaneId).append(text);

	this.ui.refresh();

};

HAFlow.Main.prototype.addReport = function(reportId, currentPortlet){
	var reportContainer = dijit.byId("reportContainer_" + reportId);
	var portlet = new dojox.widget.Portlet({
		title : currentPortlet.type
	});
	if (currentPortlet.type == "text") {
		portlet.set("content", currentPortlet.text_content);
		portlet.startup();
		reportContainer.addChild(portlet);//, currentPortlet.index
	} else if (currentPortlet.type == "curve") {
		var chartId = currentPortlet.id;
		var chartDivId = "chart_" + chartId;
		portlet.set("content", "<div id=\"" + chartDivId
				+ "\" style=\"height:180px; width:480px;\"></div>");
		portlet.startup();
		reportContainer.addChild(portlet);//, currentPortlet.index

		var c = new dojox.charting.Chart(chartDivId, {
			title : currentPortlet.title,// "Production(Quantity)",
			titlePos : "bottom",
			titleGap : 25,
			titleFont : "normal normal normal 15pt Arial",
			titleFontColor : "orange"
		});
		var chart_series = [ 1, 2, 0.5, 1.5, 1, 2.8, 0.4 ];
		c.addPlot("default", {
			type : dojox.charting.plot2d.StackedAreas,
			tension : 3
		}).addAxis("x", {
			fixLower : "major",
			fixUpper : "major"
		}).addAxis("y", {
			vertical : true,
			fixLower : "major",
			fixUpper : "major",
			min : 0
		}).setTheme(dojox.charting.themes.Wetland).addSeries("Series A",
				chart_series).render();

	} else {
		alert("unknown report");
	}
};
//private
HAFlow.Main.prototype.paintReport = function(reportId) {
	var currentReport = this.reports[reportId];
	var reportContainer = dijit.byId("reportContainer_" + reportId);
	var ps = currentReport.portlets;
	var len = ps.length;
	for ( var i = 0; i < ps.length; i++) {
		var currentPortlet = currentReport.portlets[i];
		this.addReport(reportId, currentPortlet);
	}
};

HAFlow.Main.prototype.onReportModuleAdded = function(currentInstance, reportId,
		event, ui) {
	var reportModuleId = ui.draggable[0].id.replace("reportmodule_", "");
	var newPortletId = HAFlow.generateUUID();
	if (reportModuleId == "text") {
		var currentPortlet = {
			id: newPortletId, 
			title: reportModuleId, 
			type: "text",
			position: 1,
			
			reportId: reportId, 
		};
		this.reports[reportId].portlets.push(currentPortlet);
		this.addReport(reportId, currentPortlet);
	} else if (reportModuleId == "curve") {
		var currentPortlet = {
				id: newPortletId, 
				title: reportModuleId, 
				type: "curve",
				position: 1,
				
				reportId: reportId, 
			};
		this.reports[reportId].portlets.push(currentPortlet);
		this.addReport(reportId, currentPortlet);
	} else {
		alert("unknown report");
	}
	
};