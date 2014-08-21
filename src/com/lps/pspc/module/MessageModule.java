package com.lps.pspc.module;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.thrift.TException;
import org.nutz.ioc.annotation.InjectName;
import org.nutz.ioc.loader.annotation.IocBean;
import org.nutz.mvc.adaptor.JsonAdaptor;
import org.nutz.mvc.annotation.AdaptBy;
import org.nutz.mvc.annotation.At;
import org.nutz.mvc.annotation.By;
import org.nutz.mvc.annotation.Filters;
import org.nutz.mvc.annotation.GET;
import org.nutz.mvc.annotation.Ok;
import org.nutz.mvc.annotation.POST;
import com.lepeisheng.flipped.client.RpcHelper;
import com.lepeisheng.flipped.rpc.Message;
import com.lepeisheng.flipped.rpc.ParentInfo;
import com.lepeisheng.flipped.rpc.TeacherInfo;
import com.lps.pspc.filter.LoginFilter;

@IocBean
@InjectName
@At("/msg")
@Filters({@By(type=LoginFilter.class)})
public class MessageModule {
	@At("/?")
	@GET
	@Ok("json")
	public List<Message> getMsg(String tid, String timestamp, HttpServletRequest req) {
		HttpSession session = req.getSession();
		ParentInfo parentInfo = (ParentInfo) session.getAttribute("user");
		if ("".equals(timestamp) || timestamp == null) {
			SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
			timestamp = sdf.format(new Date().getTime() - 86400000 * 365);
		}
		return RpcHelper.parentGetMessage(0, parentInfo.getParentUid(), tid, timestamp, 0);
	}
	@At("")
	@GET
	@Ok("json")
	public List<Message> getMsg(String timestamp, HttpServletRequest req) {
		return getMsg("", timestamp, req);
	}
	@At("")
	@POST
	@Ok("json")
	@AdaptBy(type = JsonAdaptor.class)
	public Object sendMsg(Map<String, String> body, HttpServletRequest req) {
		HttpSession session = req.getSession();
		ParentInfo parentInfo = (ParentInfo) session.getAttribute("user");
		if (RpcHelper.parentSendMessage(4, parentInfo.getParentUid(), body.get("tid"), body.get("msg"))) {
			Message message = new Message();
			message.setInfo(body.get("msg"));
			message.setSenderName(parentInfo.getParentName());
			message.setSenderUid(parentInfo.getParentUid());
			SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
			String timestamp = sdf.format(new Date().getTime());
			message.setTimestamp(timestamp);
			return message;
		}
		return null;
	}
	@At("/teachers")
	@GET
	@Ok("json")
	public List<TeacherInfo> getTeacher(HttpServletRequest req) throws TException {
		HttpSession session = req.getSession();
		ParentInfo parentInfo = (ParentInfo) session.getAttribute("user");
		return RpcHelper.getTeacherInfo(parentInfo.getClassUid());
	}
}
