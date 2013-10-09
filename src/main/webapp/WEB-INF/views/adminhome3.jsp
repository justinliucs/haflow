<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
	String username=request.getSession().getAttribute("username").toString();
%>
<html >
<head>

	<link rel="stylesheet" 
		href="http://ajax.googleapis.com/ajax/libs/dojo/1.9.0/dijit/themes/claro/claro.css">
		<style type="text/css">
html, body {
    width: 100%;
    height: 100%;
    margin: 0;
    overflow:hidden;
}

#borderContainer {
    width: 100%;
    height: 100%;
}
	</style>
	<script>dojoConfig = {parseOnLoad: true}</script>
	<script src='http://dojotoolkit.org/reference-guide/1.9/_static/js/dojo/dojo.js'></script>
	
	<script>
require(["dojo/parser", "dijit/layout/TabContainer", "dijit/layout/ContentPane","dijit/MenuBar","dijit/layout/BorderContainer"]);
	</script>
</head>
<body class="claro">
 
<div data-dojo-type="dijit/layout/BorderContainer" data-dojo-props="design:'sidebar', gutters:true, liveSplitters:true" id="borderContainer">
    <div data-dojo-type="dijit/layout/ContentPane" data-dojo-props="region:'top', splitter:false">
    	<h2>Haflow Background</h2>
    	<h5>hello： <%=username %></h5> 
    </div>
    <div data-dojo-type="dijit/layout/TabContainer" data-dojo-props="region:'center', tabStrip:false">
        		<div data-dojo-type="dijit/layout/ContentPane" title="Module List" href="admin">
            
        		</div>
        		<div data-dojo-type="dijit/layout/ContentPane" title="User List" href="adminusermana">
            
        		</div>
       
    		</div> 
	</div>

<div data-dojo-type="dijit/layout/BorderContainer" data-dojo-props="design:'sidebar', gutters:true, liveSplitters:true" id="borderContainer">
    <div data-dojo-type="dijit/MenuBar" data-dojo-props="region:'top', splitter:false">
    	<div data-dojo-type="dijit/layout/ContentPane" style="float:left"><h2>Haflow  Background</h2></div>
    	<div data-dojo-type="dijit/layout/ContentPane" style="float:right"><h5>hello：<font color=red><%=username %></font> |  <a href="quit">quit</a></h5>
    		
    		</div>
    	</div>
   </div>
    <div data-dojo-type="dijit/layout/TabContainer" data-dojo-props="region:'center', tabStrip:false">
        		<div data-dojo-type="dijit/layout/ContentPane" title="Module List" href="admin">
            
        		</div>
        		<div data-dojo-type="dijit/layout/ContentPane" title="User List" href="adminusermana">
            
        		</div>
       
    </div> 
	





    <%-- <div data-dojo-type="dijit/MenuBar" data-dojo-props="region:'top'" style="width: 100px;">
    	<div data-dojo-type="dijit/layout/ContentPane" style="float:left">Haflow  Background</div>
    	<div data-dojo-type="dijit/layout/ContentPane" >hello： <%=username %></div>
    	
    </div>
    
    <div data-dojo-type="dijit/layout/TabContainer" style="width: 100%;">
        		<div data-dojo-type="dijit/layout/ContentPane" title="Module List" href="admin">
            
        		</div>
        		<div data-dojo-type="dijit/layout/ContentPane" title="User List" href="adminusermana">
            
        		</div>
       
    </div>  --%>
	














    
</body>
</html>