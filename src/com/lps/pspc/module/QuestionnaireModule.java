package com.lps.pspc.module;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.thrift.TException;
import org.nutz.ioc.annotation.InjectName;
import org.nutz.ioc.loader.annotation.IocBean;
import org.nutz.mvc.adaptor.JsonAdaptor;
import org.nutz.mvc.annotation.AdaptBy;
import org.nutz.mvc.annotation.At;
import org.nutz.mvc.annotation.By;
import org.nutz.mvc.annotation.Filters;
import org.nutz.mvc.annotation.Ok;
import org.nutz.mvc.annotation.POST;

import com.lepeisheng.flipped.client.RpcHelper;
import com.lepeisheng.flipped.rpc.ParentInfo;
import com.lepeisheng.flipped.rpc.SurveyOptions;
import com.lepeisheng.flipped.rpc.SurveyRecord;
import com.lps.pspc.filter.LoginFilter;

@At("/questionnaire")
@Filters({@By(type=LoginFilter.class)})
@IocBean
@InjectName
public class QuestionnaireModule {
	@At("")
	@Ok("json")
	public Object get(HttpServletRequest req) throws TException {
		Map<String, Object> rs = new HashMap<String, Object>();
		ParentInfo user = (ParentInfo) req.getSession().getAttribute("user");
		List<SurveyRecord> records = RpcHelper.parentGetSurveyRecord(0, user.getParentUid(), "2014-08-01", 0);
		List<SurveyOptions> list = new ArrayList<SurveyOptions>();
		if (records.size() > 0) {
			SurveyRecord record = records.get(records.size()-1);
			list = RpcHelper.parentGetSurveyOptions(user.getParentUid(), record.getSurveyUid());
			rs.put("record", record);
			rs.put("list", list);
		}
		return rs;
	}
	@At("")
	@POST
	@Ok("json")
	@AdaptBy(type = JsonAdaptor.class)
	public Object save(Map<String, String> body, HttpServletRequest req) throws TException {
		ParentInfo user = (ParentInfo) req.getSession().getAttribute("user");
		return RpcHelper.parentSetSurveyOptions(user.getParentUid(), 
				body.get("surveyUid"), body.get("result"));
	}
}
