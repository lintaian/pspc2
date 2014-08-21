package com.lps.pspc.module;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.nutz.ioc.annotation.InjectName;
import org.nutz.ioc.loader.annotation.IocBean;
import org.nutz.mvc.annotation.At;
import org.nutz.mvc.annotation.By;
import org.nutz.mvc.annotation.Filters;
import org.nutz.mvc.annotation.GET;
import org.nutz.mvc.annotation.Ok;

import com.lepeisheng.flipped.client.RpcHelper;
import com.lepeisheng.flipped.rpc.LearningProcess;
import com.lepeisheng.flipped.rpc.ParentInfo;
import com.lps.pspc.filter.LoginFilter;

@IocBean
@InjectName
@At("/leaner/")
@Filters({@By(type=LoginFilter.class)})
public class LeanerModule {
	
	@At("status")
	@Ok("json")
	@GET
	public List<LearningProcess> getStudentStatus(HttpServletRequest req) {
		HttpSession session = req.getSession();
		ParentInfo parentInfo = (ParentInfo) session.getAttribute("user");
		String timestamp = "";
		if (session.getAttribute("leanerStatuTimestamp") == null) {
			timestamp = session.getAttribute("loginTime").toString();
		} else {
			timestamp = session.getAttribute("leanerStatuTimestamp").toString();
		}
		List<LearningProcess> processes = RpcHelper.getLearningProcess(parentInfo.getStudentUid(), timestamp, 0);
		if (!processes.isEmpty()) {
			timestamp = processes.get(processes.size() - 1).getTimestamp();
			session.setAttribute("leanerStatuTimestamp", timestamp);
		}
		return processes;
	}
}
