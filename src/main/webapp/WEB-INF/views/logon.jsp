<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<link rel="stylesheet" href="<%=basePath%>/style/index.css">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>Haflow Logon</title>
</head>
<body>
	<div class="wrapper">
		<div class="title">
			<h1>基于Hadoop的大数据分析平台</h1>
		</div>
		<div class="content">
			<div class="left">
				<img src="<%=basePath%>/images/logon.png" />
			</div>
			<div class="right">
				<h2>登录</h2>
				<div class="field">
					<span>用户名：</span><input type="text" />
				</div>
				<div class="field">
					<span>密码：</span><input type="password" />
				</div>
				<div>
					<button type="button" onclick="window.location.href='main'">登录</button>
					<button type="button" onclick="window.location.href='admin'">管理员登录</button>
				</div>
			</div>
			<div class="clear"></div>
		</div>
	</div>
</body>
</html>