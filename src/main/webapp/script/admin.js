dojo.require("dijit.form.Button");
dojo.require("dijit.form.TextBox");
dojo.require("dijit.form.Form");
dojo.require("dijit.Dialog");
dojo.require("dijit.TitlePane");
showDialog = function(title, content) {
        var dialog = new dijit.Dialog({
                title : title,
                content : content,
                style : "width:400px"
        });
        dialog.show();
};


var haflowAdmin;
function HaflowAdmin(){}
HaflowAdmin.prototype.init=function(){
        this.initForm();
        this.initDialog();
        
};

HaflowAdmin.prototype.initForm=function(){
        
        this.configurationForm=new dijit.form.Form({
                id:"configurationForm",
                
        });
        this.inputsForm=new dijit.form.Form({
                id:"inputsForm",
        });
        this.outputsForm=new dijit.form.Form({
                id:"outputsForm",
        });
};
HaflowAdmin.prototype.initDialog=function(){
        this.dialog=new dijit.Dialog({
                title:"Module Information",
                style:"width: 800px",
                
        });
        
        var moduleConfigTitlePane=new dijit.TitlePane({
                title:"Module Configuration",
                content:this.configurationForm,
        });
        
        var moduleInputTitlePane=new dijit.TitlePane({
                title:"Module Input Nodes",
                content:this.inputsForm,
        });

        var moduleOutputTitlePane=new dijit.TitlePane({
                title:"Module Output Nodes",
                content:this.outputsForm,
        });
        this.dialog.addChild(moduleConfigTitlePane);
        this.dialog.addChild(moduleInputTitlePane);
        this.dialog.addChild(moduleOutputTitlePane);
        this.dialog.startup();
};


getModuleInfo=function getInfo(r){
        
                var row = r.parentNode.parentNode;
                moduleid = document.getElementById("modulelist").rows[row.rowIndex].cells[0].innerHTML;
                
                $.ajax({
                        url : basePath + "module/get/"+moduleid,
                        type : "GET",
                        cache : false,
                        dataType : "json",
                        success : function(data, status) {
                                conlist=data.configurations;
                                if(conlist.length!=0){
                                var text = "";
                                text += "<div ><table>" ;
                                                
                                
                                for(con in conlist){
                                        name=conlist[con].displayName;
                                        text+="<tr><td>";
                                        text += "<div ><span style=\"float: left; width: 80px;\"><strong>"+name+":</strong></span>";
                                        text+="</td><td>";
                                        text += "<span>"+conlist[con].key+"</span></div>";
                                        text+="</td></tr>";
                                        
                                }
                                text+="</table></div>";
                                dojo.byId("configurationForm").innerHTML=text;
                                }
                                inputlist=data.inputs;
                                if(inputlist.length!=0){
                                
                                var text = "";
                                text += "<div ><table>" +
                                "<tr><th>Name</th>" +
                                "<th>MaxNumber</th>" +
                                "<th>MinNumber</th>";
                                
                                for(con in inputlist){
                                        name=inputlist[con].name;
                                        text+="<tr><td>";
                                        text += "<div ><span style=\"float: left; width: 80px;\">"+name+"</span>";
                                        text+="</td><td>";
                                        text += "<span>"+inputlist[con].maxNumber+"</span></div>";
                                        text+="</td><td>";
                                        text += "<span>"+inputlist[con].minNumber+"</span></div>";
                                        text+="</td></tr>";
                                        
                                }
                                text+="</table></div>";
                                dojo.byId("inputsForm").innerHTML=text;
                                }
                                outputlist=data.outputs;
                                if(outputlist.length!=0){
                                var text = "";
                                text += "<div ><table>" +
                                "<tr><th>Name</th>" +
                                "<th>MaxNumber</th>" +
                                "<th>MinNumber</th>";
                                
                                for(con in outputlist){
                                        name=outputlist[con].name;
                                        text+="<tr><td>";
                                        text += "<div ><span style=\"float: left; width: 80px;\">"+name+"</span>";
                                        text+="</td><td>";
                                        text += "<span>"+outputlist[con].maxNumber+"</span></div>";
                                        text+="</td><td>";
                                        text += "<span>"+outputlist[con].minNumber+"</span></div>";
                                        text+="</td></tr>";
                                        
                                }
                                text+="</table></div>";
                                dojo.byId("outputsForm").innerHTML=text;
                                }
                                haflowAdmin.dialog.show();

                        },
                        error : function(request, status, error) {
                                showDialog("Error",
                                                "An error occurred while refreshing module list: " + error);
                        }
                });
        };

dojo.addOnLoad(function(){
                haflowAdmin=new HaflowAdmin;
                haflowAdmin.init();
                
                if(flag1) {
                        var dialog=new dijit.Dialog({
                                title : "Information",
                                content : message1,
                                style : "width:400px",
                        });
                        dialog.show();
                }
});
        