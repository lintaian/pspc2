package com.lps.pspc.module;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.nutz.ioc.annotation.InjectName;
import org.nutz.ioc.loader.annotation.IocBean;
import org.nutz.mvc.View;
import org.nutz.mvc.adaptor.JsonAdaptor;
import org.nutz.mvc.annotation.AdaptBy;
import org.nutz.mvc.annotation.At;
import org.nutz.mvc.annotation.By;
import org.nutz.mvc.annotation.Fail;
import org.nutz.mvc.annotation.Filters;
import org.nutz.mvc.annotation.Ok;
import org.nutz.mvc.annotation.POST;
import org.nutz.mvc.view.JspView;
import org.nutz.mvc.view.ServerRedirectView;
import org.nutz.mvc.view.ViewWrapper;

import com.lepeisheng.flipped.client.RpcHelper;
import com.lepeisheng.flipped.rpc.ParentInfo;
import com.lepeisheng.flipped.rpc.SurveyRecord;
import com.lps.pspc.filter.LoginFilter;

@IocBean
@InjectName
@At("/")
@Fail("json")
public class MyMainModule {

	@At("login")
	@AdaptBy(type = JsonAdaptor.class)
	@Ok("json")
	@POST
	public Object loginPost(Map<String, String> body, HttpServletRequest req) throws Exception {
		Map<String, Object> re = new HashMap<String, Object>();
		re.put("status", false);
		String name = body.containsKey("username") ? body.get("username") : "";
		String password = body.containsKey("password") ? body.get("password") : "";
		if (name != null && !"".equals(name) && password != null && !"".equals(password)) {
			ParentInfo user = RpcHelper.parentLogin(name, password);
			if (user != null) {
				re.put("status", true);
				req.getSession().setAttribute("user", user);
				SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
				String timestamp = sdf.format(new Date());
				req.getSession().setAttribute("loginTime", timestamp);
			} else {
				re.put("msg", "用户名或密码错误!");
			}
		} else {
			re.put("msg", "用户名和密码不能为空!");
		}
		return re;
	}
	
	@At("login")
	@Ok("jsp:jsp.login")
	@Fail("redirect:/main")
	public void loginGet(HttpServletRequest req) throws Exception {
		if (req.getSession().getAttribute("user") != null) {
			throw new Exception();
		}
	}
	@At("main")
	@Filters({@By(type=LoginFilter.class)})
	public View main(HttpServletRequest req) throws Exception {
		if (req.getSession().getAttribute("user") == null) {
			return new ViewWrapper(new ServerRedirectView("/login"), null);
		} else {
			ParentInfo info = (ParentInfo) req.getSession().getAttribute("user");
			List<SurveyRecord> list = RpcHelper.parentGetSurveyRecord(0, info.getParentUid(), "2014-08-01", 0);
			if (list.size() > 0) {
				return new ViewWrapper(new ServerRedirectView("/survey"), null);
			}
		}
		return new ViewWrapper(new JspView("jsp.main"), null);
	}
	@At("survey")
	@Ok("jsp:jsp.questionnaire")
	@Fail("redirect:/main")
	@Filters({@By(type=LoginFilter.class)})
	public void survey(HttpServletRequest req) throws Exception {
		ParentInfo info = (ParentInfo) req.getSession().getAttribute("user");
		List<SurveyRecord> list = RpcHelper.parentGetSurveyRecord(0, info.getParentUid(), "2014-08-01", 0);
		if (list.size() == 0) {
			throw new Exception();
		}
	}
	@At("")
	@Ok("redirect:/main")
	public void index() {
	}
	@At("logout")
	@Ok("redirect:/login")
	public void logout(HttpServletRequest req) throws IOException {
		req.getSession().invalidate();
	}
	@At("session")
	@Ok("json")
	public Object getSession(String name, HttpServletRequest req) {
		return req.getSession().getAttribute(name);
	}
	@At("application")
	@Ok("json")
	public Object getApplication(String name, HttpServletRequest req) {
		return req.getSession().getServletContext().getAttribute(name);
	}
}
