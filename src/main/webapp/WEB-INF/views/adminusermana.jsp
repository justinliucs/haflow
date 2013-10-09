<%@page import="haflow.dto.entity.MainUser"%>
<%@page import="haflow.ui.helper.UserHelper"%>
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
<title>HA Flow UserManagement</title>
<link rel="stylesheet" href="<%=basePath%>/style/site.css">
<script type="text/javascript" src="<%=basePath%>script/adminusermana.js"></script>
<body>
	<h1>Haflow Administration</h1>
	<h2>User List</h2>
	
	<table id="userList">
		<tr>
			<th>User Id</th>
			<th>Name</th>
			<th>Role</th>
			<th>Space</th>
			<th>UsedSpace</th>
			<th>Operation</th>
			<th>Operation</th>
		</tr>
		<% if(request.getAttribute("list")!=null){
				java.util.List<MainUser> list=(java.util.List<MainUser>)request.getAttribute("list");
		
				if(list!=null){
					for(MainUser user:list){
		%><tr>
			<td id="id"><%=user.getId()%></td>
			<td><%=user.getName()%></td>
			<td><% System.out.print(user.getRole());
			if(user.getRole()==0) out.print("user");
			if(user.getRole()==1) out.print("admin");
			%></td>
			<td><%=user.getSpace() %></td>
			<td><%=user.getUsedspace() %></td>
			
			<td><a
				href="user/remove/<%=user.getId()%>" onclick="return confirm('确认删除')">Remove</a></td>
	
			<td><a
				href="javascript:void(0)" onclick="return openEdit(this);" style="color:blue">Edit</a></td>
		</tr>
		
		<%
					}
				}
			}	
		%>
			
	</table>
	
</body>
</html>