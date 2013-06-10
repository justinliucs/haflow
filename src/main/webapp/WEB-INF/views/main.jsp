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
<title>HA Flow</title>
<link rel="stylesheet"
	href="http://ajax.googleapis.com/ajax/libs/dojo/1.9.0/dijit/themes/claro/claro.css">
<link rel="stylesheet"
	href="http://ajax.googleapis.com/ajax/libs/dojo/1.9.0/dojox/layout/resources/ScrollPane.css">
<link rel="stylesheet" href="<%=basePath%>/style/haflow.css">
<link rel="stylesheet" href="<%=basePath%>/style/haflow.ui.css">
<link rel="stylesheet" href="<%=basePath%>/style/haflow.main.css">

<script type="text/javascript"
	src="http://ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min.js"></script>
<script type="text/javascript"
	src="http://ajax.googleapis.com/ajax/libs/jqueryui/1.10.3/jquery-ui.min.js"></script>
<script type="text/javascript"
	src="http://jsplumbtoolkit.com/js/jquery.ui.touch-punch.min.js"></script>
<script type="text/javascript"
	src="http://jsplumbtoolkit.com/js/jquery.jsPlumb-1.4.1-all.js"></script>
<script type="text/javascript"
	src="http://ajax.googleapis.com/ajax/libs/dojo/1.9.0/dojo/dojo.js"></script>
<script type="text/javascript" src="<%=basePath%>/script/haflow.js"></script>
<script type="text/javascript" src="<%=basePath%>/script/haflow.ui.js"></script>
<script type="text/javascript" src="<%=basePath%>/script/haflow.main.js"></script>
</head>
<body class="claro">
	<input type="hidden" value="<%=basePath%>" id="basePath" />
</body>
</html>