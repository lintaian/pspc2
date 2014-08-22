require.config({
	baseUrl: 'js',
	paths: {
		jquery: 'lib/jquery',
		jqueryMobile: 'lib/jquery.mobile-1.4.3',
		angular: 'lib/angular',
		angularResource: 'lib/angular-resource',
    	resource: 'custom/resource',
    	app: 'custom/appQuestionnaire'
	},
	shim: {
		angular: {
			exports: 'angular'
		},
		angularResource: {deps: ['angular']},
		jqueryMobile: {deps: ['jquery']}
	}
});
require(['jquery', 'angular', 'angularResource', 'jqueryMobile', 
         'resource', 'app'], function($, angular) {
	angular.bootstrap(document, ['appQuestionnaire']);
//	$.mobile.changePage('#mainPage', {transition: 'slide'});
});
