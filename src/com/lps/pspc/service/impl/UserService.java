package com.lps.pspc.service.impl;


import org.nutz.ioc.loader.annotation.IocBean;

import com.lepeisheng.flipped.rpc.ParentInfo;
import com.lps.pspc.service.interfaces.UserServiceIF;

@IocBean
public class UserService extends BaseService implements UserServiceIF {
	@Override
	public ParentInfo login(String name, String pwd) throws Exception {
		return null;
	}
}
