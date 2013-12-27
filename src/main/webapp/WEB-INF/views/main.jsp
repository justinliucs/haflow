<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
	String username=request.getSession().getAttribute("username").toString();
	Object userid=request.getSession().getAttribute("userid");
	
%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>Haflow - a big data analysis service platform!</title>
<link rel="stylesheet"
	href="http://ajax.googleapis.com/ajax/libs/dojo/1.9.0/dijit/themes/claro/claro.css">
<link rel="Stylesheet" href="http://ajax.googleapis.com/ajax/libs/dojo/1.9.0/dojox/grid/resources/soriaGrid.css" />
<link rel="stylesheet"
	href="http://ajax.googleapis.com/ajax/libs/dojo/1.9.0/dijit/themes/soria/soria.css">
<link rel="stylesheet"
	href="http://ajax.googleapis.com/ajax/libs/dojo/1.9.0/dojox/layout/resources/ScrollPane.css">
<link rel="stylesheet" href="<%=basePath%>/style/haflow.css">
<link rel="stylesheet" href="<%=basePath%>/style/haflow.ui.css">
<link rel="stylesheet" href="<%=basePath%>/style/haflow.main.css">
<link rel="stylesheet" href="<%=basePath%>/style/haflow.report.css">



<script type="text/javascript"
	src="http://ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min.js"></script>
<script type="text/javascript"
	src="http://ajax.googleapis.com/ajax/libs/jqueryui/1.10.3/jquery-ui.min.js"></script>
<script type="text/javascript"
	src="script/jsPlumb/jquery.ui.touch-punch.min.js"></script>
<script type="text/javascript"
	src="script/jsPlumb/jquery.jsPlumb-1.4.1-all.js"></script>
<script type="text/javascript"
	src="http://ajax.googleapis.com/ajax/libs/dojo/1.9.0/dojo/dojo.js" 
	djConfig="isDebug:true,parseOnLoad:true,locale:'zh-cn'"></script>
<script type="text/javascript" src="<%=basePath%>/script/locale/nls/en/myfile.js"></script>
<script type="text/javascript" src="<%=basePath%>/script/ajax.setup.js"></script>
<script type="text/javascript" src="<%=basePath%>/script/haflow.js"></script>
<script type="text/javascript" src="<%=basePath%>/script/haflow.ui.js"></script>
<script type="text/javascript" src="<%=basePath%>/script/haflow.main.js"></script>
<script type="text/javascript" src="<%=basePath%>/script/haflow.flow_operation.js"></script>
<script type="text/javascript" src="<%=basePath%>/script/haflow.flow_operation_helper.js"></script>
<script type="text/javascript" src="<%=basePath%>/script/haflow.hdfs.js"></script>
<script type="text/javascript" src="<%=basePath%>/script/haflow.report_list.js"></script>
<script type="text/javascript" src="<%=basePath%>/script/haflow.report.js"></script>
<script type="text/javascript" src="<%=basePath%>/script/haflow.jsplumb.js"></script>
<script type="text/javascript" src="<%=basePath%>/script/haflow.oozie_hive.js"></script>
<script type="text/javascript" src="<%=basePath%>/script/haflow.toolbar.js"></script>

</head>
<body class="soria" > <!-- claro -->

	<script type="text/javascript">
		var username="<%=username%>";
		var userid=<%=userid%>;
		var language="English";
	</script>
	<input type="hidden" value="<%=basePath%>" id="basePath" />
	
</body>
</html>
