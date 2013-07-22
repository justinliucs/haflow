<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"  isELIgnored ="false"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">

<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>cat</title>
</head>
<body>
	<form action="/haflow/doCat" method="post">
		<input type="text" name="file"/>
		<button type="submit">submit</button>
	</form>
		<form action="/haflow/cat_file" method="get">
		<input type="text" name="path"/>
		<button type="submit">cat hdfs file</button>
	</form>
</body>
</html>