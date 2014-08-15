<%@ page language="java" contentType="text/html; charset=UTF-8" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<!DOCTYPE html>
<html>
<head>
	<base href="<%=basePath%>">
	<meta charset="utf-8">
	<title>登陆</title>
	<meta name="viewport" content="initial-scale=1, maximum-scale=1, user-scalable=no, minimal-ui">
	<link rel="stylesheet" href="css/jquery.mobile-1.4.3.css">
	<link rel="stylesheet" href="css/jquery.mobile.external-png-1.4.3.css">
	<link rel="stylesheet" href="css/jquery.mobile.icons-1.4.3.css">
	<link rel="stylesheet" href="css/jquery.mobile.inline-png-1.4.3.css">
	<link rel="stylesheet" href="css/jquery.mobile.inline-svg-1.4.3.css">
	<link rel="stylesheet" href="css/jquery.mobile.structure-1.4.3.css">
	<link rel="stylesheet" href="css/jquery.mobile.theme-1.4.3.css">
	<script src="js/lib/jquery.js"></script>
	<script src="js/lib/jquery.mobile-1.4.3.js"></script>
	<script src="js/custom/login.js"></script>
</head>
<body>
	<div data-role="page" id="page1">
		<div data-role="header" data-position="fixed" data-theme="b">
		  <h1>登陆</h1>
		</div>
		<div class="content">
			<div style="margin-top: 100px;">
				<form>
				  <label for="name">用户名:</label>
				  <input type="text" name="name" id="name">
				  <label for="pwd"> 密 码 :</label>
				  <input type="password" name="pwd" id="pwd">
				  <input type="button" id="loginCommit" value="登陆">
				</form>
			</div>
		</div>
		
		<div data-role="footer" data-position="fixed" data-theme="b">
		  <h1>成都乐培生教育</h1>
		  <div style="text-align: center;">
			  <a href="http://luckypearson.com/">关于我们</a>
		  </div>
		</div>
	</div>
	<div data-role="page" id="dialog">
		<div data-role="header" data-theme="b">
		  	<h1 data-custom-dialog="title">提示</h1>
		</div>
	    <div data-role="content">
			<span data-custom-dialog="text"></span>
	    </div>
	</div>
</body>
</html>