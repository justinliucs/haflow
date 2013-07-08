<%@page import="haflow.module.util.ModuleUtil"%>
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
<title>HA Flow Administration</title>
<link rel="stylesheet" href="<%=basePath%>/style/site.css">
<body>
	<h1>Haflow Administration</h1>
	<h2>Module List</h2>
	<table>
		<tr>
			<th>Module Id</th>
			<th>Name</th>
			<th>Category</th>
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