<%@page import="haflow.service.ModuleService"%>
<%@page import="haflow.ui.model.ModuleBriefModel"%>
<%@page import="haflow.ui.helper.ModuleHelper"%>
<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
	
%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">

<!-- <link rel="stylesheet"
	href="http://ajax.googleapis.com/ajax/libs/dojo/1.9.0/dijit/themes/claro/claro.css"> -->
<link rel="stylesheet" href="<%=basePath%>/style/site.css">
<!-- <script type="text/javascript"
	src="http://ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min.js"></script>
<script type="text/javascript"
	src="http://ajax.googleapis.com/ajax/libs/dojo/1.9.0/dojo/dojo.js"></script> -->

<script type="text/javascript">
var basePath="<%=basePath%>";
</script>	
<%-- <script type="text/javascript" src="<%=basePath%>script/admin.js"></script> --%>
</head>
<body  class="claro">
	
	
	<table id="modulelist">
		<tr>
			<th>Module Id</th>
			<th>Name</th>
			<th>Category</th>
			<th>Operation</th>
			<th>Operation</th>
		</tr>
		<%
			java.util.List<ModuleBriefModel> list = ModuleHelper
					.getModuleHelper().getModuleList().getModules();
			for (ModuleBriefModel moduleBriefModel : list) {
		%><tr>
			<td><%=moduleBriefModel.getId().toString()%></td>
			<td><%=moduleBriefModel.getName()%></td>
			<td><%=moduleBriefModel.getCategory()%></td>
			<td><a
				href="module/remove/<%=moduleBriefModel.getId().toString()%>">Remove</a></td>
			<td><a onclick="javascript:getModuleInfo(this); return false;" href="#">Info</a></td>
		</tr>
		<%
			}
		%>
	</table>
	<h2>Upload Module</h2>
	<form action="module" enctype="multipart/form-data" method="post">
		<input type="file" name="file" /> <input type="submit" />
	</form>
</body>
</html>