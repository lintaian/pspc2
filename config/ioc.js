var ioc = {
  	config : {
        type : 'org.nutz.ioc.impl.PropertiesProxy',
        fields : {
            paths : ['thrift.properties']
        }
    },
	thriftConfig: {
		type: 'com.lps.pspc.config.ThriftConfig',
		args: [{java: "$config.get('remote.ip')"}, {java: "$config.get('remote.port')"}]
	}
}