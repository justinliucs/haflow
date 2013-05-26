var data = {};
var comp = {};
var flow = {};

function load() {
	$.ajax({
		url : "component",
		type : "GET",
		dataType : "json",
		success : function(returnData, status) {
			comp = eval(returnData);
			$.ajax({
				url : "flow/fe943bb5-2a0b-4ac3-9f22-bc89346625c9",
				type : "GET",
				dataType : "json",
				success : function(returnData, status) {
					data = eval(returnData);
					flow = new haflow({
						flow : data,
						components : comp,
						flowPlace : "flow",
						componentsPlace : "components",
						consolePlace : "console"
					});
					flow.paint();
				}
			});
		}
	});
}

function save() {
	$.ajax({
		url : "flow/fe943bb5-2a0b-4ac3-9f22-bc89346625c9",
		type : "PUT",
		dataType : "json",
		contentType : "application/json",
		data : JSON.stringify(data),
		success : function(returnData, status) {
			alert(returnData.success);
		}
	});
}