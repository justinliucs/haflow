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
dojo.require("dojo.dnd.Mover");

HAFlow.Main.prototype.newReport = function(parentId) {
	var _currentInstance = this;
	var columnSelectDialog = new dijit.Dialog(
			{
				id : "chooseZonesNumberDialog",
				title : "Choose Number of Zones",
				content : "<html><body>"
						+ "<form id=\"chooseZonesNumberForm\">"
						+ "Zone Numbers:<input type=\"text\" id=\"chooseZonesNumberInput\"> </input>"
						+ "<button type=\"button\" id=\"chooseZonesNumberButton\">submit</button></form></body></html>"
			});
	columnSelectDialog.show();
	dojo.connect(dojo.byId("chooseZonesNumberButton"), "onclick", function() {
		var nbZones = document.getElementById("chooseZonesNumberInput").value;
		var newReportId = HAFlow.generateUUID();
		_currentInstance.newReportItem(newReportId, parentId, false,
				parseInt(nbZones), "grid");
		_currentInstance.openReport(newReportId);

		columnSelectDialog.destroy();
	});
};

HAFlow.Main.prototype.newFloatReport = function(parentId) {
	var _currentInstance = this;

	var newReportId = HAFlow.generateUUID();
	_currentInstance.newReportItem(newReportId, parentId, false, -1, "float");
	_currentInstance.openReport(newReportId);

};

HAFlow.Main.prototype.newReportDirectory = function(parentId) {
	var newReportId = HAFlow.generateUUID();
	this.newReportItem(newReportId, parentId, true);
};

HAFlow.Main.prototype.newReportItem = function(newReportId, parentId, isdirectory, nbZones, type){	
	this.reports[newReportId] = {};
	this.reports[newReportId].id = newReportId;
	this.reports[newReportId].name = "NewReport" + (isdirectory ? "Dir" : "");
	this.reports[newReportId].isdirectory = isdirectory;
	this.reports[newReportId].parentid = parentId;
	this.reports[newReportId].portlets = new Array();
	this.reports[newReportId].nbZones = nbZones;
	
	this.reports[newReportId].panelType = type;//float or grid //TODO
	
	this.reportListStore.put({
		id : newReportId,
		name : this.reports[newReportId].name,
		isdirectory : isdirectory,
		parent : parentId
	});
	
	this.saveReport(newReportId);//save this.reports[newReportId]
};

HAFlow.Main.prototype.addGridPanel = function(reportId, reportContainerDivId, currentReport) {
	var gridContainer = new dojox.layout.GridContainer({
		id : "reportContainer_" + reportId,
		class : "reportcontainer",
        nbZones: currentReport.nbZones,
        opacity: .5,
        hasResizableColumns: false,
        allowAutoScroll: false,//important
        withHandles: true,
        dragHandleClass: 'dijitTitlePaneTitle',
//        style: {width:'100%'},
        acceptTypes: ['Portlet'],
        isOffset: true
    }, reportContainerDivId);

	var dummyPortletId = "dummy_portlet_id_" + reportId;
    var dummyPortlet = [
        dojo.create('div', {innerHTML: "<div style='color:gray; margin-top:50px; margin-bottom:50px; " 
        	+ "margin-left:auto; margin-right:auto;'>Drag reports into the grids!</div>"})
    ];

    var portlet1 = dojox.widget.Portlet({
    	id: dummyPortletId,
        closable: false,
        dndType: 'Portlet',
        title: 'Sample portlet',
        content: dummyPortlet,
        style: 'height:300px;'
    });

    gridContainer.addChild(portlet1);
    gridContainer.startup();
    gridContainer.resize();//important!!
};

HAFlow.Main.prototype.addFloatPanel = function(reportId, reportContainerDivId) {
//	var reportContainer = dijit.byId("reportContainer_" + reportId);
//	dojo.create("div", {innerHTML: "<div id='chartchart' style='width:90%; height:60%;'></div>"});
	var innerContentPane = new dijit.layout.ContentPane({
		id : "reportContainer_" + reportId,
		class : "reportcontainer",
		style : ' width:98%; height:98%; ',//background-color: blue;
	}, reportContainerDivId);

};

// private
HAFlow.Main.prototype.openReport = function(reportId){
	var contentPane = dijit.byId("reportContainerPane_" + reportId);//mush be dijit.byId
	if( contentPane == null){
		var currentReport = this.reports[reportId];
		
		var reportContainerDivId = "reportContainer_div_"+ reportId;
		contentPane = new dijit.layout.ContentPane({//stable
			id : "reportContainerPane_" + reportId,
			title : currentReport.name,
			content : "<div class='reportcontainerdiv'>" + //width: 900px;height: 978px;
						"<div id='"+ reportContainerDivId + "'></div>" +
								"</div>",
			closable : true,
		});
		contentPane.startup();
		this.ui.centerContainer.addChild(contentPane);
		this.ui.centerContainer.selectChild(contentPane);
		
		var panelType = this.reports[reportId].panelType;
		if( panelType == "grid"){
			this.addGridPanel(reportId, reportContainerDivId, currentReport);
		}else if( panelType == "float" ){
			this.addFloatPanel(reportId, reportContainerDivId);
		}
		this.paintReports(reportId);
		//this.ui.centerContainer.selectChild(contentPane);	//todo
	}else{
		this.ui.centerContainer.selectChild(contentPane);	//todo
		if( this.reports[reportId].panelType == "float"){
			this.paintReports(reportId);
		}
	}
	//dijit.byId("reportContainer_" + reportId).resize();//important!!
	
	this.setupReportDroppable(reportId);
};


HAFlow.Main.prototype.saveReport = function(reportId){
	this.updatePosition(reportId);
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
				_currentInstance.addToConsole("Report Save Failed!" + data.message, true);
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
		title : myfile.charts,
	});
	this.ui.secondTrailingContainer.addChild(reportListPane);
	text = "<div class=\"reportmodule\" id=\"reportmodule_" + "text"
			+ "\"><div>" + "text portlet" + "</div></div>"; // data-dojo-type='dojo/dnd/Moveable' 
	$("#" + this.simpleReportListPaneId).append(text);

	text = "<div class=\"reportmodule\" id=\"reportmodule_" + "lines"
			+ "\"><div>" + "lines portlet" + "</div></div>";// data-dojo-type='dojo.dnd.Source' type='reportmodule4'
	$("#" + this.simpleReportListPaneId).append(text);
	
	text = "<div class=\"reportmodule\" id=\"reportmodule_" + "stacked"
			+ "\"><div>" + "stacked portlet" + "</div></div>";
	$("#" + this.simpleReportListPaneId).append(text);
	
	text = "<div class=\"reportmodule\" id=\"reportmodule_" + "bars"
	+ "\"><div>" + "bars portlet" + "</div></div>";
	$("#" + this.simpleReportListPaneId).append(text);
	
	text = "<div class=\"reportmodule\" id=\"reportmodule_" + "columns"
	+ "\"><div>" + "columns portlet" + "</div></div>";
	$("#" + this.simpleReportListPaneId).append(text);
	
	text = "<div class=\"reportmodule\" id=\"reportmodule_" + "pie"
	+ "\"><div>" + "pie portlet" + "</div></div>";
	$("#" + this.simpleReportListPaneId).append(text);

	this.ui.refresh();
};

HAFlow.Main.prototype.onReportPortletClicked = function(portletId, chart, portlet) {
	var instance = this;
	var reportInfo = instance.reports[this.currentReportId];
	var text = "";
	text += "<table border=\"0\">";
	text += "<tr style=\"tr\"><th align=\"left\">Portlet Info</th>" + "<td>" + portletId + "</td></tr>";
	
	//find current protlet
	var portlets = reportInfo.portlets;
	var portlet;
	for( var i = 0; i < portlets.length; i++ ){
		if( portlets[i].id == portletId){
			portlet = portlets[i];
			break;
		}
	}
	
	//portlet configuration -- title
	var titleTextBoxId = "portlet_title_text_box_" + portletId;
	var titleTextBoxSpanId = "portlet_title_text_box_pane_" + portletId;
	text += "<tr style=\"tr\"><th align=\"left\">" + "title" + "</th>" 
	+ "<td><span id=" + titleTextBoxSpanId + ">" +  "</span></td></tr>";
	
	//portlet configuration -- chart title
	var chartTitleTextBoxId = "portlet_chart_title_text_box_" + portletId;
	var chartTitleTextBoxSpanId = "portlet_chart_title_text_box_pane_" + portletId;
	text += "<tr style=\"tr\"><th align=\"left\">" + "chart title" + "</th>" 
	+ "<td><span id=" + chartTitleTextBoxSpanId + ">" +  "</span></td></tr>";
	
	//chart configurations
	var configurations = portlet.configurations;
	for( var i = 0; i < configurations.length; i++ ){
		var configuration = configurations[i];
		var configurationTextBoxSpanId = "portlet_configuration_" + configuration.id + "_text_box_pane";
		text += "<tr style=\"tr\"><th align=\"left\">" + configuration.key + "</th>" 
		+ "<td><span id=" + configurationTextBoxSpanId + ">" +  "</span></td></tr>";
	}
	
	//series configurations
	var series = portlet.chartSeries;
	for ( var i = 0; i < series.length; i++) {
		var serie = series[i];
		text += "<tr style=\"tr\"><th align=\"left\">" + "series.name"
				+ "</th>" + "<td>" + serie.name + "</td></tr>";
		var serieFilePathTextBoxSpanId = serie.name + "_file_path_text_pane";
		text += "<tr style=\"tr\"><th align=\"left\">" + "file path" + "</th>"
				+ "<td><span id=" + serieFilePathTextBoxSpanId + ">"
				+ "</span></td></tr>";
		var serieColumnIndexTextBoxSpanId = serie.name
				+ "_column_index_text_pane";
		text += "<tr style=\"tr\"><th align=\"left\">" + "column index"
				+ "</th>" + "<td><span id=" + serieColumnIndexTextBoxSpanId
				+ ">" + "</span></td></tr>";
	}
	
	//save button
	text += "<tr style=\"tr\"><td align=\"left\">" +
			"<div id=\"save_portlet_configurations_button_pane\" class=\"configuration-content\"></div>" +
			"</td></tr>";	
	//delete button
	text += "<tr style=\"tr\"><td align=\"left\">" +
			"<div id=\"delete_portlet_configurations_button_pane\" class=\"configuration-content\"></div>" +
			"</td></tr>";
	text += "</table>";
	$("#" + instance.informationContainerId).html(text);
	
	//title
	if( dijit.byId(titleTextBoxId) != null ){
		dijit.registry.remove(titleTextBoxId);
	}
	var titleTextBox = new dijit.form.TextBox({
		id : titleTextBoxId,
		value : portlet.title,
		style : "width:300px;"
	});
	titleTextBox.placeAt(dojo.byId(titleTextBoxSpanId));
	titleTextBox.startup();
	
	//chart title
	if( dijit.byId(chartTitleTextBoxId) != null ){
		dijit.registry.remove(chartTitleTextBoxId);
	}
	var chartTitleTextBox = new dijit.form.TextBox({
		id : chartTitleTextBoxId,
		value : portlet.chartTitle,
		style : "width:300px;"
	});
	chartTitleTextBox.placeAt(dojo.byId(chartTitleTextBoxSpanId));
	chartTitleTextBox.startup();
	
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
	
	for( var i = 0; i < series.length; i++ ){
		var serie = series[i];
		var serieFilePathTextBoxId = serie.name + "_file_path_text";	
		var serieFilePathTextBoxSpanId = serie.name + "_file_path_text_pane";
		
		if (dijit.byId(serieFilePathTextBoxId) != null) {
			dijit.registry.remove(serieFilePathTextBoxId);
		}
		var filePathTextBox = new dijit.form.TextBox({
			id : serieFilePathTextBoxId,
			value : serie.file_path,
			style : "width:300px;"
		});
		filePathTextBox.placeAt(dojo.byId(serieFilePathTextBoxSpanId));
		filePathTextBox.startup();
		
		var serieColumnIndexTextBoxId = serie.name + "_column_index_text";
		var serieColumnIndexTextBoxSpanId = serie.name + "_column_index_text_pane";
		if (dijit.byId(serieColumnIndexTextBoxId) != null) {
			dijit.registry.remove(serieColumnIndexTextBoxId);
		}
		var columnIndexTextBox = new dijit.form.TextBox({
			id : serieColumnIndexTextBoxId,
			value : serie.column_index,
			style : "width:300px;"
		});
		columnIndexTextBox.placeAt(dojo.byId(serieColumnIndexTextBoxSpanId));
		columnIndexTextBox.startup();
	}
	
	var saveButton = new dijit.form.Button({
		label : "Save",
		onClick : function() {
			instance.savePortletConfiguration(portletId, chart);
		}
	});
	saveButton.placeAt(dojo.byId("save_portlet_configurations_button_pane"));
	saveButton.startup();
	
	var deleteButton = new dijit.form.Button({
		label: "Delete",
		onClick: function(){
			instance.deletePortlet(portletId);
		}
	});
	deleteButton.placeAt(dojo.byId("delete_portlet_configurations_button_pane"));
	deleteButton.startup();
	
	var informationPane = dijit.byId(instance.informationContainerId);
	_currentInstance.ui.bottomContainer.selectChild(informationPane);
};

HAFlow.Main.prototype.deletePortlet = function(portletId){//TODO
	var _currentInstance = this;
	var reportInfo = this.reports[this.currentReportId];
	var portlets = reportInfo.portlets;
	var i;
	for( i = 0; i < portlets.length; i++ ){
		if( portlets[i].id == portletId){
			break;
		}
	}
	portlets.splice(i, 1);
	var reportContainer = dijit.byId("reportContainer_" + this.currentReportId);
	if( dijit.byId("portlet_" + portletId) != null){
		reportContainer.removeChild(dijit.byId("portlet_" + portletId));
		dijit.registry.remove("portlet_" + portletId);
	}
	this.saveReport(this.currentReportId);
};

HAFlow.Main.prototype.savePortletConfiguration = function(portletId, chart){
	var _currentInstance = this;
	var reportInfo = this.reports[this.currentReportId];
	var portlets = reportInfo.portlets;
	var portlet;
	for( var i = 0; i < portlets.length; i++ ){
		if( portlets[i].id == portletId){
			portlet = portlets[i];
			break;
		}
	}
	
	//save portlet title
	var titleTextBoxId = "portlet_title_text_box_" + portletId;
	var newTitle = dijit.byId(titleTextBoxId).value;
	portlet.title = newTitle;
	
	//save chart title
	var chartTitleTextBoxId = "portlet_chart_title_text_box_" + portletId;
	var newChartTitle = dijit.byId(chartTitleTextBoxId).value;
	portlet.chartTitle = newChartTitle;
	
	//save chart configurations
	var configurations = portlet.configurations;
	for( var i = 0; i < configurations.length; i++ ){
		var configuration = configurations[i];
		var configurationTextBoxId = "portlet_configuration_" + configuration.id + "_text_box";
		var newValue = dijit.byId(configurationTextBoxId).value;
		configuration.value = newValue;
	}
	
	//save series configurations
	var series = portlet.chartSeries;
	for( var i = 0; i < series.length; i++ ){
		var serie = series[i];
		var serieFilePathTextBoxId = serie.name + "_file_path_text";	
		var newFilePath = dijit.byId(serieFilePathTextBoxId).value;
		serie.file_path = newFilePath;
		
		var serieColumnIndexTextBoxId = serie.name + "_column_index_text";
		var newColumnIndex = dijit.byId(serieColumnIndexTextBoxId).value;
		serie.column_index = newColumnIndex;
	}
	
	this.paintReports(this.currentReportId);
};

// private
HAFlow.Main.prototype.paintReports = function(reportId) {
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
	var portletConfigurations;
	var chartSeries;
	if (reportModuleId == "text") {
		portletConfigurations = [ {
			id : HAFlow.generateUUID(),
			key : "content",
			value : "hello world!",
			value_type : "string"
		} ];
		chartSeries = [];
	} else if (reportModuleId == "lines" || reportModuleId == "stacked") {
		portletConfigurations = [ {
			id : HAFlow.generateUUID(),
			key : 'type',
			value : (reportModuleId == "lines") ? "Lines" : "Markers",
			value_type : "string"
		}, {
			id : HAFlow.generateUUID(),
			key : 'lines',
			value : false,
			value_type : "boolean"
		}, {
			id : HAFlow.generateUUID(),
			key : 'areas',
			value : false,
			value_type : "boolean"
		}, {
			id : HAFlow.generateUUID(),
			key : 'markers',
			value : true,
			value_type : "boolean"
		}, {
			id : HAFlow.generateUUID(),
			key : 'hAxis',
			value : "hx",
			value_type : "string"
		}, {
			id : HAFlow.generateUUID(),
			key : 'vAxis',
			value : "hy",
			value_type : "string"
		}];
		chartSeries = [ {
			id : HAFlow.generateUUID(),
			name : "Sa",
			file_path : 'hdfs://133.133.2.150:9000/user/root/new/source/donut.csv',
			column_index : '0'
		}, {
			id : HAFlow.generateUUID(),
			name : "Sb",
			file_path : 'hdfs://133.133.2.150:9000/user/root/new/source/donut.csv',
			column_index : '1'
		}];
	} else if (reportModuleId == "bars" || reportModuleId == "columns"){
		portletConfigurations = [ {
			id : HAFlow.generateUUID(),
			key : 'type',
			value : (reportModuleId == "bars") ? "Bars" : "Columns",
			value_type : "string"
		}, {
			id : HAFlow.generateUUID(),
			key : 'gap',
			value : 5,
			value_type : "int"
		} , {
			id : HAFlow.generateUUID(),
			key : 'minBarSize',
			value : 5,
			value_type : "int"
		}, {
			id : HAFlow.generateUUID(),
			key : 'maxBarSize',
			value : 5,
			value_type : "int"
		}, {
			id : HAFlow.generateUUID(),
			key : 'hAxis',
			value : "hx",
			value_type : "string"
		}, {
			id : HAFlow.generateUUID(),
			key : 'vAxis',
			value : "hy",
			value_type : "string"
		}];
		chartSeries = [ {
			id : HAFlow.generateUUID(),
			name : "Sa",
			file_path : 'hdfs://133.133.2.150:9000/user/root/new/source/donut.csv',
			column_index : '0'
		}];
	} else if (reportModuleId == "pie"){
		portletConfigurations = [ {
			id : HAFlow.generateUUID(),
			key : 'type',
			value : "Pie",
			value_type : "string"
		}, {
			id : HAFlow.generateUUID(),
			key : 'labels',
			value : true,
			value_type : "boolean"
		} , {
			id : HAFlow.generateUUID(),
			key : 'ticks',
			value : false,
			value_type : "boolean"
		} , {
			id : HAFlow.generateUUID(),
			key : 'fixed',
			value : true,
			value_type : "boolean"
		} , {
			id : HAFlow.generateUUID(),
			key : 'precision',
			value : 1,
			value_type : "int"
		} , {
			id : HAFlow.generateUUID(),
			key : 'labelOffset',
			value : 20,
			value_type : "int"
		} , {
			id : HAFlow.generateUUID(),
			key : 'labelStyle',
			value : 'default', //// default/columns/rows/auto
			value_type : "select"
		}, {
			id : HAFlow.generateUUID(),
			key : 'htmlLabels',
			value : true,
			value_type : "boolean"
		}, {
			id : HAFlow.generateUUID(),
			key : 'hAxis',
			value : "hx",
			value_type : "string"
		}, {
			id : HAFlow.generateUUID(),
			key : 'vAxis',
			value : "hy",
			value_type : "string"
		}];
		chartSeries = [ {
			id : HAFlow.generateUUID(),
			name : "Sa",
			file_path : 'hdfs://133.133.2.150:9000/user/root/new/source/donut.csv',
			column_index : '0'
		}];
	}else {
		alert("unknown report");
	}
	var column = 0;
	var eachColumnWidth = 880/this.reports[reportId].nbZones;
	for( var i = 0; i < this.reports[reportId].nbZones; i++ ){
		var left = ui.position.left;
		if( left >= eachColumnWidth * i && left < eachColumnWidth * (i+1)){
			column = i;
			break;
		}
	}
	var floatLeft =  ui.position.left;
	if( floatLeft < 0){
		floatLeft = 0;
	}else if( floatLeft > 900){
		floatLeft = 800;
	}
	var floatTop = ui.position.top;
	if( floatTop < 0){
		floatTop = 0;
	}else if( floatTop > 978 ){
		floatTop = 878;
	}
	
	var currentPortlet = {
			id: newPortletId, 
			title: "untitled " + reportModuleId, 
			type: reportModuleId,
			reportId: reportId,
			configurations : portletConfigurations,
			chartSeries : chartSeries,
			
			//for float pane
			height: 200,//TODO
			width: 200,//TODO
			left: floatLeft,
			top: floatTop,
			
			//for grid pane
			column: column,
			zone: -1,
			
			chartTitle : reportModuleId + " graph",
		};
	this.reports[reportId].portlets.push(currentPortlet);
	this.addReport(reportId, currentPortlet);
	
};

HAFlow.Main.prototype.addReport = function(reportId, currentPortlet){
	this.updatePosition(reportId);
	
	var reportContainer = dijit.byId("reportContainer_" + reportId);
	var dummyPortletId = "dummy_portlet_id_" + reportId;
	if( dijit.byId(dummyPortletId)){
		reportContainer.removeChild(dijit.byId(dummyPortletId));
	}
	if( dijit.byId("portlet_" + currentPortlet.id) != null){
		reportContainer.removeChild(dijit.byId("portlet_" + currentPortlet.id));
		dijit.registry.remove("portlet_" + currentPortlet.id);
	}
	var portlet = new dojox.widget.Portlet({
		title : currentPortlet.title,//TODO
		id : "portlet_" + currentPortlet.id,
		closable: false,
        dndType: 'Portlet',
        style: (this.reports[reportId].panelType == "grid" ? '' : "width:" + currentPortlet.width + "px;"
        		+ " position:absolute; left:" + currentPortlet.left + "px; top:" + currentPortlet.top + "px;") ,//TODO
	});
	
	if (currentPortlet.type == "text") {
		for( var i = 0; i < currentPortlet.configurations.length; i++ ){
			var textConfiguration = currentPortlet.configurations[i];
			portlet.set(textConfiguration.key, textConfiguration.value);
		}
		
		portlet.startup();
		this.addPortletToReportContainer(reportId, portlet, currentPortlet, reportContainer);
	} else {
		var chartId = currentPortlet.id;
		var chartDivId = "chart_" + chartId + "_div_id";
		var legendDivId = "legend_" + chartId + "_div_id";
		
		var chartDivSize = {
			width: 200,
			height: 200,
		};
		this.calculateChartDivSize(reportId, currentPortlet, chartDivSize);
		
		
		portlet.set("content", "<div id=\"" + chartDivId
				+ "\" style=\"height:" + (chartDivSize.height * 0.9-40) + "px; width:"+ chartDivSize.width*0.9 +"px;\"></div>" 
				+ "<div id=\"" + legendDivId
				+ "\" style=\"height:18px; width:"+ chartDivSize.width*0.9+"px;\"></div>");
		portlet.startup();
		
		this.addPortletToReportContainer(reportId, portlet, currentPortlet, reportContainer);//diff

		var chart = new dojox.charting.Chart(chartDivId);
//		this.addResizeHandler(chart);
		this.initChart(chart, currentPortlet, legendDivId);//TODO
	}
	
	this.updatePosition(reportId);

	dojo.connect(portlet, "onClick", function(event){
		var portletId = event.currentTarget.id;
		portletId = portletId.replace("portlet_", "");
		_currentInstance.onReportPortletClicked(portletId, chart, portlet);
	});
	
//	dojo.on(portlet._resizeHandle, "resize", function(e) {
//		_currentInstance.addToConsole("resize of portlet", false);
//	});
//	
};

HAFlow.Main.prototype.addPortletToReportContainer = function(reportId, portlet, currentPortlet, reportContainer){
	var _currentInstance = this;
	//TODO
	// different panel type.
	//column zone vs left top
	var panelType = this.reports[reportId].panelType;
	if( panelType == "grid"){
		if( currentPortlet.zone >= 0 ){
			reportContainer.addChild(portlet, currentPortlet.column, currentPortlet.zone);//
		}else{
			reportContainer.addChild(portlet, currentPortlet.column);//
		}
	}else if( panelType == "float"){
		reportContainer.addChild(portlet);
		
		var portletId = "portlet_" + currentPortlet.id;
		
		var dnd = new dojo.dnd.Moveable(dojo.byId(portletId));//dnd
		dojo.connect( dnd, "onMoveStop", function(mover){
			var currentPortlet = dojo.byId(portletId);
			var newLeft = currentPortlet.offsetLeft;
			var newTop = currentPortlet.offsetTop;
			_currentInstance.updatePortletPositionOnFloatPane(reportId, portletId, newLeft, newTop);
		});
		
		var handle = new dojox.layout.ResizeHandle({
			targetId : portletId,
//			resizeAxis : "x",
		}).placeAt(portletId);
		handle.startup();
		
		dojo.connect(handle, "onResize", function(e, t) {
			var h = handle;
			var newHeight = h.targetDomNode.offsetHeight;
			var newWidth = h.targetDomNode.offsetWidth;
			_currentInstance.addToConsole("123456~~" + h.targetId, false);
			var chartId = h.targetId.replace("portlet_", "");
			var chart = _currentInstance.chartMap[chartId];
			
			currentPortlet.width = newWidth;
			currentPortlet.height = newHeight;
			
			if( chart != null){
				chart.resize(newWidth * 0.9, newHeight * 0.9 - 40);
			}
			_currentInstance.addToConsole("newWidth:" + newWidth
					+ " newHeight:" + newHeight, false);// the original size
		});
	}
};

//diff 
HAFlow.Main.prototype.calculateChartDivSize = function(reportId, currentPortlet, chartDivSize){
	var panelType = this.reports[reportId].panelType;
	var chartDivWidth = 200;
	var chartDivHeight = 200;
	if( panelType == "float"){
		if( currentPortlet.width > 0){
			chartDivWidth = currentPortlet.width;
		}		
		if( currentPortlet.height > 0){
			chartDivHeight = currentPortlet.height;
		}
	}else if( panelType == "grid"){
		chartDivWidth = 880/this.reports[reportId].nbZones - 40;
	}
	
	chartDivSize.width = chartDivWidth;
	chartDivSize.height = chartDivHeight;
};

//common
HAFlow.Main.prototype.initChart = function(chart, currentPortlet, legendDivId){
	this.chartMap[currentPortlet.id] = chart;
	//var configurations
	chart["title"] = currentPortlet.chartTitle;
	chart.titlePos = "bottom";
	chart.titleGap = 25;
	chart.titleFont = "normal normal normal 15pt Arial";
	chart.titleFontColor = "black";

	// stable configurations
	chart.addAxis("hx", {
		fixLower : "major",
		fixUpper : "major",
//		title : 'hx'
	}).addAxis("hy", {
		vertical : true,
		fixLower : "major",
		fixUpper : "major",
		min : 0,
//		title : 'hy'
	});
	chart.setTheme(dojox.charting.themes.Julie);

	var obj = {};
	for( var i = 0; i < currentPortlet.configurations.length; i++ ){
		var configuration = currentPortlet.configurations[i];
		var realValue = configuration.value;
		if( configuration.value_type == "boolean"){
			if( realValue == "true" || realValue == "on" || realValue == "1" || realValue == true)
				realValue = true;
			else 
				realValue = false;
		}else if(configuration.value_type == "int"){
			realValue = parseInt(realValue);
		}
		obj[configuration.key] = realValue;
	}
	
	//this does not work because title is the property of chart not the plot 
	//obj["title"] = "ttttttttttttttt";
	
	chart.addPlot("default", obj);//TODO
	var legend;

	$.ajax({
		url : _currentInstance.basePath + "report/" + "getchartseries",
		type : "POST",
		dataType : "json",
		data : JSON.stringify(currentPortlet.chartSeries),
		contentType : "application/json",
		success : function(model, status) {
			var ccmList = model.series;
			for ( var i = 0; i < ccmList.length; i++) {
				var ccm = ccmList[i];
//				_currentInstance.addToConsole(ccm.columnname + ": " + ccm.data, false);
				var series_data = new Array();
				for( var j = 0; j < ccm.data.length; j++ ){
					series_data.push({y:ccm.data[j], text: 'a', tooltip: 'b'});
//					series_data.push({x:Math.floor((Math.random()*10)+1), y:ccm.data[j], text: 'a', tooltip: 'b'});
				}
				chart.addSeries(ccm.columnname, series_data);
			}
			chart.render();
			if( dijit.byId(legendDivId) != null){
				dijit.registry.remove(legendDivId);
			}

			legend = new dojox.charting.widget.Legend({chart: chart}, legendDivId);
			legend.refresh();
		},
		error : function(error) {
			_currentInstance.addToConsole(
					"An error occurred while loading csv column data: "
							+ error, true);
		},
	});
	chart.render();
};

HAFlow.Main.prototype.updatePortletPositionOnFloatPane = function(reportId, portletId, newLeft, newTop){
	portletId = portletId.replace("portlet_", "");
	var portlets = this.reports[reportId].portlets;
	for( var y = 0; y < portlets.length; y++ ){
		var tmp_portlet = portlets[y];
		if( tmp_portlet.id == portletId){
			tmp_portlet.left = newLeft;
			tmp_portlet.top = newTop;
			this.addToConsole("new portlet position - left:" + newLeft + " top:" + newTop + ";");
			break;
		}
	}
};

HAFlow.Main.prototype.updatePosition = function(reportId){
	var reportContainer = dijit.byId("reportContainer_" + reportId);
	if( reportContainer == null) return;
	var children = reportContainer.getChildren();
	var currentZone = -1;
	var currentColumn = 0;
	//update column
	for( var x = 0; x < children.length; x++ ){
		var child = children[x];
		var childId = child.id;
		childId = childId.replace("portlet_", "");
		
		if( child.column != currentColumn){
			currentColumn = child.column;
			currentZone = 0;
		}else{
			currentZone++;
		}
		
		var portlets = this.reports[reportId].portlets;
		for( var y = 0; y < portlets.length; y++ ){
			var tmp_portlet = portlets[y];
			if( tmp_portlet.id == childId){
				tmp_portlet.column = child.column;
				tmp_portlet.zone = currentZone;
				break;
			}
		}
	}
};