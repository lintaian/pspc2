<%@ page language="java" contentType="text/html; charset=UTF-8" import="java.util.*" pageEncoding="UTF-8"%>
<div data-role="header" data-position="fixed" data-theme="b">
	<a href="#mainPage" data-role="button" data-icon="home">首页</a>
  	<h1><%= request.getParameter("title")%></h1>
  	<a href="javascript:void(0)" data-role="button" data-icon="gear" data-iconpos="notext" data-custom="logout"></a>
	<div style="position: relative;" class="hide">
		<div style="position: absolute;right: 0px;top: -3px;">
			<ul data-role="listview">
			  <li><a href="logout" data-role="button" 
			  		data-ajax="false" data-corners="false">退出</a></li>
			  <li><a href="#updatePwd" data-role="button"
			  		data-corners="false">修改密码</a></li>
			</ul>
		</div>
	</div>
</div>
