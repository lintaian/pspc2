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
	<link rel="stylesheet" href="css/main.css">
</head>
<body>
	<%@include file="/tpl/index.html" %>
	<%@include file="/tpl/detailedTranscripts.html" %>
	<%@include file="/tpl/homework.html" %>
	<%@include file="/tpl/scoreChart.html" %>
	<%@include file="/tpl/transverse.html" %>
	<%@include file="/tpl/longitudinal.html" %>
	<%@include file="/tpl/wrongBook.html" %>
	<%@include file="/tpl/messageBoard.html" %>
	<%@include file="/tpl/studentStatus.html" %>
	<%@include file="/tpl/updatePwd.html" %>
	<%@include file="/tpl/dialogs.html" %>
	<script data-main="js/require/main" src="js/lib/require.js"></script>
</body>
</html>