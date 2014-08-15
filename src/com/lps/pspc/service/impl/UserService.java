package com.lps.pspc.service.impl;


import java.util.List;

import org.apache.thrift.protocol.TProtocol;
import org.nutz.ioc.loader.annotation.IocBean;

import rpc.Student;
import rpc.StudentService;

import com.lps.pspc.service.interfaces.UserServiceIF;
import com.lps.pspc.util.Callback;
@IocBean
public class UserService extends BaseService implements UserServiceIF {
	@SuppressWarnings("unchecked")
	@Override
	public Student login(String name, String pwd) throws Exception {
		Student student = new Student();
		List<Student> students = (List<Student>) exec(new Callback() {
			@Override
			public Object run(TProtocol protocol) throws Exception {
				StudentService.Client client = new StudentService.Client(protocol);
			      System.out.println("client call by thrift");
			      Student st1 = new Student();
			      st1.id = 1;
			      st1.name = "111";
			      st1.age = 20;
			      client.add(st1);
			      Student st2 = new Student();
			      st2.id = 2;
			      st2.name = "222";
			      st2.age = 30;
			      client.add(st2);
			      List<Student> list = client.load();
			      return list;
			}
		});
		for(Student st : students) {
	        System.out.println(st.id);
	        System.out.println(st.name);
	        System.out.println(st.age);
	        System.out.println("---------------------");
	    }	
		return student;
	}
}
