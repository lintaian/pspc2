package com.lps.pspc.service.interfaces;

import rpc.Student;

public interface UserServiceIF {
	public Student login(String name, String pwd) throws Exception;
}
