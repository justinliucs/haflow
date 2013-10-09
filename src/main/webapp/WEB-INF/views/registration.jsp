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

<title>Haflow Registration</title>
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
				<form id="form2" action="regiscommit"  method="post">
				<div class="field">
					<span style="float: left; width: 80px;">用户名：</span><input type="text" name="username" onblur="" />
					<span id="username_err" ></span>
				</div><br/>
				<div class="field">
					<span style="float: left; width: 80px;">邮箱：</span><input type="text" name="email" />
					<span id="email_err" ></span>
				</div><br/>
				<div class="field">
					<span style="float: left; width: 80px;">输入密码：</span><input type="password" name="password" />
					<span id="password_err" ></span>
				</div><br/>
				<div class="field">
					<span style="float: left; width: 80px;">确认密码：</span><input type="password" name="password1" onblur="checkPass()"/>
					<span id="password1_err" ></span>
				</div><br/>
				<div><span id="errorSpan"><%if(request.getAttribute("message")!=null) out.println(request.getAttribute("message")); %></span></div>
				<div>
				
					<button style="width: 120px;height: 35px; font-family:Arial;font-size:14px;font-weight:bold;color:#333333;" type="button" name="main-log" onclick="fun3()">立即注册</button>
					&nbsp;&nbsp;
					<button style="width: 120px;height: 35px; font-family:Arial;font-size:14px;font-weight:normal;color:#333333;" type="button" name="admin-log" onclick="fun4()">管理员注册</button>
				</div>
				<div class="field">
					<span style="float: left; width: 220px;">已有账户？<a href="/haflow">立即登陆</a></span>
				</div>
				
				<input id="mora" type="hidden" name="mora" />
					
				
				</form>
			</div>
			<div class="clear"></div>
		</div>
	</div>
</body>
<script type="text/javascript"
	src="http://ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min.js"></script>
<script type="text/javascript"
	src="http://ajax.googleapis.com/ajax/libs/jqueryui/1.10.3/jquery-ui.min.js"></script>
<script type="text/javascript" src="<%=basePath%>script/registration.js"></script>
</html>