var data = {};
var comp = {};
var flow = {};

function load() {

	// $.ajax({
	// url : "Component",
	// type : "GET",
	// success : function(returnData, status) {
	// comp = eval('(' + returnData + ')');
	// $.ajax({
	// url : "Flow",
	// type : "GET",
	// success : function(returnData, status) {
	// data = eval('(' + returnData + ')');
	// flow = new haflow({
	// flow : data,
	// components : comp,
	// flowPlace : "flow",
	// componentsPlace : "components",
	// consolePlace : "console"
	// });
	// flow.paint();
	// }
	// });
	//
	// }
	// });
	// provide the sample data instead of ajax
	data = {
		nodes : [ {
			id : "1",
			type : "1",
			name : "node 1",
			position : {
				x : 100,
				y : 100
			}
		}, {
			id : "2",
			type : "2",
			name : "node 2",
			position : {
				x : 500,
				y : 100
			}
		}, {
			id : "3",
			type : "3",
			name : "node 2",
			position : {
				x : 250,
				y : 400
			}
		} ],
		edges : [ {
			from : "1",
			to : "2"
		}, {
			from : "2",
			to : "3"
		}, {
			from : "3",
			to : "1"
		} ]
	};
	comp = {
		components : [ {
			id : "1",
			name : "Component 1"
		}, {
			id : "2",
			name : "Component 2"
		}, {
			id : "3",
			name : "Component 3"
		} ]
	};
	flow = new haflow({
		flow : data,
		components : comp,
		flowPlace : "flow",
		componentsPlace : "components",
		consolePlace : "console"
	});
	flow.paint();
}

function save() {
	// $.ajax({
	// url : "Flow",
	// type : "POST",
	// data : {
	// "data" : JSON.stringify(data)
	// },
	// success : function(returnData, status) {
	// alert(returnData);
	// }
	// });
	alert("not ready yet");
}