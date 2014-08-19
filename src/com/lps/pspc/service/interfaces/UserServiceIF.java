package com.lps.pspc.service.interfaces;

import com.lepeisheng.flipped.rpc.ParentInfo;

public interface UserServiceIF {
	public ParentInfo login(String name, String pwd) throws Exception;
}
