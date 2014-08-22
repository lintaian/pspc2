package com.lps.pspc.module;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.nutz.ioc.annotation.InjectName;
import org.nutz.ioc.loader.annotation.IocBean;
import org.nutz.mvc.annotation.At;
import org.nutz.mvc.annotation.By;
import org.nutz.mvc.annotation.Filters;
import org.nutz.mvc.annotation.Ok;

import com.lps.pspc.filter.LoginFilter;

@At("/questionnaire")
@Filters({@By(type=LoginFilter.class)})
@IocBean
@InjectName
public class QuestionnaireModule {
	@At("")
	@Ok("json")
	@Filters({@By(type=LoginFilter.class)})
	public Object questionnaire() {
		Map<String, Object> map1 = new HashMap<String, Object>();
		Map<String, Object> map2 = new HashMap<String, Object>();
		Map<String, Object> map3 = new HashMap<String, Object>();
		Map<String, Object> map4 = new HashMap<String, Object>();
		List<Object> list = new ArrayList<Object>();
		List<Object> list1 = new ArrayList<Object>();
		List<Object> list2 = new ArrayList<Object>();
		map1.put("name", "aaa");
		map1.put("type", "a");
		map2.put("name", "bbb");
		map2.put("type", "b");
		map3.put("name", 111);
		map4.put("name", 222);
		list1.add(map3);
		list1.add(map4);
		list2.add(map3);
		list2.add(map4);
		map1.put("list", list1);
		map2.put("list", list2);
		list.add(map1);
		list.add(map2);
		return list;
	}
}
