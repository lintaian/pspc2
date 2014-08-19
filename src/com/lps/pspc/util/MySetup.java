package com.lps.pspc.util;

import java.io.FileInputStream;
import java.util.Properties;

import org.nutz.mvc.NutConfig;
import org.nutz.mvc.Setup;

import com.lepeisheng.flipped.client.RpcHelper;

public class MySetup implements Setup {
	@Override
	public void init(NutConfig arg0) {
		Properties config = new Properties();
	    try {
	      String path = (MySetup.class.getClassLoader().getResource("").toURI()).getPath();
	      FileInputStream stream = new FileInputStream(path + "thrift.properties");
	      try {
	        config.load(stream);
	        RpcHelper.host = config.getProperty("remote.ip");
	        RpcHelper.port = Integer.parseInt(config.getProperty("remote.port"));
	        RpcHelper.timeout = Integer.parseInt(config.getProperty("remote.timeout"));
	      } finally {
	        stream.close();
	      }
	    } catch (Exception e) {
	      e.printStackTrace();
	    }
	}
	@Override
	public void destroy(NutConfig arg0) {
		
	}
}
