<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>Flow Chart</title>
<link rel="stylesheet" href="static/css/site.css">
</head>
<body>
	<div class="wrapper">
		<div>
			<button onClick="load();">Load Flow</button>
			<button onClick="save();">Save Flow</button>
		</div>
		<div>
			<div class="componentwrapper">
				<span>Components</span>
				<div id="components" class="componentcontainer"></div>
			</div>
			<div class="flowwrapper">
				<span>Flow</span>
				<div id="flow" class="flowcontainer"></div>
			</div>
		</div>
		<div class="clear"></div>
		<div class="consolewrapper">
			<span>Console</span>
			<div id="console" class="consolecontainer"></div>
		</div>
	</div>
	<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min.js"></script>
	<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jqueryui/1.10.3/jquery-ui.min.js"></script>
	<script type="text/javascript"
		src="static/lib/jquery.ui.touch-punch.min.js"></script>
	<script type="text/javascript" src="static/lib/jsBezier-0.6-min.js"></script>
	<script type="text/javascript" src="static/lib/jquery.jsPlumb-1.4.1-all.js"></script>
	<script type="text/javascript" src="static/js/haflow.js"></script>
	<script type="text/javascript" src="static/js/flow.js"></script>
</body>
</html>