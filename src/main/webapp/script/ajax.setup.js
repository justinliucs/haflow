dojo.require("dijit.Dialog");
dojo.require("dijit.form.Button");
function Entire(){
	
};
Entire.confirmDialog=function(){
	
};
Entire.confirmDialog.isConfirmed=false;
Entire.confirmDialog.show=function(){
	
	content="Please log in again!"+ 
    "<br/><div><span  id='yesButton'>Yes</span>" +  
    "<span id='noButton'>No</span></div>";  
	confirmdialog=new dijit.Dialog({
		id:"relogon",
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
	confirmdialog.connect(confirmdialog,"hide",function(e){
		dijit.byId("relogon").destroy();
	});
	dojo.connect(confirmButton,"onClick",Entire.confirmDialog.confirm);
	dojo.connect(cancelButton,"onClick",function(mouseEvent) {  
        confirmdialog.destroyRecursive();});
	
	
	confirmdialog.show();
	
};
Entire.confirmDialog.confirm=function(){
	location.href = basePath+'/';
};




$.ajaxSetup({  
    type: 'GET',  
    complete: function(xhr,status) {  
    	
        var sessionStatus = xhr.getResponseHeader('sessionstatus');  
        if(sessionStatus == 'timeout') {  
        	Entire.confirmDialog.show();
        	
        }  
    }  
});  
$.ajaxSetup({  
    type: 'POST',  
    complete: function(xhr,status) {  
    	
        var sessionStatus = xhr.getResponseHeader('sessionstatus');  
        if(sessionStatus == 'timeout') {  
        	Entire.confirmDialog.show();
        	
        }  
    }  
}); 
$.ajaxSetup({  
    type: 'DELETE',  
    complete: function(xhr,status) {  
    	
        var sessionStatus = xhr.getResponseHeader('sessionstatus');  
        if(sessionStatus == 'timeout') {  
        	Entire.confirmDialog.show();
        	
        }  
    }  
}); 
$.ajaxSetup({  
    type: 'UPDATE',  
    complete: function(xhr,status) {  
    	
        var sessionStatus = xhr.getResponseHeader('sessionstatus');  
        if(sessionStatus == 'timeout') {  
        	Entire.confirmDialog.show();
        	
        }  
    }  
}); 
$.ajaxSetup({  
    type: 'PUT',  
    complete: function(xhr,status) {  
    	
        var sessionStatus = xhr.getResponseHeader('sessionstatus');  
        if(sessionStatus == 'timeout') {  
        	Entire.confirmDialog.show();
        	
        }  
    }  
}); 

