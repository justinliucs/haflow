dojo.require("dojox.grid.DataGrid");
dojo.require("dojo.data.ItemFileReadStore");
dojo.require("dijit.form.Button");
dojo.require("dijit.form.TextBox");
dojo.require("dijit.form.Form");
dojo.require("dijit.Dialog");
var confirmdialog;

showDialog=function(title, content){
	dialog = new dijit.Dialog({
		title:title,
		content:content,
		style : "width:400px",
	});
	dialog.show();
};

var confirmDialog=function(){};
confirmDialog.userid;

confirmDialog.init=function(){
	content="Are You Sure?"+  
    "<br/><div><span  id='yesButton'>Yes</span>" +  
    "<span id='noButton'>No</span></div>";  
	confirmdialog=new dijit.Dialog({
		title:"confirm",
		content:content,
		Style: "width:400px",
	});
	
	
	var confirmButton=new dijit.form.Button({
		label:"Yes",
		
	},"yesButton");
	
	
	var cancelButton=new dijit.form.Button({
		label:"No",
	},"noButton");
	confirmdialog.startup();
	dojo.connect(confirmButton,"onClick",delUser);
	dojo.connect(cancelButton,"onClick",function(mouseEvent) {  
        confirmdialog.hide();});
	//dialog.addChild(confirmButton);
	//dialog.addChild(cancelButton);
	
	
};


var newDialog=function(){};
newDialog.userid=1;
newDialog.user;
newDialog.init=function(){
	
	var text = "";
	text += "<div >";
	text += "<div ><span style=\"float: left; width: 80px;\"><strong>Name:</strong></span>";
	text += "<span id=\"user_name_text_box\" ></span></div>";
	text += "<div ><span style=\"float: left; width: 80px;\"><strong>Role:</strong></span>";
	text += "<span id=\"user_role_text_box\"></span></div>";
	text += "<div ><span style=\"float: left; width: 80px;\"><strong>Space:</strong></span>";
	text += "<span id=\"user_space_text_box\"></span></div>";
	text += "<div class=\"field\"><span style=\"float: left; width: 80px;\"><strong>UsedSpace:</strong></span>";
	text += "<span id=\"user_used_text_box\"></span></div>";
	
	text += "<div>";
	text += "<span id=\"save_user_button\" ></span></div>";
	text += "</div>";
	userForm=new dijit.form.Form({
		innerHTML:text
	});
	userForm.startup();
	userDialog = new dijit.Dialog({
	    title: "User Infomation",
	    style: "width: 400px"
	});
	userDialog.addChild(userForm);
	var userRoleTextBox = new dijit.form.TextBox({
		id : "userRoleTextBox",
		style : "width:200px;"
	},"user_role_text_box");
	
	var userSpaceTextBox = new dijit.form.TextBox({
		id : "userSpaceTextBox",
		style : "width:200px;"
	},"user_space_text_box");
	
	var userUsedTextBox =new dijit.form.TextBox({
		id:"userUsedTextBox",
		style:"width:200px;"
	},"user_used_text_box");
	
	
	
	var button = new dijit.form.Button({
		label : "Save",
		onClick : function() {
			user.role=userRoleTextBox.get("value");
			user.space=userSpaceTextBox.get("value");
			user.usedspace=userUsedTextBox.get("value");
			
			$.ajax({
				url : basePath + "user/update/"+userid,
				type : "Post",
				dataType : "json",
				contentType : "application/json",
				data:JSON.stringify(user),
				success :function(data,status){
					userDialog.hide();
					if(data.success==true){
					showDialog("Success", "Successfully update user information! ");
					loadUsers();
					}
					else{
						showDialog("Error", "An error occurred while updating user information: ");
					}
				},
				error : function(request, status, error) {
					userDialog.hide();
					showDialog("Error", "An error occurred while updating user information: "
							+ error);
				}
			});
		}
	});
	button.placeAt(dojo.byId("save_user_button"));
	button.startup();
	

};




function editRow(r){
	
		var row = r.parentNode.parentNode;
		userid = document.getElementById("userlist").rows[row.rowIndex].cells[0].innerHTML;
		
		$.ajax({
			url : basePath + "user/get/"+userid,
			type : "GET",
			cache : false,
			dataType : "json",
			success : function(data, status) {
				user = data;
				
				dojo.byId("user_name_text_box").innerHTML = data.name;
				dojo.byId("userRoleTextBox").value=data.role;
				dojo.byId("userSpaceTextBox").value=data.space;
				dojo.byId("userUsedTextBox").value=data.usedspace;
				newDialog.user=user;
				newDialog.userid=userid;
				userDialog.show();

			},
			error : function(request, status, error) {
				showDialog("Error",
						"An error occurred while refreshing user list: " + error);
			}
		});
	};

var users;
var loadUsers = function() {
	
	$.ajax({
		url : basePath + "user/get",
		type : "GET",
		cache : false,
		dataType : "json",
		success : function(data, status) {
					if (data.success == false) {
						dojo
								.create(
										"message",
										{
											innerHTML : "<p><font color=red>An Error while loading users!</font></p>"
										}, dojo.byId("table_pane"));
					} else {
						users = data;

						var table = "<table id=\"userlist\" border=\"1\">";
						table += "<tr><th>Id</th><th>Name</th><th>RealName</th><th>Role</th><th>Space</th><th>UsedSpace</th><th>Operation</th><th>Operation</th></tr>";
						dojo
								.forEach(
										data.users,
										function(user) {
											table += "<tr><td>";
											table += user.id;
											table += "</td><td>";
											table += user.name;
											table += "</td><td>";
											table += user.realname;
											table += "</td><td>";
											table += user.role;
											table += "</td><td>";
											table += user.space;
											table += "</td><td>";
											table += user.usedspace;
											table += "</td><td >";
											table += "<input type=\"button\" value=\"edit\" onclick=\"editRow(this)\">";
											table += "</td><td >";
											table += "<input type=\"button\" value=\"delete\" onclick=\"deleteRow(this)\">";

											table += "</td></tr>";

										});
						table += "</table>";
						dojo.empty(dojo.byId("table_pane"));
						dojo
								.create(
										"message",
										{
											innerHTML : "<p><font color=red>NOTE: 0=users;1=administrators(Role)</font></p>"
										}, dojo.byId("table_pane"));
						dojo.place(table, dojo.byId("table_pane"));
					}
		},
		error : function(request, status, error) {
			showDialog("Error",
					"An error occurred while refreshing user list: " + error);
		}
	});
	
};


dojo.addOnLoad(function() {
	
	dojo.byId("title").innerHTML="<h2>Haflow Background</h2>";
	
	loadUsers();
	newDialog.init();
	confirmDialog.init();
	
	
});

function deleteRow(obj) {
	var row = obj.parentNode.parentNode;
	confirmDialog.userid = document.getElementById("userlist").rows[row.rowIndex].cells[0].innerHTML;
	confirmdialog.show();
};

var delUser=function(){
	confirmdialog.hide();
	$.ajax({
		url : basePath + "user/remove/"+confirmDialog.userid,
		type : "DELETE",
		cache : false,
		dataType : "json",
		success : function(data, status) {
			
			if (data.success == true) {
				showDialog("Success", "Successfully delete the user! ");
				loadUsers();
			}
			else
				showDialog("Error",
						"An error occurred while delete the user " );

		},
		error : function(request, status, error) {
			showDialog("Error",
					"An error occurred while delete the user " + error);
		}
	});
	
};