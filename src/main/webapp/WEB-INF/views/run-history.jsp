<%@page import="haflow.ui.model.*"%>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
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
<title>HaFlow: Flow Run Histories</title>
<link rel="stylesheet" href="<%=basePath%>/style/site.css">
</head>
<body>

<h1>Flow Run History</h1>
<h2>History List</h2>
<% 
	FlowRunHistoryListModel frhlm = 
		(FlowRunHistoryListModel)request.getAttribute("flowHistory");
%>

<% if(frhlm != null && frhlm.getFlowHistorys().size() != 0){ %>
	<table>
		<tr>
			<th>History Id</th>
			<th>Oozie Job Id</th>
			<th>Time</th>
			<th>Commit Message</th>
		</tr>
		<%
			for( int i = 0; i < frhlm.getFlowHistorys().size(); i++){
				FlowRunHistoryModel frhm = frhlm.getFlowHistorys().get(i);
		%>
		<tr>
			<td><%=frhm.getId() %></td>
			<td><%=frhm.getOozieJobId() %></td>
			<td><%=frhm.getTimestamp() %></td>
			<td><%=frhm.getCommitMessage() %></td>
		</tr>
		<%
			}
		%>
	</table>
<% }else{ %>
	No History!
<% } %>
</body>
</html>