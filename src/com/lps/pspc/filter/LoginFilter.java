package com.lps.pspc.filter;

import org.nutz.mvc.ActionContext;
import org.nutz.mvc.ActionFilter;
import org.nutz.mvc.View;
import org.nutz.mvc.view.ServerRedirectView;
import org.nutz.mvc.view.ViewWrapper;

public class LoginFilter implements ActionFilter {
	@Override
	public View match(ActionContext arg0) {
		if (arg0.getRequest().getSession().getAttribute("user") == null) {
			return new ViewWrapper(new ServerRedirectView("/login"), null);
		}
		return null;
	}
}
