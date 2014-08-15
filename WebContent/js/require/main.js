require.config({
	baseUrl: 'js',
	paths: {
		jquery: 'lib/jquery',
		jqueryMobile: 'lib/jquery.mobile-1.4.3',
		echarts: 'lib/echarts',
		'echarts/chart/bar': 'lib/echarts',
    	'echarts/chart/line': 'lib/echarts',
    	'echarts/chart/pie': 'lib/echarts',
    	cMain: 'custom/main'
	},
	shim: {
		login2: {deps: ['jquery']},
		jqueryMobile: {deps: ['jquery']}
	}
});
require(['jquery', 'jqueryMobile', 'echarts', 'echarts/chart/bar', 
         'echarts/chart/line', 'echarts/chart/pie', 'cMain'], function($) {
	$.mobile.changePage('#mainPage');
});
