package com.lps.pspc.module;

import org.nutz.mvc.annotation.At;
import org.nutz.mvc.annotation.Fail;
import org.nutz.mvc.annotation.IocBy;
import org.nutz.mvc.annotation.Modules;
import org.nutz.mvc.annotation.SetupBy;
import org.nutz.mvc.ioc.provider.ComboIocProvider;

import com.lps.pspc.util.MySetup;

@Modules(scanPackage = true)
@IocBy(type=ComboIocProvider.class, 
	args={"*org.nutz.ioc.loader.json.JsonLoader", 
		"/ioc.js", 
		"*org.nutz.ioc.loader.annotation.AnnotationIocLoader",
		"com.lps.pspc."})
@SetupBy(MySetup.class)
@At("/")
@Fail("json")
public class MainModule {
}
