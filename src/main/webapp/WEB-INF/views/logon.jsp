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
<script type="text/javascript" src="<%=basePath%>script/logon.js"></script>
<link rel="stylesheet" href="<%=basePath%>/style/index.css">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>Haflow Logon</title>
</head>
<body>
	<div class="wrapper">
		<div class="title">
			<h1>大数据分析服务平台</h1>
		</div>
		<div class="content">
			<div class="left">
				<img src="<%=basePath%>/images/logon.png" />
			</div>
			<div class="right">
				<!--  <h2>登录</h2> -->
				
				<form id="form1" name="form1" action="" method="post">
				<div class="field">
					<span style="float: left; width: 80px;">用户名：</span><input type="text" id="username" name="username" />
					<span id="error_username"></span>
				</div><br/>
				<div class="field">
					<span style="float: left; width: 80px;">密码：</span><input type="password" id="password" name="password" />
				    <span id="error_password"></span>
				   
				</div><br/>
				<div><span id="errorSpan"><%if(request.getAttribute("message")!=null) out.println(request.getAttribute("message")); %></span></div>
				
				<div>
					<button style="width: 70px;height: 35px; font-family:Arial;font-size:14px;font-weight:bold;color:#333333;" type="submit" name="main-log" onclick="fun()">登录</button>
					&nbsp;&nbsp;
					<button style="width: 120px;height: 35px; font-family:Arial;font-size:14px;font-weight:normal;color:#333333;" type="button" name="admin-log" onclick="fun1();">管理员登录</button>
				</div>
				<div class="field">
					<span style="float: left; width: 120px;">还没有账户？</span><a href="registration">立即注册</a>
				</div>
				</form>
			</div>
			<div class="clear"></div>
		</div>
	</div>
</body>
</html>
