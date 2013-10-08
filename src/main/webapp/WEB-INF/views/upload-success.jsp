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
	<h1>HA Flow Administration</h1>
	<h2>Upload Module</h2>
	<p>Upload succeeded.</p>
</body>
</html>