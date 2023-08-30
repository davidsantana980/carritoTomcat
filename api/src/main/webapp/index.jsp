<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html>
<head>
    <title>JSP - Hello World</title>
</head>
<body>
<h1><%= "Hello World!" %>
</h1>
<br/>
<a href="hello-servlet">GET</a>
<br/>
<form action="${pageContext.request.contextPath}/hello-servlet" method="post">
    <h3>POST</h3>
    <input id="nombre" type="text" name="nombre" placeholder="Escribe" />
    <input type="submit" value="Submit" />
</form>
</body>
</html>