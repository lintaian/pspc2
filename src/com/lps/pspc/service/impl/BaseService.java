package com.lps.pspc.service.impl;

import org.apache.thrift.protocol.TBinaryProtocol;
import org.apache.thrift.protocol.TProtocol;
import org.apache.thrift.transport.TSocket;
import org.apache.thrift.transport.TTransport;
import org.nutz.ioc.loader.annotation.Inject;

import com.lps.pspc.config.ThriftConfig;
import com.lps.pspc.util.Callback;

public class BaseService {
	@Inject("refer:thriftConfig")
	private ThriftConfig thriftConfig;
	
	public TTransport getTTransport() {
        return new TSocket(thriftConfig.getIp(), thriftConfig.getPort());
	}
	public TProtocol getTBinaryProtocl() {
		TTransport transport = new TSocket(thriftConfig.getIp(), thriftConfig.getPort());
        TProtocol protocol = new TBinaryProtocol(transport);
        return protocol;
	}
	public Object exec(Callback callBack) {
		Object obj = null;
		TTransport transport = new TSocket(thriftConfig.getIp(), thriftConfig.getPort());
		try {
			TProtocol protocol = new TBinaryProtocol(transport);
			transport.open();
			obj = callBack.run(protocol);
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			transport.close();
		}
		return obj;
	}
}
