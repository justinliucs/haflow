<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://www.springframework.org/tags" prefix="s" %>
<%@ taglib uri="http://www.springframework.org/tags/form" prefix="form" %>
<%@ page session="false" %>
<c:if test="${!ajaxRequest}">
<html>
<head>
	<title>forms | mvc-showcase</title>
	<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min.js"></script>	
	<link rel="stylesheet" href="static/zcss/form.css"/>
	
</head>
<body>
</c:if>
		<div id="hiveContent">

		<form:form id="form_hive" method="post" modelAttribute="hiveBean" cssClass="cleanform">
			<div class="header">
		  		<h2>Hive Query</h2>
		  		<c:if test="${not empty message}">
					<div id="message" class="success">${message}</div>	
		  		</c:if>
		  		<s:bind path="*">
		  			<c:if test="${status.error}">
				  		<div id="message" class="error">Form has errors</div>
		  			</c:if>
		  		</s:bind>
			</div>
		  	<fieldset>
		  		<legend>Configuration</legend>
		  		
		  		<form:label path="jarPath">
		  			Jar Path <form:errors path="jarPath" cssClass="error" />
		 		</form:label>
		  		<form:input path="jarPath" />	
		  		
		  		<form:label path="hiveSql">
		  			SQL <form:errors path="hiveSql" cssClass="error" />
		 		</form:label>
		  		<form:input path="hiveSql" />		  
		  		
		  		<form:label path="outPath">
		  			Output Path <form:errors path="outPath" cssClass="error" />
		 		</form:label>
		  		<form:input path="outPath" />		  	
	
		  	</fieldset>
	
			<p><button type="submit">Submit</button></p>
		</form:form>
		<script type="text/javascript">
			
			$(document).ready(function() {
				$("#form_hive").submit(function() {  
					$.post($(this).attr("action"), $(this).serialize(), function(html) {
						$("#hiveContent").replaceWith(html);
						//$('html, body').animate({ scrollTop: $("#message").offset().top }, 500);					
					});
					return false;  
				});			
			});
		</script>
	</div>
<c:if test="${!ajaxRequest}">
</body>
</html>
</c:if>