

function openEdit(obj){
	var row = obj.parentNode.parentNode;
	var userId = document.getElementById("userList").rows[row.rowIndex]
			.cells[0].innerHTML;
	
//	window.open("user/get/"+scriptId,"_blank","width=400,height=300,toolbar=no,scrollbars");
}
function openDel(obj){
	var row = obj.parentNode.parentNode;
	var scriptId = document.getElementById("userList").rows[row.rowIndex]
			.cells[0].innerHTML;
	window.open("user/remove/"+scriptId,"_blank","width=400,height=300,toolbar=no,scrollbars");
}