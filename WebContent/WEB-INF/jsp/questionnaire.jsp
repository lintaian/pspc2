<%@ page language="java" contentType="text/html; charset=UTF-8" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<!DOCTYPE html>
<html id="ng-app">
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
<body data-ng-controller="mainCtrl">
	<div data-role="page" id="mainPage" class="hide">
		<div data-role="header" data-position="fixed" data-theme="b">
			<h1>问卷调查</h1>
		</div>
		<div class="content">
			<form>
			  <fieldset data-role="controlgroup">
				<ul data-role="listview" class="none-inline longitudinal-ul" 
					data-ng-repeat="l in list">
				  <li data-role="list-divider" data-ng-bind="l.name" data-ng-init="index=$index"></li>
				  <li data-ng-repeat="l2 in l.list" data-ng-if="l.type=='a'">
				    <div class="ui-radio" data-ng-click="radioChange(l2, l.list)">
				  	  <label class="ui-btn ui-corner-all ui-btn-inherit ui-btn-icon-left 
					  	  ui-first-child ui-last-child" data-ng-bind="l2.name"
					  	  data-ng-class="{'ui-radio-off': !l2.checked, 'ui-radio-on': l2.checked}"></label>
				      <input type="radio" name="name{{index}}" data-ng-model="l2.checked" data-role="none">
				    </div>
				  </li>
				  <li data-ng-repeat="l2 in l.list" data-ng-if="l.type=='b'">
				  	<div class="ui-checkbox" data-ng-click="l2.checked=!l2.checked">
				  	  <label class="ui-btn ui-corner-all ui-btn-inherit ui-btn-icon-left 
					  	  ui-first-child ui-last-child" data-ng-bind="l2.name"
					  	  data-ng-class="{'ui-checkbox-off': !l2.checked, 'ui-checkbox-on': l2.checked}"></label>
				      <input type="checkbox" data-ng-model="l2.checked" data-role="none">
				    </div>
				  </li>
				</ul>
			  </fieldset>
			</form>
			<a href="#longitudinalDetail" data-role="button" data-transition="slide">提 交</a>
		</div>
		<div data-role="footer" data-position="fixed" data-theme="b">
			<h1>成都乐培生教育</h1>
			<div style="text-align: center;">
				<a href="http://luckypearson.com/" target="_blank" data-ajax="false">关于我们</a>
			</div>
		</div>
	</div>
	<script data-main="js/require/questionnaire" src="js/lib/require.js"></script>
</body>
</html>