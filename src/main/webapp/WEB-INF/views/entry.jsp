<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="s"%>
<%@ taglib uri="http://www.springframework.org/tags/form" prefix="form"%>
<%@ page session="false"%>
<c:if test="${!ajaxRequest}">
	<html>
<head>
<title>Entry Forms</title>
<script type="text/javascript"
	src="http://ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min.js"></script>
<link rel="stylesheet" href="static/zcss/form.css" />
</head>
<body>
</c:if>
<div id="entryContent">
	<table>
		<thead>
			<tr>
				<td colspan=2><B>Entry Recognition Configuration</B></td>
			</tr>
		</thead>
		<tr>
			<td><label for="jarPath">Jar Path </label></td>
			<td><input class="jarPath" /></td>
		</tr>
		<tr>
			<td><label for="inPath">Input Path</label></td>
			<td><input class="inPath" /></td>
		</tr>
		<tr>
			<td><label for="outPath">Output Path</label></td>
			<td><input class="outPath" /></td>
		</tr>
		<tr>
			<td><label for="confPath">Conf Path </label></td>
			<td><input class="confPath" /></td>
		</tr>

	</table>
</div>
<c:if test="${!ajaxRequest}">
	</body>
	</html>
</c:if>