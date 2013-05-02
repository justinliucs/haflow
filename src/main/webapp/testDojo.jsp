<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<link rel="stylesheet" href="static/dojolib/dojo/resources/dojo.css" />
<link rel="stylesheet"
			href="static/dojolib/dijit/themes/claro/claro.css" />
<link rel="stylesheet"
			href="static/dojolib/dojox/grid/_grid/tundraGrid.css" />
<script type="text/javascript" src="static/dojolib/dojo/dojo.js" 
		         data-dojo-config="parseOnLoad: true, async:true"></script>
	
     <%--<script>
     dojo.require("dojo.store.JsonRest");
     dojo.require("dojo.store.Memory");
     dojo.require("dojo.store.Cache");
     dojo.require("dojox.grid.DataGrid");
     dojo.require("dojo.data.ObjectStore");
     dojo.ready(function(){
         myStore = dojo.store.Cache(dojo.store.JsonRest({target:"/UserTest"}), dojo.store.Memory());
         grid = new dojox.grid.DataGrid({
             store: dataStore = dojo.data.ObjectStore({objectStore: myStore}),
             structure: [
                 {name:"State Name", field:"name", width: "200px"},
                 {name:"", field:"password", width: "200px", editable: true}
             ]
         }, "target-node-id"); // make sure you have a target HTML element with this id
         grid.startup();
         dojo.query("#save").onclick(function(){
             dataStore.save();
         });
     });
 </script>
     --%>
     <script>
     require(["dojo/parser", "dijit/form/Button"], function(parser){
    	 alert("start ready!------");
    	    parser.parse();
     });
     require(["dojo/store/JsonRest","dojo/parser",
              "require","dojo/store/Memory","dojo/store/Cache",
              "dojox/grid/DataGrid","dojo/data/ObjectStore","dojo/query",
              "dojo/store/JsonRest","dojo/ready","dijit/form/Button"],
              function(JsonRest,Memory,require,ready,query,ObjectStore,DataGrid,Cache){
    	 alert("start aaaaaaa");
     ready(function(){
         
         <%--  var myStore = new Cache(new JsonRest({target:"\UserTest"}),new Memory());
         grid = new DataGrid({
             store: dataStore = new ObjectStore({objectStore: myStore}),
             structure: [
                 {name:"user name", field:"name", width: "200px"},
                 {name:"password", field:"password", width: "200px"}
             ]
         }, "target-node-id"); // make sure you have a target HTML element with this id
         grid.startup();
         query("#save").onclick(function(){
             alert("helllo!");
             dataStore.save();
         }); --%>
     });
     });
</script>
    


<title>Insert title here</title>
</head>
<body class="tundra">

<h1>Demo: Connecting DataGrid to a Store backed by Spring @MVC</h1>
        <div id="target-node-id"></div>
        <button id="save">Save</button>

</body>
</html>