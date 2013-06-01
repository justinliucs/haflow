dojo.require("dijit.Dialog");

function HAFlow() {

};

HAFlow.generateUUID = function() {
	var a = function(a) {
		return 0 > a ? NaN : 30 >= a ? 0 | Math.random() * (1 << a)
				: 53 >= a ? (0 | 1073741824 * Math.random()) + 1073741824
						* (0 | Math.random() * (1 << a - 30)) : NaN;
	};
	var b = function(a, b) {
		for ( var c = a.toString(16), d = b - c.length, e = "0"; 0 < d; d >>>= 1, e += e)
			d & 1 && (c = e + c);
		return c;
	};

	return b(a(32), 8) + "-" + b(a(16), 4) + "-" + b(16384 | a(12), 4) + "-"
			+ b(32768 | a(14), 4) + "-" + b(a(48), 12);
};

HAFlow.showDialog = function(title, content) {
	var dialog = new dijit.Dialog({
		title : title,
		content : content,
		style : "width:400px"
	});
	dialog.show();
};