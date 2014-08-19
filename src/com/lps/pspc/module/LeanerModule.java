package com.lps.pspc.module;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.nutz.ioc.annotation.InjectName;
import org.nutz.ioc.loader.annotation.IocBean;
import org.nutz.mvc.annotation.At;
import org.nutz.mvc.annotation.GET;
import org.nutz.mvc.annotation.Ok;

import com.lepeisheng.flipped.client.RpcHelper;
import com.lepeisheng.flipped.rpc.LearningProcess;
import com.lepeisheng.flipped.rpc.ParentInfo;

@IocBean
@InjectName
@At("/")
public class LeanerModule {
	
	@At("status")
	@Ok("json")
	@GET
	public List<LearningProcess> getStudentStatus(HttpServletRequest req) {
		HttpSession session = req.getSession();
		ParentInfo parentInfo = (ParentInfo) session.getAttribute("user");
		String timestamp = "";
		if (session.getAttribute("leanerStatuTimestamp") == null) {
			SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss");
			timestamp = sdf.format(new Date());
		} else {
			timestamp = session.getAttribute("leanerStatuTimestamp").toString();
		}
		return RpcHelper.getLearningProcess(parentInfo.getStudentUid(), timestamp, 5);
	}
}
