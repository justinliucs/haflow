<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
	String username = request.getSession().getAttribute("username")
			.toString();
	boolean isModuleUpload=false;
	String moduleUploadMessage=null;
	if(request.getAttribute("uploadmessage")!=null) {
		isModuleUpload=true;
		moduleUploadMessage=(String)request.getAttribute("uploadmessage");
		
		}
	boolean flag;
	Object message = request.getAttribute("message");
	if (request.getAttribute("message") != null) {

		flag = true;
	} else {

		flag = false;
	}
%>
<html>
<head>

<link rel="stylesheet"
	href="http://ajax.googleapis.com/ajax/libs/dojo/1.9.0/dijit/themes/claro/claro.css">
<style type="text/css">
html,body {
	width: 100%;
	height: 100%;
	margin: 0;
	overflow: hidden;
}

#borderContainer {
	width: 100%;
	height: 100%;
}
</style>
<script>dojoConfig = {parseOnLoad: true}</script>

<script type="text/javascript"
	src="http://ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min.js"></script>
<script type="text/javascript"
	src="http://ajax.googleapis.com/ajax/libs/jqueryui/1.10.3/jquery-ui.min.js"></script>
<script type="text/javascript"
	src="script/jsPlumb/jquery.ui.touch-punch.min.js"></script>
<script type="text/javascript"
	src="script/jsPlumb/jquery.jsPlumb-1.4.1-all.js"></script>
<script type="text/javascript"
	src="http://ajax.googleapis.com/ajax/libs/dojo/1.9.0/dojo/dojo.js"></script>

<script>
require(["dojo/parser", "dijit/Dialog","dijit/layout/TabContainer", "dojox/layout/ContentPane","dijit/MenuBar","dijit/layout/BorderContainer"]);

	var flag=<%=flag%>
	
	if(flag){
		var message="<%=message%>";
		alert(message);
	}
	var basePath="<%=basePath%>";
	var flag1=<%=isModuleUpload%>;
	var message1="<%=moduleUploadMessage%>";

</script>

</head>
<body class="claro">
<script type="text/javascript" src="<%=basePath%>script/admin.js"></script>
<script type="text/javascript"
	src="<%=basePath%>script/adminusermana.js"></script>

	<div data-dojo-type="dijit/layout/BorderContainer"
		data-dojo-props="design:'sidebar', gutters:true, liveSplitters:true"
		id="borderContainer">
		<div data-dojo-type="dijit/MenuBar"
			data-dojo-props="region:'top', splitter:false">
			<div id="title" data-dojo-type="dojox/layout/ContentPane" style="float: left">
				
			</div>
			<div data-dojo-type="dojox/layout/ContentPane" style="float: right">
				<h5>
					hello：<font><%=username%></font> | <a href="quit" style="text-decoration: none;"><font color="black">quit</font></a>
				</h5>

			</div>
		</div>
		<div data-dojo-type="dijit/layout/TabContainer"
			data-dojo-props="region:'center', tabStrip:false">
			<div data-dojo-type="dojox/layout/ContentPane" title="Module List"
				href="admin"></div>
				
			<div id="table_pane" data-dojo-type="dojox/layout/ContentPane" title="User List">
				
			</div>


		</div>
	</div>
</body>
</html>