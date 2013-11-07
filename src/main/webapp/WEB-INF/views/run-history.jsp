<%@ page import="haflow.ui.model.*" %>
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
<style>
.runhistory_table
{
	border-collapse:collapse;
}
.runhistory_table{
	border : 1px solid #C0C0C0;
	padding-left : 5px;
	padding-right : 5px;
}
</style>
</head>
<body>

<h2>Flow Run History</h2>

<% 
	FlowRunHistoryListModel frhlm = 
		(FlowRunHistoryListModel)request.getAttribute("flowHistory");
%>

<% if(frhlm != null && frhlm.getFlowHistorys().size() != 0){ %>
	<table class="runhistory_table">
		<tr>
			<th class="runhistory_table">Oozie Job Id</th>
			<th class="runhistory_table">Time</th>
			<th class="runhistory_table">Commit Message</th>
		</tr>
		<%
			for( int i = 0; i < frhlm.getFlowHistorys().size(); i++){
				FlowRunHistoryModel frhm = frhlm.getFlowHistorys().get(i);
		%>
		<tr>
			<td class="runhistory_table"><%=frhm.getOozieJobId() %></td>
			<td class="runhistory_table"><%=frhm.getTimestamp() %></td>
			<td class="runhistory_table"><%=frhm.getCommitMessage() %></td>
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