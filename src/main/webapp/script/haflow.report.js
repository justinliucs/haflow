dojo.require("dojox.widget.Portlet");
dojo.require("dojox.charting.Chart");
dojo.require("dojox.charting.plot2d.StackedAreas");
dojo.require("dojox.charting.themes.Wetland");
dojo.require("dojox/charting/themes/Claro");
dojo.require("dojox.charting.axis2d.Default");
dojo.require("dojox.charting.plot2d.Columns");
dojo.require("dojo.fx.easing");
dojo.require("dojox.fx.scroll");
dojo.require("dijit.registry");
dojo.require("dojo.window");
dojo.require("dojox.charting.plot2d.Pie");
dojo.require("dojox.charting.axis2d.Default");
dojo.require("dojox/charting/action2d/Tooltip");	 

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
		title : currentPortlet.type,
		id : "portlet_" + currentPortlet.id,
	});
	if (currentPortlet.type == "text") {
//		portlet.set("content", currentPortlet.text_content);
		portlet.startup();
		reportContainer.addChild(portlet);//, currentPortlet.index
	} else if (currentPortlet.type == "curve") {
		var chartId = currentPortlet.id;
		var chartDivId = "chart_" + chartId + "_div_id";
		portlet.set("content", "<div id=\"" + chartDivId
				+ "\" style=\"height:180px; width:480px;\"></div>");
		portlet.startup();
		reportContainer.addChild(portlet);//, currentPortlet.index

		var chart = new dojox.charting.Chart(chartDivId, {
//			id : "chart_" + chartId,
			title : currentPortlet.title,// "Production(Quantity)",
			titlePos : "bottom",
			titleGap : 25,
			titleFont : "normal normal normal 15pt Arial",
			titleFontColor : "orange"
		});
					 
		var chart_series = [ 1, 2, 0.5, 1.5, 1, 2.8, 0.4 ];
//		var chart_series2 = [ 2, 4, 1, 3, 2, 5.6, 0.8 ];
		chart.addPlot("default", {
			type : dojox.charting.plot2d.StackedAreas,//dojox.charting.plot2d.PiePlot,//StackedAreas,
//			tension : 3,
			markers: true,
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
		chart.render();
//		chart.title = "newTitle";
//		chart.fullRender();
//		chart.addSeries("Series B", chart_series2).render();
//		chart.render();
	} else {
		alert("unknown report");
	}
	
	dojo.connect(portlet, "onClick", function(event){
		var portletId = event.currentTarget.id;
		portletId = portletId.replace("portlet_", "");
		_currentInstance.onReportPortletClicked(portletId, chart);
	});
};

HAFlow.Main.prototype.onReportPortletClicked = function(portletId, chart) {
	var instance = this;
	var reportInfo = instance.reports[this.currentReportId];
	var text = "";
	text += "<table border=\"0\">";
	text += "<tr style=\"tr\"><th align=\"left\">Portlet Info</th>" + "<td>" + portletId + "</td></tr>";
	var portlets = reportInfo.portlets;
	var portlet;
	for( var i = 0; i < portlets.length; i++ ){
		if( portlets[i].id == portletId){
			portlet = portlets[i];
			break;
		}
	}
	var configurations = portlet.configurations;
	for( var i = 0; i < configurations.length; i++ ){
		var configuration = configurations[i];
		var configurationTextBoxSpanId = "portlet_configuration_" + configuration.id + "_text_box_pane";
		text += "<tr style=\"tr\"><th align=\"left\">" + configuration.key + "</th>" 
		+ "<td><span id=" + configurationTextBoxSpanId + ">" +  "</span></td></tr>";
	}
	text += "<tr style=\"tr\"><td align=\"left\">" +
			"<div id=\"save_portlet_configurations_button_pane\" class=\"configuration-content\"></div>" +
			"</td></tr>";	
	text += "</table>";
	$("#" + instance.informationContainerId).html(text);
	
	for( var i = 0; i < configurations.length; i++ ){
		var configuration = configurations[i];
		var configurationTextBoxId = "portlet_configuration_" + configuration.id + "_text_box";
		var configurationTextBoxSpanId = "portlet_configuration_" + configuration.id + "_text_box_pane";
		if (dijit.byId(configurationTextBoxId) != null) {
			dijit.registry.remove(configurationTextBoxId);
		}
		var configurationTextBox = new dijit.form.TextBox({
			id : configurationTextBoxId,
			value : configuration.value,
			style : "width:300px;"
		});
		configurationTextBox.placeAt(dojo.byId(configurationTextBoxSpanId));
		configurationTextBox.startup();
	}
	
	var button = new dijit.form.Button({
		label : "Save",
		onClick : function() {
			instance.savePortletConfiguration(portletId, chart);
		}
	});
	button.placeAt(dojo.byId("save_portlet_configurations_button_pane"));
	button.startup();
	
	var informationPane = dijit.byId(instance.informationContainerId);
	_currentInstance.ui.bottomContainer.selectChild(informationPane);
};

HAFlow.Main.prototype.savePortletConfiguration = function(portletId, chart){
	
	this.addToConsole("something", false);
	var reportInfo = this.reports[this.currentReportId];
	var portlets = reportInfo.portlets;
	var portlet;
	for( var i = 0; i < portlets.length; i++ ){
		if( portlets[i].id == portletId){
			portlet = portlets[i];
			break;
		}
	}
	
	var configurations = portlet.configurations;
	for( var i = 0; i < configurations.length; i++ ){
		var configuration = configurations[i];
		var configurationTextBoxId = "portlet_configuration_" + configuration.id + "_text_box";
		var newValue = dijit.byId(configurationTextBoxId).value;
		if( portlet.type == "text"){
			var portletWidget = dijit.byId("portlet_" + portletId);
			portletWidget.set(configuration.key, newValue);
		}else{
			//var chartDivId = "chart_" + portletId;
			var chartWidget = chart;//dijit.byId(chartDivId);
//			var chartWidget2 = dijit.byId(chartDivId);
			var plot = chart.getPlot("default");
			chartWidget.set(configuration.key, newValue);
			chart.render();	
		}
//		alert(newValue);
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
			configurations : [{id: HAFlow.generateUUID(), key:"content", value:"hello world!"}]
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
				configurations : [{id: HAFlow.generateUUID(), key: 'type', value : "Pie"}, 
				       {id: HAFlow.generateUUID(), key: 'markers', value: 'true'}]
			};
		this.reports[reportId].portlets.push(currentPortlet);
		this.addReport(reportId, currentPortlet);
	} else {
		alert("unknown report");
	}
	
};