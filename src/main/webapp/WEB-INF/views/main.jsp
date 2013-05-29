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
<title>Flow Chart</title>
<link rel="stylesheet" href="<%=basePath%>static/css/site.css">
<link rel="stylesheet"
	href="http://ajax.googleapis.com/ajax/libs/dojo/1.9.0/dijit/themes/claro/claro.css">
<script type="text/javascript"
	src="http://ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min.js"></script>
<script type="text/javascript"
	src="http://ajax.googleapis.com/ajax/libs/jqueryui/1.10.3/jquery-ui.min.js"></script>
<script type="text/javascript"
	src="http://jsplumbtoolkit.com/js/jquery.ui.touch-punch.min.js"></script>
<script type="text/javascript"
	src="http://jsplumbtoolkit.com/js/jquery.jsPlumb-1.4.1-all-min.js"></script>
<script type="text/javascript"
	src="http://ajax.googleapis.com/ajax/libs/dojo/1.9.0/dojo/dojo.js"></script>
<script type="text/javascript" src="<%=basePath%>static/js/util.js"></script>
<script type="text/javascript" src="<%=basePath%>static/js/haflow.js"></script>
</head>
<body class="claro">
	<button onClick="flow.newFlow();">New</button>
	<button onClick="flow.mergeCurrentFlow();">Merge</button>
	<button onClick="flow.removeCurrentFlow();">Remove</button>
	<input type="hidden" value="<%=basePath%>" id="basePath" />
</body>
</html>